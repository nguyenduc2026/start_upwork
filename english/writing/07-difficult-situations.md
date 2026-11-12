# Viết 07 — Tình huống khó: trễ hạn, bug, đổi yêu cầu

> **Tuần 8** · Giai đoạn 2 · 3 buổi × 25 phút
> **Lịch học:** Ngày 1: mục 1–4 · Ngày 2: mục 5–7 và bài A–B · Ngày 3: bài C–D, tự kiểm tra và sửa.
> **Cần học trước:** [Viết 03](03-time-cost-estimates.md) · [Viết 06](06-progress-updates.md) · [Điều kiện loại 1](../grammar/07-first-conditional.md) · [Xử lý sự cố](../vocabulary/08-incidents.md).

**Sau bài này bạn có thể:**

- Báo nguy cơ trễ hạn sớm, nhận trách nhiệm trong phạm vi đúng và đưa bước xử lý.
- Phản hồi bug bằng dữ kiện đã biết, không tự đoán nguyên nhân.
- Trao đổi yêu cầu bổ sung bằng phạm vi, tác động và xác nhận trước khi làm.

<!-- lesson-video
id: writing-07
type: writing
title: "Handling Delays Bugs and Scope Changes"
audio: english/audio/writing/writing-07.mp3
video: english/video/out/writing/writing-07.mp4
voice: auto
speed: 0.9
-->

## 1. Tình huống

Một tin nhắn tốt khi có vấn đề giúp client hiểu chuyện gì đang xảy ra và quyết định việc tiếp theo. Client không cần một đoạn xin lỗi dài; họ cần tác động, hành động và mốc cập nhật đáng tin.

| Tình huống | Cần nói rõ | Không tự khẳng định |
|---|---|---|
| Nguy cơ trễ | Hạn bị ảnh hưởng, việc còn lại, kế hoạch | Ngày mới chắc chắn nếu chưa đánh giá |
| Bug được báo | Triệu chứng, ảnh hưởng đã xác minh, bước điều tra | Nguyên nhân và phạm vi người dùng chưa kiểm tra |
| Thêm yêu cầu | Phần khác phạm vi, tác động cần đánh giá, lựa chọn | Mọi thay đổi đều miễn phí hoặc đều thuộc lỗi của client |

**Phân biệt bug và đổi yêu cầu:** nếu đầu ra không đáp ứng tiêu chí đã thống nhất, đó có thể là lỗi cần sửa trong phần việc đã nhận. Nếu client muốn hành vi mới chưa thống nhất, đó có thể là yêu cầu bổ sung. Đối chiếu mô tả và tiêu chí đạt trước khi gọi tên; không mặc nhiên tính thêm cho mọi phản hồi.

## 2. Cấu trúc

| Phần | Mục đích |
|---|---|
| 1. Ghi nhận | Nêu vấn đề và xin lỗi ngắn nếu bạn gây bất tiện |
| 2. Dữ kiện / tác động | Nêu điều đã biết, điều đang xác minh, mốc hoặc chức năng bị ảnh hưởng |
| 3. Hành động | Nêu việc đang làm và cách giảm tác động nếu đã thống nhất |
| 4. Lựa chọn / xác nhận | Đề nghị phương án hoặc hỏi dữ kiện cần thiết |
| 5. Mốc tiếp theo | Chốt thời điểm báo tiếp; chỉ chốt hạn sửa khi có căn cứ |

## 3. Mẫu câu theo từng phần

### 3.1 Ghi nhận

| Mẫu câu | Giọng điệu |
|---|---|
| I'm sorry, but I won't be able to meet the agreed delivery time. | Trang trọng vừa phải, nhận việc trễ |
| Thanks for reporting the checkout issue. | Trung tính, chưa nhận nguyên nhân |
| Thanks for explaining the new export requirement. | Thân thiện |

### 3.2 Dữ kiện / tác động

| Mẫu câu | Giọng điệu |
|---|---|
| The permission tests are taking longer than I estimated. | Trung tính, nhận sai ước lượng nếu đúng |
| I've reproduced the issue on staging, but the cause is still under investigation. | Trang trọng vừa phải |
| PDF export was not included in the agreed CSV scope. | Trung tính; cần kiểm tra thỏa thuận |

### 3.3 Hành động

| Mẫu câu | Giọng điệu |
|---|---|
| I'm reviewing the remaining test failures before proposing a new date. | Trung tính |
| I'm checking the logs and testing the affected flow. | Thân thiện |
| I'll review the PDF layout and estimate the additional work. | Trang trọng vừa phải |

### 3.4 Lựa chọn / xác nhận

| Mẫu câu | Giọng điệu |
|---|---|
| Would you prefer to review the completed part first? | Lịch sự, đưa lựa chọn |
| Could you share the steps you took before the error appeared? | Lịch sự, xin dữ kiện |
| We can keep the CSV delivery as planned and schedule PDF export separately. | Trung tính; chỉ đề nghị khi khả thi |

### 3.5 Mốc tiếp theo

| Mẫu câu | Giọng điệu |
|---|---|
| I'll send an update by 3 PM GMT+7 tomorrow. | Trung tính |
| Once I've checked the remaining work, I'll propose a revised delivery date. | Trang trọng vừa phải |
| I'll wait for your confirmation before starting the additional work. | Thân thiện, rõ ranh giới |

## 4. Giọng điệu

Khi bạn ước lượng thiếu, nói *I underestimated the testing effort* nếu đó là sự thật, rồi nêu cách sửa kế hoạch. Khi chưa biết nguyên nhân bug, cảm ơn báo lỗi và nói điều đang kiểm tra. Không cần nhận mình gây lỗi hoặc đổ lỗi cho bên khác trước khi có bằng chứng.

| Tránh | Nên viết | Vì sao |
|---|---|---|
| It's your fault. | The staging check is waiting for access. | Nêu tình trạng, tránh công kích |
| Don't worry, nothing is wrong. | I'm checking the issue and will share the findings. | Không phủ nhận vấn đề chưa kiểm tra |
| It will definitely be fixed in ten minutes. | I'll confirm the fix timeline after the initial investigation. | Phân biệt điều tra và sửa xong |
| That's not my job. | This appears to be outside the agreed scope; let's review it. | Có căn cứ và mở trao đổi |
| Sorry sorry sorry… | I'm sorry for the delay. Here's the current plan. | Xin lỗi ngắn, đi vào hành động |

## 5. Bài mẫu

### Bài tốt — nguy cơ trễ hạn

**Bối cảnh mô phỏng:** hẹn giao CSV lúc 17:00 hôm nay; tests quyền chưa pass do ước lượng thiếu. Core export hoạt động local, chưa lên production. Đang là thời điểm trước hạn giao, chưa đủ dữ kiện chốt hạn mới.

<!-- passage:start -->
Hi Anna, I need to flag a delay with the CSV export before today's 5 PM GMT+7 deadline. I'm sorry; I underestimated the time needed for the permission tests.

The core export works locally, but the permission checks have not all passed. It is not ready for production. I'm reviewing the remaining failures now.

Would you like to review the completed export behavior while I finish those checks? This would be a partial review, not a final handover.

I'll send an update by 10 AM GMT+7 tomorrow with the test results and a proposed delivery date. Please let me know if this delay affects another scheduled task.
<!-- passage:end -->

**Vì sao tốt:** báo trước hạn; nhận phần ước lượng thiếu, nêu đúng trạng thái tests. Phương án xem trước được gọi rõ là review một phần. Mốc báo tiếp chắc chắn hơn một lời hứa sửa xong chưa có căn cứ.

> 🎧 Audio: [english/audio/writing/writing-07.mp3](../audio/writing/writing-07.mp3) · 🎬 Video: `english/video/out/writing/writing-07.mp4` _(dự kiến; tạo bằng skill `english-generate-video`)._

### Bài tốt — bug

> Thanks for reporting the missing-ticket issue. I've reproduced it on staging, but I haven't confirmed the cause or checked whether production is affected. I'm reviewing the payment and booking logs now. Could you share the affected booking ID through our agreed channel? I'll send the next investigation update by 3 PM GMT+7 tomorrow.

**Vì sao tốt:** chỉ nêu những gì đã tái hiện; tách môi trường, nguyên nhân và phạm vi ảnh hưởng. Mốc 15:00 là báo điều tra, không phải lời hứa sửa xong.

### Bài tốt — đổi yêu cầu

> Thanks for the PDF request. The agreed scope covers CSV export only. Could you share a sample PDF layout? I can estimate the additional work after reviewing it. We can keep the CSV work separate while we discuss PDF export. I'll wait for your approval of the added scope and estimate before starting it.

**Vì sao tốt:** nhắc phạm vi, hỏi dữ kiện và đề nghị cách tách việc. Không gán động cơ xấu cho client hoặc tự đưa phí khi chưa biết layout.

### Bài kém

> I can't finish today. Your requirements keep changing, and the old developer made bad code. There may be bugs everywhere, but don't worry. I'll fix everything tonight. PDF is easy, so I'll add it for free too.

**Vì sao kém:** đổ lỗi, suy đoán ảnh hưởng toàn hệ thống; vừa chưa biết lỗi vừa hứa sửa mọi thứ. Tự thêm PDF khiến việc trễ dễ nặng hơn. Không nêu kết quả đã xác minh, hành động ưu tiên hay mốc báo tiếp.

## 6. Lỗi thường gặp

| ❌ Sai hoặc chưa phù hợp | ✅ Cách sửa | Lý do |
|---|---|---|
| Sorry for delay. | I'm sorry for the delay. | *The delay* chỉ việc trễ đã biết |
| I didn't finished the tests. | I didn't finish the tests. | Sau *didn't* dùng nguyên mẫu |
| If you will approve, I'll start. | If you approve, I'll start. | Điều kiện loại 1 |
| The issue has fixed. | I've fixed the issue. | Cần chủ ngữ thực hiện hành động; câu này chỉ dùng khi thật sự đã sửa |
| I suggest to delay the review. | I suggest delaying the review. | *Suggest + V-ing* |
| The bug affects all users. | I've confirmed the issue for one test account; I'm checking its wider impact. | Không mở rộng phạm vi ngoài bằng chứng |

## 7. Checklist trước khi gửi

- [ ] Tôi báo sớm khi biết nguy cơ, không chờ client hỏi.
- [ ] Tôi nêu đúng dữ kiện, phạm vi và điều chưa xác minh.
- [ ] Tôi nhận trách nhiệm đúng mức, không đổ lỗi hoặc suy đoán.
- [ ] Tôi có hành động cụ thể và mốc báo tiếp.
- [ ] Tôi phân biệt review một phần với bàn giao hoàn tất.
- [ ] Với yêu cầu mới, tôi đối chiếu phạm vi và xin xác nhận trước khi làm thêm.
- [ ] Tôi không hứa deadline, chi phí hoặc kết quả chưa đủ căn cứ.

## 8. Bài tập

### A. Sửa bài kém

Viết lại bài kém ở mục 5 trong **90–130 từ**. Dữ kiện: deadline hôm nay 17:00 GMT+7; tests quyền chưa pass; bạn ước lượng thiếu; core CSV hoạt động local; PDF là yêu cầu mới ngoài phạm vi. Hẹn cập nhật lúc 10:00 GMT+7 ngày mai, chưa tự đặt hạn hoàn tất mới.

<details>
<summary>Gợi ý A</summary>

Hi Anna, I'm sorry, but I won't meet today's 5 PM GMT+7 deadline. I underestimated the permission testing effort. The core CSV export works locally, but some permission checks are still failing, so it is not ready for production. I'm reviewing those failures now. I'll send an update by 10 AM GMT+7 tomorrow with the test results and a proposed delivery date. The PDF request is outside the agreed CSV scope. Could you share a sample layout? I'll estimate that work separately and wait for your approval before starting it.

Giữ hai luồng riêng: khắc phục phần CSV còn thiếu và trao đổi PDF bổ sung. Không gọi tests quyền của CSV là yêu cầu mới để tính thêm.

</details>

### B. Ôn bài trước

1. Sửa: *I've finished the endpoint yesterday, and I'm test permissions now.*
2. Bản code chỉ chạy local. Sửa câu *The feature is live for customers* để đúng trạng thái.
3. Viết một câu hẹn báo kết quả điều tra lúc 15:00 GMT+7 ngày mai mà không hứa sửa xong.

<details>
<summary>Đáp án B</summary>

1. I **finished** the endpoint yesterday, and I'm **testing** permissions now.
2. *The feature works locally and has not been deployed for customers yet.* Không tự nhận đã lên staging.
3. *I'll send the next investigation update by 3 PM GMT+7 tomorrow.*

</details>

### C. Viết theo ba tình huống

Mỗi tin **90–130 từ**, dùng dữ kiện mô phỏng sau:

1. **Trễ hạn:** API taskboard hẹn ngày 18/11/2026 lúc 17:00 GMT+7. Hôm nay là 17/11/2026 trong tình huống này. Bạn phát hiện còn lỗi tests phân quyền do ước lượng thiếu; chưa chốt được hạn sửa. Báo sớm, đề xuất review endpoint đã xong nếu client muốn, hẹn báo tiếp 10:00 GMT+7 ngày 18/11. Không coi ngày giả định này là ngày học thực tế.
2. **Bug:** client báo hai lần bấm thanh toán có thể tạo hai booking. Bạn mới nhận báo cáo, chưa tái hiện, chưa biết production có bị ảnh hưởng không. Ghi nhận, hỏi bước tái hiện và mã booking qua kênh đã thống nhất; nêu kế hoạch kiểm tra; hẹn báo điều tra lúc 15:00 GMT+7 ngày mai. Không khẳng định đã có duplicate charge hoặc đã sửa.
3. **Đổi yêu cầu:** thỏa thuận chỉ có thông báo trong app khi giao task. Client muốn thêm email và trang cài đặt tắt/mở. Nêu khác biệt, hỏi người nhận và lựa chọn mặc định; đề nghị ước lượng bổ sung sau khi làm rõ. Cho lựa chọn giữ bản đầu hoặc bàn lại phạm vi/lịch; không tự thêm miễn phí hay tự đặt giá.

<details>
<summary>Tiêu chí C</summary>

1. Cần nhắc mốc cũ, lý do có trách nhiệm, trạng thái chưa xong và mốc báo mới. *I'm concerned that the permission test failures will affect the agreed delivery date.* có thể dùng khi đang báo nguy cơ. Không bịa đã fix hoặc tự chuyển deadline sang một ngày mới.
2. Có thể mở *Thanks for reporting this. I haven't reproduced it yet, so I'm still checking the cause and impact.* Phân biệt booking lặp và thanh toán bị trừ hai lần; báo cáo chưa chứng minh cả hai.
3. Có thể viết *The current scope includes in-app assignment notifications. Email delivery and a settings page would add new work.* Hỏi rõ rồi mới ước lượng; nếu client cho rằng đã có trong phạm vi, đề nghị cùng đối chiếu tài liệu.

</details>

### D. Phân biệt lỗi với yêu cầu mới

Thỏa thuận ghi “chỉ admin được xuất CSV”. Client phát hiện thành viên thường vẫn xuất được. Viết **3–5 câu** ghi nhận và nêu bước điều tra/sửa. Có nên gọi đây là yêu cầu mới và báo giá riêng ngay không? Giải thích một câu tiếng Việt.

<details>
<summary>Gợi ý D</summary>

Thanks for flagging the access issue. The agreed scope limits CSV export to admins, so this behavior does not match the requirement. I'll reproduce the issue, check the permission logic, and test the affected roles after the fix. I'll send an update once the initial investigation is complete.

Không gọi đây là yêu cầu mới chỉ vì client vừa phát hiện: hành vi không đáp ứng tiêu chí quyền đã thống nhất. Khi gửi thật, thay *once…* bằng một mốc cập nhật cụ thể sau khi xem lịch.

</details>

# BÀI LÀM CỦA BẠN

## A. Sửa bài kém

_(Viết tại đây.)_

## B. Ôn bài trước

1. ___
2. ___
3. ___

## C. Viết theo tình huống

**1. Trễ hạn:**

_(Viết tại đây.)_

**2. Bug:**

_(Viết tại đây.)_

**3. Đổi yêu cầu:**

_(Viết tại đây.)_

## D. Lỗi hay yêu cầu mới

_(Tin nhắn tiếng Anh và một câu giải thích tiếng Việt.)_

# TỰ ĐÁNH GIÁ

- [ ] Tôi báo trễ rõ ràng, nhận trách nhiệm đúng phạm vi.
- [ ] Tôi tách triệu chứng, nguyên nhân và ảnh hưởng đã xác minh.
- [ ] Tôi đưa bước xử lý và mốc báo tiếp cụ thể.
- [ ] Tôi không hứa sửa xong khi mới bắt đầu điều tra.
- [ ] Tôi phân biệt sửa lỗi theo thỏa thuận và bổ sung chức năng.
- [ ] Tôi trao đổi phạm vi/lịch/chi phí trước khi triển khai việc mới.

# NHẬN XÉT

_(Chạy `/english-lesson check english/writing/07-difficult-situations.md` sau khi làm xong.)_

# LỖI SAI CẦN NHỚ

_(Cập nhật khi chấm bài.)_
