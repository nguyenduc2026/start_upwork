# Tuần 4 — Chọn ghế, giữ ghế, thanh toán Stripe, phát hành vé

**Mục tiêu:** luồng mua vé chạy trọn vẹn: chọn ghế → giữ ghế 10 phút → thanh toán thẻ test → webhook → vé QR gửi qua email. Đây là tuần quan trọng nhất của dự án.

**Màn hình:** 4 (Chọn ghế), 5 (Thanh toán), 6 (Thanh toán thành công), một phần màn 7 (các trạng thái lỗi của luồng mua).

**Thời lượng dự kiến:** ~20 giờ (tuần nặng, nên dành thêm thời gian).

---

## 1. Giữ ghế — chống bán trùng (ngày 1–2)

**Bảng dữ liệu**

- [ ] `bookings`: code (`TR-XXXXXX`), user_id, event_id, `status` (PENDING_PAYMENT / CONFIRMED / EXPIRED / CANCELLED / REFUND_REQUESTED / REFUNDED), `subtotal`, `platform_fee`, `total`, `expires_at`, `stripe_payment_intent_id`.
- [ ] `booking_items`: booking_id, event_seat_id, ticket_tier_id, giá.

**API**

- [ ] `GET /events/:slug/seats`: sơ đồ + trạng thái từng ghế (tải lại định kỳ để thấy ghế người khác vừa giữ).
- [ ] `POST /bookings` (danh sách `event_seat_id`):
  - kiểm tra tối đa `max_tickets_per_user`, **BR-02** (mỗi user 1 đơn PENDING_PAYMENT cho mỗi sự kiện);
  - trong transaction: `UPDATE event_seats SET status='HELD', booking_id=?, held_until=? WHERE id IN (...) AND status='AVAILABLE'`; số dòng cập nhật < số ghế chọn → rollback, trả **409 SEAT_UNAVAILABLE**.
- [ ] `DELETE /bookings/:code` (khách huỷ giữ chỗ → nhả ghế).
- [ ] Scheduler mỗi phút: booking quá `expires_at` → EXPIRED, nhả ghế.

## 2. Thanh toán Stripe (ngày 3–4)

- [ ] `POST /bookings/:code/payment-intent`: tạo PaymentIntent (test mode, `currency=usd`, số tiền theo cent), lưu id, trả `client_secret`.
- [ ] `POST /stripe/webhook`: xác thực chữ ký; bảng `stripe_events` (event_id unique) để xử lý **idempotent**; chỉ khi `payment_intent.succeeded` mới CONFIRMED + ghế SOLD + phát hành vé. Xử lý cả `payment_intent.payment_failed`.
- [ ] Webhook đến sau khi booking đã EXPIRED → hoàn tiền tự động, ghi log (trường hợp hiếm nhưng phải có).
- [ ] Dev trên máy: `stripe listen --forward-to localhost:8000/api/v1/stripe/webhook`; khi chạy Docker thì dùng service `stripe-cli`.

## 3. Phát hành vé + email (ngày 4–5)

- [ ] `tickets`: code (`TK-XXXXXX`), booking_item_id, `status` (VALID / USED / REVOKED), `checked_in_at`, `checked_in_by`.
- [ ] Nội dung QR = mã vé + chữ ký **HMAC-SHA256** (secret trong `.env`), không đoán hay giả được.
- [ ] Job `SendTicketsEmail` (queue Redis): email có danh sách vé + ảnh QR. Kiểm tra trong Mailpit.
- [ ] `GET /bookings/:code/calendar.ics`.

## 4. Frontend (ngày 5–6)

- [ ] Màn 4 — `prototype/04-SeatSelect.dc.html`: sơ đồ SVG (zoom − / + / Vừa màn hình), chọn/bỏ ghế, tooltip ghế đã bán/đang giữ, quá 6 ghế → toast, danh sách ghế đã chọn.
- [ ] Màn 5 — `prototype/05-Checkout.dc.html`: đồng hồ đếm ngược theo `expires_at`, Stripe Payment Element, tóm tắt đơn (Tạm tính, Tổng thanh toán, "Đã bao gồm phí dịch vụ").
- [ ] Màn 6 — `prototype/06-Success.dc.html`: khi webhook chưa về thì hiện "Đang xác nhận" và poll trạng thái booking.
- [ ] Màn 7 (một phần) — `prototype/07-SystemStates.dc.html`: Ghế vừa có người giữ (409), Đã có đơn chờ (BR-02), Hết giờ giữ ghế, Thanh toán lỗi, Đang xác nhận, Cần đăng nhập.

## 5. Test

- [ ] PHPUnit — **test tranh chấp ghế**: 2 request giữ cùng 1 ghế cùng lúc → đúng 1 thành công, 1 nhận 409.
- [ ] PHPUnit: BR-02; vượt max vé; scheduler nhả ghế hết hạn; webhook sai chữ ký → 400; webhook gửi 2 lần → chỉ phát hành vé 1 lần; chữ ký HMAC của vé.
- [ ] Playwright: chọn ghế → thanh toán bằng thẻ test `4242 4242 4242 4242` → thấy màn thành công.

## 6. Xong tuần khi

- [ ] Mua được vé bằng thẻ test, nhận email có QR trong Mailpit.
- [ ] Test tranh chấp ghế và test webhook idempotent đều xanh trên CI.
- [ ] Đã cập nhật [tracker.md](tracker.md).

## Rủi ro

- Webhook là phần dễ lỗi nhất: viết test với payload mẫu của Stripe trước khi nối UI.
- Không kịp thì để lại phần tải lại trạng thái ghế định kỳ (màn 4) sang tuần 5; bắt buộc phải xong giữ ghế, thanh toán và phát hành vé.
