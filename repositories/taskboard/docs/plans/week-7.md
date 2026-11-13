# Tuần 7 — Báo cáo, xuất PDF / Excel, trang lỗi, tiếng Anh, hoàn thiện test

**Mục tiêu:** báo cáo thu nhập và pipeline đúng số, xuất được file; đủ trạng thái lỗi; giao diện có tiếng Anh; bộ test đủ để tự tin deploy.

**Màn hình:** 12 (Báo cáo: tab Thu nhập, tab Pipeline), 16 (Trạng thái lỗi).

**Thời lượng dự kiến:** ~20 giờ.

---

## 1. Báo cáo (ngày 1–3)

Toàn bộ trong module `reporting/internal/query`, SQL thuần bằng `JdbcClient`, không nạp entity.

- [ ] `GET /reports/earnings?from=&to=&groupBy=client|project|week&contractType=&country=&q=&page=&size=&sort=`:
  - hourly: giờ billable × `rate_cents` từng phiên (BR-11, BR-12), cắt theo khoảng ngày;
  - fixed: tổng sprint `PAID` có `paid_at` trong khoảng;
  - cột: giờ billable, thu nhập, phí Upwork, thực nhận; dòng "Tổng"; 2 số đầu trang (trước phí, thực nhận);
  - `groupBy=week`: `date_trunc('week', …)` theo UTC (BR-08), nhãn "Tuần 09/11/2026".
- [ ] `GET /reports/pipeline?from=&to=&status=&q=&page=&size=`: job đã apply, tỉ lệ được thuê, connects đã tiêu, connects mỗi lần được thuê (BR-13), phễu Đã apply → Phỏng vấn → Được thuê (từ `job_status_changes`), thống kê lý do trượt, bảng job.
- [ ] Màn 12 — `prototype/12-bao-cao.dc.html`: 2 tab, lọc khoảng ngày (`DatePicker`), biểu đồ thanh ngang theo DESIGN mục 5 (MUI X Charts `BarChart` layout ngang, màu `primary`).

## 2. Xuất file (ngày 3–4)

- [ ] `GET /reports/export?type=earnings|timesheet|pipeline&format=xlsx|pdf&from=&to=`: dùng lại đúng query của API báo cáo.
- [ ] Excel (Apache POI, `SXSSFWorkbook`): header in đậm, định dạng tiền `$#,##0.00`, giờ dạng `[h]:mm`, dòng Tổng bằng công thức.
- [ ] PDF (Thymeleaf `templates/report/` + openhtmltopdf): nhúng font Inter (có dấu tiếng Việt), khổ A4, tiêu đề + khoảng ngày + bảng + tổng.
- [ ] Tên file `taskboard-earnings-2026-11-01_2026-11-30.xlsx`; frontend tải bằng blob, toast "Đã xuất báo cáo Excel".

## 3. Trạng thái lỗi (ngày 4)

- [ ] Màn 16 — `prototype/16-trang-thai-loi.dc.html`: 404 (route không có + API trả 404 khi mở `?task=` / `/projects/XXX`), lỗi mạng (có nút thử lại), phiên hết hạn (refresh lỗi → về đăng nhập, quay lại đúng trang sau khi đăng nhập), trạng thái trống của từng màn danh sách.
- [ ] `errorComponent` / `notFoundComponent` của TanStack Router; `ErrorState`, `EmptyState` dùng chung.

## 4. Tiếng Anh (ngày 5)

- [ ] Dịch `locales/en/*.json`, `messages_en.properties` (email, thông báo, lỗi validate).
- [ ] Đổi ngôn ngữ ở màn 14 → lưu `users.locale`, đổi `i18next`, locale của MUI (`viVN` / `enUS`), Data Grid, Date Pickers, date-fns.
- [ ] Backend chọn ngôn ngữ email / thông báo theo `users.locale`; lỗi API theo header `Accept-Language`.
- [ ] Script kiểm tra 2 file locale có cùng bộ key (chạy trong CI).

## 5. Hoàn thiện test (ngày 5–6)

- [ ] `ModularityTests` xanh + sinh sơ đồ module (PlantUML / C4) vào `docs/modules/` cho README.
- [ ] Rà BR-01 cho **mọi** endpoint: test tham số hoá, user B gọi từng endpoint với id của user A → 404.
- [ ] Báo cáo: dữ liệu mẫu cố định → số đúng tới từng cent (hourly đổi rate giữa chừng, fixed có sprint PAID ngoài khoảng, phí khác nhau mỗi dự án).
- [ ] JaCoCo: đặt ngưỡng cho `service/` và `shared/` (ví dụ ≥ 70% dòng), CI đỏ nếu thấp hơn.
- [ ] CI: kiểm tra `schema.d.ts` không bị cũ (sinh lại từ OpenAPI rồi `git diff --exit-code`).
- [ ] Playwright đủ 5 luồng trong `frontend/e2e/`: `auth`, `pipeline` (lưu job → apply → được thuê → chuyển thành dự án), `board` (tạo task, kéo-thả, sửa, xung đột version), `timesheet` (kéo qua Doing → có giờ), `report` (xuất Excel tải được file). Chạy trong CI với `docker compose`.

## 6. Xong tuần khi

- [ ] Số trong báo cáo khớp với timesheet và với tính tay trên dữ liệu mẫu.
- [ ] Xuất được PDF (đúng dấu tiếng Việt) và Excel mở bằng Excel không lỗi.
- [ ] Đổi sang tiếng Anh không còn chữ tiếng Việt sót trên màn nào.
- [ ] CI xanh với đủ 5 luồng E2E.
- [ ] Đã cập nhật [tracker.md](tracker.md).

## Rủi ro

- openhtmltopdf chỉ hỗ trợ CSS 2.1 → mẫu PDF viết bảng đơn giản, không flex / grid.
- E2E trong CI hay chập chờn → chờ theo phần tử / response, không dùng `waitForTimeout`; dữ liệu mỗi test tạo qua API riêng.
