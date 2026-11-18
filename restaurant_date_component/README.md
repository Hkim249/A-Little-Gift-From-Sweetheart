# restaurant_date_component

Thư mục restaurant mới được dựng lại từ sprite sheet pixel-art riêng. Các sprite Hoàng Kim và nam chính được tách thành file độc lập từ asset sheet mới, KHÔNG dùng/cắt từ ảnh cặp đôi nắm tay cũ.

## Assets
- `assets/restaurant_entrance.jpg`: nền cửa vào nhà hàng.
- `assets/restaurant_inside.jpg`: nền bên trong nhà hàng.
- `assets/characters/hoang_kim/`: idle, 3 frame bước đi, seated_happy, seated_gift, seated_shy.
- `assets/characters/nam_chinh/`: idle, 4 frame bước đi, seated_idle, seated_surprised, seated_receive_gift.
- `assets/props/heart_envelope.svg`: phong thư trái tim riêng.
- `assets/ui/hoang_kim_portrait.png`: chân dung thoại.

Component tự chạy: bước vào nhà hàng -> thoại cảm ơn -> trao thư -> kết thúc bằng biểu tượng trái tim. Không có thao tác điều khiển.

Đây là thư mục component độc lập; chưa sửa `app.py`. Sau khi duyệt assets, có thể thay thế folder component trong dự án và nối đường dẫn trong `app.py`.
