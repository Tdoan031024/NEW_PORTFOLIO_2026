"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const UniverseLab = dynamic(() => import("./UniverseLab"), { ssr: false });
export default function UniverseLauncher() {
  const [open,setOpen] = useState(false);
  const [ready,setReady] = useState(false);
  useEffect(() => {
    const enter = () => setReady(true);
    const timer = window.setTimeout(() => {
      if (!document.querySelector(".portfolio-warp-intro")) enter();
    }, 1500);
    window.addEventListener("intro-preloader-complete",enter);
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase()==="k" && document.documentElement.dataset.portfolioIntro !== "active") {
        e.preventDefault(); setOpen(v=>!v); setReady(true);
      }
    };
    window.addEventListener("keydown",key);
    return () => { window.clearTimeout(timer); window.removeEventListener("intro-preloader-complete",enter); window.removeEventListener("keydown",key); };
  },[]);
  if(!ready) return null;
  return <><button type="button" onClick={()=>setOpen(true)} className="fixed bottom-5 left-5 z-[850] rounded-full border border-cyan-300/40 bg-[#071426] px-4 py-3 text-xs font-semibold text-cyan-100 shadow-[0_0_24px_#22d3ee33] hover:scale-105 transition-transform" aria-label="Open Universe Lab">✦ Universe Lab <span className="hidden sm:inline opacity-60">⌘ K</span></button>{open && <UniverseLab onClose={()=>setOpen(false)} />}</>;
}
