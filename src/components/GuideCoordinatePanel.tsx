"use client";

import { useEffect, useMemo, useState } from "react";

type GuideCoordinate = {
  x: number;
  y: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  labelX: number;
  labelY: number;
};

type GuideCoordinateItem = {
  key: string;
  label: string;
  value: GuideCoordinate;
};

type GuideCoordinatePanelProps = {
  items: GuideCoordinateItem[];
  className?: string;
};

function readCoordinate(key: string, fallback: GuideCoordinate) {
  if (typeof window === "undefined") return fallback;
  const stored = window.localStorage.getItem(key);
  if (!stored) return fallback;

  try {
    const parsed = JSON.parse(stored) as Partial<GuideCoordinate>;
    if (
      typeof parsed.x === "number" &&
      typeof parsed.y === "number" &&
      typeof parsed.startX === "number" &&
      typeof parsed.startY === "number" &&
      typeof parsed.endX === "number" &&
      typeof parsed.endY === "number" &&
      typeof parsed.labelX === "number" &&
      typeof parsed.labelY === "number"
    ) {
      return parsed as GuideCoordinate;
    }
  } catch {
    window.localStorage.removeItem(key);
  }

  return fallback;
}

export default function GuideCoordinatePanel({ items, className }: GuideCoordinatePanelProps) {
  const initialValues = useMemo(
    () =>
      items.reduce<Record<string, GuideCoordinate>>((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {}),
    [items],
  );
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    const load = () => {
      setValues(
        items.reduce<Record<string, GuideCoordinate>>((acc, item) => {
          acc[item.key] = readCoordinate(item.key, item.value);
          return acc;
        }, {}),
      );
    };

    const handleChange = () => load();
    load();
    window.addEventListener("guide-coordinate-change", handleChange);
    window.addEventListener("storage", handleChange);
    return () => {
      window.removeEventListener("guide-coordinate-change", handleChange);
      window.removeEventListener("storage", handleChange);
    };
  }, [items]);

  return (
    <aside
      className={
        className ??
        "fixed bottom-5 left-5 z-[260] hidden w-[410px] rounded-2xl border border-cyan-100/20 bg-[#050b18]/90 p-4 text-cyan-50 shadow-[0_20px_60px_rgba(0,0,0,0.42),0_0_30px_rgba(34,211,238,0.14)] backdrop-blur-xl lg:block"
      }
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <strong className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-100/85">
          Current Coordinates
        </strong>
        <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] font-bold text-white/55">
          Guides
        </span>
      </div>
      <div className="max-h-[260px] space-y-3 overflow-auto pr-1">
        {items.map((item) => {
          const value = values[item.key] ?? item.value;
          return (
            <pre
              key={item.key}
              className="whitespace-pre-wrap rounded-xl border border-white/10 bg-black/28 p-3 font-mono text-[10px] leading-5 text-cyan-50/82"
            >
{`${item.label}
${item.key}: {
  offset: { x: ${value.x}, y: ${value.y} },
  start: { x: ${value.startX}, y: ${value.startY} },
  end: { x: ${value.endX}, y: ${value.endY} },
  label: { x: ${value.labelX}, y: ${value.labelY} }
}`}
            </pre>
          );
        })}
      </div>
    </aside>
  );
}
