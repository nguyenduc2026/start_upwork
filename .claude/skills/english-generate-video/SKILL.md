---
name: english-generate-video
description: Tạo audio (ElevenLabs) và video có chữ chạy theo giọng đọc (Remotion) cho 1 bài học tiếng Anh trong english/ — đọc khối lesson-video và đoạn passage trong file bài. Dùng khi người dùng nói "tạo audio/video cho bài...", "làm video bài reading 01", hoặc /english-generate-video <file>.
argument-hint: "<đường dẫn file bài học> [--dry-run | --fake | --from-alignment] [--force]"
---

# Lesson Video

> **Dành cho cả Claude Code và Codex.** Nếu bạn là Codex: đọc toàn bộ file này và làm theo — không cần công cụ riêng nào của Claude.

Biến 1 bài học (reading / speaking / writing) thành:
1. **Audio** đọc đoạn văn — ElevenLabs Text-to-Speech, có **timestamp từng ký tự**
2. **Video** — Remotion: chữ hiển thị trên màn hình, **từ đang đọc được tô sáng** (kiểu karaoke), **từ vựng của bài được gạch chân** khi đọc tới — dùng để luyện nghe + shadowing

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
audio: english/audio/reading/reading-01.mp3
video: english/video/out/reading/reading-01.mp4
voice: auto                   # auto | male | female | <voice_id> — xem mục 3.3
speed: 0.9
-->
```

**b. Đoạn văn** giữa 2 marker:

```
<!-- passage:start -->
...văn bản, có thể có markdown nhẹ: **in đậm**, gạch đầu dòng "- ", danh sách "1. "...
<!-- passage:end -->
```

**c. (Không bắt buộc) Từ vựng:** bảng đầu tiên trong mục có tiêu đề chứa `Từ vựng trong bài` — lấy cột *Từ*, *Phiên âm*, *Nghĩa* (tối đa 8 dòng). Dùng cho 2 việc: **gạch chân trong đoạn văn** (mục 3.5) và **bảng ở cuối video**.

Không có khối metadata hoặc passage → dừng, báo người dùng chạy `/english-lesson upgrade <file>` trước.

---

## 2. Thiết lập lần đầu (chỉ làm 1 lần)

Kiểm tra `english/video/package.json`. Nếu **chưa có** → dựng project. Thư mục `english/video/` và file `.env` có thể đã tồn tại — **không ghi đè `.env`**.

### 2.1 Cấu trúc

**Mọi file đầu ra chia theo kỹ năng** = tên thư mục chứa bài học (`english/reading/...` → `reading`, `english/speaking/...` → `speaking`, …). `id` vẫn giữ dạng `<kỹ năng>-<NN>` và phải duy nhất. `preview` / `render` chỉ nhận `id`, tự tìm `data/<kỹ năng>/<id>.json`.

```
english/
├── audio/                      # mp3 thành phẩm (COMMIT vào git — tạo lại tốn credits)
│   ├── reading/reading-01.mp3
│   └── speaking/speaking-01.mp3
└── video/                      # project Remotion
    ├── package.json
    ├── .env                    # ELEVENLABS_API_KEY, VOICE_ID (KHÔNG commit)
    ├── .env.example
    ├── scripts/
    │   ├── tts.ts              # file bài → mp3 + data JSON
    │   ├── preview.ts          # render vài frame PNG để kiểm tra giao diện
    │   └── lesson.ts           # tts → preview → render trong 1 lệnh
    ├── data/<kỹ năng>/         # <id>.json + <id>.alignment.json gốc (COMMIT)
    ├── public/audio/<kỹ năng>/ # bản copy mp3 để Remotion dùng staticFile() (KHÔNG commit)
    ├── .whisper/               # whisper.cpp + model base.en cho chế độ thủ công (KHÔNG commit, tự tải lần đầu)
    ├── src/
    │   ├── index.ts            # registerRoot
    │   ├── Root.tsx            # <Composition id="LessonVideo" ... calculateMetadata>
    │   ├── font.ts             # loadFont (mục 4.3)
    │   └── LessonVideo/        # các scene + layout
    └── out/<kỹ năng>/          # <id>.mp4 + preview/<id>/*.png (KHÔNG commit)
```

`.env.example`:

```
ELEVENLABS_API_KEY=sk_...
# Danh sách voice ID cách nhau bằng dấu phẩy.
# Vị trí LẺ (1, 3, 5...) = giọng NAM, vị trí CHẴN (2, 4, 6...) = giọng NỮ.
VOICE_ID=male_1,female_1,male_2,female_2
```

### 2.2 Công nghệ & package

- Remotion — **bản ổn định mới nhất** (lấy bằng `npm view remotion version`; tại thời điểm viết là `4.0.542`)
- **Pin cứng version:** `remotion` và **mọi** `@remotion/*` cùng 1 version, **không có dấu `^`** (dùng `npm install --save-exact`)
- TypeScript, React; chạy script bằng `tsx`; đọc `.env` bằng `dotenv`
- Không thêm thư viện UI nặng — style bằng inline style

| Package | Dùng cho |
|---|---|
| `remotion`, `@remotion/cli` | Lõi + CLI render/studio |
| `@remotion/media` | `<Audio>` |
| `@remotion/captions` | Kiểu `Caption`, `createTikTokStyleCaptions` (bài speaking) |
| `@remotion/google-fonts` | Font Inter / Noto Sans |
| `@remotion/layout-utils` | Đo chữ để tính xuống dòng + cuộn |
| `@remotion/rough-notation` | Gạch chân từ vựng |

> Cần tra API chi tiết → đọc docs dạng Markdown: `https://www.remotion.dev/docs/<trang>.md` (vd. `captions/caption.md`, `text-highlights.md`, `layout-utils/fill-text-box.md`). Không cần cài bộ Remotion Agent Skills.

### 2.3 Lệnh trong `package.json`

| Lệnh | Việc làm |
|---|---|
| `npm run tts -- <file.md> [--dry-run \| --fake \| --from-alignment] [--force]` | Tạo mp3 + `data/<kỹ năng>/<id>.alignment.json` gốc + `data/<kỹ năng>/<id>.json`; `--fake` chỉ tạo timing giả; `--from-alignment` dựng lại JSON từ MP3/alignment đã lưu, không gọi API |
| `npm run preview -- <id>` | Render ~5 frame PNG vào `out/<kỹ năng>/preview/<id>/` để kiểm tra giao diện |
| `npm run render -- <id>` | `remotion render LessonVideo out/<kỹ năng>/<id>.mp4 --props=data/<kỹ năng>/<id>.json --codec=h264 --image-format=png --crf=16 --x264-preset=slow --color-space=bt709` (frame PNG thay JPEG mặc định để chữ nét) |
| `npm run lesson -- <file.md> [--dry-run \| --fake \| --from-alignment] [--force]` | `tts` → `preview` → `render`; `--dry-run` dừng sau kiểm tra; hai chế độ còn lại không gọi API |
| `npm run studio -- --props=data/<kỹ năng>/<id>.json` | Mở Remotion Studio để xem trước |
| `npm run paste -- <file.md>` | **Chế độ thủ công** (mục 7): ghi văn bản + thiết lập để dán lên web ElevenLabs. 0 credits API |
| `npm run align -- <file.md> [--force]` | **Chế độ thủ công**: mp3 tải từ web → Whisper trên máy lấy timing → `data/<kỹ năng>/<id>.json`. 0 credits |
| `npm run lesson -- <file.md> --manual` | `align` → `preview` → `render` |

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
- Mỗi dòng/đoạn **không kết thúc bằng dấu câu** (tiêu đề, gạch đầu dòng) → thêm dấu `.` để giọng đọc ngắt nghỉ, đánh dấu block `addedPeriod: true`. Giữ dấu này trong văn bản TTS/timing; khi hiển thị và đo layout, chỉ bỏ dấu `.` của từ cuối block đó. Dấu câu có sẵn giữ nguyên.
- Giữ cấu trúc để hiển thị: tách thành `blocks: [{ kind: "heading" | "bullet" | "numbered" | "text", text }]` (dòng chỉ gồm chữ in đậm = heading).
- Văn bản gửi đi TTS = nối các block bằng `\n`.

### 3.2 Kiểm soát credits (bắt buộc)

- In ra: số ký tự, credits ước tính (model `eleven_multilingual_v2` ≈ 1 credit/ký tự), **giọng sẽ dùng** (số thứ tự + nam/nữ).
- **> 2.000 ký tự → từ chối**, báo người dùng rút ngắn bài.
- `--dry-run` → chỉ in văn bản đã làm sạch + ước tính + giọng + danh sách từ vựng khớp được (mục 3.5), **không gọi API**.
- `--fake` → làm sạch văn bản, chọn giọng, khớp từ vựng và ghi `data/<kỹ năng>/<id>.json` như thật, nhưng **không gọi API, không tạo mp3**. Timing giả: mỗi từ 350ms, cộng 400ms nghỉ sau dấu câu. JSON ghi `audioSrc: null`, `fake: true`; component bỏ qua `<Audio>` khi `audioSrc` là null. Khi chạy TTS thật, JSON có `fake: true` luôn phải tạo lại, không dùng làm cache (kể cả có mp3 cũ). Nếu có cả `--dry-run` và `--fake`, `--dry-run` ưu tiên: không ghi file.
- **Cache:** tính `hash = sha256(text + voiceId + model + speed + voice_settings)`. Nếu `english/audio/<kỹ năng>/<id>.mp3` đã tồn tại và `data/<kỹ năng>/<id>.json` có cùng `hash` → bỏ qua, không gọi API. `--force` để tạo lại.
- Nếu giọng cache thật khác giọng chọn theo cấu hình hiện tại, in cảnh báo giữ giọng cũ bằng **vị trí** cũ/mới và hướng dẫn `--force` (tốn credits), kể cả dry-run; không log voice ID.
- `--from-alignment` → cần `english/audio/<kỹ năng>/<id>.mp3` và `data/<kỹ năng>/<id>.alignment.json`, bỏ qua cache JSON, dựng lại captions/từ vựng rồi ghi `data/<kỹ năng>/<id>.json` với `fake: false` và audioSrc thật; copy lại MP3 vào public. **Không gọi API, 0 credits**, không cần API key. Không kết hợp với `--fake` hoặc `--force`; nếu kèm `--dry-run` thì chỉ kiểm tra/in văn bản, không ghi file. Giữ metadata/VOICE_ID đúng với lần tạo MP3 gốc; alignment thô không lưu thông tin giọng/model/speed. Nếu có cache thật thì tiếp tục giữ giọng trong cache.

### 3.3 Chọn giọng (`VOICE_ID`)

Đọc `VOICE_ID` từ `english/video/.env`: tách theo dấu phẩy, bỏ khoảng trắng. **Vị trí lẻ = nam, vị trí chẵn = nữ** (đếm từ 1).

Lấy số bài `n` từ `id` (`reading-07` → `n = 7`; không có số → `n = sha256(id)` đổi ra số).

| `voice` trong metadata (lấy từ đầu tiên) | Pool giọng | Chọn |
|---|---|---|
| `auto` | Toàn bộ danh sách | `pool[(n - 1) % pool.length]` → bài liên tiếp đổi giọng, xen kẽ nam/nữ |
| `male` | Các giọng vị trí lẻ | `pool[(n - 1) % pool.length]` |
| `female` | Các giọng vị trí chẵn | `pool[(n - 1) % pool.length]` |
| Chuỗi giống voice ID (≥ 15 ký tự chữ-số) | — | Dùng thẳng ID đó |

- Chọn **cố định theo bài** (không random mỗi lần chạy) → chạy lại cùng bài ra đúng giọng cũ → cache vẫn khớp, **0 credits**.
- Pool rỗng (vd. `male` nhưng chỉ có 1 ID) → dùng toàn bộ danh sách, in cảnh báo.
- Ghi `voiceId` và `voiceIndex` (vị trí 1-based trong `VOICE_ID`) vào `data/<kỹ năng>/<id>.json`.
- Thêm / đổi thứ tự giọng trong `VOICE_ID` làm đổi giọng của các bài **chưa tạo**; bài đã tạo giữ nguyên vì mp3 đã có — chỉ tạo lại khi `--force`.
- Khi giọng chọn theo cấu hình khác giọng giữ lại, cảnh báo: `Giữ giọng cũ (vị trí X) vì audio đã có. Giọng theo cấu hình hiện tại: vị trí Y. Dùng --force để tạo lại (tốn credits).` Vị trí ngoài danh sách ghi rõ `ngoài danh sách`.

### 3.4 Gọi ElevenLabs

```
POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}/with-timestamps?output_format=mp3_44100_128
Headers: xi-api-key: $ELEVENLABS_API_KEY, Content-Type: application/json
Body:
{
  "text": "<văn bản đã làm sạch>",
  "model_id": "eleven_multilingual_v2",
  "voice_settings": { "stability": 0.4, "similarity_boost": 0.75, "style": 0.3, "use_speaker_boost": true, "speed": <speed từ metadata> }
}
```

Response có `audio_base64` và `alignment` (`characters[]`, `character_start_times_seconds[]`, `character_end_times_seconds[]`).

> Đối chiếu tài liệu ElevenLabs mới nhất nếu API trả lỗi (tên model, giới hạn `speed`, định dạng response).

API key và voice ID chỉ đọc từ biến môi trường / `english/video/.env`. **Không bao giờ** ghi API key vào file nào khác, log, hay commit.

### 3.5 Ghép thành từ (định dạng `Caption`) + đánh dấu từ vựng

Mỗi từ lưu theo kiểu [`Caption`](https://www.remotion.dev/docs/captions/caption.md) của `@remotion/captions`, thêm 1 trường riêng `vocab`:

```ts
type LessonCaption = Caption & { vocab?: number }; // vocab = chỉ số trong mảng vocab
// Caption = { text, startMs, endMs, timestampMs, confidence, pageBreakAfter? }
```

**Ghép ký tự → từ:**
- Duyệt văn bản đã gửi TTS (đúng chuỗi đó, không phải bản gốc), tách theo khoảng trắng / `\n`.
- `text`: từ đầu tiên của cả bài **không** có dấu cách đầu; mọi từ sau có **1 dấu cách đầu** (`" word"`) — `createTikTokStyleCaptions` cần quy ước này.
- `startMs`: thời điểm bắt đầu **chữ cái đầu tiên** của từ. **Không** lấy thời điểm của khoảng trắng phía trước: ElevenLabs TTS dồn khoảng nghỉ (sau `.` `,` và xuống dòng) vào khoảng trắng, nên lấy theo khoảng trắng sẽ làm từ tiếp theo sáng lên **sớm 0.4–0.7s** trước khi giọng đọc tới. Trong khoảng nghỉ, renderer giữ nguyên từ trước đó → vẫn liền mạch, không chớp tắt.
- `endMs`: kết thúc ký tự cuối. `timestampMs = (startMs + endMs) / 2`, `confidence: null`.
- Nếu alignment chuẩn hoá khoảng trắng/xuống dòng, ánh xạ lại theo thứ tự ký tự **không phải khoảng trắng**. Chỉ chấp nhận khi các ký tự đó giống hoàn toàn; nếu khoảng trắng trước từ bị bỏ, lấy cuối ký tự trước làm startMs. Ký tự thật lệch hoặc timestamp sai → dừng ghép timing, giữ audio/alignment đã lưu.
- `pageBreakAfter: true` cho từ kết thúc bằng `.` `?` `!` và từ cuối mỗi block.

**Đánh dấu từ vựng** (`vocab`):
- Chuẩn hoá mục từ vựng: bỏ phần trong ngoặc `(v)`, `(n)`…; tách các biến thể theo `/` hoặc `,`; chữ thường.
- So khớp **trong cùng 1 block**, từ vựng nhiều chữ phải khớp các từ **liên tiếp**. So sánh sau khi bỏ dấu câu 2 đầu, chữ thường, đổi `’` → `'`.
- Chấp nhận biến thể đơn giản: `+s/es/ed/d/ing/ly`, bỏ `e` + `ing`, `y` → `ies/ied`.
- Ưu tiên các biến thể/cụm nhiều từ hơn trước, giữ chỉ số vocab gốc. Không ghi đè caption đã có occurrence; khớp một cụm xong nhảy qua hết cụm đó. Các cụm bằng độ dài ưu tiên thứ tự từ vựng gốc.
- Gạch chân **mọi lần xuất hiện**. Từ vựng không tìm thấy trong passage → in cảnh báo (không lỗi) — vẫn hiện ở bảng cuối video.

### 3.6 Ghi kết quả

1. Ngay khi nhận response hợp lệ, **trước khi ghép captions**: decode `audio_base64` → ghi `english/audio/<kỹ năng>/<id>.mp3`, copy sang `english/video/public/audio/<kỹ năng>/<id>.mp3`; ghi nguyên alignment vào `english/video/data/<kỹ năng>/<id>.alignment.json` (chỉ alignment, không chứa `audio_base64`).
2. Sau khi đã lưu mới ghép timing. Nếu lỗi: báo `Audio đã lưu tại <đường dẫn>, alignment không khớp văn bản...`, **không ghi/ghi đè `data/<kỹ năng>/<id>.json`**; sửa văn bản/alignment rồi chạy `--from-alignment` để khôi phục miễn phí. Chế độ fake không tạo MP3/alignment gốc.
3. Chỉ sau khi ghép timing thành công mới ghi `english/video/data/<kỹ năng>/<id>.json`; block có trường `addedPeriod` để ẩn dấu chấm tổng hợp khi render:

```json
{
  "id": "reading-01",
  "type": "reading",
  "title": "...",
  "hash": "...",
  "model": "eleven_multilingual_v2",
  "voiceId": "...",
  "voiceIndex": 1,
  "speed": 0.9,
  "durationSeconds": 95.4,
  "audioSrc": "audio/reading/reading-01.mp3",
  "blocks": [
    {
      "kind": "heading",
      "captions": [
        { "text": "Laravel", "startMs": 120, "endMs": 550, "timestampMs": 335, "confidence": null },
        { "text": " startup", "startMs": 550, "endMs": 980, "timestampMs": 765, "confidence": null, "vocab": 0, "pageBreakAfter": true }
      ]
    }
  ],
  "vocab": [{ "word": "startup", "ipa": "/ˈstɑːrtʌp/", "meaning": "công ty khởi nghiệp" }]
}
```

---

## 4. Bước render (Remotion)

### 4.1 Thông số

- 1920×1080, 30 fps
- Props = nội dung `data/<kỹ năng>/<id>.json` (truyền bằng `--props`)
- `calculateMetadata`:
  - `durationInFrames = ceil((3 + durationSeconds + 1 + 6) × fps)` (intro 3s + audio + đệm 1s + outro 6s)
  - `defaultOutName: props.id`
- Audio: `<Audio from={3 * fps} src={staticFile(audioSrc)} />` (`Audio` từ `@remotion/media`)
- Thời gian hiện tại trong audio: `tMs = (frame - 3 * fps) / fps * 1000`. Từ đang đọc = caption có `startMs ≤ tMs < endMs`; rơi vào khoảng trống → giữ từ trước đó.

### 4.2 Các scene

| Scene | Thời lượng | Nội dung |
|---|---|---|
| Intro | 3s | Nhãn loại bài (`READING 01`), tiêu đề, dòng nhỏ "Listen first. Then read along." |
| Main | độ dài audio + 1s | Văn bản theo `blocks`; từ đang đọc tô sáng; từ vựng gạch chân; tự cuộn; thanh tiến độ ở đáy |
| Outro | 6s | Bảng từ vựng (word · IPA · meaning), tối đa 8 dòng, cột word cùng màu gạch chân. Không có vocab → màn "Now try shadowing!" |

Cắt cảnh thẳng, **không** dùng transition.

**Theo `type`:**
- `reading` / `writing`: hiển thị cả đoạn, cuộn dần (mục 4.4).
- `speaking`: mỗi lần hiện **1 câu** cỡ chữ lớn ở giữa màn hình. Nối captions các block thành 1 mảng → `createTikTokStyleCaptions({ captions, combineTokensWithinMilliseconds: 1e9 })` → mỗi `page` là 1 câu (chỉ ngắt theo `pageBreakAfter`). Page đang hiện: `startMs ≤ tMs < startMs + durationMs`; tô sáng theo `tokens[].fromMs/toMs`.

### 4.3 Font (`src/font.ts`)

Dùng `@remotion/google-fonts` — tự chặn render tới khi font tải xong:

```ts
import { loadFont } from "@remotion/google-fonts/Inter";
export const { fontFamily, waitUntilDone } = loadFont("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin", "latin-ext", "vietnamese"], // vietnamese cho cột nghĩa
});
```

Cột IPA dùng `@remotion/google-fonts/NotoSans` (subsets `latin`, `latin-ext`) vì Inter thiếu một số ký tự IPA. Kiểm tra bằng ảnh preview.

### 4.4 Xuống dòng + cuộn (`@remotion/layout-utils`)

Không đo DOM. Sau `waitUntilDone()`, tính layout 1 lần (`useMemo`):
- Mỗi block: `fillTextBox({ maxBoxWidth: <bề rộng vùng chữ>, maxLines: 1000 })`, `add()` lần lượt từng từ với **đúng** `fontFamily`, `fontSize`, `fontWeight` sẽ render → biết từ nào bắt đầu dòng mới → gán `lineIndex` cho từng từ.
- `y` của mỗi dòng = cộng dồn `lineHeight` + khoảng cách giữa các block (heading cao hơn).
- Cuộn: dòng chứa từ đang đọc nằm ở ~1/3 trên màn hình; khi đổi dòng, `interpolate` vị trí trong 8 frame (clamp) để cuộn mượt.
- Vùng chữ dùng `outline` thay `border` / không padding trong phần tử đo, để khớp với kết quả đo.

### 4.5 Gạch chân từ vựng (`@remotion/rough-notation`)

- Các từ liên tiếp có cùng `vocab` (cùng 1 lần xuất hiện) bọc chung trong 1 `<Underline>`.
- `progress = interpolate(frame, [startFrame, endFrame], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })` với `startFrame`/`endFrame` = thời điểm bắt đầu từ đầu / kết thúc từ cuối của cụm (đã cộng 3s intro) → nét gạch được **vẽ đúng lúc giọng đọc tới từ đó**, rồi giữ nguyên.
- Màu gạch chân khác màu tô sáng (vd. tô sáng `#38bdf8`, gạch chân `#facc15`). Ô tô sáng và nét gạch không che nhau.

### 4.6 Giao diện

- Nền tối dịu (`#0f172a`), chữ sáng; từ đã đọc màu chữ bình thường, từ chưa đọc mờ hơn (opacity ~0.45), từ đang đọc có nền màu nhấn
- Cỡ chữ ≥ 44px cho phần đọc, heading lớn hơn; bài speaking ~64px
- Bullet hiển thị dấu `•`, danh sách số giữ số thứ tự
- Tối giản, không hiệu ứng thừa — mục đích là **học**, không phải quảng cáo
- Dấu cách trước từ nằm ngoài span có background. Span chữ có padding ngang 6px và margin ngang -6px để ô tô sáng ôm chữ mà không đổi độ rộng/xuống dòng đo bằng `fillTextBox`, cho cả reading và speaking.

---

## 5. Quy trình mỗi lần chạy

1. Đọc file bài học → kiểm tra khối metadata + passage (mục 1).
2. Chưa có project → làm mục 2.
3. Chạy `npm run tts -- <file> --dry-run`, báo người dùng: số ký tự, credits ước tính, giọng sẽ dùng, từ vựng khớp / không khớp.
4. Chạy `npm run tts -- <file>` (thêm `--force` nếu người dùng yêu cầu tạo lại).
5. Chạy `npm run preview -- <id>`: render frame PNG tại intro (1.5s), đầu phần chính (+2s), giữa phần chính, gần cuối phần chính, outro (+3s) — dùng `remotion render LessonVideo out/preview/<id> --props=data/<kỹ năng>/<id>.json --frames=<a>,<b>,... --image-format=png`. **Mở xem các ảnh** và kiểm tra: chữ không tràn / không bị cắt, có từ đang tô sáng, có gạch chân từ vựng, font tiếng Việt + IPA hiện đúng. Lỗi → sửa code, preview lại (không tốn credits).
6. Chạy `npm run render -- <id>`.
7. Kiểm tra: file mp3 và mp4 tồn tại, thời lượng video ≈ audio + 10s.
8. Báo kết quả: đường dẫn mp3, mp4, giọng đã dùng (số thứ tự, nam/nữ), credits đã dùng (hoặc "dùng lại cache, 0 credits").

## 6. Lỗi thường gặp

| Lỗi | Xử lý |
|---|---|
| Thiếu `ELEVENLABS_API_KEY` | Báo người dùng tạo `english/video/.env` theo `.env.example` |
| `api_key_id_used_as_api_key` | Đang dán **Key ID** chứ không phải key — key thật bắt đầu bằng `sk_` |
| Thiếu `VOICE_ID` | Báo người dùng lấy voice ID trong ElevenLabs Voice Library, điền vào `.env` theo thứ tự nam, nữ, nam, nữ… |
| 401 / 403 từ API | In HTTP status + `detail.status`/`detail.code` + `detail.message` tối đa 200 ký tự (đọc JSON an toàn, che key/voice ID; không log headers/request body). Ví dụ `ElevenLabs HTTP 401 (api_key_id_used_as_api_key): ...`. Không thử lại liên tục |
| 429 / hết credits / chạm credit limit của key | Dừng, báo người dùng — **không** tự đổi sang model đắt hơn |
| Từ không khớp timing (lệch) | Khoảng trắng/xuống dòng khác được ánh xạ lại; ký tự thật khác thì dừng. Audio + `.alignment.json` đã lưu trước đó được giữ; không ghi JSON timing. Sửa văn bản/alignment rồi chạy `npm run tts -- <file.md> --from-alignment`, không gọi API lại |
| Thiếu MP3 hoặc `.alignment.json` khi khôi phục | Báo thiếu file và dừng; không tự gọi API. Cần cả hai file gốc |
| Đổi giọng metadata nhưng audio đã có | Cảnh báo vị trí giọng cũ/mới kể cả dry-run. Dùng `--force` nếu muốn tạo lại có tốn credits |
| API trả body không phải JSON | Vẫn báo HTTP status, dùng thông báo tổng quát; không in body thô |
| Lỗi version Remotion không khớp | Mọi `remotion` / `@remotion/*` phải cùng 1 version chính xác |
| Ô vuông thay cho ký tự IPA / tiếng Việt | Thiếu subset font — xem mục 4.3 |
| `Audio bài này tạo thủ công trên web` | `tts` từ chối gọi API để không ghi đè mp3 làm tay. Dùng `npm run align`; muốn thay bằng API thì `--force` |
| Whisper tải lỗi lần đầu | Cần mạng để tải whisper.cpp (Windows: bản dựng sẵn ≤ 1.6.0, dùng 1.5.5) và model `base.en` (~150 MB) vào `.whisper/` |

---

## 7. Chế độ thủ công: dán lên web ElevenLabs (account free) + Whisper

Dùng khi muốn tạo giọng bằng **trang web ElevenLabs** (vd. account free 10.000 credits/tháng) thay vì gọi API. Web chỉ cho tải mp3, **không có timing từng ký tự** → lấy timing bằng **Whisper chạy trên máy** (`@remotion/install-whisper-cpp`, miễn phí, offline sau lần tải đầu).

### 7.1 Quy trình

1. `npm run paste -- <file.md>` → ghi `out/<kỹ năng>/paste/<id>.txt` (chỉ văn bản đã làm sạch — Ctrl+A để copy) và `<id>.md` (hướng dẫn): giọng (vị trí + voice ID, chọn theo mục 3.3), model **Eleven Multilingual v2**, Speed / Stability / Similarity / Style / Speaker boost **giống hệt** thông số API (mục 3.4), số ký tự, nơi lưu mp3.
2. Người dùng dán lên web → Generate → Download MP3 → lưu thành `english/audio/<kỹ năng>/<id>.mp3`.
3. `npm run align -- <file.md>`:
   - Lần đầu tự cài whisper.cpp **1.5.5** (Windows chỉ có bản dựng sẵn ≤ 1.6.0) + model `base.en` vào `english/video/.whisper/`. Đổi model bằng biến môi trường `WHISPER_MODEL`.
   - Đổi mp3 → WAV 16 kHz mono bằng `remotion ffmpeg` (ffmpeg đi kèm Remotion).
   - `transcribe({ tokenLevelTimestamps: true, language: 'en' })` → lấy **`t_dtw` − 120 ms** làm thời điểm bắt đầu mỗi token; token không có dấu cách đầu nối vào từ trước; bỏ token `[...]`.
   - Ghép từ Whisper với văn bản bài bằng edit distance trên chuỗi từ (`&` ≈ `and`); từ Whisper nghe sai / bỏ sót → nội suy thời gian giữa 2 từ khớp lân cận, luôn tăng dần.
   - Sinh **alignment dạng ký tự giống response API** → ghi `data/<kỹ năng>/<id>.alignment.json`, rồi dùng chung `captionBlocks` / `markVocab` → `data/<kỹ năng>/<id>.json` với `manual: true`, `model: "manual:eleven_multilingual_v2+whisper:<model>"`.
   - Cache: `hash = sha256("manual" + text + whisperModel + sha256(mp3))` — mp3 / văn bản không đổi thì bỏ qua (`--force` để chạy lại).
4. `npm run studio` / `npm run render -- <id>` như bình thường. Hoặc gộp: `npm run lesson -- <file.md> --manual`.

### 7.2 Độ chính xác (đo thực tế)

Đo trên reading-01, so với timing chính xác của API trên **cùng 1 mp3** (211 từ):

| Cách lấy thời điểm | Lệch trung vị | 90% từ lệch dưới | Từ sáng **sớm** hơn giọng > 150 ms |
|---|---|---|---|
| `offsets` của Whisper (mặc định `toCaptions`) | 139 ms | 515 ms (max 1 s) | 7 |
| `t_dtw` | 123 ms | 282 ms | 0 |
| **`t_dtw` − 120 ms (đang dùng)** | **49 ms** | **162 ms** | **0** |

Model `small.en` (~490 MB) không chính xác hơn `base.en` → giữ `base.en`.

### 7.3 Bảo vệ audio làm tay

- `data/<id>.json` có `manual: true` + mp3 tồn tại → `npm run tts` **từ chối gọi API** (tránh ghi đè mp3 + tốn credits). `--force` để thay bằng audio API.
- `--from-alignment` vẫn dùng được (alignment đã lưu).

### 7.4 Điều khoản account free (ElevenLabs)

- Chỉ **1 account free mỗi người / IP**; không tạo nhiều account free để lấy thêm credits.
- Gói free **không có license thương mại** → chỉ dùng học cá nhân.
- **Công bố công khai** (repo GitHub public, link chia sẻ công khai) nội dung tạo từ gói free → ghi "elevenlabs.io" trong tiêu đề. Để local / Drive riêng / repo private thì không cần.
