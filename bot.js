// Bot Telegram Info Airdrop Gratis — tanpa dependensi, pakai fetch bawaan Node.
// Token diisi lewat environment variable TELEGRAM_BOT_TOKEN di Altare (jangan taruh token di repo).
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (!TOKEN) { console.error('TELEGRAM_BOT_TOKEN belum diisi'); process.exit(1); }
const API = 'https://api.telegram.org/bot' + TOKEN;
const CHANNEL = 'https://t.me/infoairdropgratis22';

const AIRDROPS = [
  '1. Streak — klaim Raccoon Stash harian di https://streak.app',
  '2. Agent ID Daily Check-in — check-in harian pemegang Agent ID',
  '3. memebitcoin.org — Find Satoshi, 10x crack gratis per hari',
  '4. PXIO Miner — klaim storage $PXIO tiap penuh',
  '5. TermiX — garapan gratis 0.20 USDT (Four Meme, Agents Helping Agents)',
];

const TEXT = {
  start: '🎁 Halo! Ini bot Info Airdrop Gratis.\n\nInfo airdrop gratis tiap hari — garapan tanpa modal, cukup HP + kuota.\n\nPerintah:\n/airdrop — daftar garapan hari ini\n/channel — gabung channel Telegram\n/help — bantuan',
  airdrop: '🎁 Garapan hari ini:\n\n' + AIRDROPS.join('\n') + '\n\n⚠️ DYOR — bukan saran finansial.',
  channel: '📢 Channel kami: ' + CHANNEL + '\n\nGabung biar tidak ketinggalan info airdrop tiap hari.',
  help: 'Perintah bot:\n/start — sapaan awal\n/airdrop — daftar garapan hari ini\n/channel — link channel Telegram\n/help — bantuan ini',
};

let offset = 0;
async function api(method, body, ms) {
  const r = await fetch(API + '/' + method, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body || {}),
    signal: AbortSignal.timeout(ms || 15000),
  });
  return r.json();
}
async function loop() {
  console.log('Bot Info Airdrop Gratis jalan...');
  // Tes koneksi + token di awal: kalau gagal, keluar biar Altare restart.
  try {
    const me = await api('getMe', {}, 15000);
    if (!me.ok) { console.error('getMe gagal:', JSON.stringify(me)); process.exit(1); }
    console.log('Bot terhubung: @' + me.result.username);
  } catch (e) { console.error('getMe error:', e.message); process.exit(1); }
  while (true) {
    try {
      const data = await api('getUpdates', { offset, timeout: 30 }, 35000);
      if (data.ok && data.result) {
        for (const u of data.result) {
          offset = u.update_id + 1;
          const msg = u.message;
          if (!msg || !msg.text) continue;
          const cmd = msg.text.trim().split(' ')[0].replace('/', '').toLowerCase();
          const reply = TEXT[cmd] || 'Perintah tidak dikenal. Ketik /help untuk daftar perintah.';
          await api('sendMessage', { chat_id: msg.chat.id, text: reply });
        }
      }
    } catch (e) { console.error('Poll error:', e.message); }
    await new Promise((r) => setTimeout(r, 1000));
  }
}
loop();
