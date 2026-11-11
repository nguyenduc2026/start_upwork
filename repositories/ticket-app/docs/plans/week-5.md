# Tuần 5 — Vé của tôi, đơn hàng, check-in, kênh BTC

**Mục tiêu:** khách xem được vé và đơn hàng của mình, BTC check-in khách tại cổng bằng camera điện thoại và theo dõi được doanh thu, đơn hàng.

**Màn hình:** 11 (Đơn hàng của tôi), 13 (Vé của tôi — desktop), 14 (Vé của tôi — mobile), 15 (Vé QR — mobile), 16 (Check-in), 17 (Tổng quan BTC), 21 (Đơn hàng BTC).

**Thời lượng dự kiến:** ~18 giờ.

---

## 1. Phía khách hàng (ngày 1–3)

**API**

- [ ] `GET /me/tickets?tab=upcoming|past|refunded&q=` (phân trang 6 vé/trang trên desktop).
- [ ] `GET /me/tickets/:code` (dữ liệu QR + thông tin ghế, đơn hàng).
- [ ] `GET /me/bookings` (lọc trạng thái, tìm theo mã đơn / tên sự kiện), `GET /me/bookings/:code` (chi tiết + dòng thời gian).
- [ ] `GET /me/bookings/:code/invoice.pdf` — có thể để tuần 7 cùng PDF vé.

**Frontend**

- [ ] Màn 13 — `prototype/13-MyTickets.dc.html`: lưới vé, tab, modal QR. Header "Vé của tôi" trên desktop trỏ về màn này.
- [ ] Màn 14 — `prototype/14-MyTicketsMobile.dc.html` và màn 15 — `prototype/15-TicketQR.dc.html`: dùng chung route `/me/tickets`, đổi layout theo kích thước màn hình (breakpoint), không làm 2 trang riêng.
- [ ] Màn 11 — `prototype/11-MyBookings.dc.html`: banner đơn đang giữ ghế (Tiếp tục thanh toán / Huỷ giữ chỗ), bảng đơn, modal chi tiết. Nút hoàn vé để tuần 6.

## 2. Check-in (ngày 3–4)

- [ ] `POST /organizer/events/:id/checkin` (nội dung QR): kiểm tra chữ ký HMAC → vé đúng sự kiện → trạng thái. Trả `VALID` (đánh dấu USED, lưu giờ + người quét), `ALREADY_USED` (kèm giờ đã quét), `INVALID`.
- [ ] Dùng `UPDATE … WHERE status='VALID'` để 2 cổng quét cùng 1 vé thì chỉ 1 cổng nhận Hợp lệ.
- [ ] Policy: OWNER hoặc CHECKIN_STAFF được giao sự kiện đó.
- [ ] Màn 16 — `prototype/16-Checkin.dc.html`: quét liên tục bằng camera (`@zxing/browser`), kết quả xanh/vàng/đỏ, bộ đếm đã check-in / tổng vé.
- [ ] Thử thật trên điện thoại (camera cần HTTPS: mở tunnel bằng `cloudflared`).

## 3. Kênh BTC (ngày 5–6)

- [ ] `GET /organizer/dashboard`: doanh thu (đã trừ phí 5%), vé đã bán, số sự kiện đang bán, đã check-in, đơn gần đây, sự kiện gần đây.
- [ ] `GET /organizer/orders` (lọc sự kiện, trạng thái, thời gian, tìm), `POST /organizer/orders/:code/resend-email`.
- [ ] Màn 17 — `prototype/17-OrgDashboard.dc.html`.
- [ ] Màn 21 — `prototype/21-OrgOrders.dc.html` (BTC không có nút hoàn tiền).
- [ ] Nối các thao tác ở màn 18: Xem đơn hàng (lọc sẵn sự kiện), Check-in.

## 4. Test

- [ ] PHPUnit: check-in hợp lệ / đã dùng / QR giả / vé của sự kiện khác; 2 lần quét đồng thời; nhân viên check-in không được giao sự kiện bị 403; số liệu tổng quan BTC đúng.
- [ ] Playwright: khách mở Vé của tôi → Xem vé → thấy QR.

## 5. Xong tuần khi

- [ ] Quét QR từ email bằng điện thoại → màn 16 báo Hợp lệ, quét lần 2 báo Đã sử dụng.
- [ ] BTC thấy doanh thu và đơn hàng khớp với dữ liệu đã mua ở tuần 4.
- [ ] Đã cập nhật [tracker.md](tracker.md).

## Rủi ro

- Camera trên mobile web cần HTTPS và quyền truy cập: chuẩn bị tunnel từ đầu tuần.
