---
name: lesson-video
description: Tạo audio (ElevenLabs) và video có chữ chạy theo giọng đọc (Remotion) cho 1 bài học tiếng Anh trong english/ — đọc khối lesson-video và đoạn passage trong file bài. Dùng khi người dùng nói "tạo audio/video cho bài...", "làm video bài reading 01", hoặc /lesson-video <file>.
argument-hint: "<đường dẫn file bài học> [--dry-run] [--force]"
---

# Lesson Video

> **Dành cho cả Claude Code và Codex.** Nếu bạn là Codex: đọc toàn bộ file này và làm theo — không cần công cụ riêng nào của Claude.

Biến 1 bài học (reading / speaking / writing) thành:
1. **Audio** đọc đoạn văn — ElevenLabs Text-to-Speech, có **timestamp từng ký tự**
2. **Video** — Remotion: chữ hiển thị trên màn hình, **từ đang đọc được tô sáng** (kiểu karaoke), dùng để luyện nghe + shadowing

Đối số: `$ARGUMENTS`

---

## 1. Đầu vào: định dạng trong file bài học

Mỗi bài cần audio/video có 2 thành phần (do skill `english-lesson` tạo sẵn):

**a. Khối metadata** (comment HTML):

```
<!-- lesson-video
id: reading-01
type: reading                 # reading | speaking | writing
title: "Job Post: Laravel & React Developer for a Ticketing Platform"
audio: english/audio/reading-01.mp3
video: english/video/out/reading-01.mp4
voice: female, American, calm # từ đầu tiên (female/male) dùng để chọn voice
speed: 0.9
-->
```

**b. Đoạn văn** giữa 2 marker:

```
<!-- passage:start -->
...văn bản, có thể có markdown nhẹ: **in đậm**, gạch đầu dòng "- ", danh sách "1. "...
<!-- passage:end -->
```

**c. (Không bắt buộc) Từ vựng:** bảng đầu tiên trong mục có tiêu đề chứa `Từ vựng trong bài` — lấy cột *Từ*, *Phiên âm*, *Nghĩa* (tối đa 8 dòng) để hiện ở cuối video.

Không có khối metadata hoặc passage → dừng, báo người dùng chạy `/english-lesson upgrade <file>` trước.

---

## 2. Thiết lập lần đầu (chỉ làm 1 lần)

Kiểm tra `english/video/package.json`. Nếu **chưa có** → dựng project:

### 2.1 Cấu trúc

```
english/
├── audio/                      # mp3 thành phẩm (COMMIT vào git — tạo lại tốn credits)
└── video/                      # project Remotion
    ├── package.json
    ├── .env                    # ELEVENLABS_API_KEY=...  (KHÔNG commit)
    ├── .env.example
    ├── voices.json             # { "female": "<voice_id>", "male": "<voice_id>" }
    ├── scripts/
    │   ├── tts.ts              # file bài → mp3 + data JSON
    │   └── lesson.ts           # tts + render trong 1 lệnh
    ├── data/                   # <id>.json — timing từng từ (COMMIT)
    ├── public/audio/           # bản copy mp3 để Remotion dùng staticFile() (KHÔNG commit)
    ├── src/
    │   ├── index.ts            # registerRoot
    │   ├── Root.tsx            # <Composition id="LessonVideo" ... calculateMetadata>
    │   └── LessonVideo/        # các scene
    └── out/                    # mp4 (KHÔNG commit)
```

### 2.2 Công nghệ

- Remotion (bản ổn định mới nhất), TypeScript, React
- Chạy script bằng `tsx`
- Đọc `.env` bằng `dotenv`
- Không thêm thư viện UI nặng — style bằng inline style / CSS đơn giản

### 2.3 Lệnh trong `package.json`

| Lệnh | Việc làm |
|---|---|
| `npm run tts -- <file.md> [--dry-run] [--force]` | Tạo mp3 + `data/<id>.json` |
| `npm run render -- <id>` | Render `out/<id>.mp4` từ `data/<id>.json` |
| `npm run lesson -- <file.md> [--force]` | `tts` rồi `render` |
| `npm run studio` | Mở Remotion Studio để xem trước |

### 2.4 `.gitignore` (ở root repo)

```
english/video/node_modules/
english/video/out/
english/video/public/audio/
english/video/.env
```

---

## 3. Bước TTS (`scripts/tts.ts`)

### 3.1 Làm sạch văn bản

Từ đoạn passage:
- Bỏ ký hiệu markdown: `**`, `*`, `` ` ``, `#`. Gạch đầu dòng `- ` → bỏ dấu, giữ câu.
- Mỗi dòng/đoạn **không kết thúc bằng dấu câu** (tiêu đề, gạch đầu dòng) → thêm dấu `.` để giọng đọc ngắt nghỉ.
- Giữ cấu trúc để hiển thị: tách thành `blocks: [{ kind: "heading" | "bullet" | "numbered" | "text", text }]` (dòng chỉ gồm chữ in đậm = heading).
- Văn bản gửi đi TTS = nối các block bằng `\n`.

### 3.2 Kiểm soát credits (bắt buộc)

- In ra: số ký tự, credits ước tính (model Flash ≈ 0.5 credit/ký tự).
- **> 2.000 ký tự → từ chối**, báo người dùng rút ngắn bài.
- `--dry-run` → chỉ in văn bản đã làm sạch + ước tính, **không gọi API**.
- **Cache:** tính `hash = sha256(text + voiceId + model + speed)`. Nếu `english/audio/<id>.mp3` đã tồn tại và `data/<id>.json` có cùng `hash` → bỏ qua, không gọi API. `--force` để tạo lại.

### 3.3 Gọi ElevenLabs

```
POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}/with-timestamps?output_format=mp3_44100_128
Headers: xi-api-key: $ELEVENLABS_API_KEY, Content-Type: application/json
Body:
{
  "text": "<văn bản đã làm sạch>",
  "model_id": "eleven_flash_v2_5",
  "voice_settings": { "stability": 0.5, "similarity_boost": 0.75, "speed": <speed từ metadata> }
}
```

Response có `audio_base64` và `alignment` (`characters[]`, `character_start_times_seconds[]`, `character_end_times_seconds[]`).

> Đối chiếu tài liệu ElevenLabs mới nhất nếu API trả lỗi (tên model, giới hạn `speed`, định dạng response).

- `voice_id`: lấy từ `voices.json` theo từ đầu tiên của trường `voice` (`female` / `male`).
- API key chỉ đọc từ biến môi trường / `english/video/.env`. **Không bao giờ** ghi key vào file nào khác, log, hay commit.

### 3.4 Ghi kết quả

1. Decode `audio_base64` → ghi `english/audio/<id>.mp3`, copy sang `english/video/public/audio/<id>.mp3`.
2. Ghép ký tự thành **từ**: duyệt văn bản, tách theo khoảng trắng, mỗi từ lấy `start` = thời điểm bắt đầu ký tự đầu, `end` = thời điểm kết thúc ký tự cuối.
3. Ghi `english/video/data/<id>.json`:

```json
{
  "id": "reading-01",
  "type": "reading",
  "title": "...",
  "hash": "...",
  "model": "eleven_flash_v2_5",
  "voiceId": "...",
  "speed": 0.9,
  "durationSeconds": 95.4,
  "audioSrc": "audio/reading-01.mp3",
  "blocks": [
    { "kind": "heading", "words": [{ "text": "Laravel", "start": 0.12, "end": 0.55 }] }
  ],
  "vocab": [{ "word": "startup", "ipa": "/ˈstɑːrtʌp/", "meaning": "công ty khởi nghiệp" }]
}
```

---

## 4. Bước render (Remotion)

### 4.1 Thông số

- 1920×1080, 30 fps
- `calculateMetadata`: `durationInFrames = ceil((3 + durationSeconds + 1 + 6) × fps)` (intro 3s + audio + đệm 1s + outro 6s)
- Audio bắt đầu ở giây thứ 3 (sau intro): `<Sequence from={3*fps}><Audio src={staticFile(audioSrc)} /></Sequence>`

### 4.2 Các scene

| Scene | Thời lượng | Nội dung |
|---|---|---|
| Intro | 3s | Nhãn loại bài (`READING 01`), tiêu đề, dòng nhỏ "Listen first. Then read along." |
| Main | độ dài audio + 1s | Văn bản theo `blocks`; **từ đang đọc tô sáng** (nền màu nhấn), từ đã đọc màu chữ bình thường, từ chưa đọc mờ hơn; tự cuộn để dòng đang đọc luôn ở khoảng 1/3 trên màn hình; thanh tiến độ ở đáy |
| Outro | 6s | Bảng từ vựng (word · IPA · meaning), tối đa 8 dòng. Không có vocab → màn "Now try shadowing!" |

**Theo `type`:**
- `reading`: hiển thị cả đoạn, cuộn dần (như trên)
- `speaking`: mỗi lần hiện **1 câu** cỡ chữ lớn ở giữa màn hình, chuyển câu theo timing

### 4.3 Giao diện

- Nền tối dịu (ví dụ `#0f172a`), chữ sáng, màu nhấn 1 màu duy nhất cho từ đang đọc
- Font sans-serif dễ đọc, cỡ chữ ≥ 44px cho phần đọc, heading lớn hơn
- Bullet hiển thị dấu `•`
- Tối giản, không hiệu ứng thừa — mục đích là **học**, không phải quảng cáo

---

## 5. Quy trình mỗi lần chạy

1. Đọc file bài học → kiểm tra khối metadata + passage (mục 1).
2. Chưa có project → làm mục 2.
3. Chạy `npm run tts -- <file> --dry-run`, báo người dùng số ký tự + credits ước tính.
4. Chạy `npm run lesson -- <file>` (thêm `--force` nếu người dùng yêu cầu tạo lại).
5. Kiểm tra: file mp3 và mp4 tồn tại, thời lượng video ≈ audio + 10s.
6. Báo kết quả: đường dẫn mp3, mp4, credits đã dùng (hoặc "dùng lại cache, 0 credits").

## 6. Lỗi thường gặp

| Lỗi | Xử lý |
|---|---|
| Thiếu `ELEVENLABS_API_KEY` | Báo người dùng tạo `english/video/.env` theo `.env.example` |
| `voices.json` chưa có voice_id | Báo người dùng lấy voice_id trong ElevenLabs Voice Library rồi điền vào |
| 401 / 403 từ API | Key sai hoặc hết hạn — không thử lại liên tục |
| 429 / hết credits | Dừng, báo người dùng — **không** tự đổi sang model đắt hơn |
| Từ không khớp timing (lệch) | Kiểm tra bước tách từ dùng đúng văn bản đã gửi đi TTS |
