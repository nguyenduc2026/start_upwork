# Tuần 4 — Modal task đầy đủ, Gantt, Task của tôi, tìm kiếm

**Mục tiêu:** modal task đủ mọi phần (mô tả có định dạng + ảnh, tệp đính kèm S3, checklist, bình luận, lịch sử); xem dự án dạng Gantt; danh sách task của mọi dự án; tìm nhanh Ctrl+K.

**Màn hình:** 9 (đầy đủ), 8 tab Gantt, 10 (Task của tôi), ô tìm kiếm trên header.

**Thời lượng dự kiến:** ~20 giờ.

---

## 1. Mô tả và tệp đính kèm (ngày 1–2)

- [ ] Mô tả bằng `mui-tiptap`: đậm, nghiêng, gạch, H2, H3, danh sách chấm / số, trích dẫn, mã, chèn ảnh. Lưu HTML; backend lọc bằng jsoup `Safelist` (chỉ giữ thẻ trên + `img src` trỏ về link tải của chính app) trước khi lưu.
- [ ] `POST /tasks/{code}/attachments` (`fileName`, `contentType`, `sizeBytes`): kiểm tra BR-15 (≤ 10 MB; ảnh, PDF, văn bản, zip), tạo bản ghi `PENDING`, trả presigned PUT (5 phút).
- [ ] `POST /attachments/{id}/confirm`: kiểm tra object đã có trên S3 (HEAD, đúng size) → `UPLOADED`.
- [ ] `GET /attachments/{id}/download` → 302 tới presigned GET; `DELETE /attachments/{id}` xoá bản ghi + object.
- [ ] Ảnh dán vào mô tả đi cùng luồng trên (là một attachment), chèn vào editor bằng link download.
- [ ] `@Scheduled` mỗi giờ: xoá attachment `PENDING` quá 1 giờ + object. Xoá task → listener `TaskDeleted` xoá object trên S3 sau commit (BR-15).
- [ ] Frontend: "Chọn tệp" (có tiến độ upload), mỗi tệp 1 dòng cao 40: tên, xem, tải, xoá.

## 2. Checklist, bình luận, lịch sử (ngày 2–3)

- [ ] Checklist: `POST /tasks/{code}/checklist`, `PUT/DELETE /checklist-items/{id}`, đổi thứ tự (`position` số nguyên, đánh lại khi kéo). UI: ô tick `primary`, sửa tại chỗ, dòng thêm mục.
- [ ] Bình luận: `GET/POST /tasks/{code}/comments`, `PUT/DELETE /comments/{id}`. UI: ô "Viết bình luận" + "Gửi bình luận", danh sách có `dd/mm/yyyy HH:mm:ss`, nút xoá.
- [ ] Module `activity`: migration `V7__activity_init.sql` (`activities`); `@ApplicationModuleListener` nghe `TaskCreated`, `TaskUpdated`, `TaskMoved`, `JobStatusChanged`, `JobConverted` → ghi dòng có `payload` trước / sau. `GET /tasks/{code}/activity`, chuyển `GET /jobs/{id}/activity` sang đọc bảng này.
- [ ] Tab Lịch sử trong modal: mỗi dòng "Đổi trạng thái Todo → Doing", "Đổi ngày kết thúc 14/11 → 18/11"… + thời gian.

## 3. Gantt (ngày 3–4)

MUI X Gantt là bản trả phí → tự dựng bằng CSS grid theo DESIGN mục 5.

- [ ] `GET /projects/{key}/gantt?from=&to=`: sprint (tên, trạng thái, hạn chót, số task Done / tổng) và task (mã, tên, trạng thái, ưu tiên, `start_at`, `end_at`, thời gian) nhóm theo sprint; task không có sprint vào nhóm "Không có sprint".
- [ ] Màn 8 tab Gantt (prop `tab=gantt`): cột trái 300px đứng yên (sprint thu / mở), trục 8 tuần, mỗi ngày ≥ 32px, cuộn ngang, cuối tuần nền `soft`, vạch hôm nay `primary`; thanh task màu theo trạng thái, quá hạn có viền; tooltip; bấm thanh mở modal sửa.
- [ ] Tính vị trí thanh theo múi giờ của user (task 14/11 23:00 giờ VN không bị lệch sang ngày khác).

## 4. Task của tôi (ngày 5)

- [ ] `GET /tasks?status=&priority=&projectKey=&endBefore=&q=&page=&size=&sort=` — task của mọi dự án, kèm nhóm: Quá hạn · Hôm nay · Tuần này · Sau này · Không có hạn (tính theo `end_at` và múi giờ user).
- [ ] Màn 10 — `prototype/10-task-cua-toi.dc.html`: bảng có lọc, bấm dòng mở modal sửa (modal dùng chung với màn 8).

## 5. Tìm kiếm Ctrl+K (ngày 5–6)

- [ ] Cột `tasks.search` (generated `tsvector`, đã có từ tuần 3) + GIN. Thêm `pg_trgm` cho tên dự án, khách, job (gõ sai dấu / gõ dở vẫn ra).
- [ ] `GET /search?q=` (module `reporting`, SQL thuần): tối đa 5 kết quả mỗi loại task / dự án / khách / job, có mã task trùng chính xác thì lên đầu.
- [ ] Ô "Tìm kiếm Ctrl K" trên header mở Dialog + danh sách kết quả, phím ↑ ↓ Enter, Esc đóng.

## 6. Test

- [ ] Tích hợp: upload vượt 10 MB / sai loại → 400, confirm khi object chưa có → 400, dọn `PENDING` quá hạn, xoá task xoá object (kiểm tra bằng `FileStorage` giả), HTML có `<script>` / `onerror` bị lọc, lịch sử ghi đúng trước / sau (`@ApplicationModuleTest` + `Scenario`), nhóm Quá hạn / Hôm nay đúng ranh giới ngày theo múi giờ (Clock cố định).
- [ ] Playwright: mở task → thêm checklist, bình luận, upload 1 ảnh (S3 thật ở bucket dev) → thấy trong tab Lịch sử.

## 7. Xong tuần khi

- [ ] Modal task đủ mọi phần như prototype, mở lại bằng link `?task=ACME-12`.
- [ ] Gantt, Task của tôi, Ctrl+K chạy với dữ liệu thật.
- [ ] Đã cập nhật [tracker.md](tracker.md).

## Rủi ro

- CORS của S3 sai làm upload từ trình duyệt lỗi → thử upload bằng `curl` với presigned URL trước, rồi mới nối UI.
- Gantt tự dựng dễ ngốn thời gian → làm bản tĩnh (thanh + trục ngày) trước; tooltip, thu / mở sprint làm sau, không kịp thì để tuần 8.
- `mui-tiptap` cần kiểm tra bản hỗ trợ MUI và React 19 đang dùng trước khi cài.
