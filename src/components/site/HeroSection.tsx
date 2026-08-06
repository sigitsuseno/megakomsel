import { HERO_SLIDES, type HeroSlide } from "@/lib/site";
import { getSettingJson, SETTING_KEYS } from "@/lib/settings";
import { HeroSlider } from "@/components/site/HeroSlider";

export async function HeroSection() {
  const slides = await getSettingJson<HeroSlide[]>(SETTING_KEYS.hero, HERO_SLIDES);
  return <HeroSlider slides={slides} />;
}
