"use client";

import { Reveal, SplitText } from "@/components/animations";
import { testimoniData } from "@/lib/data";

export default function Testimonials() {
  return (
    <section style={{ background: "var(--bg-dark)", padding: "120px 28px", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: "20%", left: "-10%",
        width: 460, height: 460,
        background: "radial-gradient(circle, rgba(var(--accent-rgb),0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: 56 }}>
          <div>
            <Reveal>
              <div style={{ color: "var(--text-muted)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
                · Testimoni ·
              </div>
            </Reveal>
            <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 500, lineHeight: 1.04, color: "var(--text-primary)", letterSpacing: "-0.025em", marginBottom: 0 }}>
              <span className="text-accent-gradient" style={{ fontStyle: "italic" }}>
                <SplitText text="1.200+ acara." stagger={50} />
              </span>
              <br />
              <SplitText text="Semua berhasil." stagger={50} delay={300} />
            </h2>
          </div>
          <Reveal delay={300}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--bg-card)", border: "1px solid var(--border)", padding: "12px 18px", borderRadius: 999 }}>
              <span style={{ color: "var(--accent)", fontSize: 18 }}>★★★★★</span>
              <div>
                <div style={{ color: "var(--text-primary)", fontSize: 16, fontWeight: 600, lineHeight: 1 }}>4.9</div>
                <div style={{ color: "var(--text-muted)", fontSize: 10, marginTop: 2 }}>1.200+ review</div>
              </div>
            </div>
          </Reveal>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {testimoniData.map((t, i) => (
            <Reveal key={t.id} delay={i * 100}>
              <div
                className="card"
                style={{
                  padding: 28, height: "100%", minHeight: 240,
                  position: "relative", overflow: "visible",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div className="font-display" style={{ position: "absolute", top: 12, right: 24, color: "rgba(var(--accent-rgb),0.18)", fontSize: 90, lineHeight: 0.6 }}>&ldquo;</div>
                <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} style={{
                      color: j < t.rating ? "var(--accent)" : "var(--border)",
                      fontSize: 16,
                      animation: `starReveal 0.4s cubic-bezier(0.22,1,0.36,1) ${j * 80}ms both`,
                    }}>★</span>
                  ))}
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.65, marginBottom: 22, fontStyle: "italic" }}>
                  &ldquo;{t.isi}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid var(--border-light)" }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--accent), var(--accent-dim))",
                    color: "var(--accent-text)", display: "grid", placeItems: "center",
                    fontSize: 12, fontWeight: 700, flexShrink: 0,
                  }}>{t.inisial}</div>
                  <div>
                    <div style={{ color: "var(--text-primary)", fontSize: 13, fontWeight: 500 }}>{t.nama}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: 11, marginTop: 2 }}>{t.acara}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <style jsx>{`
          @keyframes starReveal {
            from { opacity: 0; transform: scale(0.4) rotate(-30deg); }
            to { opacity: 1; transform: scale(1) rotate(0); }
          }
        `}</style>
      </div>
    </section>
  );
}