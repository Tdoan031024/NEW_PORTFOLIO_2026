"use client";

import { useEffect, useState } from "react";

export type InteractionToastData = {
  id: string;
  type: "cat" | "skeleton" | "robot" | "chair";
  icon: string;
  title: string;
  message: string;
};

export default function RoomInteractionToast() {
  const [toast, setToast] = useState<InteractionToastData | null>(null);

  useEffect(() => {
    const handleEvent = (e: CustomEvent<InteractionToastData>) => {
      setToast(e.detail);
    };

    window.addEventListener("room-3d-interact" as never, handleEvent as EventListener);
    return () => {
      window.removeEventListener("room-3d-interact" as never, handleEvent as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[9990] max-w-md w-[92%] pointer-events-none animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="pointer-events-auto relative flex items-start gap-3.5 rounded-2xl border border-cyan-400/40 bg-[#071328]/95 p-4 shadow-[0_12px_45px_rgba(0,0,0,0.6),0_0_28px_rgba(34,211,238,0.25)] backdrop-blur-xl text-white">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/15 border border-cyan-400/30 text-2xl shadow-inner">
          {toast.icon}
        </div>
        <div className="flex-1 pr-6">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-black text-cyan-300 tracking-wide">{toast.title}</h4>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
              Interactive 3D
            </span>
          </div>
          <p className="mt-1 text-xs text-white/85 leading-relaxed font-sans">{toast.message}</p>
        </div>
        <button
          type="button"
          onClick={() => setToast(null)}
          className="absolute top-3 right-3 text-white/40 hover:text-white text-xs p-1 cursor-pointer transition"
          title="Đóng"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
