# Đọc 03 — README của dự án mở: taskboard

> **Tuần 2** · Giai đoạn 1 · 20 phút/ngày · 2 ngày, tổng khoảng 40 phút
> **Lịch học:** Ngày 1: mục 1–4 · Ngày 2: mục 5–7; có thể chia thêm buổi ôn nếu cần viết lâu hơn.
> **Loại văn bản:** README mô phỏng · **Độ dài đoạn đọc:** 164 từ, 938 ký tự.
> **Ngữ pháp liên quan:** [Ngữ pháp 03](../grammar/03-past-simple.md) · [Ngữ pháp 04](../grammar/04-present-perfect.md).

**Sau bài này bạn có thể:** tìm ý chính và dữ kiện trong readme mô phỏng, phân biệt thông tin được nêu với điều chưa được xác nhận, và viết tóm tắt ngắn bằng tiếng Anh.

<!-- lesson-video
id: reading-03
type: reading
title: "Reading 03: Open Source Readme"
audio: english/audio/reading-03.mp3
video: english/video/out/reading-03.mp4
voice: auto
speed: 0.9
-->

**Nguồn và bối cảnh:** Văn bản tự soạn/mô phỏng cho việc học; tên người, project và kết quả trong tình huống không phải thông tin đã xác minh về người thật.

## 1. Trước khi đọc

| Từ khóa | Nghĩa |
|---|---|
| interface | giao diện |
| task | một đầu việc |
| owner | người chịu trách nhiệm chính |
| version | phiên bản |
| search | chức năng hoặc việc tìm kiếm |
| filter | bộ lọc; lọc theo điều kiện |

**Câu hỏi định hướng:**
1. Nhìn tiêu đề và loại văn bản: người viết muốn cung cấp thông tin, đề nghị hành động hay ghi nhận kết quả gì?
2. Bạn cần tìm những chi tiết nào để hiểu yêu cầu hoặc quyết định tiếp theo? Dự đoán trước khi đọc, rồi đối chiếu lại.

## 2. Bài đọc

<!-- passage:start -->
Taskboard is a small open-source app for teams. It uses Spring Boot for the API and React for the interface. This learning project stores tasks, owners, and due dates. It does not include payments.

We created the first version during a weekend project. Last month, we added a search field and fixed a login bug. We also wrote tests for the task filter. We have kept the setup guide short so new developers can try the app.

To run it locally, copy the example settings file and use a local test database. The example contains no real passwords. Do not upload your private settings to the repository. Follow the setup checklist before opening the app.

If you find a problem, open a ticket with clear steps and the expected result. Please include the browser name. We review small changes before merging them. You can help with documentation even if you are new to Java. Read the contribution notes before sending your first pull request.
<!-- passage:end -->

## 3. Luyện nghe

> 🎧 Audio: [`english/audio/reading-03.mp3`](../audio/reading-03.mp3) · 🎬 Video: `english/video/out/reading-03.mp4` _(dự kiến; tạo bằng skill `lesson-video`, chưa được tạo trong bước soạn bài)._ Khi chưa có audio, đọc thành tiếng để luyện trước.

| Lượt | Cách làm | Mục tiêu |
|---|---|---|
| 1 | Khi đã có audio, nghe không nhìn chữ; ghi 2–3 từ nghe được | Nắm chủ đề và ý chính |
| 2 | Nghe cùng bài đọc; đánh dấu chỗ nghe nhầm | Nối âm thanh và cách viết |
| 3 | Chọn 2–3 câu ở đoạn đầu, nghe rồi nói bám theo; lặp 3 lần | Luyện nhịp và âm cuối, không cần bắt chước quá nhanh |

## 4. Đọc hiểu

### A. Đúng (T) hay Sai (F)?

Dựa vào bài đọc, đánh T/F. Với câu sai, chỉ ra thông tin đúng thay thế.

1. The app includes a payment system.
2. The first version came from a weekend project.
3. A login bug was fixed last month.
4. The example settings contain real passwords.
5. Only Java experts can help.

<details>
<summary>Đáp án 4A</summary>

1. **F** — đối chiếu: *It does not include payments.*
2. **T** — đối chiếu: *We created the first version during a weekend project.*
3. **T** — đối chiếu: *Last month, we added a search field and fixed a login bug.*
4. **F** — đối chiếu: *The example contains no real passwords.*
5. **F** — đối chiếu: *You can help with documentation even if you are new to Java.*

</details>

### B. Chọn đáp án đúng

1. Which backend does the app use?
   a) Laravel. · b) WordPress. · c) Django. · d) Spring Boot.
2. What should a problem ticket include?
   a) Steps and the expected result. · b) A real password. · c) A payment receipt. · d) Only a screenshot with no explanation.
3. What should you read before a first pull request?
   a) A hosting invoice. · b) The contribution notes. · c) A sales report. · d) A travel guide.
4. What should stay out of the repository?
   a) The public README. · b) Test instructions. · c) Private settings. · d) Contribution notes.

<details>
<summary>Đáp án 4B</summary>

1. d) Spring Boot.
2. a) Steps and the expected result.
3. b) The contribution notes.
4. c) Private settings.

</details>

### C. Trả lời ngắn bằng tiếng Anh

1. What did the team write tests for?
2. What kind of database should you use locally?
3. Which browser detail should you include in a ticket?

<details>
<summary>Đáp án gợi ý 4C</summary>

1. They wrote tests for the task filter.
2. Use a local test database.
3. Include the browser name.

Chấp nhận cách diễn đạt khác đúng nghĩa và ngữ pháp; không thêm dữ kiện ngoài bài.

</details>

## 5. Từ vựng trong bài

IPA tham khảo theo Anh–Anh; audio mẫu dùng giọng Mỹ nên một số nguyên âm và âm r có thể khác. n = danh từ, v = động từ, adj = tính từ. Dấu ˈ đứng trước âm tiết nhấn chính. Mỗi ví dụ dưới đây là câu trích từ đoạn đọc, có thể chứa dạng chia của từ.

| Từ | Phiên âm | Loại | Nghĩa | Câu trong bài |
|---|---|---|---|---|
| interface | /ˈɪntəfeɪs/ | n | giao diện | It uses Spring Boot for the API and React for the interface. |
| task | /tɑːsk/ | n | một đầu việc | This learning project stores tasks, owners, and due dates. |
| owner | /ˈəʊnə/ | n | người chịu trách nhiệm chính | This learning project stores tasks, owners, and due dates. |
| version | /ˈvɜːʃən/ | n | phiên bản | We created the first version during a weekend project. |
| search | /sɜːtʃ/ | n | chức năng hoặc việc tìm kiếm | Last month, we added a search field and fixed a login bug. |
| filter | /ˈfɪltə/ | n/v | bộ lọc; lọc theo điều kiện | We also wrote tests for the task filter. |
| guide | /ɡaɪd/ | n | tài liệu hướng dẫn | We have kept the setup guide short so new developers can try the app. |
| database | /ˈdeɪtəbeɪs/ | n | cơ sở dữ liệu | To run it locally, copy the example settings file and use a local test database. |
| checklist | /ˈtʃeklɪst/ | n | danh sách các mục cần kiểm tra | Follow the setup checklist before opening the app. |
| documentation | /ˌdɒkjəmenˈteɪʃən/ | n | tài liệu hướng dẫn hoặc mô tả hệ thống | You can help with documentation even if you are new to Java. |

**Anki:** lưu khối dưới ở dạng UTF-8, nhập với dấu phân cách **Semicolon** (dấu chấm phẩy), hai trường mặt trước / mặt sau. Mỗi dòng gồm nghĩa và câu trong bài.

```text
interface;giao diện (It uses Spring Boot for the API and React for the interface.)
task;một đầu việc (This learning project stores tasks, owners, and due dates.)
owner;người chịu trách nhiệm chính (This learning project stores tasks, owners, and due dates.)
version;phiên bản (We created the first version during a weekend project.)
search;chức năng hoặc việc tìm kiếm (Last month, we added a search field and fixed a login bug.)
filter;bộ lọc, lọc theo điều kiện (We also wrote tests for the task filter.)
guide;tài liệu hướng dẫn (We have kept the setup guide short so new developers can try the app.)
database;cơ sở dữ liệu (To run it locally, copy the example settings file and use a local test database.)
checklist;danh sách các mục cần kiểm tra (Follow the setup checklist before opening the app.)
documentation;tài liệu hướng dẫn hoặc mô tả hệ thống (You can help with documentation even if you are new to Java.)
```

## 6. Ngữ pháp trong bài

### A. Tìm và phân loại

Dùng các bài grammar được liên kết ở đầu bài nếu cần nhắc lại công thức. Giải thích ngắn bằng tiếng Việt vì sao cấu trúc phù hợp với ý trong câu.

1. Tìm và chép câu dùng **quá khứ đơn**. Nội dung/chức năng cần tìm: kể việc đã tạo phiên bản đầu. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
2. Tìm và chép câu dùng **quá khứ đơn**. Nội dung/chức năng cần tìm: kể hai thay đổi tháng trước. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
3. Tìm và chép câu dùng **hiện tại hoàn thành**. Nội dung/chức năng cần tìm: nói kết quả còn liên quan đến hiện tại. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
4. Tìm và chép câu dùng **hiện tại đơn**. Nội dung/chức năng cần tìm: mô tả quy trình review thường lệ. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.

<details>
<summary>Đáp án gợi ý 6A</summary>

1. *We created the first version during a weekend project.* → **quá khứ đơn**: kể việc đã tạo phiên bản đầu.
2. *Last month, we added a search field and fixed a login bug.* → **quá khứ đơn**: kể hai thay đổi tháng trước.
3. *We have kept the setup guide short so new developers can try the app.* → **hiện tại hoàn thành**: nói kết quả còn liên quan đến hiện tại.
4. *We review small changes before merging them.* → **hiện tại đơn**: mô tả quy trình review thường lệ.

</details>

### B. Ôn bài trước

Ôn [Email client giới thiệu dự án](02-client-introduction.md). Điền hai từ/cụm, mỗi từ dùng một lần, chia dạng theo câu: **project, demo**.

1. Thanks for joining our ___.
2. Please do not use real customer data in the ___.

<details>
<summary>Đáp án ôn bài trước</summary>

1. project — dự án. Câu gốc: *Thanks for joining our project.*
2. demo — bản hoặc buổi trình diễn sản phẩm. Câu gốc: *Please do not use real customer data in the demo.*

</details>

## 7. Tóm tắt và phản hồi

**A.** Viết 3–5 câu tiếng Anh tóm tắt thông tin chính. Giữ đúng mức chắc chắn của bài; không biến dự kiến thành kết quả đã xác nhận.

**B.** Viết 1–2 câu tiếng Anh nêu phản hồi hoặc điều bạn muốn hỏi tiếp, có liên quan đến tình huống.

<details>
<summary>Gợi ý mục 7 — xem sau khi tự viết</summary>

**A. Tóm tắt mẫu:** Taskboard is an open-source learning app with a Spring Boot API and a React interface. The team added search and fixed a login bug last month. Contributors should use test settings and describe problems clearly.

**B. Phản hồi mẫu:** I could improve the setup documentation. I would never put private settings in the repository.

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

_(Chạy `/english-lesson check english/reading/03-open-source-readme.md` sau khi làm xong.)_

# LỖI SAI CẦN NHỚ

_(Cập nhật khi chấm bài.)_
