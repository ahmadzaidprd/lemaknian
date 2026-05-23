"use client";

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
      el.querySelectorAll<HTMLDivElement>(".hero-photo").forEach((p) => {
        p.style.backgroundPosition = `center ${50 + sc * 0.04}%`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="hero" ref={heroRef} style={{
      position: "relative", minHeight: "100vh",
      display: "flex", alignItems: "center", overflow: "hidden",
      paddingTop: 80, paddingBottom: 100,
    }}>
      {variant === "bigType" && <HeroBigType photoIdx={photoIdx} />}
      {variant === "centerStack" && <HeroCenterStack photoIdx={photoIdx} />}
      {variant === "splitMarquee" && <HeroSplitMarquee photoIdx={photoIdx} />}

      {/* photo indicator pills */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
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

      <div className="hidden-mobile" style={{
        position: "absolute", bottom: 32, right: 32, zIndex: 6,
        color: "var(--text-secondary)", fontSize: 11, letterSpacing: 1,
        textTransform: "uppercase", display: "flex", alignItems: "center", gap: 10,
      }}>
        <span>Scroll</span>
        <div style={{
          width: 1, height: 40, background: "linear-gradient(180deg, var(--accent), transparent)",
          animation: "scrollLine 2s ease-in-out infinite",
        }} />
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0%    { transform: scaleY(0.2); transform-origin: top; }
          50%   { transform: scaleY(1);   transform-origin: top; }
          50.1% { transform: scaleY(1);   transform-origin: bottom; }
          100%  { transform: scaleY(0);   transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
}

/* ── variant A: bigType ── */
function HeroBigType({ photoIdx }: { photoIdx: number }) {
  return (
    <>
      {heroPhotos.map((p, i) => (
        <div key={i} className={`hero-photo ${i === photoIdx ? "active" : ""}`}
          style={{ backgroundImage: `url(${p.url})`, opacity: i === photoIdx ? 1 : 0 }} />
      ))}
      <div className="hero-vignette" />
      <div className="hero-grain" />

      <div style={{
        position: "absolute", inset: 0,
        display: "grid", placeItems: "center",
        pointerEvents: "none", opacity: 0.07, mixBlendMode: "overlay",
      }}>
        <div className="font-display" style={{
          fontSize: "clamp(220px, 30vw, 460px)", fontWeight: 500,
          color: "var(--accent)", whiteSpace: "nowrap", letterSpacing: "-0.04em",
        }}>LEMAKNIAN</div>
      </div>

      <div style={{
        position: "relative", zIndex: 5,
        maxWidth: 1200, margin: "0 auto", padding: "0 28px",
        display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
      }}>
        <Reveal delay={100}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "rgba(var(--card-rgb),0.6)", backdropFilter: "blur(12px)",
            border: "1px solid var(--border)", borderRadius: 999,
            padding: "8px 16px", marginBottom: 28,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "var(--accent)",
              boxShadow: "0 0 0 4px rgba(var(--accent-rgb),0.2)",
              animation: "waPulse 2s ease-in-out infinite",
            }} />
            <span style={{ color: "var(--text-secondary)", fontSize: 12, letterSpacing: 0.5 }}>
              Catering terpercaya Bengkulu · sejak 1998
            </span>
          </div>
        </Reveal>

        <h1 className="font-display" style={{
          fontSize: "clamp(48px, 8vw, 116px)", fontWeight: 500,
          lineHeight: 0.96, marginBottom: 28, color: "var(--text-primary)",
          letterSpacing: "-0.035em", textShadow: "0 4px 40px rgba(0,0,0,0.6)",
        }}>
          <SplitText text="Pesan catering" stagger={70} delay={100} />
          <br />
          <span className="text-accent-gradient" style={{ fontStyle: "italic" }}>
            <SplitText text="tanpa ribet." stagger={70} delay={400} />
          </span>
        </h1>

        <Reveal delay={700}>
          <p style={{ color: "var(--text-primary)", opacity: 0.78, fontSize: 17, lineHeight: 1.6, maxWidth: 520, marginBottom: 36 }}>
            Isi form, pilih paket, langsung konfirmasi WA. <strong style={{ color: "var(--accent)" }}>1.200+ acara sukses</strong> di Bengkulu — pernikahan, hajatan, hingga korporat.
          </p>
        </Reveal>

        <Reveal delay={900}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <MagnetButton as="a" href="#kalkulator" className="btn-primary btn-gold-pulse" style={{ textDecoration: "none" }}>
              Hitung Estimasi Harga →
            </MagnetButton>
            <MagnetButton as="a" href="#paket" className="btn-secondary" style={{ textDecoration: "none", borderColor: "rgba(245,239,230,0.2)", color: "var(--text-primary)" }}>
              Lihat Paket
            </MagnetButton>
          </div>
        </Reveal>
      </div>
    </>
  );
}

/* ── variant B: centerStack with orbital ingredients ── */
function HeroCenterStack({ photoIdx }: { photoIdx: number }) {
  return (
    <>
      {heroPhotos.map((p, i) => (
        <div key={i} className={`hero-photo ${i === photoIdx ? "active" : ""}`}
          style={{ backgroundImage: `url(${p.url})`, opacity: i === photoIdx ? 0.55 : 0 }} />
      ))}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at 50% 60%, rgba(var(--photo-tint),0.4) 0%, rgba(var(--photo-tint),0.95) 100%)",
      }} />
      <div className="hero-grain" />

      <div style={{ position: "absolute", top: "50%", left: "50%", width: 0, height: 0, pointerEvents: "none" }}>
        {floatIngredients.map((emo, i) => (
          <div key={i} className="orbit-anim"
            style={{
              position: "absolute",
              fontSize: 36 + (i % 3) * 8,
              animationDelay: `${-(i * 18 / floatIngredients.length)}s`,
              animationDuration: `${22 + (i % 3) * 6}s`,
              filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))",
            }}>{emo}</div>
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 5, maxWidth: 900, margin: "0 auto", padding: "0 28px", textAlign: "center" }}>
        <Reveal delay={100}>
          <div style={{
            display: "inline-block", color: "var(--accent)", fontSize: 13,
            letterSpacing: 4, textTransform: "uppercase", marginBottom: 24, fontWeight: 500,
          }}>· Bu Yati Catering · Bengkulu ·</div>
        </Reveal>

        <h1 className="font-display" style={{
          fontSize: "clamp(56px, 9vw, 140px)", fontWeight: 500,
          lineHeight: 0.94, marginBottom: 32, color: "var(--text-primary)", letterSpacing: "-0.04em",
        }}>
          <div><SplitText text="Catering" stagger={80} /></div>
          <div className="text-accent-gradient" style={{ fontStyle: "italic" }}>
            <SplitText text="dengan hati." stagger={80} delay={300} />
          </div>
        </h1>

        <Reveal delay={700}>
          <p style={{ color: "var(--text-primary)", opacity: 0.7, fontSize: 18, lineHeight: 1.6, maxWidth: 540, margin: "0 auto 36px" }}>
            27 tahun memasak untuk pernikahan, hajatan, dan acara korporat se-Bengkulu. Dari dapur Bu Yati, langsung ke meja Anda.
          </p>
        </Reveal>

        <Reveal delay={900}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <MagnetButton as="a" href="#kalkulator" className="btn-primary btn-gold-pulse" style={{ textDecoration: "none" }}>
              Mulai Pesan
            </MagnetButton>
            <MagnetButton as="a" href="#cara-pesan" className="btn-secondary" style={{ textDecoration: "none", color: "var(--text-primary)", borderColor: "rgba(245,239,230,0.2)" }}>
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
        <div key={i} className={`hero-photo ${i === photoIdx ? "active" : ""}`}
          style={{ backgroundImage: `url(${p.url})`, opacity: i === photoIdx ? 0.4 : 0 }} />
      ))}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(var(--photo-tint),0.85) 0%, rgba(var(--photo-tint),0.55) 50%, rgba(var(--photo-tint),0.95) 100%)",
      }} />
      <div className="hero-grain" />

      <div style={{
        position: "absolute", top: "18%", left: 0, right: 0,
        opacity: 0.18, pointerEvents: "none", overflow: "hidden", transform: "rotate(-3deg)",
      }}>
        <div className="marquee">
          {marqueeItems.map((m, i) => (
            <span key={i} className="font-display"
              style={{ fontSize: 84, color: "var(--accent)", whiteSpace: "nowrap", fontStyle: "italic", fontWeight: 500, letterSpacing: "-0.02em" }}>
              {m.nama} ·
            </span>
          ))}
        </div>
      </div>
      <div style={{
        position: "absolute", bottom: "20%", left: 0, right: 0,
        opacity: 0.15, pointerEvents: "none", overflow: "hidden", transform: "rotate(2deg)",
      }}>
        <div className="marquee" style={{ animationDirection: "reverse", animationDuration: "60s" }}>
          {marqueeItems.map((m, i) => (
            <span key={i} className="font-display"
              style={{ fontSize: 72, color: "var(--text-primary)", whiteSpace: "nowrap", fontWeight: 500, letterSpacing: "-0.02em" }}>
              {m.nama} ·
            </span>
          ))}
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 5, maxWidth: 1100, margin: "0 auto", padding: "0 28px", textAlign: "center" }}>
        <Reveal delay={50}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "rgba(var(--card-rgb),0.65)", backdropFilter: "blur(14px)",
            border: "1px solid rgba(var(--accent-rgb),0.2)",
            borderRadius: 999, padding: "8px 18px", marginBottom: 28,
          }}>
            <span style={{ color: "var(--accent)", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>
              · Sejak 1998 ·
            </span>
          </div>
        </Reveal>
        <h1 className="font-display" style={{
          fontSize: "clamp(52px, 8.4vw, 124px)", fontWeight: 500,
          lineHeight: 0.96, marginBottom: 28, color: "var(--text-primary)", letterSpacing: "-0.04em",
        }}>
          <SplitText text="Rasa Bengkulu," stagger={75} />
          <br />
          <span className="text-accent-gradient" style={{ fontStyle: "italic" }}>
            <SplitText text="cinta turun-temurun." stagger={75} delay={350} />
          </span>
        </h1>
        <Reveal delay={900}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <MagnetButton as="a" href="#kalkulator" className="btn-primary btn-gold-pulse" style={{ textDecoration: "none" }}>
              Hitung Estimasi
            </MagnetButton>
            <MagnetButton as="a" href="#menu" className="btn-secondary" style={{ textDecoration: "none", color: "var(--text-primary)", borderColor: "rgba(245,239,230,0.2)" }}>
              Jelajahi Menu
            </MagnetButton>
          </div>
        </Reveal>
      </div>
    </>
  );
}
