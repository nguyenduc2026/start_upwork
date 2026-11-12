# Lesson video

Tạo audio (ElevenLabs) + video chữ chạy theo giọng đọc (Remotion) cho bài học trong `english/`. Đặc tả đầy đủ: [`.claude/skills/english-generate-video/SKILL.md`](../../.claude/skills/english-generate-video/SKILL.md).

## Dùng hằng ngày

**Luôn chạy từ thư mục này:**

```powershell
cd d:\Work\Freelancer\start_upwork\english\video
```

Đường dẫn file bài viết từ root repo (vd. `english/reading/01-job-post-ticketing.md`) — script tự tìm. Lệnh `preview` / `render` chỉ cần `id` bài (vd. `reading-01`).

### Các lệnh

| Lệnh | Làm gì | Tốn credits? |
|---|---|---|
| `npm run tts -- <file.md> --dry-run` | Kiểm tra: số ký tự, credits ước tính, giọng sẽ dùng, từ vựng khớp. Không ghi file | Không |
| `npm run tts -- <file.md>` | Gọi ElevenLabs → tạo mp3 + timing từng từ. Đã có cache khớp thì dùng lại | **Có** (~1/ký tự, model multilingual_v2), cache thì không |
| `npm run studio -- --props=data/<kỹ năng>/<id>.json` | Mở trình duyệt xem video **có tiếng**, tua được, không cần render | Không |
| `npm run preview -- <id>` | Render 5 ảnh PNG (intro, đầu, giữa, cuối, outro) | Không |
| `npm run render -- <id>` | Render ra file mp4 (vài phút) | Không |
| `npm run lesson -- <file.md>` | Chạy gộp `tts` → `preview` → `render` | **Có** (lần đầu) |
| `npm run tts -- <file.md> --from-alignment` | Dựng lại timing từ mp3 + alignment đã lưu (khi ghép timing lỗi hoặc sau khi sửa code timing) | Không |
| `npm run tts -- <file.md> --force` | Bắt buộc tạo lại audio (đổi giọng, giọng đọc lỗi…) | **Có** |
| `npm run tts -- <file.md> --fake` | Timing giả, không có tiếng — chỉ để thử giao diện | Không |
| `npm run paste -- <file.md>` | **Thủ công:** tạo văn bản + hướng dẫn để dán lên web ElevenLabs | Không (credits trừ trên web) |
| `npm run align -- <file.md>` | **Thủ công:** mp3 tải từ web → Whisper trên máy lấy timing (~40s) | Không |
| `npm run lesson -- <file.md> --manual` | Gộp `align` → `preview` → `render` | Không |

### Quy trình tạo 1 bài mới (khuyên dùng)

```powershell
# 1. Kiểm tra trước — xem credits + giọng
npm run tts -- english/reading/02-client-introduction.md --dry-run

# 2. Tạo audio + timing (tốn credits 1 lần)
npm run tts -- english/reading/02-client-introduction.md

# 3. Xem thử có tiếng trong trình duyệt — chữ tô sáng có khớp giọng không
npm run studio -- --props=data/reading/reading-02.json

# 4. Ưng rồi mới render mp4
npm run render -- reading-02
```

Muốn nhanh, không cần xem trước: `npm run lesson -- <file.md>` (gộp bước 2 → 4).

### Quy trình thủ công — dán lên web ElevenLabs (vd. account free)

Không gọi API, credits trừ trên account web. Web không cho timing từng chữ → dùng **Whisper chạy trên máy** để lấy (miễn phí).

```powershell
# 1. Tạo văn bản + hướng dẫn (giọng, model, thông số) để dán lên web
npm run paste -- english/reading/02-client-introduction.md
#    → mở out/reading/paste/reading-02.md xem hướng dẫn
#    → mở out/reading/paste/reading-02.txt, Ctrl+A, Ctrl+C

# 2. Trên https://elevenlabs.io/app/speech-synthesis/text-to-speech:
#    chọn giọng + Eleven Multilingual v2 + thông số như hướng dẫn → dán → Generate → Download MP3
#    → lưu thành english/audio/reading/reading-02.mp3

# 3. Lấy timing bằng Whisper (lần đầu tự tải ~150 MB vào .whisper/, cần mạng)
npm run align -- english/reading/02-client-introduction.md

# 4. Xem thử rồi render như bình thường
npm run studio -- --props=data/reading/reading-02.json
npm run render -- reading-02
```

- Độ chính xác: chữ tô sáng lệch giọng trung bình ~0,05s, 90% từ lệch < 0,16s, **không sáng sớm hơn giọng** (đo so với timing API trên cùng 1 mp3). API vẫn chính xác hơn một chút.
- Account free 10.000 credits/tháng ≈ 8–10 bài reading.
- Bài đã làm thủ công thì `npm run tts` sẽ **từ chối gọi API** để không ghi đè mp3 (muốn thay bằng API: `--force`, tốn credits).
- **Điều khoản gói free:** chỉ 1 account free/người; chỉ dùng phi thương mại; đăng **công khai** (repo GitHub public, link công khai) thì ghi "elevenlabs.io" trong tiêu đề. Để local / Drive riêng / repo private thì không cần.

### File được tạo ra

Chia theo kỹ năng = tên thư mục chứa bài (`reading`, `speaking`, `writing`…):

| File | Ở đâu | Commit? |
|---|---|---|
| Audio | `english/audio/<kỹ năng>/<id>.mp3` | **Có** (tạo lại tốn credits) |
| Timing từng từ | `english/video/data/<kỹ năng>/<id>.json` | **Có** |
| Alignment gốc ElevenLabs | `english/video/data/<kỹ năng>/<id>.alignment.json` | **Có** (để dựng lại miễn phí) |
| Video | `english/video/out/<kỹ năng>/<id>.mp4` | Không |
| Ảnh preview | `english/video/out/<kỹ năng>/preview/<id>/*.png` | Không |
| Văn bản để dán (thủ công) | `english/video/out/<kỹ năng>/paste/<id>.txt` + `.md` | Không |
| Whisper + model | `english/video/.whisper/` (~150 MB, tự tải) | Không |

### Gặp lỗi

| Thông báo | Làm gì |
|---|---|
| `ElevenLabs HTTP 401/403 (...)` | Key sai / hết hạn / thiếu quyền Text to Speech. Key thật bắt đầu bằng `sk_` |
| `api_key_id_used_as_api_key` | Đang dán Key ID — tạo key mới, copy key `sk_...` |
| `HTTP 429` / hết credits | Dừng, kiểm tra credits hoặc credit limit của key |
| `Audio đã lưu tại ..., alignment không khớp` | **Đừng chạy lại `tts`/`lesson` thường** (tốn credits). Dùng `--from-alignment` |
| `Cần MP3 và ... alignment.json` | Chưa có audio thật — chạy `tts` không kèm `--from-alignment` |
| `Giữ giọng cũ (vị trí X)...` | Audio đã có nên giữ giọng cũ. Muốn đổi giọng: `--force` (tốn credits) |
| Chữ tô sáng lệch giọng | Kiểm tra trong Studio trước; sửa code timing xong chạy `--from-alignment` rồi `render` lại |
| `Chưa có mp3. Tải từ ElevenLabs rồi lưu thành: ...` | (Thủ công) Lưu mp3 tải về đúng đường dẫn được in ra, rồi chạy lại `align` |
| `Audio bài này tạo thủ công trên web` | `tts` không ghi đè mp3 làm tay. Dùng `npm run align`; muốn thay bằng API thì thêm `--force` |
| Whisper lỗi tải lần đầu | Kiểm tra mạng; xoá thư mục `.whisper/` rồi chạy lại `align` |

### Cấu hình (`.env`, không commit)

```
ELEVENLABS_API_KEY=sk_...
VOICE_ID=nam_1,nữ_1,nam_2,nữ_2   # vị trí lẻ = nam, chẵn = nữ
```

Trong metadata bài: `voice: auto` (xoay vòng đủ giọng theo số bài), `male`, `female` hoặc 1 voice ID cụ thể.

---

## Ghi chú kỹ thuật

Dành cho người sửa code. Lần đầu cài: `npm ci`, kiểm tra kiểu: `npx tsc --noEmit`.

`lesson` chạy tuần tự TTS → 5 PNG preview → MP4. Có thể dùng `--fake`, `--dry-run`, `--from-alignment`, `--force`; dry-run dừng sau bước kiểm tra, không ghi file. Các PNG được lưu để mở kiểm tra thủ công; script không tự đánh giá ảnh. Nếu cần duyệt ảnh trước khi render bản thật, chạy riêng từng lệnh.

`--fake` tạo mỗi từ 350ms và thêm 400ms nghỉ sau dấu câu, không điều chỉnh theo `speed`; `speed` vẫn được lưu trong JSON và hash. Không tạo/xóa MP3; JSON ghi `audioSrc: null`, `fake: true`, video không có audio. Chạy TTS thật luôn bỏ cache giả. `--dry-run` ưu tiên nếu truyền đồng thời với `--fake`.

Cache thật cần MP3 và hash văn bản/model/speed/giọng khớp. Trừ khi dùng `--force`, giọng đã lưu của audio thật được giữ lại khi danh sách VOICE_ID đổi; nội dung/model/speed thay đổi vẫn làm cache mất hiệu lực. Voice ID trực tiếp ngoài danh sách có `voiceIndex: null`, không suy đoán giới tính. Log chỉ hiển thị vị trí/giới tính, không hiển thị ID.

Nếu giọng cấu hình hiện tại khác giọng cache, cả dry-run cũng cảnh báo vị trí giọng cũ/mới và hướng dẫn dùng `--force` (tốn credits).

Khi nhận response TTS thật, script lưu `english/audio/<kỹ năng>/<id>.mp3`, bản copy `public/audio/<kỹ năng>/<id>.mp3` và `data/<kỹ năng>/<id>.alignment.json` **trước khi ghép timing**. File alignment giữ nguyên alignment gốc, không chứa `audio_base64`. Nếu ghép timing lỗi, audio/alignment vẫn còn và `data/<kỹ năng>/<id>.json` không bị ghi/ghi đè. Khoảng trắng/xuống dòng chuẩn hoá được ánh xạ theo ký tự không phải khoảng trắng; ký tự thật khác thì báo lỗi. API lỗi sẽ in HTTP status, mã `detail.status`/`detail.code`, message tối đa 200 ký tự; che key/voice ID, không in headers/request body hoặc body thô.

Sau khi sửa passage/alignment cho khớp, khôi phục không gọi API, không cần API key:

```powershell
npm run tts -- english/reading/01-job-post-ticketing.md --from-alignment
# Hoặc chạy tiếp cả preview/render:
npm run lesson -- english/reading/01-job-post-ticketing.md --from-alignment
```

Cần đủ MP3 gốc và `data/<kỹ năng>/<id>.alignment.json`; không kết hợp `--from-alignment` với `--fake`/`--force`. Nếu kèm `--dry-run`, chỉ kiểm tra văn bản và không ghi file. Khôi phục bỏ qua cache JSON, tạo JSON thật (`fake: false`) và copy lại audio vào public, 0 credits. Giữ metadata/VOICE_ID đúng với lần tạo audio gốc: alignment thô không chứa giọng/model/speed, nên khi không có JSON thật cũ, thông tin này được lấy từ cấu hình hiện tại.

Timing từng từ: `startMs` = lúc bắt đầu **chữ cái đầu** của từ (không lấy khoảng trắng trước nó — ElevenLabs dồn khoảng nghỉ sau `.` `,` và xuống dòng vào khoảng trắng, lấy theo đó sẽ làm chữ sáng sớm 0.4–0.7s). Trong khoảng nghỉ, từ trước vẫn được giữ tô sáng.

Block được thêm dấu chấm để ngắt nghỉ có `addedPeriod: true`. Văn bản TTS/timing không đổi; render và phép đo layout bỏ đúng dấu chấm tổng hợp của từ cuối block, giữ dấu câu vốn có. Khoảng trắng trước từ nằm ngoài ô tô sáng; padding ngang 6px được bù bằng margin -6px để không đổi chỗ xuống dòng. Khi từ vựng chồng nhau, cụm dài hơn thắng, giữ chỉ số vocab gốc và occurrence nguyên vẹn.

Preview dùng 5 lần `remotion still` thay cho `render --frames=a,b,...`, vì CLI không hỗ trợ danh sách sparse đó. Thời điểm: intro 1.5s, main +2s, giữa main, main trước cuối 1s, outro +3s. Mỗi câu speaking được đo/xuống dòng trong cùng một màn hình. Cụm từ vựng qua dòng được vẽ theo từng đoạn dòng nhưng dùng chung mốc bắt đầu/kết thúc của cả cụm. Dòng reading nằm một phần ngoài vùng cuộn được ẩn để chữ không bị cắt.

TTS chỉ đọc `.env` bằng dotenv khi biến môi trường cần thiết chưa được cấp: fake/dry-run/khôi phục chỉ cần `VOICE_ID`, TTS thật cần thêm API key. Có thể cấp `VOICE_ID` từ môi trường để kiểm tra mà không đọc `.env`. Render/preview/Studio dùng `.env.example` để không đưa biến bí mật từ `.env` vào trình duyệt. Không sửa `.env`. Font Inter và Noto Sans tải từ Google Fonts nên lần render đầu cần mạng.

Remotion và tất cả `@remotion/*`: **4.0.542**, pin exact. Hai devDependency `@types/react`, `@types/react-dom` đã được người dùng cho phép; không thêm thư viện runtime khác ngoài danh sách yêu cầu.

Kiểm tra logic bổ sung (không gọi API):

```powershell
npx tsx scripts/check.ts
```

### Chế độ thủ công (`paste` / `align`)

`scripts/paste.ts` chọn giọng bằng cùng hàm `chooseVoice` với API và in đúng `voiceSettings` của API để giọng web giống giọng API. `scripts/align.ts` cài whisper.cpp **1.5.5** (Windows chỉ có bản dựng sẵn ≤ 1.6.0) + model `base.en` (đổi bằng `WHISPER_MODEL`) vào `.whisper/whisper.cpp/`, đổi mp3 → WAV 16 kHz mono bằng `remotion ffmpeg`, chạy `transcribe({tokenLevelTimestamps: true})`. Thời điểm từ = `t_dtw × 10 − 120 ms` (đo trên reading-01 so với API: `offsets` lệch tới 1s, `t_dtw` trễ đều ~120ms). `scripts/whisper-align.ts` ghép từ Whisper với văn bản bằng edit distance trên chuỗi từ, nội suy từ thiếu, rồi sinh alignment dạng ký tự giống response API → dùng chung `captionBlocks`/`markVocab`/`--from-alignment`. JSON ghi `manual: true`; cache theo `sha256("manual" + text + model + sha256(mp3))`.
