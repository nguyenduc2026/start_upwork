# Tuần 7 — Admin tổng quan & người dùng, trang lỗi, PDF/CSV, test

**Mục tiêu:** hoàn thiện các màn còn lại, xuất file (PDF vé, CSV) và nâng độ phủ test để dự án đủ tin cậy trước khi deploy.

**Màn hình:** 23 (Admin tổng quan), 25 (Người dùng), 7 (Trạng thái lỗi — hoàn thiện).

**Thời lượng dự kiến:** ~18 giờ.

---

## 1. Admin (ngày 1–2)

- [ ] `GET /admin/dashboard?range=7d|30d|90d`: GMV, phí nền tảng thu được, vé bán, sự kiện đang bán, biểu đồ theo ngày, danh sách "Cần xử lý" (hồ sơ BTC chờ duyệt, yêu cầu hoàn tiền, sự kiện tạm dừng), sắp mở bán.
- [ ] Màn 23 — `prototype/23-AdminDashboard.dc.html` (biểu đồ: Recharts, đã có sẵn trong shadcn/ui chart).
- [ ] `GET /admin/users` (tìm, vai trò, trạng thái), modal chi tiết (số đơn, chi tiêu, hoàn vé).
- [ ] `PUT /admin/users/:id/role` (cảnh báo khi chọn ADMIN), `POST …/lock` (lý do, **thu hồi mọi refresh token**), `POST …/unlock`. Ghi audit log.
- [ ] Màn 25 — `prototype/25-AdminUsers.dc.html`.

## 2. Trang lỗi & trạng thái (ngày 3)

- [ ] Màn 7 — `prototype/07-SystemStates.dc.html`: hoàn thiện 404, 403, 500 (kèm request ID), mất mạng (banner + Thử lại ngay), Hết vé.
- [ ] Error boundary của TanStack Router; API client map mã lỗi → trạng thái tương ứng.
- [ ] Rà 4 trạng thái data / loading / empty / error ở mọi bảng.

## 3. Xuất file (ngày 3–4)

- [ ] PDF vé (`barryvdh/laravel-dompdf`): 1 trang mỗi vé, có QR. Nút Tải PDF ở màn 6 và màn 13.
- [ ] PDF hoá đơn đơn hàng (màn 11).
- [ ] CSV: sự kiện + danh sách khách (màn 18), đơn hàng BTC (màn 21), đơn hàng Admin (màn 28), audit log (màn 29). Dùng stream response để file lớn không tốn RAM.

## 4. Test (ngày 5–6)

- [ ] PHPUnit: rà lại mọi Policy (mỗi role thử gọi API không được phép → 403); khoá user thì token cũ không dùng được; báo cáo PHPUnit coverage cho `app/` (mục tiêu ≥ 70% ở các Service / Action chính).
- [ ] Playwright E2E — 5 luồng chính, chạy trong CI:
  1. Đăng ký → xác minh → đăng nhập.
  2. Mua vé: chọn ghế → thanh toán thẻ test → thấy vé.
  3. Đăng ký BTC → Admin duyệt → tạo + publish sự kiện.
  4. Check-in: vé hợp lệ rồi quét lại báo đã dùng (gọi API, không cần camera).
  5. Hoàn vé: khách yêu cầu → Admin duyệt.
- [ ] Seeder dữ liệu demo đầy đủ (vài sự kiện đã bán vé, có đơn hoàn, có thông báo) để quay video tuần 8.

## 5. Xong tuần khi

- [ ] Mọi màn trong prototype đã có trong app thật (đánh dấu đủ ở [tracker.md](tracker.md)).
- [ ] 5 luồng Playwright xanh trên CI.
- [ ] `php artisan migrate:fresh --seed` cho ra bộ dữ liệu demo đẹp.

## Rủi ro

- Tuần này là tuần đệm: nếu các tuần trước còn sót việc, xử lý ở đây trước rồi mới làm phần mới.
