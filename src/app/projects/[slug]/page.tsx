import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { projectDetailsMap, type ProjectDetailData } from "@/data/projectDetails";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  const detail = projectDetailsMap[slug];

  if (!project) {
    return {
      title: "Project not found | Doan Portfolio",
    };
  }

  return {
    title: `${project.title} - Case Study | Doan Portfolio`,
    description: detail?.hero || project.description,
  };
}

function Pill({ children }: { children: string }) {
  return (
    <span className="rounded-[8px] border border-cyan-300/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-bold text-cyan-100 shadow-[0_2px_8px_rgba(34,211,238,0.06)]">
      {children}
    </span>
  );
}

function DetailPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[20px] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md shadow-[0_18px_45px_rgba(0,0,0,0.25)] transition hover:border-cyan-300/20">
      <h2 className="text-xl font-black tracking-[-0.02em] text-white flex items-center gap-2.5">
        <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
        {title}
      </h2>
      <div className="mt-4 text-sm leading-7 text-white/70">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  const detail: ProjectDetailData = projectDetailsMap[slug] || {
    slug: project.slug,
    title: project.title,
    subtitle: project.role,
    hero: project.description,
    timeline: project.date,
    duration: project.year,
    role: project.role,
    stack: project.techs,
    context: [project.description],
    goals: ["Phát triển giải pháp công nghệ đáp ứng yêu cầu người dùng và doanh nghiệp."],
    responsibilities: [project.role],
    team: ["Đỗ Văn Tuyến Đoàn - Full-stack Developer"],
    architecture: "Kiến trúc hiện đại, phân tách rõ ràng giữa Frontend và Backend.",
    modules: [{ title: "Core Module", items: project.techs }],
    flows: ["Người dùng truy cập và trải nghiệm hệ thống qua web hoặc ứng dụng di động."],
    results: ["Hoàn thành triển khai và bàn giao sản phẩm đạt chất lượng cao."],
    challenges: [{ title: "Tối ưu hóa hệ thống", solution: "Áp dụng các tiêu chuẩn thiết kế hiện đại và kiểm thử kỹ lưỡng." }],
    coverImage: project.previewImage || "/assets/project-previews/huitfest/cover.png",
    fullPageImage: project.fullPreviewImage || project.previewImage || "/assets/project-previews/huitfest/fullpage.png",
    gallery: [],
    liveUrl: project.liveUrl,
  };

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  return (
    <main className="min-h-screen bg-transparent px-5 pb-24 pt-24 text-white sm:px-8">
      <div className="mx-auto max-w-[1180px]">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-cyan-300/45 hover:bg-cyan-400/10 hover:text-cyan-200"
          >
            <span aria-hidden="true">←</span>
            Về Feature Projects
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href={`/projects/${prevProject.slug}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-sm text-white/60 transition hover:border-cyan-300/40 hover:text-cyan-200"
              title={`Dự án trước: ${prevProject.title}`}
            >
              ←
            </Link>
            <span className="text-xs font-mono text-white/40">
              {currentIndex + 1} / {projects.length}
            </span>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-sm text-white/60 transition hover:border-cyan-300/40 hover:text-cyan-200"
              title={`Dự án tiếp theo: ${nextProject.title}`}
            >
              →
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-cyan-400/40 bg-cyan-500/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-cyan-200">
                Case Study
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold text-white/60">
                {detail.timeline}
              </span>
              {detail.liveUrl && (
                <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 text-[11px] font-bold text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Production
                </span>
              )}
            </div>

            <h1 className="mt-4 text-[38px] font-black leading-[1.02] text-white sm:text-[54px] tracking-tight">
              {detail.title}
            </h1>
            <p className="mt-2.5 text-base sm:text-lg font-bold text-cyan-300">{detail.subtitle}</p>
            <p className="mt-5 max-w-[660px] text-sm sm:text-base leading-8 text-white/75">{detail.hero}</p>

            {/* Quick Meta Cards */}
            <div className="mt-7 grid gap-3 text-sm text-white/65 grid-cols-2 sm:grid-cols-3">
              <div className="rounded-[14px] border border-white/10 bg-white/[0.035] p-3.5">
                <p className="text-white/40 text-xs uppercase tracking-wider font-semibold">Thời gian</p>
                <p className="mt-1 font-bold text-white text-xs sm:text-sm">{detail.timeline}</p>
              </div>
              <div className="rounded-[14px] border border-white/10 bg-white/[0.035] p-3.5">
                <p className="text-white/40 text-xs uppercase tracking-wider font-semibold">Thời lượng</p>
                <p className="mt-1 font-bold text-white text-xs sm:text-sm">{detail.duration}</p>
              </div>
              <div className="col-span-2 sm:col-span-1 rounded-[14px] border border-white/10 bg-white/[0.035] p-3.5">
                <p className="text-white/40 text-xs uppercase tracking-wider font-semibold">Vai trò</p>
                <p className="mt-1 font-bold text-cyan-200 text-xs sm:text-sm truncate">{detail.role}</p>
              </div>
            </div>

            {/* Live Web CTA */}
            {detail.liveUrl && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={detail.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-400/60 bg-cyan-400/20 px-6 py-3 text-sm font-bold text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.25)] transition hover:bg-cyan-400/30 hover:border-cyan-300 hover:text-white"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Truy cập Website Thực tế
                </a>
              </div>
            )}
          </div>

          {/* Browser Mockup Cover Showcase */}
          <div className="overflow-hidden rounded-[20px] border border-cyan-300/20 bg-[#06101f] shadow-[0_24px_70px_rgba(0,0,0,0.45),0_0_40px_rgba(34,211,238,0.12)]">
            <div className="flex items-center gap-2 border-b border-white/10 bg-[#0a1526] px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              </div>
              <div className="mx-auto flex-1 max-w-[340px] truncate rounded-md bg-white/[0.06] px-3 py-1 text-center text-[11px] font-mono text-white/50">
                {detail.liveUrl || `https://doanportfolio.dev/projects/${detail.slug}`}
              </div>
            </div>
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#040a14]">
              <Image
                src={detail.coverImage}
                alt={`${detail.title} main showcase`}
                width={1440}
                height={900}
                priority
                className="h-full w-full object-cover object-top transition duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
        </section>

        {/* Tech Stack Chips */}
        <section className="mt-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-cyan-200/50 mb-3">Công nghệ sử dụng</p>
          <div className="flex flex-wrap gap-2.5">
            {detail.stack.map((tech) => (
              <Pill key={tech}>{tech}</Pill>
            ))}
          </div>
        </section>

        {/* Context & Goals */}
        <section className="mt-10 grid gap-5 lg:grid-cols-2">
          <DetailPanel title="Bối cảnh & Vấn đề">
            <BulletList items={detail.context} />
          </DetailPanel>
          <DetailPanel title="Mục tiêu dự án">
            <BulletList items={detail.goals} />
          </DetailPanel>
        </section>

        {/* Role & Architecture */}
        <section className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <DetailPanel title="Vai trò & Trách nhiệm">
            <p className="font-bold text-cyan-200">{detail.role}</p>
            <div className="mt-4">
              <BulletList items={detail.responsibilities} />
            </div>
          </DetailPanel>
          <DetailPanel title="Kiến trúc hệ thống">
            <p className="leading-relaxed">{detail.architecture}</p>
            {detail.team && detail.team.length > 0 && (
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="font-bold text-white mb-3">Đội ngũ thực hiện</p>
                <BulletList items={detail.team} />
              </div>
            )}
          </DetailPanel>
        </section>

        {/* User Flows */}
        {detail.flows && detail.flows.length > 0 && (
          <section className="mt-5">
            <DetailPanel title="Luồng người dùng chính">
              <BulletList items={detail.flows} />
            </DetailPanel>
          </section>
        )}

        {/* Core Product Modules */}
        <section className="mt-12">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-cyan-200/50">Phân hệ chức năng</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">Core Features & Modules</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {detail.modules.map((module) => (
              <article
                key={module.title}
                className="rounded-[18px] border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/30 hover:bg-white/[0.05]"
              >
                <h3 className="font-bold text-cyan-200 text-base">{module.title}</h3>
                <div className="mt-3.5 text-xs leading-6 text-white/65">
                  <BulletList items={module.items} />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Interface Gallery */}
        {detail.gallery && detail.gallery.length > 0 && (
          <section className="mt-14">
            <div className="mb-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-cyan-200/50">Giao diện thực tế</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">Interface Gallery & Screenshots</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {detail.gallery.map((image) => (
                <article
                  key={image.src}
                  className="group overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.03] transition hover:border-cyan-300/35 hover:shadow-[0_12px_36px_rgba(0,0,0,0.35)]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#050c18]">
                    <Image
                      src={image.src}
                      alt={image.title}
                      width={960}
                      height={600}
                      className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="font-bold text-white text-base group-hover:text-cyan-200 transition-colors">
                      {image.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-white/60 leading-relaxed">{image.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Full Page Preview */}
        {detail.fullPageImage && (
          <section className="mt-14 overflow-hidden rounded-[22px] border border-cyan-300/20 bg-[#06101f] shadow-[0_24px_70px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between border-b border-white/10 bg-[#081427] p-5">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-cyan-200/50">Full Page Vertical Capture</p>
                <h2 className="mt-1 text-xl sm:text-2xl font-black text-white">Toàn cảnh trang web thực tế</h2>
              </div>
              {detail.liveUrl && (
                <a
                  href={detail.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/75 hover:bg-white/10 hover:text-white"
                >
                  Mở link trực tiếp ↗
                </a>
              )}
            </div>
            <div className="max-h-[850px] overflow-y-auto overflow-x-hidden bg-[#030914] scrollbar-thin scrollbar-thumb-white/20">
              <Image
                src={detail.fullPageImage}
                alt={`${detail.title} full vertical capture`}
                width={1440}
                height={2800}
                className="h-auto w-full"
              />
            </div>
          </section>
        )}

        {/* Results & Challenges */}
        <section className="mt-12 grid gap-5 lg:grid-cols-2">
          <DetailPanel title="Kết quả đạt được">
            <BulletList items={detail.results} />
          </DetailPanel>
          <DetailPanel title="Thách thức & Giải pháp">
            <div className="space-y-5">
              {detail.challenges.map((challenge) => (
                <div key={challenge.title} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <p className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="text-amber-400">⚡</span>
                    {challenge.title}
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-white/65 leading-relaxed pl-5">
                    {challenge.solution}
                  </p>
                </div>
              ))}
            </div>
          </DetailPanel>
        </section>

        {/* Links & References */}
        <section className="mt-12 rounded-[20px] border border-white/10 bg-white/[0.035] p-6">
          <h2 className="text-xl font-black text-white">Liên kết & Tài liệu</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {detail.liveUrl && (
              <a
                href={detail.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-[10px] border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100 transition hover:bg-cyan-300/20"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Trang web chính thức ({detail.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")})
              </a>
            )}
            {detail.references &&
              detail.references.map((ref) =>
                ref.url ? (
                  <a
                    key={ref.label}
                    href={ref.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-[10px] border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/[0.09] hover:text-white"
                  >
                    {ref.label} ↗
                  </a>
                ) : (
                  <span
                    key={ref.label}
                    className="rounded-[10px] border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/50"
                  >
                    {ref.label}
                  </span>
                )
              )}
          </div>
        </section>

        {/* Bottom Next / Prev Project Navigation */}
        <section className="mt-14 border-t border-white/10 pt-10">
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex flex-col justify-between rounded-[20px] border border-white/10 bg-white/[0.025] p-5 transition hover:border-cyan-300/35 hover:bg-white/[0.05]"
            >
              <div>
                <p className="text-xs font-semibold text-white/40 group-hover:text-cyan-300 transition-colors">
                  ← Dự án trước
                </p>
                <h4 className="mt-2 text-lg font-bold text-white group-hover:text-cyan-200 transition-colors line-clamp-1">
                  {prevProject.title}
                </h4>
                <p className="mt-1 text-xs text-white/60 line-clamp-2">{prevProject.description}</p>
              </div>
              <p className="mt-4 text-xs font-mono text-cyan-300/70">{prevProject.year}</p>
            </Link>

            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex flex-col justify-between text-left sm:text-right rounded-[20px] border border-white/10 bg-white/[0.025] p-5 transition hover:border-cyan-300/35 hover:bg-white/[0.05]"
            >
              <div>
                <p className="text-xs font-semibold text-white/40 group-hover:text-cyan-300 transition-colors">
                  Dự án tiếp theo →
                </p>
                <h4 className="mt-2 text-lg font-bold text-white group-hover:text-cyan-200 transition-colors line-clamp-1">
                  {nextProject.title}
                </h4>
                <p className="mt-1 text-xs text-white/60 line-clamp-2">{nextProject.description}</p>
              </div>
              <p className="mt-4 text-xs font-mono text-cyan-300/70">{nextProject.year}</p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
