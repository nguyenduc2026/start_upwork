# Đọc 12 — Spec tính năng: lọc task

> **Tuần 6** · Giai đoạn 2 · 15 phút/ngày · 2 ngày, tổng khoảng 30 phút
> **Lịch học:** Ngày 1: mục 1–4 · Ngày 2: mục 5–7; có thể chia thêm buổi ôn nếu cần viết lâu hơn.
> **Loại văn bản:** User story và tiêu chí nghiệm thu mô phỏng · **Độ dài đoạn đọc:** 169 từ, 963 ký tự.
> **Ngữ pháp liên quan:** [Ngữ pháp 07](../grammar/07-first-conditional.md) · [Ngữ pháp 05](../grammar/05-future-forms.md) · [Ngữ pháp 06](../grammar/06-modal-verbs.md).

**Sau bài này bạn có thể:** tìm ý chính và dữ kiện trong user story và tiêu chí nghiệm thu mô phỏng, phân biệt thông tin được nêu với điều chưa được xác nhận, và viết tóm tắt ngắn bằng tiếng Anh.

<!-- lesson-video
id: reading-12
type: reading
title: "Reading 12: Feature User Story"
audio: english/audio/reading/reading-12.mp3
video: english/video/out/reading/reading-12.mp4
voice: auto
speed: 0.9
-->

**Nguồn và bối cảnh:** Văn bản tự soạn/mô phỏng cho việc học; tên người, project và kết quả trong tình huống không phải thông tin đã xác minh về người thật.

## 1. Trước khi đọc

| Từ khóa | Nghĩa |
|---|---|
| owner | người chịu trách nhiệm chính |
| status | trạng thái |
| default | mặc định |
| acceptance criteria | tiêu chí để chấp nhận kết quả |
| select | chọn |
| restore | khôi phục |

**Câu hỏi định hướng:**
1. Nhìn tiêu đề và loại văn bản: người viết muốn cung cấp thông tin, đề nghị hành động hay ghi nhận kết quả gì?
2. Bạn cần tìm những chi tiết nào để hiểu yêu cầu hoặc quyết định tiếp theo? Dự đoán trước khi đọc, rồi đối chiếu lại.

## 2. Bài đọc

<!-- passage:start -->
User story: As a project manager, I want to filter tasks by owner and status so I can find urgent work faster.

The taskboard already shows all tasks for one project. This change will add two filters above the list. A user can choose one owner, one status, or both. The default view will still show all tasks in that project.

Acceptance criteria: If a user selects an owner, the list will show only that owner's tasks. If a user also selects a status, both rules will apply. Clearing the filters will restore the default view. A user must not see tasks from another project through this feature.

Please test an empty result and a project with many tasks. The empty state should explain that no tasks match the selected filters. It should not suggest that the project itself has no tasks.

This scope includes the API, interface changes, and tests. Saving personal filter presets is out of scope. Could you confirm any unclear behavior before giving an estimate?
<!-- passage:end -->

## 3. Luyện nghe

> 🎧 Audio: [`english/audio/reading/reading-12.mp3`](../audio/reading/reading-12.mp3) · 🎬 Video: `english/video/out/reading/reading-12.mp4` _(dự kiến; tạo bằng skill `english-generate-video`, chưa được tạo trong bước soạn bài)._ Khi chưa có audio, đọc thành tiếng để luyện trước.

| Lượt | Cách làm | Mục tiêu |
|---|---|---|
| 1 | Khi đã có audio, nghe không nhìn chữ; ghi 2–3 từ nghe được | Nắm chủ đề và ý chính |
| 2 | Nghe cùng bài đọc; đánh dấu chỗ nghe nhầm | Nối âm thanh và cách viết |
| 3 | Chọn 2–3 câu ở đoạn đầu, nghe rồi nói bám theo; lặp 3 lần | Luyện nhịp và âm cuối, không cần bắt chước quá nhanh |

## 4. Đọc hiểu

### A. Đúng (T) hay Sai (F)?

Dựa vào bài đọc, đánh T/F. Với câu sai, chỉ ra thông tin đúng thay thế.

1. The story aims to find urgent work faster.
2. The default view hides all tasks.
3. Both filter rules apply when both are selected.
4. The feature should reveal other projects tasks.
5. Personal filter presets are included.

<details>
<summary>Đáp án 4A</summary>

1. **T** — đối chiếu: *I want to filter tasks by owner and status so I can find urgent work faster.*
2. **F** — đối chiếu: *The default view will still show all tasks in that project.*
3. **T** — đối chiếu: *If a user also selects a status, both rules will apply.*
4. **F** — đối chiếu: *A user must not see tasks from another project through this feature.*
5. **F** — đối chiếu: *Saving personal filter presets is out of scope.*

</details>

### B. Chọn đáp án đúng

1. Where will the filters appear?
   a) Above the task list. · b) Inside an invoice. · c) Only in the README. · d) On a payment receipt.
2. What happens when filters are cleared?
   a) The project is deleted. · b) The default view returns. · c) All users lose access. · d) The task owner changes.
3. What does an empty result mean here?
   a) The project has no tasks at all. · b) The database is unavailable. · c) No tasks match the selected filters. · d) The feature is approved.
4. What is included in scope?
   a) Only a logo. · b) Only saved presets. · c) Only a new contract. · d) API, interface changes, and tests.

<details>
<summary>Đáp án 4B</summary>

1. a) Above the task list.
2. b) The default view returns.
3. c) No tasks match the selected filters.
4. d) API, interface changes, and tests.

</details>

### C. Trả lời ngắn bằng tiếng Anh

1. Which two filters are requested?
2. Name two cases that need testing.
3. What should be confirmed before estimating?

<details>
<summary>Đáp án gợi ý 4C</summary>

1. Owner and status filters.
2. An empty result and a project with many tasks.
3. Any unclear behavior should be confirmed.

Chấp nhận cách diễn đạt khác đúng nghĩa và ngữ pháp; không thêm dữ kiện ngoài bài.

</details>

## 5. Từ vựng trong bài

IPA tham khảo theo Anh–Anh; audio mẫu dùng giọng Mỹ nên một số nguyên âm và âm r có thể khác. n = danh từ, v = động từ, adj = tính từ. Dấu ˈ đứng trước âm tiết nhấn chính. Mỗi ví dụ dưới đây là câu trích từ đoạn đọc, có thể chứa dạng chia của từ.

| Từ | Phiên âm | Loại | Nghĩa | Câu trong bài |
|---|---|---|---|---|
| owner | /ˈəʊnə/ | n | người chịu trách nhiệm chính | User story: As a project manager, I want to filter tasks by owner and status so I can find urgent work faster. |
| status | /ˈsteɪtəs/ | n | trạng thái | User story: As a project manager, I want to filter tasks by owner and status so I can find urgent work faster. |
| default | /dɪˈfɔːlt/ | n/adj | mặc định | The default view will still show all tasks in that project. |
| acceptance criteria | /əkˈseptəns kraɪˈtɪəriə/ | n, số nhiều | tiêu chí để chấp nhận kết quả | Acceptance criteria: If a user selects an owner, the list will show only that owner's tasks. |
| select | /sɪˈlekt/ | v | chọn | Acceptance criteria: If a user selects an owner, the list will show only that owner's tasks. |
| restore | /rɪˈstɔː/ | v | khôi phục | Clearing the filters will restore the default view. |
| result | /rɪˈzʌlt/ | n | kết quả | Please test an empty result and a project with many tasks. |
| interface | /ˈɪntəfeɪs/ | n | giao diện | This scope includes the API, interface changes, and tests. |
| out of scope | /ˌaʊt əv ˈskəʊp/ | cụm tính từ | ngoài phạm vi đã thống nhất | Saving personal filter presets is out of scope. |
| estimate | /ˈestɪmət/ | n | ước lượng | Could you confirm any unclear behavior before giving an estimate? |

**Anki:** lưu khối dưới ở dạng UTF-8, nhập với dấu phân cách **Semicolon** (dấu chấm phẩy), hai trường mặt trước / mặt sau. Mỗi dòng gồm nghĩa và câu trong bài.

```text
owner;người chịu trách nhiệm chính (User story: As a project manager, I want to filter tasks by owner and status so I can find urgent work faster.)
status;trạng thái (User story: As a project manager, I want to filter tasks by owner and status so I can find urgent work faster.)
default;mặc định (The default view will still show all tasks in that project.)
acceptance criteria;tiêu chí để chấp nhận kết quả (Acceptance criteria: If a user selects an owner, the list will show only that owner's tasks.)
select;chọn (Acceptance criteria: If a user selects an owner, the list will show only that owner's tasks.)
restore;khôi phục (Clearing the filters will restore the default view.)
result;kết quả (Please test an empty result and a project with many tasks.)
interface;giao diện (This scope includes the API, interface changes, and tests.)
out of scope;ngoài phạm vi đã thống nhất (Saving personal filter presets is out of scope.)
estimate;ước lượng (Could you confirm any unclear behavior before giving an estimate?)
```

## 6. Ngữ pháp trong bài

### A. Tìm và phân loại

Dùng các bài grammar được liên kết ở đầu bài nếu cần nhắc lại công thức. Giải thích ngắn bằng tiếng Việt vì sao cấu trúc phù hợp với ý trong câu.

1. Tìm và chép câu dùng **điều kiện loại 1**. Nội dung/chức năng cần tìm: mô tả kết quả của thao tác sắp được xây dựng. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
2. Tìm và chép câu dùng **will + V**. Nội dung/chức năng cần tìm: nêu hành vi dự kiến. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
3. Tìm và chép câu dùng **should + V**. Nội dung/chức năng cần tìm: nêu hành vi mong đợi. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
4. Tìm và chép câu dùng **hiện tại đơn**. Nội dung/chức năng cần tìm: ôn cách mô tả chức năng đã có. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.

<details>
<summary>Đáp án gợi ý 6A</summary>

1. *If a user selects an owner, the list will show only that owner's tasks.* → **điều kiện loại 1**: mô tả kết quả của thao tác sắp được xây dựng.
2. *Clearing the filters will restore the default view.* → **will + V**: nêu hành vi dự kiến.
3. *The empty state should explain that no tasks match the selected filters.* → **should + V**: nêu hành vi mong đợi.
4. *The taskboard already shows all tasks for one project.* → **hiện tại đơn**: ôn cách mô tả chức năng đã có.

</details>

**Đọc thêm:** *must not + V* = không được làm; mạnh hơn *should not* (không nên). Bài này dùng để hiểu một yêu cầu bắt buộc.

### B. Ôn bài trước

Ôn [Feedback & review của client](11-client-feedback.md). Điền hai từ/cụm, mỗi từ dùng một lần, chia dạng theo câu: **filter, contract**.

1. The new ___ work well, and the setup guide helped our tester run the app locally.
2. We would be happy to discuss another small task, but we have not confirmed a new ___ yet.

<details>
<summary>Đáp án ôn bài trước</summary>

1. filters — bộ lọc; lọc theo điều kiện. Câu gốc: *The new filters work well, and the setup guide helped our tester run the app locally.*
2. contract — hợp đồng. Câu gốc: *We would be happy to discuss another small task, but we have not confirmed a new contract yet.*

</details>

## 7. Tóm tắt và phản hồi

**A.** Viết 3–5 câu tiếng Anh tóm tắt thông tin chính. Giữ đúng mức chắc chắn của bài; không biến dự kiến thành kết quả đã xác nhận.

**B.** Viết 1–2 câu tiếng Anh nêu phản hồi hoặc điều bạn muốn hỏi tiếp, có liên quan đến tình huống.

<details>
<summary>Gợi ý mục 7 — xem sau khi tự viết</summary>

**A. Tóm tắt mẫu:** The story requests owner and status filters for one project. Both filters must work together, and clearing them restores the default list. The feature needs empty-result and large-project tests. Saved presets are outside scope.

**B. Phản hồi mẫu:** I would clarify the filter behavior before estimating. I would include a test that checks project boundaries.

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

_(Chạy `/english-lesson check english/reading/12-feature-user-story.md` sau khi làm xong.)_

# LỖI SAI CẦN NHỚ

_(Cập nhật khi chấm bài.)_
