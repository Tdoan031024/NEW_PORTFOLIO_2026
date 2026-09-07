import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import IntroModelSection from "@/components/sections/IntroModelSection";

const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"));
const ExperienceSection = dynamic(() => import("@/components/sections/ExperienceSection"));
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"));
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"));

export default function Home() {
  return (
    <div className="page-shell flex min-h-screen flex-col">
      {/* Loading disabled temporarily */}
      <SiteHeader />

      <main className="relative flex-1 overflow-visible">
        <IntroModelSection />
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Live chat an khi dang preview loading */}

      <SiteFooter />
    </div>
  );
}
