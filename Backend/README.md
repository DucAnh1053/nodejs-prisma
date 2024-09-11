## Cài đặt

1. Clone repository về máy:

    ```bash
    git clone https://github.com/DucAnh1053/nodejs-prisma
    cd nodejs-prisma
    ```

2. Cài đặt các gói phụ thuộc:

    ```bash
    npm install
    ```

## Thiết lập Prisma

1. Cấu hình kết nối cơ sở dữ liệu:

    Tạo file `.env` chứa các biến phù hợp theo mẫu `.env.example`

3. Triển khai Prisma Client và khởi tạo cơ sở dữ liệu:

    ```bash
    npx prisma migrate deploy
    ```

    Tiếp theo, tạo Prisma Client:

    ```bash
    npx prisma generate
    ```

## Khởi động server

1. Chạy lệnh sau để khởi động server backend:

    ```bash
    npm start
    ```

2. Server sẽ chạy trên cổng được chỉ định trong file `.env`.

## Các lệnh hữu ích

- `npx prisma studio`: Mở Prisma Studio để quản lý dữ liệu trực quan.
- `npx prisma migrate reset`: Xóa và làm lại toàn bộ database (sẽ xóa tất cả dữ liệu).
- `npx prisma db push`: Đồng bộ mô hình schema với database mà không tạo migration.

## Lưu ý

- Hãy đảm bảo rằng bạn đã cấu hình `.env` với đúng thông tin kết nối cơ sở dữ liệu.
