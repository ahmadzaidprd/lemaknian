"use client";

import { useState } from "react";
import { Reveal, SplitText, MagnetButton } from "@/components/animations";
import { paketData, waLink } from "@/lib/data";

export default function Calculator() {
  const [pax, setPax] = useState(120);
  const [paketIdx, setPaketIdx] = useState(1);
  const paket = paketData[paketIdx];
  const minPax = paket.min_pax;
  const valid = pax >= minPax;

  const waMsg = `Halo Bu Yati, saya ingin konsultasi Paket ${paket.nama} untuk sekitar ${pax} pax. Mohon rekomendasi menu dan info harga terbaik.`;

  return (
    <section id="kalkulator" style={{ background: "var(--bg-dark)", padding: "120px 28px", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <Reveal>
            <div style={{ color: "var(--text-muted)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
              · Konsultasi paket ·
            </div>
          </Reveal>
          <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 500, lineHeight: 1.04, marginBottom: 16, color: "var(--text-primary)", letterSpacing: "-0.025em" }}>
            <SplitText text="Pilih paket, " stagger={55} />
            <span className="text-accent-gradient" style={{ fontStyle: "italic" }}>
              <SplitText text="lanjut via WA." stagger={55} delay={250} />
            </span>
          </h2>
          <Reveal delay={400}>
            <p style={{ color: "var(--text-secondary)", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>
              Pilih paket dan jumlah tamu, lalu kirim detailnya ke WhatsApp untuk rekomendasi menu dan penawaran terbaik.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="card calc-grid" style={{ padding: 0, overflow: "hidden", maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 1fr" }}>
            <div style={{ padding: 40 }}>
              <div style={{ color: "var(--text-muted)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Pilih paket</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 32 }}>
                {paketData.map((p, i) => (
                  <button key={p.id} onClick={() => {
                    setPaketIdx(i);
                    if (pax < p.min_pax) setPax(p.min_pax);
                  }}
                    style={{
                      background: paketIdx === i ? "rgba(var(--accent-rgb),0.1)" : "transparent",
                      border: `1px solid ${paketIdx === i ? "var(--accent)" : "var(--border)"}`,
                      borderRadius: 12, padding: "14px 12px", cursor: "pointer",
                      textAlign: "left", transition: "all 0.2s", color: "var(--text-primary)",
                    }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 18 }}>{p.icon}</span>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{p.nama}</span>
                    </div>
                    <div style={{ color: paketIdx === i ? "var(--accent)" : "var(--text-muted)", fontSize: 12 }}>
                      Mulai min. {p.min_pax} pax
                    </div>
                  </button>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                {/* label dihubungkan ke slider via htmlFor — fix accessibility */}
                <label htmlFor="slider-tamu" style={{ color: "var(--text-muted)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" }}>
                  Jumlah tamu
                </label>
                <div style={{ color: "var(--accent)", fontSize: 14, fontWeight: 600 }}>{pax} pax</div>
              </div>
              <input
                id="slider-tamu"
                type="range"
                min={paket.min_pax}
                max={500}
                step={paket.min_pax === 1 ? 5 : 10}
                value={pax}
                onChange={(e) => setPax(Number(e.target.value))}
                className="slider-gold"
                aria-label={`Jumlah tamu: ${pax} pax`}
                aria-valuemin={paket.min_pax}
                aria-valuemax={500}
                aria-valuenow={pax}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, color: "var(--text-faint)", fontSize: 11 }}>
                <span>{paket.min_pax} pax</span>
                <span>500+ pax</span>
              </div>

              {!valid && (
                <div style={{ marginTop: 20, padding: "12px 14px", background: "rgba(255,180,60,0.08)", border: "1px solid rgba(255,180,60,0.25)", borderRadius: 10, color: "#e8b558", fontSize: 13 }}>
                  ⚠ Paket {paket.nama} minimum {minPax} pax.
                </div>
              )}

              <div style={{ marginTop: 32 }}>
                <div style={{ color: "var(--text-muted)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Detail untuk konsultasi</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    `Paket ${paket.nama}`,
                    `${pax} tamu`,
                    `Minimum paket ${minPax} pax`,
                    "Harga final menyesuaikan menu, lokasi, dan tanggal acara",
                  ].map((text) => (
                    <div key={text} style={{ display: "flex", gap: 10, color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.5 }}>
                      <span style={{ color: "var(--accent)", flexShrink: 0 }}>✓</span>{text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{
              padding: 40,
              background: "linear-gradient(165deg, rgba(var(--accent-rgb),0.05) 0%, rgba(var(--accent-rgb),0.0) 100%)",
              borderLeft: "1px solid var(--border-light)",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
            }}>
              <div>
                <div style={{ color: "var(--text-muted)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Siap dikonsultasikan</div>
                <div className="font-display text-accent-gradient" style={{ fontSize: "clamp(40px, 5.5vw, 64px)", fontWeight: 500, lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 8 }}>
                  Via WhatsApp
                </div>
                <div style={{ color: "var(--text-muted)", fontSize: 13 }}>untuk {pax} tamu · paket {paket.nama}</div>

                <ul style={{ listStyle: "none", padding: 0, margin: "32px 0 0", display: "flex", flexDirection: "column", gap: 10 }}>
                  {paket.fitur.slice(0, 4).map((f) => (
                    <li key={f} style={{ display: "flex", gap: 10, color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.5 }}>
                      <span style={{ color: "var(--accent)", flexShrink: 0 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: 32 }}>
                <MagnetButton as="a" href={waLink(waMsg)} target="_blank" rel="noopener noreferrer"
                  className="btn-primary btn-gold-pulse"
                  style={{ width: "100%", justifyContent: "center", padding: "16px 24px", fontSize: 15, textDecoration: "none" }}>
                  Konsultasi via WhatsApp →
                </MagnetButton>
                <div style={{ marginTop: 12, color: "var(--text-muted)", fontSize: 11, textAlign: "center" }}>
                  Respon &lt; 1 jam · Konsultasi gratis
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      <style jsx>{`
        @media (max-width: 820px) {
          .calc-grid { grid-template-columns: 1fr !important; }
          .calc-grid > div + div { border-left: 0 !important; border-top: 1px solid var(--border-light) !important; }
        }
      `}</style>
    </section>
  );
}