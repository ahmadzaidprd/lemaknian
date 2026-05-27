# Lemaknian — Catering Bengkulu by Bu Yati

Website catering modern untuk Bu Yati Catering Bengkulu.
Next.js 14 + Tailwind CSS + TypeScript, siap deploy ke Vercel atau Cloudflare Pages.

## Quick Start

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Highlights

- **Homepage 10 section** dengan animasi keren di setiap section
- **Dark / Light mode** — toggle di navbar, default dark, tersimpan di localStorage
- **Hero 3 variant** — `bigType`, `centerStack`, `splitMarquee` (ganti di `src/app/page.tsx`)
- **Animasi:** scroll reveal, text split, 3D tilt, magnet cursor, parallax, counter bar, orbital food, marquee, live order ticker
- **Foto Unsplash** — siap diganti dengan foto asli (edit `src/lib/data.ts`)

## Struktur Homepage

```
Hero  →  How It Works  →  Story Bu Yati  →  Calculator  →  Packages
   →  Menu Preview  →  Gallery  →  Testimonials  →  FAQ  →  CTA
```

## Konfigurasi

### Nomor WhatsApp
Edit `src/lib/data.ts`:
```ts
const NOMOR_WA = "6281274203815"; // ganti dengan nomor asli
```

### Menu & Paket
Edit `src/lib/data.ts` — semua data (paket, menu, testimoni, galeri, FAQ, dst) ada di satu file.

### Foto
Default pakai Unsplash. Ganti URL `img` di `paketData` / `menuData` / `galeriData` dengan foto asli.

### Warna aksen
Edit CSS variables di `src/app/globals.css`:
```css
:root {
  --accent: #e8c87a;     /* gold default */
  --accent-light: #f5e4a8;
  --accent-dim: #c8a85a;
}
```
Atau pakai salah satu palette di `ACCENT_PALETTES` (`src/lib/data.ts`).

### Hero variant
Edit `src/app/page.tsx`:
```tsx
<Hero variant="bigType" />        // default
<Hero variant="centerStack" />    // foto + ingredients orbit
<Hero variant="splitMarquee" />   // marquee menu di belakang
```

## Tech Stack

- **Next.js 14** — App Router
- **TypeScript** — type safety
- **Tailwind CSS** — utility styling (digunakan minimal; banyak inline styles biar cocok dengan CSS variables theme)
- **Fraunces + Inter** — display serif + body sans (Google Fonts)
- **Framer Motion** — tersedia tapi tidak digunakan (animations pakai vanilla IntersectionObserver + requestAnimationFrame untuk performa)

## Deploy

### Vercel (paling gampang)
```bash
npx vercel
```

### Cloudflare Pages
1. Push ke GitHub
2. Pages → Connect to Git → pilih repo
3. Framework: Next.js
4. Build command: `npm run build`
5. Deploy

---

Built with ❤️ untuk Bu Yati Catering Bengkulu
