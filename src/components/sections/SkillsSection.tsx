"use client";

import {
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type TouchEvent as ReactTouchEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  siApachekafka,
  siCloudflare,
  siDocker,
  siDotnet,
  siExpress,
  siGin,
  siGit,
  siGithubactions,
  siGo,
  siJenkins,
  siLaravel,
  siMongodb,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siOpenapiinitiative,
  siPostgresql,
  siPrisma,
  siReact,
  siRedis,
  siSequelize,
  siSwagger,
  siTailwindcss,
  siTypescript,
} from "simple-icons/icons";

type OrbitName = "orbit1" | "orbit2" | "orbit3" | "orbit4" | "orbit5";

type TechNode = {
  name: string;
  icon: string;
  x: number;
  y: number;
  size: number;
  orbit: OrbitName;
};

type GroupConfig = {
  id: string;
  number: string;
  label: string;
  color: string;
  color2: string;
  labelPos: { x: number; y: number };
  connectorEnd: { x: number; y: number };
  nodes: TechNode[];
};

type NodePosition = {
  x: number;
  y: number;
};

type NodePositionMap = Record<string, NodePosition>;
type GroupLabelPositionMap = Record<string, NodePosition>;

type DragState = {
  key: string; // node key or group id (for label drag)
  groupId: string;
  kind: "node" | "label";
  offsetX: number;
  offsetY: number;
};

const PROFILE = {
  name: "Tuyen Doan",
  subtitle: "Full Stack Developer",
  avatar: "/assets/anhdoanprofile.png",
};

const GROUPS: GroupConfig[] = [
  {
    id: "frontend",
    number: "01",
    label: "FRONTEND",
    color: "#35eaff",
    color2: "#9b4dff",
    labelPos: { x: 50.3, y: 1.0 },
    connectorEnd: { x: 49.4, y: 16 },
    nodes: [
      { name: "Next.js", icon: "next", x: 37.9, y: 13.4, size: 68, orbit: "orbit1" },
      { name: "React", icon: "react", x: 43.6, y: 11.9, size: 68, orbit: "orbit1" },
      { name: "TypeScript", icon: "typescript", x: 49.7, y: 10.8, size: 68, orbit: "orbit1" },
      { name: "Tailwind CSS", icon: "tailwind", x: 56.2, y: 11.9, size: 68, orbit: "orbit1" },
      { name: "React Native", icon: "react", x: 62.8, y: 13.0, size: 68, orbit: "orbit1" },
    ],
  },
  {
    id: "backend",
    number: "02",
    label: "BACKEND",
    color: "#ff4ecd",
    color2: "#ff3d86",
    labelPos: { x: 99.0, y: 32.3 },
    connectorEnd: { x: 82, y: 38 },
    nodes: [
      { name: "Go", icon: "go", x: 75.4, y: 23.0, size: 68, orbit: "orbit2" },
      { name: "Gin", icon: "gin", x: 80.5, y: 26.4, size: 68, orbit: "orbit2" },
      { name: "Node.js", icon: "node", x: 85.6, y: 31.5, size: 68, orbit: "orbit2" },
      { name: "Express.js", icon: "express", x: 89.9, y: 36.8, size: 68, orbit: "orbit2" },
      { name: "NestJS", icon: "nestjs", x: 93.2, y: 44.4, size: 68, orbit: "orbit2" },
      { name: "Laravel", icon: "laravel", x: 92.4, y: 55.8, size: 68, orbit: "orbit2" },
      { name: "ASP.NET MVC", icon: "dotnet", x: 88.5, y: 63.8, size: 68, orbit: "orbit2" },
    ],
  },
  {
    id: "database",
    number: "03",
    label: "DATABASE",
    color: "#22ffd1",
    color2: "#65ff8f",
    labelPos: { x: 75.0, y: 91.2 },
    connectorEnd: { x: 68.5, y: 75.5 },
    nodes: [
      { name: "PostgreSQL", icon: "postgresql", x: 78.8, y: 68.7, size: 68, orbit: "orbit3" },
      { name: "MySQL", icon: "mysql", x: 73.9, y: 71.9, size: 68, orbit: "orbit3" },
      { name: "SQL Server", icon: "sqlserver", x: 68.7, y: 75.5, size: 68, orbit: "orbit3" },
      { name: "MongoDB", icon: "mongodb", x: 63.1, y: 76.9, size: 68, orbit: "orbit3" },
      { name: "Redis", icon: "redis", x: 57.4, y: 78.0, size: 68, orbit: "orbit3" },
    ],
  },
  {
    id: "devops",
    number: "04",
    label: "DEVOPS / CLOUD",
    color: "#3aa2ff",
    color2: "#35eaff",
    labelPos: { x: 15.8, y: 85.9 },
    connectorEnd: { x: 29, y: 67 },
    nodes: [
      { name: "Docker", icon: "docker", x: 41.7, y: 73.3, size: 68, orbit: "orbit4" },
      { name: "Docker Compose", icon: "dockercompose", x: 36.0, y: 72.3, size: 68, orbit: "orbit4" },
      { name: "GitHub Actions", icon: "actions", x: 30.3, y: 70.4, size: 68, orbit: "orbit4" },
      { name: "Cloudflare", icon: "cloudflare", x: 24.4, y: 66.5, size: 68, orbit: "orbit4" },
      { name: "OCI", icon: "oci", x: 19.0, y: 61.6, size: 68, orbit: "orbit4" },
    ],
  },
  {
    id: "tools",
    number: "05",
    label: "TOOLS / SYSTEMS",
    color: "#ffd35c",
    color2: "#ff9b33",
    labelPos: { x: 10.5, y: 18.8 },
    connectorEnd: { x: 22.0, y: 52.0 },
    nodes: [
      { name: "Git", icon: "git", x: 38.6, y: 31.6, size: 68, orbit: "orbit5" },
      { name: "REST API", icon: "api", x: 27.3, y: 38.4, size: 68, orbit: "orbit5" },
      { name: "OpenAPI / Swagger", icon: "swagger", x: 33.0, y: 33.6, size: 68, orbit: "orbit5" },
      { name: "Kafka", icon: "kafka", x: 46.6, y: 45.0, size: 68, orbit: "orbit5" },
      { name: "GORM", icon: "gorm", x: 22.0, y: 46.3, size: 68, orbit: "orbit5" },
    ],
  },
];

function getNodeKey(groupId: string, nodeName: string) {
  return `${groupId}:${nodeName}`;
}

function getInitialNodePositions() {
  return GROUPS.reduce<NodePositionMap>((positions, group) => {
    for (const node of group.nodes) {
      positions[getNodeKey(group.id, node.name)] = { x: node.x, y: node.y };
    }

    return positions;
  }, {});
}

function getInitialGroupLabelPositions() {
  return GROUPS.reduce<GroupLabelPositionMap>((positions, group) => {
    positions[group.id] = { x: group.labelPos.x, y: group.labelPos.y };
    return positions;
  }, {});
}

function clampPercent(value: number) {
  return Math.max(0, Math.min(100, value));
}

function toSvgPoint(point: { x: number; y: number }) {
  return { x: point.x * 16, y: point.y * 9 };
}

function getConnectorPath(group: GroupConfig) {
  const center = { x: 800, y: 450 };
  const end = toSvgPoint(group.connectorEnd);
  const offsetY = group.id === "frontend" ? -28 : group.id === "database" ? 34 : 0;
  const mid = {
    x: center.x + (end.x - center.x) * 0.55,
    y: center.y + (end.y - center.y) * 0.55 + offsetY,
  };

  return `M ${center.x} ${center.y} Q ${mid.x} ${mid.y} ${end.x} ${end.y}`;
}

const TECH_BRAND: Record<string, { path: string; color: string }> = {
  next: { path: siNextdotjs.path, color: "#FFFFFF" },
  react: { path: siReact.path, color: `#${siReact.hex}` },
  typescript: { path: siTypescript.path, color: `#${siTypescript.hex}` },
  tailwind: { path: siTailwindcss.path, color: `#${siTailwindcss.hex}` },
  go: { path: siGo.path, color: `#${siGo.hex}` },
  gin: { path: siGin.path, color: `#${siGin.hex}` },
  node: { path: siNodedotjs.path, color: `#${siNodedotjs.hex}` },
  express: { path: siExpress.path, color: "#FFFFFF" },
  nestjs: { path: siNestjs.path, color: `#${siNestjs.hex}` },
  laravel: { path: siLaravel.path, color: `#${siLaravel.hex}` },
  dotnet: { path: siDotnet.path, color: `#${siDotnet.hex}` },
  postgresql: { path: siPostgresql.path, color: `#${siPostgresql.hex}` },
  mysql: { path: siMysql.path, color: `#${siMysql.hex}` },
  mongodb: { path: siMongodb.path, color: `#${siMongodb.hex}` },
  redis: { path: siRedis.path, color: `#${siRedis.hex}` },
  docker: { path: siDocker.path, color: `#${siDocker.hex}` },
  dockercompose: { path: siDocker.path, color: "#2496ED" },
  actions: { path: siGithubactions.path, color: `#${siGithubactions.hex}` },
  cicd: { path: siJenkins.path, color: `#${siJenkins.hex}` },
  cloudflare: { path: siCloudflare.path, color: `#${siCloudflare.hex}` },
  oci: { path: "", color: "#F80000" },
  git: { path: siGit.path, color: `#${siGit.hex}` },
  api: { path: siOpenapiinitiative.path, color: `#${siOpenapiinitiative.hex}` },
  swagger: { path: siSwagger.path, color: `#${siSwagger.hex}` },
  kafka: { path: siApachekafka.path, color: "#FFFFFF" },
  gorm: { path: "", color: "#00ADD8" },
  pgx: { path: "", color: "#4169E1" },
  prisma: { path: siPrisma.path, color: "#FFFFFF" },
  sequelize: { path: siSequelize.path, color: `#${siSequelize.hex}` },
};

function Icon({ type }: { type: string }): ReactNode {
  if (type === "sqlserver") {
    return (
      <img
        src="/assets/logos/microsoft-sql-server.svg"
        alt="Microsoft SQL Server"
        draggable={false}
      />
    );
  }

  if (type === "oci") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M12 4.5C6.75 4.5 2.5 7.86 2.5 12s4.25 7.5 9.5 7.5 9.5-3.36 9.5-7.5-4.25-7.5-9.5-7.5zm0 11.5c-3.04 0-5.5-1.79-5.5-4s2.46-4 5.5-4 5.5 1.79 5.5 4-2.46 4-5.5 4z" />
      </svg>
    );
  }

  if (type === "dockercompose") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <rect x="2.5" y="3.5" width="8.5" height="7.5" rx="1.5" />
        <rect x="13" y="3.5" width="8.5" height="7.5" rx="1.5" />
        <rect x="7.75" y="13" width="8.5" height="7.5" rx="1.5" />
      </svg>
    );
  }

  if (type === "gorm") {
    return (
      <span className="node-letter-small" style={{ fontWeight: 850, letterSpacing: "-0.04em", color: "#00ADD8" }}>
        GORM
      </span>
    );
  }

  if (type === "pgx") {
    return (
      <span className="node-letter" style={{ fontWeight: 850, letterSpacing: "-0.03em", color: "#4169E1" }}>
        pgx
      </span>
    );
  }

  const brand = TECH_BRAND[type];

  if (!brand) {
    return <span className="node-letter">?</span>;
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d={brand.path} />
    </svg>
  );
}

const galaxyStyles = `
.tech-galaxy { position: relative; z-index: 6; width: 100%; min-height: 85vh; overflow: visible; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; background: transparent; isolation: auto; }
.tech-galaxy.is-paused *, .tech-galaxy.is-reduced * { animation-play-state: paused !important; }
.tech-galaxy.is-paused .star-layer { display: none; }
.tech-galaxy.is-reduced .star-layer, .tech-galaxy.is-reduced .connect-layer:not(.hub-connectors) { display: none; }
.tech-galaxy::before, .tech-galaxy::after { content: none; }
@keyframes starDrift { from { transform: translate3d(0,0,0); } to { transform: translate3d(-110px,80px,0); } }
@keyframes nebulaPulse { from { opacity: .55; transform: scale(1); } to { opacity: .95; transform: scale(1.03); } }
.corner-scan { display: none; }
@keyframes scan { 0% { transform: translateY(-140px); } 100% { transform: translateY(calc(100vh + 140px)); } }
.galaxy-frame { position: relative; width: min(100vw, 1500px); aspect-ratio: 16 / 9; min-height: 590px; margin-top: 16px; transform-origin: center; user-select: none; contain: layout style; overflow: visible; }
.galaxy-frame::before, .galaxy-frame::after { content: none; }
.hud-vignette { display: none; }
.orbit-layer, .connect-layer, .node-layer, .label-layer, .core-layer, .star-layer { position: absolute; inset: 0; }
.orbit-layer { z-index: 2; filter: drop-shadow(0 0 4px rgba(79,207,255,.28)); }
.connect-layer { z-index: 4; opacity: .9; }
.star-layer { z-index: 5; pointer-events: none; }
.node-layer { z-index: 10; }
.label-layer { z-index: 14; pointer-events: none; overflow: visible; }
.core-layer { z-index: 12; pointer-events: none; }
.layer-svg { width: 100%; height: 100%; display: block; }
.orbit-path { fill: none; stroke-width: 1.4; stroke-linecap: round; stroke-dasharray: 7 9; opacity: .75; animation: dashMove 24s linear infinite; }
.orbit-path.faint { stroke-width: .9; opacity: .28; stroke-dasharray: 2 12; animation: none; }
.orbit-path-five { stroke-width: 1.15; opacity: .62; stroke-dasharray: 5 10; }
@keyframes dashMove { to { stroke-dashoffset: -320; } }
.connector { fill: none; stroke-width: 1.2; stroke-dasharray: 4 9; opacity: .68; animation: ledFlow 5.5s linear infinite; filter: drop-shadow(0 0 6px currentColor); }
@keyframes ledFlow { to { stroke-dashoffset: -90; } }
.led-dot { filter: drop-shadow(0 0 9px currentColor); animation: dotPulse 2.6s ease-in-out infinite alternate; }
@keyframes dotPulse { from { opacity: .55; } to { opacity: 1; } }
.hub-connectors { display: none; }
.star { position: absolute; border-radius: 50%; opacity: .78; box-shadow: 0 0 8px currentColor; animation: twinkle linear infinite; }
@keyframes twinkle { 0%,100% { transform: scale(.8); opacity:.45; } 50% { transform: scale(1.25); opacity:1; } }
.tech-node { position: absolute; left: var(--x); top: var(--y); width: var(--size); height: var(--size); transform: translate(-50%, -50%) scale(.66); opacity: 0; display: grid; place-items: center; cursor: grab; touch-action: pan-y; user-select: none; animation: nodeIntro .62s cubic-bezier(.18,.89,.32,1.28) forwards; animation-delay: var(--delay); transition: transform .22s ease, opacity .22s ease, filter .22s ease; border: none; background: none; padding: 0; contain: layout style; will-change: transform, filter; }
@keyframes nodeIntro { to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
.tech-galaxy.has-active-group .tech-node:not(.is-highlighted) { opacity: .38; filter: brightness(.62) saturate(.58); }
.tech-node:hover, .tech-node.is-highlighted { transform: translate(-50%, -50%) scale(1.1); z-index: 80; filter: brightness(1.1) saturate(1.06) drop-shadow(0 0 10px var(--color)) drop-shadow(0 0 22px color-mix(in srgb, var(--color) 58%, transparent)); }
.tech-node.is-dragging { cursor: grabbing; transform: translate(-50%, -50%) scale(1.14); z-index: 70; }
.node-shell { position: absolute; inset: 0; border-radius: 50%; background: radial-gradient(circle at 50% 45%, rgba(255,255,255,.11), transparent 34%), linear-gradient(135deg, rgba(255,255,255,.12), rgba(255,255,255,.02)); border: 1px solid rgba(255,255,255,.18); box-shadow: 0 0 8px var(--color), 0 0 18px color-mix(in srgb, var(--color) 70%, transparent), inset 0 0 16px rgba(255,255,255,.08); clip-path: polygon(50% 0%, 88% 14%, 100% 50%, 86% 88%, 50% 100%, 13% 87%, 0% 50%, 14% 13%); }
@keyframes nodeBreath { from { filter: brightness(.94); } to { filter: brightness(1.18); } }
.node-shell::before, .node-shell::after { content: ""; position: absolute; inset: 6px; border-radius: inherit; clip-path: inherit; pointer-events: none; }
.node-shell::before { border: 1px dashed rgba(255,255,255,.28); opacity:.72; }
.node-shell::after { inset: -6px; background: conic-gradient(from 0deg, transparent 0 18%, var(--color) 22%, transparent 28% 56%, var(--color2) 62%, transparent 70% 100%); opacity:.18; filter: blur(5px); }
.tech-node.is-highlighted .node-shell { background: radial-gradient(circle at 50% 42%, rgba(255,255,255,.22), rgba(255,255,255,.08) 32%, transparent 58%), linear-gradient(135deg, color-mix(in srgb, var(--color) 22%, rgba(255,255,255,.12)), rgba(255,255,255,.04)); border-color: color-mix(in srgb, var(--color) 58%, white); box-shadow: 0 0 12px var(--color), 0 0 28px color-mix(in srgb, var(--color) 62%, transparent), 0 0 42px color-mix(in srgb, var(--color2) 44%, transparent), inset 0 0 18px rgba(255,255,255,.14); animation: selectedNodePulse 1.7s ease-in-out infinite alternate; }
.tech-node.is-highlighted .node-shell::before { border-color: rgba(255,255,255,.46); opacity: .88; }
.tech-node.is-highlighted .node-shell::after { inset: -9px; opacity: .34; filter: blur(7px); animation: rotateRing 4s linear infinite; }
@keyframes selectedNodePulse { from { filter: brightness(1.02); } to { filter: brightness(1.12); } }
@keyframes rotateRing { to { transform: rotate(360deg); } }
.node-icon { position: relative; width: 44%; height: 44%; display: grid; place-items: center; color: var(--color); filter: drop-shadow(0 0 6px var(--color)); z-index: 2; }
.node-icon svg { width: 100%; height: 100%; }
.node-icon img { width: 100%; height: 100%; object-fit: contain; }
.node-letter { font-weight: 850; font-size: clamp(17px, 1.5vw, 26px); line-height: 1; letter-spacing: 0; }
.node-letter-small { font-size: clamp(12px, 1vw, 17px); letter-spacing: 0; line-height: .95; }
.node-name { position: absolute; left: 50%; top: calc(100% + 7px); transform: translateX(-50%); min-width: 92px; text-align: center; font-size: clamp(9px, .66vw, 12px); font-weight: 700; color: rgba(241,251,255,.88); text-shadow: 0 0 8px rgba(255,255,255,.35), 0 0 14px var(--color); pointer-events: none; }
.tech-node.is-highlighted .node-icon { transform: scale(1.04); filter: drop-shadow(0 0 7px currentColor) drop-shadow(0 0 16px var(--color)); }
.tech-node:hover .node-name, .tech-node.is-highlighted .node-name { color: white; text-shadow: 0 0 6px rgba(255,255,255,.85), 0 0 14px var(--color), 0 0 24px var(--color2); }
.group-label { position: absolute; left: var(--x); top: var(--y); transform: translate(-50%, -50%); display: inline-flex; align-items: center; gap: 10px; min-height: 34px; padding: 5px 14px 5px 6px; border: 1px solid rgba(255,255,255,.18); border-radius: 999px; background: linear-gradient(180deg, rgba(15,18,48,.75), rgba(5,8,24,.48)); box-shadow: 0 0 14px var(--color), inset 0 0 14px rgba(255,255,255,.035); backdrop-filter: blur(10px); pointer-events: auto; cursor: pointer; user-select: none; touch-action: pan-y; transition: transform .24s ease, box-shadow .24s ease; }
.group-label .number { width: 24px; height: 24px; display: grid; place-items: center; border-radius: 50%; color: var(--color); border: 1px solid rgba(255,255,255,.24); font-size: 12px; font-weight: 900; text-shadow: 0 0 12px var(--color); background: rgba(255,255,255,.04); }
.group-label .label-text { color: #eef7ff; font-size: clamp(10px, .72vw, 13px); font-weight: 850; letter-spacing: .08em; text-shadow: 0 0 10px var(--color); white-space: nowrap; }
.group-label:hover, .group-label.active { transform: translate(-50%, -50%) scale(1.06); box-shadow: 0 0 16px var(--color), 0 0 38px var(--color); }
.core { position: absolute; left: 50%; top: 50%; width: 166px; transform: translate(-50%, -48%); display: grid; justify-items: center; text-align: center; }
.avatar-wrap { position: relative; width: 132px; height: 132px; border-radius: 50%; display: grid; place-items: center; background: radial-gradient(circle, rgba(26,240,255,.22), transparent 68%); filter: drop-shadow(0 0 16px rgba(46,221,255,.58)); }
@keyframes corePulse { from { filter: drop-shadow(0 0 15px rgba(46,221,255,.55)); } to { filter: drop-shadow(0 0 23px rgba(255,60,214,.8)); } }
.avatar-wrap::before { content:""; position:absolute; inset:-9px; border-radius:50%; background: conic-gradient(from 210deg, #35eaff, #3688ff, #9b4dff, #ff4ecd, #35eaff); box-shadow: 0 0 20px rgba(56,232,255,.52), 0 0 30px rgba(255,70,214,.35); }
.avatar-wrap::after { content:""; position:absolute; inset:-21px; border-radius:50%; border:1px dashed rgba(103,222,255,.34); box-shadow: 0 0 20px rgba(123,77,255,.22); }
.avatar { position: relative; z-index: 2; width: 118px; height: 118px; border-radius: 50%; object-fit: cover; object-position: center; border: 2px solid rgba(255,255,255,.22); background: linear-gradient(145deg, #122659, #0a0d19 58%, #351044); }
.core h2 { margin: 16px 0 0; font-size: 19px; line-height: 1.1; font-weight: 850; letter-spacing: 0; color: #f5fbff; text-shadow: 0 0 10px rgba(255,255,255,.3), 0 0 20px rgba(65,230,255,.42); }
.core p { margin: 5px 0 0; font-size: 11px; color: rgba(232,246,255,.72); font-weight: 600; }
.core-badge { margin-top: 14px; padding: 6px 16px; border-radius: 999px; border: 1px solid rgba(83,162,255,.42); background: linear-gradient(90deg, rgba(26,89,255,.18), rgba(154,69,255,.16)); color: #86bfff; font-size: 10px; font-weight: 800; letter-spacing: .05em; box-shadow: 0 0 14px rgba(48,133,255,.3), inset 0 0 12px rgba(255,255,255,.04); }
.position-recorder { width: min(1000px, calc(100vw - 32px)); margin: 32px auto 64px; border: 1px solid rgba(53,234,255,.3); border-radius: 16px; background: rgba(5,10,24,.9); box-shadow: 0 18px 44px rgba(0,0,0,.55), 0 0 30px rgba(53,234,255,.12); backdrop-filter: blur(16px); padding: 20px; color: rgba(238,247,255,.92); position: relative; z-index: 50; }
.position-recorder-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px; flex-wrap: wrap; }
.position-recorder-title { font-size: 13px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #35eaff; display: flex; align-items: center; gap: 8px; text-shadow: 0 0 10px rgba(53,234,255,.4); }
.position-actions { display: flex; align-items: center; gap: 10px; }
.position-copy-btn { border: 1px solid rgba(53,234,255,.6); border-radius: 999px; padding: 7px 18px; font-size: 12px; font-weight: 800; color: #030712; background: #35eaff; cursor: pointer; transition: all .2s; box-shadow: 0 0 14px rgba(53,234,255,.35); }
.position-copy-btn:hover { background: #6df2ff; box-shadow: 0 0 20px rgba(53,234,255,.6); transform: scale(1.02); }
.position-copy-btn.copied { background: #22ffd1; color: #022c22; border-color: #22ffd1; box-shadow: 0 0 20px rgba(34,255,209,.6); }
.position-reset { border: 1px solid rgba(255,255,255,.2); border-radius: 999px; padding: 7px 16px; font-size: 12px; font-weight: 700; color: rgba(238,247,255,.85); background: rgba(255,255,255,.06); cursor: pointer; transition: all .2s; }
.position-reset:hover { background: rgba(255,255,255,.14); color: #fff; }
.position-output { width: 100%; height: 280px; resize: vertical; border: 1px solid rgba(255,255,255,.14); border-radius: 12px; background: rgba(2,6,18,.8); padding: 12px 14px; font-family: var(--font-mono), ui-monospace, SFMono-Regular, Consolas, monospace; font-size: 11.5px; line-height: 1.55; color: #38e8ff; outline: none; }
.position-output:focus { border-color: #35eaff; box-shadow: 0 0 14px rgba(53,234,255,.25); }
.position-hint { margin-top: 12px; font-size: 12px; line-height: 1.6; color: rgba(238,247,255,.7); }
.mobile-hint { display: none; position: absolute; left: 50%; bottom: 18px; transform: translateX(-50%); color: rgba(221,244,255,.68); font-size: 12px; z-index: 40; }
.skills-heading { position: relative; z-index: 120; text-align: center; pointer-events: none; width: 100%; padding: 48px 16px 12px; }
.skills-heading h2 { margin: 0; font-size: clamp(1.1rem, 2.2vw, 1.9rem); font-weight: 700; letter-spacing: 0; color: rgba(236, 247, 255, 0.96); text-shadow: 0 0 16px rgba(53, 234, 255, 0.28); }
@media (max-width: 1100px) { .galaxy-frame { width: 1120px; transform: scale(.8); } .tech-galaxy { min-height: 700px; } }
@media (max-width: 760px) {
  .tech-galaxy { min-height: 640px; padding-top: 0; overflow-x: clip; overflow-y: visible; }
  .skills-heading { padding: 36px 16px 8px; }
  .galaxy-frame { width: 980px; min-height: 600px; margin-top: 4px; transform: scale(min(0.58, calc((100vw - 20px) / 980))); transform-origin: top center; }
  .position-recorder { margin-top: 24px; }
  .mobile-hint { display: block; bottom: 8px; }
}
@media (max-width: 480px) {
  .tech-galaxy { min-height: 520px; }
  .galaxy-frame { transform: scale(calc((100vw - 12px) / 980)); }
}
`;

export default function SkillsSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [lowPowerDevice] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      (((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4) ||
      (navigator.hardwareConcurrency ?? 8) <= 4
    );
  });
  const [isSectionVisible, setIsSectionVisible] = useState(true);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [draggingNodeKey, setDraggingNodeKey] = useState<string | null>(null);
  const [draggingGroupId, setDraggingGroupId] = useState<string | null>(null);
  const [nodePositions, setNodePositions] = useState<NodePositionMap>(() => getInitialNodePositions());
  const [groupLabelPositions, setGroupLabelPositions] = useState<GroupLabelPositionMap>(
    () => getInitialGroupLabelPositions(),
  );

  const frameRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const draggingRef = useRef<DragState | null>(null);
  const dragFrameRef = useRef(0);
  const pendingDragPointRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setPrefersReducedMotion(motionQuery.matches);
    };
    motionQuery.addEventListener("change", apply);
    return () => motionQuery.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSectionVisible(entry.isIntersecting),
      { rootMargin: "160px 0px", threshold: 0.01 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: prefersReducedMotion ? 8 : lowPowerDevice ? 14 : 22 }, (_, i) => ({
        id: i,
        left: (i * 37.7) % 100,
        top: (i * 61.3) % 100,
        size: 1 + ((i * 1.7) % 2.4),
        color: i % 3 === 0 ? "#ffffff" : i % 3 === 1 ? "#55e7ff" : "#bf7fff",
        delay: `${(i * 0.13) % 4}s`,
        duration: `${3 + ((i * 0.19) % 4)}s`,
      })),
    [lowPowerDevice, prefersReducedMotion],
  );

  const movingDots = useMemo(
    () =>
      prefersReducedMotion
        ? []
        : lowPowerDevice
          ? []
          : [
              { id: "p2", rx: 690, ry: 305, color: "#22ffd1", dur: "24s", begin: "-5s" },
              { id: "p4", rx: 545, ry: 215, color: "#ffd35c", dur: "21s", begin: "-3s" },
            ],
    [lowPowerDevice, prefersReducedMotion],
  );

  const editableGroups = useMemo(
    () =>
      GROUPS.map((group) => ({
        ...group,
        labelPos: groupLabelPositions[group.id] ?? group.labelPos,
        nodes: group.nodes.map((node) => ({
          ...node,
          ...(nodePositions[getNodeKey(group.id, node.name)] ?? {}),
        })),
      })),
    [nodePositions, groupLabelPositions],
  );

  const highlightedGroup = activeGroup ?? selectedGroup;

  const getPointerPercent = (clientX: number, clientY: number) => {
    const frame = frameRef.current;
    if (!frame) return null;

    const rect = frame.getBoundingClientRect();
    const x = clampPercent(((clientX - rect.left) / rect.width) * 100);
    const y = clampPercent(((clientY - rect.top) / rect.height) * 100);

    return { x, y };
  };

  const updateNodePosition = (
    key: string,
    clientX: number,
    clientY: number,
    offsetX = 0,
    offsetY = 0,
  ) => {
    const pointer = getPointerPercent(clientX, clientY);
    if (!pointer) return;

    const x = clampPercent(pointer.x - offsetX);
    const y = clampPercent(pointer.y - offsetY);

    setNodePositions((current) => ({
      ...current,
      [key]: {
        x: Number(x.toFixed(1)),
        y: Number(y.toFixed(1)),
      },
    }));
  };

  const updateGroupLabelPosition = (
    groupId: string,
    clientX: number,
    clientY: number,
    offsetX = 0,
    offsetY = 0,
  ) => {
    const pointer = getPointerPercent(clientX, clientY);
    if (!pointer) return;

    const x = clampPercent(pointer.x - offsetX);
    const y = clampPercent(pointer.y - offsetY);

    setGroupLabelPositions((current) => ({
      ...current,
      [groupId]: {
        x: Number(x.toFixed(1)),
        y: Number(y.toFixed(1)),
      },
    }));
  };

  const startNodeDrag = (key: string, groupId: string, clientX: number, clientY: number) => {
    setActiveGroup(groupId);

    const pointer = getPointerPercent(clientX, clientY);
    const currentPosition = nodePositions[key];
    if (!pointer || !currentPosition) return;

    draggingRef.current = {
      key,
      groupId,
      kind: "node",
      offsetX: pointer.x - currentPosition.x,
      offsetY: pointer.y - currentPosition.y,
    };
    setDraggingNodeKey(key);
  };

  const startGroupLabelDrag = (groupId: string, clientX: number, clientY: number) => {
    setActiveGroup(groupId);

    const pointer = getPointerPercent(clientX, clientY);
    const currentPosition = groupLabelPositions[groupId];
    if (!pointer || !currentPosition) return;

    draggingRef.current = {
      key: groupId,
      groupId,
      kind: "label",
      offsetX: pointer.x - currentPosition.x,
      offsetY: pointer.y - currentPosition.y,
    };
    setDraggingGroupId(groupId);
  };

  const handleNodeMouseDown = (
    key: string,
    groupId: string,
    event: ReactMouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    startNodeDrag(key, groupId, event.clientX, event.clientY);
  };

  const handleNodeTouchStart = (
    key: string,
    groupId: string,
    event: ReactTouchEvent<HTMLButtonElement>,
  ) => {
    setActiveGroup(groupId);
    setSelectedGroup(groupId);
    const touch = event.touches[0];
    if (touch) {
      startNodeDrag(key, groupId, touch.clientX, touch.clientY);
    }
  };

  const handleGroupLabelMouseDown = (
    groupId: string,
    event: ReactMouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    startGroupLabelDrag(groupId, event.clientX, event.clientY);
  };

  const handleGroupLabelTouchStart = (
    groupId: string,
    event: ReactTouchEvent<HTMLButtonElement>,
  ) => {
    setActiveGroup(groupId);
    setSelectedGroup(groupId);
    const touch = event.touches[0];
    if (touch) {
      startGroupLabelDrag(groupId, touch.clientX, touch.clientY);
    }
  };

  useEffect(() => {
    const flushDragMove = () => {
      dragFrameRef.current = 0;
      const dragging = draggingRef.current;
      const point = pendingDragPointRef.current;
      pendingDragPointRef.current = null;
      if (!dragging || !point) return;

      if (dragging.kind === "node") {
        updateNodePosition(
          dragging.key,
          point.x,
          point.y,
          dragging.offsetX,
          dragging.offsetY,
        );
      } else {
        updateGroupLabelPosition(
          dragging.key,
          point.x,
          point.y,
          dragging.offsetX,
          dragging.offsetY,
        );
      }
    };

    const handleMove = (clientX: number, clientY: number) => {
      const dragging = draggingRef.current;
      if (!dragging) return;
      pendingDragPointRef.current = { x: clientX, y: clientY };
      if (!dragFrameRef.current) {
        dragFrameRef.current = window.requestAnimationFrame(flushDragMove);
      }
    };

    const stopDrag = () => {
      if (dragFrameRef.current) {
        window.cancelAnimationFrame(dragFrameRef.current);
        dragFrameRef.current = 0;
      }
      flushDragMove();
      draggingRef.current = null;
      pendingDragPointRef.current = null;
      setDraggingNodeKey(null);
      setDraggingGroupId(null);
      document.body.style.cursor = "";
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!draggingRef.current) return;
      event.preventDefault();
      document.body.style.cursor = "grabbing";
      handleMove(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!draggingRef.current) return;
      const touch = event.touches[0];
      if (!touch) return;
      event.preventDefault();
      handleMove(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", stopDrag);
    window.addEventListener("touchcancel", stopDrag);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", stopDrag);
      window.removeEventListener("touchcancel", stopDrag);
    };
  }, []);

  return (
    <>
      <style>{galaxyStyles}</style>
      <section
        ref={sectionRef}
        id="skills"
        className={`tech-galaxy ${isSectionVisible ? "" : "is-paused"} ${
          prefersReducedMotion || lowPowerDevice ? "is-reduced" : ""
        } ${highlightedGroup ? "has-active-group" : ""}`}
        aria-label="Tech Galaxy My Skills Section"
      >
        <div className="corner-scan" />
        <div className="skills-heading">
          <h2>Don’t Just List Skills — I Connect Systems.</h2>
        </div>
        <div ref={frameRef} className="galaxy-frame">
          <svg className="orbit-layer layer-svg" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="orbitFront" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#35eaff" stopOpacity=".1" />
                <stop offset=".3" stopColor="#9b4dff" stopOpacity=".85" />
                <stop offset=".64" stopColor="#35eaff" stopOpacity=".75" />
                <stop offset="1" stopColor="#ff4ecd" stopOpacity=".1" />
              </linearGradient>
              <linearGradient id="orbitBack" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#ffd35c" stopOpacity=".75" />
                <stop offset=".48" stopColor="#ff4ecd" stopOpacity=".55" />
                <stop offset="1" stopColor="#ff3d86" stopOpacity=".85" />
              </linearGradient>
              <linearGradient id="orbitData" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#35eaff" stopOpacity=".85" />
                <stop offset=".58" stopColor="#22ffd1" stopOpacity=".85" />
                <stop offset="1" stopColor="#65ff8f" stopOpacity=".75" />
              </linearGradient>
              <linearGradient id="orbitCloud" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#3688ff" stopOpacity=".85" />
                <stop offset=".65" stopColor="#35eaff" stopOpacity=".65" />
                <stop offset="1" stopColor="#9b4dff" stopOpacity=".2" />
              </linearGradient>
            </defs>
            <ellipse className="orbit-path" cx="800" cy="455" rx="760" ry="342" stroke="url(#orbitBack)" style={{ animationDuration: "38s" }} />
            <ellipse className="orbit-path" cx="800" cy="455" rx="690" ry="305" stroke="url(#orbitData)" style={{ animationDuration: "32s" }} />
            <ellipse className="orbit-path" cx="800" cy="455" rx="620" ry="260" stroke="url(#orbitFront)" />
            <ellipse className="orbit-path" cx="800" cy="455" rx="545" ry="215" stroke="url(#orbitCloud)" style={{ animationDuration: "29s" }} />
            <ellipse className="orbit-path orbit-path-five" cx="800" cy="455" rx="455" ry="178" stroke="#ffd35c" style={{ animationDuration: "27s" }} />
            <ellipse className="orbit-path faint" cx="800" cy="455" rx="365" ry="138" stroke="#a154ff" />
            <ellipse className="orbit-path faint" cx="800" cy="455" rx="285" ry="108" stroke="#35eaff" />
            <ellipse className="orbit-path faint" cx="800" cy="455" rx="220" ry="82" stroke="#ff4ecd" />
          </svg>

          <svg className="connect-layer layer-svg hub-connectors" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
            {editableGroups.map((group) => {
              const center = { x: 800, y: 450 };
              const end = toSvgPoint(group.connectorEnd);
              return (
                <g key={group.id} style={{ color: group.color }}>
                  <path className="connector" d={getConnectorPath(group)} stroke={group.color} />
                  {[0.45, 0.72, 1].map((t, i) => (
                    <circle
                      key={`${group.id}-${t}`}
                      className="led-dot"
                      cx={center.x + (end.x - center.x) * t}
                      cy={center.y + (end.y - center.y) * t}
                      r={i === 2 ? 5 : 3.5}
                      fill={group.color}
                    />
                  ))}
                </g>
              );
            })}
          </svg>

          <div className="star-layer" aria-hidden="true">
            {stars.map((star) => (
              <span
                key={star.id}
                className="star"
                style={{
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  color: star.color,
                  background: star.color,
                  animationDelay: star.delay,
                  animationDuration: star.duration,
                }}
              />
            ))}
          </div>

          {isSectionVisible && (
            <svg className="connect-layer layer-svg" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
              {movingDots.map((item) => (
                <g key={item.id}>
                  <path id={item.id} d={`M ${800 - item.rx} 455 a ${item.rx} ${item.ry} 0 1 0 ${item.rx * 2} 0 a ${item.rx} ${item.ry} 0 1 0 -${item.rx * 2} 0`} fill="none" stroke="transparent" />
                  <circle r="4" fill={item.color} style={{ filter: `drop-shadow(0 0 8px ${item.color})` }}>
                    <animateMotion dur={item.dur} begin={item.begin} repeatCount="indefinite">
                      <mpath href={`#${item.id}`} />
                    </animateMotion>
                  </circle>
                </g>
              ))}
            </svg>
          )}

          <div className="node-layer">
            {editableGroups.flatMap((group, groupIndex) =>
              group.nodes.map((node, nodeIndex) => {
                const key = getNodeKey(group.id, node.name);

                return (
                  <button
                    key={key}
                    type="button"
                    aria-label={node.name}
                    className={`tech-node ${highlightedGroup === group.id ? "is-highlighted" : ""} ${
                      draggingNodeKey === key ? "is-dragging" : ""
                    }`}
                    onMouseDown={(event) => handleNodeMouseDown(key, group.id, event)}
                    onTouchStart={(event) => handleNodeTouchStart(key, group.id, event)}
                    style={
                      {
                        "--x": `${node.x}%`,
                        "--y": `${node.y}%`,
                        "--size": `${node.size}px`,
                        "--color": group.color,
                        "--color2": group.color2,
                        "--delay": `${0.25 + groupIndex * 0.12 + nodeIndex * 0.06}s`,
                      } as CSSProperties
                    }
                  >
                    <span className="node-shell" />
                    <span
                      className="node-icon"
                      style={{ color: TECH_BRAND[node.icon]?.color ?? "#FFFFFF" }}
                    >
                      <Icon type={node.icon} />
                    </span>
                    <span className="node-name">{node.name}</span>
                  </button>
                );
              }),
            )}
          </div>

          <div className="label-layer">
            {editableGroups.map((group) => (
              <button
                key={group.id}
                type="button"
                className={`group-label ${highlightedGroup === group.id ? "active" : ""} ${
                  draggingGroupId === group.id ? "is-dragging" : ""
                }`}
                style={
                  {
                    "--x": `${group.labelPos.x}%`,
                    "--y": `${group.labelPos.y}%`,
                    "--color": group.color,
                  } as CSSProperties
                }
                onMouseDown={(event) => handleGroupLabelMouseDown(group.id, event)}
                onTouchStart={(event) => handleGroupLabelTouchStart(group.id, event)}
                onClick={() => setSelectedGroup((current) => (current === group.id ? null : group.id))}
                onMouseEnter={() => setActiveGroup(group.id)}
                onMouseLeave={() => setActiveGroup(null)}
                onFocus={() => setActiveGroup(group.id)}
                onBlur={() => setActiveGroup(null)}
              >
                <span className="number">{group.number}</span>
                <strong className="label-text">{group.label}</strong>
              </button>
            ))}
          </div>

          <div className="core-layer">
            <div className="core">
              <div className="avatar-wrap">
                <Image
                  className="avatar"
                  src={PROFILE.avatar}
                  alt={`${PROFILE.name} portrait`}
                  width={118}
                  height={118}
                  draggable={false}
                />
              </div>
              <h2>{PROFILE.name}</h2>
              <p>{PROFILE.subtitle}</p>
            </div>
          </div>

          <div className="hud-vignette" />
        </div>
        <div className="mobile-hint">Tech Galaxy - drag horizontally on small screens</div>
      </section>
    </>
  );
}
