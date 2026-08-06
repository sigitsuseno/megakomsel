import { StoreHeader } from "@/components/store/StoreHeader";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <StoreHeader />
      {children}
      <Footer />
      <BackToTop />
    </div>
  );
}
