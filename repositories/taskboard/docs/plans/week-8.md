# Tuần 8 — Deploy AWS, README, video demo, hoàn thiện giao diện

**Mục tiêu:** có link UAT chạy thật trên AWS (vừa là bản demo, vừa dùng thật hằng ngày), README và video đủ để đưa vào hồ sơ Upwork.

**Thời lượng dự kiến:** ~18 giờ.

---

## 1. Deploy UAT (ngày 1–3)

Ngân sách UAT khoảng $15/tháng (overview mục 1). Trước khi deploy: `docker compose up --build` + chạy Playwright với bản Docker trên máy; có lỗi thì không deploy.

- [ ] `docker/backend/Dockerfile`: multi-stage, build bằng `mvnw`, chạy trên `eclipse-temurin:21-jre`, layered jar, user không phải root; healthcheck `/actuator/health`.
- [ ] `docker/frontend/Dockerfile` + `docker/nginx/default.conf`: phục vụ `dist/`, `/api` và `/ws` (có upgrade) → `app:8080`, cache dài cho file có hash, gzip.
- [ ] `docker-compose.uat.yml`: image từ GHCR, không có mailpit, thêm container `backup`; PostgreSQL chỉ mở trong mạng nội bộ.
- [ ] EC2 t4g.small (arm64), Elastic IP, Security Group chỉ mở 22 (IP của mình), 80, 443. Cài Docker + compose plugin.
- [ ] `.env` UAT: profile `uat`, bucket `taskboard-uat`, SES SMTP, khoá JWT riêng (không dùng lại khoá dev), log JSON có request id.
- [ ] Domain → Elastic IP; HTTPS bằng Let's Encrypt (certbot, tự gia hạn). Thêm domain UAT vào CORS của bucket `taskboard-uat`.
- [ ] `docker/backup/backup.sh`: `pg_dump` → gzip → S3 (`taskboard-uat/backups/`), giữ 14 bản gần nhất; chạy hằng đêm. **Thử khôi phục 1 lần** vào DB trống trên máy.
- [ ] `.github/workflows/deploy-uat.yml`: khi merge vào `main` và CI xanh → build image arm64 (buildx) → push GHCR → SSH vào EC2 → `docker compose pull && up -d` (Flyway tự chạy khi app khởi động). GitHub Secrets: SSH key, host, token GHCR.
- [ ] Kiểm tra AWS Budget vẫn cảnh báo đúng ngưỡng.

## 2. README + tài liệu (ngày 4)

README là thứ khách Upwork đọc đầu tiên → viết bằng **tiếng Anh**:

- [ ] Giới thiệu 3 dòng + ảnh chụp các màn chính + link UAT + tài khoản demo (dữ liệu mẫu riêng, không dùng tài khoản thật của mình).
- [ ] Sơ đồ module sinh từ Spring Modulith (tuần 7), sơ đồ triển khai (nginx → app → PostgreSQL, S3, SES).
- [ ] Mục "Technical highlights" theo overview mục 8: modular monolith + event lưu bền, fractional index, optimistic lock + realtime, ràng buộc trong PostgreSQL, phiên đăng nhập an toàn, múi giờ + tuần Upwork, hợp đồng OpenAPI, báo cáo SQL thuần. Mỗi mục trỏ tới file test tương ứng.
- [ ] Hướng dẫn chạy local (dev hằng ngày và Docker), tạo khoá JWT, chạy test.
- [ ] Seeder dữ liệu demo (profile `demo`): 3 khách, 3 dự án, ~40 task, ~15 job, 6 tuần phiên làm việc để báo cáo có số.

## 3. Video demo (ngày 5)

- [ ] Video 3–5 phút: lưu job → apply → được thuê → chuyển thành dự án → tạo task, kéo qua Doing / Devdone → timesheet có giờ → báo cáo thu nhập, xuất PDF → realtime giữa 2 tab.
- [ ] Đăng YouTube (không công khai), gắn link vào README.

## 4. Hoàn thiện giao diện (ngày 5–6)

- [ ] So từng màn với prototype (16 màn), đối chiếu mục 9 "Điều cấm" của DESIGN.md.
- [ ] Chạy skill `web-design-guidelines` trên `frontend/src`, sửa lỗi theo file:dòng.
- [ ] Lighthouse màn 1 và 2: Accessibility ≥ 90.
- [ ] Rà chính tả, text còn sót, dữ liệu mẫu.
- [ ] (Nếu còn thời gian) theme tối: thêm `colorSchemes.dark` và nút đổi trên header.

## 5. Xong tuần khi

- [ ] Link UAT HTTPS mở được từ máy khác, đăng nhập bằng tài khoản demo.
- [ ] Merge vào `main` tự deploy, backup đêm đầu tiên có trên S3.
- [ ] README tiếng Anh + video demo có trong repo.
- [ ] Toàn bộ checklist trong [tracker.md](tracker.md) đã xong.

## Rủi ro

- Build image arm64 trên GitHub Actions bằng QEMU chậm (có thể > 15 phút) → dùng runner `ubuntu-24.04-arm` nếu có, không thì cache layer Maven.
- t4g.small chỉ 2 GB RAM → giới hạn heap JVM (`-XX:MaxRAMPercentage=50`), `shared_buffers` PostgreSQL nhỏ; theo dõi `docker stats` ngày đầu.
