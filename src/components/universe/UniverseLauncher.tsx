"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { award } from "./universeState";
const UniverseLab = dynamic(() => import("./UniverseLab"), { ssr: false });
export default function UniverseLauncher() {
  const [open,setOpen] = useState(false);
  const [initialTab,setInitialTab] = useState<"galaxy"|"search"|"achievements">("galaxy");
  const [ready,setReady] = useState(false);
  useEffect(() => {
    try{document.documentElement.dataset.universeRoom=localStorage.getItem("universe-room")==="night"?"night":"day";}catch{}
    const enter = () => setReady(true);
    const timer = window.setTimeout(() => {
      if (!document.querySelector(".portfolio-warp-intro")) enter();
    }, 1500);
    window.addEventListener("intro-preloader-complete",enter);
    let secret = "";
    const room = (e: Event) => {const kind=(e as CustomEvent<{type?:string}>).detail?.type;if(kind)award("room-"+kind);};
    const game=()=>award("arcade");
    window.addEventListener("room-3d-interact",room);
    window.addEventListener("open-cyber-game-modal",game);
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase()==="k" && document.documentElement.dataset.portfolioIntro !== "active") {
        e.preventDefault(); setInitialTab("search"); setOpen(true); setReady(true);
      }
      if(document.documentElement.dataset.portfolioIntro === "active" || e.ctrlKey || e.metaKey || e.altKey || e.repeat || (e.target instanceof HTMLElement && (e.target.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName))))return;
      secret=(secret+e.key.toLowerCase()).slice(-8);
      if(secret.endsWith("universe")){award("secret");setInitialTab("achievements");setOpen(true);setReady(true);}
    };
    window.addEventListener("keydown",key);
    return () => { window.clearTimeout(timer); window.removeEventListener("intro-preloader-complete",enter); window.removeEventListener("keydown",key);window.removeEventListener("room-3d-interact",room);window.removeEventListener("open-cyber-game-modal",game); };
  },[]);
  if(!ready) return null;
  return <><button type="button" onClick={()=>{setInitialTab("galaxy");setOpen(true);award("explorer");}} className="fixed bottom-5 left-5 z-[850] rounded-full border border-cyan-300/40 bg-[#071426] px-4 py-3 text-xs font-semibold text-cyan-100 shadow-[0_0_24px_#22d3ee33] hover:scale-105 transition-transform" aria-label="Open Universe Lab">✦ Universe Lab <span className="hidden sm:inline opacity-60">⌘ K</span></button>{open && <UniverseLab key={initialTab} initialTab={initialTab} onClose={()=>setOpen(false)} />}</>;
}
