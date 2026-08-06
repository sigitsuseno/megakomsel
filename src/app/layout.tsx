import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/store/CartProvider";
import { COMPANY, type CompanySetting } from "@/lib/site";
import { getSettingJson, SETTING_KEYS } from "@/lib/settings";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

// Anti-FOUC: pasang class tema sebelum first paint (sinkron saat parse HTML)
const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.classList.toggle('dark',t==='dark');}catch(e){}})();`;

const SITE_DOMAIN = "https://www.megakomsel.com";

export async function generateMetadata(): Promise<Metadata> {
  const company = await getSettingJson<CompanySetting>(SETTING_KEYS.company, COMPANY);
  const brand = company.brand || "Megakomsel";
  const title = `${brand} — Solusi Perangkat IT, CCTV & Jaringan`;
  return {
    title: {
      default: title,
      template: `%s | ${brand}`,
    },
    description: `${company.name} — Solusi perangkat IT, service laptop/PC, CCTV, jaringan, pengadaan instansi, dan web development terpercaya sejak 2009.`,
    metadataBase: new URL(SITE_DOMAIN),
    openGraph: {
      title,
      description: `${company.name} — Solusi perangkat IT, service laptop/PC, CCTV, jaringan, dan pengadaan instansi terpercaya.`,
      type: "website",
      locale: "id_ID",
    },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-surface text-ink">
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
