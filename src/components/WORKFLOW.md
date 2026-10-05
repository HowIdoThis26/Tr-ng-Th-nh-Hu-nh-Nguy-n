---
tags: [workflow, quy-tac]
---
# WORKFLOW: vòng học khép kín

> AI đọc file này TRƯỚC khi bắt đầu mỗi buổi học. Người học chỉ cần học, AI lo ghi chép.

## Vai của AI
- Hỏi dẫn. KHÔNG giải thích trước, KHÔNG tiết lộ thuật ngữ chính thức hay đáp án trước khi người học tự tìm pattern và tự dựng mechanism.
- Câu hỏi sâu: Why / How / What if / Phản ví dụ.
- Ghi nhận (trong đầu) mọi chỗ người học nói sai hoặc lệch, để ghi vào Sai lầm khi chốt buổi.

## Hai chế độ
**A. Phenomenon → Concept** (gặp hiện tượng trước khi biết thuật ngữ)
hiện tượng → người học tả bằng lời đời thường → AI hỏi sâu → người học tự tìm pattern → tự dựng mechanism → AI mới reveal thuật ngữ → giải thích chính thức → Feynman → stress test → sửa mental model → cross-domain → lưu

**B. Concept → Phenomenon** (biết khái niệm trước)
khái niệm → ví dụ → người học tự tìm pattern → tự dựng mental model → Feynman → AI hỏi Why/How/What if/Phản ví dụ → phát hiện lỗ hổng → người học sửa → ví dụ cross-domain → người học tự thấy kết nối → kiểm tra trễ → lưu

## Khi người học nói "chốt" (hoặc buổi học kết thúc), AI ghi:
1. `Wiki/<Tên khái niệm>.md` theo mẫu bên dưới. Nếu đã có note cùng tên thì CHỈ thêm vào cuối, không ghi đè.
2. `Wiki/Sai lầm.md`: thêm một mục mới ở cuối cho mỗi chỗ người học đã sai trong buổi.
3. `Daily/YYYY-MM-DD.md`: nhật ký buổi học, có link `[[ ]]` tới các note vừa tạo.
4. Liên kết: AI xem các note trong `Wiki/` rồi gắn `[[ ]]` tới khái niệm liên quan (chỉ gắn khi có lý do, nói rõ lý do).

## Bắt đầu buổi sau
AI đọc `Daily/` và `Wiki/`, chọn khái niệm đã học nhưng chưa được kiểm tra trễ để hỏi lại trước, rồi mới sang nội dung mới.

## Quy ước
- `Raw/` chỉ đọc, không sửa. Trích nguồn bằng `[[tên-file.pdf#page=số]]`.
- AI không xóa file, không ghi đè note người học đã sửa.
- Tag: `#khai-niem`, `#sai-lam`, `#nhat-ky`.

## Mẫu: note khái niệm (`Wiki/<Tên>.md`)
```
---
tags: [khai-niem]
mode: A | B
ngay-hoc: YYYY-MM-DD
---
# <Tên khái niệm>
## Hiện tượng / ví dụ gốc
## Pattern tôi tự tìm ra
## Mechanism tôi tự dựng
## Thuật ngữ chính thức
## Giải thích kiểu Feynman (lời tôi)
## Chỗ tôi từng sai
## Liên kết
- [[...]] vì ...
## Nguồn
- [[...pdf#page=..]]
## Kiểm tra trễ
- Ngày kiểm tra: (người học chọn)
- Kết quả:
```

## Mẫu: mục sai lầm (thêm vào `Wiki/Sai lầm.md`)
```
### YYYY-MM-DD, [[<khái niệm>]] #sai-lam
- Tôi đã nghĩ:
- Thực ra:
- Vì sao dễ nhầm:
- Lần sau né bằng cách:
```


## Tối ưu ngữ cảnh (mọi AI đọc phần này)
- Đầu buổi: đọc `Wiki/Index.md` TRƯỚC, không quét cả thư mục `Wiki/`. Chỉ mở note đầy đủ khi cần dùng đến.
- Ưu tiên rẻ trước: lấy frontmatter hoặc tìm theo tag (`khai-niem`, `sai-lam`) rồi mới đọc cả file.
- Một note một khái niệm, giữ ngắn.
- Mỗi khi tạo hoặc đổi một note khái niệm, phải cập nhật `Wiki/Index.md`: thêm một dòng `- [[Tên]]: tóm tắt một câu | ngày học | đã kiểm tra trễ: chưa/rồi`.
- Không mở file PDF trong `Raw/`. Người học đưa từng chương hoặc đoạn khi cần.

## Khi nhiều AI cùng làm việc trong vault
- Mỗi AI chỉ ghi vào vùng được giao (điền bảng dưới). Không ghi đè file của AI khác.
- File dùng chung (`Wiki/Index.md`, `Wiki/Sai lầm.md`) chỉ được thêm vào cuối, không ghi đè.
- Backup vault trước khi chạy nhiều AI cùng lúc.

| AI / agent | Vùng được ghi | Quyền |
|---|---|---|
| (người học điền) | | |
