# Đọc 18 — AWS Auto Scaling cơ bản

> **Tuần 9** · Giai đoạn 3 · 15 phút/ngày · 2 ngày, tổng khoảng 30 phút
> **Lịch học:** Ngày 1: mục 1–4 · Ngày 2: mục 5–7; có thể chia thêm buổi ôn nếu cần viết lâu hơn.
> **Loại văn bản:** Bài giải thích kỹ thuật · **Độ dài đoạn đọc:** 170 từ, 1015 ký tự.
> **Ngữ pháp liên quan:** [Ngữ pháp 06](../grammar/06-modal-verbs.md) · [Ngữ pháp 01](../grammar/01-present-tenses.md).

**Sau bài này bạn có thể:** tìm ý chính và dữ kiện trong bài giải thích kỹ thuật, phân biệt thông tin được nêu với điều chưa được xác nhận, và viết tóm tắt ngắn bằng tiếng Anh.

<!-- lesson-video
id: reading-18
type: reading
title: "Reading 18: Aws Auto Scaling"
audio: english/audio/reading-18.mp3
video: english/video/out/reading-18.mp4
voice: auto
speed: 0.9
-->

**Nguồn và bối cảnh:** Diễn giải dựa trên [AWS — EC2 Auto Scaling overview](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html) và [AWS — Scaling capacity](https://docs.aws.amazon.com/autoscaling/ec2/userguide/scale-your-group.html), ngày 11/11/2026. Nhóm 2/3/6 và project là ví dụ tự soạn, không phải cấu hình được khuyến nghị cho mọi hệ thống.

## 1. Trước khi đọc

| Từ khóa | Nghĩa |
|---|---|
| traffic | lượng truy cập |
| instance | một máy hoặc phiên bản chạy của hệ thống |
| capacity | năng lực xử lý |
| policy | quy tắc, chính sách |
| demand | nhu cầu, mức tải yêu cầu |
| limit | giới hạn |

**Câu hỏi định hướng:**
1. Nhìn tiêu đề và loại văn bản: người viết muốn cung cấp thông tin, đề nghị hành động hay ghi nhận kết quả gì?
2. Bạn cần tìm những chi tiết nào để hiểu yêu cầu hoặc quyết định tiếp theo? Dự đoán trước khi đọc, rồi đối chiếu lại.

## 2. Bài đọc

<!-- passage:start -->
A ticket sale can bring more traffic than a normal day. Amazon EC2 Auto Scaling helps adjust the number of application instances in a group. You set limits and a desired capacity. Scaling policies can add or remove instances as demand changes.

Consider a practice group with a minimum of two instances, a desired capacity of three, and a maximum of six. These are teaching numbers, not settings for every app. If demand rises, a policy may add capacity within the group's limits. Adding an instance also takes time, so a sudden load spike still needs planning.

More application instances do not fix every bottleneck. A slow database query may remain slow. In our practice project, we would test checkout, inspect database load, and compare costs before changing production settings.

We should also monitor errors, not only traffic. The goal is reliable service within an agreed budget. Auto Scaling is one part of that plan. It does not replace application tests or a clear recovery process when a release fails.
<!-- passage:end -->

## 3. Luyện nghe

> 🎧 Audio: [`english/audio/reading-18.mp3`](../audio/reading-18.mp3) · 🎬 Video: `english/video/out/reading-18.mp4` _(dự kiến; tạo bằng skill `lesson-video`, chưa được tạo trong bước soạn bài)._ Khi chưa có audio, đọc thành tiếng để luyện trước.

| Lượt | Cách làm | Mục tiêu |
|---|---|---|
| 1 | Khi đã có audio, nghe không nhìn chữ; ghi 2–3 từ nghe được | Nắm chủ đề và ý chính |
| 2 | Nghe cùng bài đọc; đánh dấu chỗ nghe nhầm | Nối âm thanh và cách viết |
| 3 | Chọn 2–3 câu ở đoạn đầu, nghe rồi nói bám theo; lặp 3 lần | Luyện nhịp và âm cuối, không cần bắt chước quá nhanh |

## 4. Đọc hiểu

### A. Đúng (T) hay Sai (F)?

Dựa vào bài đọc, đánh T/F. Với câu sai, chỉ ra thông tin đúng thay thế.

1. Auto Scaling adjusts application instances in a group.
2. The teaching maximum is six instances.
3. The numbers are recommended for every app.
4. Adding instances fixes every bottleneck.
5. Auto Scaling replaces application tests.

<details>
<summary>Đáp án 4A</summary>

1. **T** — đối chiếu: *Amazon EC2 Auto Scaling helps adjust the number of application instances in a group.*
2. **T** — đối chiếu: *Consider a practice group with a minimum of two instances, a desired capacity of three, and a maximum of six.*
3. **F** — đối chiếu: *These are teaching numbers, not settings for every app.*
4. **F** — đối chiếu: *More application instances do not fix every bottleneck.*
5. **F** — đối chiếu: *It does not replace application tests or a clear recovery process when a release fails.*

</details>

### B. Chọn đáp án đúng

1. What is the desired capacity in the example?
   a) Two hundred instances. · b) Sixteen instances. · c) Three instances. · d) No desired capacity is given.
2. What may remain slow despite more app instances?
   a) The printed agenda. · b) A local text label only. · c) The client name. · d) A database query.
3. What should be monitored besides traffic?
   a) Errors. · b) Only badge counts. · c) Only profile views. · d) Only calendar events.
4. What should the team compare before changing production?
   a) Only font colors. · b) Costs and test results. · c) Only two currencies. · d) The number of emails sent.

<details>
<summary>Đáp án 4B</summary>

1. c) Three instances.
2. d) A database query.
3. a) Errors.
4. b) Costs and test results.

</details>

### C. Trả lời ngắn bằng tiếng Anh

1. What is the minimum size in the teaching example?
2. Why does a sudden load spike still need planning?
3. What two goals are linked in the article?

<details>
<summary>Đáp án gợi ý 4C</summary>

1. Two instances.
2. Adding an instance takes time.
3. Reliable service and staying within an agreed budget.

Chấp nhận cách diễn đạt khác đúng nghĩa và ngữ pháp; không thêm dữ kiện ngoài bài.

</details>

## 5. Từ vựng trong bài

IPA tham khảo theo Anh–Anh; audio mẫu dùng giọng Mỹ nên một số nguyên âm và âm r có thể khác. n = danh từ, v = động từ, adj = tính từ. Dấu ˈ đứng trước âm tiết nhấn chính. Mỗi ví dụ dưới đây là câu trích từ đoạn đọc, có thể chứa dạng chia của từ.

| Từ | Phiên âm | Loại | Nghĩa | Câu trong bài |
|---|---|---|---|---|
| traffic | /ˈtræfɪk/ | n | lượng truy cập | A ticket sale can bring more traffic than a normal day. |
| instance | /ˈɪnstəns/ | n | một máy hoặc phiên bản chạy của hệ thống | Amazon EC2 Auto Scaling helps adjust the number of application instances in a group. |
| capacity | /kəˈpæsəti/ | n | năng lực xử lý | You set limits and a desired capacity. |
| policy | /ˈpɒləsi/ | n | quy tắc, chính sách | Scaling policies can add or remove instances as demand changes. |
| demand | /dɪˈmɑːnd/ | n | nhu cầu, mức tải yêu cầu | Scaling policies can add or remove instances as demand changes. |
| limit | /ˈlɪmɪt/ | n | giới hạn | You set limits and a desired capacity. |
| bottleneck | /ˈbɒtlnek/ | n | điểm nghẽn | More application instances do not fix every bottleneck. |
| database | /ˈdeɪtəbeɪs/ | n | cơ sở dữ liệu | A slow database query may remain slow. |
| budget | /ˈbʌdʒɪt/ | n | ngân sách | The goal is reliable service within an agreed budget. |
| recovery | /rɪˈkʌvəri/ | n | sự hoặc quá trình phục hồi | It does not replace application tests or a clear recovery process when a release fails. |

**Anki:** lưu khối dưới ở dạng UTF-8, nhập với dấu phân cách **Semicolon** (dấu chấm phẩy), hai trường mặt trước / mặt sau. Mỗi dòng gồm nghĩa và câu trong bài.

```text
traffic;lượng truy cập (A ticket sale can bring more traffic than a normal day.)
instance;một máy hoặc phiên bản chạy của hệ thống (Amazon EC2 Auto Scaling helps adjust the number of application instances in a group.)
capacity;năng lực xử lý (You set limits and a desired capacity.)
policy;quy tắc, chính sách (Scaling policies can add or remove instances as demand changes.)
demand;nhu cầu, mức tải yêu cầu (Scaling policies can add or remove instances as demand changes.)
limit;giới hạn (You set limits and a desired capacity.)
bottleneck;điểm nghẽn (More application instances do not fix every bottleneck.)
database;cơ sở dữ liệu (A slow database query may remain slow.)
budget;ngân sách (The goal is reliable service within an agreed budget.)
recovery;sự hoặc quá trình phục hồi (It does not replace application tests or a clear recovery process when a release fails.)
```

## 6. Ngữ pháp trong bài

### A. Tìm và phân loại

Dùng các bài grammar được liên kết ở đầu bài nếu cần nhắc lại công thức. Giải thích ngắn bằng tiếng Việt vì sao cấu trúc phù hợp với ý trong câu.

1. Tìm và chép câu dùng **can + V**. Nội dung/chức năng cần tìm: nói khả năng điều chỉnh. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
2. Tìm và chép câu dùng **may + V**. Nội dung/chức năng cần tìm: nói khả năng, không khẳng định tuyệt đối. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
3. Tìm và chép câu dùng **should + V**. Nội dung/chức năng cần tìm: nêu điều cần chú ý. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
4. Tìm và chép câu dùng **hiện tại đơn phủ định**. Nội dung/chức năng cần tìm: ôn cách nêu giới hạn tổng quát. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.

<details>
<summary>Đáp án gợi ý 6A</summary>

1. *Scaling policies can add or remove instances as demand changes.* → **can + V**: nói khả năng điều chỉnh.
2. *A slow database query may remain slow.* → **may + V**: nói khả năng, không khẳng định tuyệt đối.
3. *We should also monitor errors, not only traffic.* → **should + V**: nêu điều cần chú ý.
4. *More application instances do not fix every bottleneck.* → **hiện tại đơn phủ định**: ôn cách nêu giới hạn tổng quát.

</details>

**Đọc thêm:** *may + V* = có thể xảy ra. Khi nói khả năng quá khứ hoặc thuật lại thông báo, *could + V* không tự có nghĩa là lời hứa.

### B. Ôn bài trước

Ôn [Biên bản cuộc gọi với client](17-meeting-notes.md). Điền hai từ/cụm, mỗi từ dùng một lần, chia dạng theo câu: **attendee, invitation**.

1. ___: Anna, the product owner; Linh, the developer; and Mai, the designer.
2. Anna will send an ___.

<details>
<summary>Đáp án ôn bài trước</summary>

1. Attendees — người tham dự. Câu gốc: *Attendees: Anna, the product owner; Linh, the developer; and Mai, the designer.*
2. invitation — lời hoặc thư mời. Câu gốc: *Anna will send an invitation.*

</details>

## 7. Tóm tắt và phản hồi

**A.** Viết 3–5 câu tiếng Anh tóm tắt thông tin chính. Giữ đúng mức chắc chắn của bài; không biến dự kiến thành kết quả đã xác nhận.

**B.** Viết 1–2 câu tiếng Anh nêu phản hồi hoặc điều bạn muốn hỏi tiếp, có liên quan đến tình huống.

<details>
<summary>Gợi ý mục 7 — xem sau khi tự viết</summary>

**A. Tóm tắt mẫu:** EC2 Auto Scaling adjusts instances within group limits. The example uses two as minimum, three as desired capacity, and six as maximum. More instances do not solve every bottleneck. Testing, error monitoring, and cost checks are still needed.

**B. Phản hồi mẫu:** I would measure the bottleneck before increasing capacity. I would not copy the teaching numbers into production.

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

_(Chạy `/english-lesson check english/reading/18-aws-auto-scaling.md` sau khi làm xong.)_

# LỖI SAI CẦN NHỚ

_(Cập nhật khi chấm bài.)_
