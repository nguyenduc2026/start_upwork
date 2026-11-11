# Tuần 2 — Địa điểm, sơ đồ ghế, đăng ký & duyệt ban tổ chức

**Mục tiêu:** Admin tạo được địa điểm và sơ đồ ghế. Người dùng chọn "Tổ chức sự kiện" gửi được hồ sơ, Admin duyệt xong thì trở thành BTC và quản lý được thành viên. Mọi thao tác quan trọng bắt đầu được ghi audit log.

**Màn hình:** 26 (Địa điểm), 27 (Sơ đồ ghế), 12 (Đăng ký BTC), 24 (Hồ sơ organizer), 22 (Cài đặt BTC). Khung chung Admin / Organizer.

**Thời lượng dự kiến:** ~18 giờ.

---

## 1. Khung Admin / Organizer (ngày 1)

- [ ] Layout shadcn/ui: Sidebar, breadcrumb (luôn bắt đầu bằng Trang chủ ›), nút đổi theme, chuông, avatar cuối sidebar (Hồ sơ, Thông báo, Về trang mua vé, Đăng xuất).
- [ ] Sidebar Admin: Tổng quan, Sự kiện, Đơn hàng, Hồ sơ organizer, Người dùng, Địa điểm & sơ đồ ghế, Audit log.
- [ ] Sidebar Organizer: Tổng quan, Sự kiện, Đơn hàng, Cài đặt.
- [ ] Component dùng chung: DataTable (toolbar = [tìm + lọc + Đặt lại] | [Xuất · nút Tạo]), 4 trạng thái data / loading / empty / error, Dialog, Sheet, DropdownMenu, toast (Sonner).
- [ ] Route `/admin/*` chỉ cho ADMIN, `/organizer/*` chỉ cho ORGANIZER.

## 2. Audit log — phần ghi (ngày 1)

Trang xem audit log làm ở tuần 6, nhưng phải ghi từ bây giờ.

- [ ] Bảng `audit_logs`: `actor_id`, `action`, `target_type`, `target_id`, `before` (JSON), `after` (JSON), `request_id`, `ip`, `user_agent`, `created_at`.
- [ ] Middleware gắn `X-Request-Id` cho mọi request.
- [ ] Service `AuditLogger::log(action, target, before, after)`, gọi trong các action của Admin/BTC.

## 3. Địa điểm + sơ đồ ghế (ngày 2–3)

**Bảng dữ liệu**

- [ ] `provinces` (đã seed tuần 1), `venues` (tên, địa chỉ, province_id, sức chứa).
- [ ] `seat_maps` (venue_id, tên, version, width, height, `locked_at`).
- [ ] `seat_map_sections` (seat_map_id, tên, mã, số hàng, ghế mỗi hàng, hàng bắt đầu, x, y).
- [ ] `seat_map_elements` (sân khấu, nhãn: nội dung, rộng, cao, x, y).
- [ ] `seats` (section_id, row_label, number, x, y) — sinh bằng `generateSeats()` mỗi lần lưu sơ đồ.

**API (Admin)**

- [ ] CRUD `venues` (chặn xoá khi có sự kiện đang dùng).
- [ ] `GET/PUT /admin/seat-maps/:id`: lưu cả sơ đồ trong 1 transaction rồi sinh lại ghế.
- [ ] Sơ đồ đã dùng cho sự kiện publish thì **khoá**: `POST /admin/seat-maps/:id/clone` tạo version mới.

**Frontend**

- [ ] Màn 26 — `prototype/26-AdminVenues.dc.html`.
- [ ] Màn 27 — `prototype/27-AdminSeatMap.dc.html`: form khu ghế bên phải, khung xem trước SVG bên trái (zoom − / + / Vừa khung, bấm khu → chọn khu). Đây là form, không làm kéo thả.

## 4. Đăng ký & duyệt BTC (ngày 4–5)

**Bảng dữ liệu**

- [ ] `organizer_applications` (user_id, loại cá nhân/doanh nghiệp, tên hiển thị, tên pháp lý, mã số thuế, email, điện thoại, website, giới thiệu, loại sự kiện, quy mô, `document_path`, status PENDING / APPROVED / REJECTED, lý do từ chối).
- [ ] `organizations` (tên, slug, logo, giới thiệu, email hỗ trợ, hotline, website, facebook), `organization_members` (user_id, vai trò OWNER / EVENT_MANAGER / CHECKIN_STAFF), `organization_invites`, `organization_member_events` (sự kiện giao cho nhân viên check-in).

**API**

- [ ] `POST /organizer/application` (upload 1 giấy tờ lên S3), `GET` (xem trạng thái), `DELETE` (rút hồ sơ khi đang chờ).
- [ ] Admin: `GET /admin/organizer-applications`, `POST …/:id/approve` (tạo tổ chức, gán role ORGANIZER, OWNER), `POST …/:id/reject` (lý do bắt buộc). Cả hai ghi audit log và gửi email.
- [ ] Organizer: `GET/PUT /organizer/organization` (hồ sơ công khai, logo), mời / gửi lại / huỷ lời mời, đổi vai trò, xoá thành viên.
- [ ] Policy: `OrganizationPolicy` (OWNER làm mọi việc; EVENT_MANAGER sửa sự kiện + xem đơn; CHECKIN_STAFF chỉ check-in sự kiện được giao).

**Frontend**

- [ ] Màn 12 — `prototype/12-OrganizerApply.dc.html`: header gọn (logo, đổi theme, avatar). Có đủ trạng thái form / đang chờ / bị từ chối / đã duyệt. Quy trình 1 Gửi hồ sơ · 2 Admin duyệt · 3 Tạo & publish sự kiện.
- [ ] Nối bước chọn loại tài khoản ở màn 8: chọn Tổ chức sự kiện → màn 12.
- [ ] Màn 24 — `prototype/24-AdminOrganizers.dc.html`.
- [ ] Màn 22 — `prototype/22-OrgSettings.dc.html`: tab Hồ sơ công khai, Thành viên, Thông báo.

## 5. Test

- [ ] PHPUnit: lưu sơ đồ sinh đúng số ghế; sơ đồ đã khoá không sửa được; duyệt hồ sơ tạo tổ chức + đổi role; từ chối bắt buộc có lý do; Policy theo 3 vai trò thành viên; audit log có dữ liệu trước/sau.

## 6. Xong tuần khi

- [ ] Admin tạo được 1 địa điểm có sơ đồ 3 khu, xem trước SVG đúng.
- [ ] User mới chọn Tổ chức sự kiện → gửi hồ sơ → Admin duyệt → vào được kênh BTC, mời được 1 thành viên.
- [ ] Bảng `audit_logs` có dòng cho thao tác duyệt / từ chối / sửa sơ đồ.
- [ ] Đã cập nhật [tracker.md](tracker.md).

## Rủi ro

- Màn 27 nhiều logic nhất tuần: làm backend `generateSeats()` + test trước, giao UI cho Codex sau.
- Email mời thành viên cần link chấp nhận lời mời: dùng signed URL của Laravel, chưa cần màn riêng (chấp nhận xong thì chuyển về kênh BTC).
