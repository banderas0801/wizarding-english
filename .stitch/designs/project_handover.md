# Tài liệu Đóng gói Dự án: Từ Điển Huyền Bí (Arcane Lexicon)

## 1. Tổng quan Dự án
Ứng dụng học tiếng Anh nhập vai mô phỏng thế giới Harry Potter, tích hợp giáo trình Evan vào các hoạt động tương tác và trò chơi pháp thuật.

## 2. Danh sách Tài nguyên (Assets)
### Giao diện (UI Screens)
Toàn bộ mã nguồn HTML/CSS (Tailwind) có sẵn trên Canvas cho các lớp:
*   **Core Shell:** Chọn ngôn ngữ, Bản đồ Hogwarts, Hồ sơ phù thủy.
*   **Learning Path:** Trung tâm giáo trình Evan, Thư viện, Chi tiết bài học đa phương tiện.
*   **Interactive Games:** Đấu trường Thần chú, Sân Quidditch, Mê cung Tam Pháp Thuật, Phòng Chứa Bí Mật.
*   **Gamification:** Cửa hàng Diagon Alley, Rương đồ, Nhiệm vụ hàng ngày, Bảng xếp hạng.
*   **Support:** Hộp thư Cú, Hệ thống nâng cấp trang bị.

### Hình ảnh & Đồ họa
*   Hệ thống biểu tượng (Material Symbols).
*   Hình ảnh minh họa cinematic cho các địa điểm và nhân vật.
*   Bộ điều khiển D-Pad và các con dấu sáp (Wax Seals) tùy chỉnh.

## 3. Hướng dẫn Kỹ thuật (Technical Guide)
### Công nghệ khuyến nghị:
*   **Frontend:** React Native hoặc Flutter (để đa nền tảng Mobile/Tablet).
*   **Styling:** Tailwind CSS (NativeWind cho React Native).
*   **Game Engine (Tùy chọn):** Phaser.js hoặc PixiJS cho các mini-game cần hiệu ứng phức tạp.

### Cách triển khai từ Stitch:
1.  **Trích xuất Code:** Chọn từng màn hình trên Canvas > Nhấn **⟨/⟩ View Code** > Copy mã HTML/Tailwind.
2.  **Chuyển đổi Component:** Chia nhỏ mã HTML thành các Component (Header, Button, Card) để tái sử dụng.
3.  **Quản lý State:** Sử dụng Redux hoặc Context API để quản lý chỉ số Mana, HP, và tiến trình học tập của bé.

## 4. Đặc tả Logic (PRD - Sơ lược)
*   **Hệ thống Đấu phép:** Chuyển đổi các câu hỏi từ vựng thành lệnh cast phép. Đúng = Gây sát thương; Sai = Mất Mana.
*   **Lộ trình Evan:** Mỗi năm học tại Hogwarts tương ứng với một cấp độ chứng chỉ tiếng Anh hoặc một bộ từ vựng mục tiêu.
*   **Cơ chế Gamification:** Hoàn thành bài học nhận Vàng (Galleons) để mua vật phẩm trong Diagon Alley.

---
*Ghi chú: Bạn có thể xuất bản thiết kế sang Figma để kiểm tra khoảng cách (spacing) và mã màu chính xác trước khi lập trình.*