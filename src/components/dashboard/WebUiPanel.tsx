"use client";

import { useState } from "react";
import { useActionState } from "react";
import { cn } from "@/lib/utils";
import { Button, Card, Input, Label, Select, Textarea } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import type { AboutSetting } from "@/lib/settings";
import type { CompanySetting, HeroSlide, HeroAnimPreset, MarketplaceItem } from "@/lib/site";
import { HERO_ANIM_PRESETS } from "@/lib/site";
import { HeroMediaVisual, ANIM_LABELS } from "@/components/site/HeroMedia";
import { AboutMedia, type AboutMediaData } from "@/components/site/AboutMedia";
import {
  saveAboutAction,
  saveCompanyAction,
  saveHeroAction,
  saveMarketplacesAction,
  type SiteSettingState,
} from "@/actions/site";

type Message = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  service: string | null;
  message: string;
  createdAt: Date;
};

type WebUiPanelProps = {
  marketplaces: MarketplaceItem[];
  about: AboutSetting;
  hero: HeroSlide[];
  company: CompanySetting;
  messages: Message[];
};

type TabKey = "hero" | "mp" | "about" | "setting" | "pesan";

const TABS: { key: TabKey; label: string }[] = [
  { key: "hero", label: "Hero Section" },
  { key: "mp", label: "MP Link" },
  { key: "about", label: "About" },
  { key: "setting", label: "Setting" },
  { key: "pesan", label: "Pesan" },
];

function StateAlert({ state }: { state: SiteSettingState }) {
  if (!state) return null;
  return (
    <p
      role="alert"
      className={cn(
        "p-3 rounded-xl text-sm font-medium",
        state.error
          ? "bg-danger/10 text-danger"
          : "bg-success/10 text-success"
      )}
    >
      {state.error ?? state.success}
    </p>
  );
}

export function WebUiPanel({ marketplaces, about, hero, company, messages }: WebUiPanelProps) {
  const [tab, setTab] = useState<TabKey>("mp");

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-semibold transition-colors",
              tab === t.key
                ? "bg-primary text-white"
                : "border border-line bg-card text-ink/70 hover:text-ink"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "hero" && <HeroTab slides={hero} />}
      {tab === "mp" && <MpLinkTab marketplaces={marketplaces} />}
      {tab === "about" && <AboutTab about={about} />}
      {tab === "setting" && <SettingTab company={company} />}
      {tab === "pesan" && <PesanTab messages={messages} />}
    </div>
  );
}

/* ---------------- Tab Hero Section ---------------- */

const MEDIA_TYPE_OPTIONS: { value: HeroSlide["mediaType"]; label: string }[] = [
  { value: "image", label: "Gambar" },
  { value: "svg", label: "SVG" },
  { value: "anim", label: "Animasi" },
];

const ANIM_OPTIONS = HERO_ANIM_PRESETS.map((p) => ({
  value: p,
  label: ANIM_LABELS[p],
}));

function newSlideId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `hero-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function HeroTab({ slides }: { slides: HeroSlide[] }) {
  const [rows, setRows] = useState<HeroSlide[]>(
    slides.map((s) => ({
      ...s,
      image: s.image ?? "",
      svg: s.svg ?? "",
      anim: s.anim ?? "waves",
    }))
  );
  const [state, formAction, pending] = useActionState(saveHeroAction, undefined);
  const [uploading, setUploading] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const updateRow = (id: string, patch: Partial<HeroSlide>) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const addSlide = () =>
    setRows((prev) => [
      ...prev,
      {
        id: newSlideId(),
        title: "",
        desc: "",
        ctaLabel: "",
        ctaHref: "#kontak",
        mediaType: "image",
        image: "",
        svg: "",
        anim: "waves",
      },
    ]);

  const removeSlide = (id: string) =>
    setRows((prev) => prev.filter((r) => r.id !== id));

  const moveSlide = (id: string, dir: -1 | 1) =>
    setRows((prev) => {
      const i = prev.findIndex((r) => r.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  const uploadImage = async (id: string, file: File) => {
    setUploading(id);
    setUploadError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload/hero", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload gagal");
      updateRow(id, { image: data.url });
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload gagal");
    } finally {
      setUploading(null);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="font-heading font-bold text-ink mb-1">Hero Section</h2>
      <p className="text-sm text-ink/60 mb-6">
        Kelola slide paling atas di homepage. Media tiap slide bisa berupa gambar
        (upload/URL), kode SVG, atau animasi bawaan.
      </p>

      <form action={formAction} className="space-y-5">
        <input type="hidden" name="hero" value={JSON.stringify(rows)} />

        <div className="space-y-4">
          {rows.map((row, i) => (
            <div key={row.id} className="rounded-xl border border-line p-4 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-ink/60">
                  Slide #{i + 1}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    className="px-2.5 py-1.5 text-xs"
                    onClick={() => moveSlide(row.id, -1)}
                    disabled={i === 0}
                    aria-label="Naikkan posisi slide"
                  >
                    ↑
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="px-2.5 py-1.5 text-xs"
                    onClick={() => moveSlide(row.id, 1)}
                    disabled={i === rows.length - 1}
                    aria-label="Turunkan posisi slide"
                  >
                    ↓
                  </Button>
                  <Button
                    type="button"
                    variant="danger"
                    className="px-3 py-1.5 text-xs"
                    onClick={() => removeSlide(row.id)}
                    disabled={rows.length === 1}
                  >
                    Hapus
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor={`hero-title-${row.id}`}>Judul</Label>
                <Input
                  id={`hero-title-${row.id}`}
                  value={row.title}
                  onChange={(e) => updateRow(row.id, { title: e.target.value })}
                  placeholder="Judul utama slide"
                />
              </div>

              <div>
                <Label htmlFor={`hero-desc-${row.id}`}>Deskripsi</Label>
                <Textarea
                  id={`hero-desc-${row.id}`}
                  rows={2}
                  value={row.desc}
                  onChange={(e) => updateRow(row.id, { desc: e.target.value })}
                  placeholder="Deskripsi singkat slide..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor={`hero-cta-${row.id}`}>Label Tombol</Label>
                  <Input
                    id={`hero-cta-${row.id}`}
                    value={row.ctaLabel}
                    onChange={(e) => updateRow(row.id, { ctaLabel: e.target.value })}
                    placeholder="Konsultasi Gratis"
                  />
                </div>
                <div>
                  <Label htmlFor={`hero-href-${row.id}`}>Link Tombol</Label>
                  <Input
                    id={`hero-href-${row.id}`}
                    value={row.ctaHref}
                    onChange={(e) => updateRow(row.id, { ctaHref: e.target.value })}
                    placeholder="#kontak"
                  />
                </div>
              </div>

              <div>
                <Label>Tipe Media</Label>
                <div className="flex gap-2 flex-wrap">
                  {MEDIA_TYPE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => updateRow(row.id, { mediaType: opt.value })}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                        row.mediaType === opt.value
                          ? "bg-primary text-white"
                          : "border border-line bg-card text-ink/70 hover:text-ink"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {row.mediaType === "image" && (
                <div>
                  <Label htmlFor={`hero-image-${row.id}`}>Gambar (upload atau URL)</Label>
                  <div className="flex items-start gap-3">
                    <div className="w-24 h-24 shrink-0 rounded-xl border border-line bg-surface overflow-hidden">
                      {row.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={row.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-ink/40 text-center px-1">
                          Belum ada
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <Input
                        id={`hero-image-${row.id}`}
                        value={row.image}
                        onChange={(e) => updateRow(row.id, { image: e.target.value })}
                        placeholder="Tempel URL gambar atau upload"
                      />
                      <div className="flex flex-wrap gap-2">
                        <label className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-medium border border-line bg-card text-ink hover:border-secondary transition-colors cursor-pointer">
                          {uploading === row.id ? "Mengunggah..." : "Upload File"}
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/gif"
                            className="hidden"
                            disabled={uploading !== null}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              e.target.value = "";
                              if (file) uploadImage(row.id, file);
                            }}
                          />
                        </label>
                        {row.image && (
                          <Button
                            type="button"
                            variant="outline"
                            className="px-4 py-1.5 text-xs"
                            onClick={() => updateRow(row.id, { image: "" })}
                          >
                            Hapus Gambar
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {row.mediaType === "svg" && (
                <div className="space-y-2">
                  <Label htmlFor={`hero-svg-${row.id}`}>Kode SVG</Label>
                  <Textarea
                    id={`hero-svg-${row.id}`}
                    rows={6}
                    className="font-mono text-xs"
                    value={row.svg}
                    onChange={(e) => updateRow(row.id, { svg: e.target.value })}
                    placeholder={'<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">...</svg>'}
                  />
                  <p className="text-xs text-ink/50">
                    Tempel kode SVG. Script dan event handler otomatis dibersihkan saat ditampilkan.
                  </p>
                </div>
              )}

              {row.mediaType === "anim" && (
                <div>
                  <Label htmlFor={`hero-anim-${row.id}`}>Gaya Animasi</Label>
                  <Select
                    id={`hero-anim-${row.id}`}
                    value={row.anim}
                    onChange={(e) =>
                      updateRow(row.id, { anim: e.target.value as HeroAnimPreset })
                    }
                  >
                    {ANIM_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </Select>
                </div>
              )}

              <div>
                <Label>Pratinjau</Label>
                <div className="relative h-44 rounded-xl overflow-hidden border border-line bg-surface">
                  <HeroMediaVisual slide={row} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" variant="outline" onClick={addSlide}>
            + Tambah Slide
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? "Menyimpan..." : "Simpan Hero Section"}
          </Button>
        </div>

        {uploadError && (
          <p role="alert" className="p-3 rounded-xl text-sm font-medium bg-danger/10 text-danger">
            {uploadError}
          </p>
        )}

        <StateAlert state={state} />
      </form>
    </Card>
  );
}

/* ---------------- Tab MP Link ---------------- */

type MpRow = { name: string; url: string; color: string; image: string };

function MpLinkTab({ marketplaces }: { marketplaces: MarketplaceItem[] }) {
  const [rows, setRows] = useState<MpRow[]>(
    marketplaces.map((m) => ({ name: m.name, url: m.url, color: m.color, image: m.image ?? "" }))
  );
  const [state, formAction, pending] = useActionState(saveMarketplacesAction, undefined);
  const [uploading, setUploading] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const updateRow = (i: number, patch: Partial<MpRow>) =>
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));

  const addRow = () =>
    setRows((prev) => [...prev, { name: "", url: "", color: "6366F1", image: "" }]);

  const removeRow = (i: number) =>
    setRows((prev) => prev.filter((_, idx) => idx !== i));

  const uploadImage = async (i: number, file: File) => {
    setUploading(i);
    setUploadError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload/marketplace", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload gagal");
      updateRow(i, { image: data.url });
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload gagal");
    } finally {
      setUploading(null);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="font-heading font-bold text-ink mb-1">Link Marketplace &amp; Platform Pengadaan</h2>
      <p className="text-sm text-ink/60 mb-6">
        Link ini tampil di slider pada homepage. Warna memakai kode hex 6 digit tanpa tanda #. Logo boleh diupload dari file atau diimport lewat URL gambar.
      </p>

      <form action={formAction} className="space-y-5">
        <input type="hidden" name="marketplaces" value={JSON.stringify(rows)} />

        <div className="space-y-4">
          {rows.map((row, i) => (
            <div key={i} className="rounded-xl border border-line p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-ink/60">
                  Item #{i + 1}
                </span>
                <Button
                  type="button"
                  variant="danger"
                  className="px-3 py-1.5 text-xs"
                  onClick={() => removeRow(i)}
                  disabled={rows.length === 1}
                >
                  Hapus
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor={`mp-name-${i}`}>Nama</Label>
                  <Input
                    id={`mp-name-${i}`}
                    value={row.name}
                    onChange={(e) => updateRow(i, { name: e.target.value })}
                    placeholder="Tokopedia"
                  />
                </div>
                <div>
                  <Label htmlFor={`mp-color-${i}`}>Warna (hex)</Label>
                  <Input
                    id={`mp-color-${i}`}
                    value={row.color}
                    onChange={(e) => updateRow(i, { color: e.target.value })}
                    placeholder="42B549"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor={`mp-url-${i}`}>URL</Label>
                <Input
                  id={`mp-url-${i}`}
                  value={row.url}
                  onChange={(e) => updateRow(i, { url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label htmlFor={`mp-image-${i}`}>Logo / Gambar</Label>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 shrink-0 rounded-xl border border-line bg-surface overflow-hidden flex items-center justify-center">
                    {row.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={row.image}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-[10px] text-ink/40 px-1 text-center">
                        No img
                      </span>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <Input
                      id={`mp-image-${i}`}
                      value={row.image}
                      onChange={(e) => updateRow(i, { image: e.target.value })}
                      placeholder="Tempel URL gambar (import) atau upload"
                    />
                    <div className="flex flex-wrap gap-2">
                      <label className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-medium border border-line bg-card text-ink hover:border-secondary transition-colors cursor-pointer">
                        {uploading === i ? "Mengunggah..." : "Upload File"}
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp,image/gif"
                          className="hidden"
                          disabled={uploading !== null}
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            e.target.value = "";
                            if (f) uploadImage(i, f);
                          }}
                        />
                      </label>
                      {row.image && (
                        <Button
                          type="button"
                          variant="outline"
                          className="px-4 py-1.5 text-xs"
                          onClick={() => updateRow(i, { image: "" })}
                        >
                          Hapus Gambar
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button type="button" variant="outline" onClick={addRow}>
          + Tambah Item
        </Button>

        {uploadError && (
          <p role="alert" className="p-3 rounded-xl text-sm font-medium bg-danger/10 text-danger">
            {uploadError}
          </p>
        )}

        <StateAlert state={state} />

        <Button type="submit" disabled={pending}>
          {pending ? "Menyimpan..." : "Simpan Link Marketplace"}
        </Button>
      </form>
    </Card>
  );
}

/* ---------------- Tab About ---------------- */

type MilestoneRow = { year: string; text: string };

function AboutTab({ about }: { about: AboutSetting }) {
  const [headline, setHeadline] = useState(about.headline);
  const [description, setDescription] = useState(about.description);
  const [milestones, setMilestones] = useState<MilestoneRow[]>(about.milestones);
  const [mediaType, setMediaType] = useState<AboutMediaData["mediaType"]>(
    about.mediaType ?? "image"
  );
  const [image, setImage] = useState(about.image ?? "");
  const [svg, setSvg] = useState(about.svg ?? "");
  const [anim, setAnim] = useState<HeroAnimPreset>(about.anim ?? "waves");
  const [state, formAction, pending] = useActionState(saveAboutAction, undefined);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const updateMilestone = (i: number, patch: Partial<MilestoneRow>) =>
    setMilestones((prev) => prev.map((m, idx) => (idx === i ? { ...m, ...patch } : m)));

  const addMilestone = () => setMilestones((prev) => [...prev, { year: "", text: "" }]);
  const removeMilestone = (i: number) =>
    setMilestones((prev) => prev.filter((_, idx) => idx !== i));

  const uploadImage = async (file: File) => {
    setUploading(true);
    setUploadError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload/about", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload gagal");
      setImage(data.url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload gagal");
    } finally {
      setUploading(false);
    }
  };

  const media: AboutMediaData = { mediaType, image, svg, anim };
  const payload = JSON.stringify({ headline, description, milestones, mediaType, image, svg, anim });

  return (
    <Card className="p-6">
      <h2 className="font-heading font-bold text-ink mb-1">Konten Profil (About)</h2>
      <p className="text-sm text-ink/60 mb-6">
        Konten ini tampil di section &quot;Tentang Kami&quot; pada homepage.
      </p>

      <form action={formAction} className="space-y-5">
        <input type="hidden" name="about" value={payload} />

        <div>
          <Label htmlFor="about-headline">Headline</Label>
          <Input
            id="about-headline"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="Judul profil perusahaan"
          />
        </div>

        <div>
          <Label htmlFor="about-description">Deskripsi</Label>
          <Textarea
            id="about-description"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Deskripsi perusahaan..."
          />
        </div>

        <div>
          <Label>Tipe Media Gambar</Label>
          <div className="flex gap-2 flex-wrap">
            {MEDIA_TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setMediaType(opt.value)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                  mediaType === opt.value
                    ? "bg-primary text-white"
                    : "border border-line bg-card text-ink/70 hover:text-ink"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {mediaType === "image" && (
          <div>
            <Label htmlFor="about-image">Gambar (upload atau URL)</Label>
            <div className="flex items-start gap-3">
              <div className="w-24 h-24 shrink-0 rounded-xl border border-line bg-surface overflow-hidden">
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] text-ink/40 text-center px-1">
                    Belum ada
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Input
                  id="about-image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Tempel URL gambar atau upload"
                />
                <div className="flex flex-wrap gap-2">
                  <label className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-medium border border-line bg-card text-ink hover:border-secondary transition-colors cursor-pointer">
                    {uploading ? "Mengunggah..." : "Upload File"}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        e.target.value = "";
                        if (file) uploadImage(file);
                      }}
                    />
                  </label>
                  {image && (
                    <Button
                      type="button"
                      variant="outline"
                      className="px-4 py-1.5 text-xs"
                      onClick={() => setImage("")}
                    >
                      Hapus Gambar
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {mediaType === "svg" && (
          <div className="space-y-2">
            <Label htmlFor="about-svg">Kode SVG</Label>
            <Textarea
              id="about-svg"
              rows={6}
              className="font-mono text-xs"
              value={svg}
              onChange={(e) => setSvg(e.target.value)}
              placeholder={'<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">...</svg>'}
            />
            <p className="text-xs text-ink/50">
              Tempel kode SVG. Script dan event handler otomatis dibersihkan saat ditampilkan.
            </p>
          </div>
        )}

        {mediaType === "anim" && (
          <div>
            <Label htmlFor="about-anim">Gaya Animasi</Label>
            <Select
              id="about-anim"
              value={anim}
              onChange={(e) => setAnim(e.target.value as HeroAnimPreset)}
            >
              {ANIM_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </div>
        )}

        <div>
          <Label>Pratinjau</Label>
          <div className="relative h-44 rounded-xl overflow-hidden border border-line bg-surface">
            <AboutMedia media={media} />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-ink/80">
              Milestone
            </span>
            <Button type="button" variant="outline" className="px-3 py-1.5 text-xs" onClick={addMilestone}>
              + Tambah Milestone
            </Button>
          </div>
          {milestones.map((m, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl border border-line p-4">
              <div className="w-24 shrink-0">
                <Input
                  value={m.year}
                  onChange={(e) => updateMilestone(i, { year: e.target.value })}
                  placeholder="2020"
                  aria-label={`Tahun milestone ${i + 1}`}
                />
              </div>
              <Input
                value={m.text}
                onChange={(e) => updateMilestone(i, { text: e.target.value })}
                placeholder="Deskripsi milestone..."
                aria-label={`Deskripsi milestone ${i + 1}`}
              />
              <Button
                type="button"
                variant="danger"
                className="px-3 py-1.5 text-xs shrink-0"
                onClick={() => removeMilestone(i)}
              >
                Hapus
              </Button>
            </div>
          ))}
        </div>

        {uploadError && (
          <p role="alert" className="p-3 rounded-xl text-sm font-medium bg-danger/10 text-danger">
            {uploadError}
          </p>
        )}

        <StateAlert state={state} />

        <Button type="submit" disabled={pending}>
          {pending ? "Menyimpan..." : "Simpan Konten About"}
        </Button>
      </form>
    </Card>
  );
}

/* ---------------- Tab Setting ---------------- */

type HourRow = { label: string; value: string };
type SocialRow = { id: string; label: string; url: string };

function newSocialId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `social-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function SettingTab({ company }: { company: CompanySetting }) {
  const [name, setName] = useState(company.name ?? "");
  const [brand, setBrand] = useState(company.brand ?? "");
  const [tagline, setTagline] = useState(company.tagline ?? "");
  const [email, setEmail] = useState(company.email ?? "");
  const [city, setCity] = useState(company.city ?? "");
  const [wa1, setWa1] = useState(company.wa1 ?? "");
  const [wa1Url, setWa1Url] = useState(company.wa1Url ?? "");
  const [wa2, setWa2] = useState(company.wa2 ?? "");
  const [wa2Url, setWa2Url] = useState(company.wa2Url ?? "");
  const [logo, setLogo] = useState(company.logo ?? "");
  const [favicon, setFavicon] = useState(company.favicon ?? "");
  const [address, setAddress] = useState(company.address ?? "");
  const [googleMap, setGoogleMap] = useState(company.googleMap ?? "");
  const [hours, setHours] = useState<HourRow[]>(company.hours ?? []);
  const [social, setSocial] = useState<SocialRow[]>(company.social ?? []);
  const [state, formAction, pending] = useActionState(saveCompanyAction, undefined);
  const [uploading, setUploading] = useState<"logo" | "favicon" | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const updateHour = (i: number, patch: Partial<HourRow>) =>
    setHours((prev) => prev.map((h, idx) => (idx === i ? { ...h, ...patch } : h)));
  const addHour = () => setHours((prev) => [...prev, { label: "", value: "" }]);
  const removeHour = (i: number) =>
    setHours((prev) => prev.filter((_, idx) => idx !== i));

  const updateSocial = (i: number, patch: Partial<SocialRow>) =>
    setSocial((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  const addSocial = (label = "") =>
    setSocial((prev) => [...prev, { id: newSocialId(), label, url: "" }]);
  const removeSocial = (i: number) =>
    setSocial((prev) => prev.filter((_, idx) => idx !== i));

  const uploadFile = async (kind: "logo" | "favicon", file: File) => {
    setUploading(kind);
    setUploadError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload/setting", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload gagal");
      if (kind === "logo") setLogo(data.url);
      else setFavicon(data.url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload gagal");
    } finally {
      setUploading(null);
    }
  };

  const payload = JSON.stringify({
    name,
    brand,
    tagline,
    email,
    city,
    wa1,
    wa1Url,
    wa2,
    wa2Url,
    logo,
    favicon,
    address,
    googleMap,
    hours,
    social,
  });

  return (
    <Card className="p-6">
      <h2 className="font-heading font-bold text-ink mb-1">Setting Situs</h2>
      <p className="text-sm text-ink/60 mb-6">
        Identitas perusahaan, kontak, logo, favicon, dan tautan sosial media yang
        dipakai di seluruh halaman situs.
      </p>

      <form action={formAction} className="space-y-5">
        <input type="hidden" name="company" value={payload} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="set-name">Nama Perusahaan</Label>
            <Input
              id="set-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="CV Megakomsel IMATECH"
            />
          </div>
          <div>
            <Label htmlFor="set-brand">Brand</Label>
            <Input
              id="set-brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="MEGAKOMSEL"
            />
          </div>
          <div>
            <Label htmlFor="set-tagline">Tagline</Label>
            <Input
              id="set-tagline"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="IT Solutions"
            />
          </div>
          <div>
            <Label htmlFor="set-email">Email</Label>
            <Input
              id="set-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="info@megakomsel.com"
            />
          </div>
          <div>
            <Label htmlFor="set-city">Kota</Label>
            <Input
              id="set-city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Semarang"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="set-address">Alamat</Label>
          <Textarea
            id="set-address"
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Jl. Contoh Raya No. 1, Semarang, Jawa Tengah"
          />
        </div>

        <div>
          <Label htmlFor="set-googlemap">Google Map (Embed URL)</Label>
          <Input
            id="set-googlemap"
            value={googleMap}
            onChange={(e) => setGoogleMap(e.target.value)}
            placeholder="https://www.google.com/maps/embed?pb=..."
          />
          <p className="mt-1 text-xs text-ink/50">
            Ambil dari Google Maps → Share → &quot;Embed a map&quot; → salin URL di dalam
            iframe (mulai dari https://www.google.com/maps/embed?...).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="set-wa1">WhatsApp Utama (Nomor)</Label>
            <Input
              id="set-wa1"
              value={wa1}
              onChange={(e) => setWa1(e.target.value)}
              placeholder="+62 856-4011-1213"
            />
          </div>
          <div>
            <Label htmlFor="set-wa1url">WhatsApp Utama (Link)</Label>
            <Input
              id="set-wa1url"
              value={wa1Url}
              onChange={(e) => setWa1Url(e.target.value)}
              placeholder="https://wa.me/6285640111213"
            />
          </div>
          <div>
            <Label htmlFor="set-wa2">WhatsApp Kedua (Nomor)</Label>
            <Input
              id="set-wa2"
              value={wa2}
              onChange={(e) => setWa2(e.target.value)}
              placeholder="+62 822-2009-9587"
            />
          </div>
          <div>
            <Label htmlFor="set-wa2url">WhatsApp Kedua (Link)</Label>
            <Input
              id="set-wa2url"
              value={wa2Url}
              onChange={(e) => setWa2Url(e.target.value)}
              placeholder="https://wa.me/6282220099587"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Logo</Label>
            <div className="flex items-start gap-3">
              <div className="w-20 h-20 shrink-0 rounded-xl border border-line bg-surface overflow-hidden flex items-center justify-center">
                {logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logo} alt="" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-[10px] text-ink/40 px-1 text-center">
                    No logo
                  </span>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Input
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  placeholder="Tempel URL logo atau upload"
                />
                <div className="flex flex-wrap gap-2">
                  <label className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-medium border border-line bg-card text-ink hover:border-secondary transition-colors cursor-pointer">
                    {uploading === "logo" ? "Mengunggah..." : "Upload File"}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                      className="hidden"
                      disabled={uploading !== null}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        e.target.value = "";
                        if (file) uploadFile("logo", file);
                      }}
                    />
                  </label>
                  {logo && (
                    <Button
                      type="button"
                      variant="outline"
                      className="px-4 py-1.5 text-xs"
                      onClick={() => setLogo("")}
                    >
                      Hapus
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <Label>Favicon</Label>
            <div className="flex items-start gap-3">
              <div className="w-20 h-20 shrink-0 rounded-xl border border-line bg-surface overflow-hidden flex items-center justify-center">
                {favicon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={favicon} alt="" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-[10px] text-ink/40 px-1 text-center">
                    No favicon
                  </span>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Input
                  value={favicon}
                  onChange={(e) => setFavicon(e.target.value)}
                  placeholder="Tempel URL favicon atau upload"
                />
                <div className="flex flex-wrap gap-2">
                  <label className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-medium border border-line bg-card text-ink hover:border-secondary transition-colors cursor-pointer">
                    {uploading === "favicon" ? "Mengunggah..." : "Upload File"}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,image/x-icon,image/vnd.microsoft.icon"
                      className="hidden"
                      disabled={uploading !== null}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        e.target.value = "";
                        if (file) uploadFile("favicon", file);
                      }}
                    />
                  </label>
                  {favicon && (
                    <Button
                      type="button"
                      variant="outline"
                      className="px-4 py-1.5 text-xs"
                      onClick={() => setFavicon("")}
                    >
                      Hapus
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-ink/80">
              Jam Operasional
            </span>
            <Button type="button" variant="outline" className="px-3 py-1.5 text-xs" onClick={addHour}>
              + Tambah Jam
            </Button>
          </div>
          {hours.map((h, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl border border-line p-4">
              <Input
                value={h.label}
                onChange={(e) => updateHour(i, { label: e.target.value })}
                placeholder="Senin - Jumat"
                aria-label={`Hari jam operasional ${i + 1}`}
              />
              <Input
                value={h.value}
                onChange={(e) => updateHour(i, { value: e.target.value })}
                placeholder="08.00 - 22.00 WIB"
                aria-label={`Waktu jam operasional ${i + 1}`}
              />
              <Button
                type="button"
                variant="danger"
                className="px-3 py-1.5 text-xs shrink-0"
                onClick={() => removeHour(i)}
              >
                Hapus
              </Button>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-ink/80">
              Tautan Sosial Media
            </span>
            <Button type="button" variant="outline" className="px-3 py-1.5 text-xs" onClick={() => addSocial()}>
              + Tambah Link
            </Button>
          </div>
          {social.map((s, i) => (
            <div key={s.id} className="flex items-start gap-3 rounded-xl border border-line p-4">
              <Input
                value={s.label}
                onChange={(e) => updateSocial(i, { label: e.target.value })}
                placeholder="Instagram"
                aria-label={`Nama sosial media ${i + 1}`}
              />
              <Input
                value={s.url}
                onChange={(e) => updateSocial(i, { url: e.target.value })}
                placeholder="https://instagram.com/..."
                aria-label={`URL sosial media ${i + 1}`}
              />
              <Button
                type="button"
                variant="danger"
                className="px-3 py-1.5 text-xs shrink-0"
                onClick={() => removeSocial(i)}
              >
                Hapus
              </Button>
            </div>
          ))}
        </div>

        {uploadError && (
          <p role="alert" className="p-3 rounded-xl text-sm font-medium bg-danger/10 text-danger">
            {uploadError}
          </p>
        )}

        <StateAlert state={state} />

        <Button type="submit" disabled={pending}>
          {pending ? "Menyimpan..." : "Simpan Setting"}
        </Button>
      </form>
    </Card>
  );
}

/* ---------------- Tab Pesan ---------------- */

function PesanTab({ messages }: { messages: Message[] }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-ink/60">{messages.length} pesan dari form kontak.</p>
      {messages.length === 0 ? (
        <p className="text-sm text-ink/60">Belum ada pesan masuk.</p>
      ) : (
        messages.map((m) => (
          <article key={m.id} className="p-5 rounded-2xl border border-line bg-card">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="font-heading font-bold text-ink">{m.name}</h2>
                <p className="text-xs text-ink/60">
                  {m.email} • {m.phone}
                  {m.company ? ` • ${m.company}` : ""}
                  {m.service ? ` • ${m.service}` : ""}
                </p>
              </div>
              <time className="text-xs text-ink/50">{formatDate(m.createdAt)}</time>
            </div>
            <p className="mt-3 text-sm text-ink/75 leading-relaxed">{m.message}</p>
          </article>
        ))
      )}
    </div>
  );
}
