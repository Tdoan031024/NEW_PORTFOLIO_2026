export type ProjectDetailData = {
  slug: string;
  title: string;
  subtitle: string;
  hero: string;
  timeline: string;
  duration: string;
  role: string;
  stack: string[];
  context: string[];
  goals: string[];
  responsibilities: string[];
  team: string[];
  architecture: string;
  modules: {
    title: string;
    items: string[];
  }[];
  flows: string[];
  results: string[];
  challenges: {
    title: string;
    solution: string;
  }[];
  coverImage: string;
  fullPageImage: string;
  gallery: {
    src: string;
    title: string;
    detail: string;
  }[];
  liveUrl?: string;
  githubUrl?: string;
  references?: {
    label: string;
    url?: string;
  }[];
};

export const projectDetailsMap: Record<string, ProjectDetailData> = {
  "huit-fest-2026": {
    slug: "huit-fest-2026",
    title: "HUIT FEST 2026",
    subtitle: "Music Concert & Đại nhạc hội Sinh viên - City Heart",
    hero:
      "Nền tảng truyền thông và sự kiện âm nhạc quy mô lớn của Trường ĐH Công Thương TP.HCM, kết nối học sinh THPT và sinh viên. Hệ thống cung cấp thông tin ca sĩ khách mời, lịch trình biểu diễn từng khung giờ, sơ đồ gian hàng và đăng ký vé online thời gian thực.",
    timeline: "01/03/2026 - 15/04/2026",
    duration: "6 tuần",
    role: "Full-stack Developer",
    stack: ["HTML5", "CSS3 / Sass", "JavaScript ES6+", "Swiper.js", "jQuery", "Node.js", "Responsive Web Design"],
    context: [
      "Đại nhạc hội HUIT FEST 2026 - City Heart là sự kiện âm nhạc văn hóa thường niên lớn nhất của Trường ĐH Công Thương TP.HCM, quy tụ hàng chục ngàn học sinh THPT các tỉnh và sinh viên toàn thành phố.",
      "Trước đây, thông tin sự kiện phân tán qua các bài đăng mạng xã hội, quy trình đăng ký vé và tiếp cận sơ đồ sân khấu, gian hàng thể thao Dạ Phi Cơ gặp nhiều khó khăn, thiếu tính chuyên nghiệp.",
      "Cần một trang web landing page âm nhạc hiện đại, trực quan, tốc độ tải cao và tương thích hoàn hảo trên mọi thiết bị di động.",
    ],
    goals: [
      "Xây dựng cổng thông tin số chính thức cho đại nhạc hội HUIT FEST 2026 với visual âm nhạc hiện đại, rực rỡ.",
      "Cung cấp line-up nghệ sĩ khách mời, lịch biểu diễn chi tiết từng khung giờ và quy định tham gia sự kiện.",
      "Tích hợp biểu mẫu đăng ký vé online tiện lợi, đồng bộ dữ liệu người tham gia thời gian thực.",
      "Tối ưu hóa hiệu năng trang, đảm bảo tải mượt mà khi hàng ngàn sinh viên truy cập cùng lúc trước giờ diễn.",
    ],
    responsibilities: [
      "Khảo sát yêu cầu truyền thông từ Ban tổ chức HUIT Media và phòng Công tác sinh viên.",
      "Phát triển toàn bộ giao diện Frontend với hiệu ứng glow, sound waves, animations mượt mà bằng Swiper.js và CSS hiện đại.",
      "Lập trình logic tiếp nhận đăng ký vé, kiểm tra trùng lặp email/SĐT và xuất danh sách cho BTC.",
      "Kiểm thử tương thích trên đa thiết bị từ iPhone, Android đến màn hình máy tính lớn.",
    ],
    team: [
      "Đỗ Văn Tuyến Đoàn - Full-stack Developer: Chịu trách nhiệm kiến trúc Frontend, tương tác giao diện, logic form đăng ký và tối ưu responsive.",
      "Ban biên tập HUIT Media: Cung cấp visual thiết kế 3D, thông tin line-up ca sĩ, nội dung truyền thông và sơ đồ sự kiện.",
    ],
    architecture:
      "Ứng dụng được xây dựng tối ưu theo kiến trúc Single Page Application hiệu năng cao, tối ưu kích thước bundle và asset hình ảnh. Sử dụng Swiper.js cho slider nghệ sĩ mượt mà ở 60fps, kết hợp API backend để ghi nhận thông tin vé với cơ chế throttle/rate limit chống nghẽn mạng.",
    modules: [
      {
        title: "Hero & Visual Identity",
        items: ["Key visual 3D City Heart", "Hiệu ứng ánh sáng neon & glow", "CTA đăng ký vé nhanh", "Đếm ngược thời gian sự kiện"],
      },
      {
        title: "Artist Line-up",
        items: ["Thư viện nghệ sĩ khách mời", "Slider ảnh chuyển động mượt mà", "Thông tin bài hit biểu diễn", "Âm thanh visualizer hiệu ứng"],
      },
      {
        title: "Schedule & Map",
        items: ["Lịch trình chi tiết 14:00 - 22:00", "Sơ đồ khu phức hợp thể thao Dạ Phi Cơ", "Vị trí gian hàng & check-in", "Quy định an ninh sự kiện"],
      },
      {
        title: "Registration & Ticket",
        items: ["Form đăng ký vé trực tuyến", "Xác thực số điện thoại/Email", "Xuất mã QR vé tham dự", "Dashboard theo dõi số lượng vé cho BTC"],
      },
    ],
    flows: [
      "Học sinh/Sinh viên: Vào website -> Xem clip/visual sự kiện -> Xem line-up ca sĩ & timeline -> Bấm 'Đăng ký vé' -> Điền thông tin -> Nhận mã xác nhận.",
      "Ban tổ chức: Đăng nhập quản trị -> Theo dõi số lượng vé đăng ký theo thời gian thực -> Xuất danh sách Excel phục vụ khâu soát vé tại cổng.",
    ],
    results: [
      "Website ra mắt thành công thu hút hàng chục ngàn lượt xem từ sinh viên HUIT và các trường THPT liên kết.",
      "Tiếp nhận hơn 5.000+ lượt đăng ký vé trực tuyến thành công, không xảy ra sự cố nghẽn mạng hay lỗi dữ liệu.",
      "Được Ban giám hiệu và Đoàn trường ĐH Công Thương TP.HCM đánh giá cao về tính thẩm mỹ và độ hoàn thiện kỹ thuật.",
    ],
    challenges: [
      {
        title: "Tối ưu hóa hiệu ứng đồ họa nặng",
        solution: "Sử dụng kỹ thuật lazy loading cho hình ảnh, nén asset đồ họa cao cấp và tận dụng GPU acceleration cho CSS transitions để giữ 60fps.",
      },
      {
        title: "Lượng truy cập tăng đột biến",
        solution: "Áp dụng cơ chế caching tài nguyên tĩnh, tối ưu hóa payload dữ liệu biểu mẫu để giảm tải máy chủ trong giờ cao điểm.",
      },
      {
        title: "Độ chuẩn xác hiển thị trên mobile",
        solution: "Thiết kế mobile-first, tinh chỉnh touch gestures cho carousel nghệ sĩ trên cả iOS Safari và Android Chrome.",
      },
    ],
    coverImage: "/assets/project-previews/huitfest/cover.png",
    fullPageImage: "/assets/project-previews/huitfest/fullpage.png",
    gallery: [
      {
        src: "/assets/project-previews/huitfest/cover.png",
        title: "Desktop Experience & Key Visual",
        detail: "Giao diện mở đầu với key visual City Heart, visual 3D và nút đăng ký vé nhanh.",
      },
      {
        src: "/assets/project-previews/huitfest/tablet.png",
        title: "Tablet & Responsive Showcase",
        detail: "Bố cục tối ưu trên màn hình iPad/Tablet hiển thị danh sách nghệ sĩ biểu diễn và sơ đồ.",
      },
      {
        src: "/assets/project-previews/huitfest/mobile.png",
        title: "Mobile Optimized Experience",
        detail: "Trải nghiệm trên điện thoại thông minh dành cho hàng ngàn học sinh và sinh viên check-in.",
      },
      {
        src: "/assets/project-previews/huitfest/fullpage.png",
        title: "Toàn bộ cấu trúc sự kiện",
        detail: "Bản chụp dài ghi nhận toàn bộ thông tin timeline, line-up nghệ sĩ, quy định và đối tác.",
      },
    ],
    liveUrl: "https://huitfest.huitmedia.edu.vn/",
    references: [
      { label: "Live Production", url: "https://huitfest.huitmedia.edu.vn/" },
      { label: "Đơn vị: HUIT Media" },
    ],
  },

  "huit-startup-2026": {
    slug: "huit-startup-2026",
    title: "HUIT STARTUP 2026",
    subtitle: "Cuộc thi Khởi nghiệp Đổi mới Sáng tạo & Cổng bình chọn Realtime",
    hero:
      "Nền tảng cuộc thi khởi nghiệp sáng tạo cấp Thành phố HUIT Startup lần thứ VII với 240+ dự án tham gia từ hơn 70 trường. Hệ thống tích hợp bình chọn trực tuyến thời gian thực, bảng xếp hạng tự động, cơ chế chống gian lận vote và dashboard quản trị toàn diện.",
    timeline: "01/2026 - 04/2026",
    duration: "16 tuần",
    role: "Full-stack Developer",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST API", "MySQL", "Node.js", "Cloudflare"],
    context: [
      "HUIT Startup là cuộc thi Khởi nghiệp Đổi mới Sáng tạo cấp Thành phố lần thứ VII do Trung tâm Đổi mới Sáng tạo và Khởi nghiệp (IEC) - Trường ĐH Công Thương TP.HCM chủ trì.",
      "Quy mô mở rộng với hơn 240+ dự án tham gia từ hơn 70 trường Đại học, Cao đẳng và THPT trên cả nước, cạnh tranh qua 3 bảng thi đấu quyết liệt.",
      "Nhu cầu cấp thiết là một hệ thống số hóa toàn diện: công bố thể lệ, nhận hồ sơ đề tài trực tuyến, tổ chức bình chọn dự án yêu thích và bảng xếp hạng realtime chống gian lận.",
    ],
    goals: [
      "Xây dựng cổng thông tin chính thức của cuộc thi, truyền tải sứ mệnh Đổi mới sáng tạo - Phát triển bền vững.",
      "Hệ thống hóa danh sách 240+ dự án, hỗ trợ tìm kiếm theo bảng thi, trường học và lĩnh vực khởi nghiệp.",
      "Phát triển công cụ bình chọn trực tuyến thời gian thực với giải thuật chống spam, bot vote và bảo vệ tính công bằng.",
      "Cung cấp dashboard thống kê tiến độ bình chọn, biểu đồ trực quan cho Ban tổ chức và Hội đồng giám khảo.",
    ],
    responsibilities: [
      "Thiết kế kiến trúc hệ thống Full-stack (Next.js, TypeScript, RESTful API và cơ sở dữ liệu MySQL).",
      "Lập trình giao diện người dùng responsive, giao diện sáng/tối (Dark/Light mode switch), tìm kiếm & lọc dự án thông minh.",
      "Xây dựng thuật toán xác thực vote, mã hóa session và ngăn chặn gian lận tự động.",
      "Triển khai hệ thống lên hạ tầng production, cấu hình SSL, domain và giám sát vận hành suốt các vòng thi.",
    ],
    team: [
      "Đỗ Văn Tuyến Đoàn - Full-stack Developer: Phụ trách toàn bộ Frontend Next.js, API bình chọn, database MySQL và dashboard quản trị.",
      "Trung tâm IEC - HUIT: Điều phối thể lệ cuộc thi, kiểm duyệt danh sách dự án tham gia và hội đồng giám khảo.",
    ],
    architecture:
      "Kiến trúc Next.js App Router kết hợp server-side rendering (SSR) tối ưu SEO và client components tương tác cao. Cơ sở dữ liệu MySQL được đánh chỉ mục tối ưu cho các truy vấn đếm vote, kết hợp cache định kỳ để giảm tải database khi lượng bình chọn tăng cao.",
    modules: [
      {
        title: "Cổng thông tin & Thể lệ",
        items: ["Giới thiệu mục tiêu & sứ mệnh", "Lịch trình 5 vòng thi chi tiết", "Quy chế & tiêu chí chấm điểm", "Thông tin tài trợ kim cương & vàng"],
      },
      {
        title: "Khám phá 240+ Dự án",
        items: ["Phân loại theo 3 bảng thi", "Bộ lọc theo trường & lĩnh vực", "Chi tiết hồ sơ & video thuyết trình", "Tìm kiếm từ khóa tức thì"],
      },
      {
        title: "Hệ thống Bình chọn Realtime",
        items: ["Cổng vote trực tuyến bảo mật", "Giải thuật chống bot & IP throttle", "Cập nhật lượt bình chọn thời gian thực", "Xác thực tài khoản người bình chọn"],
      },
      {
        title: "Admin & Giám khảo",
        items: ["Bảng xếp hạng Leaderboard tự động", "Dashboard phân tích lượt vote theo giờ", "Phê duyệt và cập nhật trạng thái dự án", "Xuất báo cáo kết quả các vòng thi"],
      },
    ],
    flows: [
      "Khán giả/Sinh viên: Vào website -> Duyệt danh sách dự án -> Xem video & poster đề tài -> Nhấn 'Bình chọn' -> Xác thực -> Hệ thống ghi nhận lượt vote.",
      "Thí sinh: Đăng nhập -> Cập nhật tài liệu dự án, slide, video pitching -> Theo dõi điểm vote và tiến độ vào vòng trong.",
      "Ban tổ chức/Giám khảo: Quản lý dự án -> Giám sát bảng xếp hạng -> Xem thống kê lượt bình chọn hợp lệ -> Công bố kết quả.",
    ],
    results: [
      "Vận hành ổn định trong suốt các vòng sơ loại, bán kết và chung kết của HUIT Startup lần VII năm 2026.",
      "Ghi nhận hàng trăm ngàn lượt bình chọn hợp lệ từ cộng đồng khởi nghiệp toàn quốc.",
      "Hệ thống chống gian lận phát hiện và ngăn chặn thành công 100% các cuộc tấn công spam vote bằng script tự động.",
    ],
    challenges: [
      {
        title: "Chống gian lận bình chọn (Anti-fraud)",
        solution: "Kết hợp kiểm tra IP rate limit, User-Agent verification, token mã hóa dùng 1 lần và kiểm tra tương tác người dùng hợp lệ.",
      },
      {
        title: "Hiển thị mượt mà hàng trăm dự án",
        solution: "Áp dụng phân trang thông minh, virtualized list và lazy load poster thumbnail giúp website tải dưới 1.2s.",
      },
      {
        title: "Đồng bộ bảng xếp hạng realtime",
        solution: "Tối ưu hóa các câu lệnh truy vấn tổng hợp SQL, kết hợp caching định kỳ 10 giây để tránh query nặng liên tục.",
      },
    ],
    coverImage: "/assets/project-previews/huitstartup/cover.png",
    fullPageImage: "/assets/project-previews/huitstartup/fullpage.png",
    gallery: [
      {
        src: "/assets/project-previews/huitstartup/cover.png",
        title: "Cổng thông tin Cuộc thi Khởi nghiệp",
        detail: "Giao diện chính thức HUIT STARTUP Lần VII - Năm 2026 cấp Thành phố với 03 bảng thi.",
      },
      {
        src: "/assets/project-previews/huitstartup/tablet.png",
        title: "Bố cục Tablet & Dashboard tra cứu",
        detail: "Hiển thị danh sách 240+ đề tài, bảng xếp hạng và các đơn vị đồng hành tài trợ.",
      },
      {
        src: "/assets/project-previews/huitstartup/mobile.png",
        title: "Trải nghiệm Mobile & Bình chọn tiện lợi",
        detail: "Giao diện tối ưu di động cho ban giám khảo và hàng chục nghìn lượt vote của cộng đồng.",
      },
      {
        src: "/assets/project-previews/huitstartup/fullpage.png",
        title: "Toàn cảnh nền tảng HUIT Startup",
        detail: "Ảnh chụp dài ghi nhận đầy đủ tiến trình cuộc thi: nộp hồ sơ, tập huấn, bán kết và chung kết.",
      },
    ],
    liveUrl: "https://startup.huitmedia.edu.vn/",
    references: [
      { label: "Live Platform", url: "https://startup.huitmedia.edu.vn/" },
      { label: "Trung tâm IEC HUIT", url: "https://iec.huit.edu.vn" },
    ],
  },

  "sof-mobile-apps": {
    slug: "sof-mobile-apps",
    title: "SOF Mobile Ecosystem",
    subtitle: "Hệ sinh thái ứng dụng Android doanh nghiệp trên Google Play Store",
    hero:
      "Hệ sinh thái ứng dụng di động doanh nghiệp toàn diện phát hành trên Google Play: SOF F&B (Order & POS nhà hàng), SOF HRM (quản lý nhân sự), SOF FACE AI (chấm công nhận diện khuôn mặt), SOF WMS & WMS PRO (quản lý kho bãi), SOF PARKING & PARKING PRO (bãi đỗ xe thông minh) và SOF POS.",
    timeline: "01/2026 - 08/2026",
    duration: "32 tuần",
    role: "Mobile App Developer / Full-stack Developer",
    stack: ["React Native", "Android Java/Kotlin", "Face AI / Vision API", "SQLite", "Barcode / QR SDK", "ESC/POS Thermal Printing", "RESTful API", "IoT Hardware"],
    context: [
      "SOF Company Limited là đơn vị chuyên cung cấp giải pháp công nghệ quản trị doanh nghiệp toàn diện tại Việt Nam từ năm 2011.",
      "Các doanh nghiệp trong ngành F&B, chuỗi bán lẻ, logistic và nhà máy sản xuất cần các ứng dụng di động cầm tay nhanh, ổn định, hoạt động tốt trên thiết bị chuyên dụng và smartphone của nhân viên.",
      "Dự án phát triển và phát hành trọn bộ hệ sinh thái Android lên Google Play Store nhằm chuẩn hóa quy trình chuyển đổi số cho doanh nghiệp đối tác.",
    ],
    goals: [
      "Phát triển bộ giải pháp di động Android chuyên sâu phục vụ đa ngành nghề: Nhà hàng, Nhân sự, Kho bãi, Bãi đỗ xe và Bán hàng.",
      "Tích hợp công nghệ nhận diện khuôn mặt Face AI và quét mã Barcode/QR Code tốc độ cao.",
      "Giao tiếp với phần cứng ngoại vi: máy in bill nhiệt Bluetooth/LAN, ngăn kéo đựng tiền, đầu đọc RFID và camera thông minh.",
      "Đảm bảo tính ổn định cao, hỗ trợ chế độ offline-first sync khi kết nối mạng chập chờn.",
    ],
    responsibilities: [
      "Tham gia nghiên cứu và lập trình các ứng dụng Android bằng React Native / Android Native.",
      "Tích hợp module Face AI chấm công, xử lý luồng nhận diện và mã hóa vector khuôn mặt.",
      "Xây dựng tính năng quét mã vạch chuyên dụng cho kho vận SOF WMS & WMS PRO.",
      "Đóng gói, cấu hình signing key, tối ưu kích thước APK/AAB và xuất bản ứng dụng lên Google Play Console.",
    ],
    team: [
      "Đỗ Văn Tuyến Đoàn - Mobile App Developer / Full-stack Developer: Phát triển các tính năng cốt lõi, tích hợp API, tối ưu hóa giao diện và phát hành ứng dụng.",
      "Đội ngũ kỹ sư phần mềm SOF: Phụ trách kiến trúc Backend ERP, quản trị máy chủ cơ sở dữ liệu và tích hợp phần cứng bãi xe/kho vận.",
    ],
    architecture:
      "Kiến trúc React Native đa nền tảng kết hợp Native Modules chuyên dụng để tương tác sâu với phần cứng Android (Camera2 API, Bluetooth Printer SDK, NFC/RFID Scanner). Dữ liệu được lưu trữ local bằng SQLite với cơ chế đồng bộ hai chiều (Bi-directional Sync) lên máy chủ SOF Cloud.",
    modules: [
      {
        title: "SOF F&B & POS",
        items: ["Order món ăn tại bàn", "In phiếu chế biến bếp/bar qua mạng LAN", "Thanh toán VietQR động", "Quản lý ca bán hàng"],
      },
      {
        title: "SOF FACE AI & HRM",
        items: ["Chấm công nhận diện khuôn mặt < 1s", "Chống giả mạo ảnh chụp (Liveness detection)", "Đăng ký nghỉ phép trực tuyến", "Bảng lương & phiếu chấm công cá nhân"],
      },
      {
        title: "SOF WMS & WMS PRO",
        items: ["Quét mã Barcode / QR Code siêu tốc", "Nhập kho, xuất kho, kiểm kê định kỳ", "Điều chuyển hàng hóa liên chi nhánh", "Cảnh báo hàng sắp hết date"],
      },
      {
        title: "SOF PARKING & PRO",
        items: ["Nhận diện biển số xe tự động", "Ghi nhận vé qua thẻ từ RFID / QR", "Tính phí gửi xe tự động theo giờ", "Báo cáo doanh thu bãi đỗ xe theo ca"],
      },
    ],
    flows: [
      "Nhân viên F&B: Mở app -> Chọn bàn -> Lên order -> Gửi lệnh in bếp -> Khách thanh toán -> In hóa đơn và đóng bàn.",
      "Nhân viên chấm công: Đứng trước màn hình app SOF Face AI -> Camera nhận diện khuôn mặt -> Báo check-in thành công -> Dữ liệu đẩy về phòng Nhân sự.",
      "Thủ kho: Dùng điện thoại/PDA mở SOF WMS -> Quét mã pallet -> Cập nhật vị trí kệ hàng -> Xác nhận phiếu nhập kho.",
    ],
    results: [
      "Phát hành thành công trọn bộ 6+ ứng dụng doanh nghiệp chính thức trên Google Play Store.",
      "Được triển khai vận hành thực tế tại hàng trăm nhà hàng, chuỗi cà phê, kho logistics và tòa nhà bãi xe.",
      "Giảm 70% thời gian kiểm kê kho và loại bỏ hoàn toàn tình trạng chấm công hộ nhờ công nghệ Face AI.",
    ],
    challenges: [
      {
        title: "Tương thích phần cứng đa dạng",
        solution: "Xây dựng lớp abstraction driver cho máy in hóa đơn (ESC/POS) và máy quét mã vạch để hoạt động đồng nhất trên mọi dòng máy Android.",
      },
      {
        title: "Nhận diện khuôn mặt chính xác",
        solution: "Tối ưu hóa pipeline xử lý ảnh, cân chỉnh ngưỡng tin cậy nhận diện và nén vector để thời gian phản hồi đạt dưới 0.8 giây.",
      },
      {
        title: "Vận hành khi mất kết nối mạng",
        solution: "Áp dụng cơ chế lưu trữ cục bộ (Offline Queue), tự động đẩy dữ liệu lên Cloud ngay khi mạng phục hồi mà không làm mất hóa đơn.",
      },
    ],
    coverImage: "/assets/project-previews/sofapps/cover.png",
    fullPageImage: "/assets/project-previews/sofapps/fullpage.png",
    gallery: [
      {
        src: "/assets/project-previews/sofapps/cover.png",
        title: "Trang Nhà phát triển Google Play - SOF",
        detail: "Hồ sơ chính thức của SOF Company Limited phát hành loạt ứng dụng Android doanh nghiệp.",
      },
      {
        src: "/assets/project-previews/sofapps/tablet.png",
        title: "Tablet & POS Terminal Interface",
        detail: "Giao diện tối ưu hóa cho màn hình máy tính bảng và thiết bị thanh toán POS tại quầy.",
      },
      {
        src: "/assets/project-previews/sofapps/mobile.png",
        title: "Ứng dụng Di động Chuyên nghiệp",
        detail: "Trải nghiệm mượt mà của SOF F&B, Face AI chấm công và kiểm kê kho bãi bằng mã vạch.",
      },
      {
        src: "/assets/project-previews/sofapps/fullpage.png",
        title: "Toàn bộ hệ sinh thái SOF Android",
        detail: "Danh mục 6+ ứng dụng tiêu biểu: F&B, HRM, Face AI, WMS, Parking, POS phục vụ hàng nghìn người dùng.",
      },
    ],
    liveUrl: "https://play.google.com/store/apps/developer?id=SOF+Company+Limited&hl=vi",
    references: [
      { label: "Google Play Store", url: "https://play.google.com/store/apps/developer?id=SOF+Company+Limited&hl=vi" },
      { label: "SOF Company Website", url: "https://sof.com.vn/" },
    ],
  },

  "sof-saas-platform": {
    slug: "sof-saas-platform",
    title: "SOF SaaS Platform",
    subtitle: "Nền tảng Web SaaS quản trị doanh nghiệp và chuyển đổi số toàn diện",
    hero:
      "Nền tảng Web SaaS quản trị doanh nghiệp và chuyển đổi số toàn diện: quản trị nhân sự HRM, quản lý bán hàng đa kênh POS, chuỗi F&B, quản lý kho bãi, vận tải và hệ thống ERP. Tích hợp cổng thanh toán trực tuyến (VNPay, Momo, VietQR) và báo cáo realtime.",
    timeline: "01/2026 - 08/2026",
    duration: "32 tuần",
    role: "Full-stack Developer",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "MySQL", "MongoDB", "Cloudflare", "REST API", "VNPay / Momo / VietQR"],
    context: [
      "Nhu cầu chuyển đổi số toàn diện của các doanh nghiệp vừa và lớn tại Việt Nam đòi hỏi một hệ thống phần mềm quản trị tích hợp (All-in-One SaaS), kết nối thông suốt từ nhân sự, kế toán thuế, bán lẻ đến kho bãi.",
      "Việc sử dụng các phần mềm rời rạc làm nghẽn dòng chảy thông tin, sai lệch dữ liệu tài chính và tốn kém chi phí bảo trì.",
      "SOF SaaS Platform được xây dựng như một nền tảng đám mây mở, có thể mở rộng theo quy mô và tùy biến linh hoạt cho từng phân khúc khách hàng.",
    ],
    goals: [
      "Xây dựng nền tảng Web SaaS hiện đại, phân quyền đa cấp, hỗ trợ quản lý đa chi nhánh và đa doanh nghiệp (Multi-tenant).",
      "Tích hợp đồng bộ các phân hệ trọng yếu: ERP tài chính kế toán, Quản trị nhân sự HRM, Bán lẻ đa kênh POS và Quản lý kho WMS.",
      "Tích hợp cổng thanh toán trực tuyến bảo mật: VNPay, Momo, ZaloPay và mã VietQR động tự động khớp giao dịch.",
      "Cung cấp hệ thống báo cáo Business Intelligence (BI) cập nhật thời gian thực, hỗ trợ ra quyết định kinh doanh chuẩn xác.",
    ],
    responsibilities: [
      "Tham gia thiết kế giao diện UI/UX và phát triển Full-stack các module chức năng trên nền tảng Next.js / TypeScript.",
      "Xây dựng các RESTful API bảo mật cao, kết nối dữ liệu giữa cổng Web quản trị và ứng dụng di động.",
      "Tích hợp cổng thanh toán điện tử (VNPay, Momo, VietQR) và webhook xác nhận giao dịch ngân hàng.",
      "Tối ưu hóa hiệu năng câu lệnh SQL, xây dựng dashboard biểu đồ thống kê trực quan và xuất báo cáo Excel/PDF.",
    ],
    team: [
      "Đỗ Văn Tuyến Đoàn - Full-stack Developer: Phát triển các module giao diện người dùng, tích hợp API thanh toán và tối ưu trải nghiệm.",
      "Đội ngũ Kỹ sư giải pháp SOF: Thiết kế kiến trúc Multi-tenant, quy chuẩn kế toán thuế và bảo mật đám mây.",
    ],
    architecture:
      "Hệ thống xây dựng theo mô hình Microservices/Modular Monolith với Next.js hiện đại ở Frontend và Node.js API Gateway ở Backend. Tách biệt cơ sở dữ liệu tenant, sử dụng cơ chế JWT xác thực bảo mật, tích hợp Cloudflare CDN bảo vệ DDoS và SSL toàn diện.",
    modules: [
      {
        title: "ERP & Tài chính kế toán",
        items: ["Quản lý hóa đơn điện tử kết nối thuế", "Sổ thu chi, dòng tiền minh bạch", "Tính toán giá vốn và lợi nhuận", "Dự báo chi phí tự động"],
      },
      {
        title: "HRM & Quản trị Nhân lực",
        items: ["Hồ sơ nhân sự điện tử", "Chấm công tự động từ Face AI/Máy vân tay", "Bảng tính lương tự động hóa", "Đánh giá KPI & khen thưởng"],
      },
      {
        title: "POS & Thương mại Đa kênh",
        items: ["Bán hàng tại quầy siêu tốc", "Quản lý khuyến mãi & thẻ thành viên", "Đồng bộ đơn hàng đa sàn", "Quản lý ca làm việc thu ngân"],
      },
      {
        title: "Cổng Thanh toán & Báo cáo",
        items: ["Tích hợp VietQR, VNPay, Momo", "Báo cáo doanh số thời gian thực", "Thống kê biểu đồ trực quan", "Xuất file kế toán Excel, PDF"],
      },
    ],
    flows: [
      "Chủ doanh nghiệp: Đăng nhập -> Xem Dashboard doanh thu toàn hệ thống -> Duyệt kế hoạch chi tiêu -> Xem báo cáo lãi lỗ.",
      "Quản lý chi nhánh: Quản lý hàng hóa -> Cài đặt giá bán & khuyến mãi -> Kiểm soát ca làm việc nhân viên -> Chốt doanh thu ngày.",
      "Kế toán: Đối soát giao dịch chuyển khoản VietQR tự động -> Xuất hóa đơn điện tử hợp lệ -> Kết chuyển sổ sách cuối tháng.",
    ],
    results: [
      "Triển khai thành công cho hàng chục doanh nghiệp và thương hiệu lớn: Becamex, Century, JVPC, Petimex Dopetco...",
      "Xử lý hàng triệu giao dịch mỗi tháng với thời gian uptime đạt 99.9%.",
      "Tăng 40% hiệu suất xử lý đơn hàng và giảm thiểu sai sót đối soát tài chính kế toán.",
    ],
    challenges: [
      {
        title: "Độ chính xác tuyệt đối trong giao dịch tiền tệ",
        solution: "Áp dụng Database Transactions với cơ chế khóa lạc quan (Optimistic Locking) và hệ thống log audit chi tiết cho mọi biến động số dư.",
      },
      {
        title: "Xử lý khối lượng báo cáo lớn",
        solution: "Đánh index tối ưu cho bảng giao dịch hàng triệu bản ghi, sử dụng background worker cho tác vụ kết xuất file Excel nặng.",
      },
      {
        title: "Bảo mật đa tầng dữ liệu khách hàng",
        solution: "Mã hóa dữ liệu nhạy cảm, áp dụng kiểm tra quyền hạn RBAC chặt chẽ và cấu hình tường lửa Cloudflare WAF.",
      },
    ],
    coverImage: "/assets/project-previews/sofsaas/cover.png",
    fullPageImage: "/assets/project-previews/sofsaas/fullpage.png",
    gallery: [
      {
        src: "/assets/project-previews/sofsaas/cover.png",
        title: "Cổng Nền tảng SOF Enterprise SaaS",
        detail: "Giao diện quản trị số tập trung cung cấp giải pháp ERP, HRM, POS và WMS cho doanh nghiệp.",
      },
      {
        src: "/assets/project-previews/sofsaas/tablet.png",
        title: "Dashboard Báo cáo & Phân tích Đa chiều",
        detail: "Biểu đồ trực quan hóa dữ liệu kinh doanh, dòng tiền, doanh thu chi nhánh trên Tablet.",
      },
      {
        src: "/assets/project-previews/sofsaas/mobile.png",
        title: "Phiên bản Di động cho Nhà quản lý",
        detail: "Giám sát số liệu bán hàng, duyệt chi, xem báo cáo tức thì trên điện thoại cá nhân.",
      },
      {
        src: "/assets/project-previews/sofsaas/fullpage.png",
        title: "Toàn bộ Hệ sinh thái Giải pháp Số SOF",
        detail: "Ảnh chụp trang web bao quát hệ thống đối tác: Becamex, Century, Petro, Bueno, BizNet...",
      },
    ],
    liveUrl: "https://sof.com.vn/",
    references: [
      { label: "Live Website", url: "https://sof.com.vn/" },
      { label: "Hotline Hỗ trợ SOF", url: "tel:0329349469" },
    ],
  },

  "elh-ecommerce": {
    slug: "elh-ecommerce",
    title: "ELH E-Commerce",
    subtitle: "Thương mại điện tử thiết bị điện công nghiệp & giải pháp tự động hóa",
    hero:
      "Website thương mại điện tử chuyên cung cấp thiết bị điện công nghiệp và giải pháp tự động hóa chính hãng (MPE, Siemens, ABB, Hitachi, SMC...). Hệ thống tích hợp tra cứu model thông minh, bộ lọc thông số kỹ thuật đa tầng, so sánh sản phẩm, danh sách yêu thích và giỏ hàng thanh toán trực tuyến.",
    timeline: "03/2026 - 07/2026",
    duration: "18 tuần",
    role: "Full-stack Developer",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "E-Commerce Architecture", "SEO & Schema.org", "RESTful API", "Search Engine"],
    context: [
      "Ngành thiết bị điện công nghiệp và tự động hóa có đặc thù kỹ thuật rất cao: hàng chục ngàn mã model (SKU) với thông số phức tạp (dòng định mức, điện áp, số cực, độ bền cơ học...).",
      "Khách hàng kỹ sư, nhà thầu cơ điện và doanh nghiệp nhà máy gặp khó khăn khi tra cứu tài liệu datasheet và tìm kiếm thiết bị tương thích trên các website thương mại thông thường.",
      "ELH Technology cần một nền tảng e-commerce chuyên nghiệp, kết hợp giữa mua hàng trực tuyến và công cụ tra cứu kỹ thuật thông minh.",
    ],
    goals: [
      "Xây dựng website thương mại điện tử thiết bị điện công nghiệp với giao diện hiện đại, chuyên nghiệp và uy tín.",
      "Phát triển công cụ tìm kiếm và bộ lọc đa tiêu chí cực nhanh cho hàng ngàn mã sản phẩm từ các hãng lớn (Siemens, Schneider, ABB, Hitachi, MPE...).",
      "Cung cấp tính năng so sánh thông số kỹ thuật trực quan giữa các model để kỹ sư dễ dàng lựa chọn thiết bị phù hợp.",
      "Tích hợp tính năng tải datasheet PDF, danh sách yêu thích và quy trình đặt hàng/báo giá dự án nhanh chóng.",
    ],
    responsibilities: [
      "Thiết kế và phát triển toàn bộ Frontend E-commerce bằng Next.js, React, TypeScript và Tailwind CSS.",
      "Xây dựng công cụ tìm kiếm tức thì (Instant Search) và bộ lọc thuộc tính đa tầng không cần tải lại trang.",
      "Lập trình tính năng giỏ hàng, bảng so sánh sản phẩm (Product Comparison Matrix) và danh sách yêu thích (Wishlist).",
      "Tối ưu hóa SEO kỹ thuật (Server-Side Rendering, Structured Data Schema.org) để các mã model thiết bị lên top tìm kiếm Google.",
    ],
    team: [
      "Đỗ Văn Tuyến Đoàn - Full-stack Developer: Phát triển toàn diện hệ thống Frontend E-Commerce, bộ lọc sản phẩm, giỏ hàng và tích hợp API.",
      "Đội ngũ Kỹ thuật ELH Group: Cung cấp cơ sở dữ liệu sản phẩm, catalog thông số kỹ thuật và định giá thương mại.",
    ],
    architecture:
      "Ứng dụng Next.js kết hợp Incremental Static Regeneration (ISR) giúp trang sản phẩm tải tức thì trong khi dữ liệu giá bán và tồn kho vẫn được cập nhật liên tục. Trạng thái giỏ hàng và danh sách so sánh được quản lý client-side bằng lightweight state store, đồng bộ với local storage.",
    modules: [
      {
        title: "Catalog & Search Engine",
        items: ["Tìm kiếm thông minh theo mã model chính xác", "Lọc theo thương hiệu, điện áp, công suất, dòng cắt", "Phân cấp ngành hàng sâu 3 cấp", "Gợi ý từ khóa kỹ thuật tức thì"],
      },
      {
        title: "So sánh & Chi tiết Kỹ thuật",
        items: ["Bảng so sánh trực quan thông số giữa các model", "Tải tài liệu datasheet / Catalog PDF chính hãng", "Hiển thị giấy chứng nhận CO/CQ", "Sản phẩm tương thích gợi ý"],
      },
      {
        title: "E-Commerce & Đặt hàng",
        items: ["Giỏ hàng trực tuyến", "Gửi yêu cầu báo giá dự án số lượng lớn", "Tra cứu đơn hàng", "Liên kết tư vấn kỹ thuật qua Hotline / Zalo"],
      },
      {
        title: "Hệ thống Giải pháp & Đại lý",
        items: ["Trang giải pháp tự động hóa theo ngành", "Mạng lưới đại lý ủy quyền toàn quốc", "Chính sách bảo hành chính hãng", "Tin tức công nghệ công nghiệp"],
      },
    ],
    flows: [
      "Kỹ sư cơ điện: Vào web ELH -> Gõ mã thiết bị 'MCB 3P 32A' -> Lọc thương hiệu ABB -> So sánh thông số với Siemens -> Bấm 'Yêu cầu báo giá' hoặc 'Thêm giỏ hàng'.",
      "Nhà thầu: Chọn danh sách 20 loại thiết bị cho dự án -> Gửi file yêu cầu -> Nhận báo giá chiết khấu đại lý qua email và hotline.",
    ],
    results: [
      "Website đi vào hoạt động chính thức tại địa chỉ `elh.com.vn`, nâng tầm hình ảnh thương hiệu ELH Technology.",
      "Tăng gấp 3 lần lượng khách hàng kỹ sư tìm kiếm và tải catalog tài liệu thiết bị trực tiếp trên website.",
      "Tốc độ phản hồi tìm kiếm model sản phẩm đạt dưới 100ms, mang lại trải nghiệm mượt mà vượt trội.",
    ],
    challenges: [
      {
        title: "Quản lý cấu trúc thuộc tính sản phẩm phức tạp",
        solution: "Thiết kế schema dữ liệu linh hoạt (EAV/JSON attribute pattern) cho phép mỗi danh mục có các bộ thông số kỹ thuật đặc thù riêng.",
      },
      {
        title: "Tối ưu hóa SEO cho hàng chục ngàn mã model",
        solution: "Tự động sinh Meta Tags, Breadcrumb Schema và OpenGraph cho từng SKU sản phẩm thông qua Next.js Metadata API.",
      },
      {
        title: "Trải nghiệm xem bảng thông số trên màn hình nhỏ",
        solution: "Thiết kế bảng so sánh thông số có khả năng cuộn ngang mượt mà, cố định cột tên model để kỹ sư dễ đối chiếu trên điện thoại.",
      },
    ],
    coverImage: "/assets/project-previews/elh/cover.png",
    fullPageImage: "/assets/project-previews/elh/fullpage.png",
    gallery: [
      {
        src: "/assets/project-previews/elh/cover.png",
        title: "ELH Technology - Thiết Bị Điện & Tự Động Hóa",
        detail: "Trang thương mại điện tử chuyên cung cấp thiết bị công nghiệp chính hãng: MCB, Contactor, PLC...",
      },
      {
        src: "/assets/project-previews/elh/tablet.png",
        title: "Danh mục sản phẩm & Tra cứu Model kỹ thuật",
        detail: "Giao diện Tablet hiển thị bộ lọc thông số kỹ thuật đa cấp theo thương hiệu Siemens, ABB, MPE.",
      },
      {
        src: "/assets/project-previews/elh/mobile.png",
        title: "Trải nghiệm mua sắm thiết bị trên Mobile",
        detail: "Tìm kiếm nhanh theo mã model sản phẩm, xem tài liệu catalog và đặt hàng thuận tiện.",
      },
      {
        src: "/assets/project-previews/elh/fullpage.png",
        title: "Toàn cảnh Website Thương mại điện tử ELH",
        detail: "Ảnh chụp dài ghi nhận toàn diện danh mục ngành hàng, giải pháp công nghiệp, đối tác và chứng nhận.",
      },
    ],
    liveUrl: "https://elh.com.vn/",
    references: [
      { label: "Live E-Commerce Web", url: "https://elh.com.vn/" },
      { label: "ELH Group Corporation" },
    ],
  },

  "huit-iconic-2026": {
    slug: "huit-iconic-2026",
    title: "HUIT's ICONIC 2026",
    subtitle: "Cuộc thi Tìm kiếm Đại sứ Truyền thông HUIT - The Rise of Icon",
    hero:
      "Nền tảng Cuộc thi Tìm kiếm Đại sứ Truyền thông HUIT's ICONIC 2026 tôn vinh nét đẹp tâm hồn, trí tuệ, thanh lịch và bản lĩnh sinh viên HUIT. Tích hợp cổng bình chọn trực tuyến đa ngôn ngữ (VI/EN), hiển thị hồ sơ thí sinh đa phương tiện, bảng xếp hạng realtime và chấm điểm giám khảo.",
    timeline: "08/2026 - 10/2026",
    duration: "10 tuần",
    role: "Full-stack Developer",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "i18n (VI/EN)", "MySQL", "CSS Animation", "Responsive Design"],
    context: [
      "HUIT's ICONIC 2026 là cuộc thi Tìm kiếm Đại sứ Truyền thông Trường Đại học Công Thương TP.HCM, nơi tôn vinh nét đẹp tâm hồn, trí tuệ, thanh lịch và bản lĩnh của sinh viên.",
      "Cuộc thi thu hút sự quan tâm lớn từ hàng chục ngàn sinh viên, cựu sinh viên và các đơn vị truyền thông với khẩu hiệu 'Tâm hồn · Trí tuệ · Thanh lịch · Bản lĩnh'.",
      "Cần một nền tảng trực tuyến đẳng cấp quốc tế, vừa thể hiện vẻ đẹp visual sang trọng, vừa phục vụ đăng ký hồ sơ thí sinh, chấm điểm giám khảo và bình chọn trực tuyến công khai.",
    ],
    goals: [
      "Thiết kế website theo phong cách mỹ thuật cao cấp với hiệu ứng 3D Key Visual, ánh sáng xanh huyền ảo và chuyển động mở màn kịch tính.",
      "Cung cấp hệ thống hồ sơ thí sinh đa phương tiện (ảnh chân dung nghệ thuật, profile học tập, video tài năng).",
      "Xây dựng cổng bình chọn trực tuyến an toàn, cập nhật bảng xếp hạng Top 1, Top 2, Top 3 theo thời gian thực.",
      "Hỗ trợ đa ngôn ngữ đầy đủ (Song ngữ Tiếng Việt - Tiếng Anh) và chuyển đổi giao diện sáng/tối linh hoạt.",
    ],
    responsibilities: [
      "Lập trình Full-stack toàn bộ nền tảng bằng Next.js, React, TypeScript, Tailwind CSS và MySQL.",
      "Xây dựng hiệu ứng visual chuyển động (Curtain reveal, glowing effects, countdown timer).",
      "Triển khai hệ thống đa ngôn ngữ i18n (VI/EN) và chuyển đổi theme Light/Dark mượt mà.",
      "Phát triển logic bình chọn bảo mật, chống spam vote và tích hợp các kênh truyền thông xã hội (Facebook, TikTok, Zalo).",
    ],
    team: [
      "Đỗ Văn Tuyến Đoàn - Full-stack Developer: Trực tiếp xây dựng toàn bộ website từ Frontend, API bình chọn đến database và deploy.",
      "Hội đồng Giám khảo & BTC HUIT Media: Trưởng BTC Thầy Đặng Xuân Dương và ban biên tập nội dung cuộc thi.",
    ],
    architecture:
      "Kiến trúc Next.js App Router hiện đại với tối ưu hóa asset hình ảnh WebP/AVIF. Hệ thống bình chọn sử dụng API endpoints bảo vệ bằng rate limit, token xác thực phiên duy nhất kết hợp caching bảng xếp hạng để đảm bảo tốc độ phản hồi dưới 50ms.",
    modules: [
      {
        title: "Visual & Event Identity",
        items: ["Key visual 3D đại dương phát sáng", "Hiệu ứng rèm mở màn (Curtain Reveal)", "Đồng hồ đếm ngược ngày mở đơn đăng ký", "Nút liên kết nhanh Zalo, Hotline, Email BTC"],
      },
      {
        title: "Cổng Đăng ký & Thí sinh",
        items: ["Form nộp hồ sơ thí sinh trực tuyến", "Tải ảnh nghệ thuật và hồ sơ cá nhân", "Phân loại theo khoa/ngành học", "Hệ thống xét duyệt hồ sơ cho BTC"],
      },
      {
        title: "Bình chọn & Bảng xếp hạng",
        items: ["Cổng vote trực tuyến an toàn", "Bảng xếp hạng Top thí sinh realtime", "Cơ chế bảo vệ chống spam click", "Hiển thị tỷ lệ bình chọn trực quan"],
      },
      {
        title: "Đa ngôn ngữ & Tin tức",
        items: ["Hỗ trợ chuyển đổi song ngữ VI/EN", "Theme sáng/tối (Dark/Light mode)", "Cập nhật bài viết hành trình cuộc thi", "Mạng lưới đối tác và đơn vị bảo trợ hình ảnh"],
      },
    ],
    flows: [
      "Thí sinh: Vào website -> Đọc thể lệ & tiêu chí cuộc thi -> Nhấn 'Đăng ký dự thi ngay' -> Điền thông tin và tải ảnh profile -> Hoàn tất nộp đơn.",
      "Khán giả/Cộng đồng: Khám phá hồ sơ các thí sinh -> Chuyển ngôn ngữ VI/EN -> Nhấn 'Bình chọn' cho đại sứ yêu thích -> Theo dõi bảng xếp hạng cập nhật liên tục.",
      "Ban tổ chức/Giám khảo: Quản lý hồ sơ đăng ký -> Duyệt thí sinh vào các vòng Photoshoot, Tài năng, Bán kết, Chung kết -> Theo dõi kết quả vote minh bạch.",
    ],
    results: [
      "Ra mắt thành công và nhận được sự hưởng ứng nhiệt liệt từ toàn thể sinh viên và giảng viên HUIT.",
      "Đạt tiêu chuẩn thẩm mỹ thiết kế hiện đại, mượt mà trên 100% các dòng điện thoại và máy tính.",
      "Bảo đảm hoạt động ổn định, minh bạch và tin cậy trong các giai đoạn bình chọn cam go nhất của cuộc thi.",
    ],
    challenges: [
      {
        title: "Hiệu ứng visual mở màn mượt mà không chặn SEO",
        solution: "Tối ưu hóa curtain reveal animation bằng CSS transforms, đảm bảo nội dung HTML vẫn thân thiện với bot tìm kiếm Google.",
      },
      {
        title: "Chuyển đổi đa ngôn ngữ liền mạch",
        solution: "Triển khai i18n client & server state mượt mà, lưu trữ ngôn ngữ ưa thích của người dùng trong cookie/local storage.",
      },
      {
        title: "Bảo mật và chống gian lận bình chọn",
        solution: "Áp dụng kỹ thuật browser fingerprinting, rate limiting và mã hóa token bình chọn giúp ngăn chặn 100% hành vi thao túng lượt vote.",
      },
    ],
    coverImage: "/assets/project-previews/huiticonic/cover.png",
    fullPageImage: "/assets/project-previews/huiticonic/fullpage.png",
    gallery: [
      {
        src: "/assets/project-previews/huiticonic/cover.png",
        title: "HUIT's ICONIC 2026 - The Rise of Icon",
        detail: "Key visual 3D đại dương phát sáng lộng lẫy tôn vinh nét đẹp, trí tuệ và bản lĩnh sinh viên HUIT.",
      },
      {
        src: "/assets/project-previews/huiticonic/tablet.png",
        title: "Bảng xếp hạng & Thư viện thí sinh trên Tablet",
        detail: "Giao diện tối ưu cho tablet hiển thị top thí sinh dẫn đầu, countdown nhận hồ sơ và nhà tài trợ.",
      },
      {
        src: "/assets/project-previews/huiticonic/mobile.png",
        title: "Cổng Bình chọn Di động & Đa ngôn ngữ (VI/EN)",
        detail: "Trải nghiệm mobile mượt mà, hỗ trợ chuyển đổi ngôn ngữ tiếng Việt và tiếng Anh nhanh chóng.",
      },
      {
        src: "/assets/project-previews/huiticonic/fullpage.png",
        title: "Toàn bộ Trang chủ Cuộc thi Đại sứ Truyền thông",
        detail: "Ảnh chụp dài bao quát form đăng ký, giới thiệu cuộc thi, các đơn vị tài trợ đồng hành và tin tức mới nhất.",
      },
    ],
    liveUrl: "https://iconic.huitmedia.edu.vn/",
    references: [
      { label: "Live Platform", url: "https://iconic.huitmedia.edu.vn/" },
      { label: "Fanpage HUIT's ICONIC", url: "https://www.facebook.com/Daisutruyenthonghuit" },
      { label: "HUIT Media", url: "https://huitmedia.edu.vn" },
    ],
  },

  "ung-dung-giao-viec-ai-webrtc": {
    slug: "ung-dung-giao-viec-ai-webrtc",
    title: "AI WebRTC Task Platform",
    subtitle: "Hệ thống quản lý dự án & giao việc đa nền tảng tích hợp AI và WebRTC",
    hero:
      "Hệ thống là một nền tảng quản lý dự án và phân chia công việc toàn diện hoạt động trên cả Website và Mobile. Dự án tích hợp AI Gemini để hỗ trợ tìm kiếm ngữ nghĩa, cùng với hệ thống giao tiếp nội bộ thời gian thực như nhắn tin, gọi thoại và gọi video qua WebRTC.",
    timeline: "08/09/2025 - 30/11/2025",
    duration: "12 tuần",
    role: "Mobile Developer / QA",
    stack: [
      "Node.js",
      "Express.js",
      "NestJS architecture",
      "Next.js 14",
      "React",
      "TailwindCSS",
      "Radix UI",
      "React Native",
      "Expo",
      "MySQL 8.0",
      "Sequelize ORM",
      "JWT",
      "Socket.IO",
      "WebRTC",
      "Firebase Cloud Messaging",
      "Google Gemini API",
      "Node-cron",
    ],
    context: [
      "Nhiều doanh nghiệp vừa và nhỏ vẫn quản lý công việc thủ công qua bảng tính hoặc mạng xã hội, khiến thông tin bị phân tán, khó theo dõi tiến độ và dễ xảy ra trễ hạn.",
      "Mô hình làm việc hybrid và remote đòi hỏi một hệ thống đồng bộ đa nền tảng để giao tiếp, giao việc và theo dõi công việc theo thời gian thực.",
    ],
    goals: [
      "Xây dựng hệ thống quản lý dự án ổn định trên web và mobile, hỗ trợ khởi tạo, giao việc, gửi worklog và theo dõi tiến độ minh bạch.",
      "Tích hợp AI hỗ trợ tìm kiếm thông tin, gợi ý công việc và hỗ trợ phân tích dữ liệu dự án.",
      "Cung cấp công cụ giao tiếp nội bộ trực tiếp trên nền tảng: chat realtime, gọi thoại và gọi video WebRTC.",
      "Xây dựng hệ thống cảnh báo và thông báo thời gian thực đa nền tảng thông qua Firebase Cloud Messaging.",
    ],
    responsibilities: [
      "Thiết kế sơ đồ UML và các luồng nghiệp vụ trên mobile.",
      "Phát triển ứng dụng Mobile bằng React Native/Expo.",
      "Tích hợp Firebase Cloud Messaging cho push notification.",
      "Viết kịch bản kiểm thử, chạy kiểm thử tự động và kiểm thử giao diện.",
    ],
    team: [
      "Lâm Nguyễn Anh Hào - Full-stack / Backend Lead: khảo sát nghiệp vụ, thiết kế CSDL, xây dựng REST API, CRUD và Frontend Web dashboard/Kanban.",
      "Huỳnh Minh An - Full-stack / AI & Realtime Lead: quản lý CSDL, phân quyền, User/Role, Chat Realtime, WebRTC và AI Gemini.",
      "Đỗ Văn Tuyến Đoàn - Mobile Developer / QA: thiết kế UML, phát triển ứng dụng Mobile React Native/Expo, tích hợp Push Notification và kiểm thử.",
    ],
    architecture:
      "Hệ thống được thiết kế theo kiến trúc 3 lớp với Backend cung cấp API thống nhất cho cả Web và Mobile. Backend tuân theo mô hình MVC gồm Models, Controllers và Routes, sử dụng Middleware để xử lý xác thực request. Hệ thống realtime vận hành theo luồng Client -> WebSocket -> Authentication -> Join Rooms -> Event Handlers -> Broadcast.",
    modules: [
      {
        title: "Project & task management",
        items: ["Khởi tạo dự án", "Tạo task và subtask", "Phân công công việc", "Kanban board", "Approve/Reject workflow"],
      },
      {
        title: "Realtime communication",
        items: ["Chat cá nhân/nhóm", "Socket.IO realtime events", "Gọi thoại", "Gọi video", "WebRTC"],
      },
      {
        title: "AI assistant",
        items: ["Semantic search", "Vector embeddings 768 chiều", "Cosine Similarity", "AI chatbot", "Gợi ý phân công"],
      },
      {
        title: "Reporting & notifications",
        items: ["Worklog", "Timesheet", "Biểu đồ thống kê", "Push Notifications", "Deadline Scheduler"],
      },
    ],
    flows: [
      "Admin: Quản lý tài khoản, phân vai trò, thiết lập quyền, cấu hình hệ thống và giám sát dự án.",
      "PM/Manager/Teamlead: Khởi tạo dự án, phân rã task, giao việc, theo dõi tiến độ và phê duyệt kết quả.",
      "Employee: Nhận việc qua web/mobile, cập nhật tiến độ, điền worklog, thảo luận trong task và gửi báo cáo.",
    ],
    results: [
      "Hệ thống đa nền tảng Web & Mobile được triển khai hoàn thiện và hoạt động ổn định cho các luồng nghiệp vụ nội bộ.",
      "Đạt 100% tỷ lệ pass cho các kịch bản kiểm thử thủ công và automation testing lớp API.",
      "Giải quyết bài toán đồng bộ dữ liệu realtime giữa thiết bị di động và trình duyệt máy tính.",
    ],
    challenges: [
      {
        title: "Đồng bộ dữ liệu realtime đa thiết bị",
        solution: "Tích hợp WebSocket với Socket.IO kết hợp FCM để đẩy thay đổi task và tin nhắn xuống client theo thời gian thực.",
      },
      {
        title: "Tìm kiếm ngữ nghĩa thay vì từ khóa",
        solution: "Triển khai AI Service với Google Gemini, vector embeddings 768 chiều và Cosine Similarity để tìm công việc theo ý định người dùng.",
      },
      {
        title: "Toàn vẹn dữ liệu cho chuỗi công việc phức tạp",
        solution: "Thiết kế các ràng buộc hệ thống cho task cha/subtask, thời gian task và middleware kiểm tra dữ liệu trước khi ghi.",
      },
    ],
    coverImage: "/assets/project-previews/ungdunggiaoviec/3.43.png",
    fullPageImage: "/assets/project-previews/ungdunggiaoviec/fullpage.jpeg",
    gallery: [
      {
        src: "/assets/project-previews/ungdunggiaoviec/3.54.png",
        title: "Admin home",
        detail: "Trang chủ quản trị và tổng quan hệ thống.",
      },
      {
        src: "/assets/project-previews/ungdunggiaoviec/3.96.png",
        title: "Mobile admin home",
        detail: "Giao diện mobile cho vai trò quản trị viên.",
      },
      {
        src: "/assets/project-previews/ungdunggiaoviec/3.58.png",
        title: "Project workspace",
        detail: "Không gian làm việc và theo dõi dự án.",
      },
      {
        src: "/assets/project-previews/ungdunggiaoviec/3.64.png",
        title: "Task management",
        detail: "Quản lý công việc, phân công và trạng thái xử lý.",
      },
      {
        src: "/assets/project-previews/ungdunggiaoviec/3.66.png",
        title: "Kanban workflow",
        detail: "Theo dõi tiến độ theo quy trình To do, In Progress, Review và Done.",
      },
      {
        src: "/assets/project-previews/ungdunggiaoviec/3.69.png",
        title: "Realtime communication",
        detail: "Trao đổi nội bộ và cập nhật trạng thái theo thời gian thực.",
      },
      {
        src: "/assets/project-previews/ungdunggiaoviec/3.102.png",
        title: "Mobile workflow",
        detail: "Lượt thao tác công việc trên ứng dụng di động.",
      },
      {
        src: "/assets/project-previews/ungdunggiaoviec/3.121.png",
        title: "Testing result",
        detail: "Kết quả kiểm thử và đánh giá chức năng.",
      },
    ],
    references: [
      { label: "Demo: Private / Internal" },
      { label: "Báo cáo khóa luận tốt nghiệp HUIT" },
    ],
  },

  "job-fair-portal": {
    slug: "job-fair-portal",
    title: "Job Fair Portal",
    subtitle: "Website Ngày hội việc làm & Kết nối doanh nghiệp",
    hero:
      "Cổng thông tin trực tuyến chuyên biệt hỗ trợ tổ chức sự kiện Ngày hội Việc làm. Nền tảng đóng vai trò kết nối trực tiếp sinh viên và doanh nghiệp, đồng thời cung cấp công cụ quản lý dữ liệu, xuất báo cáo toàn diện cho Ban tổ chức.",
    timeline: "16/06/2025 - 07/09/2025",
    duration: "12 tuần",
    role: "Full-stack Developer Intern",
    stack: [
      "C#",
      "ASP.NET 8.0 MVC",
      "Razor View",
      "Bootstrap",
      "SQL Server",
      "EF Core",
      "ASP.NET Identity",
      "SMTP",
      "EPPlus",
      "iTextSharp",
      "Git/GitHub",
      "Visual Studio 2022",
    ],
    context: [
      "Trung tâm Đổi mới sáng tạo và Khởi nghiệp tổ chức Ngày hội Việc làm quy mô lớn, thu hút hàng ngàn sinh viên và hàng chục doanh nghiệp, nhưng thiếu một website chuyên biệt để quản lý.",
      "Quy trình đăng ký gian hàng, nộp hồ sơ ứng tuyển và kết nối sinh viên - doanh nghiệp phụ thuộc vào Google Form, làm thông tin bị phân tán và khó quản lý khi dữ liệu tăng lớn.",
      "Website cũ chưa đồng bộ, giao diện thiếu trực quan và không đáp ứng tốt nhu cầu cập nhật thông tin sự kiện.",
    ],
    goals: [
      "Xây dựng nền tảng chuyên biệt để quản lý quy trình tổ chức Ngày hội Việc làm.",
      "Hỗ trợ sinh viên tạo hồ sơ, tìm kiếm cơ hội và nộp hồ sơ ứng tuyển trực tuyến.",
      "Hỗ trợ doanh nghiệp đăng ký gian hàng, đăng tin tuyển dụng và quản lý hồ sơ ứng viên.",
      "Số hóa khâu quản lý, thống kê và xuất báo cáo cho Ban tổ chức.",
    ],
    responsibilities: [
      "Khảo sát và phân tích nghiệp vụ.",
      "Thiết kế cơ sở dữ liệu ERD và giao diện.",
      "Lập trình Full-stack cho Frontend và Backend.",
      "Phát triển các module chính, tối ưu hiệu năng và phối hợp kiểm thử bảo mật.",
    ],
    team: [
      "Nhóm Công nghệ phần mềm: UI/UX, Frontend, Backend, tích hợp tính năng và thiết kế cơ sở dữ liệu.",
      "Nhóm An toàn thông tin: kiểm thử, đánh giá lỗ hổng bảo mật, cấu hình tường lửa và phân quyền hệ thống.",
    ],
    architecture:
      "Hệ thống được xây dựng theo mô hình MVC, tách biệt lớp dữ liệu SQL Server thông qua Entity Framework, lớp xử lý nghiệp vụ bằng C# Controller và lớp giao diện Razor View kết hợp Bootstrap. Kiến trúc này giúp dự án dễ bảo trì, mở rộng và tích hợp dịch vụ bên thứ ba như SMTP.",
    modules: [
      {
        title: "Student module",
        items: ["Đăng ký/đăng nhập", "Cập nhật hồ sơ cá nhân", "Xem doanh nghiệp và sự kiện", "Nộp hồ sơ ứng tuyển", "Nhận thông báo email"],
      },
      {
        title: "Company module",
        items: ["Quản lý profile doanh nghiệp", "Đăng ký gian hàng", "Đăng tin tuyển dụng", "Tiếp nhận hồ sơ ứng viên"],
      },
      {
        title: "Admin module",
        items: ["Dashboard tổng quan", "Quản lý tài khoản CRUD", "Quản lý sự kiện và bài viết", "Hộp thư nội bộ", "Xuất báo cáo Excel/PDF"],
      },
      {
        title: "System module",
        items: ["Email tự động", "Quên mật khẩu", "Phân quyền tài khoản", "ASP.NET Identity"],
      },
    ],
    flows: [
      "Sinh viên: Trang chủ -> Đăng ký/Đăng nhập -> Cập nhật hồ sơ -> Tìm doanh nghiệp/sự kiện -> Nộp hồ sơ ứng tuyển.",
      "Doanh nghiệp: Đăng nhập -> Cập nhật profile -> Đăng ký gian hàng -> Đăng tin tuyển dụng -> Xét duyệt hồ sơ.",
      "Admin: Đăng nhập -> Admin dashboard -> Phê duyệt tài khoản -> Theo dõi sự kiện -> Xuất báo cáo Excel.",
    ],
    results: [
      "Phát triển thành công các phiên bản Beta cho User và Admin, thay thế quy trình thu thập dữ liệu bằng Google Form thủ công.",
      "Số hóa khâu quản lý người dùng, doanh nghiệp và xuất báo cáo theo định dạng Excel/PDF.",
      "Hoàn thành kiểm thử, vá các lỗ hổng bảo mật cơ bản và bàn giao sản phẩm vào đầu tháng 09/2025.",
    ],
    challenges: [
      {
        title: "Giao diện cũ phức tạp",
        solution: "Phân tích lại nghiệp vụ, thiết kế lại luồng dữ liệu và dùng Bootstrap để tạo UI responsive.",
      },
      {
        title: "Rủi ro bảo mật dữ liệu",
        solution: "Tích hợp ASP.NET Identity, phân quyền chặt chẽ và phối hợp kiểm thử bảo mật trước bản Beta.",
      },
      {
        title: "Hiệu năng tải dữ liệu",
        solution: "Đánh index, chuẩn hóa truy vấn SQL, refactor code và áp dụng cache cho danh sách sự kiện.",
      },
    ],
    coverImage: "/assets/project-previews/ngayhoivieclam/home.png",
    fullPageImage: "/assets/project-previews/ngayhoivieclam/ngayhoivieclam_full.jpeg",
    gallery: [
      {
        src: "/assets/project-previews/ngayhoivieclam/2.24.png",
        title: "Student profile",
        detail: "Hồ sơ cá nhân sinh viên và thông tin ứng tuyển.",
      },
      {
        src: "/assets/project-previews/ngayhoivieclam/2.28.png",
        title: "Company listing",
        detail: "Danh sách doanh nghiệp và cơ hội tuyển dụng.",
      },
      {
        src: "/assets/project-previews/ngayhoivieclam/2.32.png",
        title: "Admin dashboard",
        detail: "Bảng điều khiển quản trị tổng quan sự kiện.",
      },
      {
        src: "/assets/project-previews/ngayhoivieclam/2.33.png",
        title: "Company management",
        detail: "Quản lý doanh nghiệp, gian hàng và thông tin tuyển dụng.",
      },
      {
        src: "/assets/project-previews/ngayhoivieclam/2.35.png",
        title: "Report export",
        detail: "Chức năng thống kê và xuất báo cáo.",
      },
      {
        src: "/assets/project-previews/ngayhoivieclam/2.38.png",
        title: "Authentication",
        detail: "Đăng ký, đăng nhập và xác thực người dùng.",
      },
      {
        src: "/assets/project-previews/ngayhoivieclam/2.40.png",
        title: "Mailbox",
        detail: "Hộp thư nội bộ và thông báo hệ thống.",
      },
      {
        src: "/assets/project-previews/ngayhoivieclam/2.42.png",
        title: "Password recovery",
        detail: "Quy trình khôi phục mật khẩu qua email.",
      },
    ],
    references: [
      { label: "Cổng IEC HUIT", url: "https://iec.huit.edu.vn" },
      { label: "Báo cáo thực tập doanh nghiệp HUIT" },
    ],
  },
};
