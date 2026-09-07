# 🚀 MY PORTFOLIO 2026 (Pure Next.js Full-Stack)

> Trang web Portfolio cá nhân hiện đại được hợp nhất toàn bộ Frontend và Backend vào **thuần Next.js 16**. Tích hợp mô hình 3D tương tác (Three.js), hiệu ứng chuyển động mượt mà và API lưu trữ tin nhắn liên hệ vào MySQL.

---

## 📌 Điểm Nổi Bật

* ⚡ **Full-stack đồng nhất trên Next.js:** Không cần duy trì 2 server riêng biệt. Chỉ cần **1 lệnh duy nhất** `npm run dev` để chạy toàn bộ cả giao diện lẫn backend API.
* 🚫 **Không lỗi CORS:** Frontend và Backend API cùng chung domain/origin.
* 🎨 **Giao diện & 3D ấn tượng:** Tích hợp mô hình 3D tương tác phòng IT (`room_IT_3d.glb`) bằng Three.js, hiệu ứng mượt mà từ Framer Motion và GSAP, giao diện TailwindCSS v4.
* 🗄️ **Tích hợp Database MySQL:** API endpoint `/api/contact` nhận dữ liệu form liên hệ, xác thực dữ liệu và lưu an toàn vào MySQL qua connection pooling (`mysql2/promise`).
* ☁️ **Sẵn sàng Deploy:** Dễ dàng triển khai 1-click lên Vercel.

---

## 🛠 Công Nghệ Sử Dụng

* **Full-stack Framework:** [Next.js 16](https://nextjs.org/) (App Router, React 19)
* **Ngôn ngữ:** [TypeScript](https://www.typescriptlang.org/)
* **Giao diện (Styling):** [TailwindCSS v4](https://tailwindcss.com/)
* **Đồ họa 3D:** [Three.js](https://threejs.org/)
* **Hiệu ứng & Chuyển động:** [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://greensock.com/gsap/)
* **Database Driver:** `mysql2` (Connection Pool & Prepared Statements)
* **Hệ quản trị CSDL:** MySQL / MariaDB

---

## 📁 Cấu Trúc Thư Mục

```text
MY_PORTFOLIO_2026/
├── public/                 # Tài nguyên tĩnh, ảnh, mô hình 3D (.glb)
│   └── models/             # Chứa mô hình room_IT_3d.glb
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/    # Backend Route Handler
│   │   │       └── route.ts# Xử lý POST /api/contact -> Lưu MySQL
│   │   ├── layout.tsx
│   │   └── page.tsx        # Trang chủ Portfolio
│   ├── components/         # Các sections (Hero, 3D Intro, Skills, Experience, Projects, Contact)
│   └── lib/
│       └── db.ts           # MySQL connection pool singleton
├── database/
│   └── schema.sql          # Script khởi tạo database & bảng contact_messages
├── .env.example            # Mẫu biến môi trường
├── package.json
└── tsconfig.json
```

---

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy

### 1. Chuẩn Bị Cơ Sở Dữ Liệu
Chạy file SQL tại `database/schema.sql` trên MySQL của bạn:
```sql
CREATE DATABASE IF NOT EXISTS portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE portfolio;

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(200) NOT NULL,
  subject VARCHAR(200) NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
```

### 2. Cài Đặt Thư Viện
Mở terminal trong thư mục này:
```bash
npm install
```

### 3. Cấu Hình Biến Môi Trường
Sao chép `.env.example` thành `.env`:
```bash
cp .env.example .env
```
Chỉnh sửa thông tin kết nối MySQL trong file `.env`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=your_password
DB_NAME=portfolio
PORT=3000
```

### 4. Khởi Chạy Ứng Dụng
Chỉ cần chạy lệnh:
```bash
npm run dev
```

Mở trình duyệt và truy cập: **[http://localhost:3000](http://localhost:3000)**

* Giao diện: `http://localhost:3000`
* API Contact: `POST http://localhost:3000/api/contact`

---

## 📡 API Documentation

### `POST /api/contact`
Nhận tin nhắn liên hệ từ người dùng và lưu vào database.

* **Headers:** `Content-Type: application/json`
* **Body:**
  ```json
  {
    "name": "Nguyen Van A",
    "email": "vana@example.com",
    "subject": "Trao đổi dự án",
    "message": "Xin chào, tôi muốn hợp tác dự án..."
  }
  ```
* **Response Thành công (201 Created):**
  ```json
  {
    "id": 1,
    "name": "Nguyen Van A",
    "email": "vana@example.com",
    "subject": "Trao đổi dự án",
    "message": "Xin chào, tôi muốn hợp tác dự án...",
    "success": true
  }
  ```
* **Response Lỗi (400 Bad Request):**
  ```json
  {
    "error": "Name is required"
  }
  ```

---

## 👤 Tác Giả
* **Developer:** Doan
* **GitHub:** [@Tdoan031024](https://github.com/Tdoan031024)
* **Repository:** [NEW_PORTFOLIO_2026](https://github.com/Tdoan031024/NEW_PORTFOLIO_2026.git)
