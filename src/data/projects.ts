export type ProjectItem = {
  number: string;
  slug: string;
  year: string;
  date: string;
  title: string;
  role: string;
  description: string;
  techs: string[];
  preview: "comingSoon" | "huit" | "dashboard" | "mobile" | "portfolio" | "ai";
  previewImage?: string;
  fullPreviewImage?: string;
};

export const projects: ProjectItem[] = [
  {
    number: "1",
    slug: "contest-voting-platform",
    year: "2026 - Present",
    date: "(05/2026 - Present)",
    title: "Contest Voting Platform",
    role: "Full-stack Developer",
    description:
      "A modern contest voting platform that allows users to view contestants, vote online, and track real-time rankings. The system includes contestant management, secure authentication, voting flow, live leaderboard updates, and an admin dashboard for managing contest data.",
    techs: ["Next.js", "Tailwind CSS", "NestJS", "MySQL", "Prisma"],
    preview: "comingSoon",
  },
  {
    number: "2",
    slug: "ung-dung-giao-viec-ai-webrtc",
    year: "2025",
    date: "(08/09/2025 - 30/11/2025)",
    title: "AI WebRTC Task Management Platform",
    role: "Full-stack Developer",
    description:
      "A cross-platform project and task management system for web and mobile, supporting progress tracking, worklogs, AI-powered search and suggestions with Gemini, and real-time internal communication through chat, voice calls, and video calls using WebRTC.",
    techs: ["Next.js", "NestJS", "React Native", "MySQL", "WebRTC"],
    preview: "comingSoon",
    previewImage: "/assets/project-previews/ungdunggiaoviec/3.43.png",
    fullPreviewImage: "/assets/project-previews/ungdunggiaoviec/fullpage.jpeg",
  },
  {
    number: "3",
    slug: "job-fair-portal",
    year: "2025",
    date: "(06/2025 - 09/2025)",
    title: "Job Fair Portal",
    role: "Inter Full-stack Developer",
    description:
      "A dedicated online portal for the Career Fair event, supporting students in applying online, connecting with recruiting companies, and providing a comprehensive management and reporting system for the organizers.",
    techs: ["ASP.NET", "SQL Server"],
    preview: "dashboard",
    previewImage: "/assets/project-previews/ngayhoivieclam/home.png",
    fullPreviewImage: "/assets/project-previews/ngayhoivieclam/ngayhoivieclam_full.jpeg",
  },
];
