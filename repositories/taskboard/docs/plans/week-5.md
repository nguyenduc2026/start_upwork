# Tuần 5 — Thời gian làm task tự động, timesheet tuần

**Mục tiêu:** thời gian làm việc được ghi tự động khi kéo task qua cột Doing; thấy giờ trên thẻ task, danh sách dự án, khách hàng; timesheet tuần có tổng giờ và thu nhập.

**Màn hình:** 11 (Timesheet), cột "Thời gian" trên màn 8, 9, 10; "Giờ tuần này" màn 7; "Tổng giờ", "Thu nhập" màn 5, 6.

**Thời lượng dự kiến:** ~18 giờ.

**Điều kiện bắt đầu:** đã chốt 2 câu hỏi ở [tracker.md](tracker.md) mục "Câu hỏi còn mở". Plan dưới đây viết theo cách đang đề xuất (cho nhiều task ở Doing cùng lúc, tính theo giờ thật); chốt khác thì sửa mục 1 trước khi làm.

---

## 1. Phiên làm việc (ngày 1–2)

**Migration** `V8__timetracking_init.sql`:

```sql
CREATE TABLE work_sessions (
    id               bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    owner_id         bigint      NOT NULL REFERENCES users,
    project_id       bigint      NOT NULL REFERENCES projects,
    task_id          bigint      NOT NULL REFERENCES tasks ON DELETE RESTRICT,
    started_at       timestamptz NOT NULL,
    ended_at         timestamptz,
    duration_seconds integer GENERATED ALWAYS AS
                     (EXTRACT(EPOCH FROM ended_at - started_at)::integer) STORED,
    billable         boolean     NOT NULL DEFAULT true,
    rate_cents       bigint,     -- rate dự án lúc mở phiên (BR-11), null với dự án fixed
    created_at       timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT ck_work_sessions_range CHECK (ended_at IS NULL OR ended_at >= started_at)
);
-- mỗi task chỉ có 1 phiên đang mở
CREATE UNIQUE INDEX ux_work_sessions_one_open ON work_sessions (task_id) WHERE ended_at IS NULL;
CREATE INDEX ix_work_sessions_owner_started ON work_sessions (owner_id, started_at);
CREATE INDEX ix_work_sessions_project_started ON work_sessions (project_id, started_at);
```

**Quy tắc** (thay BR-09, BR-10 cũ)

- [ ] Listener `TaskMoved` trong module `timetracking`:
  - vào `DOING` (từ bất kỳ cột nào) → mở phiên, `started_at` = thời điểm kéo (lấy từ event, không lấy giờ lúc listener chạy);
  - rời `DOING` → đóng phiên đang mở của task, `ended_at` = thời điểm kéo;
  - dự án không `ACTIVE` → không mở phiên (BR-07).
- [ ] Mở phiên idempotent: listener chạy lại (Modulith retry) không tạo phiên thứ 2 — dựa vào `ux_work_sessions_one_open` + `ON CONFLICT DO NOTHING`.
- [ ] Phiên dài dưới 1 phút (kéo nhầm rồi kéo lại) → xoá khi đóng.
- [ ] Lưu trữ / xoá task đang ở Doing → đóng phiên. Task có phiên thì không xoá được, chỉ lưu trữ → 409 `TASK_HAS_TIME_ENTRIES` (BR-05).
- [ ] Đổi trạng thái dự án sang `PAUSED` / `COMPLETED` → đóng mọi phiên đang mở của dự án.
- [ ] API công khai `WorkTime`: `taskSeconds(taskIds)`, `projectSecondsInWeek(projectIds, week)`.

## 2. Hiển thị thời gian (ngày 2–3)

- [ ] Thẻ task, tab Danh sách, Gantt, Task của tôi: thời gian = tổng phiên đã đóng + phiên đang mở tính tới hiện tại; format `6h 40m` (`lib/date.ts`).
- [ ] Modal task: dòng "Thời gian" ở cột phải; tab Lịch sử có dòng "Bắt đầu làm" / "Dừng làm" kèm thời lượng phiên.
- [ ] Màn 7: "Giờ tuần này" (kèm giới hạn nếu có: `12h / 30h`).
- [ ] Màn 5, 6: tổng giờ, thu nhập (BR-12) theo khách.
- [ ] Dashboard tuần 6 cần "Đang làm: từ 08:30 · 3h 52m" → trả thêm `openSessionStartedAt` trong dữ liệu task.

## 3. Timesheet (ngày 3–5)

- [ ] `GET /timesheet?week=2027-W03&projectKey=&q=&page=&size=&sort=`: mỗi dòng 1 task (mã, tên, dự án) × 7 ngày + tổng dòng; dòng "Tổng" cuối bảng; 4 số đầu trang (Tổng giờ, Số task, Thu nhập trước phí, Thu nhập thực nhận).
- [ ] SQL thuần (`JdbcClient`): cắt mỗi phiên theo ranh giới ngày bằng `generate_series` + giao `tstzrange`; phiên đang mở tính tới `now()`. Tuần theo UTC (BR-08), ngày theo UTC cho khớp tuần.
- [ ] Thu nhập: hourly = giây billable × `rate_cents` từng phiên; fixed không tính theo giờ (để 0 trong timesheet, thu nhập fixed nằm ở báo cáo — BR-12); thực nhận trừ `upwork_fee_percent` của dự án.
- [ ] Màn 11 — `prototype/11-timesheet.dc.html`: chọn tuần bằng mũi tên + `DatePicker`, `?week=` trên URL, lọc dự án + tìm kiếm, bảng có dòng Tổng, cột hôm nay nổi bật.

## 4. Test

- [ ] Tích hợp (Clock cố định): kéo Todo → Doing → Devdone tạo đúng 1 phiên có độ dài đúng; Release → Doing tạo phiên thứ 2, giờ task = tổng 2 phiên; kéo Doing → Doing (đổi thứ tự trong cột) không đóng / mở phiên; phiên < 1 phút bị xoá; listener chạy 2 lần không tạo phiên trùng; dự án `PAUSED` không mở phiên và đóng phiên đang mở; xoá task có phiên → 409.
- [ ] Đổi rate dự án không đổi thu nhập phiên cũ (BR-11).
- [ ] Timesheet: phiên vắt qua 0h UTC chia đúng 2 ngày; phiên vắt qua Chủ nhật → Thứ 2 chia đúng 2 tuần; dòng Tổng = tổng các ô.
- [ ] Playwright: kéo task sang Doing → chờ → kéo sang Devdone → timesheet có giờ ở hôm nay.

## 5. Xong tuần khi

- [ ] Làm việc thật 1 ngày trên chính Taskboard (kéo task của dự án này), cuối ngày timesheet khớp giờ làm thực tế.
- [ ] Màn 11 giống prototype; cột thời gian trên các màn khác đã có số thật.
- [ ] Đã cập nhật [tracker.md](tracker.md).

## Rủi ro

- Quên kéo task ra khỏi Doing qua đêm làm giờ bị cộng sai → phụ thuộc câu hỏi còn mở số 1; tuần 6 có thêm nhắc "Task ở Doing quá 8 giờ".
- Listener chạy sau commit nên thẻ vừa kéo chưa có thời gian ngay → frontend tự tính từ lúc kéo, không chờ server.
