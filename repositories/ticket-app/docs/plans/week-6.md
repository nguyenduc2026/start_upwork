# Tuần 6 — Hoàn vé, kiểm soát sự kiện, thông báo, audit log

**Mục tiêu:** khách yêu cầu hoàn vé, Admin duyệt và tiền hoàn qua Stripe. Admin tạm dừng / huỷ được sự kiện (huỷ thì hoàn tiền hàng loạt). Thông báo trong app chạy trên mọi trang. Admin xem được audit log.

**Màn hình:** 11 + 15 (yêu cầu hoàn vé), 28 (Đơn hàng & hoàn tiền), 30 (Admin — Sự kiện), 10 (Thông báo + popover chuông), 29 (Audit log).

**Thời lượng dự kiến:** ~20 giờ (tuần nặng).

---

## 1. Hoàn vé (ngày 1–2)

- [ ] `POST /me/bookings/:code/refund-request` (lý do, ghi chú): kiểm tra **BR-07** (không hoàn trong 48h trước giờ diễn) → booking REFUND_REQUESTED. **BR-09:** hoàn cả đơn, khách không rút lại yêu cầu được.
- [ ] Admin: `GET /admin/orders?tab=all|refund_requests`, `POST /admin/orders/:code/refund/approve` → Stripe Refund API với số tiền = tổng − phí 5% → REFUNDED, vé REVOKED, ghế không mở bán lại; `POST …/refund/reject` (lý do bắt buộc). Ghi audit log.
- [ ] Xử lý webhook `charge.refunded` để đồng bộ trạng thái nếu hoàn từ Stripe Dashboard.
- [ ] Frontend: modal hoàn vé ở màn 11 và bottom sheet ở màn 15; modal "Đã quá hạn hoàn vé"; màn 28 — `prototype/28-AdminOrders.dc.html` (2 tab, modal chi tiết có dòng thời gian, Mở trong Stripe).

## 2. Admin kiểm soát sự kiện (ngày 2–3)

- [ ] `POST /admin/events/:id/suspend` (lý do bắt buộc, **BR-13**) / `resume`.
- [ ] `POST /admin/events/:id/cancel` (lý do + gõ `HUY`, **BR-08**): huỷ các đơn PENDING_PAYMENT, hoàn **100% kể cả phí** mọi đơn CONFIRMED bằng **job batching** (`Bus::batch`), mỗi đơn 1 job, theo dõi tiến độ, job lỗi thì retry.
- [ ] Màn 30 — `prototype/30-AdminEvents.dc.html`: bảng + side sheet chi tiết (`?event=`), modal tạm dừng / mở bán lại / huỷ.
- [ ] Màn 3 và màn 18 hiện đúng trạng thái Tạm dừng (badge + lý do).

## 3. Thông báo trong app (ngày 4–5)

- [ ] Laravel notifications kênh `database` + `mail` (theo `notification_preferences`). Các loại: đặt vé thành công, sắp hết giờ giữ ghế, hoàn tiền (duyệt / từ chối), sự kiện bị huỷ / tạm dừng, hồ sơ BTC được duyệt / từ chối, nhắc mở bán (nút "Nhắc tôi" ở màn 1, 3).
- [ ] API: `GET /me/notifications` (tab tất cả / chưa đọc, lọc loại, phân trang), `GET /me/notifications/unread-count`, đánh dấu đã đọc / chưa đọc / tất cả, xoá.
- [ ] Popover chuông dùng chung cho mọi layout (khách, BTC, Admin): 3 thông báo mới nhất, chưa đọc có nền xanh nhạt + chấm xanh + chữ đậm, đường kẻ giữa các thông báo, "Đánh dấu tất cả đã đọc". Số chưa đọc **poll 30 giây** (TanStack Query `refetchInterval`).
- [ ] Màn 10 — `prototype/10-Notifications.dc.html`.

## 4. Audit log — trang xem (ngày 6)

- [ ] `GET /admin/audit-logs` (tìm, hành động, người thực hiện, khoảng thời gian), xuất CSV.
- [ ] Màn 29 — `prototype/29-AdminAuditLogs.dc.html`: modal so sánh Trước / Sau (JSON), sao chép JSON.
- [ ] Rà lại: mọi thao tác Admin/BTC đã ghi log chưa (duyệt hồ sơ, đổi role, khoá user, hoàn tiền, tạm dừng/huỷ, publish, sửa sơ đồ).

## 5. Test

- [ ] PHPUnit: BR-07 (48h), BR-09, tiền hoàn = tổng − 5%; huỷ sự kiện hoàn 100% và huỷ đơn chờ; chỉ Admin tạm dừng/huỷ được; thông báo tạo đúng người nhận; dùng `Http::fake` / mock Stripe client.
- [ ] Playwright: khách yêu cầu hoàn → Admin duyệt → khách thấy "Đã hoàn tiền" + thông báo.

## 6. Xong tuần khi

- [ ] Hoàn tiền thật trên Stripe test mode (thấy refund trong Stripe Dashboard).
- [ ] Huỷ 1 sự kiện có 5 đơn → cả 5 đơn được hoàn, khách nhận thông báo + email.
- [ ] Chuông có số chưa đọc đúng ở mọi layout.
- [ ] Đã cập nhật [tracker.md](tracker.md).

## Rủi ro

- Job batching + Stripe dễ lỗi khi gọi API thất bại giữa chừng: mỗi job phải idempotent (kiểm tra đã hoàn chưa trước khi gọi Stripe).
