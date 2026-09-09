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
  title: "Doan - Creative Fullstack Portfolio",
  description:
    "Modern, futuristic portfolio with 3D interaction, animations, and AI-enhanced project stories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${sora.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void text-ink">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
