"use client";

import { useActionState } from "react";
import { submitContactAction } from "@/actions/contact";
import { Label, Input, Textarea, Select, Button } from "@/components/ui";
import { COMPANY, SERVICE_OPTIONS, type CompanySetting } from "@/lib/site";

type ContactCompany = Pick<CompanySetting, "googleMap" | "address">;

const DEFAULT_MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.226087547517!2d110.413!3d-6.99!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTknMjQuMCJTIDExMMKwMjQnNDg!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid";

export function ContactSection({ company = COMPANY }: { company?: ContactCompany }) {
  const [state, formAction, pending] = useActionState(submitContactAction, undefined);
  const mapSrc = company.googleMap || DEFAULT_MAP_EMBED;

  return (
    <section id="kontak" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-bold text-secondary mb-2 block">
            Hubungi Kami
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ink">
            Kirim Pesan atau Konsultasi
          </h2>
          <p className="mt-2 text-ink/70">
            Tim teknisi kami siap membantu memberikan jawaban &amp; estimasi kebutuhan IT Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-line shadow-md h-full min-h-[380px] flex flex-col">
            <iframe
              title="Peta Lokasi Megakomsel"
              src={mapSrc}
              className="w-full flex-grow min-h-[340px] border-0"
              allowFullScreen
              loading="lazy"
            />
            {company.address && (
              <p className="px-4 py-3 text-xs text-ink/75 border-t border-line bg-card">
                <span className="font-bold text-ink">Alamat:</span> {company.address}
              </p>
            )}
          </div>

          <div className="lg:col-span-7 p-8 rounded-2xl border border-line bg-card shadow-lg">
            <form action={formAction} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="name">Nama Lengkap *</Label>
                  <Input id="name" name="name" required placeholder="Budi Santoso" />
                </div>
                <div>
                  <Label htmlFor="email">Alamat Email *</Label>
                  <Input id="email" name="email" type="email" required placeholder="budi@perusahaan.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="phone">Nomor HP / WA *</Label>
                  <Input id="phone" name="phone" type="tel" required placeholder="081234567890" />
                </div>
                <div>
                  <Label htmlFor="company">Nama Perusahaan / Instansi</Label>
                  <Input id="company" name="company" placeholder="PT Maju Bersama (Opsional)" />
                </div>
              </div>

              <div>
                <Label htmlFor="service">Layanan yang Dibutuhkan *</Label>
                <Select id="service" name="service" required defaultValue="">
                  <option value="" disabled>
                    Pilih Layanan
                  </option>
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Pesan / Detail Kebutuhan *</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Jelaskan detail perbaikan atau rincian project yang Anda butuhkan..."
                />
              </div>

              {state?.error && (
                <p className="p-4 rounded-xl bg-danger/10 text-danger text-sm font-medium" role="alert">
                  {state.error}
                </p>
              )}
              {state?.success && (
                <p className="p-4 rounded-xl bg-success/10 text-success text-sm font-medium" role="status">
                  {state.success}
                </p>
              )}

              <Button type="submit" disabled={pending} className="w-full py-3.5 font-bold">
                {pending ? "Mengirim..." : "Kirim Pesan"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
