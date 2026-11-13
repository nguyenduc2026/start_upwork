# Tracker — Taskboard (8 tuần)

Cập nhật cuối mỗi buổi làm: đánh dấu việc xong, ghi 1–2 dòng vào **Nhật ký**. Không ghi ngày cụ thể ở file này.

## Câu hỏi còn mở

Phải chốt trước tuần 5 (ảnh hưởng bảng `work_sessions` và cách tính tiền). Chốt xong thì ghi kết quả vào đây và sửa overview.md.

1. **Task để ở Doing qua đêm / ngoài giờ** có tính giờ không?
   - Đề xuất: tính đúng giờ thật (đơn giản, dễ giải thích), kèm nhắc "Task ở Doing quá 8 giờ" để tự kéo ra; thêm nút sửa giờ kết thúc của phiên gần nhất trong tab Lịch sử của modal để chữa khi quên.
   - Cách khác: chỉ tính trong khung giờ làm việc cài đặt sẵn (ví dụ 8:00–18:00) — đúng hơn nhưng thêm cài đặt và SQL phức tạp hơn.
2. **Nhiều task ở Doing cùng lúc** thì cộng giờ thế nào?
   - Đề xuất: cho phép, mỗi task có phiên riêng, giờ của task cộng đủ; nhưng timesheet / báo cáo tiền thì **không cộng chồng**: khoảng thời gian trùng nhau chỉ tính 1 lần cho thu nhập (chia đều cho các task đang chạy).
   - Cách khác: chỉ cho 1 task ở Doing — kéo task thứ 2 vào Doing thì task cũ tự về Todo (giống đồng hồ bấm giờ cũ, BR-09).

## Tiến độ theo tuần

| Tuần | Nội dung | Trạng thái |
|---|---|---|
| [Chuẩn bị](chuan-bi.md) | Chốt thiết kế + sửa overview, Node 22, AWS (S3, IAM), domain | ⬜ |
| [1](week-1.md) | Khung dự án, module `shared`, auth JWT + refresh cookie, hồ sơ & cài đặt (1, 14) | ⬜ |
| [2](week-2.md) | Khách hàng, pipeline job kéo-thả (3, 4, 5, 6) | ⬜ |
| [3](week-3.md) | Dự án, sprint, phân loại, chuyển job thành dự án, bảng task (7, 8, 9, 13) | ⬜ |
| [4](week-4.md) | Modal task đầy đủ, Gantt, Task của tôi, Ctrl+K (8, 9, 10) | ⬜ |
| [5](week-5.md) | Thời gian tự động theo cột Doing, timesheet (11) | ⬜ |
| [6](week-6.md) | Realtime, thông báo, nhắc việc, Hôm nay (2, 15) | ⬜ |
| [7](week-7.md) | Báo cáo, xuất PDF / Excel, trang lỗi, tiếng Anh, test (12, 16) | ⬜ |
| [8](week-8.md) | Deploy AWS, backup, README, video demo | ⬜ |

Ký hiệu: ⬜ chưa bắt đầu · 🟨 đang làm · ✅ xong · ⚠️ trễ

## Màn hình (16)

Đánh dấu khi màn chạy với API thật và giống prototype.

- [ ] 01 Đăng nhập / Đăng ký / Xác minh email / Quên mật khẩu — tuần 1
- [ ] 02 Hôm nay — tuần 6
- [ ] 03 Pipeline job — tuần 2
- [ ] 04 Chi tiết job + Chuyển thành dự án — tuần 2, 3
- [ ] 05 Khách hàng — tuần 2
- [ ] 06 Chi tiết khách hàng — tuần 2, 3
- [ ] 07 Dự án — tuần 3
- [ ] 08 Bảng dự án: Bảng · Danh sách · Gantt — tuần 3, 4
- [ ] 09 Thêm / sửa task — tuần 3, 4
- [ ] 10 Task của tôi — tuần 4
- [ ] 11 Timesheet — tuần 5
- [ ] 12 Báo cáo — tuần 7
- [ ] 13 Cài đặt dự án — tuần 3
- [ ] 14 Hồ sơ & cài đặt — tuần 1
- [ ] 15 Thông báo + popover chuông — tuần 6
- [ ] 16 Trạng thái lỗi — tuần 7

## Điểm kỹ thuật phải có test

- [ ] `ModularityTests` xanh từ tuần 1, sinh sơ đồ module — tuần 1, 7
- [ ] Refresh token rotation, dùng lại token cũ → thu hồi cả family — tuần 1
- [ ] `FractionalIndex` (đầu, cuối, giữa, chèn 1000 lần cùng một chỗ) — tuần 1
- [ ] Máy trạng thái job BR-03 — tuần 2
- [ ] Optimistic lock task / job → 409 — tuần 2, 3
- [ ] Cấp số task đồng thời không trùng — tuần 3
- [ ] Lọc HTML mô tả (chống XSS), upload S3 presigned + dọn `PENDING` — tuần 4
- [ ] Phiên làm việc mở / đóng theo cột Doing, idempotent khi listener chạy lại — tuần 5
- [ ] Ranh giới tuần / ngày UTC và múi giờ user (Clock cố định) — tuần 1, 5, 6
- [ ] Nhắc việc không gửi trùng (`dedupe_key`) — tuần 6
- [ ] WebSocket từ chối token sai, không lộ event giữa 2 user — tuần 6
- [ ] BR-01 cho mọi endpoint (test tham số hoá) — tuần 7
- [ ] Báo cáo đúng tới từng cent — tuần 7
- [ ] 5 luồng Playwright E2E chạy trong CI — tuần 7

## Nhật ký

| Buổi | Đã làm | Vướng / ghi chú |
|---|---|---|
| | | |
