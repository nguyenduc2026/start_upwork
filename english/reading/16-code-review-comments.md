# Đọc 16 — Code review comments

> **Tuần 8** · Giai đoạn 2 · 15 phút/ngày · 2 ngày, tổng khoảng 30 phút
> **Lịch học:** Ngày 1: mục 1–4 · Ngày 2: mục 5–7; có thể chia thêm buổi ôn nếu cần viết lâu hơn.
> **Loại văn bản:** Nhận xét pull request mô phỏng · **Độ dài đoạn đọc:** 168 từ, 974 ký tự.
> **Ngữ pháp liên quan:** [Ngữ pháp 06](../grammar/06-modal-verbs.md) · [Ngữ pháp 10](../grammar/10-comparatives-superlatives.md) · [Ngữ pháp 04](../grammar/04-present-perfect.md) · [Ngữ pháp 07](../grammar/07-first-conditional.md).

**Sau bài này bạn có thể:** tìm ý chính và dữ kiện trong nhận xét pull request mô phỏng, phân biệt thông tin được nêu với điều chưa được xác nhận, và viết tóm tắt ngắn bằng tiếng Anh.

<!-- lesson-video
id: reading-16
type: reading
title: "Reading 16: Code Review Comments"
audio: english/audio/reading/reading-16.mp3
video: english/video/out/reading/reading-16.mp4
voice: auto
speed: 0.9
-->

**Nguồn và bối cảnh:** Văn bản tự soạn/mô phỏng cho việc học; tên người, project và kết quả trong tình huống không phải thông tin đã xác minh về người thật.

## 1. Trước khi đọc

| Từ khóa | Nghĩa |
|---|---|
| review | xem xét, đánh giá |
| owner | người chịu trách nhiệm chính |
| query | truy vấn |
| shared | dùng chung |
| logic | luồng hoặc quy tắc xử lý |
| format | định dạng, cấu trúc dữ liệu |

**Câu hỏi định hướng:**
1. Nhìn tiêu đề và loại văn bản: người viết muốn cung cấp thông tin, đề nghị hành động hay ghi nhận kết quả gì?
2. Bạn cần tìm những chi tiết nào để hiểu yêu cầu hoặc quyết định tiếp theo? Dự đoán trước khi đọc, rồi đối chiếu lại.

## 2. Bài đọc

<!-- passage:start -->
Review of the task filter pull request.

Comment one: The API accepts an owner ID, but it does not check that the owner belongs to the selected project. Please add that check. A user should not see tasks outside the current project, even when the request contains another valid owner ID.

Comment two: The same query is built in two places. Could you move the shared logic into one small function? This should make the next change easier to review. Please keep the public response format unchanged.

Comment three: The tests cover an owner filter and a status filter separately. Add a case that uses both filters together. Also include an empty result. These cases are part of the acceptance criteria, not optional extras.

Comment four: Thanks for the clear setup notes. The patch is close to ready, but I have not approved it yet. Please address the comments and request another review. If the new tests pass, I will check the updated version before we discuss deployment.
<!-- passage:end -->

## 3. Luyện nghe

> 🎧 Audio: [`english/audio/reading/reading-16.mp3`](../audio/reading/reading-16.mp3) · 🎬 Video: `english/video/out/reading/reading-16.mp4` _(dự kiến; tạo bằng skill `english-generate-video`, chưa được tạo trong bước soạn bài)._ Khi chưa có audio, đọc thành tiếng để luyện trước.

| Lượt | Cách làm | Mục tiêu |
|---|---|---|
| 1 | Khi đã có audio, nghe không nhìn chữ; ghi 2–3 từ nghe được | Nắm chủ đề và ý chính |
| 2 | Nghe cùng bài đọc; đánh dấu chỗ nghe nhầm | Nối âm thanh và cách viết |
| 3 | Chọn 2–3 câu ở đoạn đầu, nghe rồi nói bám theo; lặp 3 lần | Luyện nhịp và âm cuối, không cần bắt chước quá nhanh |

## 4. Đọc hiểu

### A. Đúng (T) hay Sai (F)?

Dựa vào bài đọc, đánh T/F. Với câu sai, chỉ ra thông tin đúng thay thế.

1. Any valid owner ID should expose tasks from other projects.
2. The same query is built in two places.
3. The public response format should change.
4. Combined-filter and empty-result tests are required.
5. The reviewer has approved the patch.

<details>
<summary>Đáp án 4A</summary>

1. **F** — đối chiếu: *A user should not see tasks outside the current project, even when the request contains another valid owner ID.*
2. **T** — đối chiếu: *The same query is built in two places.*
3. **F** — đối chiếu: *Please keep the public response format unchanged.*
4. **T** — đối chiếu: *These cases are part of the acceptance criteria, not optional extras.*
5. **F** — đối chiếu: *The patch is close to ready, but I have not approved it yet.*

</details>

### B. Chọn đáp án đúng

1. What check is requested for owner ID?
   a) That the owner belongs to the selected project. · b) That the owner has a profile photo. · c) That the ID is in the README. · d) That every owner can see every project.
2. Why move shared query logic?
   a) To remove all tests. · b) To make later changes easier to review. · c) To expose private settings. · d) To change the public format.
3. Which test is missing?
   a) Only the browser language. · b) A new invoice. · c) Both filters together. · d) A new logo.
4. What should the developer request after changes?
   a) Immediate payment without review. · b) A public account password. · c) A new badge. · d) Another review.

<details>
<summary>Đáp án 4B</summary>

1. a) That the owner belongs to the selected project.
2. b) To make later changes easier to review.
3. c) Both filters together.
4. d) Another review.

</details>

### C. Trả lời ngắn bằng tiếng Anh

1. How many places build the same query?
2. What positive point does the reviewer mention?
3. What must happen before deployment is discussed?

<details>
<summary>Đáp án gợi ý 4C</summary>

1. Two places.
2. The clear setup notes.
3. The new tests must pass and the reviewer must check the updated version.

Chấp nhận cách diễn đạt khác đúng nghĩa và ngữ pháp; không thêm dữ kiện ngoài bài.

</details>

## 5. Từ vựng trong bài

IPA tham khảo theo Anh–Anh; audio mẫu dùng giọng Mỹ nên một số nguyên âm và âm r có thể khác. n = danh từ, v = động từ, adj = tính từ. Dấu ˈ đứng trước âm tiết nhấn chính. Mỗi ví dụ dưới đây là câu trích từ đoạn đọc, có thể chứa dạng chia của từ.

| Từ | Phiên âm | Loại | Nghĩa | Câu trong bài |
|---|---|---|---|---|
| review | /rɪˈvjuː/ | n/v | xem xét, đánh giá | Review of the task filter pull request. |
| owner | /ˈəʊnə/ | n | người chịu trách nhiệm chính | Comment one: The API accepts an owner ID, but it does not check that the owner belongs to the selected project. |
| query | /ˈkwɪəri/ | n | truy vấn | Comment two: The same query is built in two places. |
| shared | /ʃeəd/ | adj | dùng chung | Could you move the shared logic into one small function? |
| logic | /ˈlɒdʒɪk/ | n | luồng hoặc quy tắc xử lý | Could you move the shared logic into one small function? |
| format | /ˈfɔːmæt/ | n | định dạng, cấu trúc dữ liệu | Please keep the public response format unchanged. |
| empty | /ˈempti/ | adj | trống, không có kết quả | Also include an empty result. |
| acceptance criteria | /əkˈseptəns kraɪˈtɪəriə/ | n, số nhiều | tiêu chí để chấp nhận kết quả | These cases are part of the acceptance criteria, not optional extras. |
| patch | /pætʃ/ | n | bản thay đổi để sửa hoặc cập nhật phần mềm | The patch is close to ready, but I have not approved it yet. |
| deployment | /dɪˈplɔɪmənt/ | n | việc triển khai | If the new tests pass, I will check the updated version before we discuss deployment. |

**Anki:** lưu khối dưới ở dạng UTF-8, nhập với dấu phân cách **Semicolon** (dấu chấm phẩy), hai trường mặt trước / mặt sau. Mỗi dòng gồm nghĩa và câu trong bài.

```text
review;xem xét, đánh giá (Review of the task filter pull request.)
owner;người chịu trách nhiệm chính (Comment one: The API accepts an owner ID, but it does not check that the owner belongs to the selected project.)
query;truy vấn (Comment two: The same query is built in two places.)
shared;dùng chung (Could you move the shared logic into one small function?)
logic;luồng hoặc quy tắc xử lý (Could you move the shared logic into one small function?)
format;định dạng, cấu trúc dữ liệu (Please keep the public response format unchanged.)
empty;trống, không có kết quả (Also include an empty result.)
acceptance criteria;tiêu chí để chấp nhận kết quả (These cases are part of the acceptance criteria, not optional extras.)
patch;bản thay đổi để sửa hoặc cập nhật phần mềm (The patch is close to ready, but I have not approved it yet.)
deployment;việc triển khai (If the new tests pass, I will check the updated version before we discuss deployment.)
```

## 6. Ngữ pháp trong bài

### A. Tìm và phân loại

Dùng các bài grammar được liên kết ở đầu bài nếu cần nhắc lại công thức. Giải thích ngắn bằng tiếng Việt vì sao cấu trúc phù hợp với ý trong câu.

1. Tìm và chép câu dùng **could dùng để nhờ**. Nội dung/chức năng cần tìm: yêu cầu refactor lịch sự. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
2. Tìm và chép câu dùng **so sánh hơn easier**. Nội dung/chức năng cần tìm: nêu lợi ích dự kiến của refactor. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
3. Tìm và chép câu dùng **hiện tại hoàn thành phủ định với yet**. Nội dung/chức năng cần tìm: nêu trạng thái chưa duyệt. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
4. Tìm và chép câu dùng **điều kiện loại 1**. Nội dung/chức năng cần tìm: ôn bước review có điều kiện. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.

<details>
<summary>Đáp án gợi ý 6A</summary>

1. *Could you move the shared logic into one small function?* → **could dùng để nhờ**: yêu cầu refactor lịch sự.
2. *This should make the next change easier to review.* → **so sánh hơn easier**: nêu lợi ích dự kiến của refactor.
3. *I have not approved it yet.* → **hiện tại hoàn thành phủ định với yet**: nêu trạng thái chưa duyệt.
4. *If the new tests pass, I will check the updated version before we discuss deployment.* → **điều kiện loại 1**: ôn bước review có điều kiện.

</details>

### B. Ôn bài trước

Ôn [Email client phàn nàn trễ hạn](15-late-delivery-email.md). Điền hai từ/cụm, mỗi từ dùng một lần, chia dạng theo câu: **refund, deadline**.

1. We also found that the ___ case was missing.
2. Let us agree on the new scope and ___ before adding any features.

<details>
<summary>Đáp án ôn bài trước</summary>

1. refund — khoản hoàn tiền. Câu gốc: *We also found that the refund case was missing.*
2. deadline — hạn chót. Câu gốc: *Let us agree on the new scope and deadline before adding any features.*

</details>

## 7. Tóm tắt và phản hồi

**A.** Viết 3–5 câu tiếng Anh tóm tắt thông tin chính. Giữ đúng mức chắc chắn của bài; không biến dự kiến thành kết quả đã xác nhận.

**B.** Viết 1–2 câu tiếng Anh nêu phản hồi hoặc điều bạn muốn hỏi tiếp, có liên quan đến tình huống.

<details>
<summary>Gợi ý mục 7 — xem sau khi tự viết</summary>

**A. Tóm tắt mẫu:** The review requests a project-ownership check and shared query logic. It also asks for combined-filter and empty-result tests. The setup notes are clear, but approval is still pending. Another review is needed after changes.

**B. Phản hồi mẫu:** I would address each comment and explain the tests added. I would not treat “close to ready” as approval.

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

_(Chạy `/english-lesson check english/reading/16-code-review-comments.md` sau khi làm xong.)_

# LỖI SAI CẦN NHỚ

_(Cập nhật khi chấm bài.)_
