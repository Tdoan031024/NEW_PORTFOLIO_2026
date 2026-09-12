"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { playLaserSound, playExplosionSound, playArcadeStartSound } from "@/utils/audioEffects";

type Bug = {
  x: number;
  y: number;
  size: number;
  speed: number;
  hp: number;
  maxHp: number;
  type: "bug404" | "nullPointer" | "memoryLeak" | "mergeConflict";
  icon: string;
  name: string;
  color: string;
};

type Bullet = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
};

export default function CyberGameModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [wave, setWave] = useState(1);
  const [gameState, setGameState] = useState<"ready" | "playing" | "gameover" | "victory">("ready");

  const stateRef = useRef({
    gameState: "ready" as "ready" | "playing" | "gameover" | "victory",
    score: 0,
    lives: 3,
    wave: 1,
    playerX: 250,
    playerY: 420,
    playerWidth: 42,
    playerHeight: 28,
    isMovingLeft: false,
    isMovingRight: false,
    isShooting: false,
    lastShotTime: 0,
    bugs: [] as Bug[],
    bullets: [] as Bullet[],
    particles: [] as Particle[],
    nextSpawnTime: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cyber_bug_hunter_highscore");
      if (saved) setHighScore(parseInt(saved, 10) || 0);
    }
  }, []);

  const startGame = useCallback(() => {
    stateRef.current.gameState = "playing";
    stateRef.current.score = 0;
    stateRef.current.lives = 3;
    stateRef.current.wave = 1;
    stateRef.current.bugs = [];
    stateRef.current.bullets = [];
    stateRef.current.particles = [];
    stateRef.current.playerX = 250;
    stateRef.current.lastShotTime = 0;
    stateRef.current.nextSpawnTime = performance.now() + 600;

    setScore(0);
    setLives(3);
    setWave(1);
    setGameState("playing");
    playArcadeStartSound();
  }, []);

  // Handle keyboard & touch inputs
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        stateRef.current.isMovingLeft = true;
      }
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        stateRef.current.isMovingRight = true;
      }
      if (e.key === " " || e.key === "ArrowUp" || e.key.toLowerCase() === "w") {
        e.preventDefault();
        stateRef.current.isShooting = true;
        if (stateRef.current.gameState === "ready" || stateRef.current.gameState === "gameover") {
          startGame();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        stateRef.current.isMovingLeft = false;
      }
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        stateRef.current.isMovingRight = false;
      }
      if (e.key === " " || e.key === "ArrowUp" || e.key.toLowerCase() === "w") {
        stateRef.current.isShooting = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isOpen, onClose, startGame]);

  // Main game loop inside canvas
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let lastTime = performance.now();

    const spawnBug = (currentTime: number) => {
      const bugTypes: Bug["type"][] = ["bug404", "nullPointer", "memoryLeak", "mergeConflict"];
      const chosenType = bugTypes[Math.floor(Math.random() * bugTypes.length)];

      let speed = 1.2 + Math.random() * 1.2 + stateRef.current.wave * 0.25;
      let hp = 1;
      let icon = "🐞";
      let name = "404 Error";
      let color = "#ef4444";

      if (chosenType === "nullPointer") {
        icon = "🐛";
        name = "Null Pointer";
        color = "#f97316";
        speed *= 1.15;
      } else if (chosenType === "memoryLeak") {
        icon = "⚠️";
        name = "Memory Leak";
        color = "#eab308";
        hp = 3;
        speed *= 0.8;
      } else if (chosenType === "mergeConflict") {
        icon = "⚡";
        name = "Merge Conflict";
        color = "#a855f7";
        speed *= 1.35;
      }

      stateRef.current.bugs.push({
        x: 35 + Math.random() * (canvas.width - 70),
        y: -30,
        size: 32,
        speed,
        hp,
        maxHp: hp,
        type: chosenType,
        icon,
        name,
        color,
      });

      const nextInterval = Math.max(500, 1500 - stateRef.current.wave * 120 + Math.random() * 400);
      stateRef.current.nextSpawnTime = currentTime + nextInterval;
    };

    const spawnExplosion = (x: number, y: number, color: string, count = 16) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 3.5;
        stateRef.current.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 0.4 + Math.random() * 0.4,
          color,
          size: 2 + Math.random() * 3,
        });
      }
    };

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const state = stateRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Starfield Grid
      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Neon grid lines
      ctx.strokeStyle = "rgba(34, 211, 238, 0.08)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = (time * 0.04) % 30; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      if (state.gameState === "playing") {
        // Player Movement
        const moveSpeed = 320 * dt;
        if (state.isMovingLeft) state.playerX = Math.max(25, state.playerX - moveSpeed);
        if (state.isMovingRight) state.playerX = Math.min(canvas.width - 25, state.playerX + moveSpeed);

        // Auto or Key Fire
        if (state.isShooting && time - state.lastShotTime > 160) {
          state.lastShotTime = time;
          state.bullets.push({
            x: state.playerX,
            y: state.playerY - 14,
            vx: 0,
            vy: -480,
            color: "#38bdf8",
          });
          playLaserSound();
        }

        // Spawn bugs
        if (time >= state.nextSpawnTime) {
          spawnBug(time);
        }

        // Update Bullets
        for (let i = state.bullets.length - 1; i >= 0; i--) {
          const b = state.bullets[i];
          b.y += b.vy * dt;
          if (b.y < -20) {
            state.bullets.splice(i, 1);
            continue;
          }

          // Check hit bug
          for (let j = state.bugs.length - 1; j >= 0; j--) {
            const bug = state.bugs[j];
            const dist = Math.hypot(b.x - bug.x, b.y - bug.y);
            if (dist < bug.size * 0.7) {
              bug.hp--;
              spawnExplosion(b.x, b.y, "#38bdf8", 6);
              state.bullets.splice(i, 1);

              if (bug.hp <= 0) {
                spawnExplosion(bug.x, bug.y, bug.color, 24);
                playExplosionSound();
                state.bugs.splice(j, 1);
                const addScore = bug.type === "memoryLeak" ? 300 : 100;
                state.score += addScore;
                setScore(state.score);

                // Update Wave
                if (state.score >= state.wave * 1200) {
                  state.wave++;
                  setWave(state.wave);
                }

                // High score update
                if (state.score > highScore) {
                  setHighScore(state.score);
                  localStorage.setItem("cyber_bug_hunter_highscore", state.score.toString());
                }
              }
              break;
            }
          }
        }

        // Update Bugs
        for (let i = state.bugs.length - 1; i >= 0; i--) {
          const bug = state.bugs[i];
          bug.y += bug.speed * 60 * dt;

          // Check hit player or reach bottom
          if (bug.y >= state.playerY - 10 && Math.abs(bug.x - state.playerX) < 28) {
            spawnExplosion(bug.x, bug.y, "#ef4444", 20);
            playExplosionSound();
            state.bugs.splice(i, 1);
            state.lives--;
            setLives(state.lives);

            if (state.lives <= 0) {
              state.gameState = "gameover";
              setGameState("gameover");
            }
            continue;
          }

          if (bug.y > canvas.height + 30) {
            state.bugs.splice(i, 1);
            state.lives--;
            setLives(state.lives);
            if (state.lives <= 0) {
              state.gameState = "gameover";
              setGameState("gameover");
            }
          }
        }
      }

      // Update & Draw Particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= dt / p.maxLife;
        if (p.life <= 0) {
          state.particles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Draw Bullets
      ctx.shadowBlur = 10;
      for (const b of state.bullets) {
        ctx.shadowColor = b.color;
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x - 2.5, b.y - 8, 5, 16);
      }
      ctx.shadowBlur = 0;

      // Draw Bugs
      for (const bug of state.bugs) {
        ctx.save();
        ctx.translate(bug.x, bug.y);

        // Bug Glow
        ctx.shadowColor = bug.color;
        ctx.shadowBlur = 12;

        // Emoji / Icon
        ctx.font = "26px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(bug.icon, 0, 0);

        // HP bar if > 1
        if (bug.maxHp > 1) {
          ctx.shadowBlur = 0;
          ctx.fillStyle = "rgba(255,255,255,0.2)";
          ctx.fillRect(-16, -20, 32, 4);
          ctx.fillStyle = bug.color;
          ctx.fillRect(-16, -20, 32 * (bug.hp / bug.maxHp), 4);
        }

        ctx.restore();
      }

      // Draw Player Ship
      const px = state.playerX;
      const py = state.playerY;

      ctx.save();
      ctx.translate(px, py);
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 14;

      // Ship body
      ctx.fillStyle = "#0284c7";
      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.lineTo(18, 12);
      ctx.lineTo(8, 8);
      ctx.lineTo(0, 14);
      ctx.lineTo(-8, 8);
      ctx.lineTo(-18, 12);
      ctx.closePath();
      ctx.fill();

      // Cockpit
      ctx.fillStyle = "#e0f2fe";
      ctx.beginPath();
      ctx.arc(0, -2, 5, 0, Math.PI * 2);
      ctx.fill();

      // Thruster Flame
      ctx.fillStyle = Math.random() > 0.5 ? "#f97316" : "#fbbf24";
      ctx.beginPath();
      ctx.moveTo(-5, 13);
      ctx.lineTo(0, 24 + Math.random() * 6);
      ctx.lineTo(5, 13);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // Scanline CRT effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 1.5);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isOpen, highScore]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4">
      <div className="relative flex flex-col w-full max-w-[560px] overflow-hidden rounded-[26px] border border-cyan-400/30 bg-[#060e1d] shadow-[0_0_80px_rgba(34,211,238,0.25)] text-white font-mono">
        {/* Arcade Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#0a172e] px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-red-400/80 animate-pulse" />
            <h3 className="text-sm font-black tracking-wider text-cyan-300 uppercase">
              🕹️ Cyber Bug Hunter 2026
            </h3>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-amber-300 font-bold">Kỷ lục: {highScore}</span>
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-lg bg-white/10 px-2.5 py-1 text-xs text-white/70 hover:bg-white/20 hover:text-white transition"
            >
              ✕ Đóng (ESC)
            </button>
          </div>
        </div>

        {/* HUD Info Bar */}
        <div className="flex items-center justify-between border-b border-white/5 bg-[#040a16] px-5 py-2.5 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-white/50">MẠNG:</span>
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className={`text-sm ${i < lives ? "opacity-100 scale-100" : "opacity-25 grayscale"}`}>
                ❤️
              </span>
            ))}
          </div>
          <div>
            <span className="text-white/50">WAVE: </span>
            <span className="font-bold text-cyan-400">{wave}</span>
          </div>
          <div>
            <span className="text-white/50">ĐIỂM: </span>
            <span className="font-bold text-emerald-400 text-sm">{score}</span>
          </div>
        </div>

        {/* Canvas Game Stage */}
        <div className="relative h-[440px] w-full bg-[#030712] overflow-hidden">
          <canvas
            ref={canvasRef}
            width={520}
            height={440}
            className="h-full w-full block cursor-crosshair touch-none"
            onPointerMove={(e) => {
              if (gameState !== "playing") return;
              const rect = e.currentTarget.getBoundingClientRect();
              const scaleX = 520 / rect.width;
              stateRef.current.playerX = (e.clientX - rect.left) * scaleX;
            }}
            onPointerDown={() => {
              stateRef.current.isShooting = true;
              if (gameState === "ready" || gameState === "gameover") {
                startGame();
              }
            }}
            onPointerUp={() => {
              stateRef.current.isShooting = false;
            }}
          />

          {/* Ready Overlay */}
          {gameState === "ready" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/65 backdrop-blur-sm p-6 text-center">
              <div className="rounded-2xl border border-cyan-400/40 bg-[#07152b]/95 p-6 shadow-2xl max-w-[380px]">
                <div className="text-4xl mb-2">🚀</div>
                <h4 className="text-lg font-black text-cyan-300">CYBER BUG HUNTER</h4>
                <p className="mt-2 text-xs leading-relaxed text-white/70 font-sans">
                  Tiêu diệt các loại Bug (404, NullPointer, Memory Leak) trước khi chúng xâm nhập hệ thống!
                </p>
                <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-2.5 text-[11px] text-white/60 space-y-1">
                  <div>• <b>Phím Mũi tên / A-D:</b> Di chuyển</div>
                  <div>• <b>Phím Space / Click:</b> Bắn Laser Code</div>
                  <div>• Có thể vuốt / kéo chuột để điều khiển</div>
                </div>
                <button
                  type="button"
                  onClick={startGame}
                  className="mt-5 w-full cursor-pointer rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(6,182,212,0.5)] transition hover:brightness-110 active:scale-95"
                >
                  BẮT ĐẦU CHƠI NGAY 🎮
                </button>
              </div>
            </div>
          )}

          {/* Game Over Overlay */}
          {gameState === "gameover" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 backdrop-blur-sm p-6 text-center">
              <div className="rounded-2xl border border-red-500/40 bg-[#1a070a]/95 p-6 shadow-2xl max-w-[380px]">
                <div className="text-4xl mb-2">💥</div>
                <h4 className="text-xl font-black text-red-400">SYSTEM CRASHED!</h4>
                <p className="mt-2 text-xs text-white/70 font-sans">
                  Quá nhiều bug chưa kịp fix! Bạn đã trụ được đến <b>Wave {wave}</b>.
                </p>
                <div className="my-4 rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                  <span className="block text-xs text-white/50">ĐIỂM ĐẠT ĐƯỢC</span>
                  <span className="text-2xl font-black text-emerald-400">{score}</span>
                </div>
                <button
                  type="button"
                  onClick={startGame}
                  className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(16,185,129,0.4)] transition hover:brightness-110 active:scale-95"
                >
                  CHƠI LẠI (TRY AGAIN) ↺
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Control Pad */}
        <div className="flex sm:hidden items-center justify-between border-t border-white/10 bg-[#071326] p-3">
          <div className="flex gap-2">
            <button
              type="button"
              onPointerDown={() => { stateRef.current.isMovingLeft = true; }}
              onPointerUp={() => { stateRef.current.isMovingLeft = false; }}
              className="h-12 w-12 rounded-xl bg-white/10 text-xl font-bold flex items-center justify-center active:bg-cyan-400/30"
            >
              ◀
            </button>
            <button
              type="button"
              onPointerDown={() => { stateRef.current.isMovingRight = true; }}
              onPointerUp={() => { stateRef.current.isMovingRight = false; }}
              className="h-12 w-12 rounded-xl bg-white/10 text-xl font-bold flex items-center justify-center active:bg-cyan-400/30"
            >
              ▶
            </button>
          </div>
          <button
            type="button"
            onPointerDown={() => { stateRef.current.isShooting = true; }}
            onPointerUp={() => { stateRef.current.isShooting = false; }}
            className="h-12 px-6 rounded-xl bg-cyan-500 font-bold text-sm text-white flex items-center justify-center active:scale-95"
          >
            BẮN LASER ⚡
          </button>
        </div>
      </div>
    </div>
  );
}
