# Chuẩn bị trước tuần 1

Xong hết danh sách này mới bắt đầu [tuần 1](week-1.md). Thiết kế kỹ thuật ở [overview.md](../overview.md), giao diện ở [DESIGN.md](../DESIGN.md) và [prototype/](../prototype/README.md).

## 1. Chốt thiết kế

Prototype đã đổi một số chỗ so với overview.md. Plan các tuần làm **theo prototype**; overview cần sửa lại cho khớp trước khi bắt đầu, vì Codex sẽ đọc overview.

- [ ] Trả lời 2 câu hỏi về thời gian làm task (xem [tracker.md](tracker.md) mục "Câu hỏi còn mở").
- [ ] Sửa overview.md theo bảng dưới (mục 1, 4, 5, 6, 7, 9).

| Chỗ | overview.md đang ghi | Làm theo |
|---|---|---|
| Trạng thái task | `BACKLOG / TODO / IN_PROGRESS / REVIEW / DONE` | `TODO / DOING / DEVDONE / RELEASE / DONE` |
| Ghi giờ | Đồng hồ bấm giờ, nhập giờ tay, bảng `time_entries` | Không có đồng hồ, không nhập tay. Kéo task Todo → Doing mở một **phiên làm việc**, Doing → Devdone đóng phiên; kéo lại về Doing mở phiên mới. Giờ của task = tổng các phiên. Bảng `work_sessions` thay `time_entries` |
| Ngày của task | `due_on` (date), `estimate_minutes` | `start_at`, `end_at` (ngày giờ, ô `dd/mm/yyyy HH:mm`); bỏ giờ ước tính |
| Ghi chú task | `task_notes` | **Bình luận** (`task_comments`), tab Bình luận / Lịch sử trong modal |
| Mô tả task | Markdown | Trình soạn thảo `mui-tiptap`, lưu HTML đã lọc (jsoup Safelist), chèn ảnh lên S3 |
| Chi tiết task | Drawer `?task=ACME-12` | Modal giữa màn hình (vẫn mở bằng `?task=ACME-12`) |
| Màn 8 | Chỉ có Kanban | 4 tab: Bảng · Danh sách · Gantt · Cài đặt |
| Giới hạn tuần | Thanh giới hạn + cảnh báo 80% / 100% (BR-10) | Giữ ô "Giới hạn giờ / tuần" trong cài đặt dự án và cột "Giờ tuần này" ở danh sách dự án; bỏ thanh và thông báo |
| Loại thông báo | `TIMER_LONG_RUNNING`, `WEEKLY_LIMIT` | `TASK_DOING_LONG` (task ở Doing quá 8 giờ); bỏ `WEEKLY_LIMIT` |
| Theme | Sáng / tối | Chỉ sáng (tối chưa thiết kế). Vẫn khai báo theme bằng `colorSchemes` để thêm tối sau |
| Mã lỗi | `TIME_ENTRY_OVERLAP`… | Bỏ; thêm `TASK_SESSION_OPEN` nếu cần (xem câu hỏi còn mở) |

## 2. Máy cá nhân

- [ ] **Node 22 LTS** (máy đang là 20.x). Dùng `nvm-windows` để giữ được cả 2 bản nếu Ticket Hub còn cần.
- [ ] JDK 21 (đã có 21.0.9). Kiểm tra `JAVA_HOME` trỏ đúng bản này.
- [ ] IntelliJ IDEA (Community đủ dùng), bật annotation processing cho MapStruct. Không dùng Lombok (DTO là `record`).
- [ ] Docker Desktop đang chạy (đã có 28.4). Dev cần container `postgres` và `mailpit`, test cần Testcontainers.
- [ ] Công cụ xem DB: DBeaver hoặc database tool của IntelliJ.

## 3. Tài khoản & key

- [ ] **AWS** (dùng chung tài khoản với Ticket Hub):
  - Bucket `taskboard-dev` và `taskboard-uat`: chặn public access, CORS cho `http://localhost:5173` (dev) và domain UAT (thêm ở tuần 8), lifecycle xoá object có tag `pending=true` sau 1 ngày.
  - IAM user `taskboard-app`, chỉ cấp `s3:GetObject`, `s3:PutObject`, `s3:DeleteObject` trên 2 bucket trên.
  - Kiểm tra AWS Budget vẫn còn cảnh báo (cả 2 dự án dùng chung $100 credit).
- [ ] **Amazon SES:** dùng lại địa chỉ đã xác minh của Ticket Hub (cần ở tuần 8).
- [ ] **Domain UAT:** một subdomain riêng, ví dụ `taskboard.<domain>` (cần ở tuần 8).
- [ ] **Codex:** đăng nhập và mở được repo.

## 4. Repo

- [ ] Tạo nhánh làm việc cho taskboard.
- [ ] Commit thư mục `docs/` (overview, DESIGN, prototype, plans).
- [ ] GitHub Secrets cho CI: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` (chỉ cần nếu có test gọi S3 thật; mặc định test dùng stub). Secret deploy thêm ở tuần 8.

## 5. Kiểm tra cuối

- [ ] `java -version` (21.x), `node -v` (22.x), `docker --version`, `aws --version` chạy được.
- [ ] `docker run --rm postgres:18 postgres --version` kéo được image PostgreSQL 18.
- [ ] Upload thử 1 file lên `taskboard-dev` bằng AWS CLI với key của `taskboard-app`; thử xoá được, thử đọc bucket khác bị từ chối.
- [ ] overview.md đã khớp với prototype (mục 1 ở trên).
