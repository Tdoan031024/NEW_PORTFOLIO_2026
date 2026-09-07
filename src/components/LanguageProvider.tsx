"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Language = "vi" | "en";

type Dictionary = {
  navHero: string;
  navSkills: string;
  navProjects: string;
  navAbout: string;
  navContact: string;
  navSubscribe: string;
  navDocs: string;
  downloadCv: string;
  heroKicker: string;
  heroTitle: string;
  heroDesc: string;
  heroCtaProjects: string;
  heroCtaContact: string;
  skillsKicker: string;
  skillsTitle: string;
  skillsDesc: string;
  projectsKicker: string;
  projectsTitle: string;
  projectsCount: string;
  aboutKicker: string;
  aboutTitle: string;
  aboutDesc: string;
  aboutCard1: string;
  aboutCard2: string;
  aboutCard3: string;
  aboutCard4: string;
  aiKicker: string;
  aiTitle: string;
  aiFeature1Title: string;
  aiFeature1Detail: string;
  aiFeature2Title: string;
  aiFeature2Detail: string;
  aiFeature3Title: string;
  aiFeature3Detail: string;
  blogKicker: string;
  blogTitle: string;
  blogViewAll: string;
  blogReadMore: string;
  subscribeKicker: string;
  subscribeTitle: string;
  subscribeDesc: string;
  subscribePlaceholder: string;
  subscribeButton: string;
  subscribeNote: string;
  contactKicker: string;
  contactTitle: string;
  contactDesc: string;
  contactLocation: string;
  contactOpen: string;
  formName: string;
  formEmail: string;
  formSubject: string;
  formMessage: string;
  formSend: string;
  formSending: string;
  formSuccess: string;
  formError: string;
  liveChatTitle: string;
  liveChatHint: string;
  liveChatPlaceholder: string;
  liveChatToggleOpen: string;
  liveChatToggleClose: string;
  modalOpenDemo: string;
  modalClose: string;
  footerRights: string;
};

const dictionary: Record<Language, Dictionary> = {
  vi: {
    navHero: "Trang chủ",
    navSkills: "Kỹ năng",
    navProjects: "Dự án",
    navAbout: "Giới thiệu",
    navContact: "Liên hệ",
    navSubscribe: "Đăng ký",
    navDocs: "Tài liệu",
    downloadCv: "Tải CV",
    heroKicker: "Kỹ sư Fullstack + Sáng tạo",
    heroTitle: "Xin chào! Tôi là Tuyên Đoán",
    heroDesc:
      "Tôi là một lập trình viên Fullstack, tập trung xây dựng các ứng dụng web hiện đại, tối ưu hiệu năng và mang lại trải nghiệm người dùng tốt. Tôi làm việc cả frontend lẫn backend, từ thiết kế giao diện đến xây dựng hệ thống và cơ sở dữ liệu, đảm bảo tính ổn định và khả năng mở rộng. Bên cạnh đó, tôi có kinh nghiệm với DevOps, ORM và các công cụ hỗ trợ AI để tối ưu quy trình phát triển. Tôi luôn hướng đến việc tạo ra những sản phẩm chất lượng và không ngừng học hỏi công nghệ mới.",
    heroCtaProjects: "Xem dự án",
    heroCtaContact: "Liên hệ",
    skillsKicker: "Kỹ năng",
    skillsTitle: "Kỹ năng tập trung vào chuyển động",
    skillsDesc:
      "Tôi tập trung vào stack hiện đại, lưu ý tối ưu hiệu năng và tính tương tác của giao diện.",
    projectsKicker: "Dự án",
    projectsTitle: "Dự án nổi bật",
    projectsCount: "03 case study",
    aboutKicker: "Giới thiệu",
    aboutTitle: "Tôi tạo trải nghiệm có chiều sâu.",
    aboutDesc:
      "8+ năm làm việc với sản phẩm số, tôi kết hợp thiết kế giao diện, kỹ thuật 3D và backend mạnh để đưa ý tưởng thành hệ thống sẵn sàng.",
    aboutCard1: "Kiến trúc hệ thống mở rộng",
    aboutCard2: "UX/UI có cảm xúc",
    aboutCard3: "3D + motion tinh tế",
    aboutCard4: "Backend ổn định",
    aiKicker: "AI Studio",
    aiTitle: "AI hỗ trợ kể chuyện",
    aiFeature1Title: "AI Project Narratives",
    aiFeature1Detail: "Tự động tạo mô tả dự án bằng tone giọng thương hiệu cá nhân.",
    aiFeature2Title: "Smart Content Suggestions",
    aiFeature2Detail: "Gợi ý case study, hình ảnh và CTA dựa trên hành vi truy cập.",
    aiFeature3Title: "Portfolio Chatbot",
    aiFeature3Detail: "Bot giới thiệu bản thân, trả lời nhanh và điều hướng người xem.",
    blogKicker: "Tài liệu & Blog",
    blogTitle: "Bài viết kỹ thuật",
    blogViewAll: "Xem tất cả",
    blogReadMore: "Đọc thêm",
    subscribeKicker: "Đăng ký",
    subscribeTitle: "Nhận bản tin về case study mới",
    subscribeDesc: "Cập nhật nhanh về dự án, bài viết kỹ thuật và những thử nghiệm 3D mới.",
    subscribePlaceholder: "Email của bạn",
    subscribeButton: "Đăng ký",
    subscribeNote: "Chưa gửi thật, đây là khung giao diện để bạn tùy biến.",
    contactKicker: "Liên hệ",
    contactTitle: "Hợp tác cùng tôi",
    contactDesc:
      "Gửi thông tin dự án, tôi sẽ phản hồi trong 24 giờ. Form này kết nối trực tiếp với NestJS + MySQL.",
    contactLocation: "Đà Nẵng, Việt Nam",
    contactOpen: "Mở hợp tác toàn cầu",
    formName: "Tên của bạn",
    formEmail: "Email",
    formSubject: "Chủ đề",
    formMessage: "Nội dung",
    formSend: "Gửi tin nhắn",
    formSending: "Đang gửi...",
    formSuccess: "Đã gửi thành công!",
    formError: "Có lỗi xảy ra, thử lại.",
    liveChatTitle: "Live chat",
    liveChatHint:
      "Xin chào! Đây là khung live chat. Bạn có thể kết nối với bot hoặc hệ thống chat thật sau này.",
    liveChatPlaceholder: "Nhập tin nhắn...",
    liveChatToggleOpen: "Live chat",
    liveChatToggleClose: "Thu nhỏ",
    modalOpenDemo: "Mở live demo",
    modalClose: "Đóng lại",
    footerRights: "© 2026 Doan. All rights reserved.",
  },
  en: {
    navHero: "Hero",
    navSkills: "My Skills",
    navProjects: "My Projects",
    navAbout: "About",
    navContact: "Contact",
    navSubscribe: "Subscribe",
    navDocs: "Docs",
    downloadCv: "Download CV",
    heroKicker: "Fullstack + Creative Engineer",
    heroTitle: "Hi! I'm Tuyen Doan",
    heroDesc:
      "I am a Fullstack Developer focused on building modern, scalable web applications with strong performance and user experience. I work across both frontend and backend, from crafting responsive interfaces to designing robust systems and databases that ensure reliability and scalability. In addition, I have experience with DevOps practices, ORM tools, and AI-assisted development to optimize workflows. I am passionate about creating high-quality products while continuously learning and adapting to new technologies.",
    heroCtaProjects: "View projects",
    heroCtaContact: "Contact",
    skillsKicker: "My Skills",
    skillsTitle: "Skills tuned for motion",
    skillsDesc:
      "I focus on modern stacks with performance and interaction quality at the core.",
    projectsKicker: "Projects",
    projectsTitle: "Featured work",
    projectsCount: "03 case studies",
    aboutKicker: "About", 
    aboutTitle: "I build depth-first experiences.",
    aboutDesc:
      "8+ years in digital products, blending UI craft, 3D engineering, and robust backend systems.",
    aboutCard1: "Scalable system architecture",
    aboutCard2: "Emotion-led UX/UI",
    aboutCard3: "Refined 3D + motion",
    aboutCard4: "Reliable backend",
    aiKicker: "AI Studio",
    aiTitle: "AI storytelling support",
    aiFeature1Title: "AI Project Narratives",
    aiFeature1Detail: "Auto-generate project stories with your personal brand tone.",
    aiFeature2Title: "Smart Content Suggestions",
    aiFeature2Detail: "Recommend case studies, visuals, and CTAs based on visitor intent.",
    aiFeature3Title: "Portfolio Chatbot",
    aiFeature3Detail: "Introduce yourself, answer quickly, and guide visitors.",
    blogKicker: "Docs & Blog",
    blogTitle: "Technical writing",
    blogViewAll: "View all",
    blogReadMore: "Read more",
    subscribeKicker: "Subscribe",
    subscribeTitle: "Get new case study updates",
    subscribeDesc: "Quick updates on projects, technical notes, and fresh 3D experiments.",
    subscribePlaceholder: "Your email",
    subscribeButton: "Subscribe",
    subscribeNote: "Placeholder UI for now. Connect to backend later.",
    contactKicker: "Contact",
    contactTitle: "Work with me",
    contactDesc:
      "Share your project details. I will respond within 24 hours. This form connects to NestJS + MySQL.",
    contactLocation: "Da Nang, Viet Nam",
    contactOpen: "Open for global work",
    formName: "Your name",
    formEmail: "Email",
    formSubject: "Subject",
    formMessage: "Message",
    formSend: "Send message",
    formSending: "Sending...",
    formSuccess: "Sent successfully!",
    formError: "Something went wrong. Try again.",
    liveChatTitle: "Live chat",
    liveChatHint: "Hi! This is a live chat shell. You can connect to a bot or real chat later.",
    liveChatPlaceholder: "Type a message...",
    liveChatToggleOpen: "Live chat",
    liveChatToggleClose: "Minimize",
    modalOpenDemo: "Open live demo",
    modalClose: "Close",
    footerRights: "© 2026 Doan. All rights reserved.",
  },
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof Dictionary) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("vi");

  useEffect(() => {
    const stored = window.localStorage.getItem("language");
    if (stored === "vi" || stored === "en") {
      setLanguage(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("language", language);
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key) => dictionary[language][key],
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
