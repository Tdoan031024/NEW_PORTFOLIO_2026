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
    rootRef.current?.releasePointerCapture(event.pointerId);
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

          <mask
            id={maskId}
            x="-2200"
            y="-2200"
            width="5200"
            height="5200"
            maskUnits="userSpaceOnUse"
            maskContentUnits="userSpaceOnUse"
          >
            <path
              d={path}
              fill="none"
              stroke="white"
              strokeWidth="14"
              strokeLinecap="round"
              pathLength="100"
              className="guide-reveal-mask"
            />
          </mask>
        </defs>

        <circle
          cx={startPoint.x}
          cy={startPoint.y}
          r="5"
          fill={accent}
          filter={`url(#${glowId})`}
          className="guide-start-dot"
        />

        <foreignObject
          x={labelPos.x}
          y={labelPos.y}
          width={labelBox.width}
          height={labelBox.height}
          className={`guide-callout-label ${editable ? "cursor-move" : ""}`}
          onPointerDown={(event) => {
            if (!editable) return;
            event.stopPropagation();
            startDrag(event as unknown as PointerEvent<HTMLDivElement>, "label");
          }}
        >
          <div className="inline-flex max-w-full rounded-full border border-cyan-100/45 bg-[#051327]/92 px-4 py-2 text-[12px] font-extrabold text-cyan-50 shadow-[0_0_36px_rgba(34,211,238,0.3)] backdrop-blur-md">
            {label}
          </div>
        </foreignObject>

        <g mask={`url(#${maskId})`}>
          <path
            d={path}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="100"
            filter={`url(#${glowId})`}
            className="guide-callout-glow"
          />
          <path
            d={path}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="100"
            className="guide-callout-line"
          />
        </g>

        <g
          transform={`translate(${endPoint.x} ${endPoint.y}) rotate(${arrowAngle})`}
          filter={`url(#${glowId})`}
          className="guide-arrowhead"
        >
          <g className="guide-arrowhead-reveal">
            <path
              d="M 0 0 L -24 -12 L -16 0 L -24 12 Z"
              fill={`url(#${gradientId}-arrow)`}
            />
          </g>
        </g>

        <circle
          cx={endPoint.x}
          cy={endPoint.y}
          r="18"
          fill="none"
          stroke={accent}
          strokeWidth="3"
          className="guide-callout-pulse"
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
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          animation: guideStartDot 6.8s ease-in-out infinite;
        }

        .guide-reveal-mask {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: guideRevealMask 6.8s steps(20, end) infinite;
        }

        .guide-callout-glow {
          stroke-dasharray: 3.2 4.8;
          opacity: 0;
          animation: guideSegmentGlow 6.8s ease-in-out infinite;
        }

        .guide-callout-line {
          stroke-dasharray: 3.2 4.8;
          stroke-dashoffset: 0;
          opacity: 0;
          animation: guideSegmentLine 6.8s linear infinite;
        }

        .guide-arrowhead {
          opacity: 0;
          animation: guideArrowOpacity 6.8s ease-in-out infinite;
        }

        .guide-arrowhead-reveal {
          transform-box: fill-box;
          transform-origin: right center;
          transform: scaleX(0);
          animation: guideArrowGrow 6.8s ease-in-out infinite;
        }

        .guide-callout-pulse {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          animation: guidePulse 6.8s ease-out infinite;
        }

        .guide-callout-label {
          opacity: 0;
          animation: guideLabelReveal 6.8s ease-in-out infinite;
        }

        @keyframes guideStartDot {
          0% { opacity: 0; transform: scale(.45); }
          6% { opacity: 1; transform: scale(1.08); }
          14% { opacity: .9; transform: scale(.82); }
          90% { opacity: .75; transform: scale(.82); }
          100% { opacity: 0; transform: scale(.45); }
        }

        @keyframes guideRevealMask {
          0%, 18% { stroke-dashoffset: 100; }
          68%, 90% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -14; }
        }

        @keyframes guideSegmentGlow {
          0%, 18% { opacity: 0; }
          24%, 90% { opacity: .5; }
          100% { opacity: 0; }
        }

        @keyframes guideSegmentLine {
          0%, 18% { opacity: 0; stroke-dashoffset: 0; }
          23% { opacity: 1; }
          68%, 90% { opacity: 1; stroke-dashoffset: -6; }
          100% { opacity: 0; stroke-dashoffset: -18; }
        }

        @keyframes guideArrowOpacity {
          0%, 69% { opacity: 0; }
          77%, 90% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes guideArrowGrow {
          0%, 69% { transform: scaleX(0); }
          79%, 90% { transform: scaleX(1); }
          100% { transform: scaleX(1); }
        }

        @keyframes guidePulse {
          0%, 79% { opacity: 0; transform: scale(.55); }
          85% { opacity: .95; transform: scale(.7); }
          95% { opacity: .16; transform: scale(1.7); }
          100% { opacity: 0; transform: scale(1.95); }
        }

        @keyframes guideLabelReveal {
          0% { opacity: 0; transform: translateY(8px) scale(.98); }
          7%, 90% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-4px) scale(.98); }
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
