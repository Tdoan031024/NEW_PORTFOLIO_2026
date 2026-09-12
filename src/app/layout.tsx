import type { Metadata } from "next";
import { IBM_Plex_Mono, Sora } from "next/font/google";
import AppProviders from "@/components/AppProviders";
import "./globals.css";

const sora = Sora({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://new-portfolio-2026.pages.dev"),
  title: {
    default: "Tuyen Doan | Full-Stack Software Engineer",
    template: "%s | Tuyen Doan",
  },
  description:
    "Portfolio cá nhân của Tuyen Doan - Kỹ sư phần mềm Full-Stack chuyên phát triển các hệ thống web hiện đại, scalable, microservices và trải nghiệm tương tác 3D/AI.",
  icons: {
    icon: [
      { url: "/assets/logo/signature-white.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/assets/logo/signature-white.png",
    apple: "/assets/logo/signature-white.png",
  },
  openGraph: {
    title: "Tuyen Doan | Full-Stack Software Engineer",
    description:
      "Khám phá các dự án công nghệ, giải pháp web quy mô lớn và năng lực chuyên môn của Tuyen Doan.",
    siteName: "Tuyen Doan Portfolio",
    images: [
      {
        url: "/assets/logo/signature-white.png",
        width: 1200,
        height: 630,
        alt: "Tuyen Doan Signature Logo",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tuyen Doan | Full-Stack Software Engineer",
    description:
      "Khám phá các dự án công nghệ, giải pháp web quy mô lớn và năng lực chuyên môn của Tuyen Doan.",
    images: ["/assets/logo/signature-white.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      data-theme="dark"
      style={{ colorScheme: "dark" }}
      className={`${sora.variable} ${ibmPlexMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-void text-ink">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
