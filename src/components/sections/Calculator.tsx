"use client";

import { useEffect, useState } from "react";
import { Reveal, SplitText, MagnetButton } from "@/components/animations";
import { paketData, formatRupiah, waLink } from "@/lib/data";

export default function Calculator() {
  const [pax, setPax] = useState(120);
  const [paketIdx, setPaketIdx] = useState(1);
  const paket = paketData[paketIdx];
  const totalRaw = pax * paket.harga_per_pax;
  const ongkir = pax >= 100 ? 0 : 250000;
  const total = totalRaw + ongkir;

  const minPax = paket.min_pax;
  const valid = pax >= minPax;

  const [displayTotal, setDisplayTotal] = useState(total);
  useEffect(() => {
    let raf = 0; let startTime: number | null = null;
    const from = displayTotal; const to = total; const dur = 600;
    const step = (t: number) => {
      if (startTime === null) startTime = t;
      const p = Math.min((t - startTime) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayTotal(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const items = [
    { label: paket.nama, value: totalRaw, color: "var(--accent)" },
    { label: "Ongkir",   value: ongkir,   color: "rgba(var(--accent-rgb),0.4)" },
  ];
  const sum = items.reduce((a, b) => a + b.value, 0) || 1;

  const waMsg = `Halo Bu Yati, saya tertarik paket ${paket.nama} untuk ${pax} pax. Estimasi total ${formatRupiah(total)}. Mohon info lanjut.`;

  return (
    <section id="kalkulator" style={{ background: "var(--bg-dark)", padding: "120px 28px", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <Reveal>
            <div style={{ color: "var(--text-muted)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
              · Estimasi harga ·
            </div>
          </Reveal>
          <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 500, lineHeight: 1.04, marginBottom: 16, color: "var(--text-primary)", letterSpacing: "-0.025em" }}>
            <SplitText text="Transparan, " stagger={55} />
            <span className="text-accent-gradient" style={{ fontStyle: "italic" }}>
              <SplitText text="tanpa kejutan." stagger={55} delay={250} />
            </span>
          </h2>
          <Reveal delay={400}>
            <p style={{ color: "var(--text-secondary)", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>
              Geser jumlah tamu, pilih paket — harga keluar otomatis. Tidak ada biaya tersembunyi.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="card calc-grid" style={{ padding: 0, overflow: "hidden", maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 1fr" }}>
            <div style={{ padding: 40 }}>
              <div style={{ color: "var(--text-muted)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Pilih paket</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 32 }}>
                {paketData.map((p, i) => (
                  <button key={p.id} onClick={() => setPaketIdx(i)}
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
                      {formatRupiah(p.harga_per_pax)}/pax
                    </div>
                  </button>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ color: "var(--text-muted)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>Jumlah tamu</div>
                <div style={{ color: "var(--accent)", fontSize: 14, fontWeight: 600 }}>{pax} pax</div>
              </div>
              <input type="range" min={20} max={500} step={10} value={pax}
                onChange={(e) => setPax(Number(e.target.value))} className="slider-gold" />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, color: "var(--text-faint)", fontSize: 11 }}>
                <span>20 pax</span>
                <span>500+ pax</span>
              </div>

              {!valid && (
                <div style={{ marginTop: 20, padding: "12px 14px", background: "rgba(255,180,60,0.08)", border: "1px solid rgba(255,180,60,0.25)", borderRadius: 10, color: "#e8b558", fontSize: 13 }}>
                  ⚠ Paket {paket.nama} minimum {minPax} pax.
                </div>
              )}

              <div style={{ marginTop: 32 }}>
                <div style={{ color: "var(--text-muted)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Rincian biaya</div>
                <div style={{ height: 10, background: "var(--bg)", borderRadius: 999, overflow: "hidden", display: "flex", marginBottom: 14 }}>
                  {items.map((it, i) => it.value > 0 && (
                    <div key={i} style={{
                      width: `${(it.value / sum) * 100}%`,
                      background: it.color,
                      transition: "width 0.6s cubic-bezier(0.22,1,0.36,1)",
                    }} />
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-secondary)" }}>
                    <span><span style={{ display: "inline-block", width: 8, height: 8, background: "var(--accent)", borderRadius: 2, marginRight: 8 }} />{paket.nama} · {pax} × {formatRupiah(paket.harga_per_pax)}</span>
                    <span style={{ color: "var(--text-primary)" }}>{formatRupiah(totalRaw)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-secondary)" }}>
                    <span><span style={{ display: "inline-block", width: 8, height: 8, background: "rgba(var(--accent-rgb),0.4)", borderRadius: 2, marginRight: 8 }} />Ongkir {ongkir === 0 ? "(gratis!)" : ""}</span>
                    <span style={{ color: "var(--text-primary)" }}>{ongkir === 0 ? "GRATIS" : formatRupiah(ongkir)}</span>
                  </div>
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
                <div style={{ color: "var(--text-muted)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Estimasi total</div>
                <div className="font-display text-accent-gradient" style={{ fontSize: "clamp(40px, 5.5vw, 64px)", fontWeight: 500, lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 8 }}>
                  {formatRupiah(displayTotal)}
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
                  Konfirmasi via WhatsApp →
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
