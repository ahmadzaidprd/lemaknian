// All data + helpers used across the site.
// Edit this file to change menu, prices, contact info, etc.

import type { Paket, MenuItem, Testimoni, GaleriItem, LiveOrder, FAQItem, StatItem, HeroPhoto, BlogPost } from "@/types";

// ─── helpers ──────────────────────────────────────────────
export function formatRupiah(n: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", minimumFractionDigits: 0,
  }).format(n);
}

const NOMOR_WA = "6281234567890"; // ganti dengan nomor WA Bu Yati
export function waLink(pesan: string): string {
  return `https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(pesan)}`;
}

// ─── hero photos (Unsplash food photography) ──────────────
export const heroPhotos: HeroPhoto[] = [
  { url: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=1800&q=80&auto=format&fit=crop", alt: "Rendang dan rempah" },
  { url: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=1800&q=80&auto=format&fit=crop", alt: "Hidangan prasmanan" },
  { url: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=1800&q=80&auto=format&fit=crop", alt: "Sajian tradisional" },
];

// ─── paket ────────────────────────────────────────────────
export const paketData: Paket[] = [
  {
    id: "1", nama: "Personal", slug: "personal", harga_per_pax: 25000, min_pax: 20, icon: "👥",
    deskripsi: "Cocok untuk arisan, syukuran, dan acara keluarga kecil yang intim.",
    fitur: ["Minimum 20 pax", "3 menu utama pilihan", "Prasmanan atau box", "Free ongkir dalam kota", "Konfirmasi via WhatsApp"],
  },
  {
    id: "2", nama: "Hajatan", slug: "hajatan", harga_per_pax: 45000, min_pax: 50, icon: "🎊", popular: true,
    deskripsi: "Paket lengkap untuk hajatan, khitanan, dan acara keluarga besar.",
    fitur: ["Minimum 50 pax", "5 menu utama + 2 lauk", "Prasmanan + 1 gubukan", "Dekorasi meja", "Tim pelayan 3 orang", "Free ongkir radius 20km"],
  },
  {
    id: "3", nama: "Pernikahan", slug: "pernikahan", harga_per_pax: 60000, min_pax: 100, icon: "💍",
    deskripsi: "Paket premium untuk hari spesial. Sajian terbaik, kenangan abadi.",
    fitur: ["Minimum 100 pax", "7 menu utama + dessert", "2 gubukan & live station", "Dekorasi premium", "Tim pelayan profesional", "Dokumentasi acara"],
  },
  {
    id: "4", nama: "Korporat", slug: "korporat", harga_per_pax: 35000, min_pax: 50, icon: "🏢",
    deskripsi: "Solusi catering profesional untuk rapat, seminar, dan acara perusahaan.",
    fitur: ["Minimum 50 pax", "Menu rapat & seminar", "Coffee break tersedia", "Box atau prasmanan", "Invoice & kwitansi resmi", "Bisa tagih instansi"],
  },
];

// ─── menu ─────────────────────────────────────────────────
export const menuData: MenuItem[] = [
  { id: "1",  nama: "Rendang Sapi Bengkulu", kategori: "lauk",    harga: 28000, deskripsi: "Rendang bumbu khas Bengkulu, dimasak 4 jam.",   img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&q=80&auto=format&fit=crop", emoji: "🍛" },
  { id: "2",  nama: "Gulai Rebung Khas",     kategori: "sayur",   harga: 18000, deskripsi: "Gulai rebung asli Bengkulu, santan segar.",     img: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&q=80&auto=format&fit=crop", emoji: "🥘" },
  { id: "3",  nama: "Ikan Bakar Serani",     kategori: "lauk",    harga: 35000, deskripsi: "Ikan segar bakar bumbu serani pesisir.",        img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80&auto=format&fit=crop", emoji: "🐟" },
  { id: "4",  nama: "Ayam Goreng Serundeng", kategori: "lauk",    harga: 22000, deskripsi: "Ayam renyah dengan serundeng kelapa gurih.",    img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80&auto=format&fit=crop", emoji: "🍗" },
  { id: "5",  nama: "Nasi Putih Pulen",      kategori: "nasi",    harga: 8000,  deskripsi: "Nasi pulen dari beras pilihan Bengkulu.",       img: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&q=80&auto=format&fit=crop", emoji: "🍚" },
  { id: "6",  nama: "Sayur Lodeh Terong",    kategori: "sayur",   harga: 15000, deskripsi: "Lodeh terong & labu siam kuah santan.",         img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80&auto=format&fit=crop", emoji: "🥗" },
  { id: "7",  nama: "Kue Tat Bengkulu",      kategori: "dessert", harga: 12000, deskripsi: "Kue tradisional isian nanas otentik.",          img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80&auto=format&fit=crop", emoji: "🍮" },
  { id: "8",  nama: "Puding Karamel",        kategori: "dessert", harga: 10000, deskripsi: "Puding lembut, saus karamel menyegarkan.",      img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80&auto=format&fit=crop", emoji: "🍯" },
  { id: "9",  nama: "Es Teh Manis",          kategori: "minuman", harga: 6000,  deskripsi: "Teh manis segar, sempurna untuk acara siang.",  img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80&auto=format&fit=crop", emoji: "🍹" },
  { id: "10", nama: "Jus Jeruk Segar",       kategori: "minuman", harga: 10000, deskripsi: "Jus jeruk peras langsung, tanpa pengawet.",     img: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&q=80&auto=format&fit=crop", emoji: "🍊" },
  { id: "11", nama: "Risoles Mayo",          kategori: "snack",   harga: 8000,  deskripsi: "Risoles renyah, isian sayur + saus mayo.",      img: "https://images.unsplash.com/photo-1625944525533-473d1a3d29ef?w=600&q=80&auto=format&fit=crop", emoji: "🥟" },
  { id: "12", nama: "Lemper Ayam",           kategori: "snack",   harga: 7000,  deskripsi: "Lemper ketan isi ayam, balut daun pisang.",     img: "https://images.unsplash.com/photo-1625944525533-473d1a3d29ef?w=600&q=80&auto=format&fit=crop", emoji: "🫔" },
];

// ─── testimoni ────────────────────────────────────────────
export const testimoniData: Testimoni[] = [
  { id: "1", nama: "Rina & Dedi",            acara: "Pernikahan 300 pax",     pax: 300, rating: 5, isi: "Pesan online gampang banget, langsung direspon. Hari H semua tepat waktu dan makanannya habis semua — tamu puas!", inisial: "RD" },
  { id: "2", nama: "Pak Hendra Wijaya",      acara: "Dinas Pemkot Bengkulu",  pax: 120, rating: 5, isi: "Sudah 3x pakai Bu Yati untuk acara kantor. Harga transparan, tidak ada biaya dadakan. Paling rekomen se-Bengkulu!", inisial: "HW" },
  { id: "3", nama: "Keluarga Agus Saputra",  acara: "Hajatan rutin tahunan",  pax: 200, rating: 5, isi: "Gulai rebungnya khas banget, beda dari yang lain. Acara keluarga, Bu Yati selalu jadi pilihan pertama.", inisial: "AS" },
  { id: "4", nama: "Nisa & Fahmi",           acara: "Pernikahan 150 pax",     pax: 150, rating: 5, isi: "Kalkulator harga di website sangat membantu buat plan budget. Tahu estimasinya sebelum hubungi vendor!", inisial: "NF" },
  { id: "5", nama: "Bu Dewi Rahayu",         acara: "Arisan PKK Kota",        pax: 60,  rating: 5, isi: "Pelayanan sangat ramah, makanan datang tepat waktu dan masih panas. Teman-teman PKK semua suka!", inisial: "DR" },
  { id: "6", nama: "PT Sumber Rejeki",       acara: "Seminar perusahaan",     pax: 80,  rating: 5, isi: "Coffee break dan makan siang profesional. Invoice langsung dikirim hari itu. Terima kasih Bu Yati!", inisial: "SR" },
];

// ─── galeri ───────────────────────────────────────────────
export const galeriData: GaleriItem[] = [
  { id: "1", judul: "Pernikahan Rina & Dedi",    kategori: "pernikahan", pax: 300, lokasi: "Gedung Serbaguna",  img: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=900&q=80&auto=format&fit=crop", emoji: "💒", deskripsi: "Resepsi mewah 300 tamu di Gedung Serbaguna Kota Bengkulu." },
  { id: "2", judul: "Hajatan Keluarga Saputra",  kategori: "hajatan",    pax: 200, lokasi: "Kota Bengkulu",     img: "https://images.unsplash.com/photo-1555244162-803834f70033?w=900&q=80&auto=format&fit=crop", emoji: "🎊", deskripsi: "Syukuran khitanan dengan hidangan tradisional Bengkulu." },
  { id: "3", judul: "Seminar Pemkot",            kategori: "korporat",   pax: 120, lokasi: "Balai Kota",        img: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=900&q=80&auto=format&fit=crop", emoji: "🏛️", deskripsi: "Coffee break dan makan siang untuk 120 peserta seminar." },
  { id: "4", judul: "Arisan PKK",                kategori: "personal",   pax: 60,  lokasi: "Bengkulu Tengah",   img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80&auto=format&fit=crop", emoji: "👥", deskripsi: "Arisan rutin dengan menu pilihan Bu Yati yang selalu ditunggu." },
  { id: "5", judul: "Nisa & Fahmi",              kategori: "pernikahan", pax: 150, lokasi: "Bengkulu Utara",    img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=80&auto=format&fit=crop", emoji: "💍", deskripsi: "Resepsi intimate 150 tamu dengan sentuhan dekorasi elegan." },
  { id: "6", judul: "Training PT Sumber Rejeki", kategori: "korporat",   pax: 80,  lokasi: "Bengkulu Kota",     img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80&auto=format&fit=crop", emoji: "🏢", deskripsi: "Catering 3 hari untuk training karyawan dengan menu bervariasi." },
  { id: "7", judul: "Syukuran 100 hari",         kategori: "personal",   pax: 40,  lokasi: "Pondok Kelapa",     img: "https://images.unsplash.com/photo-1464195244916-405fa0a82545?w=900&q=80&auto=format&fit=crop", emoji: "🍼", deskripsi: "Syukuran 100 hari kelahiran dengan menu keluarga." },
  { id: "8", judul: "Resepsi Adat",              kategori: "pernikahan", pax: 400, lokasi: "Gedung Wanita",     img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=80&auto=format&fit=crop", emoji: "👰", deskripsi: "Resepsi adat dengan dekorasi tradisional dan 400 tamu." },
];

// ─── live ticker (faux real-time orders) ──────────────────
export const liveOrders: LiveOrder[] = [
  { nama: "Pak Hendra",   paket: "Korporat",   pax: 120, kota: "Bengkulu",   ago: "2 menit lalu" },
  { nama: "Bu Sari",      paket: "Hajatan",    pax: 80,  kota: "Curup",      ago: "5 menit lalu" },
  { nama: "Rini",         paket: "Pernikahan", pax: 250, kota: "Manna",      ago: "12 menit lalu" },
  { nama: "PT Jaya",      paket: "Korporat",   pax: 60,  kota: "Bengkulu",   ago: "18 menit lalu" },
  { nama: "Bu Dewi",      paket: "Personal",   pax: 35,  kota: "Argamakmur", ago: "24 menit lalu" },
  { nama: "Keluarga A.",  paket: "Hajatan",    pax: 150, kota: "Bengkulu",   ago: "31 menit lalu" },
];

// ─── faq ──────────────────────────────────────────────────
export const faqData: FAQItem[] = [
  { q: "Berapa minimum pemesanan?",                       a: "Minimum pemesanan mulai dari 20 pax untuk paket Personal. Paket Hajatan dan Korporat minimum 50 pax, sementara paket Pernikahan minimum 100 pax." },
  { q: "Berapa lama sebelum hari H saya harus pesan?",    a: "Idealnya 2 minggu sebelum hari H supaya kami bisa siapkan menu, dekorasi, dan tim dengan optimal. Untuk acara besar (>200 pax) atau di hari libur, sebaiknya 1 bulan sebelumnya." },
  { q: "Apakah ada DP? Bagaimana sistem pembayaran?",     a: "Iya, DP 30% saat konfirmasi booking. Pelunasan paling lambat 3 hari sebelum hari H. Pembayaran via transfer bank atau cash. Invoice resmi tersedia untuk acara korporat." },
  { q: "Bisa request menu khusus di luar paket?",         a: "Tentu bisa. Kami terbiasa custom menu untuk acara tertentu — menu Padang, menu Jawa, halal-only, hingga menu diet. Konsultasi gratis via WhatsApp." },
  { q: "Apakah ada area yang tidak dilayani?",            a: "Kami melayani seluruh Bengkulu dan kabupaten sekitar. Free ongkir radius 20km dari pusat kota. Di luar itu ada biaya tambahan transport yang ditentukan saat konsultasi." },
  { q: "Bagaimana kalau jumlah tamu berubah mendadak?",   a: "Bisa adjust hingga H-3. Penambahan pax dikenakan harga per pax sesuai paket. Pengurangan pax dikenakan biaya 50% untuk porsi yang sudah disiapkan." },
];

// ─── stats (hero / how-it-works counters) ─────────────────
export const statsData: StatItem[] = [
  { num: 1200, suffix: "+", label: "Event sukses",     barTo: 92 },
  { num: 27,   suffix: "+", label: "Tahun pengalaman", barTo: 80 },
  { num: 98,   suffix: "%", label: "Kepuasan klien",   barTo: 98 },
  { num: 50,   suffix: "+", label: "Varian menu",      barTo: 75 },
];

export const floatIngredients = ["🌶️", "🍚", "🥥", "🌿", "🧄", "🫚", "🌾", "🍋"];

// ─── accent palettes (used by theme controls) ─────────────
export const ACCENT_PALETTES: [string, string, string][] = [
  ["#e8c87a", "#f5e4a8", "#c8a85a"], // Gold (default)
  ["#d97757", "#ec9879", "#b85a3d"], // Terracotta
  ["#a3b18a", "#c4d2a8", "#7d8f6b"], // Hijau daun
  ["#e89370", "#f4b495", "#c46f4f"], // Saffron
  ["#cfa8d6", "#e1c5e6", "#a583b0"], // Plum
];


// ─── blog ─────────────────────────────────────────────────
export const blogData: BlogPost[] = [
  { id: "1", judul: "7 Tips Memilih Catering Pernikahan yang Tepat di Bengkulu",   slug: "tips-memilih-catering-pernikahan-bengkulu", excerpt: "Memilih catering pernikahan adalah keputusan penting. Berikut 7 hal yang wajib kamu perhatikan sebelum memilih vendor catering di Bengkulu.", kategori: "Tips Pernikahan", tanggal: "2025-05-15", emoji: "💍", read_time: 5 },
  { id: "2", judul: "Estimasi Budget Catering untuk 200 Tamu — Panduan Lengkap",   slug: "estimasi-budget-catering-200-tamu",         excerpt: "Bingung menghitung budget catering? Artikel ini akan membantu kamu merencanakan anggaran catering dengan cermat untuk 200 tamu undangan.", kategori: "Budget & Harga",   tanggal: "2025-05-08", emoji: "💰", read_time: 7 },
  { id: "3", judul: "Menu Catering Khas Bengkulu yang Selalu Habis di Setiap Acara", slug: "menu-catering-khas-bengkulu-selalu-habis",  excerpt: "Dari rendang hingga gulai rebung — ini deretan menu khas Bengkulu yang paling sering dipesan dan selalu habis di setiap hajatan.", kategori: "Menu & Resep",    tanggal: "2025-04-28", emoji: "🍛", read_time: 4 },
];
