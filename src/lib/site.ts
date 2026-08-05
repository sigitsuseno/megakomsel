// Data perusahaan terpusat — ganti sekali di sini, terpakai di seluruh situs.
export const COMPANY = {
  name: "CV Megakomsel IMATECH",
  brand: "MEGAKOMSEL",
  tagline: "IT Solutions",
  email: "info@megakomsel.com",
  city: "Semarang",
  wa1: "+62 856-4011-1213",
  wa1Url: "https://wa.me/6285640111213",
  wa2: "+62 822-2009-9587",
  wa2Url: "https://wa.me/6282220099587",
  hours: [
    { label: "Senin - Jumat", value: "08.00 - 22.00 WIB" },
    { label: "Sabtu", value: "09.00 - 22.00 WIB" },
    { label: "Minggu", value: "By Call / Janji Temu" },
  ],
};

export type MarketplaceItem = {
  name: string;
  url: string;
  color: string;
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