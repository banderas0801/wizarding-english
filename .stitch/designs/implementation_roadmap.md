# Hướng dẫn Triển khai Mã nguồn: Từ Điển Huyền Bí (Arcane Lexicon)

Tài liệu này hướng dẫn lập trình viên thứ tự xây dựng các lớp giao diện (UI Layers) từ thiết kế Stitch để hình thành một ứng dụng Mobile hoàn chỉnh.

## THỨ TỰ TRIỂN KHAI (Dòng chảy người dùng)

### Giai đoạn 1: Lớp Nền tảng (Core Shell) - Cài đặt ban đầu
1.  **Chọn ngôn ngữ:** bd4fed7c8aef4087a6a5b35475e12e03 (Điểm bắt đầu). [DONE]
2.  **Lễ Phân Nhà:** 6494c85b313b4723a2f25d1492c2e63f (Tạo tài khoản/Profile). [DONE]
3.  **Bản đồ Hogwarts (Nav Hub):** fe6e5651fbdc4afc8503da2fbfc0d858 (Màn hình chính để di chuyển giữa các khu vực). [DONE]
4.  **Tổng kho giao diện (Dành cho Dev):** 83690a01fc9b467bbcef588c5a13c4a0 (Dùng để tra cứu class Tailwind và cấu trúc component). [DONE]

### Giai đoạn 2: Lớp Học tập (Learning Path) - Nội dung cốt lõi
1.  **Trung tâm Giáo trình:** fe4dedb4e33c4b5bbbc6d906b37a55a0 (Lộ trình 7 năm học). [NEXT]
2.  **Chi tiết Bài học:** 7eea9595a32d4de9aaaaa10027340bb7 (Template quan trọng nhất để đổ dữ liệu Evan Curriculum).
3.  **Thư viện:** 8d1f4f744c20438e9801ea5778540f2f (Tra cứu theo chương hồi sách Harry Potter).
4.  **Các lớp học đặc thù:** Triển khai theo thứ tự từ dễ đến khó (Độc dược, Thảo dược, Biến hình...).

### Giai đoạn 3: Lớp Tương tác (Interactive Games) - Tăng tính nhập vai
1.  **Đấu trường Thần chú:** 065914fbf1e64e19a13eba0525276abb (Giao diện chiến đấu sinh động).
2.  **Quidditch & Thử thách:** 5bb1062a736245fe8074c0d658557f50 (Các mini-games học từ vựng).

### Giai đoạn 4: Lớp Thành tựu & Kinh tế (Gamification)
1.  **Rương đồ:** ff0757fa638e41849ba87f0dee949c4e (Quản lý trang bị và chỉ số bé).
2.  **Cửa hàng Diagon Alley:** 85ae0883c4db4f6b9a6dad0e7d9c699e (Nơi tiêu vàng nhận được từ việc học).
3.  **Bảng xếp hạng & Vinh danh:** 071c7485786b4934ae1d263547b2ce74.

## QUY TRÌNH LẤY CODE CHO LẬP TRÌNH VIÊN
1.  **Mở màn hình:** Lập trình viên chọn màn hình tương ứng trên Canvas.
2.  **Lấy mã nguồn:** Nhấn nút **⟨/⟩ View Code** ở thanh công cụ phía trên.
3.  **Tích hợp Dữ liệu:** Sử dụng **JSON Schema [DOCUMENT_23]** để kết nối nội dung giáo trình vào mã HTML.
