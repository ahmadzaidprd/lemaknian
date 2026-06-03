"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Reveal, SplitText, TiltCard } from "@/components/animations";
import { menuData, formatRupiah } from "@/lib/data";

const KATEGORI = ["Semua", "lauk", "sayur", "nasi", "dessert", "minuman", "snack"] as const;
type Kategori = typeof KATEGORI[number];

export default function MenuPreview() {
  const [aktif, setAktif] = useState<Kategori>("Semua");
  const filtered = useMemo(() => (
    aktif === "Semua" ? menuData.slice(0, 8) : menuData.filter((m) => m.kategori === aktif)
  ), [aktif]);

  return (
    <section style={{ background: "var(--bg-dark)", padding: "120px 28px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: 32 }}>
          <div>
            <Reveal>
              <div style={{ color: "var(--text-muted)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
                · Menu favorit ·
              </div>
            </Reveal>
            <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 500, lineHeight: 1.04, marginBottom: 0, color: "var(--text-primary)", letterSpacing: "-0.025em" }}>
              <SplitText text="Cita rasa Bengkulu," stagger={50} />
              <br />
              <span className="text-accent-gradient" style={{ fontStyle: "italic" }}>
                <SplitText text="dimasak dengan hati." stagger={50} delay={300} />
              </span>
            </h2>
          </div>
          <Reveal delay={300}>
            <a href="#cta" className="btn-secondary" style={{ textDecoration: "none" }}>Lihat semua menu →</a>
          </Reveal>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
          {KATEGORI.map((k) => (
            <button key={k} onClick={() => setAktif(k)}
              style={{
                fontSize: 12, padding: "9px 18px", borderRadius: 999,
                border: `1px solid ${aktif === k ? "var(--accent)" : "var(--border)"}`,
                background: aktif === k ? "var(--accent)" : "transparent",
                color: aktif === k ? "var(--accent-text)" : "var(--text-secondary)",
                fontWeight: aktif === k ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.2s", textTransform: "capitalize",
              }}>{k}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {filtered.map((item, i) => (
            <div key={item.id} style={{ animation: `menuFadeIn 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 60}ms both` }}>
              <TiltCard className="card" max={5} style={{ overflow: "hidden", height: "100%" }}>
                {/*
                  onMouseEnter/Leave dipindah ke div wrapper karena <Image> tidak support
                  event handler langsung di tag-nya. querySelector('img') tetap bekerja
                  karena Next.js Image merender <img> di DOM.
                */}
                <div
                  style={{ aspectRatio: "1/1", overflow: "hidden", position: "relative", background: "var(--accent-faint)" }}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget.querySelector<HTMLImageElement>("img");
                    if (img) img.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget.querySelector<HTMLImageElement>("img");
                    if (img) img.style.transform = "scale(1)";
                  }}
                >
                  <Image
                    src={item.img}
                    alt={item.nama}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    style={{ objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)" }}
                    loading="lazy"
                    fetchPriority="low"
                  />
                  <div style={{
                    position: "absolute", top: 12, left: 12,
                    background: "rgba(var(--photo-tint),0.85)", backdropFilter: "blur(10px)",
                    color: "var(--accent)", padding: "4px 10px", borderRadius: 999,
                    fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5,
                  }}>{item.kategori}</div>
                </div>
                <div style={{ padding: 16 }}>
                  <div className="line-clamp-2" style={{ color: "var(--text-primary)", fontSize: 14, fontWeight: 500, marginBottom: 6, lineHeight: 1.3 }}>{item.nama}</div>
                  <div style={{ color: "var(--accent)", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                    {formatRupiah(item.harga)}
                    <span style={{ color: "var(--text-muted)", fontSize: 11, fontWeight: 400 }}>/porsi</span>
                  </div>
                  <div className="line-clamp-2" style={{ color: "var(--text-faint)", fontSize: 12, lineHeight: 1.5 }}>{item.deskripsi}</div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
        <style jsx>{`
          @keyframes menuFadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </section>
  );
}