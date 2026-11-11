# Chuẩn bị trước tuần 1

Xong hết danh sách này mới bắt đầu [tuần 1](week-1.md). Thiết kế và các lựa chọn kỹ thuật nằm ở [overview.md](../overview.md).

## 1. Máy cá nhân

- [ ] **Nâng cấp PHP trên máy.** XAMPP đang chạy PHP 8.2.12 (bản build từ 10/2023), có dính PHP2Shell (CVE-2026-109618 / 109619, đã có người khai thác thật):
  - Gỡ XAMPP, hoặc cài bản XAMPP có PHP ≥ 8.4.27. Nếu vẫn giữ XAMPP thì không để Apache của XAMPP chạy thường trực.
  - Dev hằng ngày chạy `php artisan serve` nên **bắt buộc** có PHP 8.4 bản mới nhất trên máy, bật extension `pdo_mysql`, `mbstring`, `openssl`, `gd`, `intl`, `zip`, `fileinfo`.
  - Thêm vào `php.ini` đang dùng: `session.upload_progress.enabled = 0`.
- [ ] Composer 2 bản mới nhất (`composer self-update`).
- [ ] **MySQL 8.4** cài trên máy (MariaDB của XAMPP khác MySQL ở vài chỗ, không dùng). Tạo database `ticket_hub` và `ticket_hub_test`.
- [ ] **Mailpit** bản Windows (.exe) để xem email khi dev (`http://localhost:8025`).
- [ ] Stripe CLI bản Windows, chạy `stripe login` một lần.
- [ ] `cloudflared` để mở HTTPS tạm thời, cần khi thử camera check-in trên điện thoại (tuần 5).

## 2. Tài khoản & key

- [ ] **Stripe:** tài khoản ở test mode, lấy `STRIPE_KEY` và `STRIPE_SECRET`. Webhook secret local lấy từ `stripe listen`.
- [ ] **AWS:**
  - Bật MFA cho root, tạo IAM user riêng để làm việc hằng ngày.
  - Tạo AWS Budget cảnh báo ở mức $10/tháng.
  - Tạo bucket S3 `ticket-hub-dev` (dev trên máy + Docker) và `ticket-hub-demo` (UAT), chặn public access, bật CORS cho domain frontend.
  - Tạo IAM user `ticket-hub-app`, chỉ cấp quyền đọc/ghi 2 bucket trên, lấy access key cho `.env`.
- [ ] **Amazon SES:** xác minh 1 địa chỉ email gửi đi (dùng ở tuần 8, local vẫn dùng Mailpit).
- [ ] **Domain** cho UAT (cần ở tuần 8, nên mua sớm). Có thể dùng subdomain của domain sẵn có.
- [ ] **Codex:** đã đăng nhập và mở được repo.

## 3. Repo

- [ ] Tạo nhánh làm việc cho ticket-app.
- [ ] Commit thư mục `docs/` hiện tại (overview, prototype, plans).
- [ ] Tạo sẵn GitHub Secrets cho CI: `STRIPE_SECRET` (test), `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`. Secret cho phần deploy thêm ở tuần 8.

## 4. Kiểm tra cuối

- [ ] `php -v` báo ≥ 8.4.27, `composer -V`, `mysql --version` (8.4.x), `node -v` (22.x), `stripe --version` chạy được.
- [ ] Mailpit mở được `http://localhost:8025`.
- [ ] `docker run hello-world` chạy được (Docker chỉ cần khi kiểm tra trước UAT).
- [ ] Upload thử 1 file lên `ticket-hub-dev` bằng AWS CLI với key của `ticket-hub-app`.
