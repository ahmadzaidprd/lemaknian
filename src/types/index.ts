export interface Paket {
  id: string;
  nama: string;
  slug: string;
  harga_per_pax: number;
  min_pax: number;
  deskripsi: string;
  fitur: string[];
  icon: string;
  popular?: boolean;
}

export interface MenuItem {
  id: string;
  nama: string;
  kategori: "nasi" | "lauk" | "sayur" | "dessert" | "minuman" | "snack";
  harga: number;
  deskripsi: string;
  img: string;
  /** emoji fallback used by /menu page */
  emoji?: string;
}

export interface Testimoni {
  id: string;
  nama: string;
  acara: string;
  pax: number;
  rating: number;
  isi: string;
  inisial: string;
}

export interface GaleriItem {
  id: string;
  judul: string;
  kategori: string;
  pax: number;
  lokasi: string;
  img: string;
  /** legacy fields used by /galeri page */
  emoji?: string;
  deskripsi?: string;
}

export interface BlogPost {
  id: string;
  judul: string;
  slug: string;
  excerpt: string;
  kategori: string;
  tanggal: string;
  emoji: string;
  read_time: number;
}

export interface LiveOrder {
  nama: string;
  paket: string;
  pax: number;
  kota: string;
  ago: string;
}

export interface FAQItem { q: string; a: string; }

export interface StatItem { num: number; suffix: string; label: string; barTo: number; }

export interface HeroPhoto { url: string; alt: string; }

export interface BookingForm {
  nama: string;
  wa: string;
  email?: string;
  jenis_acara: string;
  jumlah_tamu: number;
  tanggal: string;
  lokasi: string;
  paket: string;
  catatan?: string;
}

export type Theme = "dark" | "light";
export type HeroVariant = "bigType" | "centerStack" | "splitMarquee";
