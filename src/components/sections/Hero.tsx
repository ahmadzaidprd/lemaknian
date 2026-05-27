"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal, SplitText, MagnetButton } from "@/components/animations";
import { heroPhotos, floatIngredients, menuData } from "@/lib/data";
import type { HeroVariant } from "@/types";

interface HeroProps { variant?: HeroVariant }

export default function Hero({ variant = "bigType" }: HeroProps) {
  const [photoIdx, setPhotoIdx] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const t = setInterval(() => setPhotoIdx((i) => (i + 1) % heroPhotos.length), 5800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onScroll = () => {
      const sc = window.scrollY;
      // Dulu: p.style.backgroundPosition = `center ${50 + sc * 0.04}%`
      // Sekarang: ubah objectPosition di <img> dalam .hero-photo
      el.querySelectorAll<HTMLDivElement>(".hero-photo").forEach((p) => {
        const img = p.querySelector<HTMLImageElement>("img");
        if (img) img.style.objectPosition = `center ${50 + sc * 0.04}%`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="hero" ref={heroRef} className="hero-section">
      {variant === "bigType"      && <HeroBigType photoIdx={photoIdx} />}
      {variant === "centerStack"  && <HeroCenterStack photoIdx={photoIdx} />}
      {variant === "splitMarquee" && <HeroSplitMarquee photoIdx={photoIdx} />}

      {/* photo indicator pills */}
      <div style={{
        position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: 8, zIndex: 6,
      }}>
        {heroPhotos.map((_, i) => (
          <button key={i} onClick={() => setPhotoIdx(i)} aria-label={`photo ${i + 1}`} style={{
            width: i === photoIdx ? 28 : 6, height: 6, padding: 0, border: 0,
            borderRadius: 999, cursor: "pointer",
            background: i === photoIdx ? "var(--accent)" : "rgba(245,239,230,0.25)",
            transition: "width 0.4s, background 0.3s",
          }} />
        ))}
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

/* ── HeroPhoto: wrapper reusable ── */
// Menggantikan pola backgroundImage + backgroundPosition.
// Next.js <Image fill> otomatis serve WebP & resize sesuai viewport.
// Parallax tetap jalan via objectPosition (diubah dari scroll handler di atas).
function HeroPhoto({ p, i, photoIdx, opacity }: {
  p: { url: string; alt: string };
  i: number;
  photoIdx: number;
  opacity: number;
}) {
  return (
    <div
      className={`hero-photo ${i === photoIdx ? "active" : ""}`}
      style={{ overflow: "hidden", opacity: i === photoIdx ? opacity : 0 }}
    >
      <Image
        src={p.url}
        alt={p.alt}
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center 50%" }}
        // priority hanya untuk foto pertama (yang tampil saat halaman dibuka)
        priority={i === 0}
        quality={85}
      />
    </div>
  );
}

/* ── variant A: bigType ── */
function HeroBigType({ photoIdx }: { photoIdx: number }) {
  return (
    <>
      {heroPhotos.map((p, i) => (
        <HeroPhoto key={i} p={p} i={i} photoIdx={photoIdx} opacity={1} />
      ))}
      <div className="hero-vignette" />
      <div className="hero-grain" />

      <div style={{
        position: "absolute", inset: 0,
        display: "grid", placeItems: "center",
        pointerEvents: "none", opacity: 0.07, mixBlendMode: "overlay",
        overflow: "hidden",
      }}>
        <div className="font-display hero-bg-text">LEMAKNIAN</div>
      </div>

      <div className="hero-content">
        <Reveal delay={100}>
          <div style={{
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
        </Reveal>

        <h1 className="font-display hero-title">
          <SplitText text="Pesan catering" stagger={70} delay={100} />
          <br />
          <span className="text-accent-gradient" style={{ fontStyle: "italic" }}>
            <SplitText text="tanpa ribet." stagger={70} delay={400} />
          </span>
        </h1>

        <Reveal delay={700}>
          <p className="hero-subtitle">
            Isi form, pilih paket, langsung konfirmasi WA.{" "}
            <strong style={{ color: "var(--accent)" }}>1.200+ acara sukses</strong>{" "}
            di Bengkulu — pernikahan, hajatan, hingga korporat.
          </p>
        </Reveal>

        <Reveal delay={900}>
          <div className="hero-btns">
            <MagnetButton as="a" href="#kalkulator" className="btn-primary btn-gold-pulse" style={{ textDecoration: "none" }}>
              Hitung Estimasi Harga →
            </MagnetButton>
            <MagnetButton as="a" href="#paket" className="btn-secondary"
              style={{ textDecoration: "none", borderColor: "rgba(245,239,230,0.2)", color: "var(--text-primary)" }}>
              Lihat Paket
            </MagnetButton>
          </div>
        </Reveal>
      </div>
    </>
  );
}

/* ── variant B: centerStack ── */
function HeroCenterStack({ photoIdx }: { photoIdx: number }) {
  return (
    <>
      {heroPhotos.map((p, i) => (
        <HeroPhoto key={i} p={p} i={i} photoIdx={photoIdx} opacity={0.55} />
      ))}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at 50% 60%, rgba(var(--photo-tint),0.4) 0%, rgba(var(--photo-tint),0.95) 100%)",
      }} />
      <div className="hero-grain" />

      <div className="hidden-mobile" style={{ position: "absolute", top: "50%", left: "50%", width: 0, height: 0, pointerEvents: "none" }}>
        {floatIngredients.map((emo, i) => (
          <div key={i} className="orbit-anim" style={{
            position: "absolute", fontSize: 36 + (i % 3) * 8,
            animationDelay: `${-(i * 18 / floatIngredients.length)}s`,
            animationDuration: `${22 + (i % 3) * 6}s`,
            filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))",
          }}>{emo}</div>
        ))}
      </div>

      <div className="hero-content">
        <Reveal delay={100}>
          <div style={{ color: "var(--accent)", fontSize: 13, letterSpacing: 4, textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>
            · Bu Yati Catering · Bengkulu ·
          </div>
        </Reveal>
        <h1 className="font-display hero-title">
          <div><SplitText text="Catering" stagger={80} /></div>
          <div className="text-accent-gradient" style={{ fontStyle: "italic" }}>
            <SplitText text="dengan hati." stagger={80} delay={300} />
          </div>
        </h1>
        <Reveal delay={700}>
          <p className="hero-subtitle">
            27 tahun memasak untuk pernikahan, hajatan, dan acara korporat se-Bengkulu.
          </p>
        </Reveal>
        <Reveal delay={900}>
          <div className="hero-btns">
            <MagnetButton as="a" href="#kalkulator" className="btn-primary btn-gold-pulse" style={{ textDecoration: "none" }}>
              Mulai Pesan
            </MagnetButton>
            <MagnetButton as="a" href="#cara-pesan" className="btn-secondary"
              style={{ textDecoration: "none", color: "var(--text-primary)", borderColor: "rgba(245,239,230,0.2)" }}>
              Cara Pesan
            </MagnetButton>
          </div>
        </Reveal>
      </div>
    </>
  );
}

/* ── variant C: splitMarquee ── */
function HeroSplitMarquee({ photoIdx }: { photoIdx: number }) {
  const marqueeItems = [...menuData, ...menuData];
  return (
    <>
      {heroPhotos.map((p, i) => (
        <HeroPhoto key={i} p={p} i={i} photoIdx={photoIdx} opacity={0.4} />
      ))}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(var(--photo-tint),0.85) 0%, rgba(var(--photo-tint),0.55) 50%, rgba(var(--photo-tint),0.95) 100%)",
      }} />
      <div className="hero-grain" />

      <div style={{ position: "absolute", top: "18%", left: 0, right: 0, opacity: 0.18, pointerEvents: "none", overflow: "hidden", transform: "rotate(-3deg)" }}>
        <div className="marquee">
          {marqueeItems.map((m, i) => (
            <span key={i} className="font-display"
              style={{ fontSize: "clamp(40px, 8vw, 84px)", color: "var(--accent)", whiteSpace: "nowrap", fontStyle: "italic", fontWeight: 500 }}>
              {m.nama} ·
            </span>
          ))}
        </div>
      </div>

      <div className="hero-content">
        <Reveal delay={50}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "rgba(var(--card-rgb),0.65)", backdropFilter: "blur(14px)",
            border: "1px solid rgba(var(--accent-rgb),0.2)",
            borderRadius: 999, padding: "8px 18px", marginBottom: 24,
          }}>
            <span style={{ color: "var(--accent)", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>
              · Sejak 1998 ·
            </span>
          </div>
        </Reveal>
        <h1 className="font-display hero-title">
          <SplitText text="Rasa Bengkulu," stagger={75} />
          <br />
          <span className="text-accent-gradient" style={{ fontStyle: "italic" }}>
            <SplitText text="cinta turun-temurun." stagger={75} delay={350} />
          </span>
        </h1>
        <Reveal delay={900}>
          <div className="hero-btns">
            <MagnetButton as="a" href="#kalkulator" className="btn-primary btn-gold-pulse" style={{ textDecoration: "none" }}>
              Hitung Estimasi
            </MagnetButton>
            <MagnetButton as="a" href="#menu" className="btn-secondary"
              style={{ textDecoration: "none", color: "var(--text-primary)", borderColor: "rgba(245,239,230,0.2)" }}>
              Jelajahi Menu
            </MagnetButton>
          </div>
        </Reveal>
      </div>
    </>
  );
}