// Server Component — tanpa JS sama sekali (tanpa "use client").
// Hero "orbit": foto makanan tradisional berputar melingkar mengelilingi judul.
// Efek ala carousel, TAPI murni CSS (transform = compositor) → TBT ~0.
//  • Judul H1 statis penuh-opacity → kandidat LCP yang andal (anti NO_LCP).
//  • Cincin berputar pelan; tiap foto counter-rotate agar tetap tegak.
//  • <img> biasa (bukan next/image) + webp mini (7–17KB) → ringan & aman dari
//    bug Lighthouse-mobile NO_LCP.

import type { HeroVariant } from "@/types";

interface HeroProps { variant?: HeroVariant }

type Orbiter = { src: string; w: number; h: number; hideSm?: boolean };

// Foto makanan tradisional Indonesia (lokal). Ganti nama file sesuai selera —
// taruh webp-nya di /public/images/hero-float/
const ORBITERS: Orbiter[] = [
  { src: "/images/hero-float/rendang-sapi.webp", w: 420, h: 280 },
  { src: "/images/hero-float/gulai-rebung.webp", w: 420, h: 280, hideSm: true },
  { src: "/images/hero-float/ikan-bakar.webp", w: 420, h: 281 },
  { src: "/images/hero-float/ayam-goreng.webp", w: 420, h: 256 },
  { src: "/images/hero-float/kue-tat.webp", w: 320, h: 480, hideSm: true },
  { src: "/images/hero-float/lemper-ayam.webp", w: 320, h: 454 },
];

export default function Hero(_props: HeroProps) {
  const n = ORBITERS.length;

  return (
    <section id="hero" className="hero-section hero-redesign">
      {/* Glow blobs emas */}
      <div className="hero-glow hero-glow-a" aria-hidden="true" />
      <div className="hero-glow hero-glow-b" aria-hidden="true" />
      <div className="hero-grain" />

      {/* Cincin foto berputar (dekoratif) */}
      <div className="hero-orbit" aria-hidden="true">
        {ORBITERS.map((f, i) => {
          const angle = (i * 360) / n;
          return (
            <span
              key={i}
              className={`hero-orbit-slot${f.hideSm ? " hero-fl-hide-sm" : ""}`}
              style={{ transform: `rotate(${angle}deg) translateY(calc(-1 * var(--r))) rotate(${-angle}deg)` }}
            >
              <img
                src={f.src}
                alt=""
                width={f.w}
                height={f.h}
                decoding="async"
                loading="eager"
                className="hero-orbit-img"
              />
            </span>
          );
        })}
      </div>

      {/* Scrim radial supaya teks tengah selalu kontras */}
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-content hero-content--center">
        <div className="hero-enter" style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: "rgba(var(--card-rgb),0.6)", backdropFilter: "blur(12px)",
          border: "1px solid var(--border)", borderRadius: 999,
          padding: "8px 16px", marginBottom: 24,
        }}>
          <span className="dot-pulse" style={{ background: "var(--accent)" }} />
          <span style={{ color: "var(--text-secondary)", fontSize: 12, letterSpacing: 0.5 }}>
            Catering terpercaya Bengkulu · sejak 1998
          </span>
        </div>

        {/* Judul STATIS = kandidat LCP yang andal */}
        <h1 className="font-display hero-title">
          Pesan catering
          <br />
          <span className="text-accent-gradient" style={{ fontStyle: "italic" }}>
            tanpa ribet.
          </span>
        </h1>

        <p className="hero-subtitle hero-enter" style={{ animationDelay: "0.12s", marginLeft: "auto", marginRight: "auto" }}>
          Isi form, pilih paket, langsung konfirmasi WA.{" "}
          <strong style={{ color: "var(--accent)" }}>1.200+ acara sukses</strong>{" "}
          di Bengkulu — pernikahan, hajatan, hingga korporat.
        </p>

        <div className="hero-btns hero-enter" style={{ animationDelay: "0.22s", justifyContent: "center" }}>
          <a href="#kalkulator" className="btn-primary btn-gold-pulse" style={{ textDecoration: "none" }}>
            Hitung Estimasi Harga →
          </a>
          <a href="#paket" className="btn-secondary"
            style={{ textDecoration: "none", borderColor: "rgba(245,239,230,0.2)", color: "var(--text-primary)" }}>
            Lihat Paket
          </a>
        </div>
      </div>
    </section>
  );
}
