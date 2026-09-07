# Hướng dẫn tích hợp Google Translate vào Landing Page

Tài liệu này hướng dẫn cách tích hợp chức năng chuyển đổi ngôn ngữ tự động cho landing page bằng **Google Translate Website Widget**.

Mục tiêu:
- Người dùng vào website có thể chọn ngôn ngữ.
- Toàn bộ nội dung text trên landing page được dịch tự động.
- Không cần định nghĩa cứng từng câu trong code.
- Phù hợp cho landing page, portfolio, website giới thiệu công ty, website dịch vụ.

---

## 1. Khi nào nên dùng cách này?

Nên dùng Google Translate Widget nếu website của bạn là:

- Landing page giới thiệu dịch vụ.
- Portfolio cá nhân.
- Website công ty nhỏ.
- Trang giới thiệu sự kiện.
- Trang demo cho khách hàng xem nhanh.

Không nên dùng nếu website yêu cầu bản dịch cực kỳ chính xác, ví dụ:

- Website pháp lý.
- Website y tế.
- Website thương mại điện tử lớn.
- Website có nội dung cần kiểm duyệt bản dịch chuyên nghiệp.

---

## 2. Ưu điểm

- Tích hợp nhanh.
- Không cần tạo file ngôn ngữ thủ công.
- Không cần nhập bản dịch vào database.
- Hỗ trợ nhiều ngôn ngữ.
- Phù hợp với website tĩnh hoặc landing page.

---

## 3. Nhược điểm

- Bản dịch có thể chưa tự nhiên 100%.
- Giao diện dropdown mặc định của Google khó tùy chỉnh hoàn toàn.
- Một số text trong ảnh, canvas, SVG hoặc animation đặc biệt có thể không được dịch.
- Không kiểm soát được toàn bộ chất lượng bản dịch.

---

# PHẦN A — Tích hợp với HTML thuần

## Bước 1: Thêm vị trí hiển thị nút chọn ngôn ngữ

Đặt đoạn này vào vị trí bạn muốn hiển thị bộ chọn ngôn ngữ, thường là trong `header` hoặc `navbar`.

```html
<div id="google_translate_element"></div>
```

Ví dụ:

```html
<header>
  <div class="logo">My Landing Page</div>

  <nav>
    <a href="#home">Trang chủ</a>
    <a href="#about">Giới thiệu</a>
    <a href="#services">Dịch vụ</a>
    <a href="#contact">Liên hệ</a>
  </nav>

  <div id="google_translate_element"></div>
</header>
```

---

## Bước 2: Thêm script Google Translate

Đặt đoạn script này trước thẻ đóng `</body>`.

```html
<script type="text/javascript">
  function googleTranslateElementInit() {
    new google.translate.TranslateElement(
      {
        pageLanguage: 'vi',
        includedLanguages: 'en,ja,ko,zh-CN,fr,de,th,id',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
      },
      'google_translate_element'
    );
  }
</script>

<script
  type="text/javascript"
  src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit">
</script>
```

---

## Bước 3: Ý nghĩa cấu hình

```js
pageLanguage: 'vi'
```

Ngôn ngữ gốc của website là tiếng Việt.

```js
includedLanguages: 'en,ja,ko,zh-CN,fr,de,th,id'
```

Danh sách ngôn ngữ cho phép dịch:

| Mã | Ngôn ngữ |
|---|---|
| en | English |
| ja | Japanese |
| ko | Korean |
| zh-CN | Chinese Simplified |
| fr | French |
| de | German |
| th | Thai |
| id | Indonesian |

Bạn có thể thêm hoặc bớt ngôn ngữ theo nhu cầu.

---

# PHẦN B — Tích hợp với ReactJS

## Bước 1: Tạo component GoogleTranslate.jsx

Tạo file:

```txt
src/components/GoogleTranslate.jsx
```

Nội dung:

```jsx
import { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "vi",
          includedLanguages: "en,ja,ko,zh-CN,fr,de,th,id",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    const existingScript = document.querySelector(
      'script[src*="translate.google.com/translate_a/element.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return <div id="google_translate_element"></div>;
}
```

---

## Bước 2: Gắn component vào Header

Ví dụ trong `Header.jsx`:

```jsx
import GoogleTranslate from "./GoogleTranslate";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">My Website</div>

      <nav>
        <a href="#home">Trang chủ</a>
        <a href="#about">Giới thiệu</a>
        <a href="#services">Dịch vụ</a>
        <a href="#contact">Liên hệ</a>
      </nav>

      <GoogleTranslate />
    </header>
  );
}
```

---

# PHẦN C — Tích hợp với Next.js

Với Next.js, cần lưu ý Google Translate chỉ chạy ở phía client, không chạy trực tiếp trong server-side rendering.

## Cách 1: Dùng component client

Tạo file:

```txt
components/GoogleTranslate.jsx
```

Nội dung:

```jsx
"use client";

import { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "vi",
            includedLanguages: "en,ja,ko,zh-CN,fr,de,th,id",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      };
    }

    const existingScript = document.querySelector(
      'script[src*="translate.google.com/translate_a/element.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return <div id="google_translate_element"></div>;
}
```

---

## Bước 2: Import vào Header

```jsx
import GoogleTranslate from "@/components/GoogleTranslate";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="font-bold text-xl">My Landing Page</div>

      <nav className="flex gap-6">
        <a href="#home">Trang chủ</a>
        <a href="#about">Giới thiệu</a>
        <a href="#services">Dịch vụ</a>
        <a href="#contact">Liên hệ</a>
      </nav>

      <GoogleTranslate />
    </header>
  );
}
```

---

# PHẦN D — CSS làm đẹp dropdown Google Translate

Google Translate Widget có giao diện mặc định. Bạn có thể chỉnh nhẹ bằng CSS.

```css
#google_translate_element {
  display: inline-block;
  font-size: 14px;
}

#google_translate_element select {
  background: #111827;
  color: #ffffff;
  border: 1px solid #374151;
  border-radius: 8px;
  padding: 8px 12px;
  outline: none;
  cursor: pointer;
}

#google_translate_element select:hover {
  border-color: #06b6d4;
}

.goog-te-gadget {
  font-family: inherit !important;
  color: transparent !important;
}

.goog-te-gadget span {
  display: none;
}

.goog-logo-link {
  display: none !important;
}

.goog-te-banner-frame {
  display: none !important;
}

body {
  top: 0 !important;
}
```

Lưu ý: Google có thể thay đổi class nội bộ, nên CSS tùy chỉnh có thể cần sửa lại trong tương lai.

---

# PHẦN E — Ẩn thanh Google Translate phía trên website

Đôi khi Google Translate hiển thị một thanh ở đầu trang. Có thể thêm CSS sau:

```css
body {
  top: 0px !important;
}

.skiptranslate iframe {
  display: none !important;
}
```

Nếu website bị đẩy xuống một khoảng trắng phía trên, CSS này thường sẽ xử lý được.

---

# PHẦN F — Không dịch một số phần nhất định

Nếu bạn muốn một đoạn không bị dịch, thêm class:

```html
<span class="notranslate">FimeD</span>
```

Ví dụ:

```html
<h1>
  Welcome to <span class="notranslate">FimeD</span>
</h1>
```

Dùng cho:

- Tên thương hiệu.
- Tên công ty.
- Tên riêng.
- Mã code.
- Tên sản phẩm.

---

# PHẦN G — Gợi ý vị trí đặt nút đổi ngôn ngữ

Nên đặt tại:

```txt
Header góc phải
```

Ví dụ bố cục:

```txt
Logo | Menu | 🌐 Language
```

Hoặc trên mobile:

```txt
Menu mobile
- Trang chủ
- Giới thiệu
- Dịch vụ
- Liên hệ
- Chọn ngôn ngữ
```

---

# PHẦN H — Lưu ý quan trọng khi làm landing page

## 1. Text trong ảnh sẽ không được dịch

Nếu banner hoặc hero section có chữ nằm trong ảnh, Google Translate sẽ không dịch được.

Ví dụ không nên:

```txt
Ảnh banner có chữ: "Thiết kế website chuyên nghiệp"
```

Nên làm:

```txt
Ảnh nền riêng
Text HTML riêng
```

---

## 2. Text trong canvas hoặc WebGL có thể không dịch được

Nếu website dùng Three.js, WebGL, canvas hoặc hiệu ứng chữ đặc biệt, Google Translate có thể không đọc được nội dung đó.

Cách tốt nhất là giữ nội dung quan trọng bằng HTML text bình thường.

---

## 3. Nên kiểm tra sau khi tích hợp

Cần test các phần:

- Header.
- Hero section.
- About section.
- Services section.
- Pricing section.
- FAQ section.
- Contact section.
- Footer.
- Mobile responsive.
- Các nút CTA.

---

# PHẦN I — Ví dụ file HTML hoàn chỉnh

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Landing Page Demo</title>

  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      top: 0 !important;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 40px;
      background: #111827;
      color: white;
    }

    nav {
      display: flex;
      gap: 20px;
    }

    nav a {
      color: white;
      text-decoration: none;
    }

    #google_translate_element select {
      background: #111827;
      color: #ffffff;
      border: 1px solid #374151;
      border-radius: 8px;
      padding: 8px 12px;
      outline: none;
      cursor: pointer;
    }

    .hero {
      padding: 120px 40px;
      text-align: center;
      background: #f3f4f6;
    }

    .hero h1 {
      font-size: 48px;
      margin-bottom: 16px;
    }

    .hero p {
      font-size: 20px;
      max-width: 700px;
      margin: 0 auto;
    }

    .skiptranslate iframe {
      display: none !important;
    }
  </style>
</head>

<body>
  <header>
    <div class="logo notranslate">FimeD</div>

    <nav>
      <a href="#home">Trang chủ</a>
      <a href="#about">Giới thiệu</a>
      <a href="#services">Dịch vụ</a>
      <a href="#contact">Liên hệ</a>
    </nav>

    <div id="google_translate_element"></div>
  </header>

  <section class="hero" id="home">
    <h1>Thiết kế website chuyên nghiệp cho doanh nghiệp</h1>
    <p>
      Chúng tôi giúp doanh nghiệp xây dựng website hiện đại, tốc độ cao,
      chuẩn SEO và dễ dàng mở rộng trong tương lai.
    </p>
  </section>

  <script type="text/javascript">
    function googleTranslateElementInit() {
      new google.translate.TranslateElement(
        {
          pageLanguage: 'vi',
          includedLanguages: 'en,ja,ko,zh-CN,fr,de,th,id',
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        },
        'google_translate_element'
      );
    }
  </script>

  <script
    type="text/javascript"
    src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit">
  </script>
</body>
</html>
```

---

# PHẦN J — Kết luận

Với landing page chỉ cần cho người dùng chọn ngôn ngữ và dịch toàn bộ website, giải pháp phù hợp nhất là:

```txt
Google Translate Website Widget
```

Cách này đơn giản, nhanh, không cần hard-code bản dịch và rất phù hợp cho website giới thiệu, portfolio hoặc landing page demo.

Nếu sau này website cần chuyên nghiệp hơn, có thể nâng cấp sang:

```txt
next-intl / react-i18next + bản dịch thủ công + CMS/database
```
