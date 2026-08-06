import Image from "next/image";
import { MARKETPLACES, type MarketplaceItem } from "@/lib/site";
import { getSettingJson, SETTING_KEYS } from "@/lib/settings";

function MarketplaceCard({
  name,
  url,
  color,
  image,
}: {
  name: string;
  url: string;
  color: string;
  image?: string;
}) {
  const src = image?.trim()
    ? image
    : `https://placehold.co/200x200/${color}/FFFFFF?text=${encodeURIComponent(name)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener"
      className="flex flex-col items-center justify-between p-4 rounded-2xl border border-line bg-card hover:scale-105 transition-all shadow-sm w-36 sm:w-44 aspect-[2/3] shrink-0 text-center group"
      aria-label={`Buka ${name}`}
    >
      <div className="w-full h-3/4 flex items-center justify-center p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 group-hover:bg-primary/10 transition-colors">
        <Image
          src={src}
          alt={name}
          width={200}
          height={200}
          unoptimized
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <span className="font-semibold text-xs sm:text-sm text-ink line-clamp-2 my-auto">
        {name}
      </span>
    </a>
  );
}

export async function MarketplaceMarquee() {
  const marketplaces = await getSettingJson<MarketplaceItem[]>(
    SETTING_KEYS.marketplaces,
    MARKETPLACES
  );
  const items = [...marketplaces, ...marketplaces];
  if (!items.length) return null;
  return (
    <section
      id="marketplace"
      className="py-12 border-y border-line bg-card/50 overflow-hidden"
      aria-label="Tersedia di Marketplace Resmi"
    >
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <p className="text-xs uppercase tracking-widest font-bold text-ink/60">
          Tersedia di Marketplace Resmi &amp; Platform Pengadaan
        </p>
      </div>
      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee flex items-center gap-4 sm:gap-6 px-4">
          {items.map((item, i) => (
            <MarketplaceCard key={`${item.name}-${i}`} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
