import { Header } from "@/components/site/Header";
import { HeroSlider } from "@/components/site/HeroSlider";
import { MarketplaceMarquee } from "@/components/site/MarketplaceMarquee";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { CtaBand } from "@/components/site/CtaBand";
import { AboutSection } from "@/components/site/AboutSection";
import { Counters } from "@/components/site/Counters";
import { ContactSection } from "@/components/site/ContactSection";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-grow">
        <HeroSlider />
        <MarketplaceMarquee />
        <ServicesGrid />
        <CtaBand />
        <AboutSection />
        <Counters />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
