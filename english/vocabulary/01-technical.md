# Từ vựng 01 — Kỹ thuật cơ bản

> **Tuần 1** · Giai đoạn 1 · 20 phút/ngày
> **Lịch học:** Ngày 1: Nhóm 1–2 · Ngày 2: Nhóm 3–5 · Ngày 3: Họ từ, cụm từ, từ dễ nhầm · Ngày 4: phát âm + bài tập · Mỗi ngày: ôn Anki
> Nghe phát âm: tra từ trên [Cambridge Dictionary](https://dictionary.cambridge.org/) hoặc [YouGlish](https://youglish.com/)

**Sau bài này bạn có thể:**
- Dùng đúng 27 từ kỹ thuật cơ bản nhất khi nói chuyện với client
- Biến đổi từ đúng dạng: *deploy → deployment*, *maintain → maintenance*
- Phân biệt các cặp từ dễ nhầm: *bug / issue / problem / error*, *authentication / authorization*
- Phát âm đúng các từ dev hay đọc sai: *cache, queue, suite...*

**Khi nào dùng:** khi mô tả công việc, báo lỗi, báo tiến độ, đọc job post. Đây là nhóm từ xuất hiện trong gần như mọi cuộc trao đổi kỹ thuật.

---

## 1. Từ vựng

### Nhóm 1 — Mã nguồn & phát triển

| Từ | Phiên âm | Loại | Nghĩa | Ví dụ |
|---|---|---|---|---|
| codebase | /ˈkoʊdbeɪs/ | n | toàn bộ mã nguồn | *I need access to the codebase.* |
| repository (repo) | /rɪˈpɑːzətɔːri/ | n | kho mã nguồn | *Please add me to the repository.* |
| branch | /bræntʃ/ | n | nhánh Git | *I pushed the code to a new branch.* |
| merge | /mɜːrdʒ/ | v | gộp (code) | *Can I merge it into main?* |
| pull request (PR) | /ˈpʊl rɪˌkwest/ | n | yêu cầu gộp code | *I opened a pull request for review.* |
| refactor | /riːˈfæktər/ | v | viết lại code cho gọn (không đổi chức năng) | *I refactored the payment service.* |
| feature | /ˈfiːtʃər/ | n | tính năng | *The client wants a new feature.* |
| requirement | /rɪˈkwaɪərmənt/ | n | yêu cầu | *Could you share the requirements?* |

### Nhóm 2 — Lỗi & chất lượng

| Từ | Phiên âm | Loại | Nghĩa | Ví dụ |
|---|---|---|---|---|
| bug | /bʌɡ/ | n | lỗi trong code | *I found a bug in the checkout page.* |
| fix | /fɪks/ | v / n | sửa / bản sửa | *I fixed the bug. The fix is live now.* |
| issue | /ˈɪʃuː/ | n | vấn đề | *I'm looking into the issue.* |
| test | /test/ | n / v | bài kiểm thử / kiểm thử | *All tests pass.* |
| performance | /pərˈfɔːrməns/ | n | hiệu năng | *The page has poor performance.* |
| maintain | /meɪnˈteɪn/ | v | bảo trì | *I can maintain the app after launch.* |

### Nhóm 3 — Triển khai & hệ thống

| Từ | Phiên âm | Loại | Nghĩa | Ví dụ |
|---|---|---|---|---|
| deploy | /dɪˈplɔɪ/ | v | triển khai lên server | *I will deploy it tonight.* |
| release | /rɪˈliːs/ | n / v | bản phát hành / phát hành | *The next release is on Monday.* |
| environment | /ɪnˈvaɪrənmənt/ | n | môi trường (dev / staging / production) | *It works on the staging environment.* |
| production | /prəˈdʌkʃn/ | n | môi trường thật (đang chạy cho người dùng) | *Don't test on production.* |
| downtime | /ˈdaʊntaɪm/ | n | thời gian hệ thống ngừng hoạt động | *The update needs 5 minutes of downtime.* |
| scalable | /ˈskeɪləbl/ | adj | mở rộng được khi tải tăng | *The system is scalable on AWS.* |

### Nhóm 4 — Giao diện & tích hợp

| Từ | Phiên âm | Loại | Nghĩa | Ví dụ |
|---|---|---|---|---|
| responsive | /rɪˈspɑːnsɪv/ | adj | hiển thị tốt trên mọi kích thước màn hình | *The website is fully responsive.* |
| endpoint | /ˈendpɔɪnt/ | n | 1 đường dẫn API | *This endpoint returns all orders.* |
| integrate | /ˈɪntɪɡreɪt/ | v | tích hợp | *I can integrate Stripe into your app.* |
| third-party | /ˌθɜːrd ˈpɑːrti/ | adj | (của) bên thứ ba | *It's a third-party library.* |

### Nhóm 5 — Bảo mật

| Từ | Phiên âm | Loại | Nghĩa | Ví dụ |
|---|---|---|---|---|
| authentication | /ɔːˌθentɪˈkeɪʃn/ | n | xác thực (bạn là ai) | *We use JWT for authentication.* |
| authorization | /ˌɔːθərəˈzeɪʃn/ | n | phân quyền (bạn được làm gì) | *Only admins have authorization to delete users.* |
| permission | /pərˈmɪʃn/ | n | quyền | *I don't have permission to access the server.* |

## 2. Họ từ (Word Family)

| Động từ | Danh từ | Tính từ | Ví dụ |
|---|---|---|---|
| deploy | deployment | — | *The **deployment** failed.* |
| integrate | integration | integrated | *The Stripe **integration** is done.* |
| maintain | **maintenance** ⚠️ | maintainable | *I offer monthly **maintenance**.* |
| perform | performance | — | *We need better **performance**.* |
| require | requirement | required | *Laravel experience is **required**.* |
| authenticate | authentication | — | *Users **authenticate** with email.* |
| authorize | authorization | authorized | *You are not **authorized** to do this.* |
| permit | permission | — | *I need **permission** to access it.* |
| scale | scalability | scalable | *We need to **scale** the server.* |
| respond | response | responsive | *The API **response** is slow.* |

> ⚠️ *maintain* → *maint**e**nance* (không phải *maintainance*) — lỗi chính tả rất phổ biến.

## 3. Cụm từ đi kèm (Collocations)

| Cụm từ | Nghĩa | Ví dụ |
|---|---|---|
| fix a bug | sửa lỗi | *I fixed a bug in the login form.* |
| report a bug | báo lỗi | *The client reported a bug yesterday.* |
| deploy to production | đưa lên môi trường thật | *I'll deploy to production tonight.* |
| set up the environment | cài đặt môi trường | *It takes 1 hour to set up the environment.* |
| push to the repo | đẩy code lên repo | *I pushed the changes to the repo.* |
| open a pull request | tạo PR | *I opened a pull request for review.* |
| merge a branch | gộp nhánh | *Please merge the branch after review.* |
| run tests | chạy test | *I always run tests before deploying.* |
| look into an issue | điều tra 1 vấn đề | *I'm looking into the issue now.* |
| improve performance | cải thiện hiệu năng | *Caching can improve performance.* |
| integrate with | tích hợp với | *The app integrates with Stripe.* |

## 4. Từ dễ nhầm

### bug / issue / problem / error

| Từ | Dùng khi | Ví dụ |
|---|---|---|
| bug | Lỗi **trong code** khiến app chạy sai | *There is a bug in the cart.* |
| issue | **Vấn đề** nói chung — trung tính, lịch sự nhất (cũng là "ticket" trên GitHub) | *I'm looking into the issue.* |
| problem | Vấn đề — nghe **nặng nề hơn** *issue* | *We have a big problem with the server.* |
| error | **Thông báo lỗi** cụ thể khi chạy | *I get a 500 error on this page.* |

> Với client, ưu tiên dùng **issue** — nghe chuyên nghiệp, không gây hoảng.

### authentication / authorization

- **Authentication** = xác thực **bạn là ai** (đăng nhập)
- **Authorization** = kiểm tra **bạn được làm gì** (phân quyền)
- *The user passed **authentication** but failed **authorization** — he logged in, but he can't delete orders.*

### deploy / release

- **Deploy**: đưa code lên server — việc **kỹ thuật**. *I deployed it to staging.*
- **Release**: phát hành phiên bản cho **người dùng** — việc **sản phẩm**. *We release a new version every 2 weeks.*

### fix / repair

- **Fix**: dùng cho code, phần mềm. *I fixed the bug.*
- **Repair**: dùng cho đồ vật vật lý. *I repaired my laptop.*

## 5. Lỗi phát âm thường gặp

| Từ | Phát âm đúng | Hay đọc sai |
|---|---|---|
| cache | /kæʃ/ (giống *cash*) | "cát-chê" |
| queue | /kjuː/ (giống chữ *Q*) | "qui-ơ" |
| deploy | /dɪˈplɔɪ/ — nhấn âm 2 | nhấn âm 1 |
| suite | /swiːt/ (giống *sweet*) | "sút" |
| height | /haɪt/ | "hây" |
| integer | /ˈɪntɪdʒər/ | "in-tê-gơ" |
| Linux | /ˈlɪnəks/ | "lai-nớt" |
| maintenance | /ˈmeɪntənəns/ — nhấn âm 1 | "mên-tên-nần" nhấn âm 2 |
| Nginx | /ˌendʒɪnˈeks/ ("engine-x") | "en-gin-x" |

## 6. Mẫu câu thực tế

> *Hi Sarah, I **fixed** the **bug** in the checkout page and opened a **pull request**. All **tests** pass. After your review, I will **merge** it and **deploy** to **production**. There will be no **downtime**. I'm also **looking into** the **performance** **issue** on the seat selection page.*

## 7. Anki

Copy khối dưới vào 1 file `.txt` → Anki: *File → Import* → chọn dấu phân cách **Semicolon**.

```
codebase;toàn bộ mã nguồn (I need access to the codebase.)
repository;kho mã nguồn (Please add me to the repository.)
branch;nhánh Git
merge;gộp code (Can I merge it into main?)
pull request;yêu cầu gộp code (I opened a pull request for review.)
refactor;viết lại code cho gọn, không đổi chức năng
feature;tính năng
requirement;yêu cầu (Could you share the requirements?)
bug;lỗi trong code
fix;sửa / bản sửa (The fix is live now.)
issue;vấn đề — trung tính, lịch sự (I'm looking into the issue.)
test;bài kiểm thử / kiểm thử (All tests pass.)
performance;hiệu năng
maintain;bảo trì → maintenance (n)
deploy;triển khai lên server → deployment (n)
release;bản phát hành / phát hành cho người dùng
environment;môi trường (dev / staging / production)
production;môi trường thật đang chạy cho người dùng
downtime;thời gian hệ thống ngừng hoạt động
scalable;mở rộng được khi tải tăng
responsive;hiển thị tốt trên mọi kích thước màn hình
endpoint;1 đường dẫn API
integrate;tích hợp → integration (n)
third-party;(của) bên thứ ba
authentication;xác thực — bạn là ai
authorization;phân quyền — bạn được làm gì
permission;quyền (I don't have permission to access it.)
cache;bộ nhớ đệm — đọc /kæʃ/ giống "cash"
queue;hàng đợi — đọc /kjuː/ giống chữ "Q"
```

---

## 8. Bài tập

### A. Điền từ (dùng từ ở mục 1, chia đúng dạng)

1. I opened a ___ for you to review.
2. The website is fully ___ — it works well on phones.
3. I don't have ___ to access your AWS account.
4. Could you send me the full list of ___?
5. We use JWT for ___.
6. I'm looking into the ___ now.
7. I will ___ the new version to production tonight.
8. The update needs about 5 minutes of ___.

### B. Chọn từ đúng

1. The user can log in, but he can't delete orders. It's an (authentication / authorization) problem.
2. I get a 500 (error / issue) when I open this page.
3. I (repaired / fixed) the bug in the login form.
4. We (deploy / release) a new version to users every two weeks.
5. Hi John, I'm looking into the (issue / problem) you reported. (lịch sự nhất)

### C. Họ từ — điền dạng đúng của từ trong ngoặc

1. The Stripe ___ is done. (integrate)
2. I offer monthly ___ for $200. (maintain)
3. The ___ failed because of a missing config. (deploy)
4. Laravel experience is ___ for this job. (require)
5. The API ___ is too slow. (respond)

### D. Dịch sang tiếng Anh (ôn Ngữ pháp 01)

1. Tôi đã sửa lỗi ở trang đăng nhập.
2. Bạn có thể thêm tôi vào repository không?
3. Tôi đang điều tra vấn đề hiệu năng.
4. Hệ thống chạy tốt trên môi trường staging.
5. Ứng dụng tích hợp với Stripe và PayPal.

### E. Viết tin nhắn

Viết 1 tin nhắn **3–5 câu** báo cho client: bạn đã sửa xong 1 lỗi và sẽ triển khai bản sửa. Dùng ít nhất **5 từ** trong bài.

<details>
<summary>Đáp án A, B, C, D</summary>

**A.** 1. pull request · 2. responsive · 3. permission · 4. requirements · 5. authentication · 6. issue · 7. deploy · 8. downtime

**B.** 1. authorization · 2. error · 3. fixed · 4. release · 5. issue

**C.** 1. integration · 2. maintenance · 3. deployment · 4. required · 5. response

**D.**
1. I fixed the bug on the login page.
2. Can you add me to the repository? / Could you add me to the repository?
3. I'm looking into the performance issue.
4. The system works well on the staging environment.
5. The app integrates with Stripe and PayPal.

</details>

---

# BÀI LÀM CỦA BẠN

**A.**
1.
2.
3.
4.
5.
6.
7.
8.

**B.** 1. · 2. · 3. · 4. · 5.

**C.** 1. · 2. · 3. · 4. · 5.

**D.**
1.
2.
3.
4.
5.

**E.**



---

# TỰ ĐÁNH GIÁ

- [ ] Tôi nhớ nghĩa ít nhất 22/27 từ (kiểm tra bằng Anki)
- [ ] Tôi biến đổi đúng họ từ (đặc biệt *maintenance*)
- [ ] Tôi phân biệt được *bug / issue / problem / error* và *authentication / authorization*
- [ ] Tôi phát âm đúng *cache, queue, deploy, suite*
- [ ] Tôi viết được tin nhắn ngắn dùng từ trong bài

# NHẬN XÉT

_(Chạy `/english-lesson check english/vocabulary/01-technical.md` sau khi làm xong)_

# LỖI SAI CẦN NHỚ

_(Tự động cập nhật khi chấm bài)_
