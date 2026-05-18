# Tài liệu Đặc tả Kỹ thuật (Technical Specification) - Từ Điển Huyền Bí (Arcane Lexicon)

Dựa trên các thiết kế giao diện đã hoàn thiện, dưới đây là lộ trình cụ thể để chuyển đổi dự án này thành một ứng dụng thực tế.

## 1. Kiến trúc Tổng quan
*   **Nền tảng khuyến nghị:** React Native (sử dụng Expo) hoặc Flutter để triển khai nhanh trên cả iOS và Android.
*   **Styling:** Tailwind CSS (qua thư viện NativeWind cho React Native).
*   **Quản lý trạng thái (State Management):** Redux Toolkit hoặc Zustand để quản lý chỉ số Mana, HP, Vàng (Galleons) và Tiến trình học tập của bé.

## 2. Cấu trúc Thư mục Dự án (React Native Example)
```text
/src
  /assets          # Chứa hình ảnh, biểu tượng (Owl, Wax Seals, D-Pad)
  /components      # Các thành phần dùng chung (Header, BottomNav, Card)
    /common
    /game_elements
  /screens         # Mã nguồn từ Stitch được chuyển đổi thành các file .tsx
    /CoreShell
    /LearningPath
    /Games
    /Gamification
  /navigation      # Cấu trúc điều hướng TabBar và Stack
  /services        # Logic xử lý giáo trình Evan và API (nếu có)
  /theme           # Định nghĩa Design Tokens (màu sắc, font chữ từ Design System 1)
```

## 3. Logic Hoạt động Cốt lõi (Game Mechanics)
### A. Hệ thống Đấu phép (Spell Duel Logic)
*   **Input:** Câu hỏi tiếng Anh từ giáo trình Evan.
*   **Action:** 
    *   Bé chọn đúng -> Kích hoạt animation `spell_cast` (Blue/Gold) -> Trừ HP đối thủ.
    *   Bé chọn sai -> Đối thủ tấn công -> Trừ HP/Mana của bé.
*   **Animation:** Sử dụng `Lottie` hoặc `Rive` để tích hợp các hiệu ứng phép thuật sinh động mà không làm nặng app.

### B. Lộ trình Evan (Progression)
*   Mỗi "Năm học" tại Hogwarts là một Module kiến thức.
*   Chỉ mở khóa (Unlock) chương tiếp theo khi bé hoàn thành số lượng bài tập/trò chơi nhất định.

## 4. Hướng dẫn Triển khai Mã nguồn
1.  **Trích xuất Code:** Sử dụng nút `⟨/⟩ View Code` trên từng màn hình Stitch để lấy cấu trúc HTML/CSS.
2.  **Tách Component:** Ví dụ, phần `BottomNavBar` trong SCREEN_62 nên được tách thành một component riêng để dùng cho toàn bộ app.
3.  **Tích hợp Tài nguyên:** Thay thế các placeholder `{{DATA:IMAGE:...}}` bằng các file ảnh thực tế (đã có trong Folder assets).

## 5. Các bước tiếp theo (Next Steps)
*   Thiết lập môi trường phát triển (Node.js, React Native CLI).
*   Chuyển đổi màn hình "Sơ đồ Kiến trúc" thành hệ thống Navigation thực tế.
*   Tích hợp âm thanh (tiếng đũa phép, tiếng cú kêu) để tăng tính nhập vai.