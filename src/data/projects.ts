export type ProjectItem = {
  number: string;
  slug: string;
  year: string;
  date: string;
  title: string;
  role: string;
  description: string;
  techs: string[];
  preview: "comingSoon" | "huit" | "dashboard" | "mobile" | "portfolio" | "ai" | "huitFest" | "huitStartup" | "huitIconic" | "sofApps" | "sofSaas" | "elhShop";
  previewImage?: string;
  fullPreviewImage?: string;
  liveUrl?: string;
  githubUrl?: string;
};

export const projects: ProjectItem[] = [
  {
    number: "1",
    slug: "huit-iconic-2026",
    year: "2026",
    date: "(08/2026 - 10/2026)",
    title: "HUIT's ICONIC 2026 - Ambassador Contest Platform",
    role: "Full-stack Developer",
    description:
      "Nền tảng Cuộc thi Đại sứ Truyền thông HUIT's ICONIC 2026 tôn vinh nét đẹp tâm hồn và bản lĩnh sinh viên HUIT. Tích hợp cổng bình chọn trực tuyến đa ngôn ngữ (VI/EN), hiển thị hồ sơ thí sinh, bảng xếp hạng realtime và chấm điểm giám khảo.",
    techs: ["Next.js", "React", "Tailwind CSS", "TypeScript", "i18n", "MySQL"],
    preview: "huitIconic",
    previewImage: "/assets/project-previews/huiticonic/cover.png",
    fullPreviewImage: "/assets/project-previews/huiticonic/fullpage.png",
    liveUrl: "https://iconic.huitmedia.edu.vn/",
  },
  {
    number: "2",
    slug: "sof-mobile-apps",
    year: "2026",
    date: "(01/2026 - 08/2026)",
    title: "SOF Mobile Ecosystem - Android Apps",
    role: "Mobile App Developer / Full-stack Developer",
    description:
      "Hệ sinh thái ứng dụng di động doanh nghiệp phát hành trên Google Play: SOF F&B, SOF HRM (quản lý nhân sự), SOF FACE AI (chấm công nhận diện khuôn mặt), SOF WMS & WMS PRO (quản lý kho bãi), SOF PARKING & PARKING PRO (bãi đỗ xe thông minh) và SOF POS.",
    techs: ["React Native", "Android", "Face AI", "RESTful API", "Barcode/QR Scanner", "IoT Hardware"],
    preview: "sofApps",
    previewImage: "/assets/project-previews/sofapps/cover.png",
    fullPreviewImage: "/assets/project-previews/sofapps/fullpage.png",
    liveUrl: "https://play.google.com/store/apps/developer?id=SOF+Company+Limited&hl=vi",
  },
  {
    number: "3",
    slug: "sof-saas-platform",
    year: "2026",
    date: "(01/2026 - 08/2026)",
    title: "SOF SaaS - Enterprise ERP & Management Platform",
    role: "Full-stack Developer",
    description:
      "Nền tảng Web SaaS quản trị doanh nghiệp và chuyển đổi số toàn diện: quản trị nhân sự HRM, quản lý bán hàng đa kênh POS, chuỗi F&B, quản lý kho bãi, vận tải và hệ thống ERP. Tích hợp cổng thanh toán trực tuyến (VNPay, Momo, VietQR) và báo cáo realtime.",
    techs: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "MySQL / MongoDB", "Cloudflare"],
    preview: "sofSaas",
    previewImage: "/assets/project-previews/sofsaas/cover.png",
    fullPreviewImage: "/assets/project-previews/sofsaas/fullpage.png",
    liveUrl: "https://sof.com.vn/",
  },
  {
    number: "4",
    slug: "elh-ecommerce",
    year: "2026",
    date: "(03/2026 - 07/2026)",
    title: "ELH E-Commerce - Thiết Bị Điện Công Nghiệp & Tự Động Hóa",
    role: "Full-stack Developer",
    description:
      "Website thương mại điện tử chuyên cung cấp thiết bị điện công nghiệp và giải pháp tự động hóa chính hãng (MPE, Siemens, ABB, Hitachi, SMC...). Hệ thống tích hợp tra cứu model thông minh, so sánh sản phẩm, danh sách yêu thích và giỏ hàng thanh toán trực tuyến.",
    techs: ["Next.js", "React", "TypeScript", "Tailwind CSS", "E-Commerce", "Search & Filter Engine", "REST API"],
    preview: "elhShop",
    previewImage: "/assets/project-previews/elh/cover.png",
    fullPreviewImage: "/assets/project-previews/elh/fullpage.png",
    liveUrl: "https://elh.com.vn/",
  },
  {
    number: "5",
    slug: "huit-startup-2026",
    year: "2026",
    date: "(01/2026 - 04/2026)",
    title: "HUIT STARTUP 2026 - Contest Voting Platform",
    role: "Full-stack Developer",
    description:
      "Nền tảng cuộc thi khởi nghiệp sáng tạo cấp Thành phố HUIT Startup lần thứ VII với 240+ dự án tham gia. Hệ thống tích hợp bình chọn trực tuyến thời gian thực, bảng xếp hạng tự động, chống gian lận vote và dashboard quản trị toàn diện.",
    techs: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST API", "MySQL"],
    preview: "huitStartup",
    previewImage: "/assets/project-previews/huitstartup/cover.png",
    fullPreviewImage: "/assets/project-previews/huitstartup/fullpage.png",
    liveUrl: "https://startup.huitmedia.edu.vn/",
  },
  {
    number: "6",
    slug: "huit-fest-2026",
    year: "2026",
    date: "(03/2026)",
    title: "HUIT FEST 2026 - Music Concert",
    role: "Full-stack Developer",
    description:
      "Nền tảng sự kiện âm nhạc quy mô lớn của Trường ĐH Công Thương TP.HCM, kết nối học sinh THPT và sinh viên. Hệ thống cung cấp thông tin ca sĩ khách mời, lịch trình biểu diễn, sơ đồ gian hàng và đăng ký vé online tiện lợi.",
    techs: ["HTML5/CSS3", "JavaScript", "Swiper.js", "jQuery", "PHP/Node.js"],
    preview: "huitFest",
    previewImage: "/assets/project-previews/huitfest/cover.png",
    fullPreviewImage: "/assets/project-previews/huitfest/fullpage.png",
    liveUrl: "https://huitfest.huitmedia.edu.vn/",
  },
  {
    number: "7",
    slug: "ung-dung-giao-viec-ai-webrtc",
    year: "2025",
    date: "(08/09/2025 - 30/11/2025)",
    title: "AI WebRTC Task Management Platform",
    role: "Full-stack Developer",
    description:
      "Hệ thống quản lý công việc và dự án đa nền tảng (Web & Mobile), theo dõi tiến độ thời gian thực, tích hợp trợ lý AI Gemini thông minh và hỗ trợ giao tiếp nội bộ qua kênh chat, gọi thoại, video call WebRTC bảo mật cao.",
    techs: ["Next.js", "NestJS", "React Native", "MySQL", "WebRTC"],
    preview: "comingSoon",
    previewImage: "/assets/project-previews/ungdunggiaoviec/3.43.png",
    fullPreviewImage: "/assets/project-previews/ungdunggiaoviec/fullpage.jpeg",
  },
  {
    number: "8",
    slug: "job-fair-portal",
    year: "2025",
    date: "(06/2025 - 09/2025)",
    title: "Job Fair Portal",
    role: "Inter Full-stack Developer",
    description:
      "Cổng thông tin Ngày hội Việc làm trực tuyến, hỗ trợ sinh viên nộp hồ sơ CV và phỏng vấn trực tiếp với các doanh nghiệp tuyển dụng; tích hợp hệ thống phân tích số liệu và quản trị dữ liệu ứng viên toàn diện cho ban tổ chức.",
    techs: ["ASP.NET", "SQL Server", "C#", "Bootstrap", "REST API"],
    preview: "dashboard",
    previewImage: "/assets/project-previews/ngayhoivieclam/home.png",
    fullPreviewImage: "/assets/project-previews/ngayhoivieclam/ngayhoivieclam_full.jpeg",
  },
];
