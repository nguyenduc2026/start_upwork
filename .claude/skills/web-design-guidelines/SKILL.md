---
name: web-design-guidelines
description: Rà code giao diện theo danh sách quy tắc web (truy cập, focus, form, chữ, nội dung, hiệu năng) và báo lỗi theo file:dòng. Dùng khi người dùng nói "review UI", "kiểm tra giao diện", hoặc sau khi dựng xong một màn.
---

# Rà giao diện

Đọc các file được chỉ định (chưa chỉ định thì hỏi), đối chiếu với danh sách dưới, báo lỗi ngắn gọn.

## Danh sách kiểm tra

**Truy cập & focus**
- Nút chỉ có icon phải có `aria-label`; icon trang trí có `aria-hidden`.
- Hành động dùng `<button>`, điều hướng dùng `<a>`/`Link`, không dùng `div` có `onClick`.
- Ô nhập có label; heading theo thứ tự h1→h6.
- Phần tử bấm được có focus thấy rõ (`:focus-visible`); không xoá outline mà không thay thế.

**Form**
- Đúng `type`, có `name`, `autocomplete`; không chặn dán.
- Lỗi hiện ngay dưới ô; submit thì focus vào lỗi đầu tiên.
- Không có `<select>` hay ô ngày dùng giao diện mặc định của trình duyệt; dùng select/date picker của thư viện dự án.
- Ô nhập không bị viền đôi khi focus (outline chồng lên border); chỉ một kiểu focus.
- Nút submit có trạng thái đang xử lý; cảnh báo khi rời trang còn thay đổi chưa lưu.

**Chữ & nội dung**
- Số canh cột dùng `tabular-nums`; ngày/số format bằng `Intl` (`vi-VN` → `dd/mm/yyyy`).
- Chữ dài có `truncate`/`line-clamp`; flex child chứa chữ có `min-width: 0`.
- Có trạng thái trống, không để giao diện vỡ khi mảng rỗng.
- Thông báo lỗi nói rõ cách sửa; nhãn nút cụ thể ("Lưu task", không phải "Tiếp tục").

**Tương tác & trạng thái**
- Nút/link có hover; hành động xoá cần xác nhận hoặc cho hoàn tác.
- Bộ lọc, tab, phân trang phản ánh trên URL.
- Modal/drawer có `overscroll-behavior: contain`.

**Chuyển động & hiệu năng**
- Tôn trọng `prefers-reduced-motion`; chỉ animate `transform`/`opacity`; không `transition: all`.
- Danh sách > 50 dòng cần ảo hoá; ảnh có `width`/`height`.

**Không áp dụng cho dự án này:** viết hoa chữ đầu mỗi từ (Title Case); placeholder kết thúc bằng "…" (dự án dùng "Nhập email").

## Cách báo

Nhóm theo file, mỗi lỗi một dòng `file:dòng - vấn đề`. File không lỗi ghi `✓ đạt`. Không mở đầu dài dòng.
