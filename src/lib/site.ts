export type SocialLink = {
  id: string;
  label: string;
  url: string;
};

export type CompanySetting = {
  name: string;
  brand: string;
  tagline: string;
  email: string;
  city: string;
  wa1: string;
  wa1Url: string;
  wa2: string;
  wa2Url: string;
  /** URL logo (upload lokal `/uploads/...` atau URL eksternal). Kosong = logo huruf "M". */
  logo: string;
  /** URL favicon (upload lokal `/uploads/...` atau URL eksternal). Kosong = ikon bawaan. */
  favicon: string;
  address: string;
  /** URL embed Google Maps (dari menu Share → Embed a map). */
  googleMap: string;
  hours: { label: string; value: string }[];
  social: SocialLink[];
};

// Data perusahaan default — bisa diubah lewat Dashboard → WEB UI → Setting.
export const COMPANY: CompanySetting = {
  name: "CV Megakomsel IMATECH",
  brand: "MEGAKOMSEL",
  tagline: "IT Solutions",
  email: "info@megakomsel.com",
  city: "Semarang",
  wa1: "+62 856-4011-1213",
  wa1Url: "https://wa.me/6285640111213",
  wa2: "+62 822-2009-9587",
  wa2Url: "https://wa.me/6282220099587",
  logo: "",
  favicon: "",
  address: "",
  googleMap: "",
  hours: [
    { label: "Senin - Jumat", value: "08.00 - 22.00 WIB" },
    { label: "Sabtu", value: "09.00 - 22.00 WIB" },
    { label: "Minggu", value: "By Call / Janji Temu" },
  ],
  social: [],
};

export type MarketplaceItem = {
  name: string;
  url: string;
  color: string;
  /** URL logo (upload lokal `/uploads/...` atau URL eksternal). Kosong = placeholder dari warna. */
  image?: string;
};

export const MARKETPLACES: MarketplaceItem[] = [
  { name: "SIPLah Telkom", url: "https://siplahtelkom.com/store/167660-cv-megakomsel-imatechcom-computer", color: "0B4F8A" },
  { name: "MP. Gratis Ongkir", url: "https://bela.gratisongkir.id/stores/store-648d757fc747b", color: "18BFFF" },
  { name: "SiPLah Ladang", url: "https://siplah.tokoladang.co.id/official-store/cvmegakomselimatechcom.39311", color: "16A34A" },
  { name: "Khusus ATK", url: "https://siplah.tokoladang.co.id/official-store/sejahtera-bersama.28711", color: "F59E0B" },
  { name: "Tokopedia", url: "https://www.tokopedia.com/imatech", color: "42B549" },
  { name: "Shopee", url: "https://shopee.co.id/kitangs", color: "EE4D2D" },
  { name: "INAPROC", url: "https://katalog.inaproc.id/megakomsel", color: "08406F" },
];

/* ---------- Hero Section ---------- */

export const HERO_ANIM_PRESETS = ["waves", "orbits", "terminal", "mesh", "grid"] as const;
export type HeroAnimPreset = (typeof HERO_ANIM_PRESETS)[number];

export type HeroSlide = {
  id: string;
  title: string;
  desc: string;
  ctaLabel: string;
  ctaHref: string;
  /** Jenis visual di sisi kanan slide. */
  mediaType: "image" | "svg" | "anim";
  /** URL gambar (upload lokal `/uploads/...` atau eksternal). Dipakai saat mediaType = "image". */
  image: string;
  /** Kode SVG inline (script & event handler dibersihkan saat render). Dipakai saat mediaType = "svg". */
  svg: string;
  /** Preset animasi bawaan. Dipakai saat mediaType = "anim". */
  anim: HeroAnimPreset;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "hero-1",
    title: "Transformasi Digital Bisnis Anda",
    desc: "Tingkatkan efisiensi & keamanan infrastruktur IT perusahaan Anda bersama layanan teknisi ahli profesional dari Megakomsel.",
    ctaLabel: "Konsultasi Gratis",
    ctaHref: "#kontak",
    mediaType: "image",
    image: "https://picsum.photos/800/600?random=10",
    svg: "",
    anim: "waves",
  },
  {
    id: "hero-2",
    title: "Promo CCTV Hingga 30%",
    desc: "Sistem pengawasan keamanan IP CCTV terintegrasi 24/7, dapat dipantau langsung kapan saja melalui perangkat smartphone Anda.",
    ctaLabel: "Lihat Paket CCTV",
    ctaHref: "#layanan",
    mediaType: "svg",
    svg: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true">
  <defs>
    <linearGradient id="hero-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#18BFFF" />
      <stop offset="1" stop-color="#0B4F8A" />
    </linearGradient>
  </defs>
  <circle cx="200" cy="200" r="150" fill="url(#hero-grad)" />
  <g stroke="#FFFFFF" stroke-width="2" opacity="0.55">
    <circle cx="200" cy="200" r="100" />
    <circle cx="200" cy="200" r="55" />
  </g>
  <circle cx="200" cy="100" r="10" fill="#FFFFFF">
    <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="12s" repeatCount="indefinite" />
  </circle>
  <circle cx="255" cy="200" r="8" fill="#18BFFF">
    <animateTransform attributeName="transform" type="rotate" from="360 200 200" to="0 200 200" dur="8s" repeatCount="indefinite" />
  </circle>
</svg>`,
    image: "",
    anim: "waves",
  },
  {
    id: "hero-3",
    title: "Layanan Pengadaan Peralatan IT",
    desc: "Mitra pengadaan resmi PC, Laptop, Server, dan Perlengkapan Kantor untuk instansi pemerintah & swasta via SiPLah & INAPROC.",
    ctaLabel: "Store Resmi",
    ctaHref: "/store",
    mediaType: "anim",
    image: "",
    svg: "",
    anim: "orbits",
  },
  {
    id: "hero-4",
    title: "Web & App Development",
    desc: "Pengembangan aplikasi & website perusahaan yang modern, responsif, aman, dan siap meningkatkan kredibilitas brand Anda.",
    ctaLabel: "Mulai Project",
    ctaHref: "#kontak",
    mediaType: "anim",
    image: "",
    svg: "",
    anim: "mesh",
  },
];

export const NAV_LINKS = [
  { label: "Layanan", href: "#layanan" },
  { label: "Tentang", href: "#tentang" },
  { label: "Store", href: "/store" },
  { label: "Kontak", href: "#kontak" },
];

export const STATS = [
  { value: 5252, suffix: "+", label: "Total Kunjungan" },
  { value: 10123, suffix: "+", label: "Unit Komputer & Laptop" },
  { value: 200, suffix: "+", label: "Klien Perusahaan" },
  { value: 15, suffix: "+", label: "Tahun Pengalaman" },
];

export const MILESTONES = [
  { year: "2009", text: "Berdiri melayani perbaikan PC & jaringan lokal." },
  { year: "2016", text: "Ekspansi mitra resmi pengadaan instansi & korporat." },
  { year: "2026", text: "Terpercaya melayani 200+ perusahaan & 10.000+ perbaikan." },
];

export const SERVICE_OPTIONS = [
  "Service Komputer dan Laptop",
  "Upgrade Perangkat (Komputer/Laptop)",
  "Instalasi Jaringan (LAN/WAN/Hotspot)",
  "Maintenance Jaringan Rutin",
  "Pengadaan & Instalasi CCTV",
  "Pembuatan Website & Aplikasi",
];