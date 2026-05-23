"use client";

import { Reveal, SplitText, MagnetButton } from "@/components/animations";
import { floatIngredients, waLink } from "@/lib/data";

export default function CTA() {
  return (
    <section id="cta" style={{ background: "var(--bg-dark)", padding: "120px 28px", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: 0, height: 0, pointerEvents: "none", zIndex: 0, opacity: 0.5,
      }}>
        {floatIngredients.slice(0, 6).map((emo, i) => (
          <div key={i} className="orbit-anim"
            style={{
              position: "absolute",
              fontSize: 30,
              animationDelay: `${-(i * 18 / 6)}s`,
              animationDuration: `${24 + (i % 3) * 4}s`,
              filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.4))",
            }}>{emo}</div>
        ))}
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
        <Reveal>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(var(--card-rgb),0.6)", backdropFilter: "blur(10px)",
            border: "1px solid var(--border)",
            padding: "8px 18px", borderRadius: 999, marginBottom: 28,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#7ec87a", boxShadow: "0 0 0 4px rgba(126,200,122,0.18)",
              animation: "waPulse 1.6s ease-in-out infinite",
            }} />
            <span style={{ color: "var(--text-secondary)", fontSize: 12 }}>Online sekarang · respon &lt; 1 jam</span>
          </div>
        </Reveal>
        <h2 className="font-display" style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 500, lineHeight: 1.02, marginBottom: 24, color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
          <SplitText text="Acara kamu terlalu penting" stagger={50} />
          <br />
          <span className="text-accent-gradient" style={{ fontStyle: "italic" }}>
            <SplitText text="buat diserahkan sembarangan." stagger={50} delay={350} />
          </span>
        </h2>
        <Reveal delay={700}>
          <p style={{ color: "var(--text-secondary)", fontSize: 17, lineHeight: 1.6, marginBottom: 36, maxWidth: 500, margin: "0 auto 36px" }}>
            Konsultasi gratis, respon 1 jam, harga transparan. Sudah dipercaya 27 tahun di Bengkulu.
          </p>
        </Reveal>
        <Reveal delay={850}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <MagnetButton as="a" href={waLink("Halo Bu Yati, saya ingin konsultasi catering.")} target="_blank" rel="noopener noreferrer"
              className="btn-primary btn-gold-pulse" style={{ textDecoration: "none", padding: "16px 32px", fontSize: 15 }}>
              Konsultasi Gratis via WA
            </MagnetButton>
            <MagnetButton as="a" href="#kalkulator" className="btn-secondary" style={{ textDecoration: "none", padding: "16px 32px", fontSize: 15 }}>
              Hitung Estimasi
            </MagnetButton>
          </div>
        </Reveal>
        <Reveal delay={1000}>
          <div style={{ marginTop: 56, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 32, color: "var(--text-muted)", fontSize: 12 }}>
            {["★ Halal MUI", "★ 27 tahun pengalaman", "★ 1.200+ event sukses", "★ Free konsultasi"].map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
