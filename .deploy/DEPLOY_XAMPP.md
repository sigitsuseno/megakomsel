# DEPLOY v3 (megakomsel/Next.js) ke XAMPP — imatechcom.com

> Status: SUDAH TERPASANG (Agustus 2026). Dokumen ini adalah catatan kondisi
> final + panduan operasional, bukan rencana.

## Arsitektur Final

```
Browser ──► https://imatechcom.com (Apache :443, SSL)
              │
              ▼
        balancer://v3cluster  (mod_proxy_balancer, lbmethod=byrequests)
        ├── Member 1 (PRIMARY): http://127.0.0.1:3100   → v3 Next.js (Node, pm2)
        └── Member 2 (HOT STANDBY, status=+H): https://127.0.0.1:8080
                                                      → v1 Laravel (fallback)
```

- Node hidup  → yang dilayani v3 (megakomsel)
- Node mati   → otomatis v1 (Laravel imatechcom), tanpa downtime
- Node hidup lagi → balik ke v3 dalam ~5 detik (member `retry=5`)
- http:// → redirect permanent ke https://

## Komponen

| Bagian | Lokasi |
|--------|--------|
| Project v3 | `D:\xampp\htdocs\v3` (Next.js 16, Prisma+SQLite `dev.db`) |
| Project v1 (fallback) | `D:\xampp\htdocs\v1` (Laravel 10) — TIDAK diubah sama sekali |
| PM2 app | `megakomsel-v3` — `D:\xampp\htdocs\v3\.deploy\ecosystem.config.cjs` |
| PM2 log | `D:\xampp\htdocs\v3\.deploy\logs\{out,error}.log` |
| Git hook auto-deploy | `D:\xampp\htdocs\v3\.deploy\hooks\post-merge` (dipicu `git pull`) |
| Deploy log | `D:\xampp\htdocs\v3\.deploy\logs\deploy.log` |
| Vhost imatechcom | `D:\xampp\apache\conf\extra\httpd-vhosts.conf` |
| Vhost fallback :8080 | file yang sama (blok `127.0.0.1:8080`) |
| SSL imatechcom | `D:\xampp\apache\conf\ssl_imatech\ssl.cert` / `ssl.key` |

## Port yang Dipakai

- `3100` — v3 Next.js (PM2). Sengaja BUKAN 3000: vhost `anxiety.imatechcom.com`
  sudah mengarah ke `localhost:3000`.
- `8080` — internal fallback Laravel v1, listen hanya di `127.0.0.1`
  (baris `Listen 127.0.0.1:8080` di httpd-vhosts.conf).

## Operasional Harian

```bash
# Cek status
C:\Users\Administrator\AppData\Roaming\npm\pm2.cmd list

# Restart v3
C:\Users\Administrator\AppData\Roaming\npm\pm2.cmd restart megakomsel-v3

# Stop v3 (website otomatis pindah ke v1)
C:\Users\Administrator\AppData\Roaming\npm\pm2.cmd stop megakomsel-v3

# Lihat log
C:\Users\Administrator\AppData\Roaming\npm\pm2.cmd logs megakomsel-v3
```

Catatan: pm2 TIDAK ada di PATH git-bash — pakai path penuh di atas,
atau tambahkan `C:\Users\Administrator\AppData\Roaming\npm` ke PATH.

## Auto-Start Setelah Reboot

1. Apache: service `Apache2.4` (set ke Automatic di services.msc).
2. Node: scheduled task `pm2-megakomsel-v3` (ONLOGON Administrator) →
   `cmd /c C:\Users\Administrator\AppData\Roaming\npm\pm2.cmd resurrect`.
   (pm2 process list sudah di-save: `pm2 save` → `C:\Users\Administrator\.pm2\dump.pm2`.)
3. Kalau server reboot dan pm2 belum sempat start → website otomatis
   fallback ke v1 (aman), lalu balik ke v3 saat user login.

## Deploy Ulang / Update v3 — CUKUP `git pull`

Server memakai git hook `post-merge` (`.deploy/hooks/post-merge`) yang otomatis
menjalankan: `npm install` → `prisma generate` + `prisma migrate deploy` →
`npm run build` → `pm2 restart megakomsel-v3`. Jadi update kode cukup:

```bash
cd /d/xampp/htdocs/v3
git pull
```

Log proses ada di `.deploy/logs/deploy.log` (folder ini di-gitignore, tidak
ikut commit). Perubahan kode tidak butuh sentuh Apache sama sekali (proxy sudah balancer).

### Setup (sekali saja, setelah repo pertama di-clone/pull)

```bash
cd /d/xampp/htdocs/v3
npm run deploy:setup     # = git config core.hooksPath .deploy/hooks
git config core.hooksPath   # harus menampilkan: .deploy/hooks
```

### Catatan

- `git pull` tanpa perubahan baru → hook TIDAK dijalankan (aman, tidak build ulang).
- `git pull --rebase` TIDAK memicu hook — gunakan `git pull` biasa.
- Kalau build gagal, hook keluar non-zero tapi proses PM2 lama tetap berjalan;
  cek detail dengan `npm run build` manual di folder tersebut.
- `.deploy/logs/out.log` & `error.log` (ditulis PM2) sekarang di-gitignore
  supaya tidak membuat working tree kotor.

## Migrasi DB (kalau perlu)

```bash
cd /d/xampp/htdocs/v3
npx prisma generate
npx prisma migrate deploy   # pakai deploy, bukan dev, di produksi
npm run seed                # kalau butuh data awal
```

## Verifikasi Cepat

```bash
# Harusnya: <title>Megakomsel — ...</title> (v3)
curl -sk --resolve imatechcom.com:443:127.0.0.1 https://imatechcom.com/ | grep -o '<title>[^<]*</title>'

# Stop node, ulangi: harusnya <title>Imatechcom</title> (v1)
pm2 stop megakomsel-v3
```

## Trouble

- **Apache error `BalancerMember unknown Worker parameter`** → jangan pakai
  `hot_standby=On` di Apache 2.4.56; pakai `status=+H`.
- **Fallback tidak jalan** → cek `https://127.0.0.1:8080/` bisa diakses
  (`curl -sk`), cek log `D:\xampp\apache\logs\imatechcom-error.log`.
- **502 terus** → port 3100 mati dan 8080 ikut mati (Apache down?). Cek
  `netstat -ano | findstr :3100` dan service Apache2.4.
- **Perlu `mod_lbmethod_byrequests`**: sudah di-uncomment di httpd.conf
  (baris `LoadModule lbmethod_byrequests_module ...`). Jangan dinonaktifkan.
