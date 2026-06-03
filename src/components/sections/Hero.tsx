// Server Component — tanpa JS sama sekali (tanpa "use client").
// Redesign "floating food" yang ringan & elegan:
//  • Judul H1 statis penuh-opacity → kandidat LCP yang andal (anti NO_LCP).
//  • Kartu foto makanan "melayang" pakai animasi MURNI CSS (compositor, bukan
//    main-thread) → TBT ~0.
//  • Pakai <img> biasa (bukan next/image) untuk float agar tak kena bug
//    Lighthouse-mobile NO_LCP pada next/image. File webp-nya sudah mini (5–24KB).

import type { HeroVariant } from "@/types";

interface HeroProps { variant?: HeroVariant }

type Floater = {
  src: string; w: number; h: number;
  style: React.CSSProperties; hideSm?: boolean;
};

const FLOATERS: Floater[] = [
  { src: "/images/hero-float/rendang-sapi.webp", w: 420, h: 280,
    style: { top: "14%", left: "6%", width: 220, ["--rot" as any]: "-7deg", ["--dur" as any]: "6.5s" } },
  { src: "/images/hero-float/ikan-bakar.webp", w: 420, h: 281,
    style: { top: "20%", right: "7%", width: 200, ["--rot" as any]: "6deg", ["--dur" as any]: "7.2s", ["--dly" as any]: "-1.5s" } },
  { src: "/images/hero-float/kue-tat.webp", w: 320, h: 480,
    style: { bottom: "12%", left: "11%", width: 150, ["--rot" as any]: "5deg", ["--dur" as any]: "8s", ["--dly" as any]: "-0.8s" }, hideSm: true },
  { src: "/images/hero-float/ayam-goreng.webp", w: 420, h: 256,
    style: { bottom: "14%", right: "9%", width: 200, ["--rot" as any]: "-6deg", ["--dur" as any]: "6.8s", ["--dly" as any]: "-2.2s" } },
  { src: "/images/hero-float/risoles-mayo.webp", w: 420, h: 280,
    style: { top: "50%", left: "2%", width: 130, ["--rot" as any]: "8deg", ["--dur" as any]: "7.6s", ["--dly" as any]: "-3s" }, hideSm: true },
  { src: "/images/hero-float/lemper-ayam.webp", w: 320, h: 454,
    style: { top: "44%", right: "2%", width: 130, ["--rot" as any]: "-9deg", ["--dur" as any]: "8.4s", ["--dly" as any]: "-1.1s" }, hideSm: true },
];

export default function Hero(_props: HeroProps) {
  return (
    <section id="hero" className="hero-section hero-redesign">
      {/* Glow blobs emas */}
      <div className="hero-glow hero-glow-a" aria-hidden="true" />
      <div className="hero-glow hero-glow-b" aria-hidden="true" />
      <div className="hero-grain" />

      {/* Kartu foto makanan melayang (dekoratif) */}
      <div className="hero-floats" aria-hidden="true">
        {FLOATERS.map((f, i) => (
          <img
            key={i}
            src={f.src}
            alt=""
            width={f.w}
            height={f.h}
            decoding="async"
            loading="eager"
            className={`hero-fl${f.hideSm ? " hero-fl-hide-sm" : ""}`}
            style={f.style}
          />
        ))}
      </div>

      {/* Scrim radial supaya teks selalu kontras di tengah */}
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
