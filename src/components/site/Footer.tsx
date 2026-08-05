import Link from "next/link";
import { COMPANY, MARKETPLACES } from "@/lib/site";

const FOOTER_SERVICES = [
  "Service Laptop & PC",
  "Upgrade Hardware",
  "Instalasi LAN & WAN",
  "Maintenance 7 Hari",
  "Pasang IP CCTV",
  "Web Development",
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-line pt-16 pb-8 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary text-white font-bold flex items-center justify-center">
                M
              </div>
              <span className="font-heading font-bold text-xl text-ink">MEGAKOMSEL</span>
            </div>
            <p className="text-ink/70 leading-relaxed text-xs">
              {COMPANY.name} — Penyedia Solusi Perangkat IT, Jaringan, &amp; Pengadaan Instansi
              Terpercaya dengan pengalaman 15+ tahun.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={COMPANY.wa1Url}
                target="_blank"
                rel="noopener"
                aria-label="WhatsApp Utama"
                className="p-2 rounded-lg border border-line hover:border-secondary text-ink transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.242-1.111z" />
                </svg>
              </a>
              <a
                href={COMPANY.wa2Url}
                target="_blank"
                rel="noopener"
                aria-label="WhatsApp Cadangan"
                className="p-2 rounded-lg border border-line hover:border-secondary text-ink transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.242-1.111z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-ink mb-4">Layanan Utama</h4>
            <ul className="space-y-2.5 text-ink/75">
              {FOOTER_SERVICES.map((s) => (
                <li key={s}>
                  <Link href="#layanan" className="hover:text-secondary transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-ink mb-4">Official Marketplace</h4>
            <ul className="space-y-2.5 text-ink/75">
              {MARKETPLACES.map((m) => (
                <li key={m.name}>
                  <a
                    href={m.url}
                    target="_blank"
                    rel="noopener"
                    className="hover:text-secondary transition-colors"
                  >
                    {m.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-ink mb-4">Jam Operasional &amp; Kontak</h4>
            <ul className="space-y-3 text-ink/75 text-xs">
              <li>
                <span className="font-bold text-ink">WA 1:</span> {COMPANY.wa1}
              </li>
              <li>
                <span className="font-bold text-ink">WA 2:</span> {COMPANY.wa2}
              </li>
              {COMPANY.hours.map((h) => (
                <li key={h.label}>
                  <span className="font-bold text-ink">{h.label}:</span> {h.value}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link
                href="/login"
                className="text-xs font-semibold text-primary dark:text-secondary hover:underline"
              >
                Login / Dashboard →
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-line pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink/60">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-secondary">Privacy Policy</Link>
            <Link href="#" className="hover:text-secondary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
