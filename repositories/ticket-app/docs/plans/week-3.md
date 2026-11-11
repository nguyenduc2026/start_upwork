# Tuần 3 — Tạo sự kiện, hạng vé, publish, trang công khai

**Mục tiêu:** BTC tạo sự kiện, gán hạng vé cho các khu ghế và publish. Khách xem được sự kiện ở Trang chủ, Danh sách và Chi tiết.

**Màn hình:** 18 (Sự kiện của BTC), 19 (Sửa sự kiện: thông tin · mở bán), 20 (Sửa sự kiện: hạng vé), 1 (Trang chủ), 2 (Danh sách sự kiện), 3 (Chi tiết sự kiện).

**Thời lượng dự kiến:** ~18 giờ.

---

## 1. Backend — sự kiện (ngày 1–3)

**Bảng dữ liệu**

- [ ] `categories` (seed: Nhạc sống, Sân khấu & Nghệ thuật, Hài kịch, Thể thao, Hội thảo & Workshop, Lễ hội).
- [ ] `events`: organization_id, venue_id, seat_map_id, category_id, tiêu đề, slug, mô tả, quy định, độ tuổi, thẻ, ảnh bìa, `starts_at`, `ends_at`, `doors_at`, `sale_starts_at`, `sale_ends_at`, `show_before_sale`, `max_tickets_per_user` (mặc định 6), `status` (DRAFT / PUBLISHED / SUSPENDED / CANCELLED / ENDED), `suspend_reason`, `published_at`.
- [ ] `ticket_tiers`: event_id, tên, giá (USD, lưu số nguyên theo cent), màu, `seat_map_section_ids`.
- [ ] `event_seats`: event_id, seat_id, ticket_tier_id, `status` (AVAILABLE / HELD / SOLD), `booking_id`, `held_until`. **Sinh khi publish**, mỗi ghế của sơ đồ một dòng.

**API Organizer**

- [ ] `POST /organizer/events` (modal tạo nhanh: tên, danh mục, địa điểm, ngày, giờ) → DRAFT.
- [ ] `GET /organizer/events` có cột tổng hợp: đã bán / tổng, doanh thu, đã check-in (tính bằng query gộp, không N+1). Lọc, tìm, sắp xếp theo ngày diễn, phân trang.
- [ ] `PUT /organizer/events/:id`, upload ảnh bìa, đổi sơ đồ (xoá gán hạng vé cũ).
- [ ] CRUD `ticket_tiers` (không xoá được khi đã có vé bán).
- [ ] `GET /organizer/events/:id/publish-checklist` → danh sách mục còn thiếu.
- [ ] `POST /organizer/events/:id/publish`: kiểm tra checklist → sinh `event_seats` → khoá sơ đồ → ghi audit log.
- [ ] **BR-14:** sau khi publish chỉ sửa được tiêu đề, mô tả, ảnh bìa, danh mục (chặn ở FormRequest + Policy).

**API công khai**

- [ ] `GET /events` (lọc danh mục, tỉnh/thành, thời gian, `q`; sắp xếp; phân trang), `GET /events/:slug` (kèm hạng vé, còn vé hay không, trạng thái bán), `GET /home` (tiêu điểm, sắp mở bán, nổi bật tuần này).

## 2. Frontend (ngày 3–6)

- [ ] Màn 18 — `prototype/18-OrgEvents.dc.html`: bảng có thanh tiến độ, badge "Tạm dừng" + tooltip lý do, menu ⋯.
- [ ] Màn 19 — `prototype/19-OrgEventInfo.dc.html`: checklist bên phải, modal "Chưa thể publish" liệt kê mục thiếu.
- [ ] Màn 20 — `prototype/20-OrgCreateEvent.dc.html`: modal thêm hạng vé (tên, giá, màu, chọn khu), bấm khu trên sơ đồ để xem hạng vé đã gán.
- [ ] Màn 1 — `prototype/01-Main.dc.html`: banner tiêu điểm, sắp mở bán (nút Nhắc tôi để tuần 6 nối với thông báo), danh mục, nổi bật tuần này, khối "Dành cho ban tổ chức".
- [ ] Màn 2 — `prototype/02-EventList.dc.html`: bộ lọc đồng bộ với URL (`?category=&city=&q=`).
- [ ] Màn 3 — `prototype/03-EventDetail.dc.html`: ảnh cao bằng cột thông tin + card mua vé; trạng thái sắp mở bán (đếm ngược), đang bán, hết vé, tạm dừng; thanh dính trên đầu khi cuộn.

## 3. Test

- [ ] PHPUnit: publish thiếu điều kiện bị chặn; publish sinh đúng số `event_seats`; BR-14; lọc danh sách công khai; sự kiện DRAFT không hiện công khai.

## 4. Xong tuần khi

- [ ] BTC tạo sự kiện → gán 3 hạng vé → publish → sự kiện hiện ở Trang chủ, Danh sách, Chi tiết.
- [ ] Seeder có ~10 sự kiện mẫu với ảnh để trang công khai trông giống prototype.
- [ ] Đã cập nhật [tracker.md](tracker.md).

## Rủi ro

- Tuần này nhiều màn (6 màn): giao Codex các màn công khai 1–3 song song khi mình làm backend.
- Prototype hiện giá bằng ₫: khi giao Codex nhắc hiển thị theo USD (`$12.00`) bằng một hàm format dùng chung.
