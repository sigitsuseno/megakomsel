# DEPLOY MEGAKOMSEL ke XAMPP (Windows Server)

## Arsitektur

```
Browser ──► Apache (XAMPP) :80 ──► Node.js (Next.js) :3000
              │  │
              │  └── Node mati? ──► maintenance.html (fallback otomatis)
              └── megakomsel.com (vhost reverse proxy)
```

Karena app ini full-stack (SSR, Server Actions, API routes), Node.js WAJIB jalan.
Apache cuma jadi pintu masuk + penyedia fallback.

---

## PRASYARAT DI SERVER

1. XAMPP sudah terinstall (Apache aktif di port 80)
2. Node.js 20+ terinstall (cek: `node -v`)
3. PM2 terinstall (opsional tapi disarankan): `npm i -g pm2`
4. Project megakomsel sudah dicopy ke server
   (folder lengkap termasuk .next hasil build, atau build ulang di server)

---

## LANGKAH 1 — Siapkan .env di server

Buat file `.env` di folder project (copy dari `.env.example`):

```
DATABASE_URL="file:./dev.db"
AUTH_SECRET="<generate random 64+ char>"
```

Generate secret:
```
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Catatan: dev.db (SQLite) ikut dicopy kalau mau data lama; kalau mau fresh,
hapus dev.db lalu jalankan `npm run db:migrate` + `npm run seed` di server.

---

## LANGKAH 2 — Install dependencies & build (kalau belum di server)

```
cd C:\xampp\htdocs\megakomsel   (atau folder project di server)
npm install
npm run build
```

---

## LANGKAH 3 — Jalankan Node.js (pakai PM2)

```
npm i -g pm2
pm2 start "npm run start" --name megakomsel
pm2 save
pm2 startup   # ikuti instruksi yang muncul, biar auto-start saat reboot
```

Tes: buka `http://127.0.0.1:3000` — harus muncul landing page.

Kalau tanpa PM2 (manual):
```
npm run start
```

---

## LANGKAH 4 — Konfigurasi Apache (XAMPP)

1. Buka `C:\xampp\apache\conf\httpd.conf`
2. Pastikan modul proxy aktif (hapus tanda # kalau masih ada):
   ```
   LoadModule proxy_module modules/mod_proxy.so
   LoadModule proxy_http_module modules/mod_proxy_http.so
   ```
3. Buka `C:\xampp\apache\conf\extra\httpd-vhosts.conf`
4. Tambahkan isi file `vhost-megakomsel.conf.txt` (di folder .deploy)
   DI BAWAH blok vhost localhost default.
5. Copy `maintenance.html` ke `C:\xampp\htdocs\maintenance.html`
6. Edit `C:\Windows\System32\drivers\etc\hosts` (butuh admin):
   ```
   127.0.0.1 megakomsel.com
   ```
7. Restart Apache (XAMPP Control Panel → Apache → Stop → Start)

---

## LANGKAH 5 — Verifikasi

| Tes | Cara | Hasil |
|-----|------|-------|
| App normal | buka http://megakomsel.com | Landing page |
| Fallback | stop PM2 (`pm2 stop megakomsel`), buka lagi | maintenance.html |
| Node nyala lagi | `pm2 start megakomsel` | App normal lagi |

---

## TROUBLESHOOTING

- **502 Bad Gateway** tapi Node hidup → cek port: `netstat -ano | findstr :3000`,
  pastikan ProxyPass arahnya 127.0.0.1:3000.
- **Apache nggak mau start setelah edit vhost** → cek syntax:
  `C:\xampp\apache\bin\httpd.exe -t`
- **Fallback nggak muncul** → pastikan maintenance.html ada di htdocs
  dan ErrorDocument pakai path `/maintenance.html` (slash depan).
- **App error database** → cek dev.db ada di folder project & .env benar.
