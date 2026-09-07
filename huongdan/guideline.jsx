import React from "react";

const dashSegments = [
  "M 92 305 C 106 288, 122 273, 140 262",
  "M 170 246 C 190 235, 212 234, 233 225",
  "M 264 206 C 281 190, 292 169, 310 153",
  "M 342 132 C 366 116, 394 118, 419 132",
  "M 449 149 C 468 163, 489 176, 512 181",
  "M 542 187 C 562 190, 582 187, 600 178",
];

function GuideArrowOnly({ label = "Liên hệ ngay" }) {
  const start = { x: 92, y: 305 };
  const arrowBase = { x: 607, y: 176 };
  const pulsePoint = { x: 672, y: 168 };

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        viewBox="0 0 900 460"
        className="h-full w-full overflow-visible"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="guideGradient" x1="80" y1="305" x2="690" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="42%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>

          <linearGradient id="arrowGradient" x1="0" y1="0" x2="76" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>

          <filter id="guideGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.8" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0.9  0 1 0 0 0.25  0 0 1 0 0.7  0 0 0 .75 0"
              result="coloredBlur"
            />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <clipPath id="arrowRevealClip">
            <rect className="arrow-clip" x="0" y="-34" width="0" height="68" />
          </clipPath>
        </defs>

        <foreignObject x="48" y="324" width="190" height="64" className="guide-label">
          <div className="inline-flex rounded-full border border-pink-200/40 bg-slate-950/75 px-4 py-2 text-sm font-black text-white shadow-2xl backdrop-blur-md">
            {label}
          </div>
        </foreignObject>

        {/* Start dot */}
        <g className="step-dot" filter="url(#guideGlow)">
          <circle cx={start.x} cy={start.y} r="15" fill="rgba(251,113,133,.12)" />
          <circle cx={start.x} cy={start.y} r="8" fill="#fb7185" />
          <circle cx={start.x} cy={start.y} r="3.5" fill="white" opacity="0.85" />
        </g>

        {/* Soft guide shadow under every dash */}
        {dashSegments.map((d, index) => (
          <path
            key={`shadow-${index}`}
            d={d}
            pathLength="1"
            fill="none"
            stroke="rgba(251,113,133,.22)"
            strokeWidth="15"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="step-dash-shadow"
            style={{ animationDelay: `${0.42 + index * 0.34}s` }}
          />
        ))}

        {/* Short premium dash capsules */}
        {dashSegments.map((d, index) => (
          <path
            key={index}
            d={d}
            pathLength="1"
            fill="none"
            stroke="url(#guideGradient)"
            strokeWidth="7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#guideGlow)"
            className="step-dash"
            style={{ animationDelay: `${0.42 + index * 0.34}s` }}
          />
        ))}

        {/* Elegant arrow: fixed at last dash, revealed from base to tip */}
        <g transform={`translate(${arrowBase.x} ${arrowBase.y}) rotate(-9)`}>
          <g clipPath="url(#arrowRevealClip)" filter="url(#guideGlow)">
            <path
              d="M 0 -24 L 74 0 L 0 24 L 17 0 Z"
              fill="url(#arrowGradient)"
              className="step-arrow-shape"
            />
            <path
              d="M 10 -12 L 50 0 L 10 12 L 19 0 Z"
              fill="rgba(255,255,255,.28)"
              className="step-arrow-shape"
            />
          </g>
        </g>

        <circle
          cx={pulsePoint.x}
          cy={pulsePoint.y}
          r="21"
          fill="none"
          stroke="#fb7185"
          strokeWidth="3"
          className="target-pulse"
        />
      </svg>

      <style>{`
        .step-dot {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          animation: dotPop 6.4s ease-in-out infinite;
        }

        .step-dash,
        .step-dash-shadow {
          opacity: 0;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          transform-box: fill-box;
          transform-origin: center;
          animation-name: dashAppear;
          animation-duration: 6.4s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .step-arrow-shape {
          opacity: 0;
          animation: arrowFade 6.4s ease-in-out infinite;
        }

        .arrow-clip {
          animation: arrowClipReveal 6.4s ease-in-out infinite;
        }

        .target-pulse {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          animation: pulseTarget 6.4s ease-in-out infinite;
        }

        .guide-label {
          opacity: 0;
          transform: translateY(8px) scale(.96);
          animation: labelAppear 6.4s ease-in-out infinite;
        }

        @keyframes dotPop {
          0% { opacity: 0; transform: scale(.2); }
          6% { opacity: 1; transform: scale(1.24); }
          10%, 90% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(.85); }
        }

        @keyframes dashAppear {
          0%, 8% { opacity: 0; stroke-dashoffset: 1; transform: scale(.96); }
          14% { opacity: 1; stroke-dashoffset: 0; transform: scale(1.02); }
          20%, 90% { opacity: 1; stroke-dashoffset: 0; transform: scale(1); }
          100% { opacity: 0; stroke-dashoffset: 0; transform: scale(1); }
        }

        @keyframes arrowFade {
          0%, 54% { opacity: 0; }
          58%, 94% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes arrowClipReveal {
          0%, 54% { width: 0px; }
          60% { width: 26px; }
          66% { width: 52px; }
          72%, 100% { width: 86px; }
        }

        @keyframes pulseTarget {
          0%, 70% { opacity: 0; transform: scale(.7); }
          78% { opacity: .68; transform: scale(1); }
          88% { opacity: .12; transform: scale(1.55); }
          100% { opacity: 0; transform: scale(1.05); }
        }

        @keyframes labelAppear {
          0%, 62% { opacity: 0; transform: translateY(8px) scale(.96); }
          72%, 94% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(4px) scale(.98); }
        }

        @media (prefers-reduced-motion: reduce) {
          .step-dot,
          .step-dash,
          .step-dash-shadow,
          .step-arrow-shape,
          .arrow-clip,
          .target-pulse,
          .guide-label {
            animation: none !important;
            opacity: 1 !important;
            stroke-dashoffset: 0 !important;
          }

          .arrow-clip {
            width: 86px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function Demo() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(236,72,153,.16),transparent_30%),radial-gradient(circle_at_70%_72%,rgba(34,211,238,.12),transparent_34%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:48px_48px]" />

      <button className="absolute right-[13%] top-[38%] z-10 rounded-full border border-pink-300/60 bg-pink-300/10 px-8 py-4 font-black text-pink-100 shadow-[0_0_35px_rgba(249,168,212,.2)] transition hover:scale-105 hover:bg-pink-300/20">
        Contact me
      </button>

      <GuideArrowOnly />
    </main>
  );
}
