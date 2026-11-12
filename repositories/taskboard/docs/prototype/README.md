# Prototype (bản tạm, đang review)

Xem và bấm thử trên canvas: https://claude.ai/artifact/1b254DDWzzoQnL6wgqp55Z

Các file `.dc.html` là định dạng của canvas Design, cần runtime của canvas nên không mở trực tiếp bằng trình duyệt được. Thư mục này chỉ để lưu mã nguồn.

Quy ước: một số màn = một file (màn có nhiều tab hoặc nhiều trạng thái thì gộp trong file đó, không tách file nhỏ). Số đầu tên file là số màn trong [../overview.md](../overview.md) mục 6. Mỗi file tự chứa đủ (sidebar, header, dữ liệu mẫu), sửa màn nào chỉ động vào file đó. Các màn nối với nhau bằng link (bấm "Tạo task" hoặc tên task sang 09, tab Cài đặt sang 13, "Đóng" về 8b).

| File | Màn |
|---|---|
| `Main.dc.html` | Mục lục các màn (file vào của canvas) |
| `01-xac-thuc.dc.html` | 1 · Đăng nhập, đăng ký, xác minh email, quên và đặt lại mật khẩu (prop `view`) |
| `02-hom-nay.dc.html` | 2 · Hôm nay |
| `03-pipeline.dc.html` | 3 · Pipeline job (Kanban) |
| `04-chi-tiet-job.dc.html` | 4 · Chi tiết job và hộp thoại Chuyển thành dự án |
| `05-khach-hang.dc.html` | 5 · Danh sách khách hàng, hộp thoại Thêm khách hàng |
| `06-chi-tiet-khach-hang.dc.html` | 6 · Chi tiết khách hàng (tab Dự án / Job) |
| `07-du-an.dc.html` | 7 · Danh sách dự án, hộp thoại Tạo dự án |
| `08-bang-du-an.dc.html` | 8 · Bảng dự án, 3 tab: Bảng, Danh sách, Gantt (prop `tab`) |
| `09-them-sua-task.dc.html` | 9 · Modal thêm / sửa task (prop `mode`) |
| `10-task-cua-toi.dc.html` | 10 · Task của tôi |
| `11-timesheet.dc.html` | 11 · Timesheet tuần (đổi tuần bằng mũi tên) |
| `12-bao-cao.dc.html` | 12 · Báo cáo: tab Thu nhập, tab Pipeline |
| `13-cai-dat-du-an.dc.html` | 13 · Cài đặt dự án |
| `14-ho-so-cai-dat.dc.html` | 14 · Hồ sơ và cài đặt (prop `tab`) |
| `15-thong-bao.dc.html` | 15 · Thông báo |
| `16-trang-thai-loi.dc.html` | 16 · 404, lỗi mạng, hết phiên, trạng thái trống |
| `canvas.json` | Vị trí các artboard trên canvas |

Phong cách đã chọn: A (gọn, kiểu Linear), font Inter, màu chính cam `#D9480F`. Quy tắc chi tiết ở [../DESIGN.md](../DESIGN.md).
