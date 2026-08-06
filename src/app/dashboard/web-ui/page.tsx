import { prisma } from "@/lib/prisma";
import {
  HERO_SLIDES,
  MARKETPLACES,
  MILESTONES,
  type HeroSlide,
  type MarketplaceItem,
} from "@/lib/site";
import { getSettingJson, SETTING_KEYS, type AboutSetting } from "@/lib/settings";
import { WebUiPanel } from "@/components/dashboard/WebUiPanel";

export const dynamic = "force-dynamic";

const ABOUT_DEFAULT: AboutSetting = {
  headline: "Pengalaman Lebih dari 15 Tahun Membangun Infrastruktur Digital",
  description:
    "Kami memberikan Solusi IT untuk Perusahaan dan Perseorangan dengan pengalaman lebih dari 15 tahun. Komitmen kami adalah menyediakan perangkat keras berkualitas, sistem jaringan tangguh, dan purna jual yang sigap.",
  milestones: MILESTONES,
};

export default async function WebUiPage() {
  const [marketplaces, about, hero, messages] = await Promise.all([
    getSettingJson<MarketplaceItem[]>(SETTING_KEYS.marketplaces, MARKETPLACES),
    getSettingJson<AboutSetting>(SETTING_KEYS.about, ABOUT_DEFAULT),
    getSettingJson<HeroSlide[]>(SETTING_KEYS.hero, HERO_SLIDES),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-ink">WEB UI</h1>
        <p className="text-sm text-ink/60">
          Kelola konten yang tampil di halaman situs publik.
        </p>
      </div>

      <WebUiPanel
        marketplaces={marketplaces}
        about={about}
        hero={hero}
        messages={messages}
      />
    </div>
  );
}
