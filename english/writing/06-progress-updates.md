# Viết 06 — Báo cáo tiến độ

> **Tuần 8** · Giai đoạn 2 · 3 buổi × 25 phút
> **Lịch học:** Ngày 1: mục 1–4 · Ngày 2: mục 5–7, bài A–B · Ngày 3: bài C–D và sửa.
> **Cần học trước:** [Viết 05](05-real-job-proposals.md) · [Hiện tại tiếp diễn](../grammar/01-present-tenses.md) · [Hiện tại hoàn thành](../grammar/04-present-perfect.md) · [Tiến độ & thời gian](../vocabulary/02-progress-time.md).

**Sau bài này bạn có thể:**

- Phân biệt việc đã xong, việc đang làm và bước tiếp theo.
- Viết báo cáo có kết quả kiểm tra và trở ngại cụ thể.
- Nêu đúng mức chắc chắn của tiến độ và yêu cầu hành động từ client.

<!-- lesson-video
id: writing-06
type: writing
title: "Clear Progress Updates"
audio: english/audio/writing/writing-06.mp3
video: english/video/out/writing/writing-06.mp4
voice: auto
speed: 0.9
-->

## 1. Tình huống

Client hỏi *How is it going?* Câu *I'm working on it* chỉ cho biết bạn đang làm, chưa cho biết đã đạt kết quả gì, còn việc gì hoặc có cần họ hỗ trợ không. Báo cáo tiến độ (progress update) giúp client quyết định bước tiếp theo mà không phải đọc toàn bộ công việc kỹ thuật.

Một hạng mục có thể “đã code” nhưng chưa “đã kiểm thử”, “đã lên staging” hoặc “đã lên production”. Gọi đúng trạng thái để tránh client hiểu đã sẵn sàng cho người dùng thật.

| Trạng thái | Cách viết | Giới hạn cần nói rõ |
|---|---|---|
| Đã triển khai code | I've implemented the export endpoint. | Chưa mặc nhiên đã test/deploy |
| Đã kiểm tra | The export passed the admin-access tests. | Nêu tests nào, không nói “mọi test” nếu chưa chạy |
| Đang làm | I'm testing large CSV files. | Chưa coi là hoàn thành |
| Đang bị chặn | Deployment is blocked until I receive staging access. | Chỉ rõ phần nào bị chặn |
| Dự kiến | I expect to finish testing tomorrow. | Đây là dự kiến, không phải kết quả |

## 2. Cấu trúc

| Phần | Mục đích |
|---|---|
| 1. Bối cảnh | Nêu task và kỳ báo cáo |
| 2. Đã xong | Nêu kết quả, bằng chứng hoặc môi trường |
| 3. Đang làm / tiếp theo | Cho thấy việc còn lại và thứ tự |
| 4. Trở ngại / cần hỗ trợ | Nêu tác động và hành động cần client làm |
| 5. Mốc cập nhật | Nêu dự kiến hoặc thời điểm báo tiếp |

Nếu không có trở ngại, có thể viết *There are no blockers at the moment* khi đã kiểm tra đúng tình hình. Không thêm trở ngại chỉ để đủ năm phần.

## 3. Mẫu câu theo từng phần

### 3.1 Bối cảnh

| Mẫu câu | Giọng điệu |
|---|---|
| Here's today's update on the CSV export. | Thân thiện |
| This is a progress update for the booking task. | Trung tính |
| Below is the current status of the agreed API changes. | Trang trọng |

### 3.2 Đã xong

| Mẫu câu | Giọng điệu |
|---|---|
| I've completed the admin access checks. | Trung tính |
| The CSV export is available on staging for review. | Trang trọng vừa phải; chỉ khi đã deploy |
| I tested the agreed fields, and the results match the sample file. | Trung tính, có bằng chứng |

### 3.3 Đang làm / tiếp theo

| Mẫu câu | Giọng điệu |
|---|---|
| I'm currently testing exports with larger datasets. | Trung tính |
| Next, I'll update the usage guide. | Thân thiện |
| The remaining work is to test the error cases and prepare the handover notes. | Trang trọng vừa phải |

### 3.4 Trở ngại / cần hỗ trợ

| Mẫu câu | Giọng điệu |
|---|---|
| I need staging access before I can verify deployment. | Trung tính |
| Could you confirm the final column order? | Lịch sự |
| The API tests can continue, but the client review is blocked by the access issue. | Trang trọng vừa phải, rõ tác động |

### 3.5 Mốc cập nhật

| Mẫu câu | Giọng điệu |
|---|---|
| I'll send the next update by 5 PM GMT+7 tomorrow. | Trung tính; ghi ngày cụ thể khi cần |
| If access is available today, I expect to complete the staging check tomorrow. | Trung tính, có điều kiện |
| I'll confirm the revised delivery date after reviewing the remaining issue. | Trang trọng vừa phải |

**Chọn thì:** *I fixed the issue yesterday* dùng quá khứ đơn vì có *yesterday*. *I've fixed the issue* nhấn kết quả hiện tại, không thêm mốc quá khứ đã kết thúc. *I'm testing it* cho biết đang làm. *I'll test it next* cho biết việc chưa làm. Một báo cáo có thể dùng cả bốn cấu trúc nếu mỗi câu phản ánh đúng trạng thái.

## 4. Giọng điệu

Với cập nhật thường ngày, dùng lời chào ngắn và nhãn *Done / In progress / Blocked / Next*. Với báo cáo cuối milestone, dùng đoạn đầy đủ và link bàn giao nếu có. Đừng thay dữ kiện bằng cảm giác như *almost done*, *99% complete*, *everything is fine*.

Nếu dùng phần trăm, cần có cách đo và phạm vi rõ. Với task nhỏ, “endpoint xong, còn hai nhóm kiểm thử và deployment” thường hữu ích hơn “90%”. Dùng từ client hiểu: *Large exports are still being tested* dễ đánh giá hơn danh sách tên class đã sửa.

## 5. Bài mẫu

### Bài tốt

**Bối cảnh mô phỏng:** endpoint và quyền admin đã xong, tests tương ứng chạy ở local; chưa có staging access. Thứ tự cột chưa chốt. Không có xác nhận đã deploy.

<!-- passage:start -->
Hi Anna, here's today's update on the CSV export.

Done: I've implemented the export endpoint and the admin access checks. The local tests for the agreed fields and permissions have passed.

In progress: I'm testing larger files and preparing the usage guide.

Blocked: I still need staging access to verify deployment. Could you also confirm whether the column order should be title, status, then assignee?

The export has not been deployed yet. If I receive access today, I expect to complete the staging check tomorrow. I'll send another update by 5 PM GMT+7 tomorrow, even if access is still pending.
<!-- passage:end -->

**Vì sao tốt:** nêu đầu ra và phạm vi tests; phân biệt local với staging. Yêu cầu hai hành động cụ thể. Mốc hoàn tất có điều kiện; mốc báo tiếp vẫn rõ ngay cả khi bị chặn. Khi gửi thực tế, thay “today/tomorrow” bằng ngày cụ thể nếu có thể gây nhầm.

> 🎧 Audio: [english/audio/writing/writing-06.mp3](../audio/writing/writing-06.mp3) · 🎬 Video: `english/video/out/writing/writing-06.mp4` _(dự kiến; tạo bằng skill `lesson-video`)._

### Bài kém

> Almost done, 99%. Everything works perfectly. I am finish the export yesterday. I can't do anything because you didn't send access. It should be ready soon.

**Vì sao kém:** không có kết quả cụ thể; nói “everything works” khi mới kiểm tra local. Đổ lỗi và nói không làm được gì dù còn tests/tài liệu có thể làm. *Soon* không cho client biết khi nào có tin. Câu về việc đã xong dùng sai ngữ pháp.

## 6. Lỗi thường gặp

| ❌ Sai hoặc mơ hồ | ✅ Cách sửa | Lý do |
|---|---|---|
| I am finish the API. | I've finished the API implementation. | Kết quả đã xong dùng hoàn thành; nói đúng phạm vi |
| I've tested it yesterday. | I tested it yesterday. | Mốc quá khứ kết thúc |
| I'm work on the tests. | I'm working on the tests. | *Am + V-ing* |
| The feature is live. | The feature is available on staging. | Nếu mới ở staging, không gọi là live production |
| I wait your feedback. | I'm waiting for your feedback. | *Wait for*; trạng thái đang chờ |
| All tests passed. | The permission tests passed; load testing is still pending. | Nêu phần đã kiểm tra và chưa kiểm tra |

## 7. Checklist trước khi gửi

- [ ] Tôi nêu đúng task và kỳ cập nhật.
- [ ] Tôi tách việc đã xong, đang làm và tiếp theo.
- [ ] Tôi nêu môi trường và phạm vi kiểm tra.
- [ ] Tôi mô tả trở ngại cùng tác động cụ thể.
- [ ] Nếu cần client hỗ trợ, yêu cầu có thể hành động được.
- [ ] Tôi phân biệt mốc dự kiến với kết quả đã xác nhận.
- [ ] Tôi ghi thời điểm cập nhật tiếp theo rõ ràng.

## 8. Bài tập

### A. Sửa bài kém

Viết lại mục 5 trong **90–130 từ**, dựa vào bối cảnh mẫu tốt. Không tự nhận đã deploy, đã test hiệu năng xong hoặc đã được client duyệt.

<details>
<summary>Gợi ý A</summary>

Hi Anna, I've completed the CSV endpoint and admin access checks. The local tests for the agreed fields and permissions have passed. I'm now testing larger files and writing the usage guide. I still need staging access before I can verify deployment, so the feature has not been deployed yet. Could you provide access and confirm the column order? If access is available today, I expect to complete the staging check tomorrow. I'll send another update by 5 PM GMT+7 tomorrow, including any remaining blockers.

Không dùng *ready for production* khi mới có local tests. Chấp nhận nhãn hoặc đoạn văn.

</details>

### B. Ôn bài trước

1. Sửa câu ôn proposal: *I have worked on a booking project last year.*
2. Nguồn job chỉ nhắc công việc Stripe. Có nên viết *Your payments are broken* trong proposal không? Viết một câu tiếng Anh thay thế, không thêm lỗi.
3. Bạn chỉ triển khai queue trong project cá nhân. Viết một câu thể hiện đúng bằng chứng đó.

<details>
<summary>Đáp án B</summary>

1. I **worked** on a booking project last year.
2. Không. Có thể viết: *I'd like to learn which Stripe task you want to prioritize.* Không tự chẩn đoán từ mô tả công việc.
3. *I implemented a queue in a personal project.* Có thể bổ sung giới hạn production nếu đúng.

</details>

### C. Viết theo tình huống

Mỗi tin **80–120 từ**. Dữ kiện đều là mô phỏng; không thêm kết quả chưa cho.

1. **Taskboard:** endpoints tạo task và đổi trạng thái đã xong; tests local đã pass; đang làm tests cho phân quyền; chưa deploy; không có blocker. Báo tiếp lúc 17:00 GMT+7 ngày mai. Nói rõ còn kiểm tra quyền trước khi staging.
2. **Đặt vé:** đã tái hiện lỗi không gửi vé sau một số thanh toán; chưa xác nhận nguyên nhân; đang đọc logs; cần client cung cấp một mã booking bị ảnh hưởng qua kênh được phép. Báo kết quả điều tra tiếp theo vào 15:00 GMT+7 ngày mai. Không hứa fix xong cùng mốc đó.
3. **Cuối milestone:** CSV đã lên staging và pass tests đã thống nhất; chưa lên production; đang chờ client kiểm tra title/status/assignee và quyền admin. Đề nghị phản hồi trong hai ngày làm việc nếu thuận tiện. Nêu bước sau phản hồi, không coi việc im lặng là duyệt.

<details>
<summary>Tiêu chí C</summary>

1. Có done/in progress/next và mốc báo; không gọi taskboard hoàn thành khi tests quyền còn thiếu.
2. Phân biệt *I've reproduced…* với *I've identified the cause…*. Có thể viết *The cause is still under investigation.* Mã booking là yêu cầu dữ kiện, không cần thông tin thẻ hay mật khẩu.
3. Có thể viết *Please review the export on staging and confirm whether the fields and permissions match the agreed scope.* Sau phản hồi: xử lý phần cần sửa trong phạm vi và thống nhất triển khai production.

</details>

### D. Rút gọn cho chat

Rút tình huống C1 thành **4 câu, 40–60 từ**. Vẫn giữ việc đã xong, việc đang làm, trạng thái deploy và mốc báo tiếp.

<details>
<summary>Gợi ý D</summary>

I've implemented task creation and status updates, and their local tests have passed. I'm now testing permissions, with no blockers at the moment. The changes have not been deployed; staging review comes after those checks. I'll send the next update by 5 PM GMT+7 tomorrow.

</details>

# BÀI LÀM CỦA BẠN

## A. Sửa bài kém

_(Viết tại đây.)_

## B. Ôn bài trước

1. ___
2. ___
3. ___

## C. Viết theo tình huống

**1. Taskboard:**

_(Viết tại đây.)_

**2. Điều tra lỗi:**

_(Viết tại đây.)_

**3. Cuối milestone:**

_(Viết tại đây.)_

## D. Rút gọn cho chat

_(Viết tại đây.)_

# TỰ ĐÁNH GIÁ

- [ ] Tôi dùng đúng thì cho đã xong, đang làm và việc tiếp theo.
- [ ] Tôi nêu kết quả cụ thể thay cho phần trăm không có cách đo.
- [ ] Tôi phân biệt local, staging và production.
- [ ] Tôi giải thích tác động của blocker và yêu cầu cần hỗ trợ.
- [ ] Tôi ghi mốc báo tiếp, kể cả khi chưa thể chốt mốc hoàn tất.

# NHẬN XÉT

_(Chạy `/english-lesson check english/writing/06-progress-updates.md` sau khi làm xong.)_

# LỖI SAI CẦN NHỚ

_(Cập nhật khi chấm bài.)_
