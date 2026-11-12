---
name: reference-design-contract
description: Biến ảnh tham khảo, link hoặc ý thích mơ hồ ("làm giống thế này") thành file DESIGN.md có quy tắc rõ ràng, trước khi dựng prototype hay code giao diện. Dùng khi người dùng gửi ảnh chụp / nói "thích kiểu này" / cần chốt hướng thiết kế.
---

# Reference → DESIGN.md

Mục tiêu: chốt quyết định thiết kế thành quy tắc cụ thể để bước dựng giao diện sau không phải đoán.

## Các bước

1. **Chốt việc:** màn/sản phẩm nào, ai dùng, ràng buộc kỹ thuật (Taskboard: MUI, giao diện tiếng Việt, chỉ desktop). Thiếu thông tin làm đổi hướng thì hỏi tối đa 2 câu, còn lại tự chọn và ghi rõ là "suy ra".
2. **Đọc tham khảo:** với mỗi ảnh/link, tách 3 nhóm:
   - **Giữ:** mật độ, bố cục, nhịp chữ, tông màu, cách xếp thành phần.
   - **Đổi:** nội dung, chữ, dữ liệu cho đúng sản phẩm của mình.
   - **Không chép:** logo, tên thương hiệu, dữ liệu thật, giao diện độc quyền nguyên si.
3. **Chọn một hướng duy nhất.** Không đưa nhiều lựa chọn mơ hồ.
4. **Viết `DESIGN.md`** (đặt ở `docs/` của dự án) gồm đúng 9 mục:
   1. Tinh thần chung · 2. Màu · 3. Chữ · 4. Khoảng cách & lưới · 5. Bố cục · 6. Component · 7. Chuyển động & tương tác · 8. Giọng văn · 9. Điều cấm
5. **Kiểm tra trước khi giao:**
   - Mỗi tham khảo đã tách Giữ / Đổi / Không chép.
   - Quy tắc là con số, mã màu, tên font cụ thể, không phải tính từ ("sang", "hiện đại").
   - Mục "Điều cấm" liệt kê chính xác thứ phải tránh.
   - Người khác đọc xong dựng được màn đầu tiên mà không cần hỏi lại.
