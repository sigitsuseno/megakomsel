"use client";

import { cn } from "@/lib/utils";
import { sanitizeSvg } from "@/lib/sanitize";
import type { HeroAnimPreset, HeroSlide } from "@/lib/site";

/* ---------- Nama preset untuk dropdown di dashboard ---------- */
export const ANIM_LABELS: Record<HeroAnimPreset, string> = {
  waves: "Gelombang",
  orbits: "Orbit",
  terminal: "Terminal",
  mesh: "Mesh Gradient",
  grid: "Grid Pulsa",
};

/* ---------- Visual preset: Gelombang ---------- */
function WavePath({ color, opacity, d }: { color: string; opacity: number; d: string }) {
  return (
    <svg
      className="block w-1/2 h-full"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path fill={color} opacity={opacity} d={d} />
    </svg>
  );
}

function WavesVisual() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-700 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_25%_30%,rgba(24,191,255,0.5),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(255,255,255,0.2),transparent_45%)]" />
      <div className="absolute bottom-[-15%] left-0 w-[200%] h-[65%] animate-mega-wave">
        <WavePath color="#18BFFF" opacity={0.5} d="M0,192 C240,128 480,64 720,96 C960,128 1200,224 1440,192 L1440,320 L0,320 Z" />
        <WavePath color="#18BFFF" opacity={0.5} d="M0,192 C240,128 480,64 720,96 C960,128 1200,224 1440,192 L1440,320 L0,320 Z" />
      </div>
      <div
        className="absolute bottom-[-15%] left-0 w-[200%] h-[55%] animate-mega-wave"
        style={{ animationDirection: "reverse", animationDuration: "20s" }}
      >
        <WavePath color="#0F67B5" opacity={0.7} d="M0,224 C240,160 480,320 720,256 C960,192 1200,128 1440,192 L1440,320 L0,320 Z" />
        <WavePath color="#0F67B5" opacity={0.7} d="M0,224 C240,160 480,320 720,256 C960,192 1200,128 1440,192 L1440,320 L0,320 Z" />
      </div>
    </div>
  );
}

/* ---------- Visual preset: Orbit ---------- */
function OrbitsVisual() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0F67B5_0%,#0B4F8A_60%,#08406F_100%)] flex items-center justify-center overflow-hidden">
      <div className="relative w-56 h-56 sm:w-72 sm:h-72">
        <div className="absolute inset-0 rounded-full bg-secondary/20 blur-2xl animate-mega-pulse" />
        <div className="absolute inset-6 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center shadow-[0_0_40px_rgba(24,191,255,0.6)]">
          <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="absolute inset-0 animate-mega-spin">
          <div className="absolute inset-4 rounded-full border border-secondary/40" />
          <span className="absolute top-1 left-1/2 w-3 h-3 -translate-x-1/2 rounded-full bg-secondary shadow-[0_0_12px_rgba(24,191,255,0.9)]" />
        </div>
        <div
          className="absolute inset-0 animate-mega-spin"
          style={{ animationDirection: "reverse", animationDuration: "22s" }}
        >
          <div className="absolute inset-10 rounded-full border border-white/25" />
          <span className="absolute bottom-3 left-1/2 w-2 h-2 -translate-x-1/2 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}

/* ---------- Visual preset: Terminal ---------- */
function TerminalVisual() {
  return (
    <div className="absolute inset-0 bg-slate-900 dark:bg-slate-950 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-950/80 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-800 bg-slate-900/80">
          <span className="w-3 h-3 rounded-full bg-danger/80" />
          <span className="w-3 h-3 rounded-full bg-warning/80" />
          <span className="w-3 h-3 rounded-full bg-success/80" />
          <span className="ml-2 text-[10px] font-mono text-slate-500">admin@megakomsel:~$</span>
        </div>
        <div className="px-4 py-4 font-mono text-[11px] sm:text-xs leading-relaxed space-y-1.5">
          <p>
            <span className="text-success">✓</span> <span className="text-slate-300">Sistem IT terhubung</span>
          </p>
          <p>
            <span className="text-secondary">→</span> <span className="text-slate-300">Memindai jaringan...</span>
          </p>
          <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-secondary animate-mega-grow" />
          </div>
          <p className="text-slate-400">100% aman. 0 ancaman ditemukan.</p>
          <p className="text-slate-300">
            $ <span className="inline-block w-2 h-4 bg-secondary align-middle animate-mega-blink" />
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Visual preset: Mesh Gradient ---------- */
function MeshVisual() {
  return (
    <div className="absolute inset-0 bg-slate-950 overflow-hidden">
      <div className="absolute -top-1/4 -left-1/4 w-2/3 h-2/3 rounded-full bg-primary blur-3xl opacity-70 animate-mega-blob" />
      <div
        className="absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 rounded-full bg-secondary blur-3xl opacity-60 animate-mega-blob"
        style={{ animationDelay: "1s", animationDuration: "11s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded-full bg-primary-700 blur-3xl opacity-50 animate-mega-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,6,23,0.8)_100%)]" />
    </div>
  );
}

/* ---------- Visual preset: Grid Pulsa ---------- */
function GridVisual() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-primary-700 flex items-center justify-center overflow-hidden">
      <div className="grid grid-cols-4 gap-2 sm:gap-3 p-4">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/5 border border-white/10 animate-mega-pulse"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Renderer media slide ---------- */
const PRESETS: Record<HeroAnimPreset, () => React.ReactNode> = {
  waves: WavesVisual,
  orbits: OrbitsVisual,
  terminal: TerminalVisual,
  mesh: MeshVisual,
  grid: GridVisual,
};

function EmptyMedia() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-surface dark:bg-slate-950">
      <span className="text-xs text-ink/40 px-4 text-center">
        Belum ada media untuk slide ini
      </span>
    </div>
  );
}

export function HeroMediaVisual({
  slide,
  className,
}: {
  slide: HeroSlide;
  className?: string;
}) {
  if (slide.mediaType === "image") {
    if (!slide.image.trim()) return <EmptyMedia />;
    return (
      <div className={cn("absolute inset-0", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slide.image}
          alt={slide.title || "Slide hero"}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  if (slide.mediaType === "svg") {
    if (!slide.svg.trim()) return <EmptyMedia />;
    return (
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-surface dark:bg-slate-950 [&_svg]:w-full [&_svg]:h-full",
          className
        )}
        dangerouslySetInnerHTML={{ __html: sanitizeSvg(slide.svg) }}
      />
    );
  }

  const Preset = PRESETS[slide.anim] ?? PRESETS.waves;
  return <Preset />;
}
