# Tuần 1 — Khung dự án, đăng nhập JWT, hồ sơ cá nhân

**Mục tiêu:** chạy được dự án theo cả 2 cách (thẳng trên máy và bằng Docker), đăng ký → xác minh email → đăng nhập → sửa hồ sơ chạy thật từ đầu tới cuối, CI xanh.

**Màn hình:** 8 (Đăng nhập / Đăng ký / Quên mật khẩu + bước chọn loại tài khoản), 9 (Hồ sơ cá nhân). Khung chung: header khách hàng, footer, đổi sáng/tối.

**Thời lượng dự kiến:** ~18 giờ (3 giờ/ngày × 6 ngày).

**Điều kiện bắt đầu:** đã xong [chuẩn bị](chuan-bi.md). Công nghệ, môi trường, cấu trúc thư mục theo [overview.md](../overview.md) mục 1–3.

---

## 1. Hạ tầng (ngày 1–2)

- [ ] `backend/`: tạo dự án Laravel 12, tạo sẵn các thư mục theo overview mục 3, `config/ticket.php`, route chia theo `routes/api/v1/*.php`, khuôn lỗi chung trong `bootstrap/app.php`.
- [ ] `.env.example` cho dev trên máy: MySQL local, queue + cache driver `database`, Mailpit (`localhost:1025`), S3 bucket `ticket-hub-dev`. Chạy được `composer run dev`.
- [ ] Docker: `docker/` + `docker-compose.yml` gồm `nginx`, `app` (PHP 8.4-fpm bản vá mới nhất, tắt `session.upload_progress.enabled`), `queue`, `scheduler`, `mysql`, `redis`, `mailpit`, `stripe-cli` (dùng từ tuần 4); `.env.docker.example` dùng Redis.
- [ ] `frontend/`: Vite + React + TS (proxy `/api` → `localhost:8000`), Tailwind, shadcn/ui, TanStack Router (file-based) + TanStack Query, `react-i18next` (text tiếng Việt để trong file dịch, không viết thẳng trong component).
- [ ] Đưa design token từ prototype vào Tailwind/CSS variables (màu `--primary`, `--bg`, `--surface`…, light + dark), font Manrope.
- [ ] Lint/format: Laravel Pint, ESLint + Prettier.
- [ ] GitHub Actions: job backend (Pint + PHPUnit với MySQL service), job frontend (lint + typecheck + build). CI phải xanh trước khi hết tuần.

## 2. Backend — Auth (ngày 2–4)

**Bảng dữ liệu**

- [ ] `users`: `name`, `email`, `phone` (nullable), `password`, `role` (CUSTOMER / ORGANIZER / ADMIN), `account_intent` (buyer / organizer, chọn ở bước sau xác minh email), `status` (active / locked), `email_verified_at`, `avatar_path`, `birthday`, `city`, `locale`, `timezone`.
- [ ] `notification_preferences`: user + loại email + bật/tắt (loại bắt buộc thì không tắt được).

**API**

- [ ] `POST /auth/register` → gửi email xác minh (qua queue).
- [ ] `POST /auth/email/verify`, `POST /auth/email/resend`.
- [ ] `POST /auth/login` → access token (15 phút) + refresh token (7 ngày). Sai 5 lần → khoá 15 phút (RateLimiter).
- [ ] `POST /auth/refresh`, `POST /auth/logout` (đưa token vào blacklist).
- [ ] `POST /auth/password/forgot` (luôn trả thành công, không lộ email có tồn tại hay không), `POST /auth/password/reset` (thu hồi mọi refresh token cũ).
- [ ] `PUT /me/account-intent`: lưu lựa chọn Mua vé / Tổ chức sự kiện (chỉ chọn 1 lần).
- [ ] `GET/PUT /me/profile`, `POST/DELETE /me/avatar` (lưu S3), `PUT /me/password`, `GET/PUT /me/notification-preferences`.
- [ ] Middleware kiểm tra role. Policy sẽ thêm dần từ tuần 2.
- [ ] Seeder: 1 admin, 1 customer, 1 organizer (chưa có tổ chức), danh sách tỉnh/thành.

## 3. Frontend (ngày 4–6)

Giao Codex từng màn theo prototype (xem mẫu prompt ở cuối file).

- [ ] Layout khách hàng: header (logo, ô tìm, Vé của tôi, đổi theme, chuông, avatar menu), footer. Chuông và Vé của tôi để link tạm, làm thật ở tuần 5–6.
- [ ] API client: gắn access token, tự gọi refresh khi nhận 401, chuyển về màn 8 khi refresh hết hạn.
- [ ] Route guard bằng `beforeLoad` theo role.
- [ ] Màn 8 — `prototype/08-Auth.dc.html`: đăng nhập, tạo tài khoản, xác minh email, **chọn loại tài khoản** (Mua vé → Trang chủ, Tổ chức sự kiện → màn 12, làm ở tuần 2), quên mật khẩu, đặt lại mật khẩu.
- [ ] Màn 9 — `prototype/09-Profile.dc.html`: tab Thông tin, Bảo mật (modal đổi mật khẩu), Cài đặt thông báo.
- [ ] Form theo quy ước ở overview, hiện lỗi validate từ API dưới từng ô.

## 4. Test

- [ ] PHPUnit (Feature): đăng ký, xác minh, đăng nhập đúng/sai, khoá sau 5 lần sai, refresh, logout, quên/đặt lại mật khẩu, sửa hồ sơ.
- [ ] Playwright: cài đặt + 1 test "đăng ký → xác minh (đọc mail từ Mailpit API) → đăng nhập".

## 5. Xong tuần khi

- [ ] Clone repo mới → điền `.env` → `composer run dev` + `npm run dev` → đăng ký và đăng nhập được.
- [ ] `docker compose up --build` cũng chạy được luồng trên.
- [ ] CI xanh trên GitHub.
- [ ] Màn 8 và 9 giống prototype ở cả light lẫn dark mode.
- [ ] Đã cập nhật [tracker.md](tracker.md).

## Rủi ro

- Cấu hình JWT + refresh token tốn thời gian hơn dự kiến → làm backend auth trước, UI sau.
- Docker trên Windows chậm khi mount thư mục `vendor/`, `node_modules/` → dùng named volume cho 2 thư mục này. Docker chỉ dùng để kiểm tra trước UAT nên không cần tối ưu thêm.
- Code lỡ phụ thuộc Redis (vd. `Redis::` trực tiếp) sẽ chạy lỗi khi dev trên máy → chỉ dùng facade `Queue`, `Cache`.

---

## Mẫu prompt giao Codex

```
Dựng màn <tên màn> theo prototype docs/prototype/<file>.dc.html.
- Chỉ dùng prototype để tham khảo layout, style, dữ liệu mẫu. Cú pháp {{...}},
  <x-dc>, <sc-if>, <sc-for>, support.js là của công cụ vẽ prototype — KHÔNG copy.
- Viết bằng React + TypeScript + Tailwind + shadcn/ui, theo cấu trúc frontend/src hiện có.
- Màu/font lấy từ design token đã cấu hình (không hardcode mã màu).
- Gọi API thật: <liệt kê endpoint>. Dữ liệu tải bằng TanStack Query.
- Ghi chú hành vi của màn nằm trong docs/prototype/canvas.json (mục notes, "HÀNH ĐỘNG — <tên màn>").
```
