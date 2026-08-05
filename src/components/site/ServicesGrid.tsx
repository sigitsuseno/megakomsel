import { Reveal } from "@/components/site/Reveal";

const SERVICES = [
  {
    title: "Service Komputer dan Laptop",
    desc: "Service Laptop, Komputer, Tablet, Printer Inkjet, Printer Laser, Monitor, hardware maupun software.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
  },
  {
    title: "Upgrade Perangkat",
    desc: "Upgrade Komputer/Laptop yang lemot dengan SSD, RAM, atau Processor terkini beserta rekomendasi upgrade terbaik.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
  },
  {
    title: "Instalasi Jaringan",
    desc: "Pemasangan WAN, LAN, Point to Point, Hotspot area, sistem Diskless, hingga perancangan Laboratorium Komputer.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    ),
  },
  {
    title: "Maintenance Jaringan",
    desc: "Dukungan teknisi 7 hari seminggu untuk menjamin server & konektivitas stabil, tanpa perlu rekruit SDM IT internal sendiri.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    ),
  },
  {
    title: "Pengadaan CCTV",
    desc: "Instalasi CCTV terintegrasi online & offline berkualitas tinggi, lengkap dengan fitur pantau remote dari mana saja.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    ),
  },
  {
    title: "Website dan Aplikasi",
    desc: "Jasa pembuatan Website Perusahaan, E-commerce, dan Aplikasi Custom sesuai kebutuhan workflow operasional bisnis Anda.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    ),
  },
];

export function ServicesGrid() {
  return (
    <section id="layanan" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-bold text-secondary mb-2 block">
            Layanan Unggulan
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ink">
            Solusi IT Komprehensif untuk Anda
          </h2>
          <p className="mt-4 text-ink/70">
            Dukungan penuh dari teknisi profesional berpengalaman untuk menjamin kelancaran operasional digital bisnis Anda.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 60}>
              <div className="p-8 rounded-2xl border border-line bg-card hover:-translate-y-2 hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 group h-full">
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary dark:text-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {service.icon}
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold mb-3 text-ink">{service.title}</h3>
                <p className="text-sm text-ink/70 leading-relaxed">{service.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
