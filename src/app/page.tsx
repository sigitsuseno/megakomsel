import { Header } from "@/components/site/Header";
import { HeroSection } from "@/components/site/HeroSection";
import { MarketplaceMarquee } from "@/components/site/MarketplaceMarquee";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { CtaBand } from "@/components/site/CtaBand";
import { AboutSection } from "@/components/site/AboutSection";
import { Counters } from "@/components/site/Counters";
import { ContactSection } from "@/components/site/ContactSection";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";
import { COMPANY, type CompanySetting } from "@/lib/site";
import { getSettingJson, SETTING_KEYS } from "@/lib/settings";

export default async function HomePage() {
  const company = await getSettingJson<CompanySetting>(SETTING_KEYS.company, COMPANY);
  return (
    <>
      <Header />
      <main id="main-content" className="flex-grow">
        <HeroSection />
        <MarketplaceMarquee />
        <ServicesGrid />
        <CtaBand />
        <AboutSection />
        <Counters />
        <ContactSection company={company} />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
