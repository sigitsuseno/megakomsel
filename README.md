# Megakomsel — Website Full-Stack

Website **megakomsel.com**: perusahaan solusi perangkat IT, CCTV, jaringan, pengadaan instansi, dan web development (CV Megakomsel IMATECH).

Desain mengikuti file referensi `gemini-code-1785949364429.html` (token warna biru, Space Grotesk + Inter, glassmorphism, dark mode, marquee, animasi reveal & counter). Dibangun sebagai aplikasi **full-stack** yang siap dikembangkan: login/register, dashboard admin, dan modul store/toko online.

## Tech Stack

- **Next.js 16** (App Router, React 19, Turbopack, TypeScript)
- **Tailwind CSS v4** — design tokens via CSS Variables + dark mode class
- **Prisma ORM 7** + **SQLite** (dev) via driver adapter `better-sqlite3`
- **Auth kustom**: JWT (jose) + bcrypt, httpOnly cookie, proteksi rute via `proxy.ts`
- **Server Actions** + Zod validasi (tanpa REST API tambahan untuk MVP)

## Fitur yang Sudah Ada (Setup Awal)

1. **Landing page** sesuai referensi: hero slider sinkron (teks + gambar), marquee marketplace (SIPLah, INAPROC, Tokopedia, Shopee, dll), layanan, CTA, tentang + milestone, counter animasi, form kontak (tersimpan ke DB), footer 4 kolom.
2. **Auth**: register, login (dengan redirect balik ke checkout), logout; role `CUSTOMER` / `ADMIN`.
3. **Store / Toko Online**: katalog produk + filter kategori, detail produk, keranjang (localStorage), checkout → order tersimpan (validasi stok & harga di server), stok otomatis berkurang.
4. **Dashboard Admin** (`/dashboard`): overview statistik (produk, pesanan, pendapatan, pesan), CRUD produk, ubah status pesanan, lihat pesan kontak.
5. **SEO & aksesibilitas**: metadata lengkap, semantic HTML, ARIA, lazy loading.

## Akun Demo (hasil seed)

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@megakomsel.com` | `admin123` |
| Customer | `customer@megakomsel.com` | `customer123` |

## Menjalankan di Lokal (Laragon)

Prasyarat: Node.js 18+ (disarankan 20+), MySQL/Laragon tidak wajib (SQLite).

```bash
cd H:\laragon\www\megakomsel
npm install

# 1. Siapkan environment
copy .env.example .env
# (default sudah cocok untuk SQLite dev)

# 2. Migrasi database
npx prisma migrate dev

# 3. Seed data awal (admin, kategori, 12 produk)
npm run seed

# 4. Jalankan development server
npm run dev
# buka http://localhost:3000
```

## Scripts

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Build produksi |
| `npm run start` | Jalankan hasil build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run seed` | Isi data awal |
| `npm run db:migrate` | Jalankan migrasi Prisma |
| `npm run db:studio` | Buka Prisma Studio |

## Struktur Proyek

```
megakomsel/
├── prisma/
│   ├── schema.prisma          # Model: User, Category, Product, Order, OrderItem, ContactMessage
│   ├── seed.ts                # Data awal
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Landing page
│   │   ├── (auth)/login|register
│   │   ├── store/             # Katalog & detail produk
│   │   ├── cart/              # Keranjang
│   │   ├── checkout/          # Checkout (wajib login)
│   │   └── dashboard/         # Admin: overview, produk CRUD, pesanan, pesan
│   ├── actions/               # Server Actions (auth, products, orders, contact)
│   ├── components/
│   │   ├── site/              # Komponen landing page
│   │   ├── store/             # CartProvider, ProductCard, AddToCart, CheckoutForm
│   │   ├── dashboard/         # Sidebar, ProductForm, OrderStatusSelect
│   │   ├── auth/              # LoginForm, RegisterForm
│   │   └── ui.tsx             # Button, Input, Select, Badge, Card, dll
│   ├── lib/                   # prisma, auth (JWT), validations (Zod), utils, site data
│   └── proxy.ts               # Proteksi rute (pengganti middleware Next 16)
├── public/                    # favicon, aset statis
└── .env.example
```

## Konfigurasi Laragon (vhost megakomsel.com)

1. Tambahkan hosts (`C:\Windows\System32\drivers\etc\hosts`):
   ```
   127.0.0.1 megakomsel.com
   ```
2. Tambah vhost di Laragon → Menu → Apache → `httpd-vhosts.conf`:
   ```apache
   <VirtualHost *:80>
     ServerName megakomsel.com
     ServerAlias www.megakomsel.com
     ProxyPreserveHost On
     ProxyPass / http://localhost:3000/
     ProxyPassReverse / http://localhost:3000/
   </VirtualHost>
   ```
   (Pastikan `mod_proxy` aktif; atau gunakan port langsung `http://localhost:3000` selama pengembangan.)
3. Restart Laragon (Apache) dan jalankan `npm run dev`.

## Database: SQLite (dev) → MySQL/Postgres (produksi)

- **Dev**: `DATABASE_URL="file:./dev.db"` — tanpa setup, file di root proyek (sudah di-ignore git).
- **Produksi (rekomendasi MySQL)**:
  1. Buat database `megakomsel` di hosting.
  2. Ubah `DATABASE_URL` di `.env` (mis. `mysql://user:pass@host:3306/megakomsel`).
  3. Instal adapter: `npm install @prisma/adapter-mariadb mariadb dotenv`.
  4. Ubah `provider` di `prisma/schema.prisma` menjadi `mysql`, lalu sesuaikan resolver di `src/lib/prisma.ts` dan `prisma/seed.ts`.
  5. Jalankan `npm run db:migrate` dan `npm run seed`.

> Catatan: di environment tertentu driver `mariadb` bermasalah dengan MySQL 8 lokal; gunakan `mysql2` bila perlu, atau tetap SQLite untuk dev.

## Roadmap Modul Berikutnya

- [ ] Pembayaran (Midtrans/Xendit) & status pesanan otomatis
- [ ] Upload gambar produk (local disk / object storage)
- [ ] Halaman blog + CMS
- [ ] FAQ dinamis
- [ ] Halaman akun pelanggan (riwayat pesanan)
- [ ] Multi-admin & permission detail
- [ ] PWA / offline mode
- [ ] Analitik & email marketing