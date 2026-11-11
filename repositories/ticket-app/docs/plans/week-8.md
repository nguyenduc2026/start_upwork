# Tuần 8 — Deploy AWS, README, video demo, hoàn thiện giao diện

**Mục tiêu:** có link demo chạy thật trên AWS, README và video đủ để đưa vào hồ sơ Upwork.

**Thời lượng dự kiến:** ~18 giờ.

---

## 1. Deploy AWS (ngày 1–3)

Ngân sách: ~$100 credit cho 100 ngày → UAT chạy thường trực phải rẻ. Trước khi deploy, chạy `docker compose up --build` + test trong container trên máy.

- [ ] Dựng UAT theo overview mục 1–2:
  - 1 EC2 t4g.small, cài Docker, chạy Docker Compose bản production: nginx (phục vụ cả frontend build tĩnh), PHP-FPM, queue worker, scheduler, MySQL, Redis.
  - `.env` production trỏ S3 sang bucket `ticket-hub-demo`, email sang Amazon SES.
  - Trỏ domain về Elastic IP, cấp HTTPS bằng Let's Encrypt (certbot). Bắt buộc có HTTPS để camera check-in chạy trên điện thoại.
  - Backup MySQL hằng ngày lên S3 (cron `mysqldump`).
- [ ] Stripe webhook trỏ về domain thật (test mode).
- [ ] GitHub Actions: build image → push GitHub Container Registry → SSH vào EC2 `docker compose pull && up -d` + `php artisan migrate --force` khi merge vào `main`.
- [ ] Kiểm tra AWS Budget đã cảnh báo đúng ngưỡng (tạo từ bước chuẩn bị).

## 2. README + tài liệu (ngày 4)

README là thứ khách Upwork đọc đầu tiên → viết bằng **tiếng Anh**:

- [ ] Giới thiệu 3 dòng + ảnh chụp màn hình + link demo + tài khoản demo (customer / organizer / admin).
- [ ] Sơ đồ kiến trúc, danh sách tính năng theo 3 vai trò.
- [ ] Mục "Điểm kỹ thuật": chống bán trùng ghế (kèm test tranh chấp), webhook idempotent, job batching hoàn tiền, phân quyền bằng Policy, audit log.
- [ ] Hướng dẫn chạy local theo 2 cách (thẳng trên máy, Docker), chạy test.

## 3. Video demo (ngày 5)

- [ ] Video 3–5 phút: mua vé → nhận email QR → check-in bằng điện thoại → hoàn vé → Admin huỷ sự kiện.
- [ ] Đăng YouTube (không công khai) và gắn link vào README.

## 4. Hoàn thiện giao diện (ngày 5–6)

- [ ] So từng màn với prototype ở light + dark mode; kiểm tra bản mobile của các màn khách hàng.
- [ ] Lighthouse cho trang công khai (1–3): Performance, Accessibility ≥ 90.
- [ ] Rà lỗi chính tả, text còn sót, ảnh mẫu.
- [ ] Thêm bản tiếng Anh: dịch file i18n của frontend và backend (email, thông báo, thông báo lỗi), thêm nút đổi ngôn ngữ ở header và footer. Bản demo mặc định tiếng Anh.

## 5. Xong tuần khi

- [ ] Link demo HTTPS mở được từ máy khác, đăng nhập bằng tài khoản demo.
- [ ] README tiếng Anh + video demo có trong repo.
- [ ] Toàn bộ checklist trong [tracker.md](tracker.md) đã xong.
