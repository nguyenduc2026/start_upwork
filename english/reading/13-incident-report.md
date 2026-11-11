# Đọc 13 — Báo cáo sự cố production

> **Tuần 7** · Giai đoạn 2 · 15 phút/ngày · 2 ngày, tổng khoảng 30 phút
> **Lịch học:** Ngày 1: mục 1–4 · Ngày 2: mục 5–7; có thể chia thêm buổi ôn nếu cần viết lâu hơn.
> **Loại văn bản:** Incident report mô phỏng · **Độ dài đoạn đọc:** 162 từ, 1017 ký tự.
> **Ngữ pháp liên quan:** [Ngữ pháp 03](../grammar/03-past-simple.md) · [Ngữ pháp 04](../grammar/04-present-perfect.md) · [Ngữ pháp 09](../grammar/09-time-prepositions.md) · [Ngữ pháp 07](../grammar/07-first-conditional.md).

**Sau bài này bạn có thể:** tìm ý chính và dữ kiện trong incident report mô phỏng, phân biệt thông tin được nêu với điều chưa được xác nhận, và viết tóm tắt ngắn bằng tiếng Anh.

<!-- lesson-video
id: reading-13
type: reading
title: "Reading 13: Incident Report"
audio: english/audio/reading-13.mp3
video: english/video/out/reading-13.mp4
voice: female, American, calm
speed: 0.9
-->

**Nguồn và bối cảnh:** Văn bản tự soạn/mô phỏng cho việc học; tên người, project và kết quả trong tình huống không phải thông tin đã xác minh về người thật.

## 1. Trước khi đọc

| Từ khóa | Nghĩa |
|---|---|
| unavailable | không khả dụng, không truy cập được |
| release | bản phát hành / phát hành |
| monitoring | việc giám sát, theo dõi |
| rollback | việc quay lại phiên bản/trạng thái trước |
| recovery | sự hoặc quá trình phục hồi |
| validation | kiểm tra dữ liệu theo quy tắc |

**Câu hỏi định hướng:**
1. Nhìn tiêu đề và loại văn bản: người viết muốn cung cấp thông tin, đề nghị hành động hay ghi nhận kết quả gì?
2. Bạn cần tìm những chi tiết nào để hiểu yêu cầu hoặc quyết định tiếp theo? Dự đoán trước khi đọc, rồi đối chiếu lại.

## 2. Bài đọc

<!-- passage:start -->
Summary: Checkout was unavailable for some users between 10:05 and 10:17 GMT+7. Seat browsing still worked. We restored checkout by rolling back the latest application release.

At 10:05, monitoring reported a rise in failed requests. At 10:08, support confirmed that users could not complete new bookings. The team stopped the release and reviewed the logs. At 10:12, we started the rollback. Tests confirmed service recovery at 10:17.

We have identified a validation change that rejected some valid requests. We have reproduced that behavior on staging. We have not completed the full root cause review, so the investigation remains open. We are still checking how many booking attempts were affected.

The next patch will include tests for the rejected input. We will also improve the release checklist. If the same alert returns, the team will investigate it immediately. The incident owner will send another update by 2 PM GMT+7. This report does not claim that all possible payment effects have been ruled out.
<!-- passage:end -->

## 3. Luyện nghe

> 🎧 Audio: [`english/audio/reading-13.mp3`](../audio/reading-13.mp3) · 🎬 Video: `english/video/out/reading-13.mp4` _(dự kiến; tạo bằng skill `lesson-video`, chưa được tạo trong bước soạn bài)._ Khi chưa có audio, đọc thành tiếng để luyện trước.

| Lượt | Cách làm | Mục tiêu |
|---|---|---|
| 1 | Khi đã có audio, nghe không nhìn chữ; ghi 2–3 từ nghe được | Nắm chủ đề và ý chính |
| 2 | Nghe cùng bài đọc; đánh dấu chỗ nghe nhầm | Nối âm thanh và cách viết |
| 3 | Chọn 2–3 câu ở đoạn đầu, nghe rồi nói bám theo; lặp 3 lần | Luyện nhịp và âm cuối, không cần bắt chước quá nhanh |

## 4. Đọc hiểu

### A. Đúng (T) hay Sai (F)?

Dựa vào bài đọc, đánh T/F. Với câu sai, chỉ ra thông tin đúng thay thế.

1. Seat browsing also stopped working.
2. Checkout was restored through a rollback.
3. The full root cause review is finished.
4. The rejected-request behavior was reproduced on staging.
5. All possible payment effects have been ruled out.

<details>
<summary>Đáp án 4A</summary>

1. **F** — đối chiếu: *Seat browsing still worked.*
2. **T** — đối chiếu: *We restored checkout by rolling back the latest application release.*
3. **F** — đối chiếu: *We have not completed the full root cause review, so the investigation remains open.*
4. **T** — đối chiếu: *We have reproduced that behavior on staging.*
5. **F** — đối chiếu: *This report does not claim that all possible payment effects have been ruled out.*

</details>

### B. Chọn đáp án đúng

1. How long was the stated checkout disruption?
   a) Five hours. · b) Twelve minutes. · c) Two days. · d) One minute.
2. What happened at 10:12?
   a) The next patch was released. · b) The investigation closed. · c) The rollback started. · d) The client approved a new contract.
3. What change has been identified?
   a) The logo was too large. · b) Every account was deleted. · c) The browser language changed. · d) Validation rejected some valid requests.
4. When is another update due?
   a) By 2 PM GMT+7. · b) At midnight only. · c) Next month. · d) No update is planned.

<details>
<summary>Đáp án 4B</summary>

1. b) Twelve minutes.
2. c) The rollback started.
3. d) Validation rejected some valid requests.
4. a) By 2 PM GMT+7.

</details>

### C. Trả lời ngắn bằng tiếng Anh

1. Which function remained available?
2. What will the next patch include?
3. What impact detail is still being checked?

<details>
<summary>Đáp án gợi ý 4C</summary>

1. Seat browsing remained available.
2. Tests for the rejected input.
3. How many booking attempts were affected.

Chấp nhận cách diễn đạt khác đúng nghĩa và ngữ pháp; không thêm dữ kiện ngoài bài.

</details>

## 5. Từ vựng trong bài

IPA tham khảo theo Anh–Anh; audio mẫu dùng giọng Mỹ nên một số nguyên âm và âm r có thể khác. n = danh từ, v = động từ, adj = tính từ. Dấu ˈ đứng trước âm tiết nhấn chính. Mỗi ví dụ dưới đây là câu trích từ đoạn đọc, có thể chứa dạng chia của từ.

| Từ | Phiên âm | Loại | Nghĩa | Câu trong bài |
|---|---|---|---|---|
| unavailable | /ˌʌnəˈveɪləbl/ | adj | không khả dụng, không truy cập được | Summary: Checkout was unavailable for some users between 10:05 and 10:17 GMT+7. |
| release | /rɪˈliːs/ | n / v | bản phát hành / phát hành | We restored checkout by rolling back the latest application release. |
| monitoring | /ˈmɒnɪtərɪŋ/ | n | việc giám sát, theo dõi | At 10:05, monitoring reported a rise in failed requests. |
| rollback | /ˈrəʊlbæk/ | n | việc quay lại phiên bản/trạng thái trước | At 10:12, we started the rollback. |
| recovery | /rɪˈkʌvəri/ | n | sự hoặc quá trình phục hồi | Tests confirmed service recovery at 10:17. |
| validation | /ˌvælɪˈdeɪʃən/ | n | kiểm tra dữ liệu theo quy tắc | We have identified a validation change that rejected some valid requests. |
| root cause | /ˌruːt ˈkɔːz/ | n | nguyên nhân gốc | We have not completed the full root cause review, so the investigation remains open. |
| investigation | /ɪnˌvestɪˈɡeɪʃən/ | n | việc điều tra | We have not completed the full root cause review, so the investigation remains open. |
| patch | /pætʃ/ | n | bản thay đổi để sửa hoặc cập nhật phần mềm | The next patch will include tests for the rejected input. |
| affect | /əˈfekt/ | v | ảnh hưởng đến | We are still checking how many booking attempts were affected. |

**Anki:** lưu khối dưới ở dạng UTF-8, nhập với dấu phân cách **Semicolon** (dấu chấm phẩy), hai trường mặt trước / mặt sau. Mỗi dòng gồm nghĩa và câu trong bài.

```text
unavailable;không khả dụng, không truy cập được (Summary: Checkout was unavailable for some users between 10:05 and 10:17 GMT+7.)
release;bản phát hành / phát hành (We restored checkout by rolling back the latest application release.)
monitoring;việc giám sát, theo dõi (At 10:05, monitoring reported a rise in failed requests.)
rollback;việc quay lại phiên bản/trạng thái trước (At 10:12, we started the rollback.)
recovery;sự hoặc quá trình phục hồi (Tests confirmed service recovery at 10:17.)
validation;kiểm tra dữ liệu theo quy tắc (We have identified a validation change that rejected some valid requests.)
root cause;nguyên nhân gốc (We have not completed the full root cause review, so the investigation remains open.)
investigation;việc điều tra (We have not completed the full root cause review, so the investigation remains open.)
patch;bản thay đổi để sửa hoặc cập nhật phần mềm (The next patch will include tests for the rejected input.)
affect;ảnh hưởng đến (We are still checking how many booking attempts were affected.)
```

## 6. Ngữ pháp trong bài

### A. Tìm và phân loại

Dùng các bài grammar được liên kết ở đầu bài nếu cần nhắc lại công thức. Giải thích ngắn bằng tiếng Việt vì sao cấu trúc phù hợp với ý trong câu.

1. Tìm và chép câu dùng **quá khứ đơn**. Nội dung/chức năng cần tìm: kể mốc trong timeline. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
2. Tìm và chép câu dùng **hiện tại hoàn thành**. Nội dung/chức năng cần tìm: nêu bằng chứng đã thu được. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
3. Tìm và chép câu dùng **by + mốc**. Nội dung/chức năng cần tìm: nêu hạn cập nhật. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
4. Tìm và chép câu dùng **điều kiện loại 1**. Nội dung/chức năng cần tìm: ôn kế hoạch ứng phó khi cảnh báo lặp lại. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.

<details>
<summary>Đáp án gợi ý 6A</summary>

1. *At 10:12, we started the rollback.* → **quá khứ đơn**: kể mốc trong timeline.
2. *We have reproduced that behavior on staging.* → **hiện tại hoàn thành**: nêu bằng chứng đã thu được.
3. *The incident owner will send another update by 2 PM GMT+7.* → **by + mốc**: nêu hạn cập nhật.
4. *If the same alert returns, the team will investigate it immediately.* → **điều kiện loại 1**: ôn kế hoạch ứng phó khi cảnh báo lặp lại.

</details>

### B. Ôn bài trước

Ôn [Spec tính năng: lọc task](12-feature-user-story.md). Điền hai từ/cụm, mỗi từ dùng một lần, chia dạng theo câu: **owner, estimate**.

1. User story: As a project manager, I want to filter tasks by ___ and status so I can find urgent work faster.
2. Could you confirm any unclear behavior before giving an ___?

<details>
<summary>Đáp án ôn bài trước</summary>

1. owner — người chịu trách nhiệm chính. Câu gốc: *User story: As a project manager, I want to filter tasks by owner and status so I can find urgent work faster.*
2. estimate — ước lượng. Câu gốc: *Could you confirm any unclear behavior before giving an estimate?*

</details>

## 7. Tóm tắt và phản hồi

**A.** Viết 3–5 câu tiếng Anh tóm tắt thông tin chính. Giữ đúng mức chắc chắn của bài; không biến dự kiến thành kết quả đã xác nhận.

**B.** Viết 1–2 câu tiếng Anh nêu phản hồi hoặc điều bạn muốn hỏi tiếp, có liên quan đến tình huống.

<details>
<summary>Gợi ý mục 7 — xem sau khi tự viết</summary>

**A. Tóm tắt mẫu:** Checkout was disrupted for twelve minutes, while seat browsing remained available. A rollback restored service. The team reproduced a validation problem, but the full review and impact check are still open. Another update is due by 2 PM GMT+7.

**B. Phản hồi mẫu:** I would distinguish service recovery from a closed investigation. I would ask for the final impact count.

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

_(Chạy `/english-lesson check english/reading/13-incident-report.md` sau khi làm xong.)_

# LỖI SAI CẦN NHỚ

_(Cập nhật khi chấm bài.)_
