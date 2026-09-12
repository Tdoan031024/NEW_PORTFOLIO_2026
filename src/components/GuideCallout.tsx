"use client";

import { type PointerEvent, useEffect, useId, useRef, useState } from "react";

type GuideCalloutProps = {
  label: string;
  className?: string;
  viewBox?: string;
  start: { x: number; y: number };
  end: { x: number; y: number };
  labelBox: { x: number; y: number; width: number; height: number };
  initialOffset?: { x: number; y: number };
  tone?: "cyan" | "pink";
  editable?: boolean;
  storageKey?: string;
  storageVersion?: string;
  showDebug?: boolean;
};

export default function GuideCallout({
  label,
  className,
  viewBox = "0 0 520 240",
  start,
  end,
  labelBox,
  initialOffset = { x: 0, y: 0 },
  tone = "cyan",
  editable = false,
  storageKey,
  storageVersion,
  showDebug = false,
}: GuideCalloutProps) {
  const id = useId().replace(/:/g, "");
  const gradientId = `guideGradient-${id}`;
  const glowId = `guideGlow-${id}`;
  const maskId = `guideRevealMask-${id}`;
  const accent = "#67e8f9";
  const middle = "#38bdf8";
  const deepAccent = "#2563eb";
  const [, , viewBoxWidthRaw, viewBoxHeightRaw] = viewBox.split(" ");
  const viewBoxWidth = Number(viewBoxWidthRaw) || 520;
  const viewBoxHeight = Number(viewBoxHeightRaw) || 240;
  const [offset, setOffset] = useState(initialOffset);
  const [startPoint, setStartPoint] = useState(start);
  const [endPoint, setEndPoint] = useState(end);
  const [labelPos, setLabelPos] = useState({ x: labelBox.x, y: labelBox.y });
  const rootRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{
    mode: "move" | "start" | "end" | "label";
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    originStart: { x: number; y: number };
    originEnd: { x: number; y: number };
    originLabel: { x: number; y: number };
  } | null>(null);

  useEffect(() => {
    if (!storageKey) return;
    if (storageVersion) {
      const versionKey = `${storageKey}:version`;
      if (window.localStorage.getItem(versionKey) !== storageVersion) {
        window.localStorage.removeItem(storageKey);
        window.localStorage.setItem(versionKey, storageVersion);
        return;
      }
    }

    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored) as {
        x?: number;
        y?: number;
        startX?: number;
        startY?: number;
        endX?: number;
        endY?: number;
        labelX?: number;
        labelY?: number;
      };
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
        setOffset({ x: parsed.x, y: parsed.y });
        setStartPoint({ x: parsed.startX, y: parsed.startY });
        setEndPoint({ x: parsed.endX, y: parsed.endY });
        setLabelPos({ x: parsed.labelX, y: parsed.labelY });
      }
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, [storageKey, storageVersion]);

  useEffect(() => {
    if (!storageKey) return;
    const detail = {
      x: offset.x,
      y: offset.y,
      startX: startPoint.x,
      startY: startPoint.y,
      endX: endPoint.x,
      endY: endPoint.y,
      labelX: labelPos.x,
      labelY: labelPos.y,
    };
    window.localStorage.setItem(storageKey, JSON.stringify(detail));
    window.dispatchEvent(new CustomEvent("guide-coordinate-change", { detail: { key: storageKey, value: detail } }));
  }, [endPoint, labelPos, offset, startPoint, storageKey]);

  const startDrag = (
    event: PointerEvent<HTMLDivElement>,
    mode: "move" | "start" | "end" | "label" = "move",
  ) => {
    if (!editable) return;
    rootRef.current?.setPointerCapture(event.pointerId);
    dragRef.current = {
      mode,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: offset.x,
      originY: offset.y,
      originStart: startPoint,
      originEnd: endPoint,
      originLabel: labelPos,
    };
  };

  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;

    if (drag.mode === "move") {
      setOffset({
        x: Math.round(drag.originX + deltaX),
        y: Math.round(drag.originY + deltaY),
      });
      return;
    }

    const box = rootRef.current?.getBoundingClientRect();
    if (!box) return;
    const scaleX = viewBoxWidth / box.width;
    const scaleY = viewBoxHeight / box.height;
    const svgDx = deltaX * scaleX;
    const svgDy = deltaY * scaleY;

    if (drag.mode === "start") {
      setStartPoint({
        x: Math.round(drag.originStart.x + svgDx),
        y: Math.round(drag.originStart.y + svgDy),
      });
      return;
    }

    if (drag.mode === "label") {
      setLabelPos({
        x: Math.round(drag.originLabel.x + svgDx),
        y: Math.round(drag.originLabel.y + svgDy),
      });
      return;
    }

    setEndPoint({
      x: Math.round(drag.originEnd.x + svgDx),
      y: Math.round(drag.originEnd.y + svgDy),
    });
  };

  const stopDrag = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    try {
      rootRef.current?.releasePointerCapture(event.pointerId);
    } catch {
      // ignore
    }
  };

  const controlOne = {
    x: startPoint.x + (endPoint.x - startPoint.x) * 0.33,
    y: startPoint.y + (endPoint.y - startPoint.y) * 0.12,
  };
  const controlTwo = {
    x: startPoint.x + (endPoint.x - startPoint.x) * 0.7,
    y: endPoint.y - (endPoint.y - startPoint.y) * 0.12,
  };
  const path = `M ${startPoint.x} ${startPoint.y} C ${controlOne.x} ${controlOne.y}, ${controlTwo.x} ${controlTwo.y}, ${endPoint.x} ${endPoint.y}`;
  const arrowAngle =
    (Math.atan2(endPoint.y - controlTwo.y, endPoint.x - controlTwo.x) * 180) /
    Math.PI;

  return (
    <div className={`pointer-events-none overflow-visible ${className ?? ""}`} aria-hidden="true">
      <div
        ref={rootRef}
        className={`relative h-full w-full overflow-visible ${editable ? "pointer-events-auto cursor-move" : ""}`}
        style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
        onPointerDown={(event) => startDrag(event, "move")}
        onPointerMove={moveDrag}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
      >
      {editable && showDebug && (
        <div className="absolute -top-9 left-0 z-10 rounded-full border border-cyan-100/25 bg-[#050b18]/88 px-3 py-1 text-[11px] font-semibold text-cyan-50 shadow-[0_0_20px_rgba(34,211,238,0.18)] backdrop-blur-md">
          {storageKey ?? "guide"}: offset {"{"}x: {offset.x}, y: {offset.y}{"}"} start {"{"}x: {startPoint.x}, y: {startPoint.y}{"}"} end {"{"}x: {endPoint.x}, y: {endPoint.y}{"}"} label {"{"}x: {labelPos.x}, y: {labelPos.y}{"}"}
        </div>
      )}
      <svg viewBox={viewBox} className="h-full w-full overflow-visible" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={accent} />
            <stop offset="48%" stopColor={middle} />
            <stop offset="100%" stopColor={accent} />
          </linearGradient>

          <filter id={glowId} x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id={`${gradientId}-arrow`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={middle} />
            <stop offset="48%" stopColor={accent} />
            <stop offset="100%" stopColor={deepAccent} />
          </linearGradient>
        </defs>

        <circle
          cx={startPoint.x}
          cy={startPoint.y}
          r="4.5"
          fill={accent}
          filter={`url(#${glowId})`}
          className="guide-start-dot"
        />

        <foreignObject
          x={labelPos.x}
          y={labelPos.y}
          width={labelBox.width + 50}
          height={labelBox.height + 25}
          style={{ overflow: "visible" }}
          className={`guide-callout-label ${editable ? "cursor-move" : ""}`}
          onPointerDown={(event) => {
            if (!editable) return;
            event.stopPropagation();
            startDrag(event as unknown as PointerEvent<HTMLDivElement>, "label");
          }}
        >
          <div
            className="inline-flex items-center whitespace-nowrap rounded-full border border-cyan-400/60 bg-gradient-to-r from-[#061833] via-[#0a2347] to-[#061833] px-4 py-2 text-[13px] font-extrabold tracking-wide shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]"
            style={{
              filter: "drop-shadow(0 0 10px rgba(34, 211, 238, 0.45)) drop-shadow(0 6px 18px rgba(0, 0, 0, 0.9))",
            }}
          >
            {/* Pulsing Attention Beacon */}
            <span className="relative mr-2.5 flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-80" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,1)]" />
            </span>
            <span className="bg-gradient-to-r from-white via-cyan-50 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              {label}
            </span>
          </div>
        </foreignObject>

        {/* Base continuous curve */}
        <path
          d={path}
          fill="none"
          stroke="rgba(34, 211, 238, 0.3)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Outer Glow Path */}
        <path
          d={path}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="5"
          strokeLinecap="round"
          strokeOpacity="0.45"
          filter={`url(#${glowId})`}
          className="guide-laser-glow"
        />

        {/* Flowing Laser Stream */}
        <path
          d={path}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          className="guide-laser-stream"
        />

        {/* Always-visible Cyber Arrowhead */}
        <g
          transform={`translate(${endPoint.x} ${endPoint.y}) rotate(${arrowAngle})`}
          filter={`url(#${glowId})`}
          className="guide-arrowhead"
        >
          <path
            d="M 0 0 L -14 -6 L -9 0 L -14 6 Z"
            fill={`url(#${gradientId}-arrow)`}
          />
        </g>

        {/* Target radar ping ring & core */}
        <circle
          cx={endPoint.x}
          cy={endPoint.y}
          r="14"
          fill="none"
          stroke={accent}
          strokeWidth="2"
          className="guide-target-ring"
        />
        <circle cx={endPoint.x} cy={endPoint.y} r="4" fill={accent} filter={`url(#${glowId})`} />
        {editable && (
          <>
            <circle
              cx={startPoint.x}
              cy={startPoint.y}
              r="9"
              fill="#0f172a"
              stroke="#67e8f9"
              strokeWidth="2"
              className="cursor-grab active:cursor-grabbing"
              onPointerDown={(event) => {
                event.stopPropagation();
                startDrag(event as unknown as PointerEvent<HTMLDivElement>, "start");
              }}
            />
            <circle
              cx={endPoint.x}
              cy={endPoint.y}
              r="9"
              fill="#0f172a"
              stroke="#67e8f9"
              strokeWidth="2"
              className="cursor-grab active:cursor-grabbing"
              onPointerDown={(event) => {
                event.stopPropagation();
                startDrag(event as unknown as PointerEvent<HTMLDivElement>, "end");
              }}
            />
          </>
        )}
      </svg>
      </div>

      <style>{`
        .guide-start-dot {
          transform-box: fill-box;
          transform-origin: center;
        }

        .guide-laser-stream {
          stroke-dasharray: 8 10;
          animation: guideLaserFlow 1.6s linear infinite;
        }

        .guide-laser-glow {
          stroke-dasharray: 8 10;
          animation: guideLaserFlow 1.6s linear infinite;
        }

        @keyframes guideLaserFlow {
          from { stroke-dashoffset: 36; }
          to { stroke-dashoffset: 0; }
        }

        .guide-arrowhead {
          opacity: 1;
          transform-box: fill-box;
          transform-origin: 0 0;
          animation: guideArrowPulse 2s ease-in-out infinite;
        }

        @keyframes guideArrowPulse {
          0%, 100% { filter: drop-shadow(0 0 3px rgba(34, 211, 238, 0.7)); }
          50% { filter: drop-shadow(0 0 8px rgba(34, 211, 238, 1)); }
        }

        .guide-target-ring {
          transform-box: fill-box;
          transform-origin: center;
          animation: guideTargetPing 2.2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes guideTargetPing {
          0% { transform: scale(0.5); opacity: 0.95; }
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }

        .guide-callout-label {
          opacity: 1;
        }

        @keyframes guideLabelReveal {
          0% { opacity: 0; transform: translateY(8px) scale(.95); }
          6% { opacity: 1; transform: translateY(0) scale(1.02); }
          12% { transform: translateY(0) scale(1); }
          35% { transform: translateY(-2.5px) scale(1.01); }
          60% { transform: translateY(0) scale(1); }
          80% { transform: translateY(-2px) scale(1.01); }
          90% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-5px) scale(.96); }
        }

        @media (prefers-reduced-motion: reduce) {
          .guide-callout-line,
          .guide-callout-pulse,
          .guide-callout-label {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
