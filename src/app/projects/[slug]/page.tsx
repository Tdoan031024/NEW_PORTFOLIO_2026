import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const jobFairImages = {
  cover: "/assets/project-previews/ngayhoivieclam/home.png",
  fullPage: "/assets/project-previews/ngayhoivieclam/ngayhoivieclam_full.jpeg",
  gallery: [
    {
      src: "/assets/project-previews/ngayhoivieclam/2.24.png",
      title: "Student profile",
      detail: "Ho so ca nhan sinh vien va thong tin ung tuyen.",
    },
    {
      src: "/assets/project-previews/ngayhoivieclam/2.28.png",
      title: "Company listing",
      detail: "Danh sach doanh nghiep va co hoi tuyen dung.",
    },
    {
      src: "/assets/project-previews/ngayhoivieclam/2.32.png",
      title: "Admin dashboard",
      detail: "Bang dieu khien quan tri tong quan su kien.",
    },
    {
      src: "/assets/project-previews/ngayhoivieclam/2.33.png",
      title: "Company management",
      detail: "Quan ly doanh nghiep, gian hang va thong tin tuyen dung.",
    },
    {
      src: "/assets/project-previews/ngayhoivieclam/2.35.png",
      title: "Report export",
      detail: "Chuc nang thong ke va xuat bao cao.",
    },
    {
      src: "/assets/project-previews/ngayhoivieclam/2.38.png",
      title: "Authentication",
      detail: "Dang ky, dang nhap va xac thuc nguoi dung.",
    },
    {
      src: "/assets/project-previews/ngayhoivieclam/2.40.png",
      title: "Mailbox",
      detail: "Hop thu noi bo va thong bao he thong.",
    },
    {
      src: "/assets/project-previews/ngayhoivieclam/2.42.png",
      title: "Password recovery",
      detail: "Quy trinh khoi phuc mat khau qua email.",
    },
  ],
};

const jobFairContent = {
  title: "Job Fair Portal",
  subtitle: "Website Ngay hoi viec lam",
  hero:
    "Cong thong tin truc tuyen chuyen biet ho tro to chuc su kien Ngay hoi Viec lam. Nen tang dong vai tro ket noi truc tiep sinh vien va doanh nghiep, dong thoi cung cap cong cu quan ly du lieu, xuat bao cao toan dien cho Ban to chuc.",
  context: [
    "Trung tam Doi moi sang tao va Khoi nghiep to chuc Ngay hoi Viec lam quy mo lon, thu hut hang ngan sinh vien va hang chuc doanh nghiep, nhung thieu mot website chuyen biet de quan ly.",
    "Quy trinh dang ky gian hang, nop ho so ung tuyen va ket noi sinh vien - doanh nghiep phu thuoc vao Google Form, lam thong tin bi phan tan va kho quan ly khi du lieu tang lon.",
    "Website cu chua dong bo, giao dien thieu truc quan va khong dap ung tot nhu cau cap nhat thong tin su kien.",
  ],
  goals: [
    "Xay dung nen tang chuyen biet de quan ly quy trinh to chuc Ngay hoi Viec lam.",
    "Ho tro sinh vien tao ho so, tim kiem co hoi va nop ho so ung tuyen truc tuyen.",
    "Ho tro doanh nghiep dang ky gian hang, dang tin tuyen dung va quan ly ho so ung vien.",
    "So hoa khau quan ly, thong ke va xuat bao cao cho Ban to chuc.",
  ],
  responsibilities: [
    "Khao sat va phan tich nghiep vu.",
    "Thiet ke co so du lieu ERD va giao dien.",
    "Lap trinh Full-stack cho Frontend va Backend.",
    "Phat trien cac module chinh, toi uu hieu nang va phoi hop kiem thu bao mat.",
  ],
  team: [
    "Nhom Cong nghe phan mem: UI/UX, Frontend, Backend, tich hop tinh nang va thiet ke co so du lieu.",
    "Nhom An toan thong tin: kiem thu, danh gia lo hong bao mat, cau hinh tuong lua va phan quyen he thong.",
  ],
  architecture:
    "He thong duoc xay dung theo mo hinh MVC, tach biet lop du lieu SQL Server thong qua Entity Framework, lop xu ly nghiep vu bang C# Controller va lop giao dien Razor View ket hop Bootstrap. Kien truc nay giup du an de bao tri, mo rong va tich hop dich vu ben thu ba nhu SMTP.",
  modules: [
    {
      title: "Student module",
      items: ["Dang ky/dang nhap", "Cap nhat ho so ca nhan", "Xem doanh nghiep va su kien", "Nop ho so ung tuyen", "Nhan thong bao email"],
    },
    {
      title: "Company module",
      items: ["Quan ly profile doanh nghiep", "Dang ky gian hang", "Dang tin tuyen dung", "Tiep nhan ho so ung vien"],
    },
    {
      title: "Admin module",
      items: ["Dashboard tong quan", "Quan ly tai khoan CRUD", "Quan ly su kien va bai viet", "Hop thu noi bo", "Xuat bao cao Excel/PDF"],
    },
    {
      title: "System module",
      items: ["Email tu dong", "Quen mat khau", "Phan quyen tai khoan", "ASP.NET Identity"],
    },
  ],
  flows: [
    "Sinh vien: Trang chu -> Dang ky/Dang nhap -> Cap nhat ho so -> Tim doanh nghiep/su kien -> Nop ho so ung tuyen.",
    "Doanh nghiep: Dang nhap -> Cap nhat profile -> Dang ky gian hang -> Dang tin tuyen dung -> Xet duyet ho so.",
    "Admin: Dang nhap -> Admin dashboard -> Phe duyet tai khoan -> Theo doi su kien -> Xuat bao cao Excel.",
  ],
  results: [
    "Phat trien thanh cong cac phien ban Beta cho User va Admin, thay the quy trinh thu thap du lieu bang Google Form thu cong.",
    "So hoa khau quan ly nguoi dung, doanh nghiep va xuat bao cao theo dinh dang Excel/PDF.",
    "Hoan thanh kiem thu, va cac lo hong bao mat co ban va ban giao san pham vao dau thang 09/2025.",
  ],
  challenges: [
    {
      title: "Giao dien cu phuc tap",
      solution: "Phan tich lai nghiep vu, thiet ke lai luong du lieu va dung Bootstrap de tao UI responsive.",
    },
    {
      title: "Rui ro bao mat du lieu",
      solution: "Tich hop ASP.NET Identity, phan quyen chat che va phoi hop kiem thu bao mat truoc ban Beta.",
    },
    {
      title: "Hieu nang tai du lieu",
      solution: "Danh index, chuan hoa truy van SQL, refactor code va ap dung cache cho danh sach su kien.",
    },
  ],
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
};

const taskAppImages = {
  cover: "/assets/project-previews/ungdunggiaoviec/3.43.png",
  fullPage: "/assets/project-previews/ungdunggiaoviec/fullpage.jpeg",
  gallery: [
    {
      src: "/assets/project-previews/ungdunggiaoviec/3.54.png",
      title: "Admin home",
      detail: "Trang chu quan tri va tong quan he thong.",
    },
    {
      src: "/assets/project-previews/ungdunggiaoviec/3.96.png",
      title: "Mobile admin home",
      detail: "Giao dien mobile cho vai tro quan tri vien.",
    },
    {
      src: "/assets/project-previews/ungdunggiaoviec/3.58.png",
      title: "Project workspace",
      detail: "Khong gian lam viec va theo doi du an.",
    },
    {
      src: "/assets/project-previews/ungdunggiaoviec/3.64.png",
      title: "Task management",
      detail: "Quan ly cong viec, phan cong va trang thai xu ly.",
    },
    {
      src: "/assets/project-previews/ungdunggiaoviec/3.66.png",
      title: "Kanban workflow",
      detail: "Theo doi tien do theo quy trinh To do, In Progress, Review va Done.",
    },
    {
      src: "/assets/project-previews/ungdunggiaoviec/3.69.png",
      title: "Realtime communication",
      detail: "Trao doi noi bo va cap nhat trang thai theo thoi gian thuc.",
    },
    {
      src: "/assets/project-previews/ungdunggiaoviec/3.102.png",
      title: "Mobile workflow",
      detail: "Luot thao tac cong viec tren ung dung di dong.",
    },
    {
      src: "/assets/project-previews/ungdunggiaoviec/3.121.png",
      title: "Testing result",
      detail: "Ket qua kiem thu va danh gia chuc nang.",
    },
  ],
};

const taskAppContent = {
  title: "Xay dung ung dung giao viec",
  subtitle: "He thong quan ly du an da nen tang tich hop AI va WebRTC",
  hero:
    "He thong la mot nen tang quan ly du an va phan chia cong viec toan dien hoat dong tren ca Website va Mobile. Du an tich hop AI Gemini de ho tro tim kiem ngu nghia, cung voi he thong giao tiep noi bo thoi gian thuc nhu nhan tin, goi thoai va goi video qua WebRTC.",
  context: [
    "Nhieu doanh nghiep vua va nho van quan ly cong viec thu cong qua bang tinh hoac mang xa hoi, khien thong tin bi phan tan, kho theo doi tien do va de xay ra tre han.",
    "Mo hinh lam viec hybrid va remote doi hoi mot he thong dong bo da nen tang de giao tiep, giao viec va theo doi cong viec theo thoi gian thuc.",
  ],
  goals: [
    "Xay dung he thong quan ly du an on dinh tren web va mobile, ho tro khoi tao, giao viec, gui worklog va theo doi tien do minh bach.",
    "Tich hop AI ho tro tim kiem thong tin, goi y cong viec va ho tro phan tich du lieu du an.",
    "Cung cap cong cu giao tiep noi bo truc tiep tren nen tang: chat realtime, goi thoai va goi video WebRTC.",
    "Xay dung he thong canh bao va thong bao thoi gian thuc da nen tang thong qua Firebase Cloud Messaging.",
  ],
  team: [
    "Lam Nguyen Anh Hao - Full-stack / Backend Lead: khao sat nghiep vu, thiet ke CSDL, xay dung REST API, CRUD va Frontend Web dashboard/Kanban.",
    "Huynh Minh An - Full-stack / AI & Realtime Lead: quan ly CSDL, phan quyen, User/Role, Chat Realtime, WebRTC va AI Gemini.",
    "Do Van Tuyen Doan - Mobile Developer / QA: thiet ke UML, phat trien ung dung Mobile React Native/Expo, tich hop Push Notification va kiem thu.",
  ],
  myRole: [
    "Thiet ke so do UML va cac luong nghiep vu tren mobile.",
    "Phat trien ung dung Mobile bang React Native/Expo.",
    "Tich hop Firebase Cloud Messaging cho push notification.",
    "Viet kich ban kiem thu, chay kiem thu tu dong va kiem thu giao dien.",
  ],
  architecture:
    "He thong duoc thiet ke theo kien truc 3 lop voi Backend cung cap API thong nhat cho ca Web va Mobile. Backend tuan theo mo hinh MVC gom Models, Controllers va Routes, su dung Middleware de xu ly xac thuc request. He thong realtime van hanh theo luong Client -> WebSocket -> Authentication -> Join Rooms -> Event Handlers -> Broadcast.",
  modules: [
    {
      title: "Project & task management",
      items: ["Khoi tao du an", "Tao task va subtask", "Phan cong cong viec", "Kanban board", "Approve/Reject workflow"],
    },
    {
      title: "Realtime communication",
      items: ["Chat ca nhan/nhom", "Socket.IO realtime events", "Goi thoai", "Goi video", "WebRTC"],
    },
    {
      title: "AI assistant",
      items: ["Semantic search", "Vector embeddings 768 chieu", "Cosine Similarity", "AI chatbot", "Goi y phan cong"],
    },
    {
      title: "Reporting & notifications",
      items: ["Worklog", "Timesheet", "Bieu do thong ke", "Push Notifications", "Deadline Scheduler"],
    },
  ],
  flows: [
    "Admin: Quan ly tai khoan, phan vai tro, thiet lap quyen, cau hinh he thong va giam sat du an.",
    "PM/Manager/Teamlead: Khoi tao du an, phan ra task, giao viec, theo doi tien do va phe duyet ket qua.",
    "Employee: Nhan viec qua web/mobile, cap nhat tien do, dien worklog, thao luan trong task va gui bao cao.",
  ],
  results: [
    "He thong da nen tang Web & Mobile duoc trien khai hoan thien va hoat dong on dinh cho cac luong nghiep vu noi bo.",
    "Dat 100% ty le pass cho cac kich ban kiem thu thu cong va automation testing lop API.",
    "Giai quyet bai toan dong bo du lieu realtime giua thiet bi di dong va trinh duyet may tinh.",
  ],
  challenges: [
    {
      title: "Dong bo du lieu realtime da thiet bi",
      solution: "Tich hop WebSocket voi Socket.IO ket hop FCM de day thay doi task va tin nhan xuong client theo thoi gian thuc.",
    },
    {
      title: "Tim kiem ngu nghia thay vi tu khoa",
      solution: "Trien khai AI Service voi Google Gemini, vector embeddings 768 chieu va Cosine Similarity de tim cong viec theo y dinh nguoi dung.",
    },
    {
      title: "Toan ven du lieu cho chuoi cong viec phuc tap",
      solution: "Thiet ke cac rang buoc he thong cho task cha/subtask, thoi gian task va middleware kiem tra du lieu truoc khi ghi.",
    },
  ],
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
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: `${project.title} | Doan Portfolio`,
    description: project.description,
  };
}

function Pill({ children }: { children: string }) {
  return (
    <span className="rounded-[8px] border border-cyan-300/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-bold text-cyan-100">
      {children}
    </span>
  );
}

function DetailPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[18px] border border-white/10 bg-white/[0.035] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.22)]">
      <h2 className="text-xl font-black tracking-[-0.02em] text-white">{title}</h2>
      <div className="mt-4 text-sm leading-7 text-white/68">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function JobFairDetailPage() {
  return (
    <main className="min-h-screen bg-transparent px-5 pb-20 pt-24 text-white sm:px-8">
      <div className="mx-auto max-w-[1180px]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/65 transition hover:border-cyan-300/45 hover:text-cyan-200"
        >
          <span aria-hidden="true">←</span>
          Back to home
        </Link>

        <section className="mt-9 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.36em] text-cyan-200/55">Case Study</p>
            <h1 className="mt-4 text-[42px] font-black leading-[0.98] text-white sm:text-[62px]">
              {jobFairContent.title}
            </h1>
            <p className="mt-3 text-lg font-bold text-cyan-300">{jobFairContent.subtitle}</p>
            <p className="mt-6 max-w-[680px] text-base leading-8 text-white/72">{jobFairContent.hero}</p>

            <div className="mt-7 grid gap-3 text-sm text-white/65 sm:grid-cols-3">
              <div className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4">
                <p className="text-white/40">Timeline</p>
                <p className="mt-1 font-bold text-white">16/06/2025 - 07/09/2025</p>
              </div>
              <div className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4">
                <p className="text-white/40">Duration</p>
                <p className="mt-1 font-bold text-white">12 weeks</p>
              </div>
              <div className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4">
                <p className="text-white/40">Role</p>
                <p className="mt-1 font-bold text-white">Full-stack Developer Intern</p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[22px] border border-cyan-300/18 bg-[#06101f] shadow-[0_24px_70px_rgba(0,0,0,0.36)]">
            <Image
              src={jobFairImages.cover}
              alt="Job Fair Portal home page"
              width={1200}
              height={780}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          {jobFairContent.stack.map((tech) => (
            <Pill key={tech}>{tech}</Pill>
          ))}
        </div>

        <section className="mt-10 grid gap-5 lg:grid-cols-2">
          <DetailPanel title="Boi canh va van de">
            <BulletList items={jobFairContent.context} />
          </DetailPanel>
          <DetailPanel title="Muc tieu du an">
            <BulletList items={jobFairContent.goals} />
          </DetailPanel>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <DetailPanel title="Vai tro cua toi">
            <p className="font-bold text-cyan-200">Thuc tap sinh Cong nghe phan mem (Full-stack Developer)</p>
            <div className="mt-4">
              <BulletList items={jobFairContent.responsibilities} />
            </div>
          </DetailPanel>
          <DetailPanel title="Kien truc he thong">
            <p>{jobFairContent.architecture}</p>
          </DetailPanel>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-2">
          <DetailPanel title="Team">
            <BulletList items={jobFairContent.team} />
          </DetailPanel>
          <DetailPanel title="Luot nguoi dung chinh">
            <BulletList items={jobFairContent.flows} />
          </DetailPanel>
        </section>

        <section className="mt-12">
          <div className="mb-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-cyan-200/45">Product modules</p>
            <h2 className="mt-3 text-3xl font-black text-white">Core Features</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {jobFairContent.modules.map((module) => (
              <article key={module.title} className="rounded-[18px] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="font-black text-cyan-200">{module.title}</h3>
                <div className="mt-4 text-sm leading-7 text-white/65">
                  <BulletList items={module.items} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-cyan-200/45">Screenshots</p>
            <h2 className="mt-3 text-3xl font-black text-white">Interface Gallery</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {jobFairImages.gallery.map((image) => (
              <article key={image.src} className="overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.035]">
                <Image src={image.src} alt={image.title} width={940} height={560} className="h-auto w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-white">{image.title}</h3>
                  <p className="mt-1 text-sm text-white/55">{image.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 overflow-hidden rounded-[22px] border border-cyan-300/15 bg-[#06101f]">
          <div className="border-b border-white/10 p-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-cyan-200/45">Full page preview</p>
            <h2 className="mt-2 text-2xl font-black text-white">Home page vertical capture</h2>
          </div>
          <Image
            src={jobFairImages.fullPage}
            alt="Job Fair Portal full page"
            width={1400}
            height={2600}
            className="h-auto w-full"
          />
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-2">
          <DetailPanel title="Ket qua dat duoc">
            <BulletList items={jobFairContent.results} />
          </DetailPanel>
          <DetailPanel title="Kho khan va cach xu ly">
            <div className="space-y-5">
              {jobFairContent.challenges.map((challenge) => (
                <div key={challenge.title}>
                  <p className="font-bold text-white">{challenge.title}</p>
                  <p className="mt-1 text-white/62">{challenge.solution}</p>
                </div>
              ))}
            </div>
          </DetailPanel>
        </section>

        <section className="mt-12 rounded-[18px] border border-white/10 bg-white/[0.035] p-6">
          <h2 className="text-xl font-black text-white">Links & references</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="https://iec.huit.edu.vn"
              target="_blank"
              rel="noreferrer"
              className="rounded-[10px] border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100 transition hover:bg-cyan-300/16"
            >
              IEC website
            </a>
            <span className="rounded-[10px] border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/52">
              GitHub: internal/private
            </span>
            <span className="rounded-[10px] border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/52">
              HUIT internship report - Do Van Tuyen Doan
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}

function TaskAppDetailPage() {
  return (
    <main className="min-h-screen bg-transparent px-5 pb-20 pt-24 text-white sm:px-8">
      <div className="mx-auto max-w-[1180px]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/65 transition hover:border-cyan-300/45 hover:text-cyan-200"
        >
          <span aria-hidden="true">←</span>
          Back to home
        </Link>

        <section className="mt-9 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.36em] text-cyan-200/55">Case Study</p>
            <h1 className="mt-4 text-[40px] font-black leading-[1.02] text-white sm:text-[58px]">
              {taskAppContent.title}
            </h1>
            <p className="mt-3 text-lg font-bold text-cyan-300">{taskAppContent.subtitle}</p>
            <p className="mt-6 max-w-[700px] text-base leading-8 text-white/72">{taskAppContent.hero}</p>

            <div className="mt-7 grid gap-3 text-sm text-white/65 sm:grid-cols-3">
              <div className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4">
                <p className="text-white/40">Timeline</p>
                <p className="mt-1 font-bold text-white">08/09/2025 - 30/11/2025</p>
              </div>
              <div className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4">
                <p className="text-white/40">Duration</p>
                <p className="mt-1 font-bold text-white">12 weeks</p>
              </div>
              <div className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4">
                <p className="text-white/40">Role</p>
                <p className="mt-1 font-bold text-white">Mobile Developer / QA</p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[22px] border border-cyan-300/18 bg-[#06101f] shadow-[0_24px_70px_rgba(0,0,0,0.36)]">
            <Image
              src={taskAppImages.cover}
              alt="Task management app welcome interface"
              width={1200}
              height={780}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          {taskAppContent.stack.map((tech) => (
            <Pill key={tech}>{tech}</Pill>
          ))}
        </div>

        <section className="mt-10 grid gap-5 lg:grid-cols-2">
          <DetailPanel title="Boi canh va van de">
            <BulletList items={taskAppContent.context} />
          </DetailPanel>
          <DetailPanel title="Muc tieu du an">
            <BulletList items={taskAppContent.goals} />
          </DetailPanel>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <DetailPanel title="Vai tro cua toi">
            <p className="font-bold text-cyan-200">Do Van Tuyen Doan - Mobile Developer / QA</p>
            <div className="mt-4">
              <BulletList items={taskAppContent.myRole} />
            </div>
          </DetailPanel>
          <DetailPanel title="Team">
            <BulletList items={taskAppContent.team} />
          </DetailPanel>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <DetailPanel title="Kien truc he thong">
            <p>{taskAppContent.architecture}</p>
          </DetailPanel>
          <DetailPanel title="Luot nguoi dung chinh">
            <BulletList items={taskAppContent.flows} />
          </DetailPanel>
        </section>

        <section className="mt-12">
          <div className="mb-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-cyan-200/45">Product modules</p>
            <h2 className="mt-3 text-3xl font-black text-white">Core Features</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {taskAppContent.modules.map((module) => (
              <article key={module.title} className="rounded-[18px] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="font-black text-cyan-200">{module.title}</h3>
                <div className="mt-4 text-sm leading-7 text-white/65">
                  <BulletList items={module.items} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-cyan-200/45">Screenshots</p>
            <h2 className="mt-3 text-3xl font-black text-white">Interface Gallery</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {taskAppImages.gallery.map((image) => (
              <article key={image.src} className="overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.035]">
                <Image src={image.src} alt={image.title} width={940} height={560} className="h-auto w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-white">{image.title}</h3>
                  <p className="mt-1 text-sm text-white/55">{image.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 overflow-hidden rounded-[22px] border border-cyan-300/15 bg-[#06101f]">
          <div className="border-b border-white/10 p-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-cyan-200/45">Full page preview</p>
            <h2 className="mt-2 text-2xl font-black text-white">Web interface vertical capture</h2>
          </div>
          <Image
            src={taskAppImages.fullPage}
            alt="Task management app full page"
            width={1400}
            height={2600}
            className="h-auto w-full"
          />
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-2">
          <DetailPanel title="Ket qua dat duoc">
            <BulletList items={taskAppContent.results} />
          </DetailPanel>
          <DetailPanel title="Kho khan va cach xu ly">
            <div className="space-y-5">
              {taskAppContent.challenges.map((challenge) => (
                <div key={challenge.title}>
                  <p className="font-bold text-white">{challenge.title}</p>
                  <p className="mt-1 text-white/62">{challenge.solution}</p>
                </div>
              ))}
            </div>
          </DetailPanel>
        </section>

        <section className="mt-12 rounded-[18px] border border-white/10 bg-white/[0.035] p-6">
          <h2 className="text-xl font-black text-white">Links & references</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="rounded-[10px] border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/52">
              Demo: not public
            </span>
            <span className="rounded-[10px] border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/52">
              GitHub: internal/private
            </span>
            <span className="rounded-[10px] border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/52">
              Graduation thesis report
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}

function GenericProjectDetailPage({ project }: { project: (typeof projects)[number] }) {
  return (
    <main className="min-h-screen bg-transparent px-5 pb-20 pt-28 text-white sm:px-8">
      <section className="mx-auto max-w-[980px]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/65 transition hover:border-cyan-300/45 hover:text-cyan-200"
        >
          <span aria-hidden="true">←</span>
          Back to home
        </Link>

        <div className="mt-10 rounded-[28px] border border-white/10 bg-[linear-gradient(165deg,rgba(12,20,40,0.92),rgba(8,14,30,0.9)_55%,rgba(6,12,26,0.9))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.35)] sm:p-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.36em] text-cyan-200/55">Project Detail</p>
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-[42px] font-black leading-[0.95] text-white sm:text-[64px]">{project.title}</h1>
              <p className="mt-4 text-base font-bold text-cyan-300">{project.role}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm font-bold text-white/70">{project.year}</p>
              <p className="mt-1 text-sm text-white/45">{project.date}</p>
            </div>
          </div>

          <p className="mt-8 max-w-[760px] text-[15px] leading-8 text-white/70 sm:text-base">{project.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.techs.map((tech) => (
              <Pill key={tech}>{tech}</Pill>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();
  if (project.slug === "job-fair-portal") return <JobFairDetailPage />;
  if (project.slug === "ung-dung-giao-viec-ai-webrtc") return <TaskAppDetailPage />;

  return <GenericProjectDetailPage project={project} />;
}
