# Taskboard — DESIGN.md

Nguồn sự thật cho giao diện. Prototype tham chiếu: `docs/prototype/` (canvas: https://claude.ai/artifact/1b254DDWzzoQnL6wgqp55Z). Code dùng MUI + MUI X; mọi giá trị dưới đây khai báo trong `frontend/src/theme/`.

**Tham khảo: Linear.**
- **Giữ:** sidebar gọn có icon + chữ và nhóm có tiêu đề nhỏ; nội dung nằm trong khung bo góc tách khỏi nền; cột Kanban không nền, thẻ viền mảnh; icon trạng thái hình tròn.
- **Đổi:** nội dung, phân loại, luồng nghiệp vụ theo Taskboard; màu thương hiệu cam; sửa task bằng modal thay vì panel phải.
- **Không chép:** logo, tên, màu tím và icon độc quyền của Linear.

## 1. Tinh thần chung

Công cụ làm việc hằng ngày của một freelancer: gọn, nhiều thông tin trên một màn, nền ấm trung tính, một màu nhấn cam. Chỉ hiện dữ liệu, không chữ giải thích. Chỉ desktop, giao diện sáng (theme tối chưa thiết kế).

## 2. Màu

| Token | Mã | Dùng cho |
|---|---|---|
| `bg` | `#F3F3F1` | nền ngoài cùng, sidebar |
| `panel` | `#FFFFFF` | khung nội dung, modal, thẻ, ô nhập |
| `board` | `#FAFAF9` | nền vùng bảng Kanban, cột phải của modal, header bảng |
| `line` | `#E2E1DD` | viền thường, đường kẻ |
| `line2` | `#CFCDC8` | viền khi hover |
| `text` | `#1B1B19` | chữ chính |
| `muted` | `#66655F` | chữ phụ, mã task, icon |
| `placeholder` | `#8F8D87` | placeholder |
| `soft` | `#F1F0ED` | nền hover của nút trơn, chip lọc, nền ô tìm kiếm header |
| `hover` | `#EAE9E6` | hover mục sidebar |
| `primary` | `#D9480F` | nút chính, logo, badge thông báo, ô tick, ngày đang chọn, dấu tích trong select, viền focus |
| `primaryHover` | `#BA3D0C` | hover nút chính |
| `ring` | `rgba(217,72,15,.16)` | quầng focus 3px |
| `urgent` | `#D23B3B` | viền thẻ ưu tiên Gấp, chữ "Gấp" |
| `high` | `#E39A12` | viền thẻ ưu tiên Cao; icon trạng thái Doing, Devdone |
| `done` | `#4B6BB5` | icon trạng thái Release, Done |
| `error` | `#C2361F` | lỗi form, ngày kết thúc đã quá |

Màu dự án (ô vuông cạnh tên dự án): `#4A7BC0`, `#C08A2A`, `#8E8577`, `#B5487A`, `#3E8E8A`, `#6B5BB0`.

## 3. Chữ

- Một font: **Inter** (`@fontsource/inter`), chỉ 2 độ đậm **400** và **600**. Số dùng `font-variant-numeric: tabular-nums`, không đổi font.
- Cỡ chữ: tiêu đề trang 20 / 600 · tiêu đề modal, tên khối 15 / 600 · nội dung, ô nhập, placeholder, nút **14 / 400** (nút chính 600) · sidebar, thẻ task 13.5 · nhãn của ô nhập 13 / 600 · thời gian, mã task 12–12.5.
- `line-height` 1.45; nội dung mô tả 1.6.

## 4. Khoảng cách & lưới

- Đơn vị 4px (`theme.spacing(1) = 4px`). Lề trang 20px, lề modal 24px, khoảng cách giữa các ô form 16–20px.
- Chiều cao: ô nhập / select / nút **36px**; nút nhỏ 32px; nút chỉ có icon 36px (nhỏ 30px); header app 52px; header modal 56px; chân modal 64px.
- Bo góc: ô nhập, nút, dropdown 8px · thẻ task 7px · pill 6px · khung nội dung 10px · modal 12px.
- Bảng Kanban 5 cột, mỗi cột tối thiểu 230px, cách nhau 10px; tràn thì cuộn ngang.

## 5. Bố cục

```
┌ sidebar 220 ┬──────────── khung nội dung (bo 10, cách mép 8) ─────────────┐
│ logo        │ header app 52: [Tìm kiếm Ctrl K]            [chuông] [tài khoản] │
│ Hôm nay     │ đầu trang: Dự án / ACME Shop                                   │
│ Task của tôi│            ■ ACME Shop  Northwind Retail · Hourly $35/h        │
│ — Làm việc  │            Bảng | Danh sách | Gantt | Cài đặt                 │
│ — Dự án     │ thanh công cụ: nhãn nằm trên ô: [Độ ưu tiên▾][Phân loại▾][Ngày kết thúc][Tìm kiếm] Xoá lọc   [+ Tạo task] │
│             │ nội dung (bảng / danh sách / Gantt / cài đặt)                 │
└─────────────┴────────────────────────────────────────────────────────────────┘
```

- Header app chỉ có tìm kiếm, chuông, tài khoản. Không đặt thông tin dự án lên header.
- Thanh lọc (màn 8, tab Bảng và Danh sách): mỗi ô có **nhãn nằm trên ô**, thứ tự `[Trạng thái (chỉ ở tab Danh sách)] [Độ ưu tiên] [Phân loại] [Ngày kết thúc] [Tìm kiếm]`, ô cao 36, cách nhau 12, canh đáy; nút Xoá lọc khi đang lọc, nút Tạo task đẩy sang phải. Ngày kết thúc: nhập ngày thì chỉ giữ task có ngày kết thúc từ ngày đó trở về trước.
- Danh sách task (màn 8, tab Danh sách): thanh lọc như trên, dưới là bảng có kẻ ô cả dọc và ngang, header nền `board`, dòng cao 48px, cuộn ngang khi hẹp. Chân bảng: trái "Hiển thị 1–10 trong 12" + "Số dòng/trang" + select; phải `« ‹ 1 2 … ›`, trang hiện tại nền `primary`.
- Gantt (màn 8, tab Gantt): cột trái 300px (sprint có mũi tên thu/mở + trạng thái; task có mã + tên), bên phải trục ngày 8 tuần, mỗi ngày tối thiểu 32px, cuộn ngang (cột trái đứng yên); rộng hơn khung thì kéo giãn cho kín. Rê vào thanh task hoặc sprint hiện tooltip nền `text` gồm mã, tên, trạng thái, độ ưu tiên, ngày bắt đầu → kết thúc, thời gian, hàng tuần ở trên; cuối tuần nền `soft`, hôm nay là vạch `primary`. Hàng sprint là thanh mảnh có phần đã xong (số task Done / tổng); hàng task là thanh cao 22 từ ngày bắt đầu đến ngày kết thúc, màu theo trạng thái, viền `late` khi quá hạn. Bấm tên hoặc thanh task mở modal sửa.
- Sửa / tạo task (màn 9, một file có công tắc Sửa / Thêm): **modal giữa màn hình**, rộng 1020px, cao tối đa 836px, không có chân modal. Hai cột: trái (Tên task, Dự án, Nội dung, Tệp đính kèm; riêng khi sửa thêm Checklist và tab Bình luận / Lịch sử) cuộn riêng; phải 320px nền `board` gồm các khối thẻ trắng viền `line` bo 8: khối 1 (Trạng thái, Độ ưu tiên, Sprint, Phân loại), khối 2 (Ngày bắt đầu, Ngày kết thúc), khối 3 là nút: **Tạo task / Lưu thay đổi** (rộng hết khối, mờ khi chưa đủ điều kiện), Lưu trữ (chỉ khi sửa), **Đóng**. Header modal: tạo = "Task mới"; sửa = mã task + nút sao chép link.
- Màu độ ưu tiên (chấm trong select, bảng, modal): Gấp `urgent`, Cao `high`, Thường `#4B6BB5`, Thấp `#8F8D87`. Viền thẻ Kanban chỉ có ở Gấp và Cao.
- Mọi màn dạng danh sách (5, 7, 10, 11, 12, 15 và các bảng trong màn 2, 6) dùng cùng một khuôn: hàng lọc có nhãn trên ô, ô tìm kiếm, bảng có kẻ ô và sắp xếp theo cột, chân bảng có "Hiển thị x–y trong n", "Số dòng/trang" và phân trang. Bảng cộng dồn (timesheet, báo cáo) có dòng "Tổng" ở cuối. Màn Kanban (3, 8) dùng thanh lọc nhưng không phân trang.
- Màn không có sidebar (1): nền `bg`, logo và tên sản phẩm ở trên, form nằm giữa trong thẻ trắng rộng 420, viền `line`, bo 12, padding 32.
- Thẻ số liệu: viền `line`, bo 10, nhãn 13 `muted` trên, số 22 / 600 dưới. Biểu đồ là thanh ngang `primary` trên nền `soft`, nhãn trái, giá trị phải.
- Hộp thoại tạo nhanh (thêm khách hàng, tạo dự án, chuyển job thành dự án): rộng 560, tiêu đề 15 / 600, chân có nút Đóng và nút chính; hộp thoại mở trên modal thì nền tối nằm trên modal.
- Pill trạng thái trong bảng: mặc định nền `soft`; xanh `#E6EDF8` (xong, được thuê, đang hợp tác), cam `#FCEBDD` (đang chạy, hôm nay), đỏ `#FBE5E1` (quá hạn, trượt, chưa đọc), xám (lưu trữ, tạm dừng).
- Mỗi số màn trong overview.md là một file `NN-ten-man.dc.html`; các tab và trạng thái của cùng một màn gộp trong file đó.
- Cài đặt dự án: các khối thẻ (Thông tin, Hợp đồng, Sprint, Phân loại), lưới 2 cột, rộng hết khung nội dung.

## 6. Component

| Thành phần | Quy tắc | MUI |
|---|---|---|
| Nút chính | nền `primary`, chữ trắng 600, icon "+" khi tạo mới | `Button variant="contained"` |
| Nút phụ | nền trắng, viền `line` | `Button variant="outlined"` |
| Nút trơn | không viền, chữ `muted` (Xoá lọc, Lưu trữ) | `Button variant="text"` |
| Ô nhập | viền `line`, hover `line2`, focus viền `primary` + quầng `ring` 3px; lỗi viền `error` | `TextField` / `OutlinedInput` |
| Select | tự dựng qua theme: danh sách thả xuống, mục đang chọn có dấu tích `primary`; chọn nhiều có ô tick `primary`. Không dùng select mặc định của trình duyệt | `Select` / `Autocomplete` |
| Ngày | ô gõ `dd/mm/yyyy` + nút lịch; lịch bắt đầu từ T2, hôm nay có viền, ngày chọn nền `primary`; nút Xoá / Hôm nay | `DatePicker` |
| Ngày giờ | `dd/mm/yyyy HH:mm`; lịch + ô giờ : phút; nút Xoá / Bây giờ / Xong | `DateTimePicker` |
| Bộ lọc | mỗi điều kiện là một ô nằm ngang, nhãn nằm trên ô; chưa lọc thì ô ghi "Tất cả", đang lọc thì ghi giá trị ("Gấp, Cao") | `Select` |
| Thẻ task | mã · tiêu đề · pill (ngày kết thúc, thời gian, checklist, phân loại). Mọi thẻ **cao bằng nhau 136px** (tên cắt 2 dòng, pill xếp từ trên xuống). Độ ưu tiên Gấp/Cao = **viền cả thẻ** màu `urgent`/`high`, không có chip ưu tiên | `Card` |
| Pill | cao 22px, viền `line`, chữ `muted` 12px; quá hạn chữ `error` | `Chip variant="outlined"` |
| Mô tả | trình soạn thảo: đậm, nghiêng, tiêu đề, danh sách chấm/số, mã, chèn ảnh (ảnh lên S3 qua presigned URL) | `mui-tiptap` |
| Checklist | ô tick `primary`, nội dung sửa tại chỗ, nút xoá; dòng thêm mục = ô nhập + nút "Thêm" cùng cao | — |
| Bình luận | ô "Viết bình luận" + nút "Gửi bình luận"; danh sách: avatar, tên, `dd/mm/yyyy HH:mm:ss`, nút xoá | — |
| Bảng (màn 8, tab Danh sách) | cột #, Thao tác (bút chì sửa, hộp lưu trữ), Mã, Tên task (đậm), Trạng thái (pill nền `soft`), Độ ưu tiên (chấm màu + chữ), Bắt đầu, Kết thúc, Sprint, Phân loại, Thời gian, Ngày tạo; bấm tiêu đề cột để sắp xếp; bấm tên mở modal | `DataGrid` (qua `AppDataGrid`) |
| Phân trang | số trang ô vuông 36px viền `line`, trang hiện tại nền `primary` chữ trắng; `«` `‹` `›` `»` là nút icon | `Pagination` |
| Khối thẻ (cột phải modal) | nền trắng, viền `line`, bo 8, padding 12, các ô cách 12 | `Paper variant="outlined"` |
| Tệp đính kèm | nút "Chọn tệp" có icon kẹp giấy; mỗi tệp một dòng cao 40: tên, xem, tải, xoá | — |
| Badge thông báo | nền `primary`, chữ trắng | `Badge` |
| Trạng thái cột | Todo vòng trống · Doing nửa vòng · Devdone ¾ vòng · Release vòng mờ · Done vòng đặc có dấu tích | icon SVG riêng |
| Toast | nền `text`, chữ trắng, dưới giữa màn, tự tắt sau ~2,6 giây | `Snackbar` |

## 7. Chuyển động & tương tác

- Chỉ chuyển màu viền và `box-shadow` trong 120ms; không animate layout, không `transition: all`. Tôn trọng `prefers-reduced-motion`.
- Bấm thẻ hoặc dòng → mở modal sửa. Esc đóng dropdown trước, rồi đến modal; bấm ra ngoài cũng đóng.
- "Lưu thay đổi" mờ khi chưa sửa gì; lưu xong cập nhật bảng ngay và hiện toast ("Đã lưu ACME-18").
- Đổi trạng thái sang Doing / Done mà chưa có thời gian bắt đầu / kết thúc thì tự điền giờ hiện tại; kết thúc phải sau bắt đầu.

## 8. Giọng văn

- Tiếng Việt, ngắn, chỉ dữ liệu. Ví dụ đúng: `$35/h`, `6h 40m`, `2/4`. Không viết câu giải thích trên màn.
- Nhãn nút là động từ cụ thể: "Tạo task", "Lưu thay đổi", "Gửi bình luận", "Xoá lọc".
- Placeholder chung chung: "Nhập tiêu đề", "Tìm task", "Viết bình luận".
- Ngày `dd/mm/yyyy`; màn chi tiết thêm `HH:mm:ss`; ô nhập ngày giờ `HH:mm`.
- Lỗi nói cần làm gì: "Nhập tiêu đề", "Ngày không hợp lệ", "Kết thúc phải sau bắt đầu".
- Người dùng mẫu: **Nguyễn Đức** (avatar "NĐ"), email `nguyenduc@example.com`.

## 9. Điều cấm

- Nút chính, logo, badge, ô tick màu đen.
- Select, date picker giao diện mặc định của trình duyệt.
- Focus viền đôi (outline chồng lên border đậm).
- Placeholder đậm hoặc to hơn chữ trong ô; ô nhập và nút cạnh nhau lệch chiều cao.
- Font thứ hai (kể cả font mono cho mã/số); độ đậm khác 400 và 600.
- Thông tin dự án trên header app; panel chi tiết trượt bên phải.
- Trường Người phụ trách / theo dõi / yêu cầu / phê duyệt, Hoạt động, Công việc cha, Giờ ước tính (app tham khảo có, Taskboard chỉ có một người dùng nên bỏ); câu hướng dẫn trong ô như "(paste ảnh sẽ tự đính kèm)", "Đếm: 0 tệp".
- Bộ lọc trong popover dạng chip / radio; số đếm "12 task".
- Đồng hồ bấm giờ, ước lượng giờ cho task, thanh giới hạn giờ tuần.
- Chip ưu tiên trên thẻ; icon phải đoán nghĩa; emoji làm icon.
- Gradient trang trí, indigo của Tailwind, thẻ có viền màu bên trái, nhãn mỗi cái một màu.
