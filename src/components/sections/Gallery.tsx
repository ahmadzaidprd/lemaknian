"use client";

import { useEffect, useRef } from "react";
import { Reveal, SplitText } from "@/components/animations";
import { galeriData } from "@/lib/data";

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const scrollBy = (amount: number) => {
    const el = trackRef.current; if (!el) return;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  useEffect(() => {
    const el = trackRef.current; if (!el) return;
    const onDown = (e: MouseEvent) => {
      isDown.current = true;
      el.style.cursor = "grabbing";
      startX.current = e.pageX - el.offsetLeft;
      scrollStart.current = el.scrollLeft;
    };
    const onUp = () => { isDown.current = false; el.style.cursor = "grab"; };
    const onMove = (e: MouseEvent) => {
      if (!isDown.current) return;
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      el.scrollLeft = scrollStart.current - walk;
    };
    el.addEventListener("mousedown", onDown);
    el.addEventListener("mouseleave", onUp);
    el.addEventListener("mouseup", onUp);
    el.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mouseleave", onUp);
      el.removeEventListener("mouseup", onUp);
      el.removeEventListener("mousemove", onMove);
    };
  }, []);

  const navBtnStyle: React.CSSProperties = {
    width: 44, height: 44, borderRadius: "50%",
    border: "1px solid var(--border)", background: "transparent",
    color: "var(--text-secondary)", cursor: "pointer", fontSize: 18, transition: "all 0.2s",
  };

  return (
    <section id="galeri" style={{ padding: "120px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
        <div>
          <Reveal>
            <div style={{ color: "var(--text-muted)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
              · Galeri acara ·
            </div>
          </Reveal>
          <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 500, lineHeight: 1.04, marginBottom: 0, color: "var(--text-primary)", letterSpacing: "-0.025em" }}>
            <SplitText text="Setiap acara" stagger={60} />
            <br />
            <span className="text-accent-gradient" style={{ fontStyle: "italic" }}>
              <SplitText text="punya ceritanya." stagger={60} delay={250} />
            </span>
          </h2>
        </div>
        <Reveal delay={300}>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => scrollBy(-340)} aria-label="prev" style={navBtnStyle}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
            >←</button>
            <button onClick={() => scrollBy(340)} aria-label="next" style={navBtnStyle}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
            >→</button>
          </div>
        </Reveal>
      </div>

      <div ref={trackRef} className="gallery-track" style={{ paddingLeft: "calc(max(28px, (100vw - 1200px) / 2))" }}>
        {galeriData.map((g) => (
          <div key={g.id} className="gallery-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={g.img} alt={g.judul} draggable={false} />
            <div className="gallery-overlay">
              <div style={{ display: "inline-block", background: "var(--accent)", color: "var(--accent-text)", padding: "4px 10px", borderRadius: 999, fontSize: 10, fontWeight: 600, marginBottom: 14, alignSelf: "flex-start", textTransform: "uppercase", letterSpacing: 0.5 }}>{g.kategori}</div>
              <div className="font-display" style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.15, marginBottom: 8, letterSpacing: "-0.01em" }}>{g.judul}</div>
              <div style={{ display: "flex", gap: 14, color: "rgba(255,255,255,0.7)", fontSize: 12 }}>
                <span>📍 {g.lokasi}</span>
                <span>👥 {g.pax} pax</span>
              </div>
            </div>
          </div>
        ))}
        <div style={{ flex: "0 0 28px" }} />
      </div>
    </section>
  );
}
