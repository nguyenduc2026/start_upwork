# Đọc 04 — Bug report trên GitHub Issues

> **Tuần 2** · Giai đoạn 1 · 20 phút/ngày · 2 ngày, tổng khoảng 40 phút
> **Lịch học:** Ngày 1: mục 1–4 · Ngày 2: mục 5–7; có thể chia thêm buổi ôn nếu cần viết lâu hơn.
> **Loại văn bản:** Báo lỗi mô phỏng · **Độ dài đoạn đọc:** 164 từ, 910 ký tự.
> **Ngữ pháp liên quan:** [Ngữ pháp 03](../grammar/03-past-simple.md) · [Ngữ pháp 04](../grammar/04-present-perfect.md) · [Ngữ pháp 02](../grammar/02-questions.md).

**Sau bài này bạn có thể:** tìm ý chính và dữ kiện trong báo lỗi mô phỏng, phân biệt thông tin được nêu với điều chưa được xác nhận, và viết tóm tắt ngắn bằng tiếng Anh.

<!-- lesson-video
id: reading-04
type: reading
title: "Reading 04: Github Bug Report"
audio: english/audio/reading/reading-04.mp3
video: english/video/out/reading/reading-04.mp4
voice: auto
speed: 0.9
-->

**Nguồn và bối cảnh:** Văn bản tự soạn/mô phỏng cho việc học; tên người, project và kết quả trong tình huống không phải thông tin đã xác minh về người thật.

## 1. Trước khi đọc

| Từ khóa | Nghĩa |
|---|---|
| bug | lỗi trong code |
| refresh | tải lại, làm mới |
| status | trạng thái |
| completed | đã hoàn thành |
| account | tài khoản |
| response | câu trả lời, sự phản hồi |

**Câu hỏi định hướng:**
1. Nhìn tiêu đề và loại văn bản: người viết muốn cung cấp thông tin, đề nghị hành động hay ghi nhận kết quả gì?
2. Bạn cần tìm những chi tiết nào để hiểu yêu cầu hoặc quyết định tiếp theo? Dự đoán trước khi đọc, rồi đối chiếu lại.

## 2. Bài đọc

<!-- passage:start -->
Title: A completed task returns after refresh.

I found this bug yesterday while testing the taskboard on Chrome. I opened a task, changed its status to completed, and refreshed the page. The task appeared in the open list again. I expected it to stay in the completed list.

I have repeated the same steps three times on the test account. The result has been the same each time. I have not tested other browsers yet, so I cannot say whether this affects every user.

The API returned a success response when I changed the status. However, the next request returned the old value. I attached the request time and a screenshot to this ticket. I removed the account email from the image before sharing it.

Could you check whether the new status is saved in the database? Please tell me if you need more details. This issue blocks our demo, but it has not caused a production outage. We are using test data only.
<!-- passage:end -->

## 3. Luyện nghe

> 🎧 Audio: [`english/audio/reading/reading-04.mp3`](../audio/reading/reading-04.mp3) · 🎬 Video: `english/video/out/reading/reading-04.mp4` _(dự kiến; tạo bằng skill `lesson-video`, chưa được tạo trong bước soạn bài)._ Khi chưa có audio, đọc thành tiếng để luyện trước.

| Lượt | Cách làm | Mục tiêu |
|---|---|---|
| 1 | Khi đã có audio, nghe không nhìn chữ; ghi 2–3 từ nghe được | Nắm chủ đề và ý chính |
| 2 | Nghe cùng bài đọc; đánh dấu chỗ nghe nhầm | Nối âm thanh và cách viết |
| 3 | Chọn 2–3 câu ở đoạn đầu, nghe rồi nói bám theo; lặp 3 lần | Luyện nhịp và âm cuối, không cần bắt chước quá nhanh |

## 4. Đọc hiểu

### A. Đúng (T) hay Sai (F)?

Dựa vào bài đọc, đánh T/F. Với câu sai, chỉ ra thông tin đúng thay thế.

1. The task stayed completed after refresh.
2. The reporter tested Chrome.
3. The reporter tested every browser.
4. The next request returned the old value.
5. The report describes a production outage.

<details>
<summary>Đáp án 4A</summary>

1. **F** — đối chiếu: *The task appeared in the open list again.*
2. **T** — đối chiếu: *I found this bug yesterday while testing the taskboard on Chrome.*
3. **F** — đối chiếu: *I have not tested other browsers yet, so I cannot say whether this affects every user.*
4. **T** — đối chiếu: *However, the next request returned the old value.*
5. **F** — đối chiếu: *This issue blocks our demo, but it has not caused a production outage.*

</details>

### B. Chọn đáp án đúng

1. What was the expected result?
   a) The task should remain completed. · b) The account should be deleted. · c) The page should show no tasks. · d) The browser should close.
2. How many times were the steps repeated?
   a) Once. · b) Three times. · c) Ten times. · d) No number is given.
3. What was removed from the screenshot?
   a) The task status. · b) The browser name. · c) The account email. · d) The request time.
4. What does the reporter ask the developer to check?
   a) Whether payment was received. · b) Whether the logo is correct. · c) Whether Chrome can be installed. · d) Whether the status is saved in the database.

<details>
<summary>Đáp án 4B</summary>

1. a) The task should remain completed.
2. b) Three times.
3. c) The account email.
4. d) Whether the status is saved in the database.

</details>

### C. Trả lời ngắn bằng tiếng Anh

1. When was the bug found?
2. What did the API return after the status change?
3. What does the issue block?

<details>
<summary>Đáp án gợi ý 4C</summary>

1. It was found yesterday.
2. It returned a success response.
3. It blocks the demo.

Chấp nhận cách diễn đạt khác đúng nghĩa và ngữ pháp; không thêm dữ kiện ngoài bài.

</details>

## 5. Từ vựng trong bài

IPA tham khảo theo Anh–Anh; audio mẫu dùng giọng Mỹ nên một số nguyên âm và âm r có thể khác. n = danh từ, v = động từ, adj = tính từ. Dấu ˈ đứng trước âm tiết nhấn chính. Mỗi ví dụ dưới đây là câu trích từ đoạn đọc, có thể chứa dạng chia của từ.

| Từ | Phiên âm | Loại | Nghĩa | Câu trong bài |
|---|---|---|---|---|
| bug | /bʌɡ/ | n | lỗi trong code | I found this bug yesterday while testing the taskboard on Chrome. |
| refresh | /rɪˈfreʃ/ | n/v | tải lại, làm mới | Title: A completed task returns after refresh. |
| status | /ˈsteɪtəs/ | n | trạng thái | I opened a task, changed its status to completed, and refreshed the page. |
| completed | /kəmˈpliːtɪd/ | adj | đã hoàn thành | Title: A completed task returns after refresh. |
| account | /əˈkaʊnt/ | n | tài khoản | I have repeated the same steps three times on the test account. |
| response | /rɪˈspɒns/ | n | câu trả lời, sự phản hồi | The API returned a success response when I changed the status. |
| request | /rɪˈkwest/ | n/v | yêu cầu; yêu cầu ai cung cấp gì | However, the next request returned the old value. |
| screenshot | /ˈskriːnʃɒt/ | n | ảnh chụp màn hình | I attached the request time and a screenshot to this ticket. |
| database | /ˈdeɪtəbeɪs/ | n | cơ sở dữ liệu | Could you check whether the new status is saved in the database? |
| outage | /ˈaʊtɪdʒ/ | n | đợt dịch vụ bị gián đoạn, mất khả dụng | This issue blocks our demo, but it has not caused a production outage. |

**Anki:** lưu khối dưới ở dạng UTF-8, nhập với dấu phân cách **Semicolon** (dấu chấm phẩy), hai trường mặt trước / mặt sau. Mỗi dòng gồm nghĩa và câu trong bài.

```text
bug;lỗi trong code (I found this bug yesterday while testing the taskboard on Chrome.)
refresh;tải lại, làm mới (Title: A completed task returns after refresh.)
status;trạng thái (I opened a task, changed its status to completed, and refreshed the page.)
completed;đã hoàn thành (Title: A completed task returns after refresh.)
account;tài khoản (I have repeated the same steps three times on the test account.)
response;câu trả lời, sự phản hồi (The API returned a success response when I changed the status.)
request;yêu cầu, yêu cầu ai cung cấp gì (However, the next request returned the old value.)
screenshot;ảnh chụp màn hình (I attached the request time and a screenshot to this ticket.)
database;cơ sở dữ liệu (Could you check whether the new status is saved in the database?)
outage;đợt dịch vụ bị gián đoạn, mất khả dụng (This issue blocks our demo, but it has not caused a production outage.)
```

## 6. Ngữ pháp trong bài

### A. Tìm và phân loại

Dùng các bài grammar được liên kết ở đầu bài nếu cần nhắc lại công thức. Giải thích ngắn bằng tiếng Việt vì sao cấu trúc phù hợp với ý trong câu.

1. Tìm và chép câu dùng **quá khứ đơn**. Nội dung/chức năng cần tìm: kể các bước tái hiện. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
2. Tìm và chép câu dùng **hiện tại hoàn thành**. Nội dung/chức năng cần tìm: tổng kết số lần thử đến nay. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
3. Tìm và chép câu dùng **quá khứ đơn**. Nội dung/chức năng cần tìm: nêu kết quả của request sau. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
4. Tìm và chép câu dùng **câu hỏi lịch sự với whether**. Nội dung/chức năng cần tìm: nhờ kiểm tra một điều chưa xác nhận. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.

<details>
<summary>Đáp án gợi ý 6A</summary>

1. *I opened a task, changed its status to completed, and refreshed the page.* → **quá khứ đơn**: kể các bước tái hiện.
2. *I have repeated the same steps three times on the test account.* → **hiện tại hoàn thành**: tổng kết số lần thử đến nay.
3. *However, the next request returned the old value.* → **quá khứ đơn**: nêu kết quả của request sau.
4. *Could you check whether the new status is saved in the database?* → **câu hỏi lịch sự với whether**: nhờ kiểm tra một điều chưa xác nhận.

</details>

### B. Ôn bài trước

Ôn [README của dự án mở: taskboard](03-open-source-readme.md). Điền hai từ/cụm, mỗi từ dùng một lần, chia dạng theo câu: **interface, documentation**.

1. It uses Spring Boot for the API and React for the ___.
2. You can help with ___ even if you are new to Java.

<details>
<summary>Đáp án ôn bài trước</summary>

1. interface — giao diện. Câu gốc: *It uses Spring Boot for the API and React for the interface.*
2. documentation — tài liệu hướng dẫn hoặc mô tả hệ thống. Câu gốc: *You can help with documentation even if you are new to Java.*

</details>

## 7. Tóm tắt và phản hồi

**A.** Viết 3–5 câu tiếng Anh tóm tắt thông tin chính. Giữ đúng mức chắc chắn của bài; không biến dự kiến thành kết quả đã xác nhận.

**B.** Viết 1–2 câu tiếng Anh nêu phản hồi hoặc điều bạn muốn hỏi tiếp, có liên quan đến tình huống.

<details>
<summary>Gợi ý mục 7 — xem sau khi tự viết</summary>

**A. Tóm tắt mẫu:** The reporter found a task status bug on Chrome. The API reported success, but the task returned to the open list after refresh. The steps were repeated three times with test data. The issue blocks a demo, not production.

**B. Phản hồi mẫu:** I would check the saved status and request logs. I would also test another browser before making a wider claim.

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

_(Chạy `/english-lesson check english/reading/04-github-bug-report.md` sau khi làm xong.)_

# LỖI SAI CẦN NHỚ

_(Cập nhật khi chấm bài.)_
