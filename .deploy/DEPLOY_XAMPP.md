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

## Auto-Start Setelah Reboot / Mati Lampu

Urutan setelah boot (tanpa perlu login):
1. Service `Apache2.4` (AUTO_START) nyala → situs langsung hidup di **v1 (fallback)**.
2. Service `mysql` (AUTO_START) nyala → DB v1 siap.
3. Node v3: nyala saat **Administrator LOGIN** (task `pm2-megakomsel-v3`, ONLOGON →
   `pm2 resurrect`, process list sudah di-save di `C:\Users\Administrator\.pm2\dump.pm2`).
   Antara boot dan login, situs melayani v1; begitu login, v3 mengambil alih
   dalam hitungan detik (balancer `retry=5`).

PENTING — kenapa tidak pakai Windows service / task ONSTART:
Sudah dicoba tuntas (Agustus 2026) dan semuanya gagal di mesin ini:
- Task ONSTART sebagai SYSTEM: cmd.exe DAN node.exe gagal init (0xC0000142) di sesi 0.
- NSSM: gagal duplikasi filehandle stdin di sesi service.
- WinSW: child node mati 0xC0000142.
- Service langsung (sc create, node sebagai proses service): node JALAN, tapi SCM
  MEMBUNUH prosesnya di detik ke-30 karena protocol dispatcher tidak dipanggil.
- koffi (FFI untuk memanggil StartServiceCtrlDispatcherW): segfault di node 24.
Kesimpulan: service Windows untuk node tidak bisa dipakai di mesin ini tanpa
memperbaiki OS (sfc /scannow, DISM /RestoreHealth, Windows Update) atau
mengganti node ke versi yang kompatibel. Auto-start Node WAJIB lewat mekanisme
sesi login (ONLOGON), bukan session-0.

Agar v3 nyala tanpa login sama sekali (full otomatis): aktifkan **Auto-Logon
Windows** untuk Administrator (netplwiz, atau registry AutoAdminLogon) —
Windows login sendiri saat boot, task ONLOGON langsung jalan.
Konsekuensi: password Administrator tersimpan di registry (risiko keamanan —
hanya disarankan untuk server internal).

Catatan mati lampu: SQLite (`dev.db`) tahan crash; risiko korup sangat kecil.
Disarankan backup berkala:
```
copy D:\xampp\htdocs\v3\dev.db D:\backup\dev.db-YYYYMMDD
```

## Deploy Ulang / Update v3

```bash
cd /d/xampp/htdocs/v3
npm run build          # build baru
pm2 restart megakomsel-v3
```

Perubahan kode tidak butuh sentuh Apache sama sekali (proxy sudah balancer).

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
