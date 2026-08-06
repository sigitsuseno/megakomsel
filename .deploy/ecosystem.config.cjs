// PM2 ecosystem — megakomsel (v3) untuk imatechcom.com
// Jalankan: pm2 start D:\xampp\htdocs\v3\.deploy\ecosystem.config.cjs
// Port 3100 (bukan 3000) — port 3000 dipakai vhost anxiety.imatechcom.com
module.exports = {
  apps: [
    {
      name: "megakomsel-v3",
      cwd: "D:/xampp/htdocs/v3",
      script: "D:/xampp/htdocs/v3/node_modules/next/dist/bin/next",
      args: "start -p 3100",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_restarts: 20,
      restart_delay: 3000,
      env: {
        NODE_ENV: "production",
      },
      out_file: "D:/xampp/htdocs/v3/.deploy/logs/out.log",
      error_file: "D:/xampp/htdocs/v3/.deploy/logs/error.log",
      merge_logs: true,
      time: true,
    },
  ],
};
