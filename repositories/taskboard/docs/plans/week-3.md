# Tuần 3 — Dự án, chuyển job thành dự án, bảng task

**Mục tiêu:** tạo dự án (tay hoặc từ job được thuê), cài đặt dự án; tạo / sửa task và kéo-thả trên bảng Kanban, xem dạng danh sách, chống sửa đè.

**Màn hình:** 7 (Dự án), 13 (Cài đặt dự án), 8 tab Bảng + tab Danh sách, 9 phần cơ bản (các trường của task, tạo / sửa / lưu trữ), 4 (hộp thoại Chuyển thành dự án).

**Thời lượng dự kiến:** ~20 giờ (tuần nặng).

---

## 1. Dự án, sprint, phân loại (ngày 1–2)

**Migration** `V5__project_init.sql`: `projects`, `sprints`, `labels` (overview mục 4) + FK `jobs.project_id → projects`.

**API**

- [ ] `GET /projects?q=&status=&contractType=&startedFrom=&clientId=` (bảng màn 7: mã, tên, khách, hợp đồng, giá, giờ tuần này, task đang mở, trạng thái), `POST /projects`, `GET/PUT /projects/{key}`, `PATCH /projects/{key}/status`.
- [ ] Key: CHECK regex + unique (owner, key) → 409 `PROJECT_KEY_TAKEN`; không cho sửa key (BR-07).
- [ ] Tạo dự án lấy `upwork_fee_percent` mặc định từ `UserDirectory`.
- [ ] Sprint: `GET/POST /projects/{key}/sprints`, `PUT/DELETE /sprints/{id}` (trạng thái Chưa bắt đầu / Đang làm / Đã nộp / Đã thanh toán; sang Đã thanh toán đặt `paid_at`).
- [ ] Phân loại: `GET/POST /projects/{key}/labels`, `PUT/DELETE /labels/{id}`.
- [ ] `ProjectRegistry` (API công khai): `createFromJob(...)`, `requireWritable(ownerId, key)` (BR-07: `COMPLETED` / `ARCHIVED` → 409 `PROJECT_NOT_ACTIVE`), `contract(projectId)` (rate, phí), `nextTaskNumber(projectId)` (`UPDATE … RETURNING`).
- [ ] Nối BR-14 của tuần 2 vào bảng dự án thật.

**Frontend**

- [ ] Màn 7 — `prototype/07-du-an.dc.html`: bảng + hộp thoại Tạo dự án (key tự gợi ý từ tên, sửa được). Cột "Giờ tuần này" trả 0 tới tuần 5.
- [ ] Sidebar: nhóm Dự án lấy dự án `ACTIVE` từ API.
- [ ] Đầu trang dự án dùng chung cho màn 8 và 13: breadcrumb, ô màu + tên, "Khách · Hourly $35/h", tab Bảng · Danh sách · Gantt · Cài đặt (route `projects/$projectKey/...`).
- [ ] Màn 13 — `prototype/13-cai-dat-du-an.dc.html`: khối Thông tin, Hợp đồng (Hourly / Fixed, rate hoặc giá, giới hạn giờ / tuần, phí), Sprint (thêm / sửa / xoá, trạng thái, hạn chót, tiến độ), Phân loại; "Huỷ thay đổi" / "Lưu thay đổi".

## 2. Chuyển job thành dự án (ngày 2)

- [ ] `POST /jobs/{id}/convert` (tên, key, khách — chọn có sẵn hoặc tạo mới ngay trong request, loại hợp đồng, rate / giá lấy từ `bid_cents`): trong 1 transaction tạo dự án, gắn `jobs.project_id`, chuyển job sang `HIRED` nếu chưa; job đã chuyển → 409 `JOB_ALREADY_CONVERTED` (BR-04). Publish `JobConverted`.
- [ ] Màn 4: hộp thoại "Chuyển thành dự án" (mở từ nút, hoặc khi kéo thẻ vào cột Được thuê); xong thì toast + link sang bảng dự án mới.
- [ ] Màn 6: nối tab Dự án.

## 3. Task — backend (ngày 3–4)

**Migration** `V6__task_init.sql`: `tasks` (trạng thái, ngày giờ theo [chuẩn bị](chuan-bi.md) mục 1: `start_at`, `end_at` `timestamptz`, không có `estimate_minutes`), `task_labels`, `checklist_items`, `task_comments`, `attachments`. Index theo overview.

**API**

- [ ] `GET /projects/{key}/tasks?priority=&label=&endBefore=&q=` — dữ liệu bảng Kanban, mỗi thẻ có: mã, tên, độ ưu tiên, ngày kết thúc, phân loại, checklist `x/y`, thời gian (0 tới tuần 5).
- [ ] `GET /projects/{key}/tasks/page?status=&priority=&label=&endBefore=&q=&page=&size=&sort=` — tab Danh sách (phân trang server).
- [ ] `POST /projects/{key}/tasks`: lấy số từ `ProjectRegistry.nextTaskNumber`, `position` cuối cột.
- [ ] `GET/PUT /tasks/{code}` (PUT gửi `version`), `POST /tasks/{code}/archive`, `DELETE /tasks/{code}`.
- [ ] `PATCH /tasks/{code}/move` (`status`, `beforeId`, `afterId`, `version`): fractional index + `@Version`; vào `DONE` đặt `completed_at`, rời `DONE` xoá (BR-05); sang Doing / Done mà chưa có `start_at` / `end_at` thì tự điền giờ hiện tại (DESIGN mục 7). Publish `TaskMoved(taskId, from, to, at)` — tuần 5 dùng event này để mở / đóng phiên làm việc.
- [ ] Kiểm tra `end_at > start_at`; dự án không cho sửa → `PROJECT_NOT_ACTIVE`.
- [ ] `TaskLookup` (API công khai): `findByCode(ownerId, code)`.
- [ ] Event `TaskCreated`, `TaskUpdated` (kèm danh sách field đổi, giá trị cũ / mới), `TaskMoved`, `TaskDeleted`.

## 4. Task — frontend (ngày 4–6)

- [ ] Màn 8 tab Bảng — `prototype/08-bang-du-an.dc.html` (prop `tab=board`): 5 cột Todo · Doing · Devdone · Release · Done (icon trạng thái theo DESIGN), dùng lại `KanbanBoard` của tuần 2; thẻ cao đều 136px, viền thẻ theo ưu tiên Gấp / Cao; nút "+" mỗi cột; thanh lọc (độ ưu tiên, phân loại, ngày kết thúc, tìm kiếm) + "Tạo task".
- [ ] Màn 8 tab Danh sách (prop `tab=list`): `AppDataGrid` với các cột ở DESIGN mục 6, thêm lọc Trạng thái.
- [ ] Màn 9 — `prototype/09-them-sua-task.dc.html` (prop `mode`), phần cơ bản: modal 1020px, mở bằng `?task=ACME-12`; cột trái Tên task, Dự án, Nội dung (tạm dùng ô nhiều dòng, đổi sang trình soạn thảo ở tuần 4); cột phải Trạng thái, Độ ưu tiên, Sprint, Phân loại, Ngày bắt đầu, Ngày kết thúc (`DateTimePicker`), nút Tạo task / Lưu thay đổi (mờ khi chưa sửa), Lưu trữ, Đóng; header có mã + nút sao chép link.
- [ ] Xung đột `TASK_VERSION_CONFLICT` (BR-06): toast, tải lại task / bảng.

## 5. Test

- [ ] Tích hợp: key trùng / sai định dạng, không sửa được key, BR-07 (dự án `COMPLETED` không tạo task được), convert job 2 lần → 409, convert tạo khách mới trong cùng transaction, số task tăng dần không dùng lại kể cả sau khi lưu trữ, move task cập nhật đúng 1 dòng, `completed_at` đặt / xoá đúng, sửa với `version` cũ → 409.
- [ ] Test đồng thời: 2 request tạo task cùng lúc trong 1 dự án → 2 số khác nhau.
- [ ] Playwright: tạo dự án → tạo task → kéo sang Doing → F5 vẫn ở Doing.

## 6. Xong tuần khi

- [ ] Luồng job được thuê → dự án → task → kéo-thả chạy thật.
- [ ] Màn 7, 13, 8 (Bảng, Danh sách) và phần cơ bản của 9 giống prototype.
- [ ] Đã cập nhật [tracker.md](tracker.md).

## Rủi ro

- Tuần nhiều việc nhất. Không kịp thì đẩy tab Danh sách (màn 8) sang tuần 4; bắt buộc xong bảng Kanban + modal cơ bản + chuyển job.
- Modal 2 cột với nhiều ô tự dựng dễ phình code → tách component theo khối (`TaskMainColumn`, `TaskSideColumn`), form dùng một schema zod.
