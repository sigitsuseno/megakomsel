"use client";

import { cn } from "@/lib/utils";
import { sanitizeSvg } from "@/lib/sanitize";
import { HeroAnimVisual } from "@/components/site/HeroMedia";
import type { HeroAnimPreset } from "@/lib/site";

export type AboutMediaData = {
  mediaType: "image" | "svg" | "anim";
  image: string;
  svg: string;
  anim: HeroAnimPreset;
};

function EmptyMedia() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-surface dark:bg-slate-950">
      <span className="text-xs text-ink/40 px-4 text-center">
        Belum ada media untuk section About
      </span>
    </div>
  );
}

/** Visual kolom gambar di section Tentang Kami (gambar / SVG / animasi preset). */
export function AboutMedia({
  media,
  className,
}: {
  media: AboutMediaData;
  className?: string;
}) {
  if (media.mediaType === "image") {
    if (!media.image.trim()) return <EmptyMedia />;
    return (
      <div className={cn("absolute inset-0", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.image}
          alt="Visual Megakomsel"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  if (media.mediaType === "svg") {
    if (!media.svg.trim()) return <EmptyMedia />;
    return (
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-surface dark:bg-slate-950 [&_svg]:w-full [&_svg]:h-full",
          className
        )}
        dangerouslySetInnerHTML={{ __html: sanitizeSvg(media.svg) }}
      />
    );
  }

  return <HeroAnimVisual anim={media.anim} />;
}
