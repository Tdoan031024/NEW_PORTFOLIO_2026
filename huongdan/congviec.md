# Yêu cầu chỉnh sửa Portfolio Website

## Mục tiêu chung

Hãy chỉnh sửa portfolio website hiện tại theo các yêu cầu bên dưới.  
Không redesign lại toàn bộ website. Hãy giữ nguyên phong cách tổng thể hiện tại, chỉ tinh chỉnh và bổ sung các section cần thiết để giao diện đồng bộ, chuyên nghiệp và phù hợp với portfolio của một Fullstack Developer.

---

## 1. Điều chỉnh nền của ProjectSection

Hãy điều chỉnh phần nền/background của `ProjectSection` để đồng bộ với toàn bộ giao diện website hiện tại.

Yêu cầu:

- Giữ phong cách thiết kế hiện tại của website.
- Màu nền, hiệu ứng glow, grid, gradient hoặc texture nếu có phải đồng nhất với các section còn lại.
- Không làm ProjectSection bị tách biệt hoặc lệch tông so với tổng thể website.
- Đảm bảo spacing trên/dưới của section hợp lý.
- Giao diện phải responsive tốt trên desktop, tablet và mobile.

---

## 2. Xóa các section không cần thiết

Hãy xóa hoàn toàn các section sau khỏi website:

- `AiSection`
- `BlogSection`
- `SubscribeSection`

Yêu cầu:

- Xóa phần import component nếu có.
- Xóa phần render component trong page/layout hiện tại.
- Kiểm tra lại sau khi xóa để không còn lỗi build hoặc lỗi import.
- Không để lại khoảng trắng thừa giữa các section.

---

## 3. Thêm ExperienceSection trước ProjectSection

Hãy thêm một section mới tên là:

```txt
ExperienceSection
```

Vị trí hiển thị:

```txt
ExperienceSection nằm trước ProjectSection
```

Trước khi tích hợp, hãy đọc file hướng dẫn sau:

```txt
D:\DoanTech\doan_portfolio\huongdan\ExperienceSection.md
```

Sau đó tích hợp `ExperienceSection` vào portfolio website hiện tại.

Yêu cầu thiết kế:

- Giao diện phải đồng bộ với style hiện tại của website.
- Không làm section này giống một timeline đơn giản quá mức.
- Nên thể hiện được kinh nghiệm, dự án, vai trò, công nghệ sử dụng và kết quả đạt được.
- Có thể dùng card, timeline, bento layout hoặc layout hiện đại phù hợp với portfolio developer.
- Có hiệu ứng hover/transition nhẹ, mượt và chuyên nghiệp.
- Responsive tốt trên mọi thiết bị.
- Code component rõ ràng, dễ bảo trì.

---

## 4. Thiết kế Footer

Hãy thiết kế footer phù hợp với toàn bộ portfolio website.

Yêu cầu footer:

- Đồng bộ màu sắc, typography và spacing với website hiện tại.
- Có thể bao gồm:
  - Logo hoặc tên cá nhân/thương hiệu.
  - Mô tả ngắn về vai trò Fullstack Developer.
  - Navigation links.
  - Social links như GitHub, LinkedIn, Email nếu project hiện tại đã có dữ liệu.
  - Copyright.
- Footer không nên quá nặng, không chiếm quá nhiều chiều cao.
- Thiết kế hiện đại, gọn gàng, chuyên nghiệp.
- Responsive tốt trên mobile.

---

## 5. Thiết kế ContactSection

Hãy thiết kế lại hoặc bổ sung phần `ContactSection` theo ý tưởng sau.

### Nội dung chính

Khi người dùng lướt xuống Contact section, ở giữa section sẽ hiển thị dòng chữ:

```txt
Let's build what's next.
```

Bên dưới là subtitle:

```txt
Have a role, project, or idea in mind? Let’s turn it into a modern, scalable, and meaningful digital product.
```

### Hiệu ứng mong muốn

Ban đầu:

- Text nằm ở giữa section.
- Text xuất hiện nổi bật, tạo cảm giác ấn tượng khi người dùng scroll tới.

Sau đó:

- Dòng chữ chuyển động mượt từ vị trí giữa sang bên trái.
- Bên phải xuất hiện form nhập thông tin liên hệ.

### Layout sau khi animation hoàn tất

Bên trái:

- Title: `Let's build what's next.`
- Subtitle: `Have a role, project, or idea in mind? Let’s turn it into a modern, scalable, and meaningful digital product.`
- Có thể thêm một vài thông tin liên hệ ngắn nếu phù hợp.

Bên phải:

Form liên hệ gồm các trường:

- Name
- Email
- Subject
- Message
- Submit button

Yêu cầu form:

- Thiết kế hiện đại, sạch, dễ nhập liệu.
- Đồng bộ với theme website hiện tại.
- Có hover/focus state đẹp.
- Có validation cơ bản nếu project hiện tại đã có setup.
- Button CTA nổi bật nhưng không lệch style.

### Yêu cầu animation

- Animation phải mượt, không giật.
- Có thể dùng Framer Motion nếu project hiện tại đang dùng hoặc có thể thêm được.
- Nếu không dùng Framer Motion, có thể dùng CSS transition hoặc Intersection Observer.
- Không làm animation quá phức tạp gây nặng website.
- Trên mobile, có thể bỏ hiệu ứng chuyển ngang và hiển thị theo layout dọc để đảm bảo trải nghiệm tốt.

---

## 6. Yêu cầu kỹ thuật chung

- Không phá vỡ layout hiện tại.
- Không đổi tên component cũ nếu không cần thiết.
- Giữ code sạch, dễ đọc, dễ bảo trì.
- Kiểm tra lại import/export sau khi chỉnh sửa.
- Đảm bảo website không bị lỗi build.
- Đảm bảo responsive cho desktop, tablet và mobile.
- Tối ưu spacing giữa các section.
- Giữ trải nghiệm tổng thể chuyên nghiệp, hiện đại và phù hợp với portfolio Fullstack Developer.

---

## 7. Kết quả mong muốn

Sau khi hoàn thành, website sẽ có thứ tự section hợp lý hơn, ví dụ:

```txt
HeroSection
AboutSection
SkillsSection
ExperienceSection
ProjectSection
ServicesSection
ContactSection
Footer
```

Nếu thứ tự section hiện tại khác, hãy giữ cấu trúc hợp lý nhất dựa trên layout website hiện có, nhưng bắt buộc:

```txt
ExperienceSection phải nằm trước ProjectSection
```

Các section `AiSection`, `BlogSection`, `SubscribeSection` phải được xóa khỏi website.
