# Đọc 21 — Release notes của taskboard

> **Tuần 11** · Giai đoạn 3 · 15 phút/ngày · 2 ngày, tổng khoảng 30 phút
> **Lịch học:** Ngày 1: mục 1–4 · Ngày 2: mục 5–7; có thể chia thêm buổi ôn nếu cần viết lâu hơn.
> **Loại văn bản:** Ghi chú phát hành mô phỏng · **Độ dài đoạn đọc:** 170 từ, 1017 ký tự.
> **Ngữ pháp liên quan:** [Ngữ pháp 01](../grammar/01-present-tenses.md) · [Ngữ pháp 05](../grammar/05-future-forms.md) · [Ngữ pháp 07](../grammar/07-first-conditional.md).

**Sau bài này bạn có thể:** tìm ý chính và dữ kiện trong ghi chú phát hành mô phỏng, phân biệt thông tin được nêu với điều chưa được xác nhận, và viết tóm tắt ngắn bằng tiếng Anh.

<!-- lesson-video
id: reading-21
type: reading
title: "Reading 21: Release Notes"
audio: english/audio/reading-21.mp3
video: english/video/out/reading-21.mp4
voice: auto
speed: 0.9
-->

**Nguồn và bối cảnh:** Văn bản tự soạn/mô phỏng cho việc học; tên người, project và kết quả trong tình huống không phải thông tin đã xác minh về người thật.

## 1. Trước khi đọc

| Từ khóa | Nghĩa |
|---|---|
| version | phiên bản |
| release | bản phát hành / phát hành |
| filter | bộ lọc; lọc theo điều kiện |
| default | mặc định |
| refresh | tải lại, làm mới |
| empty | trống, không có kết quả |

**Câu hỏi định hướng:**
1. Nhìn tiêu đề và loại văn bản: người viết muốn cung cấp thông tin, đề nghị hành động hay ghi nhận kết quả gì?
2. Bạn cần tìm những chi tiết nào để hiểu yêu cầu hoặc quyết định tiếp theo? Dự đoán trước khi đọc, rồi đối chiếu lại.

## 2. Bài đọc

<!-- passage:start -->
Taskboard version 1.4.0 is ready for review on staging. This release adds owner and status filters to the task list. Users can apply both filters together or clear them to return to the default view.

Fixed: A completed task no longer returns to the open list after refresh. We also improved the empty state message so it explains when no tasks match the filters. The message does not claim that the whole project has no tasks.

Changed: The API now accepts the two filter values in one request. The public task fields remain unchanged. The setup guide includes a new section about filter tests.

Known limitation: Personal filter presets are not included in this release. Exporting filtered results is also outside the current scope. Please do not describe either feature as available to customers.

Before production deployment, the reviewer should run the release checklist. If a test fails, report the steps and request time in the ticket. The team will decide whether to revise the patch or postpone the release.
<!-- passage:end -->

## 3. Luyện nghe

> 🎧 Audio: [`english/audio/reading-21.mp3`](../audio/reading-21.mp3) · 🎬 Video: `english/video/out/reading-21.mp4` _(dự kiến; tạo bằng skill `lesson-video`, chưa được tạo trong bước soạn bài)._ Khi chưa có audio, đọc thành tiếng để luyện trước.

| Lượt | Cách làm | Mục tiêu |
|---|---|---|
| 1 | Khi đã có audio, nghe không nhìn chữ; ghi 2–3 từ nghe được | Nắm chủ đề và ý chính |
| 2 | Nghe cùng bài đọc; đánh dấu chỗ nghe nhầm | Nối âm thanh và cách viết |
| 3 | Chọn 2–3 câu ở đoạn đầu, nghe rồi nói bám theo; lặp 3 lần | Luyện nhịp và âm cuối, không cần bắt chước quá nhanh |

## 4. Đọc hiểu

### A. Đúng (T) hay Sai (F)?

Dựa vào bài đọc, đánh T/F. Với câu sai, chỉ ra thông tin đúng thay thế.

1. Version 1.4.0 is on staging for review.
2. Filters cannot be used together.
3. Public task fields remain unchanged.
4. Personal filter presets are available.
5. Production deployment is already complete.

<details>
<summary>Đáp án 4A</summary>

1. **T** — đối chiếu: *Taskboard version 1.4.0 is ready for review on staging.*
2. **F** — đối chiếu: *Users can apply both filters together or clear them to return to the default view.*
3. **T** — đối chiếu: *The public task fields remain unchanged.*
4. **F** — đối chiếu: *Personal filter presets are not included in this release.*
5. **F** — đối chiếu: *Before production deployment, the reviewer should run the release checklist.*

</details>

### B. Chọn đáp án đúng

1. Which bug is fixed?
   a) Duplicate invoices. · b) Completed tasks returning after refresh. · c) A missing logo. · d) A calendar timezone bug.
2. What was improved about the empty state?
   a) It hides all project names. · b) It removes every task. · c) It explains that no tasks match the filters. · d) It says production is approved.
3. What is added to the setup guide?
   a) A client bank account. · b) A new badge. · c) A travel itinerary. · d) A section about filter tests.
4. What should be reported when a test fails?
   a) Steps and request time. · b) Only the app name. · c) Only a profile photo. · d) A payment promise.

<details>
<summary>Đáp án 4B</summary>

1. b) Completed tasks returning after refresh.
2. c) It explains that no tasks match the filters.
3. d) A section about filter tests.
4. a) Steps and request time.

</details>

### C. Trả lời ngắn bằng tiếng Anh

1. Name the two new filters.
2. Name one feature not included.
3. What two choices may the team consider after a failed test?

<details>
<summary>Đáp án gợi ý 4C</summary>

1. Owner and status filters.
2. Personal filter presets or exporting filtered results.
3. Revise the patch or postpone the release.

Chấp nhận cách diễn đạt khác đúng nghĩa và ngữ pháp; không thêm dữ kiện ngoài bài.

</details>

## 5. Từ vựng trong bài

IPA tham khảo theo Anh–Anh; audio mẫu dùng giọng Mỹ nên một số nguyên âm và âm r có thể khác. n = danh từ, v = động từ, adj = tính từ. Dấu ˈ đứng trước âm tiết nhấn chính. Mỗi ví dụ dưới đây là câu trích từ đoạn đọc, có thể chứa dạng chia của từ.

| Từ | Phiên âm | Loại | Nghĩa | Câu trong bài |
|---|---|---|---|---|
| version | /ˈvɜːʃən/ | n | phiên bản | Taskboard version 1.4.0 is ready for review on staging. |
| release | /rɪˈliːs/ | n / v | bản phát hành / phát hành | This release adds owner and status filters to the task list. |
| filter | /ˈfɪltə/ | n/v | bộ lọc; lọc theo điều kiện | This release adds owner and status filters to the task list. |
| default | /dɪˈfɔːlt/ | n/adj | mặc định | Users can apply both filters together or clear them to return to the default view. |
| refresh | /rɪˈfreʃ/ | n/v | tải lại, làm mới | Fixed: A completed task no longer returns to the open list after refresh. |
| empty | /ˈempti/ | adj | trống, không có kết quả | We also improved the empty state message so it explains when no tasks match the filters. |
| limitation | /ˌlɪmɪˈteɪʃən/ | n | giới hạn hiện có | Known limitation: Personal filter presets are not included in this release. |
| scope | /skəʊp/ | n | phạm vi công việc | Exporting filtered results is also outside the current scope. |
| reviewer | /rɪˈvjuːə/ | n | người xem xét code hoặc kết quả | Before production deployment, the reviewer should run the release checklist. |
| postpone | /poʊstˈpoʊn/ | v | hoãn, dời lịch | The team will decide whether to revise the patch or postpone the release. |

**Anki:** lưu khối dưới ở dạng UTF-8, nhập với dấu phân cách **Semicolon** (dấu chấm phẩy), hai trường mặt trước / mặt sau. Mỗi dòng gồm nghĩa và câu trong bài.

```text
version;phiên bản (Taskboard version 1.4.0 is ready for review on staging.)
release;bản phát hành / phát hành (This release adds owner and status filters to the task list.)
filter;bộ lọc, lọc theo điều kiện (This release adds owner and status filters to the task list.)
default;mặc định (Users can apply both filters together or clear them to return to the default view.)
refresh;tải lại, làm mới (Fixed: A completed task no longer returns to the open list after refresh.)
empty;trống, không có kết quả (We also improved the empty state message so it explains when no tasks match the filters.)
limitation;giới hạn hiện có (Known limitation: Personal filter presets are not included in this release.)
scope;phạm vi công việc (Exporting filtered results is also outside the current scope.)
reviewer;người xem xét code hoặc kết quả (Before production deployment, the reviewer should run the release checklist.)
postpone;hoãn, dời lịch (The team will decide whether to revise the patch or postpone the release.)
```

## 6. Ngữ pháp trong bài

### A. Tìm và phân loại

Dùng các bài grammar được liên kết ở đầu bài nếu cần nhắc lại công thức. Giải thích ngắn bằng tiếng Việt vì sao cấu trúc phù hợp với ý trong câu.

1. Tìm và chép câu dùng **hiện tại đơn**. Nội dung/chức năng cần tìm: mô tả phần không đổi. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
2. Tìm và chép câu dùng **phủ định với be**. Nội dung/chức năng cần tìm: nêu giới hạn, dạng bị động included dùng để đọc hiểu. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
3. Tìm và chép câu dùng **will + V**. Nội dung/chức năng cần tìm: nêu quyết định tiếp theo. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
4. Tìm và chép câu dùng **if và mệnh lệnh**. Nội dung/chức năng cần tìm: ôn hướng dẫn xử lý khi kiểm thử thất bại. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.

<details>
<summary>Đáp án gợi ý 6A</summary>

1. *The public task fields remain unchanged.* → **hiện tại đơn**: mô tả phần không đổi.
2. *Personal filter presets are not included in this release.* → **phủ định với be**: nêu giới hạn, dạng bị động included dùng để đọc hiểu.
3. *The team will decide whether to revise the patch or postpone the release.* → **will + V**: nêu quyết định tiếp theo.
4. *If a test fails, report the steps and request time in the ticket.* → **if và mệnh lệnh**: ôn hướng dẫn xử lý khi kiểm thử thất bại.

</details>

### B. Ôn bài trước

Ôn [Tin công nghệ: coding agent của GitHub](20-technology-news.md). Điền hai từ/cụm, mỗi từ dùng một lần, chia dạng theo câu: **announcement, availability**.

1. The ___ described a tool that could work on tasks in the background and open pull requests.
2. It does not describe the latest pricing, ___, or feature set.

<details>
<summary>Đáp án ôn bài trước</summary>

1. announcement — thông báo. Câu gốc: *The announcement described a tool that could work on tasks in the background and open pull requests.*
2. availability — thời gian có thể làm việc. Câu gốc: *It does not describe the latest pricing, availability, or feature set.*

</details>

## 7. Tóm tắt và phản hồi

**A.** Viết 3–5 câu tiếng Anh tóm tắt thông tin chính. Giữ đúng mức chắc chắn của bài; không biến dự kiến thành kết quả đã xác nhận.

**B.** Viết 1–2 câu tiếng Anh nêu phản hồi hoặc điều bạn muốn hỏi tiếp, có liên quan đến tình huống.

<details>
<summary>Gợi ý mục 7 — xem sau khi tự viết</summary>

**A. Tóm tắt mẫu:** Version 1.4.0 adds owner and status filters and fixes a refresh bug. It improves empty-result messaging without changing public task fields. Presets and filtered exports are not included. The release still needs review before production deployment.

**B. Phản hồi mẫu:** I would check the known limitations before promising a feature to users. I would run the checklist on staging.

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

_(Chạy `/english-lesson check english/reading/21-release-notes.md` sau khi làm xong.)_

# LỖI SAI CẦN NHỚ

_(Cập nhật khi chấm bài.)_
