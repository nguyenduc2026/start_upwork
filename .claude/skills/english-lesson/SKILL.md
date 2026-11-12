---
name: english-lesson
description: Tạo bài học tiếng Anh tiếp theo theo english/00-roadmap.md, chấm bài đã làm, ghi tiến độ học mỗi ngày, hoặc ôn lỗi sai và tổng kết tuần. Dùng khi người dùng gõ /english-lesson, hoặc nói "bài tiếp theo", "tạo bài grammar/vocabulary/writing/speaking", "chấm bài", "hôm nay học...", "ghi tiến độ", "ôn tập tuần".
argument-hint: "next [grammar|vocabulary|reading|writing|speaking] | check <file> | log <nội dung> | review"
---

# English Lesson

**Người học:** lập trình viên Việt Nam, 3–4 năm kinh nghiệm (Laravel, Spring Boot, React, Stripe, AWS), tiếng Anh yếu (~A2), học 1h/ngày để làm freelance trên Upwork. Chi phí ~0đ → chỉ gợi ý công cụ miễn phí.

**Người học cần bài CHUẨN CHỈ, ĐẦY ĐỦ như sách giáo khoa** — không sơ sài, không "liệt kê vài ý cho có". Mỗi bài phải đủ để tự học mà không cần tra thêm nguồn khác.

**Nguồn sự thật:** `english/00-roadmap.md` (danh sách bài, tuần, trạng thái). Luôn đọc trước.
**Tiến độ hằng ngày:** `english/progress.md`.
**Bài mẫu chuẩn:** `english/grammar/01-present-tenses.md` — tham khảo độ chi tiết, giọng văn, cách trình bày cho MỌI loại bài.

Đối số: `$ARGUMENTS`

---

## Chế độ 1 — `next [folder]`

1. Đọc roadmap. Xác định bài cần tạo:
   - Có `folder` → bài **đầu tiên** có trạng thái `chưa tạo` trong bảng của folder đó.
   - Không có `folder` → bài `chưa tạo` có **tuần nhỏ nhất**.
2. **Kiểm tra (bắt buộc):** nếu bài liền trước trong cùng folder chưa `hoàn thành` → DỪNG, nhắc người học làm bài đó trước (nêu tên file). Chỉ tạo tiếp khi người học nói rõ muốn tạo luôn.
3. Đọc bài mẫu chuẩn + bài gần nhất trong folder. Tạo **đúng 1 bài** theo **Khung bài** tương ứng bên dưới.
4. Tên file: `english/<folder>/<NN>-<slug>.md`.
5. Cập nhật roadmap: tên bài thành link, trạng thái → `đã tạo`.

## Chế độ 2 — `check <file>`

1. Đọc mục *Bài làm của bạn*. Trống → báo chưa làm, dừng.
2. Chấm:
   - Bài có đáp án: so từng câu; chấp nhận đáp án khác nếu đúng ngữ pháp và nghĩa.
   - Bài tự do: sửa ngữ pháp, từ vựng, độ tự nhiên khi gửi client. Đưa **bản sửa** nhưng giữ ý và giọng của người học.
3. Ghi vào mục **Nhận xét** (thay placeholder):
   - Điểm từng phần `x/y` + tổng.
   - Từng câu sai: `❌ câu gốc → ✅ câu sửa — lý do (tiếng Việt, chỉ rõ quy tắc nào trong bài)`.
   - 1–2 điểm làm tốt, 1 gợi ý cải thiện quan trọng nhất.
4. Lỗi **có tính lặp lại** (không ghi lỗi gõ nhầm) → mục **Lỗi sai cần nhớ**: `- ❌ ... → ✅ ... (quy tắc)`.
5. Roadmap → `hoàn thành` nếu đã làm đủ các phần (tổng ≥ 70%). Dưới 70% → giữ `đã tạo`, khuyên làm lại phần yếu.
6. Ghi vào `progress.md` cột *Kết quả bài tập* của ngày hôm nay (tạo dòng mới nếu chưa có): `<tên bài>: x/y`.
7. Trả lời ngắn trong chat: điểm, lỗi chính, bài tiếp theo nên học.

## Chế độ 3 — `log <nội dung>`

Ghi nhanh việc học trong ngày vào `english/progress.md`. Người học có thể viết tự do, ví dụ: `log 1h grammar 01 phần 1, 20 từ anki`.
1. Lấy ngày hôm nay (`date +%Y-%m-%d`). Tách ra: thời gian học, nội dung đã học, ghi chú (nếu có). Thiếu thời gian → hỏi lại 1 câu ngắn.
2. Ngày đã có dòng → cộng dồn vào dòng đó; chưa có → thêm dòng mới vào bảng của tuần hiện tại. Tuần tính theo **thứ Hai → Chủ nhật**, tính từ *Ngày bắt đầu* (nếu trống → điền hôm nay). Sang tuần mới → tạo mục `## Tuần N (dd/mm – dd/mm)` mới.
3. Cập nhật bảng **Tổng quan**: số ngày đã học, chuỗi ngày liên tiếp hiện tại, chuỗi dài nhất, tổng thời gian, số bài `hoàn thành` (đếm trong roadmap).
4. Trả lời 1–2 câu: đã ghi, chuỗi hiện tại. Ngày nào học < 1h hoặc bỏ ngày → nhắc nhẹ, không phán xét.

## Chế độ 4 — `review`

1. Đọc mục **Lỗi sai cần nhớ** của các bài `hoàn thành` (ưu tiên ~7 ngày gần nhất, xem `git log` nếu cần).
2. Tạo trong chat (không tạo file) bài kiểm tra **10–15 câu** nhắm đúng các lỗi đó, đáp án trong `<details>`.
3. Ghi **Tổng kết tuần** vào `progress.md` (dưới bảng tuần hiện tại): số ngày học / 7, tổng giờ so với mục tiêu 7h, bài đã hoàn thành, lỗi lặp lại nhiều nhất, 1 việc cần cải thiện tuần sau.
4. Chưa có lỗi nào → vẫn tổng kết tuần, nhắc người học làm và chấm bài.

---

## Nguyên tắc chung cho mọi bài

- **Ngôn ngữ:** tiêu đề, giải thích, tên mục bằng **tiếng Việt**; thuật ngữ ghi kèm tiếng Anh trong ngoặc lần đầu, ví dụ *Thì hiện tại đơn (Present Simple)*. Câu ví dụ bằng tiếng Anh.
- **Tên mục trung tính, ngắn gọn:** `Ví dụ`, `Lỗi thường gặp`, `Lỗi phát âm thường gặp`... — KHÔNG ghi "ví dụ trong công việc freelance", "lỗi người Việt hay mắc".
- **Ngữ cảnh câu ví dụ:** đặt trong công việc dev (tin nhắn với client, job post, báo cáo tiến độ, bug, deploy) nhưng không cần nhấn mạnh điều này trong tiêu đề. Có thể nhắc 2 project của người học: **đặt vé concert** (Laravel + React) và **taskboard** (Spring Boot + React).
- **Mức độ:** A2–B1, câu ví dụ ngắn, rõ.
- **Đầu bài:** tuần, giai đoạn, thời lượng, **lịch học chia theo ngày**, mục tiêu "Sau bài này bạn có thể...".
- **Cuối bài (luôn có, theo thứ tự):** `BÀI LÀM CỦA BẠN` (đánh số khớp từng phần bài tập) → `TỰ ĐÁNH GIÁ` (checklist 4–6 ý) → `NHẬN XÉT` (placeholder) → `LỖI SAI CẦN NHỚ` (placeholder).
- **Đáp án** đặt trong `<details>` ngay sau bài tập của từng phần.
- **Ôn tập:** lồng 2–3 câu ôn kiến thức bài trước vào bài tập, đặc biệt lỗi trong *Lỗi sai cần nhớ* của các bài đã chấm.
- **Kiểm tra lại** đáp án và phiên âm trước khi ghi file — không được sai.

### Audio / video (liên kết với skill `english-generate-video`)

Audio và video **không** do skill này tạo — skill này chỉ chuẩn bị nội dung đúng định dạng để skill `english-generate-video` (`.claude/skills/english-generate-video/SKILL.md`) đọc và render.

Bài nào cần audio (**bắt buộc** với reading; với speaking/writing khi có script/hội thoại mẫu) phải có:
1. **Khối metadata** (comment HTML, đặt ngay sau phần mục tiêu):
   ```
   <!-- lesson-video
   id: <folder>-<NN>            # vd: reading-02
   type: reading | speaking | writing
   title: "<tiêu đề tiếng Anh>"
   audio: english/audio/<kỹ năng>/<id>.mp3
   video: english/video/out/<kỹ năng>/<id>.mp4
   voice: auto                  # auto (xoay vòng giọng) | male | female | <voice_id>
   speed: 0.9                   # A2: 0.85–0.9
   -->
   ```
2. **Đoạn văn cần đọc** đặt giữa `<!-- passage:start -->` và `<!-- passage:end -->`. Đây là văn bản **sạch** (không ký hiệu trọng âm/nối âm). Markdown nhẹ (in đậm, gạch đầu dòng) được phép.
3. **Giới hạn độ dài:** đoạn văn ≤ **1.500 ký tự** (≈ 230 từ) để tiết kiệm credits ElevenLabs (~30k credits cho cả lộ trình).
4. Dòng tham chiếu cho người học: `> 🎧 Audio: [english/audio/<kỹ năng>/<id>.mp3](...) · 🎬 Video: english/video/out/<kỹ năng>/<id>.mp4 _(tạo bằng skill english-generate-video)_`
5. Sau khi tạo bài, nhắc người học: *"Chạy skill `english-generate-video` cho `<file>` để tạo audio/video."*

---

## Khung bài

### A. Grammar

Mỗi điểm ngữ pháp (mỗi thì / mỗi cấu trúc) là **1 PHẦN riêng**, gồm đủ các mục:

| Mục | Yêu cầu |
|---|---|
| Khái niệm | Giải thích bản chất bằng 2–3 câu + 1 ví dụ minh họa có phân tích |
| Công thức | Bảng (+) / (−) / (?) theo từng nhóm chủ ngữ; tách *to be* và động từ thường nếu khác nhau; câu trả lời ngắn; dạng viết tắt; câu hỏi Wh- |
| Quy tắc biến đổi | Chính tả (thêm -s, -ing, -ed, so sánh hơn...) và cách phát âm nếu có — đủ mọi trường hợp + ngoại lệ |
| Cách dùng | Đánh số ①②③..., mỗi cách dùng ≥ 2 ví dụ |
| Dấu hiệu nhận biết | Trạng từ, cụm thời gian, cấu trúc đi kèm; vị trí trong câu |
| Lưu ý / ngoại lệ | Trường hợp đặc biệt (ví dụ: động từ trạng thái) |
| Ví dụ | Bảng 6–8 câu, cột ghi cách dùng tương ứng |
| Lỗi thường gặp | Bảng ❌ / ✅ / lý do, 5–6 lỗi |
| Bài tập của phần | ≥ 3 dạng (biến đổi từ, chia động từ / điền, sắp xếp / đúng-sai / sửa lỗi), tổng ≥ 20 câu |

**PHẦN SO SÁNH (bắt buộc)** khi bài có ≥ 2 điểm ngữ pháp, hoặc điểm ngữ pháp dễ nhầm với bài trước (ví dụ: hiện tại hoàn thành ↔ quá khứ đơn, will ↔ be going to ↔ hiện tại tiếp diễn):
- Bảng so sánh theo tiêu chí: bản chất, công thức, cách dùng, dấu hiệu, trường hợp đặc biệt
- Bảng cặp câu đối chiếu (cùng động từ, khác nghĩa) + cột "khác nhau ở đâu"
- Mẹo chọn nhanh (các câu hỏi tự kiểm tra theo thứ tự) + 1 đoạn tin nhắn mẫu kết hợp các điểm
- Bài tập tổng hợp: chọn đúng (≥ 10 câu), tìm và sửa lỗi (≥ 6 câu), viết tin nhắn cho client theo yêu cầu cụ thể

### B. Vocabulary

| Mục | Yêu cầu |
|---|---|
| Giới thiệu | Khi nào dùng nhóm từ này trong công việc |
| Từ vựng | 20–25 từ, **chia nhóm nhỏ theo chủ đề con**; bảng: Từ · Phiên âm IPA · Loại từ · Nghĩa · Ví dụ |
| Họ từ (word family) | Các dạng của từ quan trọng: *deploy (v) → deployment (n)* |
| Cụm từ đi kèm (collocations) | 8–10 cụm, có ví dụ |
| Từ dễ nhầm | 3–4 cặp (*issue / problem / bug*, *estimate / quote*) + phân biệt + ví dụ |
| Lỗi phát âm thường gặp | Các từ hay bị đọc sai, IPA + cách đọc sai thường gặp |
| Mẫu câu thực tế | 1–2 tin nhắn client mẫu dùng nhiều từ trong bài (in đậm từ mới) |
| Anki | Khối `từ;nghĩa (ví dụ)`, phân cách dấu chấm phẩy, đủ mọi từ trong bài |
| Bài tập | Điền từ (≥ 8), chọn từ đúng trong cặp dễ nhầm (≥ 5), dịch Việt → Anh (≥ 5), viết đoạn tin nhắn dùng ≥ 5 từ mới |

### C. Reading

Bài mẫu chuẩn: `english/reading/01-job-post-ticketing.md`.

| Mục | Yêu cầu |
|---|---|
| Đầu bài | Loại văn bản, độ dài, **ngữ pháp liên quan** (link tới bài grammar người học đang/vừa học), khối `lesson-video` |
| 1. Trước khi đọc | Bảng 6–8 từ khóa + 2 câu hỏi định hướng |
| 2. Bài đọc | 150–230 từ, mức A2–B1, văn bản **giống thật**: job post, email/chat client, README, bug report, blog kỹ thuật, hợp đồng, release notes... Đặt giữa `passage:start/end`. Cố ý dùng nhiều cấu trúc ngữ pháp người học đang học |
| 3. Luyện nghe | Bảng 3 lượt: nghe không nhìn → nghe + nhìn → shadowing 1 đoạn |
| 4. Đọc hiểu | Đúng/Sai (5) + trắc nghiệm (4) + trả lời ngắn bằng tiếng Anh (3), đáp án trong `<details>` |
| 5. Từ vựng trong bài | 10–15 từ: Từ · Phiên âm · Loại · Nghĩa · **Câu trong bài** + khối Anki |
| 6. Ngữ pháp trong bài | Bài tập tìm và phân loại các câu trong bài đọc theo ngữ pháp liên quan, có đáp án |
| 7. Tóm tắt | Viết 3–5 câu tóm tắt + 1–2 câu phản hồi cá nhân (bằng tiếng Anh) |

Chủ đề lấy theo danh sách Reading trong roadmap. Mỗi bài **khác loại văn bản** với bài trước để đa dạng.

### D. Writing

| Mục | Yêu cầu |
|---|---|
| Tình huống | Khi nào phải viết loại tin nhắn/văn bản này, client mong đợi gì |
| Cấu trúc | Bảng các phần của văn bản + mục đích từng phần |
| Mẫu câu theo từng phần | Mỗi phần ≥ 3 lựa chọn, ghi rõ mức trang trọng / thân thiện |
| Giọng điệu | Trang trọng vs thân thiện, khi nào dùng cái nào, từ nên tránh |
| Bài mẫu | ≥ 2 bài: 1 bài **tốt** + 1 bài **kém**, có phân tích vì sao tốt/kém |
| Lỗi hay gặp | Bảng ❌ / ✅ / lý do |
| Checklist trước khi gửi | 5–7 ý |
| Bài tập | Sửa bài kém; viết theo 2–3 tình huống cụ thể khác nhau |

### E. Speaking

| Mục | Yêu cầu |
|---|---|
| Phát âm trọng tâm | Âm / trọng âm / ngữ điệu của bài: IPA + mô tả khẩu hình bằng tiếng Việt + từ ví dụ trong ngữ cảnh dev |
| Từ và câu luyện | Danh sách luyện có đánh dấu trọng âm, nối âm |
| Script / hội thoại mẫu | Đánh dấu trọng âm (**in đậm**), chỗ nối âm (‿), chỗ ngắt nghỉ (/). Kèm bản **không đánh dấu** trong `<details>` giữa `passage:start/end` + khối `lesson-video` để tạo audio mẫu |
| Câu hỏi thường gặp | Nếu là bài hội thoại: các câu client hay hỏi + 2–3 cách trả lời mẫu |
| Lịch luyện theo ngày | Ngày 1 làm gì, ngày 2 làm gì... |
| Tiêu chí tự đánh giá | Âm cuối, trọng âm, tốc độ, ngắt nghỉ, độ trôi chảy |
| Bài tập | Ghi âm theo script; tự soạn script của mình; shadowing 1 đoạn video (ghi link) |
