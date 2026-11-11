# Ticket Hub — Tổng quan thiết kế

> **Prototype:** [Xem preview trên claude.ai](https://claude.ai/artifact/JQmTG7qM99BQKcgDUQFJua) · file gốc trong [`prototype/`](prototype/)

Ticket Hub là hệ thống bán vé concert có chọn ghế, gồm 3 vai trò:

- **Khách hàng:** tìm sự kiện, chọn ghế, thanh toán, nhận vé QR, yêu cầu hoàn vé.
- **Ban tổ chức (BTC):** tạo sự kiện, đặt hạng vé, theo dõi doanh thu và đơn hàng, check-in khách tại cổng.
- **Admin:** quản lý địa điểm và sơ đồ ghế, duyệt BTC, xử lý hoàn tiền, kiểm soát sự kiện.

Prototype gồm 29 màn. Ghi chú hành vi chi tiết của từng màn hiện ngay bên dưới màn đó trên canvas (lưu trong `prototype/canvas.json`, mục `notes`).

## 1. Công nghệ

| Hạng mục | Chọn |
|---|---|
| Backend | Laravel (bản stable mới nhất), REST API, JWT (`php-open-source-saver/jwt-auth`, access + refresh token) |
| Frontend | React + Vite + TypeScript, TanStack Router + TanStack Query, Tailwind, shadcn/ui |
| Database | MySQL |
| Hạ tầng local | Docker Compose: app, MySQL, Redis (queue + cache), Mailpit |
| Thanh toán | Stripe test mode, PaymentIntent + webhook. Tiền về tài khoản nền tảng |
| Lưu file | S3 (ảnh bìa, logo, giấy tờ đăng ký BTC) |
| Ngôn ngữ UI | Tiếng Anh, tiền tệ USD |
| Test | PHPUnit (backend) + Playwright E2E (frontend) |
| CI / Deploy | GitHub Actions, AWS |

Một số thiết lập được giữ đơn giản:

- Phí nền tảng cố định 5%, đặt trong config.
- Key Stripe và các secret để trong `.env`.
- Danh sách tỉnh/thành nạp sẵn bằng seeder.

## 2. Danh sách màn (29)

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
| 18 | Sự kiện | Danh sách kèm doanh thu từng sự kiện (xem mục 3) |
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

## 3. Màn 18 — Danh sách sự kiện của BTC

Mỗi dòng sự kiện hiện luôn tình hình bán vé, BTC không cần mở từng sự kiện để xem:

| Tên | Ngày diễn | Trạng thái | Đã bán / Tổng | Doanh thu | Check-in | ⋯ |
|---|---|---|---|---|---|---|
| Saigon Rock Night | Dec 20 | On sale | ▓▓▓░ 400/1,200 | $12,000 | 0 | Edit · Orders · Check-in · Export guests · Public page |

- Khi Admin tạm dừng sự kiện, dòng đó có badge "Paused" kèm tooltip lý do (BR-13).
- "Orders" mở màn 21 đã lọc sẵn theo sự kiện. "Check-in" mở màn 16.
- Số liệu tải lại mỗi khi mở trang.

## 4. Quy tắc nghiệp vụ

- **BR-02:** mỗi user chỉ có 1 đơn `PENDING_PAYMENT` cho mỗi sự kiện; tối đa `max_tickets_per_user` vé (mặc định 6).
- **Giữ ghế 10 phút.** Scheduler chạy mỗi phút để nhả ghế hết hạn và chuyển booking sang `EXPIRED`.
- **BR-07:** phí nền tảng 5% không được hoàn; không hoàn vé trong vòng 48h trước giờ diễn.
- **BR-08:** chỉ Admin được huỷ sự kiện; khi huỷ thì hoàn 100% kể cả phí.
- **BR-09:** hoàn theo cả đơn; vé bị `REVOKED`; khách không rút lại yêu cầu được.
- **BR-13:** chỉ Admin được tạm dừng bán vé.
- **BR-14:** sau khi publish, BTC chỉ sửa được tiêu đề, mô tả, ảnh bìa, danh mục.

## 5. Điểm kỹ thuật chính

1. **Chống bán trùng ghế:** bảng `event_seats` có một dòng cho mỗi ghế của mỗi sự kiện. Giữ ghế bằng một câu `UPDATE … WHERE status = 'available'` trong transaction; nếu số dòng được cập nhật ít hơn số ghế khách chọn thì rollback và trả 409. Có test cho trường hợp nhiều request cùng lúc.
2. **Stripe webhook:** xác thực chữ ký, xử lý idempotent theo event ID; chỉ phát hành vé khi nhận `payment_intent.succeeded`.
3. **Queue / Job:** gửi email vé, hoàn tiền hàng loạt khi huỷ sự kiện (job batching), gửi thông báo.
4. **Phân quyền:** role CUSTOMER / ORGANIZER / ADMIN, cộng thêm vai trò thành viên trong tổ chức (Quản lý sự kiện / Nhân viên check-in). Kiểm tra quyền bằng Policy.
5. **Audit log:** ghi lại thao tác của Admin và BTC, có dữ liệu trước/sau.

## 6. Lộ trình 8 tuần

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
