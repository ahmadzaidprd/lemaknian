/**
 * download-images.mjs
 * Jalankan di ROOT project: node download-images.mjs
 */

import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "public", "images");

const IMAGES = [
  // ── HERO (slideshow background) ──────────────────────────
  { folder: "hero", name: "hero-1-rendang-rempah.jpg",
    url: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=1800&q=85&auto=format&fit=crop" },
  { folder: "hero", name: "hero-2-prasmanan.jpg",
    url: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=1800&q=85&auto=format&fit=crop" },
  { folder: "hero", name: "hero-3-sajian-tradisional.jpg",
    url: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=1800&q=85&auto=format&fit=crop" },

  // ── STORY Bu Yati ─────────────────────────────────────────
  { folder: "story", name: "bu-yati.jpg",
    url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85&auto=format&fit=crop" },

  // ── MENU (12 items) ───────────────────────────────────────
  { folder: "menu", name: "rendang-sapi.jpg",
    url: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&q=85&auto=format&fit=crop" },
  { folder: "menu", name: "gulai-rebung.jpg",
    url: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&q=85&auto=format&fit=crop" },
  { folder: "menu", name: "ikan-bakar.jpg",
    url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=85&auto=format&fit=crop" },
  { folder: "menu", name: "ayam-goreng.jpg",
    url: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=85&auto=format&fit=crop" },
  { folder: "menu", name: "nasi-putih.jpg",
    url: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&q=85&auto=format&fit=crop" },
  { folder: "menu", name: "sayur-lodeh.jpg",
    url: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=85&auto=format&fit=crop" },
  { folder: "menu", name: "kue-tat.jpg",
    url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=85&auto=format&fit=crop" },
  { folder: "menu", name: "puding-karamel.jpg",   // ⚠️ data.ts pakai URL sama dg kue-tat, nanti ganti
    url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=85&auto=format&fit=crop" },
  { folder: "menu", name: "es-teh.jpg",
    url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=85&auto=format&fit=crop" },
  { folder: "menu", name: "jus-jeruk.jpg",
    url: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&q=85&auto=format&fit=crop" },
  { folder: "menu", name: "risoles-mayo.jpg",
    url: "https://images.unsplash.com/photo-1625944525533-473d1a3d29ef?w=600&q=85&auto=format&fit=crop" },
  { folder: "menu", name: "lemper-ayam.jpg",      // ⚠️ data.ts pakai URL sama dg risoles, nanti ganti
    url: "https://images.unsplash.com/photo-1625944525533-473d1a3d29ef?w=600&q=85&auto=format&fit=crop" },

  // ── GALERI (8 items) ──────────────────────────────────────
  { folder: "gallery", name: "pernikahan-rina-dedi.jpg",
    url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=900&q=85&auto=format&fit=crop" },
  { folder: "gallery", name: "hajatan-saputra.jpg",
    url: "https://images.unsplash.com/photo-1555244162-803834f70033?w=900&q=85&auto=format&fit=crop" },
  { folder: "gallery", name: "seminar-pemkot.jpg",
    url: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=900&q=85&auto=format&fit=crop" },
  { folder: "gallery", name: "arisan-pkk.jpg",
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85&auto=format&fit=crop" },
  { folder: "gallery", name: "pernikahan-nisa-fahmi.jpg",
    url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=85&auto=format&fit=crop" },
  { folder: "gallery", name: "training-sumber-rejeki.jpg",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=85&auto=format&fit=crop" },
  { folder: "gallery", name: "syukuran-100-hari.jpg",
    url: "https://images.unsplash.com/photo-1464195244916-405fa0a82545?w=900&q=85&auto=format&fit=crop" },
  { folder: "gallery", name: "resepsi-adat.jpg",
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=85&auto=format&fit=crop" },
];

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`  📁 Dibuat: ${path.relative(process.cwd(), dirPath)}`);
  }
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const request = (targetUrl) => {
      https.get(targetUrl, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          request(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(destPath, () => {});
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          const sizeKB = (fs.statSync(destPath).size / 1024).toFixed(1);
          resolve(sizeKB);
        });
      }).on("error", (err) => {
        file.close();
        fs.unlink(destPath, () => {});
        reject(err);
      });
    };
    request(url);
  });
}

async function main() {
  console.log("\n🚀 Download gambar Lemaknian\n");

  // Buat semua folder
  console.log("Membuat folder struktur:");
  ["hero", "story", "menu", "gallery"].forEach((f) =>
    ensureDir(path.join(PUBLIC_DIR, f))
  );
  console.log();

  const categories = { hero: [], story: [], menu: [], gallery: [] };
  let success = 0, skipped = 0, failed = 0;

  for (const img of IMAGES) {
    const destPath = path.join(PUBLIC_DIR, img.folder, img.name);
    const label = `${img.folder}/${img.name}`;

    if (fs.existsSync(destPath)) {
      const sizeKB = (fs.statSync(destPath).size / 1024).toFixed(1);
      console.log(`  ⏭️  Skip  ${label.padEnd(45)} ${sizeKB} KB`);
      categories[img.folder].push({ name: img.name, size: sizeKB });
      skipped++;
      continue;
    }

    try {
      const sizeKB = await downloadFile(img.url, destPath);
      console.log(`  ✅      ${label.padEnd(45)} ${sizeKB} KB`);
      categories[img.folder].push({ name: img.name, size: sizeKB });
      success++;
    } catch (err) {
      console.log(`  ❌ Gagal ${label} — ${err.message}`);
      failed++;
    }

    await new Promise((r) => setTimeout(r, 350));
  }

  console.log(`\n${"─".repeat(60)}`);
  console.log(`✨ Selesai! ${success} didownload, ${skipped} di-skip, ${failed} gagal`);
  console.log(`📂 Lokasi: public/images/`);
  console.log(`   ├── hero/    (${categories.hero.length} foto background slideshow)`);
  console.log(`   ├── story/   (${categories.story.length} foto Bu Yati)`);
  console.log(`   ├── menu/    (${categories.menu.length} foto menu)`);
  console.log(`   └── gallery/ (${categories.gallery.length} foto galeri)`);

  if (failed === 0) {
    console.log(`\n⚡ Selanjutnya:`);
    console.log(`   1. Ganti data.ts dengan versi lokal (data-lokal.ts yang sudah disiapkan)`);
    console.log(`   2. Ganti <img> → <Image> dari 'next/image' di komponen`);
    console.log(`   3. npm run dev — cek hasilnya\n`);
  }
}

main().catch(console.error);
