/*
Script ini dibagikan gratis oleh Dragon R'Zip.
Hargai pembuat script. Jangan ubah nama, dan jangan diperjualbelikan!

Follow IG: @rizxyz_hunterbugs (kalau punya)
Follow YT: @DragonRzip (Wajib ada sih) 
Follow TT: @belumada (akunnya belum ada) 
*/

const axios = require("axios");
const chalk = require("chalk");
const readline = require("readline");
const crypto = require("crypto");
const fs = require("fs");

let sudahPernahJalan = false;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (q) =>
  new Promise((res) => rl.question(q, (ans) => res(ans.trim())));

const quotesGalau = [
  `"Aku hanya ingin kamu tahu...\npesanku mungkin anonim,\ntapi cintaku nyata."`,
  `"Mungkin kamu tak tahu siapa aku,\ntapi aku selalu tahu tentangmu."`,
  `"Aku menulis tanpa nama...\ntapi harapanku tertulis jelas untukmu."`,
  `"Pesan ini datang diam-diam...\ntapi rasaku tak bisa disembunyikan."`,
  `"Biar pesan ini tetap rahasia...\ntapi semoga kamu bisa merasakannya."`,
  `"Tiap pesan yang terkirim...\nada harapanku di balik setiap hurufnya."`,
  `"Aku memilih diam,\ntapi diamku bukan tanpa rasa."`,
  `"Kalau kamu merasa ini untukmu,\nya itu memang benar."`,
  `"Jangan cari tahu siapa aku,\ncukup rasakan isi pesanku."`,
  `"Kalau kamu bahagia, aku ikut lega...\nwalau bukan karenaku."`
];

const quotesDark = [
  `"Tenang aja, aku gak akan ganggu lagi...\naku cuma bayangan buatmu."`,
  `"Jangan takut kehilangan aku,\nkamu gak pernah benar-benar punya aku."`,
  `"Aku pernah peduli, tapi kamu anggap lucu.\nSekarang aku cuek, baru kamu bingung."`,
  `"Mereka bilang aku berubah,\npadahal cuma sadar siapa yang layak diperjuangkan."`,
  `"Aku ketawa, bukan karena bahagia,\ntapi karena udah gak peduli lagi."`,
  `"Katanya butuh, nyatanya ilang tanpa kabar.\nKatanya sayang, nyatanya cuma buat nyaman sementara."`,
  `"Gak semua yang diam itu lemah,\nkadang diem biar gak makin kecewa."`,
  `"Kamu bukan kehilangan aku,\nkamu kehilangan versi aku yang sayang banget sama kamu."`
];

async function tampilAwal() {
  // Jangan clear biar aman di panel
  console.log(chalk.cyanBright(`
╔════════════════════════════════════════════════════════════╗
║⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣀⣠⣤⣴⡶⠶⠾⠿⠛⠛⠛⠛⠿⠿⠶⢶⣦⣤⣄⣀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄║
║⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣀⣤⡶⠟⠛⠉⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠉⠛⠻⢶⣤⣀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄║
║⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣀⣴⠾⠋⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠙⠷⣦⣄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄║
║⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣠⡼⠋⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠙⢷⣄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄║
║⠄⠄⠄⠄⠄⠄⠄⠄⣠⡾⠋⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠙⢷⣄⠄⠄⠄⠄⠄⠄⠄⠄║
║⠄⠄⠄⠄⠄⠄⣀⡾⠏⠄⠄⠄⠄⢀⣀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣀⡀⠄⠄⠄⠄⠹⢷⣀⠄⠄⠄⠄⠄⠄║
║⠄⠄⠄⠄⢀⣼⠏⠄⠄⠄⡀⣰⣾⡟⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠻⣷⣦⢀⠄⠄⠄⠹⣷⡀⠄⠄⠄⠄║
║⠄⠄⠄⠄⡾⠃⠄⢀⣴⠋⣴⣿⢋⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⡙⣿⣦⠙⣦⡀⠄⠘⢷⡄⠄⠄⠄║
║⠄⠄⠄⣼⠁⠄⢀⣿⡏⢰⠟⢡⡎⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⡠⣤⣀⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢱⣌⠻⡇⢹⣿⡀⠄⠈⢧⠄⠄⠄║
║⠄⠄⣼⠏⣠⡎⢸⣿⢣⣥⡾⠏⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠿⠄⠈⣿⣿⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠙⢷⣬⣜⣿⡇⢱⣄⠸⣧⠄⠄║
║⠄⣸⡟⠄⣿⡇⢸⣷⡿⢋⡔⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⡼⠛⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢢⡙⢿⣾⡇⢸⣿⡀⢻⣇⠄║
║⢀⣿⠁⠄⣿⣧⠸⢋⣴⡿⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⢿⣦⡙⠇⣸⣿⡇⠈⣿⡀║
║⢸⡏⠄⡄⣿⡿⣰⣿⡿⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢿⡿⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⢿⣿⣆⢻⣿⢣⠄⢹⡇║
║⣾⡇⢠⣧⠹⣧⡿⠋⣰⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠠⠄⠠⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣦⠙⢿⣼⠏⢸⡄⢸⣿║
║⣿⠄⠘⣿⡀⢻⢁⣼⡟⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⣴⠄⠛⢿⡿⠛⠄⣲⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢻⣧⡈⡿⢀⣾⠃⠄⣿║
║⣿⠄⠄⢿⣷⠄⣾⣿⠃⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣀⣀⣤⣤⣴⣶⣿⡏⠄⠠⢻⡟⠄⠄⢹⣿⣶⣦⣤⣤⣀⣀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠘⣿⣷⠄⣾⡿⠄⠄⣿║
║⢿⡇⢰⠘⣿⡇⣿⡏⢸⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⣿⣿⣿⣿⣿⣿⣿⡇⠄⠄⣼⣧⠄⠄⢈⣿⣿⣿⣿⣿⣿⣿⡇⠄⠄⠄⠄⠄⠄⠄⠄⢀⡇⢹⣿⢸⣿⠇⡆⢸⡿║
║⢸⣇⠈⣷⠈⢻⣿⠄⣼⣇⠄⠄⠄⠄⠄⠄⠄⠄⢀⣿⣿⣿⣿⣿⣿⣿⣧⠄⠄⣿⣿⠄⠄⣼⣿⣿⣿⣿⣿⣿⣿⡇⠄⠄⠄⠄⠄⠄⠄⠄⣸⣧⠄⣿⡟⠁⣼⠁⣸⡇║
║⠈⣿⡀⠹⣷⣄⠙⠄⣿⣿⢀⠄⠄⠄⠄⠄⠄⠄⢸⣿⣿⣿⣿⣿⣿⣿⣿⣆⠄⣿⣿⠄⣰⣿⣿⣿⣿⣿⣿⣿⣿⡇⠄⠄⠄⠄⠄⠄⠄⡀⣿⣿⠄⠋⣠⣾⡏⢀⣿⠁║
║⠄⢹⣧⠄⠻⣿⣷⡄⣿⣿⠄⣇⠄⠄⠄⠄⠄⠄⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣿⣿⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠄⠄⠄⠄⠄⠄⣠⠄⣿⣿⢠⣾⣿⠟⠄⣼⡏⠄║
║⠄⠄⢻⣆⠡⣈⠻⠿⣞⣿⡄⢸⣆⠄⠄⠄⠄⠄⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠄⠄⠄⠄⠄⣰⣿⢠⣿⣳⠿⠟⣁⠌⢰⡿⠄⠄║
║⠄⠄⠄⢻⡀⠹⣷⣦⣀⠙⠳⣸⣿⣇⢀⡀⠄⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠄⢀⡀⣸⣿⡏⠞⠋⣀⣴⣾⠏⢀⡞⠄⠄⠄║
║⠄⠄⠄⠄⢷⡄⠈⠻⢿⣿⣷⣆⡻⣿⡄⢻⣦⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⣴⡟⢠⣿⢟⣠⣾⣿⡿⠟⠁⢠⡾⠃⠄⠄⠄║
║⠄⠄⠄⠄⠈⢿⣆⠄⠄⣉⠛⠿⢿⣮⣿⣄⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⣠⣿⣵⡿⠿⠛⣉⠄⠄⣰⡿⠁⠄⠄⠄⠄║
║⠄⠄⠄⠄⠄⠄⠙⢷⣄⠈⠓⢦⣤⣤⣤⣭⣥⣭⣿⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⣿⣭⣤⣭⣤⣤⣤⡴⠚⠁⣠⡾⠋⠄⠄⠄⠄⠄⠄║
║⠄⠄⠄⠄⠄⠄⠄⠄⠙⢷⣄⡀⠈⢉⠛⠛⠛⠛⠛⠉⣁⣤⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣤⣈⠉⠙⠛⠛⠛⠛⡉⠁⠄⣠⡾⠋⠄⠄⠄⠄⠄⠄⠄⠄║
║⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠙⢳⣄⡀⠙⠳⢶⣶⣾⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣷⣶⡶⠞⠋⢀⣠⡾⠋⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄║
║⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠙⠻⢶⣄⡀⠄⠄⠄⠄⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠄⠄⠄⠄⢀⣠⣶⠟⠋⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄║
║⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠉⠉⠓⠶⣦⣤⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⣤⣴⡶⠚⠉⠉⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄║
║⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠉⠙⠛⠻⠿⠿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠿⠟⠛⠋⠉⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄║
╚════════════════════════════════════════════════════════════╝
  Powered by Danz | V1.0
  Dev     : Danz Ganteng
  Contact : t.me/afordanz

  Note:
  Pilih kategori quotes yang kamu suka dulu.
  Setelah itu lanjut ke pengisian data spam.

  - Pilihan 1: Quotes Galau
  - Pilihan 2: Quotes Dark
    Contoh: ketik '1'
────────────────────────────────────
`));

  const kategori = await question(chalk.yellow("Masukkan pilihan kamu (1/2): "));
  let quotes = quotesGalau;
  if (kategori === "2") quotes = quotesDark;

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  console.log(chalk.whiteBright(`\nQuotes pilihan kamu:\n${randomQuote}\n`));
  await new Promise(r => setTimeout(r, 5000)); // tampil 5 detik, lalu ilang sendiri

  console.log(chalk.yellowBright("Silakan lanjutkan dengan mengisi data untuk fitur spam...\n"));
}

async function spamNGL(username, message, total, delay) {
  if (sudahPernahJalan) {
    console.log(chalk.red("\n[!] Tools ini hanya bisa dipakai sekali saja!"));
    return;
  }
  sudahPernahJalan = true;

  const url = "https://ngl.link/api/submit";
  let count = 0;
  const start = Date.now();

  while (count < total) {
    const waktu = new Date().toLocaleTimeString("id-ID", { hour12: false });
    const deviceId = crypto.randomBytes(21).toString("hex");

    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Gecko/20100101 Firefox/109.0",
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
      Origin: "https://ngl.link",
      Referer: `https://ngl.link/${username}`,
    };

    const body = new URLSearchParams({
      username,
      question: message,
      deviceId,
      gameSlug: "",
      referrer: "",
    });

    try {
      const res = await axios.post(url, body.toString(), { headers });

      if (res.status === 200) {
        count++;
        console.log(chalk.green(`[${waktu}] [SPAM] Terkirim (${count}/${total})`));
        fs.appendFileSync("hasil_log.txt", `[${waktu}] ${username}: ${message}\n`);
      } else {
        console.log(chalk.red(`[${waktu}] [ERR] Ratelimit, retrying...`));
        await new Promise((r) => setTimeout(r, 1000));
      }
    } catch (err) {
      console.log(chalk.red(`[${waktu}] [ERR] ${err.message}`));
      await new Promise((r) => setTimeout(r, 1000));
    }

    await new Promise((r) => setTimeout(r, delay));
  }

  const totalTime = ((Date.now() - start) / 1000).toFixed(2);
  console.log(chalk.cyanBright(`\n[✓] Spam selesai dalam ${totalTime} detik! Pesan berhasil dikirim semua.`));
}

(async () => {
  await tampilAwal();

  console.log(chalk.cyanBright("====== SPAM BY DANZ ======\n"));

  let username = await question(chalk.yellow("Masukkan username NGL kamu (pakai @): "));
  username = username.replace("@", "");
  if (!username) {
    console.log(chalk.red("[!] Username tidak boleh kosong!"));
    process.exit();
  }

  const message = await question(chalk.yellow("Masukkan pesan anonim: "));
  if (!message) {
    console.log(chalk.red("[!] Pesan tidak boleh kosong!"));
    process.exit();
  }

  const mode = await question(chalk.yellow(
    "\nSelect Spam Mode :\n" +
    "Speed Spam🔥\n" +
    "  1. 50 Pesan (Delay 300ms)\n" +
    "  2. 100 Pesan (Delay 200ms)\n" +
    "  3. 150 Pesan (Delay 150ms)\n" +
    "Brutal Spam☠️\n" +
    "  B1. 500 Pesan (Delay 50ms)\n" +
    "  B2. 1000 Pesan (Delay 50ms)\n" +
    "Low Spam🐢\n" +
    "  L1. 30 Pesan (Delay 3Detik)\n" +
    "  L1. 50 Pesan (Delay 3Detik)\n" +
    "  L3. 100 Pesan (Delay 5Detik)\n" +
    "Normal Shipping 💬\n" +
    "  HAI. (Message Content)\n" +
    "Vip Spam 🎫\n" +
    "  UNLI. ∞ Pesan (Delay 3Detik)\n" +
    "  BRUTAL. 10000 Pesan (Delay 1Detik)\n" +
    "  DANZ. 100000 Pesan (Delay 1ms)\n" +
    "  LOWVIP. 1000000 Pesan (Delay 5Detik)\n" +
    "Masukkan pilihan (example : B2): "
  ));

  let jumlah = 50;
  let delay = 300;

  if (mode === "2") {
    jumlah = 100;
    delay = 200;
  } else if (mode === "3") {
    jumlah = 150;
    delay = 150;
  } else if (mode === "B1") {
    jumlah = 500;
    delay = 50;   
  } else if (mode === "B2") {
    jumlah = 1000;
    delay = 50;   
  } else if (mode === "L1") {
    jumlah = 30;
    delay = 3000;   
  } else if (mode === "L2") {
    jumlah = 50;
    delay = 3000;   
  } else if (mode === "L3") {
    jumlah = 100;
    delay = 5000;  
   } else if (mode === "UNLI") {
    jumlah = 100000000000000000000000000000000000000000000000000000000000000000;
    delay = 3000;
  } else if (mode === "BRUTAL") {
    jumlah = 10000;
    delay = 1000;
  } else if (mode === "DANZ") {
    jumlah = 100000;
    delay = 1; 
  } else if (mode === "LOWVIP") {
    jumlah = 1000000;
    delay = 5000;      
  } else if (mode === "HAI") {
    jumlah = 1;
    delay = 1000;   
  } else if (mode !== "1") {
    console.log(chalk.red("[!] Pilihan tidak valid!"));
    process.exit();
  }

  rl.close();
  await spamNGL(username, message, jumlah, delay);
})();