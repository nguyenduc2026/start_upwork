# Tuần 2 — Khách hàng, pipeline job

**Mục tiêu:** quản lý khách hàng; lưu job từ Upwork và kéo-thả qua các bước của pipeline, có lịch sử trạng thái và thống kê đầu trang.

**Màn hình:** 5 (Khách hàng), 6 (Chi tiết khách hàng — tab Dự án để trống, làm tiếp ở tuần 3), 3 (Pipeline job), 4 (Chi tiết job — nút Chuyển thành dự án làm ở tuần 3).

**Thời lượng dự kiến:** ~18 giờ.

---

## 1. Khung dùng chung cho màn danh sách (ngày 1)

Mọi màn danh sách dùng một khuôn (DESIGN mục 5). Làm 1 lần ở đây, các tuần sau dùng lại.

- [ ] `AppDataGrid`: phân trang, sắp xếp phía server (`paginationMode="server"`, `sortingMode="server"`), kẻ ô dọc + ngang, header nền `board`, dòng cao 48, chân bảng "Hiển thị x–y trong n" + "Số dòng/trang" + phân trang ô vuông, locale `viVN`, trạng thái trống / đang tải / lỗi.
- [ ] `FilterBar`: các ô có nhãn nằm trên, canh đáy, cách 12; ô chưa lọc ghi "Tất cả"; nút "Xoá lọc" khi đang lọc; nút chính đẩy sang phải.
- [ ] Hook `useListSearch`: giữ `page`, `size`, `sort`, bộ lọc trên search param của URL (copy link mở lại đúng chỗ).
- [ ] Backend: `PageRequest` từ `page`, `size`, `sort=field,asc|desc` với danh sách field cho phép sắp xếp (field lạ → 400).

## 2. Khách hàng (ngày 1–2)

**Migration** `V3__client_init.sql`: `clients` (overview mục 4).

**API**

- [ ] `GET /clients?q=&country=&status=&addedFrom=&page=&size=&sort=` (status: đang hợp tác / đã lưu trữ), `POST /clients`, `GET/PUT /clients/{id}`, `POST /clients/{id}/archive`, `POST /clients/{id}/unarchive`.
- [ ] Trùng tên trong cùng tài khoản → 409 (map từ unique index `lower(name)`).
- [ ] Archive khi còn dự án `ACTIVE` / `PAUSED` → 409 `CLIENT_HAS_ACTIVE_PROJECTS` (BR-14). Tuần này chưa có bảng dự án: viết sẵn kiểm tra qua interface, nối thật ở tuần 3.
- [ ] `ClientCatalog` (API công khai): `requireOwned(ownerId, clientId)`, `name(clientId)`.
- [ ] Mọi query có `ownerId`; không phải của mình → 404 (BR-01).

**Frontend**

- [ ] Màn 5 — `prototype/05-khach-hang.dc.html`: bảng (tên, công ty, quốc gia, giờ tại chỗ tính từ `timezone` của khách, dự án đang chạy, tổng giờ, thu nhập, trạng thái, ngày thêm), lọc, hộp thoại Thêm khách hàng (rộng 560). Cột tổng giờ / thu nhập trả 0 cho tới tuần 5.
- [ ] Màn 6 — `prototype/06-chi-tiet-khach-hang.dc.html`: thông tin, sửa, lưu trữ (hiện lỗi BR-14), tab Job (tab Dự án nối ở tuần 3).

## 3. Pipeline job (ngày 3–5)

**Migration** `V4__pipeline_init.sql`: `jobs`, `job_status_changes`. Cột `jobs.project_id` tạo trước nhưng **chưa có FK** (bảng `projects` có ở tuần 3; FK thêm trong `V5__project_init.sql`).

**API**

- [ ] `GET /jobs?status=&skill=&budgetType=&source=&followUpBefore=&q=` — trả đủ cho bảng Kanban (không phân trang, chỉ job chưa lưu trữ), sắp theo `position`.
- [ ] `POST /jobs` (vào cột `SAVED`, `position` cuối cột), `GET/PUT/DELETE /jobs/{id}` (PUT gửi `version`; DELETE = lưu trữ).
- [ ] `PATCH /jobs/{id}/move` (`status`, `beforeId`, `afterId`, `lostReason`, `version`):
  - kiểm tra chuyển trạng thái theo **BR-03** (máy trạng thái riêng, có unit test);
  - `position = FractionalIndex.between(before.position, after.position)` — chỉ cập nhật 1 dòng;
  - lần đầu sang `APPLIED` đặt `applied_at`; sang `HIRED` / `LOST` đặt `closed_at`; `LOST` bắt buộc `lostReason`;
  - ghi `job_status_changes`, publish `JobStatusChanged`.
- [ ] `GET /jobs/stats?month=`: số job đã apply, tỉ lệ được thuê, connects đã tiêu trong tháng (3 số đầu trang).
- [ ] `GET /jobs/{id}/activity`: tạm đọc từ `job_status_changes`; chuyển sang module `activity` ở tuần 4.
- [ ] `@Version` trên `Job`; xung đột → 409.

**Frontend**

- [ ] Màn 3 — `prototype/03-pipeline.dc.html`: 5 cột (Đã lưu · Đã apply · Phỏng vấn · Được thuê · Trượt), kéo-thả bằng `dnd-kit` (cập nhật lạc quan, lỗi thì trả về chỗ cũ + toast), thanh lọc (kỹ năng, loại ngân sách, nguồn, follow-up trước ngày, tìm kiếm), 3 số liệu đầu trang. Kéo sang Trượt → hộp thoại chọn lý do.
- [ ] Màn 4 — `prototype/04-chi-tiet-job.dc.html`: mở bằng `?job=123`; thông tin job, ngân sách, giá chào, connects, cover letter, ngày follow-up, khách hàng (chọn hoặc để trống), lịch sử trạng thái, lưu trữ. Nút "Chuyển thành dự án" hiện nhưng chưa bấm được.

## 4. Test

- [ ] Unit: máy trạng thái job (mọi cặp hợp lệ / không hợp lệ của BR-03).
- [ ] Tích hợp: CRUD khách, trùng tên, BR-01 (user B đọc khách / job của user A → 404), move job (giữa 2 thẻ, đầu cột, cuối cột, sang LOST thiếu lý do → 400), `applied_at` chỉ đặt lần đầu, xung đột `version` → 409, thống kê tháng.
- [ ] Playwright: tạo job → kéo sang Đã apply → mở drawer thấy lịch sử.

## 5. Xong tuần khi

- [ ] Kéo-thả job mượt, F5 lại vẫn đúng thứ tự.
- [ ] Màn 3, 4, 5, 6 giống prototype.
- [ ] Đã cập nhật [tracker.md](tracker.md).

## Rủi ro

- `dnd-kit` kéo giữa nhiều cột tốn thời gian → làm riêng một component `KanbanBoard` dùng chung, tuần 3 dùng lại cho task.
- Thứ tự migration khác bảng ở overview mục 4 (làm pipeline trước project) → sửa bảng đó cùng lúc với các thay đổi trong [chuẩn bị](chuan-bi.md) mục 1.
