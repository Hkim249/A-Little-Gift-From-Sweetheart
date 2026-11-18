ĐẾN RƯỚC NÀNG
===================
Cách chạy:
1. Giải nén toàn bộ thư mục.
2. Mở index.html bằng trình duyệt hiện đại (Chrome/Edge/Firefox).
3. Trên điện thoại: vuốt/kéo lên hoặc xuống trong khung game để chuyển làn.
   Trên máy tính: dùng phím mũi tên lên/xuống.

Cơ chế:
- Nhân vật dùng một tư thế ngồi xe duy nhất; xe và chướng ngại vật chỉ xuất hiện trên 2 làn cố định.
- 3 mạng; va chạm mất 1 mạng.
- Hết mạng: hiện tin nhắn Mẹ Meo và nút Chơi lại.
- Game chỉ có một màn duy nhất; không chia chặng và không mở màn tiếp theo.\n- Khi chiến thắng, hiển thị lời nhắn: “CHIẾN THẮNG! – Bạn đã đến nơi an toàn, hãy đón Hoàng Kim đi chơi nhé.”
- Không có điểm số, tiền hay xu.

Lưu ý về hình ảnh:
Asset sheet được tạo dưới dạng một ảnh tổng hợp. Các ảnh trong assets/ là các vùng được cắt từ sheet để dùng trong game; chúng chưa phải bộ sprite gốc xuất riêng từ nguồn vẽ. Background đang dùng ảnh preview tổng hợp.
\n- Không có nút điều khiển lên/xuống trên màn hình.\n- Chướng ngại vật được giãn cách để tránh xuất hiện dồn dập.\n
Bố trí theo mặt đường:
- Hai làn được đặt bên trong vùng mặt đường của background.
- Bánh xe và chân vật cản được căn theo cùng đường cơ sở của từng làn.
- Làn trên (xa) được thu nhỏ; làn dưới (gần) có kích thước lớn hơn.
- Lớp làn xa được vẽ trước làn gần để tạo chiều sâu phối cảnh.
