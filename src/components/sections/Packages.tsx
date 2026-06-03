"use client";

import { Reveal, SplitText } from "@/components/animations";
import { paketData, formatRupiah } from "@/lib/data";

const scrollToKalkulator = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  document.getElementById("kalkulator")?.scrollIntoView({ behavior: "smooth" });
};

export default function Packages() {
  return (
    <section style={{ padding: "120px 28px", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: 56 }}>
          <div>
            <Reveal>
              <div style={{ color: "var(--text-muted)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
                · Paket layanan ·
              </div>
            </Reveal>
            <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 500, lineHeight: 1.04, marginBottom: 0, color: "var(--text-primary)", letterSpacing: "-0.025em" }}>
              <SplitText text="Semua acara" stagger={60} />
              <br />
              <span className="text-accent-gradient" style={{ fontStyle: "italic" }}>
                <SplitText text="ada paketnya." stagger={60} delay={250} />
              </span>
            </h2>
          </div>
          <Reveal delay={300}>
            <a href="#kalkulator" onClick={scrollToKalkulator} className="btn-secondary" style={{ textDecoration: "none" }}>
              Lihat semua paket →
            </a>
          </Reveal>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {paketData.map((p, i) => (
            <Reveal key={p.id} delay={i * 100}>
              {/* Ganti TiltCard → div biasa dengan CSS hover transition
                  TiltCard dengan overflow:hidden memotong konten saat 3D tilt */}
              <div className="card" style={{
                padding: 28,
                height: "100%",
                minHeight: 420,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                borderColor: p.popular ? "var(--accent)" : undefined,
                borderWidth: p.popular ? 2 : 1,
                background: p.popular
                  ? "linear-gradient(165deg, rgba(var(--accent-rgb),0.08), rgba(var(--accent-rgb),0.0))"
                  : undefined,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                overflow: "visible",   // ← kunci: konten tidak terpotong
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
                {p.popular && (
                  <div style={{
                    position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                    background: "var(--accent)", color: "var(--accent-text)",
                    padding: "5px 14px", borderRadius: 999, fontSize: 11, fontWeight: 600, letterSpacing: 0.5,
                    whiteSpace: "nowrap", boxShadow: "0 8px 20px rgba(var(--accent-rgb),0.3)",
                  }}>★ Terlaris</div>
                )}

                <div style={{ fontSize: 36, marginBottom: 16 }}>{p.icon}</div>

                <div style={{ color: "var(--text-primary)", fontSize: 22, fontWeight: 500, marginBottom: 6, fontFamily: "Fraunces, serif", letterSpacing: "-0.01em" }}>
                  {p.nama}
                </div>

                <div style={{ marginBottom: 16 }}>
                  <span className="font-display text-accent-gradient" style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.02em" }}>
                    {formatRupiah(p.harga_per_pax)}
                  </span>
                  <span style={{ color: "var(--text-muted)", fontSize: 13, marginLeft: 4 }}>/pax</span>
                </div>

                <div style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.55, marginBottom: 18, flex: 1 }}>
                  {p.deskripsi}
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 8 }}>
                  {p.fitur.slice(0, 4).map((f) => (
                    <li key={f} style={{ display: "flex", gap: 8, color: "var(--text-secondary)", fontSize: 12, lineHeight: 1.5 }}>
                      <span style={{ color: "var(--accent)", flexShrink: 0 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#kalkulator"
                  onClick={scrollToKalkulator}
                  style={{
                    display: "block", textAlign: "center", textDecoration: "none",
                    padding: "12px 20px", borderRadius: 999, fontSize: 13, fontWeight: 600,
                    background: p.popular ? "var(--accent)" : "transparent",
                    color: p.popular ? "var(--accent-text)" : "var(--text-secondary)",
                    border: p.popular ? "1px solid var(--accent)" : "1px solid var(--border)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!p.popular) {
                      e.currentTarget.style.borderColor = "var(--accent)";
                      e.currentTarget.style.color = "var(--accent)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!p.popular) {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }
                  }}
                >
                  Pilih Paket
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}