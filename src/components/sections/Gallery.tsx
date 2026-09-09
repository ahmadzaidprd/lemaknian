"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Reveal, SplitText } from "@/components/animations";

const sajianData = [
  { id: "1", judul: "Rendang Sapi Bengkulu", kategori: "lauk", img: "/images/menu/rendang-sapi.jpg", deskripsi: "Rendang berbumbu pekat untuk hajatan dan acara keluarga." },
  { id: "2", judul: "Gulai Rebung Khas", kategori: "sayur", img: "/images/menu/gulai-rebung.jpg", deskripsi: "Cita rasa rumahan Bengkulu dengan kuah santan yang gurih." },
  { id: "3", judul: "Ikan Bakar Serani", kategori: "lauk", img: "/images/menu/ikan-bakar.jpg", deskripsi: "Ikan bakar berbumbu untuk sajian prasmanan yang hangat." },
  { id: "4", judul: "Ayam Goreng Serundeng", kategori: "lauk", img: "/images/menu/ayam-goreng.jpg", deskripsi: "Ayam goreng dan serundeng gurih, cocok untuk semua usia." },
  { id: "5", judul: "Kue Tat Bengkulu", kategori: "kudapan", img: "/images/menu/kue-tat.jpg", deskripsi: "Kudapan tradisional Bengkulu untuk melengkapi jamuan." },
  { id: "6", judul: "Lemper Ayam", kategori: "snack", img: "/images/menu/lemper-ayam.jpg", deskripsi: "Jajanan ketan isi ayam untuk snack box dan coffee break." },
];

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
    <section style={{ padding: "120px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
        <div>
          <Reveal>
            <div style={{ color: "var(--text-muted)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
              · Sajian khas ·
            </div>
          </Reveal>
          <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 500, lineHeight: 1.04, marginBottom: 0, color: "var(--text-primary)", letterSpacing: "-0.025em" }}>
            <SplitText text="Masakan Indonesia," stagger={60} />
            <br />
            <span className="text-accent-gradient" style={{ fontStyle: "italic" }}>
              <SplitText text="hangat dari dapur." stagger={60} delay={250} />
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
        {sajianData.map((g) => (
          /*
            Tambah position: relative di sini agar <Image fill> bekerja dengan benar.
            Class gallery-card tetap ada untuk CSS styling yang sudah ada (ukuran, border-radius, dll).
          */
          <div key={g.id} className="gallery-card" style={{ position: "relative" }}>
            <Image
              src={g.img}
              alt={g.judul}
              fill
              draggable={false}
              sizes="(max-width: 640px) 100vw, 340px"
              style={{ objectFit: "cover" }}
              loading="lazy"
              fetchPriority="low"
            />
            <div className="gallery-overlay">
              <div style={{ display: "inline-block", background: "var(--accent)", color: "var(--accent-text)", padding: "4px 10px", borderRadius: 999, fontSize: 10, fontWeight: 600, marginBottom: 14, alignSelf: "flex-start", textTransform: "uppercase", letterSpacing: 0.5 }}>{g.kategori}</div>
              <div className="font-display" style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.15, marginBottom: 8, letterSpacing: "-0.01em" }}>{g.judul}</div>
              <div style={{ color: "rgba(255,255,255,0.72)", fontSize: 12, lineHeight: 1.5 }}>
                {g.deskripsi}
              </div>
            </div>
          </div>
        ))}
        <div style={{ flex: "0 0 28px" }} />
      </div>
    </section>
  );
}