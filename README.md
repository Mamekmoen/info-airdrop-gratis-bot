# Bot Telegram Info Airdrop Gratis

Bot Telegram sederhana (Node.js, tanpa dependensi) — jalan 24 jam di Altare.

Perintah: `/start`, `/airdrop`, `/channel`, `/help`.

## 1. Buat bot di Telegram (gratis, 2 menit)

1. Buka Telegram → cari **@BotFather** → `/newbot`
2. Ikuti langkahnya, beri nama bot (misal: Info Airdrop Gratis)
3. Salin token yang diberikan BotFather (format `123456:ABC...`)

## 2. Deploy di Altare (gratis)

1. Console Altare → Create app → tab **GitHub** → pilih repo ini
2. Altare mendeteksi Node.js otomatis, start command: `npm start`
3. Di pengaturan app, tambah Environment Variable:
   - Key: `TELEGRAM_BOT_TOKEN`
   - Value: token dari BotFather
4. Start app — bot langsung online

⚠️ Jangan pernah taruh token di repo atau dibagikan ke orang lain.
