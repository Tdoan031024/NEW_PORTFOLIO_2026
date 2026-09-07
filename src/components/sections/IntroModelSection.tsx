"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import GuideCallout from "@/components/GuideCallout";

const HeroThree = dynamic(() => import("@/components/HeroThree"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

const guideVersion = "portfolio-guides-2026-05-22-6";
const guideShowDelay = 5600;
const guideAnimationDuration = 6800;
const guideGapBetweenGroups = 0;
const guideFadeDuration = 700;
const guideEditMode = false;

export default function IntroModelSection() {
  const [panelGuidesMounted, setPanelGuidesMounted] = useState(false);
  const [panelGuidesVisible, setPanelGuidesVisible] = useState(false);
  const [contactGuideMounted, setContactGuideMounted] = useState(false);
  const [contactGuideVisible, setContactGuideVisible] = useState(false);

  useEffect(() => {
    if (guideEditMode) {
      setPanelGuidesMounted(true);
      setPanelGuidesVisible(true);
      setContactGuideMounted(true);
      setContactGuideVisible(true);
      return;
    }
  }, []);

  useEffect(() => {
    if (guideEditMode) return;

    const contactStartAt =
      guideShowDelay + guideAnimationDuration + guideFadeDuration + guideGapBetweenGroups;
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
    const showContactTimer = window.setTimeout(() => {
      setContactGuideMounted(true);
      window.requestAnimationFrame(() => setContactGuideVisible(true));
    }, contactStartAt);
    const fadeContactTimer = window.setTimeout(() => {
      setContactGuideVisible(false);
    }, contactStartAt + guideAnimationDuration);
    const unmountContactTimer = window.setTimeout(() => {
      setContactGuideMounted(false);
    }, contactStartAt + guideAnimationDuration + guideFadeDuration);

    return () => {
      window.clearTimeout(showPanelTimer);
      window.clearTimeout(fadePanelTimer);
      window.clearTimeout(unmountPanelTimer);
      window.clearTimeout(showContactTimer);
      window.clearTimeout(fadeContactTimer);
      window.clearTimeout(unmountContactTimer);
    };
  }, []);

  const panelGuideVisibilityClass = panelGuidesVisible
    ? "opacity-100"
    : "pointer-events-none opacity-0";
  const contactGuideVisibilityClass = contactGuideVisible
    ? "opacity-100"
    : "pointer-events-none opacity-0";

  return (
    <section
      id="intro-3d"
      className="relative z-[180] flex min-h-screen items-center justify-center overflow-visible pb-0"
    >
      {panelGuidesMounted && (
        <>
          <GuideCallout
            label="Open the skills section here"
            className={`absolute left-[9%] top-[31%] z-[422] hidden h-[270px] w-[430px] transition-opacity duration-700 lg:block ${panelGuideVisibilityClass}`}
            viewBox="0 0 430 270"
            initialOffset={{ x: -104, y: -367 }}
            start={{ x: 426, y: 81 }}
            end={{ x: 254, y: 187 }}
            labelBox={{ x: 458, y: 54, width: 230, height: 56 }}
            storageKey="guide-model-skills"
            storageVersion={guideVersion}
          />
        </>
      )}
      {contactGuideMounted && (
        <>
          <GuideCallout
            label="Contact me from this panel"
            className={`absolute left-[9%] top-[42%] z-[430] hidden h-[290px] w-[470px] transition-opacity duration-700 lg:block ${contactGuideVisibilityClass}`}
            viewBox="0 0 470 290"
            initialOffset={{ x: 1318, y: -550 }}
            start={{ x: 111, y: 255 }}
            end={{ x: -154, y: 390 }}
            labelBox={{ x: 138, y: 221, width: 230, height: 56 }}
            storageKey="guide-model-contact"
            storageVersion={guideVersion}
          />
        </>
      )}
      <div className="relative z-40 flex w-full flex-col items-center overflow-visible">
        <div className="relative z-40 h-[160vh] w-full overflow-visible rounded-none bg-transparent -mb-78">
          <HeroThree
            className="relative z-40 h-full w-full overflow-visible"
            introZoom
            enableControls={false}
            enableInteraction
            enableHover
            enableFloat={false}
            initialCameraPosition={{ x: 1.35, y: 1.85, z: 2.4 }}
            initialTarget={{ x: 0, y: 1.05, z: 0 }}
            initialModelRotationY={Math.PI * -0.567}
            modelOffset={{ x: 0.4, y: 1.5 }}
            modelUrl="/assets/models/room_IT_3d.glb"
          />
        </div>
      </div>
    </section>
  );
}
