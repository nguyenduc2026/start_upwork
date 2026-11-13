# Tuần 1 — Khung dự án, đăng nhập JWT, hồ sơ & cài đặt

**Mục tiêu:** chạy được dự án theo cả 2 cách (thẳng trên máy và bằng Docker); đăng ký → xác minh email → đăng nhập → sửa hồ sơ, cài đặt chạy thật từ đầu tới cuối; CI xanh.

**Màn hình:** 1 (Đăng nhập / Đăng ký / Xác minh email / Quên + đặt lại mật khẩu), 14 (Hồ sơ & cài đặt). Khung chung: sidebar, header app (ô tìm kiếm, chuông, tài khoản — tìm kiếm và chuông để tạm, làm thật ở tuần 4 và 6).

**Thời lượng dự kiến:** ~20 giờ (tuần nặng vì dựng khung).

**Điều kiện bắt đầu:** đã xong [chuẩn bị](chuan-bi.md).

---

## 1. Hạ tầng (ngày 1–2)

**Backend**

- [ ] Tạo dự án ở start.spring.io: Spring Boot 4.x, Java 21, Maven. Dependency: Web, Security, OAuth2 Resource Server, Data JPA, Validation, Flyway, PostgreSQL, Mail, Thymeleaf, Actuator, WebSocket, Spring Modulith (core + jpa + events-jpa + test), springdoc-openapi, MapStruct, Testcontainers, Bucket4j.
- [ ] Tạo package theo overview mục 3: `shared`, `identity`, `client`, `pipeline`, `project`, `task`, `timetracking`, `reporting`, `notification`, `activity`, `realtime` (mỗi package có `package-info.java`; `shared` khai báo `@ApplicationModule(type = OPEN)`).
- [ ] `ModularityTests`: `ApplicationModules.of(TaskboardApplication.class).verify()` — chạy được ngay từ ngày đầu.
- [ ] `application.yml` + `application-dev.yml`, `-docker.yml`, `-uat.yml`; đọc `.env` bằng `spring.config.import=optional:file:.env[.properties]`; bật `spring.threads.virtual.enabled`, `spring.jpa.open-in-view=false`.
- [ ] `docker-compose.dev.yml`: `postgres:18` (volume, cổng 5432) + `mailpit` (1025, 8025). `.env.example` cho dev.
- [ ] Spotless (palantir-java-format) chạy trong `mvnw verify`.
- [ ] Docker: `docker/backend/Dockerfile`, `docker/frontend/Dockerfile`, `docker/nginx/default.conf`, `docker-compose.yml` (nginx, app, postgres, mailpit), `.env.docker.example`. Bản đơn giản, tối ưu ở tuần 8.

**Module `shared`**

- [ ] `web/`: `ApiException` + `ErrorCode`, `GlobalExceptionHandler` trả `ProblemDetail` có `code` và `errors` (theo overview mục 1), `PageResponse<T>` (`items, page, size, total`). Map lỗi validate → `VALIDATION_FAILED`, `DataIntegrityViolationException` → code theo tên constraint (bảng map để trống, thêm dần).
- [ ] `persistence/`: `BaseEntity` (`id`, `createdAt`, `updatedAt`), bật JPA auditing.
- [ ] `time/`: bean `Clock` (UTC), `UpworkWeek` (tuần chứa một `Instant`, chuỗi `2027-W03` ↔ khoảng `[thứ 2 00:00 UTC, thứ 2 tuần sau)`).
- [ ] `money/`: `Money` (cent, cộng, nhân phút × rate, trừ phí %), làm tròn `HALF_UP` về cent.
- [ ] `ordering/`: `FractionalIndex.between(a, b)` (dùng ở tuần 2, viết sẵn kèm test).
- [ ] `storage/`: interface `FileStorage` (`presignPut`, `presignGet`, `delete`) + bản S3 (SDK v2) + bản giả cho test.
- [ ] `security/`: `CurrentUser` (`id`, `timezone`) + `HandlerMethodArgumentResolver` đọc từ JWT.

**Frontend**

- [ ] Vite + React 19 + TS; proxy `/api`, `/ws` → `localhost:8080`. TanStack Router (file-based, plugin Vite) + TanStack Query, `react-i18next` (`locales/vi/*.json`), react-hook-form + zod.
- [ ] MUI + MUI X (Data Grid, Date Pickers adapter date-fns locale `vi`), `@fontsource/inter` (chỉ 400, 600).
- [ ] `theme/`: đưa toàn bộ token của [DESIGN.md](../DESIGN.md) mục 2–4 vào `createTheme` (`palette` + token riêng như `board`, `soft`, `line`), `spacing: 4`, `shape`, typography; `components.ts` ghi đè Button (cao 36), OutlinedInput (focus viền `primary` + quầng `ring`, không viền đôi), Select, Chip, Paper, Dialog, Pagination theo DESIGN mục 6. Chỉ theme sáng, nhưng khai báo qua `colorSchemes.light`.
- [ ] `components/common/`: `FormTextField`, `PageHeader`, `ConfirmDialog`, `EmptyState`, toast dùng chung (Snackbar dưới giữa, tự tắt ~2,6s).
- [ ] `openapi-typescript` + `openapi-fetch`: script `npm run gen:api` đọc `http://localhost:8080/v3/api-docs` → `lib/api/schema.d.ts`.
- [ ] ESLint + Prettier.

**CI** (`.github/workflows/ci.yml`)

- [ ] Job backend: `./mvnw verify` (Spotless + test Testcontainers + JaCoCo).
- [ ] Job frontend: `npm ci`, lint, `tsc --noEmit`, build.

## 2. Backend — Identity (ngày 2–4)

**Migration** `V1__identity_init.sql`: `users`, `user_settings`, `notification_preferences`, `refresh_tokens`, `email_tokens` (theo overview mục 4; loại thông báo theo [chuẩn bị](chuan-bi.md) mục 1).

**Migration** `V2__modulith_event_publication.sql`: bảng `event_publication` lấy đúng script PostgreSQL của bản Spring Modulith đang dùng; tắt tự tạo bảng (`spring.modulith.events.jdbc.schema-initialization.enabled=false`). Cần ngay tuần này vì `UserRegistered` dùng `@ApplicationModuleListener`.

**Bảo mật**

- [ ] Cặp khoá RSA trong `.env` (PEM); `JwtIssuer` dùng `NimbusJwtEncoder` (RS256, claim `sub` = user id, `tz`), resource server dùng `NimbusJwtDecoder` cùng public key. Lệnh tạo khoá ghi vào README.
- [ ] `SecurityConfig`: stateless, CSRF tắt cho `/api/**` (refresh cookie là `SameSite=Strict`), mở `/api/v1/auth/**`, `/actuator/health`, `/v3/api-docs/**`, `/swagger-ui/**`. Lỗi 401 cũng trả `ProblemDetail` code `UNAUTHENTICATED`.
- [ ] `RefreshCookie`: `HttpOnly; Secure; SameSite=Strict; Path=/api/v1/auth`, 7 ngày (dev chạy http nên `Secure` lấy từ cấu hình).
- [ ] `LoginRateLimiter` (Bucket4j, khoá theo email + IP): 5 lần sai / 15 phút → 429 `RATE_LIMITED`.

**API** (overview mục 5, nhóm Auth và Tài khoản)

- [ ] `POST /auth/register` → tạo user + `user_settings` mặc định → publish `UserRegistered` → listener gửi mail xác minh (template `verify-email`).
- [ ] `POST /auth/verify-email`, `POST /auth/resend-verification` (luôn trả 204).
- [ ] `POST /auth/login`: chưa xác minh → 403 `EMAIL_NOT_VERIFIED`; đúng → access token (15 phút) trong body + refresh cookie.
- [ ] `POST /auth/refresh`: rotation; token đã `revoked` mà bị gửi lại → thu hồi cả `family_id` (BR-02). `POST /auth/logout`.
- [ ] `POST /auth/forgot-password` (luôn 204), `POST /auth/reset-password` (token 30 phút, dùng 1 lần, thu hồi mọi refresh token).
- [ ] `GET/PUT /me`, `PUT /me/password`, `POST/DELETE /me/avatar` (presigned PUT lên `users/{id}/avatar/{uuid}`), `GET/PUT /me/settings`, `GET/PUT /me/notification-preferences`.
- [ ] `UserDirectory` (API công khai của module): `timezone(userId)`, `defaults(userId)` (rate, phí, giá connect).

## 3. Frontend (ngày 4–6)

Giao Codex từng màn theo prototype (mẫu prompt ở cuối file).

- [ ] `lib/auth.ts`: access token chỉ giữ trong bộ nhớ; lúc mở app gọi `/auth/refresh` để lấy lại phiên. `lib/api/client.ts`: middleware gắn token, gặp 401 thì refresh 1 lần (các request cùng lúc chờ chung 1 lần refresh) rồi thử lại, refresh lỗi → về `/login`.
- [ ] Layout `_auth` và `_app`. Guard bằng `beforeLoad`.
- [ ] Layout chính — sidebar 220 (logo, Hôm nay, Task của tôi; nhóm Làm việc: Pipeline job, Khách hàng, Timesheet, Báo cáo; nhóm Dự án: danh sách dự án có ô màu + key; khối tài khoản), header app 52. Lấy từ bất kỳ file prototype nào có sidebar, ví dụ `prototype/02-hom-nay.dc.html`.
- [ ] Màn 1 — `prototype/01-xac-thuc.dc.html` (prop `view`): đăng nhập, đăng ký, xác minh email, gửi lại email, quên mật khẩu, đặt lại mật khẩu.
- [ ] Màn 14 — `prototype/14-ho-so-cai-dat.dc.html` (prop `tab`): Hồ sơ (avatar, tên, múi giờ, ngôn ngữ), Mật khẩu, Mặc định Upwork (rate, phí %, giá connect, mục tiêu tuần, giờ gửi nhắc việc), Thông báo (bảng loại × trong app / email).
- [ ] Lỗi từ API (`errors`) hiện dưới từng ô qua `setError` của react-hook-form.

## 4. Test

- [ ] `support/TestcontainersConfiguration` (`@ServiceConnection` PostgreSQL 18), `Clock` cố định, `FileStorage` giả.
- [ ] Unit: `FractionalIndex`, `UpworkWeek` (ranh giới Chủ nhật 23:59:59 UTC / Thứ 2 00:00 UTC), `Money`.
- [ ] Tích hợp (MockMvcTester): đăng ký, xác minh, đăng nhập chưa xác minh / sai / đúng, khoá sau 5 lần sai, refresh rotation, dùng lại refresh token cũ → cả family bị thu hồi, quên + đặt lại mật khẩu, sửa hồ sơ, cài đặt.
- [ ] Playwright: cài đặt + test "đăng ký → đọc mail từ API Mailpit → xác minh → đăng nhập".

## 5. Xong tuần khi

- [ ] Clone repo → điền `.env` → `docker compose -f docker-compose.dev.yml up -d` → `./mvnw spring-boot:run` + `npm run dev` → đăng ký, đăng nhập được.
- [ ] `docker compose up --build` cũng chạy được luồng trên (Dockerfile backend, frontend, nginx đã có).
- [ ] Swagger UI mở được ở `/swagger-ui`; `npm run gen:api` sinh được kiểu.
- [ ] CI xanh, `ModularityTests` xanh.
- [ ] Màn 1 và 14 giống prototype.
- [ ] Đã cập nhật [tracker.md](tracker.md).

## Rủi ro

- Spring Boot 4 / Spring Security 7 mới, nhiều ví dụ trên mạng là bản cũ (`WebSecurityConfigurerAdapter`, `antMatchers`) → chỉ theo tài liệu chính thức của bản đang dùng.
- Refresh token + cookie mất thời gian hơn dự kiến → làm backend auth và test trước, UI sau.
- Theme MUI dễ bị chỉnh lặt vặt cả tuần → chỉ làm phần token và component dùng ở tuần này; component khác chỉnh khi gặp.

---

## Mẫu prompt giao Codex

```
Dựng màn <tên màn> theo prototype docs/prototype/<file>.dc.html.
- Prototype chỉ để tham khảo layout, style, dữ liệu mẫu. Cú pháp {{...}}, <x-dc>,
  <sc-if>, <sc-for>, support.js là của công cụ vẽ prototype — KHÔNG copy.
- Viết bằng React + TypeScript + MUI / MUI X theo cấu trúc frontend/src và quy tắc
  ở docs/overview.md mục 3. Quy tắc giao diện ở docs/DESIGN.md (đọc mục 9 Điều cấm).
- Màu, font, khoảng cách lấy từ theme (theme.palette, theme.spacing), không viết cứng.
- Bảng dữ liệu dùng AppDataGrid; ngày dùng DatePicker / DateTimePicker; không dùng
  select hay date picker mặc định của trình duyệt.
- Gọi API thật: <liệt kê endpoint>. Kiểu dữ liệu lấy từ lib/api/schema.d.ts.
  Gọi API trong features/<nghiệp vụ>/api.ts, dữ liệu tải bằng TanStack Query.
- Mọi text hiển thị lấy từ locales/vi/<file>.json.
```
