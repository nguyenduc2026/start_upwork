# Tracker — Ticket Hub (8 tuần)

Cập nhật cuối mỗi buổi làm: đánh dấu việc xong, ghi 1–2 dòng vào **Nhật ký**.

## Tiến độ theo tuần

| Tuần | Thời gian | Nội dung | Trạng thái |
|---|---|---|---|
| [Chuẩn bị](chuan-bi.md) | trước 16/11 | PHP an toàn, Docker, Node 22, Stripe, AWS (S3, IAM, Budget), domain | ⬜ |
| [1](week-1.md) | 16/11 – 22/11/2026 | Khung dự án, auth JWT, hồ sơ (8, 9) | ⬜ Chưa bắt đầu |
| [2](week-2.md) | 23/11 – 29/11 | Địa điểm, sơ đồ ghế, đăng ký & duyệt BTC (12, 22, 24, 26, 27) | ⬜ |
| [3](week-3.md) | 30/11 – 06/12 | Sự kiện, hạng vé, publish, trang công khai (1–3, 18–20) | ⬜ |
| [4](week-4.md) | 07/12 – 13/12 | Chọn ghế, giữ ghế, Stripe, phát hành vé (4–6, 7) | ⬜ |
| [5](week-5.md) | 14/12 – 20/12 | Vé của tôi, đơn hàng, check-in, kênh BTC (11, 13–17, 21) | ⬜ |
| [6](week-6.md) | 21/12 – 27/12 | Hoàn vé, kiểm soát sự kiện, thông báo, audit log (10, 28–30) | ⬜ |
| [7](week-7.md) | 28/12 – 03/01/2027 | Admin tổng quan & người dùng, trang lỗi, PDF/CSV, test (7, 23, 25) | ⬜ |
| [8](week-8.md) | 04/01 – 10/01/2027 | Deploy AWS, README, video demo | ⬜ |

Ký hiệu: ⬜ chưa bắt đầu · 🟨 đang làm · ✅ xong · ⚠️ trễ

## Màn hình (30)

Đánh dấu khi màn đã chạy với API thật và giống prototype ở cả light + dark mode.

**Khách hàng**

- [ ] 01 Trang chủ
- [ ] 02 Danh sách sự kiện
- [ ] 03 Chi tiết sự kiện
- [ ] 04 Chọn ghế
- [ ] 05 Thanh toán
- [ ] 06 Thanh toán thành công
- [ ] 07 Trạng thái lỗi
- [ ] 08 Đăng nhập / Đăng ký / Quên mật khẩu
- [ ] 09 Hồ sơ cá nhân
- [ ] 10 Thông báo
- [ ] 11 Đơn hàng của tôi
- [ ] 12 Đăng ký làm BTC
- [ ] 13 Vé của tôi (desktop)
- [ ] 14 Vé của tôi (mobile)
- [ ] 15 Vé QR + hoàn vé (mobile)
- [ ] 16 Check-in

**Ban tổ chức**

- [ ] 17 Tổng quan
- [ ] 18 Sự kiện
- [ ] 19 Sửa sự kiện: thông tin · mở bán
- [ ] 20 Sửa sự kiện: hạng vé
- [ ] 21 Đơn hàng
- [ ] 22 Cài đặt

**Admin**

- [ ] 23 Tổng quan
- [ ] 24 Hồ sơ organizer
- [ ] 25 Người dùng
- [ ] 26 Địa điểm
- [ ] 27 Sơ đồ ghế
- [ ] 28 Đơn hàng & hoàn tiền
- [ ] 29 Audit log
- [ ] 30 Sự kiện

## Điểm kỹ thuật phải có test

- [ ] Chống bán trùng ghế (test 2 request đồng thời) — tuần 4
- [ ] Stripe webhook xác thực chữ ký + idempotent — tuần 4
- [ ] Vé QR ký HMAC, check-in đồng thời — tuần 5
- [ ] Hoàn tiền BR-07 / BR-09, huỷ sự kiện bằng job batching (BR-08) — tuần 6
- [ ] Policy theo role và vai trò thành viên tổ chức — tuần 2, rà lại tuần 7
- [ ] Audit log có dữ liệu trước / sau — tuần 2, trang xem tuần 6
- [ ] 5 luồng Playwright E2E chạy trong CI — tuần 7

## Nhật ký

| Ngày | Đã làm | Vướng / ghi chú |
|---|---|---|
| | | |
