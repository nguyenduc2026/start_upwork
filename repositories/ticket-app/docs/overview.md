# Ticket Hub — Tổng quan thiết kế

> **Prototype:** [Xem preview trên claude.ai](https://claude.ai/artifact/JQmTG7qM99BQKcgDUQFJua) · file gốc trong [`prototype/`](prototype/)

Ticket Hub là hệ thống bán vé concert có chọn ghế, gồm 3 vai trò:

- **Khách hàng:** tìm sự kiện, chọn ghế, thanh toán, nhận vé QR, yêu cầu hoàn vé.
- **Ban tổ chức (BTC):** tạo sự kiện, đặt hạng vé, theo dõi doanh thu và đơn hàng, check-in khách tại cổng.
- **Admin:** quản lý địa điểm và sơ đồ ghế, duyệt BTC, xử lý hoàn tiền, kiểm soát sự kiện.

Prototype gồm 30 màn. Ghi chú hành vi chi tiết của từng màn hiện ngay bên dưới màn đó trên canvas (lưu trong `prototype/canvas.json`, mục `notes`).

## 1. Công nghệ

| Hạng mục | Chọn |
|---|---|
| Backend | PHP 8.4 (bản vá ≥ 8.4.27), Laravel 12, REST API, JWT (`php-open-source-saver/jwt-auth`) |
| Frontend | Node 22 LTS, React 19 + Vite + TypeScript, TanStack Router + TanStack Query, Tailwind, shadcn/ui |
| Database | MySQL 8.4 |
| Môi trường | Dev hằng ngày chạy thẳng trên máy (PHP, Node, MySQL); Docker Compose đầy đủ để kiểm tra trước khi lên UAT; UAT trên AWS — xem mục 2 |
| Thanh toán | Stripe test mode, PaymentIntent + webhook, tiền tệ **USD**. Tiền về tài khoản nền tảng |
| Lưu file | AWS S3 cho mọi môi trường (bucket riêng cho dev và UAT): ảnh bìa, logo, giấy tờ đăng ký BTC |
| Ngôn ngữ UI | Tiếng Việt khi phát triển; mọi text đi qua i18n (`react-i18next`, file dịch của Laravel); thêm tiếng Anh ở tuần 8 |
| PDF / QR / biểu đồ | `barryvdh/laravel-dompdf` · quét QR bằng `@zxing/browser` · Recharts (shadcn chart) |
| Test | PHPUnit (backend) + Playwright E2E (frontend) |
| CI / Deploy | GitHub Actions → image lên GitHub Container Registry → 1 EC2 (t4g.small) chạy Docker Compose; S3; email Amazon SES; HTTPS bằng Let's Encrypt |

### Quy ước

- **Thư mục:** xem mục 3.
- **API:** tiền tố `/api/v1`, JSON. Lỗi theo một khuôn: `{ "message": "...", "code": "SEAT_UNAVAILABLE", "errors": { "field": ["..."] } }`. Phân trang `?page=&per_page=`.
- **Token:** access token 15 phút, refresh token 7 ngày; đăng xuất / đặt lại mật khẩu / khoá tài khoản thì thu hồi refresh token.
- **Tiền:** lưu số nguyên theo cent (USD), không dùng float. Prototype đang hiện giá bằng ₫, khi dựng thật thì hiển thị theo USD.
- **Form:** trường bắt buộc có `*` đỏ; trường không bắt buộc không ghi chú thêm; placeholder chung chung ("Nhập email"); ô mật khẩu dùng placeholder `******`.
- **Bảo mật PHP:** image Docker dùng PHP 8.4 bản vá mới nhất (đã vá PHP2Shell, CVE-2026-109618/109619) và tắt `session.upload_progress.enabled` (CVE-2026-115560).

Một số thiết lập được giữ đơn giản:

- Phí nền tảng cố định 5%, đặt trong config.
- Key Stripe, AWS và các secret để trong `.env` (không commit), trên CI dùng GitHub Secrets.
- Danh sách tỉnh/thành nạp sẵn bằng seeder.
- UAT chạy thường trực trên 1 EC2 để giữ chi phí khoảng $15/tháng; bản có Auto Scaling + RDS chỉ dựng tạm khi cần load test.

## 2. Môi trường chạy

Cùng một mã nguồn chạy được ở 3 môi trường, chỉ khác file `.env`:

| | Dev trên máy (hằng ngày) | Docker (trên máy) | UAT (AWS) |
|---|---|---|---|
| Khi nào dùng | Code hằng ngày, không cần bật Docker | Kiểm tra lần cuối trước khi đưa lên UAT, giống UAT nhất | Bản demo cho khách xem |
| Backend | `php artisan serve` → `http://localhost:8000` | nginx + PHP-FPM | nginx + PHP-FPM trên EC2 |
| Frontend | `npm run dev` (Vite) → `http://localhost:5173`, proxy `/api` sang cổng 8000 | nginx phục vụ bản build | nginx phục vụ bản build |
| Database | MySQL 8.4 cài trên máy | MySQL 8.4 container | MySQL 8.4 container |
| Queue / cache | driver `database` (không cần Redis) | Redis | Redis |
| Queue worker, scheduler | `php artisan queue:work`, `php artisan schedule:work` (hoặc `composer run dev` chạy chung server + queue + Vite) | container `queue`, `scheduler` | container `queue`, `scheduler` |
| Mail | Mailpit bản .exe → `http://localhost:8025` | Mailpit container | Amazon SES |
| Stripe webhook | `stripe listen --forward-to localhost:8000/api/v1/stripe/webhook` | container `stripe-cli` | Webhook trỏ về domain UAT |
| File | S3 bucket `ticket-hub-dev` | S3 bucket `ticket-hub-dev` | S3 bucket `ticket-hub-demo` |

- Phải có các file mẫu `.env.example` (dev trên máy), `.env.docker.example`, `.env.uat.example`; file `.env` thật không commit.
- Code không được phụ thuộc vào Redis: mọi chỗ dùng queue/cache đi qua facade của Laravel để đổi driver bằng `.env`.
- Trước khi đưa lên UAT: chạy `docker compose up --build` và `php artisan test` trong container, có lỗi thì không deploy.

## 3. Cấu trúc thư mục

```
repositories/ticket-app/
├── backend/                     # Laravel 12 API
├── frontend/                    # React + Vite SPA
├── docker/
│   ├── php/Dockerfile           # PHP 8.4-fpm + extension (pdo_mysql, redis, gd, intl, zip)
│   ├── php/php.ini              # session.upload_progress.enabled = 0, upload size…
│   ├── nginx/default.conf       # /api → PHP-FPM, còn lại → frontend build
│   └── frontend/Dockerfile      # build Vite, copy dist/ vào nginx
├── docker-compose.yml           # nginx, app, queue, scheduler, mysql, redis, mailpit, stripe-cli
├── docker-compose.uat.yml       # ghi đè cho UAT (không có mailpit, stripe-cli; dùng image từ GHCR)
├── .github/workflows/
│   ├── ci.yml                   # Pint + PHPUnit, ESLint + typecheck + build, Playwright
│   └── deploy-uat.yml           # build image → GHCR → SSH vào EC2
├── docs/
│   ├── overview.md              # file này
│   ├── prototype/               # 30 màn .dc.html + canvas.json
│   └── plans/                   # chuan-bi.md, week-1..8.md, tracker.md
└── README.md
```

### Backend (`backend/`)

Giữ cấu trúc mặc định của Laravel 12, thêm các thư mục sau trong `app/`:

```
backend/
├── app/
│   ├── Actions/                     # 1 class = 1 nghiệp vụ, controller chỉ gọi Action
│   │   ├── Auth/                    #   RegisterUser, ResetPassword…
│   │   ├── Booking/                 #   HoldSeats, CancelHold, ExpireBookings
│   │   ├── Payment/                 #   CreatePaymentIntent, HandleStripeEvent, RefundBooking
│   │   ├── Event/                   #   PublishEvent, SuspendEvent, CancelEvent
│   │   ├── SeatMap/                 #   SaveSeatMap, GenerateSeats, CloneSeatMap
│   │   ├── Organizer/               #   SubmitApplication, ApproveApplication, InviteMember
│   │   └── Ticket/                  #   IssueTickets, CheckInTicket
│   ├── Enums/                       # UserRole, BookingStatus, EventStatus, SeatStatus, TicketStatus, MemberRole
│   ├── Exceptions/                  # ApiException (có code như SEAT_UNAVAILABLE) + render về khuôn lỗi chung
│   ├── Http/
│   │   ├── Controllers/Api/V1/
│   │   │   ├── Auth/                # đăng nhập, đăng ký, token, mật khẩu
│   │   │   ├── Public/              # trang chủ, danh sách & chi tiết sự kiện, sơ đồ ghế
│   │   │   ├── Me/                  # hồ sơ, vé, đơn hàng, thông báo, booking, thanh toán
│   │   │   ├── Organizer/           # sự kiện, hạng vé, đơn hàng, check-in, cài đặt tổ chức
│   │   │   ├── Admin/               # địa điểm, sơ đồ ghế, hồ sơ BTC, người dùng, đơn hàng, sự kiện, audit log
│   │   │   └── StripeWebhookController.php
│   │   ├── Middleware/              # RequestId, EnsureRole, EnsureAccountActive
│   │   ├── Requests/                # FormRequest, chia thư mục giống Controllers
│   │   └── Resources/               # API Resource (định dạng JSON trả về), chia giống Controllers
│   ├── Jobs/                        # SendTicketsEmail, RefundBookingJob (dùng trong batch huỷ sự kiện)
│   ├── Models/
│   ├── Notifications/               # BookingConfirmed, RefundApproved, EventCancelled… (kênh database + mail)
│   ├── Policies/                    # EventPolicy, OrganizationPolicy, BookingPolicy, TicketPolicy…
│   ├── Services/                    # nối dịch vụ ngoài: StripeGateway, TicketSigner (HMAC), PdfRenderer
│   └── Support/                     # AuditLogger, Money (format cent ↔ $), CsvExporter
├── config/ticket.php                # phí nền tảng 5%, thời gian giữ ghế 10 phút, max vé mặc định 6…
├── database/
│   ├── migrations/
│   ├── factories/
│   └── seeders/                     # ProvinceSeeder, CategorySeeder, DemoSeeder (dữ liệu demo đầy đủ)
├── lang/vi/, lang/en/               # text email, thông báo, lỗi validate
├── resources/views/
│   ├── emails/                      # mẫu email (vé, xác minh, hoàn tiền…)
│   └── pdf/                         # mẫu PDF vé, hoá đơn
├── routes/
│   ├── api.php                      # chỉ gom các file dưới, tiền tố /api/v1
│   └── api/v1/                      # auth.php, public.php, me.php, organizer.php, admin.php, webhooks.php
├── routes/console.php               # lịch chạy: nhả ghế hết hạn mỗi phút
└── tests/
    ├── Feature/                     # chia thư mục giống Controllers: Auth/, Booking/, Payment/, Organizer/, Admin/…
    └── Unit/                        # Money, TicketSigner, GenerateSeats…
```

Quy tắc: Controller mỏng (validate bằng FormRequest → gọi Action → trả Resource); kiểm tra quyền bằng Policy; thao tác của Admin/BTC ghi `AuditLogger` bên trong Action.

### Frontend (`frontend/`)

```
frontend/
├── src/
│   ├── routes/                      # TanStack Router, file-based — đường dẫn URL = cấu trúc thư mục
│   │   ├── __root.tsx
│   │   ├── _public/                 # layout khách hàng (header + footer)
│   │   │   ├── index.tsx            #   màn 1  /
│   │   │   ├── events/              #   màn 2, 3, 4  /events, /events/$slug, /events/$slug/seats
│   │   │   ├── checkout/            #   màn 5, 6
│   │   │   └── me/                  #   màn 9, 10, 11, 13–15  /me/profile, /me/notifications…
│   │   ├── _auth/                   # màn 8 (layout 2 cột, không header)
│   │   ├── organizer/               # layout sidebar BTC: màn 16–22; apply.tsx (màn 12) dùng header gọn, không sidebar
│   │   └── admin/                   # layout sidebar Admin: màn 23–30
│   ├── features/                    # theo nghiệp vụ, mỗi thư mục gồm api.ts (gọi API + query key),
│   │   ├── auth/                    #   hooks (useXxxQuery/Mutation), components riêng của nghiệp vụ đó
│   │   ├── events/
│   │   ├── seat-map/                #   component SVG sơ đồ ghế dùng chung cho màn 4, 20, 27
│   │   ├── booking/
│   │   ├── tickets/
│   │   ├── notifications/           #   popover chuông dùng chung mọi layout
│   │   ├── organizer/
│   │   └── admin/
│   ├── components/
│   │   ├── ui/                      # component shadcn/ui (sinh bằng CLI, ít sửa)
│   │   ├── layout/                  # PublicHeader, Footer, DashboardSidebar, AccountNav
│   │   └── common/                  # DataTable, EmptyState, ErrorState, ConfirmDialog, PageHeader
│   ├── lib/
│   │   ├── api-client.ts            # fetch + gắn token + tự refresh khi 401 + map khuôn lỗi
│   │   ├── auth.ts                  # lưu token, user hiện tại, guard theo role
│   │   ├── money.ts                 # format cent → "$12.00"
│   │   ├── date.ts
│   │   └── i18n.ts
│   ├── locales/vi/*.json, locales/en/*.json
│   ├── styles/tokens.css            # design token từ prototype (light + dark)
│   └── main.tsx
├── e2e/                             # Playwright: auth.spec.ts, purchase.spec.ts, organizer.spec.ts…
├── public/
└── vite.config.ts                   # proxy /api → http://localhost:8000 khi dev
```

Quy tắc: route chỉ ghép layout và gọi component trong `features/`; component trong `features/` không gọi `fetch` trực tiếp mà qua `api.ts`; mọi text hiển thị lấy từ `locales/`.

## 4. Danh sách màn (30)

**Khách hàng**

| # | Màn | Ghi chú |
|---|---|---|
| 1 | Trang chủ | |
| 2 | Danh sách sự kiện | Lọc theo danh mục, thành phố, thời gian |
| 3 | Chi tiết sự kiện | |
| 4 | Chọn ghế | Giữ ghế 10 phút, tối đa 6 vé |
| 5 | Thanh toán | Thẻ (Stripe Payment Element) |
| 6 | Thanh toán thành công | PDF vé, .ics |
| 7 | Trạng thái lỗi | |
| 8 | Đăng nhập / Đăng ký / Quên mật khẩu | Có xác minh email; sau khi tạo tài khoản chọn loại: Mua vé hoặc Tổ chức sự kiện |
| 9 | Hồ sơ cá nhân | Thông tin, đổi mật khẩu, cài đặt thông báo email |
| 10 | Thông báo trong app | Laravel database notifications, chuông cập nhật bằng polling |
| 11 | Đơn hàng của tôi | Có yêu cầu hoàn vé |
| 12 | Đăng ký làm BTC | Vào từ bước chọn loại tài khoản (màn 8), không mở từ các màn khách hàng; 1 giấy tờ đính kèm |
| 13 | Vé của tôi (desktop) | Lưới vé theo tab Sắp diễn ra / Đã qua / Đã hoàn, mở Vé QR |
| 14 | Vé của tôi (mobile) | |
| 15 | Vé QR + hoàn vé (mobile) | QR có ký HMAC |
| 16 | Check-in (mobile web) | Quét bằng camera |

**Ban tổ chức**

| # | Màn | Ghi chú |
|---|---|---|
| 17 | Tổng quan | Thẻ số liệu, đơn gần đây |
| 18 | Sự kiện | Danh sách kèm doanh thu từng sự kiện (xem mục 5) |
| 19 | Sửa sự kiện: thông tin · mở bán | |
| 20 | Sửa sự kiện: hạng vé | |
| 21 | Đơn hàng | |
| 22 | Cài đặt | Hồ sơ công khai, Thành viên, Thông báo |

**Admin**

| # | Màn | Ghi chú |
|---|---|---|
| 23 | Tổng quan | |
| 24 | Hồ sơ organizer | Duyệt / từ chối |
| 25 | Người dùng | Đổi role, khoá/mở khoá |
| 26 | Địa điểm | |
| 27 | Sơ đồ ghế | Form nhập khu ghế + xem trước SVG |
| 28 | Đơn hàng & hoàn tiền | Duyệt hoàn qua Stripe Refund API |
| 29 | Audit log | Chỉ đọc |
| 30 | Sự kiện | Tạm dừng, mở bán lại, huỷ + hoàn tiền hàng loạt |

## 5. Màn 18 — Danh sách sự kiện của BTC

Mỗi dòng sự kiện hiện luôn tình hình bán vé, BTC không cần mở từng sự kiện để xem:

| Tên | Ngày diễn | Trạng thái | Đã bán / Tổng | Doanh thu | Check-in | ⋯ |
|---|---|---|---|---|---|---|
| Saigon Rock Night | Dec 20 | On sale | ▓▓▓░ 400/1,200 | $12,000 | 0 | Edit · Orders · Check-in · Export guests · Public page |

- Khi Admin tạm dừng sự kiện, dòng đó có badge "Paused" kèm tooltip lý do (BR-13).
- "Orders" mở màn 21 đã lọc sẵn theo sự kiện. "Check-in" mở màn 16.
- Số liệu tải lại mỗi khi mở trang.

## 6. Quy tắc nghiệp vụ

- **BR-02:** mỗi user chỉ có 1 đơn `PENDING_PAYMENT` cho mỗi sự kiện; tối đa `max_tickets_per_user` vé (mặc định 6).
- **Giữ ghế 10 phút.** Scheduler chạy mỗi phút để nhả ghế hết hạn và chuyển booking sang `EXPIRED`.
- **BR-07:** phí nền tảng 5% không được hoàn; không hoàn vé trong vòng 48h trước giờ diễn.
- **BR-08:** chỉ Admin được huỷ sự kiện; khi huỷ thì hoàn 100% kể cả phí.
- **BR-09:** hoàn theo cả đơn; vé bị `REVOKED`; khách không rút lại yêu cầu được.
- **BR-13:** chỉ Admin được tạm dừng bán vé.
- **BR-14:** sau khi publish, BTC chỉ sửa được tiêu đề, mô tả, ảnh bìa, danh mục.

## 7. Điểm kỹ thuật chính

1. **Chống bán trùng ghế:** bảng `event_seats` có một dòng cho mỗi ghế của mỗi sự kiện. Giữ ghế bằng một câu `UPDATE … WHERE status = 'available'` trong transaction; nếu số dòng được cập nhật ít hơn số ghế khách chọn thì rollback và trả 409. Có test cho trường hợp nhiều request cùng lúc.
2. **Stripe webhook:** xác thực chữ ký, xử lý idempotent theo event ID; chỉ phát hành vé khi nhận `payment_intent.succeeded`.
3. **Queue / Job:** gửi email vé, hoàn tiền hàng loạt khi huỷ sự kiện (job batching), gửi thông báo.
4. **Phân quyền:** role CUSTOMER / ORGANIZER / ADMIN, cộng thêm vai trò thành viên trong tổ chức (Quản lý sự kiện / Nhân viên check-in). Kiểm tra quyền bằng Policy.
5. **Audit log:** ghi lại thao tác của Admin và BTC, có dữ liệu trước/sau.

## 8. Lộ trình 8 tuần

Trước tuần 1 phải xong danh sách [chuẩn bị](plans/chuan-bi.md). Chi tiết từng tuần trong [`plans/`](plans/) (week-1.md … week-8.md), tiến độ ghi ở [`plans/tracker.md`](plans/tracker.md).

| Tuần | Nội dung |
|---|---|
| 1 | Dựng khung dự án (Docker, Laravel, React + shadcn, CI), auth JWT (màn 8), hồ sơ (màn 9) |
| 2 | Địa điểm + sơ đồ ghế (26, 27). Đăng ký BTC + duyệt (12, 24). Tổ chức + thành viên (22) |
| 3 | Tạo/sửa sự kiện, hạng vé, publish (18–20). Trang chủ, danh sách, chi tiết (1–3) |
| 4 | Chọn ghế + giữ ghế (4), thanh toán Stripe + webhook (5, 6), phát hành vé QR, email |
| 5 | Vé của tôi, Vé QR, Đơn hàng của tôi (11, 13, 14, 15). Check-in (16). BTC tổng quan + đơn hàng (17, 21) |
| 6 | Hoàn vé (11, 15, 28). Admin sự kiện: tạm dừng/huỷ (30). Thông báo trong app (10). Audit log (29) |
| 7 | Admin tổng quan + người dùng (23, 25). Trang lỗi (7), PDF vé, CSV. PHPUnit + Playwright E2E |
| 8 | Deploy AWS, README, video demo, sửa chi tiết giao diện |
