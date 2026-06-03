// Server Component (tanpa "use client") — hero dirender penuh di SSR.
// Tujuan: judul H1 langsung tampil (opacity 1) tanpa menunggu JS, sehingga
// Lighthouse PASTI menemukan kandidat LCP → tidak lagi NO_LCP. Juga membuang
// slider/magnet/parallax JS dari hero → TBT lebih kecil & bundle JS lebih ringan.

import { heroPhotos } from "@/lib/data";
import type { HeroVariant } from "@/types";

interface HeroProps { variant?: HeroVariant }

export default function Hero(_props: HeroProps) {
  const photo = heroPhotos[0];

  return (
    <section id="hero" className="hero-section">
      {/* Background foto via CSS background-image (BUKAN <Image>).
          Alasan: background image dikecualikan dari kandidat LCP oleh spec,
          jadi tidak terkena bug Lighthouse mobile NO_LCP pada next/image.
          Dengan begitu judul H1 statis-lah yang jadi kandidat LCP → selalu
          terdeteksi. Gambar tetap cepat karena di-preload di layout <head>.
          (Decorative → role/aria-label untuk aksesibilitas.) */}
      <div
        className="hero-photo active"
        role="img"
        aria-label={photo.alt}
        style={{
          backgroundImage: `url('${photo.url}')`,
          backgroundSize: "cover",
          backgroundPosition: "center 50%",
        }}
      />
      <div className="hero-vignette" />
      <div className="hero-grain" />

      <div className="hero-content">
        {/* Badge */}
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

        {/* Judul — STATIS & terlihat penuh sejak SSR = kandidat LCP yang andal */}
        <h1 className="font-display hero-title">
          Pesan catering
          <br />
          <span className="text-accent-gradient" style={{ fontStyle: "italic" }}>
            tanpa ribet.
          </span>
        </h1>

        <p className="hero-subtitle hero-enter" style={{ animationDelay: "0.12s" }}>
          Isi form, pilih paket, langsung konfirmasi WA.{" "}
          <strong style={{ color: "var(--accent)" }}>1.200+ acara sukses</strong>{" "}
          di Bengkulu — pernikahan, hajatan, hingga korporat.
        </p>

        <div className="hero-btns hero-enter" style={{ animationDelay: "0.22s" }}>
          <a href="#kalkulator" className="btn-primary btn-gold-pulse" style={{ textDecoration: "none" }}>
            Hitung Estimasi Harga →
          </a>
          <a href="#paket" className="btn-secondary"
            style={{ textDecoration: "none", borderColor: "rgba(245,239,230,0.2)", color: "var(--text-primary)" }}>
            Lihat Paket
          </a>
        </div>
      </div>

      {/* Scroll indicator — desktop only */}
      <div className="hidden-mobile" style={{
        position: "absolute", bottom: 32, right: 32, zIndex: 6,
        color: "var(--text-secondary)", fontSize: 11, letterSpacing: 1,
        textTransform: "uppercase", display: "flex", alignItems: "center", gap: 10,
      }}>
        <span>Scroll</span>
        <div className="scroll-line-anim" />
      </div>
    </section>
  );
}
