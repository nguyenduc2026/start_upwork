# Từ vựng 08 — Xử lý sự cố

> **Tuần 8** · Giai đoạn 2 · 6 ngày × 10 phút + 20 phút luyện cuối tuần
> **Lịch học:** Ngày 1–2: nhóm 1–2 · Ngày 3–4: nhóm 3–4 · Ngày 5: họ từ và cụm từ · Ngày 6: phân biệt từ, phát âm, mẫu câu · Cuối tuần: bài tập. Ôn Anki trong thời gian mỗi ngày.
> **Bài trước:** [Quy trình làm việc](07-workflow.md). IPA Anh–Anh; n = danh từ, v = động từ, adj = tính từ.

**Sau bài này bạn có thể:** báo sự cố theo thông tin đã biết, mô tả ảnh hưởng, giải thích hướng điều tra và cập nhật kết quả kiểm tra.

**Khi nào dùng:** khi checkout lỗi, API không phản hồi hoặc client báo người dùng không truy cập được. Bài này luyện cách diễn đạt; các ví dụ không phải quy trình vận hành phải áp dụng cho mọi hệ thống.

## 1. Từ vựng

### Nhóm 1 — Ghi nhận sự cố

| Từ | Phiên âm IPA | Loại | Nghĩa | Ví dụ |
|---|---|---|---|---|
| outage | /ˈaʊtɪdʒ/ | n | đợt dịch vụ bị gián đoạn, mất khả dụng | We're investigating a checkout outage. |
| incident | /ˈɪnsɪdənt/ | n | sự cố cần được xử lý | I've opened an incident ticket. |
| downtime | /ˈdaʊntaɪm/ | n | khoảng thời gian dịch vụ không khả dụng | We recorded ten minutes of downtime. |
| alert | /əˈlɜːt/ | n | cảnh báo | We received an alert about failed payments. |
| impact | /ˈɪmpækt/ | n | ảnh hưởng | We're checking the impact on users. |

### Nhóm 2 — Điều tra

| Từ | Phiên âm IPA | Loại | Nghĩa | Ví dụ |
|---|---|---|---|---|
| log | /lɒɡ/ | n | bản ghi hoạt động hoặc sự kiện | The log shows repeated timeouts. |
| symptom | /ˈsɪmptəm/ | n | biểu hiện quan sát được | A slow response is a symptom. |
| reproduce | /ˌriːprəˈdjuːs/ | v | tái hiện | I can reproduce the error on staging. |
| investigate | /ɪnˈvestɪɡeɪt/ | v | điều tra | I'm investigating the payment failures. |
| root cause | /ˌruːt ˈkɔːz/ | n | nguyên nhân gốc | We haven't confirmed the root cause yet. |

### Nhóm 3 — Biện pháp xử lý

| Từ | Phiên âm IPA | Loại | Nghĩa | Ví dụ |
|---|---|---|---|---|
| workaround | /ˈwɜːkəraʊnd/ | n | cách xử lý tạm để tránh vấn đề | Manual export is a temporary workaround. |
| hotfix | /ˈhɒtfɪks/ | n | bản sửa khẩn | The team is testing a hotfix. |
| patch | /pætʃ/ | n | bản thay đổi để sửa hoặc cập nhật phần mềm | The patch adds an event ID check. |
| rollback | /ˈrəʊlbæk/ | n | việc quay lại phiên bản/trạng thái trước | The team approved a rollback. |
| restore | /rɪˈstɔː/ | v | khôi phục | We restored the service after the change. |

### Nhóm 4 — Theo dõi và kết quả

| Từ | Phiên âm IPA | Loại | Nghĩa | Ví dụ |
|---|---|---|---|---|
| backup | /ˈbækʌp/ | n | bản sao lưu | The backup was created last night. |
| monitor | /ˈmɒnɪtə/ | v | theo dõi | We're monitoring the error rate. |
| resolve | /rɪˈzɒlv/ | v | giải quyết | We need to verify that the patch resolves the issue. |
| recovery | /rɪˈkʌvəri/ | n | sự hoặc quá trình phục hồi | Recovery took ten minutes. |
| recurring | /rɪˈkɜːrɪŋ/ | adj | tái diễn | We're investigating a recurring timeout. |

## 2. Họ từ (Word Family)

| Họ từ | Ví dụ và lưu ý |
|---|---|
| investigate → investigation (n) | The investigation is still in progress. |
| reproduce → reproducible (adj) → reproduction (n) | The issue is reproducible on staging. |
| restore → restoration (n) | Service restoration is complete. |
| recover → recovery | The service has recovered. |
| resolve → resolution (n) → resolved | The incident is resolved after verification. |
| recur → recurrence (n) → recurring | We are checking for recurrence. |

Danh từ một từ: *a rollback, a backup*. Động từ hai từ: *roll back the release, back up the database*. *Backed up* là dạng quá khứ: *We backed up the database*. Không viết *We rollbacked it*.

## 3. Cụm từ đi kèm (Collocations)

| Cụm | Nghĩa | Ví dụ |
|---|---|---|
| report an incident | báo sự cố | Please report the incident with a timestamp. |
| check the logs | kiểm tra bản ghi | I'll check the logs for that request. |
| reproduce an issue | tái hiện vấn đề | Could you share steps to reproduce the issue? |
| identify the root cause | xác định nguyên nhân gốc | We haven't identified the root cause yet. |
| apply a patch | áp dụng bản sửa | We applied the patch to staging. |
| roll back a release | quay lại bản phát hành trước | The team decided to roll back the release. |
| restore service | khôi phục dịch vụ | Service was restored at 10 AM. |
| monitor the error rate | theo dõi tỷ lệ lỗi | We're monitoring the error rate after deployment. |

## 4. Từ dễ nhầm

| Cặp/nhóm | Phân biệt | Ví dụ |
|---|---|---|
| outage / downtime | Outage là đợt gián đoạn; downtime là thời lượng không khả dụng | The outage caused ten minutes of downtime. |
| symptom / root cause | Điều nhìn thấy ↔ nguyên nhân đã xác định; không đoán nguyên nhân chỉ từ triệu chứng | A timeout is a symptom. The root cause is still unknown. |
| workaround / fix | Workaround giúp tránh/tạm vượt qua vấn đề; fix sửa vấn đề được nhắm tới | Manual export is a workaround, not a permanent fix. |
| rollback / restore | Rollback quay về bản/trạng thái trước; restore rộng hơn, có thể khôi phục dữ liệu hoặc dịch vụ | We rolled back the release and restored service. |

*Hotfix* nhấn tính khẩn; *patch* nhấn gói thay đổi, nên một hotfix có thể cũng là một patch. *Service restored* không tự chứng minh đã biết nguyên nhân hoặc đã ngăn tái diễn. Tách câu “đã khôi phục” và “đang điều tra nguyên nhân”.

## 5. Lỗi phát âm thường gặp

| Từ | IPA | Lỗi cần tránh |
|---|---|---|
| outage | /ˈaʊtɪdʒ/ | Hai âm tiết, âm đầu /aʊ/ |
| incident | /ˈɪnsɪdənt/ | Nhấn âm đầu; giữ /nt/ cuối |
| reproduce | /ˌriːprəˈdjuːs/ | Nhấn chính -duce-, không nhấn pro- |
| patch | /pætʃ/ | Giữ /tʃ/ cuối, không đổi thành /ʃ/ |
| resolve | /rɪˈzɒlv/ | S đọc /z/; giữ /lv/ cuối |

Đối chiếu *outage*: [Cambridge Dictionary](https://dictionary.cambridge.org/pronunciation/english/outage).

## 6. Mẫu câu thực tế

> Hi Anna, we're **investigating** a checkout **incident**. The **logs** show repeated timeouts, but the **root cause** is not confirmed yet. I can **reproduce** the issue on staging. The team is testing a **patch**. I'll send the next update at 3 PM GMT+7. After service is **restored**, we'll continue to **monitor** the error rate.

Mẫu phân biệt dữ kiện đã thấy với phần chưa xác định. Có mốc cập nhật tiếp theo nhưng không hứa giờ sửa xong khi chưa đủ thông tin.

## 7. Anki

Lưu khối dưới dạng UTF-8 vào file `.txt`; nhập vào Anki với dấu phân cách **Semicolon** (dấu chấm phẩy), hai trường mặt trước / mặt sau. Mỗi dòng có nghĩa và câu ví dụ.

```text
outage;đợt dịch vụ bị gián đoạn, mất khả dụng (We're investigating a checkout outage.)
incident;sự cố cần được xử lý (I've opened an incident ticket.)
downtime;khoảng thời gian dịch vụ không khả dụng (We recorded ten minutes of downtime.)
alert;cảnh báo (We received an alert about failed payments.)
impact;ảnh hưởng (We're checking the impact on users.)
log;bản ghi hoạt động hoặc sự kiện (The log shows repeated timeouts.)
symptom;biểu hiện quan sát được (A slow response is a symptom.)
reproduce;tái hiện (I can reproduce the error on staging.)
investigate;điều tra (I'm investigating the payment failures.)
root cause;nguyên nhân gốc (We haven't confirmed the root cause yet.)
workaround;cách xử lý tạm để tránh vấn đề (Manual export is a temporary workaround.)
hotfix;bản sửa khẩn (The team is testing a hotfix.)
patch;bản thay đổi để sửa hoặc cập nhật phần mềm (The patch adds an event ID check.)
rollback;việc quay lại phiên bản/trạng thái trước (The team approved a rollback.)
restore;khôi phục (We restored the service after the change.)
backup;bản sao lưu (The backup was created last night.)
monitor;theo dõi (We're monitoring the error rate.)
resolve;giải quyết (We need to verify that the patch resolves the issue.)
recovery;sự hoặc quá trình phục hồi (Recovery took ten minutes.)
recurring;tái diễn (We're investigating a recurring timeout.)
```

## 8. Bài tập

### A. Điền từ

Dùng mỗi từ một lần: **outage, downtime, logs, reproduce, root cause, workaround, backup, monitor**.

1. The service was unavailable during the ___.
2. The total unavailable time was ten minutes of ___.
3. I'll check the ___ for the failed request.
4. I can ___ the error using the same steps.
5. We see the symptom, but we haven't confirmed the ___.
6. Manual export lets us continue temporarily. It is a ___.
7. We have a ___ of the database from last night.
8. After deployment, we'll ___ the error rate.

<details>
<summary>Đáp án A</summary>

1. outage · 2. downtime · 3. logs · 4. reproduce · 5. root cause · 6. workaround · 7. backup · 8. monitor.

</details>

### B. Chọn từ đúng

1. Biểu hiện quan sát được: The timeout is a (symptom / confirmed root cause).
2. Khoảng mười phút không khả dụng: We recorded ten minutes of (downtime / patch).
3. Giải pháp tạm: Manual export is a (workaround / permanent fix).
4. Quay về release trước: The team approved a (rollback / backup).
5. Bản sửa khẩn: The team is testing a (hotfix / symptom).

<details>
<summary>Đáp án B</summary>

1. symptom · 2. downtime · 3. workaround · 4. rollback · 5. hotfix.

</details>

### C. Dịch sang tiếng Anh

1. Tôi có thể tái hiện lỗi trên staging.
2. Chúng tôi chưa xác nhận nguyên nhân gốc.
3. Dịch vụ đã được khôi phục, và chúng tôi đang theo dõi tỷ lệ lỗi.
4. Vui lòng cập nhật trạng thái ticket. (ôn Bài 07)
5. Chúng tôi đang chờ phê duyệt. (ôn Bài 07)

<details>
<summary>Đáp án gợi ý C</summary>

1. I can reproduce the error on staging.
2. We haven't confirmed the root cause yet.
3. Service has been restored, and we're monitoring the error rate.
4. Please update the ticket status.
5. We're waiting for approval.

</details>

### D. Viết cập nhật sự cố

Checkout có timeout trong logs; bạn tái hiện được trên staging; nguyên nhân chưa xác nhận; team đang test patch. Viết 5–7 câu cập nhật cho client và hẹn lần cập nhật tiếp lúc 15:00 GMT+7. Dùng ít nhất 5 từ mục 1, in đậm từ đã dùng. Không nói đã khôi phục hoặc resolved vì tình huống chưa có kết quả đó.

<details>
<summary>Gợi ý D — xem sau khi tự viết</summary>

We're **investigating** the checkout **incident**. The **logs** show timeouts. I can **reproduce** the issue on staging. The **root cause** is not confirmed yet. The team is testing a **patch**. I'll send the next update at 3 PM GMT+7.

</details>

# BÀI LÀM CỦA BẠN

**A.** 1. ___ · 2. ___ · 3. ___ · 4. ___ · 5. ___ · 6. ___ · 7. ___ · 8. ___

**B.** 1. ___ · 2. ___ · 3. ___ · 4. ___ · 5. ___

**C.** 1. ___ · 2. ___ · 3. ___ · 4. ___ · 5. ___

**D. Tin nhắn:**

_(Viết tại đây; in đậm ít nhất 5 từ/cụm mới đã dùng.)_

# TỰ ĐÁNH GIÁ

- [ ] Tôi nhớ nghĩa ít nhất 16/20 từ và dùng được trong câu ngắn.
- [ ] Tôi đọc được trọng âm và âm cuối của các từ trong mục phát âm.
- [ ] Tôi phân biệt được các cặp/nhóm từ ở mục 4 bằng ví dụ của mình.
- [ ] Tôi dùng được ít nhất 5 cụm từ ở mục 3 mà không nhìn mẫu.
- [ ] Tôi viết tin nhắn đủ yêu cầu và dùng đúng ít nhất 5 từ/cụm mới.

# NHẬN XÉT

_(Chạy `/english-lesson check english/vocabulary/08-incidents.md` sau khi làm xong.)_

# LỖI SAI CẦN NHỚ

_(Cập nhật khi chấm bài.)_
