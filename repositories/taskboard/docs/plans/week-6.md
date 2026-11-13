# Tuần 6 — Realtime, thông báo, nhắc việc, dashboard Hôm nay

**Mục tiêu:** 2 tab / 2 máy cùng mở thấy thay đổi của nhau ngay; thông báo trong app và email; nhắc việc chạy định kỳ theo giờ địa phương; màn Hôm nay có số liệu thật.

**Màn hình:** 15 (Thông báo), popover chuông trên header, 2 (Hôm nay).

**Thời lượng dự kiến:** ~18 giờ.

---

## 1. Realtime WebSocket (ngày 1–2)

- [ ] `WebSocketConfig`: STOMP endpoint `/ws`, simple broker, prefix `/user`. `ChannelInterceptor` đọc access token ở header `CONNECT`, decode bằng `JwtDecoder` → đặt `Principal` = user id; token sai → từ chối kết nối.
- [ ] Module `realtime` nghe event (`TaskCreated`, `TaskUpdated`, `TaskMoved`, `TaskDeleted`, `JobStatusChanged`, `NotificationCreated`) → `convertAndSendToUser(ownerId, "/queue/events", payload)` với payload theo overview mục 5 (`type`, `id`, `projectKey`, `version`, `originClientId`).
- [ ] `originClientId`: filter đọc header `X-Client-Id` → `ScopedValue` / request attribute → đưa vào event lúc publish.
- [ ] nginx (Docker) và proxy Vite: upgrade WebSocket cho `/ws`.
- [ ] Frontend `lib/realtime.ts`: `@stomp/stompjs`, tự nối lại, kết nối lại khi access token đổi. `features/realtime`: nhận event → bỏ qua nếu `originClientId` = tab mình → `invalidateQueries` đúng query key (bảng dự án, task, pipeline, số chưa đọc).
- [ ] Đang mở modal task mà tab khác sửa task đó → hiện thông báo nhỏ "Task vừa được sửa ở nơi khác" + nút tải lại (không ghi đè form đang sửa).

## 2. Thông báo (ngày 2–4)

**Migration** `V9__notification_init.sql`: `notifications` (overview mục 4, `dedupe_key` unique theo owner).

- [ ] `NotificationService.notify(ownerId, type, dedupeKey, title, body, link, data)`: đọc `notification_preferences` (không có dòng = mặc định trong code) → ghi bảng nếu bật trong app, gửi email nếu bật email; trùng `dedupe_key` thì bỏ qua (`ON CONFLICT DO NOTHING`). Publish `NotificationCreated`.
- [ ] Listener: `JobStatusChanged` (sang Phỏng vấn / Được thuê), `TaskMoved` sang Done ("ACME-10 đã hoàn thành").
- [ ] `@Scheduled` mỗi 15 phút, chọn user có giờ địa phương = `reminder_hour` (BR-16):
  - task có `end_at` vào ngày mai → `TASK_DUE_SOON`; task quá hạn chưa Done;
  - job `APPLIED` / `INTERVIEWING` có `follow_up_on` = hôm nay → `JOB_FOLLOW_UP`.
- [ ] `@Scheduled` mỗi 15 phút: task có phiên đang mở quá 8 giờ → `TASK_DOING_LONG` (dedupe theo id phiên).
- [ ] `@Scheduled` sáng Thứ 2 theo giờ địa phương: email tổng kết tuần trước (tổng giờ, thu nhập, task xong) → `WEEKLY_SUMMARY`.
- [ ] Email bằng Thymeleaf (`templates/mail/`), text lấy từ `messages_vi.properties`, link về đúng màn (`/projects/ACME?task=ACME-12`).
- [ ] API: `GET /notifications?type=&status=&from=&q=&page=&size=`, `GET /notifications/unread-count`, `POST /notifications/{id}/read`, `POST /notifications/read-all`.
- [ ] Frontend: chuông có badge `primary`, popover 10 thông báo mới nhất + "Đánh dấu đã đọc" + link "Xem tất cả"; Màn 15 — `prototype/15-thong-bao.dc.html`.
- [ ] Nối tab Thông báo ở màn 14 (đã làm ở tuần 1) với loại thông báo cuối cùng.

## 3. Dashboard Hôm nay (ngày 5–6)

- [ ] `GET /dashboard/today` (module `reporting`, SQL thuần): 4 số (giờ tuần này so với mục tiêu tuần, task quá hạn, task hôm nay, job cần follow-up), bảng task cần làm (nhóm Quá hạn · Hôm nay · Ngày mai · Sắp tới), bảng job cần follow-up, khối "Đang làm" (task đang có phiên mở: mã, tên, từ mấy giờ, đã bao lâu), khối giờ tuần này theo dự án (thanh ngang, có giới hạn tuần nếu đặt).
- [ ] Màn 2 — `prototype/02-hom-nay.dc.html`. Khối Đang làm tự tăng thời gian mỗi phút ở frontend.

## 4. Test

- [ ] Tích hợp: kết nối STOMP không token / token sai bị từ chối; user A không nhận event của user B (test bằng `WebSocketStompClient`).
- [ ] Nhắc việc (Clock cố định): user ở `Asia/Ho_Chi_Minh` `reminder_hour = 8` chỉ nhận lúc 8h giờ VN; chạy scheduler 2 lần không gửi trùng; tắt loại thông báo thì không gửi; email xuất hiện trong Mailpit (test tích hợp dùng GreenMail hoặc kiểm tra `JavaMailSender` giả).
- [ ] `@ApplicationModuleTest`: `TaskMoved` sang Done → có thông báo; listener lỗi thì `event_publication` còn bản ghi chưa hoàn thành.
- [ ] Playwright: mở 2 tab, kéo task ở tab 1 → tab 2 thấy thẻ đổi cột không cần F5.

## 5. Xong tuần khi

- [ ] Realtime chạy giữa 2 trình duyệt khác nhau.
- [ ] Nhận được email nhắc việc thật trong Mailpit đúng giờ cấu hình.
- [ ] Màn 2, 15 và popover chuông giống prototype.
- [ ] Đã cập nhật [tracker.md](tracker.md).

## Rủi ro

- Spring Security cho WebSocket (bản 7) cấu hình khác bản cũ → xác thực ở `ChannelInterceptor` lúc `CONNECT` như overview, không dùng session.
- Scheduler theo múi giờ dễ sai → luôn tính "giờ địa phương hiện tại" từ `Clock` + `ZoneId` của user, test bằng Clock cố định trước khi chạy thật.
