---
name: frontend-design
description: Dựng giao diện chuẩn production (màn ứng dụng, dashboard, component React) theo DESIGN.md của dự án. Dùng khi dựng mới hoặc làm đẹp lại một màn hình.
---

# Dựng giao diện chuẩn production

## Trước khi làm

- Đọc `docs/DESIGN.md` của dự án (Taskboard: `repositories/taskboard/docs/DESIGN.md`) và theme/component đang có. Đó là nguồn sự thật; không tự chế màu, font, khoảng cách mới. Chưa có DESIGN.md thì chạy `/reference-design-contract` trước.
- Xác định người dùng, việc chính của màn, dữ liệu thật sẽ hiển thị.

## Khi làm

- Dùng component của thư viện dự án, chỉnh qua theme, không viết CSS tay chồng chéo.
- Màn phải đủ: điều hướng, bộ lọc, bảng/danh sách, trạng thái **trống / đang tải / lỗi**, hover/focus/disabled.
- Dữ liệu mẫu giống thật; không bịa số liệu "đẹp". Tên người dùng mẫu lấy theo DESIGN.md.
- Màu, khoảng cách, cỡ chữ lấy từ token của theme.
- Đưa nhiều phương án thì mỗi phương án phải khác về **bố cục và cấu trúc** (điều hướng, kiểu thẻ, kiểu màn chi tiết), không chỉ đổi màu.

## Quy tắc chung

- Một font, hai độ đậm (thường cho nội dung, đậm cho tiêu đề/nhãn). Không dùng font riêng cho số.
- Màu thương hiệu cho: nút chính, logo, badge thông báo, ô tick, mục đang chọn (ngày trên lịch, dấu tích trong danh sách chọn), viền focus. Không dùng đen cho những chỗ này.
- Không có chữ giải thích trên giao diện, chỉ hiện dữ liệu. Không dùng icon phải đoán nghĩa. Không hiện số đếm vô nghĩa ("12 task").
- Tránh kiểu "AI làm": gradient tím-xanh, indigo mặc định của Tailwind, thẻ có viền màu bên trái, emoji làm icon, nhãn mỗi cái một màu.
- Header chung của app chỉ chứa tìm kiếm, chuông thông báo, tài khoản. Thông tin của trang (tên dự án, tab) nằm ở phần đầu trang bên dưới.

## Form

- Focus chỉ **một** kiểu: viền màu thương hiệu + quầng mờ 3px. Không chồng outline lên viền đậm.
- Không dùng giao diện mặc định của trình duyệt: select tự dựng (danh sách có dấu tích; chọn nhiều thì có ô tick), ngày có lịch bật ra, ngày giờ có lịch + ô giờ:phút.
- Ô nhập, select và nút đứng cạnh nhau cùng chiều cao. Ô nhập và placeholder cùng cỡ chữ, chữ thường; placeholder chỉ nhạt màu hơn.
- Nhãn ở trên ô; bắt buộc có `*` đỏ; lỗi hiện ngay dưới ô.
- Bộ lọc: mỗi điều kiện là một select đặt ngang trên thanh công cụ, có "Xoá lọc" khi đang lọc.
- Sửa bản ghi dùng modal giữa màn hình. Mô tả dài dùng trình soạn thảo (đậm, nghiêng, tiêu đề, danh sách, mã, chèn ảnh).

## Tự kiểm tra trước khi giao

- Chữ không tràn, không đè lên nhau; số canh cột dùng `tabular-nums`.
- Mọi phần tử bấm được có trạng thái hover/focus rõ.
- Đối chiếu từng chữ, từng icon: người dùng nhìn có hiểu ngay không?
- Chạy `/web-design-guidelines` cho file vừa làm.
