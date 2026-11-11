# Đọc 14 — Stripe webhooks: đọc sự kiện thanh toán

> **Tuần 7** · Giai đoạn 2 · 15 phút/ngày · 2 ngày, tổng khoảng 30 phút
> **Lịch học:** Ngày 1: mục 1–4 · Ngày 2: mục 5–7; có thể chia thêm buổi ôn nếu cần viết lâu hơn.
> **Loại văn bản:** Bài giải thích kỹ thuật · **Độ dài đoạn đọc:** 174 từ, 1023 ký tự.
> **Ngữ pháp liên quan:** [Ngữ pháp 06](../grammar/06-modal-verbs.md) · [Ngữ pháp 07](../grammar/07-first-conditional.md).

**Sau bài này bạn có thể:** tìm ý chính và dữ kiện trong bài giải thích kỹ thuật, phân biệt thông tin được nêu với điều chưa được xác nhận, và viết tóm tắt ngắn bằng tiếng Anh.

<!-- lesson-video
id: reading-14
type: reading
title: "Reading 14: Stripe Webhooks"
audio: english/audio/reading-14.mp3
video: english/video/out/reading-14.mp4
voice: auto
speed: 0.9
-->

**Nguồn và bối cảnh:** Bài diễn giải có tình huống tự soạn, đối chiếu [Stripe — Webhooks](https://docs.stripe.com/webhooks) và [Stripe — Signature verification](https://docs.stripe.com/webhooks/signature), ngày 11/11/2026. Không phải hướng dẫn triển khai đầy đủ.

## 1. Trước khi đọc

| Từ khóa | Nghĩa |
|---|---|
| event | sự kiện |
| endpoint | 1 đường dẫn API |
| signature | chữ ký, dữ liệu kiểm tra tính xác thực |
| integration | sự tích hợp |
| secret | giá trị bí mật dùng để xác minh |
| delivery | việc gửi, chuyển hoặc bàn giao |

**Câu hỏi định hướng:**
1. Nhìn tiêu đề và loại văn bản: người viết muốn cung cấp thông tin, đề nghị hành động hay ghi nhận kết quả gì?
2. Bạn cần tìm những chi tiết nào để hiểu yêu cầu hoặc quyết định tiếp theo? Dự đoán trước khi đọc, rồi đối chiếu lại.

## 2. Bài đọc

<!-- passage:start -->
A payment page can show a success message before all background work is complete. Our booking app should not treat a browser redirect as the only evidence of payment. It needs a reliable way to receive payment events.

Stripe can send events to a registered webhook endpoint over HTTPS. The app checks the event signature before trusting the message. The endpoint should handle only the event types that the integration needs. A secret used for signature checks belongs on the server, not in public frontend code.

An event may arrive more than once. In our practice app, we record the event ID so repeated delivery does not create a second ticket. We also keep the handler quick and move slow work to a queue. This is an example design, not a complete payment integration.

Before a release, we test successful and failed payments. We also test repeated delivery and invalid signatures. If a test fails, we investigate before using the new handler in production. A green browser page alone is not our acceptance criterion.
<!-- passage:end -->

## 3. Luyện nghe

> 🎧 Audio: [`english/audio/reading-14.mp3`](../audio/reading-14.mp3) · 🎬 Video: `english/video/out/reading-14.mp4` _(dự kiến; tạo bằng skill `lesson-video`, chưa được tạo trong bước soạn bài)._ Khi chưa có audio, đọc thành tiếng để luyện trước.

| Lượt | Cách làm | Mục tiêu |
|---|---|---|
| 1 | Khi đã có audio, nghe không nhìn chữ; ghi 2–3 từ nghe được | Nắm chủ đề và ý chính |
| 2 | Nghe cùng bài đọc; đánh dấu chỗ nghe nhầm | Nối âm thanh và cách viết |
| 3 | Chọn 2–3 câu ở đoạn đầu, nghe rồi nói bám theo; lặp 3 lần | Luyện nhịp và âm cuối, không cần bắt chước quá nhanh |

## 4. Đọc hiểu

### A. Đúng (T) hay Sai (F)?

Dựa vào bài đọc, đánh T/F. Với câu sai, chỉ ra thông tin đúng thay thế.

1. A browser redirect is the only evidence needed.
2. Stripe can send events over HTTPS.
3. The signature secret belongs in public frontend code.
4. An event may arrive more than once.
5. The example is a complete payment integration.

<details>
<summary>Đáp án 4A</summary>

1. **F** — đối chiếu: *Our booking app should not treat a browser redirect as the only evidence of payment.*
2. **T** — đối chiếu: *Stripe can send events to a registered webhook endpoint over HTTPS.*
3. **F** — đối chiếu: *A secret used for signature checks belongs on the server, not in public frontend code.*
4. **T** — đối chiếu: *An event may arrive more than once.*
5. **F** — đối chiếu: *This is an example design, not a complete payment integration.*

</details>

### B. Chọn đáp án đúng

1. What is checked before trusting the message?
   a) The logo color. · b) The browser bookmark. · c) The event signature. · d) The customer nickname.
2. Why does the practice app record an event ID?
   a) To publish the server secret. · b) To skip all tests. · c) To replace every order ID. · d) To avoid creating a second ticket for repeated delivery.
3. Where does slow work go in the example?
   a) To a queue. · b) Into public frontend code. · c) Into a profile review. · d) Onto a payment card.
4. Which case is tested before release?
   a) Only the homepage color. · b) Invalid signatures. · c) Only the team calendar. · d) No failure cases.

<details>
<summary>Đáp án 4B</summary>

1. c) The event signature.
2. d) To avoid creating a second ticket for repeated delivery.
3. a) To a queue.
4. b) Invalid signatures.

</details>

### C. Trả lời ngắn bằng tiếng Anh

1. Where should the signature-check secret stay?
2. Name two payment outcomes that are tested.
3. What happens if a test fails?

<details>
<summary>Đáp án gợi ý 4C</summary>

1. On the server.
2. Successful and failed payments.
3. The team investigates before production use.

Chấp nhận cách diễn đạt khác đúng nghĩa và ngữ pháp; không thêm dữ kiện ngoài bài.

</details>

## 5. Từ vựng trong bài

IPA tham khảo theo Anh–Anh; audio mẫu dùng giọng Mỹ nên một số nguyên âm và âm r có thể khác. n = danh từ, v = động từ, adj = tính từ. Dấu ˈ đứng trước âm tiết nhấn chính. Mỗi ví dụ dưới đây là câu trích từ đoạn đọc, có thể chứa dạng chia của từ.

| Từ | Phiên âm | Loại | Nghĩa | Câu trong bài |
|---|---|---|---|---|
| event | /ɪˈvent/ | n | sự kiện | It needs a reliable way to receive payment events. |
| endpoint | /ˈendpɔɪnt/ | n | 1 đường dẫn API | Stripe can send events to a registered webhook endpoint over HTTPS. |
| signature | /ˈsɪɡnətʃə/ | n | chữ ký, dữ liệu kiểm tra tính xác thực | The app checks the event signature before trusting the message. |
| integration | /ˌɪntɪˈɡreɪʃən/ | n | sự tích hợp | The endpoint should handle only the event types that the integration needs. |
| secret | /ˈsiːkrət/ | n | giá trị bí mật dùng để xác minh | A secret used for signature checks belongs on the server, not in public frontend code. |
| delivery | /dɪˈlɪvəri/ | n | việc gửi, chuyển hoặc bàn giao | In our practice app, we record the event ID so repeated delivery does not create a second ticket. |
| handler | /ˈhændlə/ | n | đoạn hoặc hàm xử lý | We also keep the handler quick and move slow work to a queue. |
| queue | /kjuː/ | n | hàng đợi công việc | We also keep the handler quick and move slow work to a queue. |
| release | /rɪˈliːs/ | n / v | bản phát hành / phát hành | Before a release, we test successful and failed payments. |
| acceptance criterion | /əkˈseptəns kraɪˈtɪəriən/ | n số ít | một tiêu chí nghiệm thu | A green browser page alone is not our acceptance criterion. |

**Anki:** lưu khối dưới ở dạng UTF-8, nhập với dấu phân cách **Semicolon** (dấu chấm phẩy), hai trường mặt trước / mặt sau. Mỗi dòng gồm nghĩa và câu trong bài.

```text
event;sự kiện (It needs a reliable way to receive payment events.)
endpoint;1 đường dẫn API (Stripe can send events to a registered webhook endpoint over HTTPS.)
signature;chữ ký, dữ liệu kiểm tra tính xác thực (The app checks the event signature before trusting the message.)
integration;sự tích hợp (The endpoint should handle only the event types that the integration needs.)
secret;giá trị bí mật dùng để xác minh (A secret used for signature checks belongs on the server, not in public frontend code.)
delivery;việc gửi, chuyển hoặc bàn giao (In our practice app, we record the event ID so repeated delivery does not create a second ticket.)
handler;đoạn hoặc hàm xử lý (We also keep the handler quick and move slow work to a queue.)
queue;hàng đợi công việc (We also keep the handler quick and move slow work to a queue.)
release;bản phát hành / phát hành (Before a release, we test successful and failed payments.)
acceptance criterion;một tiêu chí nghiệm thu (A green browser page alone is not our acceptance criterion.)
```

## 6. Ngữ pháp trong bài

### A. Tìm và phân loại

Dùng các bài grammar được liên kết ở đầu bài nếu cần nhắc lại công thức. Giải thích ngắn bằng tiếng Việt vì sao cấu trúc phù hợp với ý trong câu.

1. Tìm và chép câu dùng **should not + V**. Nội dung/chức năng cần tìm: nêu điều nên tránh. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
2. Tìm và chép câu dùng **can + V**. Nội dung/chức năng cần tìm: nói khả năng của dịch vụ. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
3. Tìm và chép câu dùng **động từ tình thái may**. Nội dung/chức năng cần tìm: mở rộng: may + V diễn đạt khả năng, không phải sự chắc chắn. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.
4. Tìm và chép câu dùng **điều kiện loại 0**. Nội dung/chức năng cần tìm: ôn quy trình thường lệ. In đậm từ hoặc cấu trúc thể hiện cách dùng đó.

<details>
<summary>Đáp án gợi ý 6A</summary>

1. *Our booking app should not treat a browser redirect as the only evidence of payment.* → **should not + V**: nêu điều nên tránh.
2. *Stripe can send events to a registered webhook endpoint over HTTPS.* → **can + V**: nói khả năng của dịch vụ.
3. *An event may arrive more than once.* → **động từ tình thái may**: mở rộng: may + V diễn đạt khả năng, không phải sự chắc chắn.
4. *If a test fails, we investigate before using the new handler in production.* → **điều kiện loại 0**: ôn quy trình thường lệ.

</details>

**Đọc thêm:** *may + V* = có thể xảy ra. Khi nói khả năng quá khứ hoặc thuật lại thông báo, *could + V* không tự có nghĩa là lời hứa.

### B. Ôn bài trước

Ôn [Báo cáo sự cố production](13-incident-report.md). Điền hai từ/cụm, mỗi từ dùng một lần, chia dạng theo câu: **unavailable, affect**.

1. Summary: Checkout was ___ for some users between 10:05 and 10:17 GMT+7.
2. We are still checking how many booking attempts were ___.

<details>
<summary>Đáp án ôn bài trước</summary>

1. unavailable — không khả dụng, không truy cập được. Câu gốc: *Summary: Checkout was unavailable for some users between 10:05 and 10:17 GMT+7.*
2. affected — ảnh hưởng đến. Câu gốc: *We are still checking how many booking attempts were affected.*

</details>

## 7. Tóm tắt và phản hồi

**A.** Viết 3–5 câu tiếng Anh tóm tắt thông tin chính. Giữ đúng mức chắc chắn của bài; không biến dự kiến thành kết quả đã xác nhận.

**B.** Viết 1–2 câu tiếng Anh nêu phản hồi hoặc điều bạn muốn hỏi tiếp, có liên quan đến tình huống.

<details>
<summary>Gợi ý mục 7 — xem sau khi tự viết</summary>

**A. Tóm tắt mẫu:** The article explains why a booking app needs payment events as well as a browser result. It checks signatures and expects possible repeated delivery. The practice design records event IDs and queues slow work. Tests cover both success and failure cases.

**B. Phản hồi mẫu:** I would check the official integration guide before implementing this design. I would include repeated-delivery tests.

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

_(Chạy `/english-lesson check english/reading/14-stripe-webhooks.md` sau khi làm xong.)_

# LỖI SAI CẦN NHỚ

_(Cập nhật khi chấm bài.)_
