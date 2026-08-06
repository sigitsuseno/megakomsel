import { Reveal } from "@/components/site/Reveal";
import Image from "next/image";
import { MILESTONES } from "@/lib/site";
import { getSettingJson, SETTING_KEYS, type AboutSetting } from "@/lib/settings";

const ABOUT_DEFAULT: AboutSetting = {
  headline: "Pengalaman Lebih dari 15 Tahun Membangun Infrastruktur Digital",
  description:
    "Kami memberikan Solusi IT untuk Perusahaan dan Perseorangan dengan pengalaman lebih dari 15 tahun. Komitmen kami adalah menyediakan perangkat keras berkualitas, sistem jaringan tangguh, dan purna jual yang sigap.",
  milestones: MILESTONES,
};

export async function AboutSection() {
  const about = await getSettingJson<AboutSetting>(SETTING_KEYS.about, ABOUT_DEFAULT);
  return (
    <section id="tentang" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-line shadow-xl">
              <Image
                src="https://picsum.photos/600/700?random=20"
                alt="Gedung & Tim Megakomsel"
                width={600}
                height={700}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                <span className="text-white font-medium text-sm">
                  Gedung Operasional &amp; Workshop Megakomsel
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest font-bold text-secondary">
              Profil Perusahaan
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ink">
              {about.headline}
            </h2>
            <p className="text-base text-ink/80 leading-relaxed whitespace-pre-line">
              {about.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-xl border border-line bg-card">
                <div className="text-success mt-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-ink">Teknisi Sertifikasi</h4>
                  <p className="text-xs text-ink/60">Pengalaman menangani ribuan unit.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl border border-line bg-card">
                <div className="text-success mt-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-ink">Layanan 7 Hari</h4>
                  <p className="text-xs text-ink/60">Dukungan teknis cepat tanggap.</p>
                </div>
              </div>
            </div>

            <div className="border-t border-line pt-6">
              <h4 className="font-heading font-bold text-sm text-ink mb-4 uppercase tracking-wider">
                Milestone Kami
              </h4>
              <div className="space-y-3 text-sm text-ink/75">
                {about.milestones.map((m) => (
                  <div key={m.year} className="flex items-center gap-3">
                    <span className="font-bold text-primary-600 dark:text-secondary">
                      {m.year}:
                    </span>
                    <span>{m.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
