import Link from "next/link";
import { COMPANY, MARKETPLACES, type CompanySetting } from "@/lib/site";
import { getSettingJson, SETTING_KEYS } from "@/lib/settings";

const FOOTER_SERVICES = [
  "Service Laptop & PC",
  "Upgrade Hardware",
  "Instalasi LAN & WAN",
  "Maintenance 7 Hari",
  "Pasang IP CCTV",
  "Web Development",
];

/** Ikon sosmed ringan berdasarkan nama label yang dipilih admin. */
function SocialIcon({ label }: { label: string }) {
  const l = label.toLowerCase();
  if (l.includes("instagram"))
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    );
  if (l.includes("facebook"))
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.6-1.6h1.7V3.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3V13h2.8v8h3.4z" />
      </svg>
    );
  if (l.includes("youtube"))
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23 7.5s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.4-1C16.6 4 12 4 12 4s-4.6 0-7.7.2c-.5.1-1.5.1-2.4 1-.7.7-.9 2.3-.9 2.3S.8 9.4.8 11.3v1.4c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.2 7.6.2s4.6 0 7.7-.2c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8v-1.4c0-1.9-.2-3.8-.2-3.8zM9.8 15.3V8.9l6.2 3.2-6.2 3.2z" />
      </svg>
    );
  if (l.includes("tiktok"))
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16.6 5.8c-.8-.9-1.4-2-1.6-3.3h-3.3v13.4c0 1.6-1.3 2.9-2.9 2.9s-2.9-1.3-2.9-2.9 1.3-2.9 2.9-2.9c.3 0 .6 0 .9.1V9.2c-3.1-.3-5.6 2.1-5.6 5.3 0 2.9 2.4 5.3 5.3 5.3s5.3-2.4 5.3-5.3V8.9c1.1.8 2.5 1.3 4 1.3V6.9c-.8 0-1.5-.3-2.1-.8-.7-.1-1.4-.2-2-.3z" />
      </svg>
    );
  if (l.includes("linkedin"))
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.1h.1c.5-1 1.8-2.1 3.7-2.1 4 0 4.7 2.6 4.7 6V23h-4v-8.2c0-2-.1-4.5-2.8-4.5-2.8 0-3.2 2.1-3.2 4.3V23H8V8z" />
      </svg>
    );
  if (l.includes("twitter") || l.includes("x.com") || l === "x")
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.7 3H21l-7.3 8.3L22.2 21h-6.7l-5.2-6.2L4.3 21H1l7.8-8.9L1.5 3h6.9l4.7 5.6L17.7 3zm-1.2 16h1.9L7.2 4.9H5.2L16.5 19z" />
      </svg>
    );
  // fallback ikon globe
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9s1.3-6.4 3.8-9z" />
    </svg>
  );
}

export async function Footer() {
  const company = await getSettingJson<CompanySetting>(SETTING_KEYS.company, COMPANY);
  return (
    <footer className="bg-card border-t border-line pt-16 pb-8 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {company.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={company.logo}
                  alt={`Logo ${company.brand}`}
                  className="w-8 h-8 rounded-lg object-contain bg-card border border-line"
                />
              ) : (
                <div className="w-8 h-8 rounded-lg bg-primary text-white font-bold flex items-center justify-center">
                  M
                </div>
              )}
              <span className="font-heading font-bold text-xl text-ink">{company.brand}</span>
            </div>
            <p className="text-ink/70 leading-relaxed text-xs">
              {company.name} — Penyedia Solusi Perangkat IT, Jaringan, &amp; Pengadaan Instansi
              Terpercaya dengan pengalaman 15+ tahun.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={company.wa1Url}
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
                href={company.wa2Url}
                target="_blank"
                rel="noopener"
                aria-label="WhatsApp Cadangan"
                className="p-2 rounded-lg border border-line hover:border-secondary text-ink transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.242-1.111z" />
                </svg>
              </a>
              {company.social.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener"
                  aria-label={s.label}
                  title={s.label}
                  className="p-2 rounded-lg border border-line hover:border-secondary text-ink transition-colors"
                >
                  <SocialIcon label={s.label} />
                </a>
              ))}
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
              {company.address && (
                <li>
                  <span className="font-bold text-ink">Alamat:</span> {company.address}
                </li>
              )}
              {company.email && (
                <li>
                  <span className="font-bold text-ink">Email:</span> {company.email}
                </li>
              )}
              <li>
                <span className="font-bold text-ink">WA 1:</span> {company.wa1}
              </li>
              <li>
                <span className="font-bold text-ink">WA 2:</span> {company.wa2}
              </li>
              {company.hours.map((h) => (
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
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-secondary">Privacy Policy</Link>
            <Link href="#" className="hover:text-secondary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
