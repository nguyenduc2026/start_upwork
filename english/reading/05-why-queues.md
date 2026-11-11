# Đọc 05 — Vì sao cần queue

> **Tuần 3** · Giai đoạn 1 · 20 phút/ngày · 2 ngày, tổng khoảng 40 phút
> **Lịch học:** Ngày 1: mục 1–4 · Ngày 2: mục 5–7; có thể chia thêm buổi ôn nếu cần viết lâu hơn.
> **Loại văn bản:** Bài giải thích kỹ thuật · **Độ dài đoạn đọc:** 169 từ, 915 ký tự.
> **Ngữ pháp liên quan:** [Ngữ pháp 05](../grammar/05-future-forms.md).

**Sau bài này bạn có thể:** tìm ý chính và dữ kiện trong bài giải thích kỹ thuật, phân biệt thông tin được nêu với điều chưa được xác nhận, và viết tóm tắt ngắn bằng tiếng Anh.

<!-- lesson-video
id: reading-05
type: reading
title: "Reading 05: Why Queues"
audio: english/audio/reading/reading-05.mp3
video: english/video/out/reading/reading-05.mp4
voice: auto
speed: 0.9
-->

**Nguồn và bối cảnh:** Tình huống app tự soạn; kiến thức queue đối chiếu [Laravel 12.x — Queues](https://laravel.com/framework/docs/12.x/queues), ngày 11/11/2026. Đây là bài đọc khái niệm, không phải hướng dẫn triển khai đầy đủ.

## 1. Trước khi đọc

| Từ khóa | Nghĩa |
|---|---|
| confirmation | sự hoặc thông báo xác nhận |
| request | yêu cầu; yêu cầu ai cung cấp gì |
| delivery | việc gửi, chuyển hoặc bàn giao |
| queue | hàng đợi công việc |
| worker | tiến trình xử lý công việc nền |
| background | nền, chạy nền |

**Câu hỏi định hướng:**
1. Nhìn tiêu đề và loại văn bản: người viết muốn cung cấp thông tin, đề nghị hành động hay ghi nhận kết quả gì?
2. Bạn cần tìm những chi tiết nào để hiểu yêu cầu hoặc quyết định tiếp theo? Dự đoán trước khi đọc, rồi đối chiếu lại.

## 2. Bài đọc

<!-- passage:start -->
Our booking app sends a confirmation email after a test order. At first, the same web request saved the order and sent the email. When email delivery was slow, the customer waited longer for the page to respond.

We are going to move the email task to a queue. A worker will process that task in the background. The web page can return sooner because it does not wait for the email task to finish. This change will not make every part of checkout faster.

We will also monitor failed jobs. A queue does not mean that a job always succeeds. If the mail service is unavailable, a job can fail. We need clear retry rules and a way to inspect failures.

Next Monday, we are meeting the team to review the test results. We will compare response times before and after the change. The demo will use fake addresses. We are not changing the payment flow in this task; we are only improving how confirmation emails are sent.
<!-- passage:end -->

## 3. Luyện nghe

> 🎧 Audio: [`english/audio/reading/reading-05.mp3`](../audio/reading/reading-05.mp3) · 🎬 Video: `english/video/out/reading/reading-05.mp4` _(dự kiến; tạo bằng skill `lesson-video`, chưa được tạo trong bước soạn bài)._ Khi chưa có audio, đọc thành tiếng để luyện trước.

| Lượt | Cách làm | Mục tiêu |
|---|---|---|
| 1 | Khi đã có audio, nghe không nhìn chữ; ghi 2–3 từ nghe được | Nắm chủ đề và ý chính |
| 2 | Nghe cùng bài đọc; đánh dấu chỗ nghe nhầm | Nối âm thanh và cách viết |
| 3 | Chọn 2–3 câu ở đoạn đầu, nghe rồi nói bám theo; lặp 3 lần | Luyện nhịp và âm cuối, không cần bắt chước quá nhanh |

## 4. Đọc hiểu

### A. Đúng (T) hay Sai (F)?

Dựa vào bài đọc, đánh T/F. Với câu sai, chỉ ra thông tin đúng thay thế.

1. The old request saved the order and sent email.
2. The plan changes the payment flow.
3. Queued jobs always succeed.
4. The team will inspect failed jobs.
5. The demo uses real customer addresses.

<details>
<summary>Đáp án 4A</summary>

1. **T** — đối chiếu: *At first, the same web request saved the order and sent the email.*
2. **F** — đối chiếu: *We are not changing the payment flow in this task; we are only improving how confirmation emails are sent.*
3. **F** — đối chiếu: *A queue does not mean that a job always succeeds.*
4. **T** — đối chiếu: *We will also monitor failed jobs.*
5. **F** — đối chiếu: *The demo will use fake addresses.*

</details>

### B. Chọn đáp án đúng

1. What will process the queued task?
   a) A designer. · b) A worker. · c) The customer. · d) A payment receipt.
2. What can make a job fail in this example?
   a) A shorter page title. · b) A new logo. · c) An unavailable mail service. · d) A different menu color.
3. When is the team meeting?
   a) Last Friday. · b) Every night. · c) No meeting is planned. · d) Next Monday.
4. What will they compare?
   a) Response times before and after the change. · b) Two currencies. · c) Customer names. · d) Invoice numbers.

<details>
<summary>Đáp án 4B</summary>

1. b) A worker.
2. c) An unavailable mail service.
3. d) Next Monday.
4. a) Response times before and after the change.

</details>

### C. Trả lời ngắn bằng tiếng Anh

1. Why did customers wait longer before?
2. What will the team monitor?
3. What remains unchanged in this task?

<details>
<summary>Đáp án gợi ý 4C</summary>

1. The request waited for slow email delivery.
2. They will monitor failed jobs.
3. The payment flow remains unchanged.

Chấp nhận cách diễn đạt khác đúng nghĩa và ngữ pháp; không thêm dữ kiện ngoài bài.

</details>

## 5. Từ vựng trong bài

IPA tham khảo theo Anh–Anh; audio mẫu dùng giọng Mỹ nên một số nguyên âm và âm r có thể khác. n = danh từ, v = động từ, adj = tính từ. Dấu ˈ đứng trước âm tiết nhấn chính. Mỗi ví dụ dưới đây là câu trích từ đoạn đọc, có thể chứa dạng chia của từ.

| Từ | Phiên âm | Loại | Nghĩa | Câu trong bài |
|---|---|---|---|---|
| confirmation | /ˌkɒnfəˈmeɪʃən/ | n | sự hoặc thông báo xác nhận | Our booking app sends a confirmation email after a test order. |
| request | /rɪˈkwest/ | n/v | yêu cầu; yêu cầu ai cung cấp gì | At first, the same web request saved the order and sent the email. |
| delivery | /dɪˈlɪvəri/ | n | việc gửi, chuyển hoặc bàn giao | When email delivery was slow, the customer waited longer for the page to respond. |
| queue | /kjuː/ | n | hàng đợi công việc | We are going to move the email task to a queue. |
| worker | /ˈwɜːkə/ | n | tiến trình xử lý công việc nền | A worker will process that task in the background. |
| background | /ˈbækɡraʊnd/ | n/adj | nền, chạy nền | A worker will process that task in the background. |
| monitor | /ˈmɒnɪtə/ | v | theo dõi | We will also monitor failed jobs. |
| retry | /ˌriːˈtraɪ/ | n/v | lần thử lại, thử lại | We need clear retry rules and a way to inspect failures. |
| failure | /ˈfeɪljə/ | n | sự thất bại, trường hợp xử lý lỗi | We need clear retry rules and a way to inspect failures. |
| compare | /kəmˈpeə/ | v | so sánh | We will compare response times before and after the change. |

**Anki:** lưu khối dưới ở dạng UTF-8, nhập với dấu phân cách **Semicolon** (dấu chấm phẩy), hai trường mặt trước / mặt sau. Mỗi dòng gồm nghĩa và câu trong bài.

```text
confirmation;sự hoặc thông báo xác nhận (Our booking app sends a confirmation email after a test order.)
request;yêu cầu, yêu cầu ai cung cấp gì (At first, the same web request saved the order and sent the email.)
delivery;việc gửi, chuyển hoặc bàn giao (When email delivery was slow, the customer waited longer for the page to respond.)
queue;hàng đợi công việc (We are going to move the email task to a queue.)
worker;tiến trình xử lý công việc nền (A worker will process that task in the background.)
background;nền, chạy nền (A worker will process that task in the background.)
monitor;theo dõi (We will also monitor failed jobs.)
retry;lần thử lại, thử lại (We need clear retry rules and a way to inspect failures.)
failure;sự thất bại, trường hợp xử lý lỗi (We need clear retry rules and a way to inspect failures.)
compare;so sánh (We will compare response times before and after the change.)
```

## 6. Ngữ pháp trong bài

### A. Tìm và phân loại

Dùng các bài grammar được liên kết ở đầu bài nếu cần nhắc lại công thức. Giải thích ngắn bằng tiếng Việt vì sao cấu trúc phù hợp với ý trong câu.

1. Tìm và chép câu dùng **be going to**. Nội dung/chức năng cần tìm: nêu kế hoạch đã định. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
2. Tìm và chép câu dùng **will + V**. Nội dung/chức năng cần tìm: nói hoạt động dự kiến của worker. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
3. Tìm và chép câu dùng **hiện tại tiếp diễn chỉ tương lai**. Nội dung/chức năng cần tìm: nêu cuộc họp đã sắp xếp. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
4. Tìm và chép câu dùng **quá khứ đơn**. Nội dung/chức năng cần tìm: ôn cách kể hoạt động của hệ thống trước đây. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.

<details>
<summary>Đáp án gợi ý 6A</summary>

1. *We are going to move the email task to a queue.* → **be going to**: nêu kế hoạch đã định.
2. *A worker will process that task in the background.* → **will + V**: nói hoạt động dự kiến của worker.
3. *Next Monday, we are meeting the team to review the test results.* → **hiện tại tiếp diễn chỉ tương lai**: nêu cuộc họp đã sắp xếp.
4. *At first, the same web request saved the order and sent the email.* → **quá khứ đơn**: ôn cách kể hoạt động của hệ thống trước đây.

</details>

### B. Ôn bài trước

Ôn [Bug report trên GitHub Issues](04-github-bug-report.md). Điền hai từ/cụm, mỗi từ dùng một lần, chia dạng theo câu: **bug, outage**.

1. I found this ___ yesterday while testing the taskboard on Chrome.
2. This issue blocks our demo, but it has not caused a production ___.

<details>
<summary>Đáp án ôn bài trước</summary>

1. bug — lỗi trong code. Câu gốc: *I found this bug yesterday while testing the taskboard on Chrome.*
2. outage — đợt dịch vụ bị gián đoạn, mất khả dụng. Câu gốc: *This issue blocks our demo, but it has not caused a production outage.*

</details>

## 7. Tóm tắt và phản hồi

**A.** Viết 3–5 câu tiếng Anh tóm tắt thông tin chính. Giữ đúng mức chắc chắn của bài; không biến dự kiến thành kết quả đã xác nhận.

**B.** Viết 1–2 câu tiếng Anh nêu phản hồi hoặc điều bạn muốn hỏi tiếp, có liên quan đến tình huống.

<details>
<summary>Gợi ý mục 7 — xem sau khi tự viết</summary>

**A. Tóm tắt mẫu:** The team plans to move confirmation email tasks to a queue. A worker will handle them in the background. The team will monitor failures and compare response times. The payment flow is outside this task.

**B. Phản hồi mẫu:** I would check the test results before claiming an improvement. I would also ask how failed jobs are reported.

Phần phản hồi là một cách viết tham khảo, không phải thông tin mới của văn bản.

</details>

# BÀI LÀM CỦA BẠN

## Mục 4

**A.** 1. ___ · 2. ___ · 3. ___ · 4. ___ · 5. ___

**B.** 1. ___ · 2. ___ · 3. ___ · 4. ___

**C.** 1. ___ · 2. ___ · 3. ___

## Mục 6

**A. Câu trích, phân loại và giải thích:**
1. ___
2. ___
3. ___
4. ___

**B. Ôn từ:** 1. ___ · 2. ___

## Mục 7

**A. Tóm tắt:**

_(Viết 3–5 câu tại đây.)_

**B. Phản hồi:**

_(Viết 1–2 câu tại đây.)_

# TỰ ĐÁNH GIÁ

- [ ] Tôi hiểu người viết muốn truyền đạt điều gì và tìm đúng dữ kiện chính.
- [ ] Tôi giải thích được các câu T/F bằng bằng chứng trong bài.
- [ ] Tôi dùng được ít nhất 8/10 từ mới trong ngữ cảnh.
- [ ] Tôi tìm và phân loại được các cấu trúc ở mục 6.
- [ ] Tôi viết tóm tắt bằng lời của mình, giữ đúng phạm vi và mức chắc chắn.
- [ ] Khi đã có audio, tôi nghe được ý chính và luyện nói theo một đoạn ngắn.

# NHẬN XÉT

_(Chạy `/english-lesson check english/reading/05-why-queues.md` sau khi làm xong.)_

# LỖI SAI CẦN NHỚ

_(Cập nhật khi chấm bài.)_
