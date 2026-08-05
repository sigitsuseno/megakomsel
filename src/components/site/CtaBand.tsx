import { COMPANY } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="py-12 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold">
            Konsultasikan kebutuhan IT Anda bersama tim kami.
          </h2>
          <p className="text-blue-100 mt-1">
            Dapatkan penawaran harga terbaik &amp; analisa kebutuhan gratis.
          </p>
        </div>
        <a
          href={COMPANY.wa1Url}
          target="_blank"
          rel="noopener"
          className="whitespace-nowrap px-8 py-3.5 rounded-xl bg-secondary text-slate-900 font-bold hover:bg-white transition-all shadow-lg"
        >
          Hubungi Kami via WhatsApp
        </a>
      </div>
    </section>
  );
}
