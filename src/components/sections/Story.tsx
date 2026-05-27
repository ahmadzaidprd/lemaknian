"use client";

import Image from "next/image";
import { Reveal, SplitText, MagnetButton, useParallax } from "@/components/animations";

export default function Story() {
  const photoRef = useParallax<HTMLDivElement>(0.12);

  return (
    <section id="cerita" style={{ padding: "120px 28px", position: "relative", overflow: "hidden" }}>
      <div className="story-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div>
          <Reveal>
            <div style={{ color: "var(--text-muted)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
              · Tentang Bu Yati ·
            </div>
          </Reveal>
          <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 500, lineHeight: 1.04, marginBottom: 24, color: "var(--text-primary)", letterSpacing: "-0.025em" }}>
            <SplitText text="Dimulai dari dapur" stagger={55} />
            <br />
            <span className="text-accent-gradient" style={{ fontStyle: "italic" }}>
              <SplitText text="kecil di rumah." stagger={55} delay={300} />
            </span>
          </h2>
          <Reveal delay={400}>
            <div style={{ color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
              <p style={{ marginTop: 0 }}>
                Tahun 1998, Bu Yati mulai masak rendang dan gulai untuk arisan tetangga di Bengkulu Tengah. Satu dua acara, sampai akhirnya tetangga bilang ke tetangga lain.
              </p>
              <p>
                27 tahun kemudian, dapur kecil itu jadi tim catering dengan <strong style={{ color: "var(--accent)" }}>1.200+ event sukses</strong> di seluruh Bengkulu — tapi resepnya tetap sama: dimasak dengan hati, dari dapur Bu Yati.
              </p>
            </div>
          </Reveal>

          <Reveal delay={700}>
            <div style={{ display: "flex", gap: 24, padding: "20px 0", borderTop: "1px solid var(--border-light)", borderBottom: "1px solid var(--border-light)", marginBottom: 28 }}>
              {[
                { v: "1998", l: "Berdiri" },
                { v: "27 thn", l: "Pengalaman" },
                { v: "Halal", l: "MUI tersertifikasi" },
              ].map((x) => (
                <div key={x.l}>
                  <div className="font-display" style={{ color: "var(--accent)", fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>{x.v}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: 11, marginTop: 4 }}>{x.l}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={850}>
            <MagnetButton as="a" href="#galeri" className="btn-secondary" style={{ textDecoration: "none" }}>
              Lihat Portofolio Acara →
            </MagnetButton>
          </Reveal>
        </div>

        <div style={{ position: "relative", height: 560 }}>
          {/* position: absolute + inset: 0 = positioned element, fill akan bekerja */}
          <div ref={photoRef} style={{ position: "absolute", inset: 0, borderRadius: 24, overflow: "hidden" }}>
            <Image
              src="/images/story/bu-yati.jpg"
              alt="Bu Yati di dapur"
              fill
              sizes="(max-width: 880px) 100vw, 50vw"
              style={{ objectFit: "cover", filter: "brightness(0.85) contrast(1.05)" }}
              priority
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(var(--photo-tint),0.5) 100%)" }} />
          </div>
          <Reveal delay={500}>
            <div className="float-anim" style={{
              position: "absolute", bottom: -32, left: -32, maxWidth: 280,
              background: "rgba(var(--card-rgb),0.92)", backdropFilter: "blur(20px)",
              border: "1px solid var(--border)", borderRadius: 18, padding: 20,
              boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
            }}>
              <div className="font-display" style={{ color: "var(--accent)", fontSize: 32, lineHeight: 0.8, marginBottom: 8 }}>&ldquo;</div>
              <div style={{ color: "var(--text-primary)", fontSize: 14, lineHeight: 1.55, fontStyle: "italic" }}>
                Setiap pesanan, saya bayangin tamu yang nyicipin. Itu yang bikin masakan terasa beda.
              </div>
              <div style={{ marginTop: 14, color: "var(--text-muted)", fontSize: 12 }}>— Bu Yati, pendiri</div>
            </div>
          </Reveal>
          <Reveal delay={650}>
            <div className="float-anim delay-1" style={{
              position: "absolute", top: -20, right: -20,
              background: "var(--accent)", color: "var(--accent-text)",
              padding: "10px 16px", borderRadius: 999,
              fontSize: 12, fontWeight: 600, letterSpacing: 0.5,
              boxShadow: "0 8px 24px rgba(var(--accent-rgb),0.4)",
            }}>★ 4.9 dari 1.200+ acara</div>
          </Reveal>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 880px) {
          .story-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
          .story-grid > div:last-child { height: 380px !important; }
        }
      `}</style>
    </section>
  );
}