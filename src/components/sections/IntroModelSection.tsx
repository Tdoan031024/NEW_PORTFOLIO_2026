"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import GuideCallout from "@/components/GuideCallout";


const HeroThree = dynamic(() => import("@/components/HeroThree"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

const guideVersion = "portfolio-guides-2026-05-22-v3";
const guideShowDelay = 1800;
const guideAnimationDuration = 7200;
const guideFadeDuration = 700;
const AUTO_SHOW_GUIDES = false; // Tạm thời ẩn các gợi ý chỉ dẫn theo yêu cầu

export default function IntroModelSection() {
  const [isEditingGuides, setIsEditingGuides] = useState(false);
  const [panelGuidesMounted, setPanelGuidesMounted] = useState(false);
  const [panelGuidesVisible, setPanelGuidesVisible] = useState(false);
  const [contactGuideMounted, setContactGuideMounted] = useState(false);
  const [contactGuideVisible, setContactGuideVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "g") {
        setIsEditingGuides((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isEditingGuides) {
      setPanelGuidesMounted(true);
      setPanelGuidesVisible(true);
      setContactGuideMounted(true);
      setContactGuideVisible(true);
      window.dispatchEvent(
        new CustomEvent("guide-edit-mode-toggle", { detail: { editing: true } }),
      );
      return;
    }

    window.dispatchEvent(
      new CustomEvent("guide-edit-mode-toggle", { detail: { editing: false } }),
    );

    if (!AUTO_SHOW_GUIDES) {
      setPanelGuidesMounted(false);
      setPanelGuidesVisible(false);
      setContactGuideMounted(false);
      setContactGuideVisible(false);
      return;
    }

    const showPanelTimer = window.setTimeout(() => {
      setPanelGuidesMounted(true);
      window.requestAnimationFrame(() => setPanelGuidesVisible(true));
    }, guideShowDelay);

    const fadePanelTimer = window.setTimeout(() => {
      setPanelGuidesVisible(false);
    }, guideShowDelay + guideAnimationDuration);

    const unmountPanelTimer = window.setTimeout(() => {
      setPanelGuidesMounted(false);
    }, guideShowDelay + guideAnimationDuration + guideFadeDuration);

    const contactDelay = guideShowDelay + 700;
    const showContactTimer = window.setTimeout(() => {
      setContactGuideMounted(true);
      window.requestAnimationFrame(() => setContactGuideVisible(true));
    }, contactDelay);

    const fadeContactTimer = window.setTimeout(() => {
      setContactGuideVisible(false);
    }, contactDelay + guideAnimationDuration);

    const unmountContactTimer = window.setTimeout(() => {
      setContactGuideMounted(false);
    }, contactDelay + guideAnimationDuration + guideFadeDuration);

    return () => {
      window.clearTimeout(showPanelTimer);
      window.clearTimeout(fadePanelTimer);
      window.clearTimeout(unmountPanelTimer);
      window.clearTimeout(showContactTimer);
      window.clearTimeout(fadeContactTimer);
      window.clearTimeout(unmountContactTimer);
    };
  }, [isEditingGuides]);

  const copyCoordinates = () => {
    try {
      const skills = window.localStorage.getItem("guide-model-skills");
      const contact = window.localStorage.getItem("guide-model-contact");
      const sidebar = window.localStorage.getItem("guide-sidebar");
      const avatar = window.localStorage.getItem("guide-model-about");
      const data = {
        skills: skills ? JSON.parse(skills) : null,
        contact: contact ? JSON.parse(contact) : null,
        sidebar: sidebar ? JSON.parse(sidebar) : null,
        avatar: avatar ? JSON.parse(avatar) : null,
      };
      navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const resetCoordinates = () => {
    window.localStorage.removeItem("guide-model-skills");
    window.localStorage.removeItem("guide-model-contact");
    window.localStorage.removeItem("guide-sidebar");
    window.localStorage.removeItem("guide-model-about");
    window.location.reload();
  };

  const panelGuideVisibilityClass = isEditingGuides || panelGuidesVisible
    ? "opacity-100"
    : "pointer-events-none opacity-0";
  const contactGuideVisibilityClass = isEditingGuides || contactGuideVisible
    ? "opacity-100"
    : "pointer-events-none opacity-0";

  return (
    <section
      id="intro-3d"
      className="relative z-[180] flex min-h-screen items-center justify-center overflow-visible pb-0"
    >
      {/* Floating Toolbar chỉ hiển thị khi mở chế độ chỉnh sửa */}
      {isEditingGuides && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[600] flex items-center gap-2 rounded-2xl border border-cyan-400/30 bg-[#071326]/90 px-3 py-2 shadow-[0_10px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(34,211,238,0.15)] backdrop-blur-2xl transition-all opacity-100">
          <button
            type="button"
            onClick={() => setIsEditingGuides(false)}
            className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold transition-all shadow-sm bg-amber-500/25 border border-amber-400/60 text-amber-200 hover:bg-amber-500/35"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
            </span>
            <span>🔓 Đang mở chỉnh sửa • Bấm để Khóa 🔒</span>
          </button>

          <button
            type="button"
            onClick={copyCoordinates}
            className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition-all"
            title="Sao chép toàn bộ toạ độ"
          >
            {copied ? "✓ Đã chép tất cả!" : "📋 Sao chép toạ độ"}
          </button>
          <button
            type="button"
            onClick={resetCoordinates}
            className="flex items-center gap-1 rounded-xl border border-rose-500/30 bg-rose-500/15 px-2 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/25 transition-all"
            title="Khôi phục toạ độ ban đầu"
          >
            ↺ Reset
          </button>
        </div>
      )}

      {panelGuidesMounted && (
        <>
          <GuideCallout
            label="Open the skills section here"
            className={`absolute left-[9%] top-[31%] z-[422] ${isEditingGuides ? "z-[520]" : "z-[422]"} block h-[270px] w-[430px] transition-opacity duration-700 ${panelGuideVisibilityClass}`}
            viewBox="0 0 430 270"
            initialOffset={{ x: -50, y: -376 }}
            start={{ x: 449, y: 124 }}
            end={{ x: 326, y: 236 }}
            labelBox={{ x: 459, y: 103, width: 230, height: 56 }}
            storageKey="guide-model-skills"
            storageVersion={guideVersion}
            editable={isEditingGuides}
            showDebug={isEditingGuides}
          />
        </>
      )}
      {contactGuideMounted && (
        <>
          <GuideCallout
            label="Contact me from this panel"
            className={`absolute left-[9%] top-[42%] z-[430] ${isEditingGuides ? "z-[520]" : "z-[430]"} block h-[290px] w-[470px] transition-opacity duration-700 ${contactGuideVisibilityClass}`}
            viewBox="0 0 470 290"
            initialOffset={{ x: 310, y: -205 }}
            start={{ x: 1055, y: -30 }}
            end={{ x: 830, y: 73 }}
            labelBox={{ x: 1066, y: -57, width: 230, height: 56 }}
            storageKey="guide-model-contact"
            storageVersion={guideVersion}
            editable={isEditingGuides}
            showDebug={isEditingGuides}
          />
        </>
      )}
      <div className="relative z-40 flex w-full flex-col items-center overflow-visible">
        <div className="relative z-40 h-[85vh] sm:h-[110vh] md:h-[135vh] lg:h-[160vh] w-full overflow-visible rounded-none bg-transparent -mb-20 sm:-mb-40 md:-mb-60 lg:-mb-78">
          <HeroThree
            className="relative z-40 h-full w-full overflow-visible"
            introZoom={true}
            enableControls={true}
            enableRotate={true}
            enablePan={false}
            enableZoom={false}
            maxRotationAngle={Math.PI / 2}
            showCoordinateHelper={false}
            enableInteraction
            enableHover
            enableFloat={false}
            initialCameraPosition={{ x: 1.7, y: 2.04, z: 2.27 }}
            initialTarget={{ x: -0.05, y: 1, z: 0 }}
            initialModelRotationY={Math.PI * -0.567}
            modelOffset={{ x: 0.4, y: 1.5 }}
            modelUrl="/assets/models/room-IT-3d-normal.glb"
          />
        </div>
      </div>
    </section>
  );
}
