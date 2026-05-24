"use client";
import { waLink } from "@/lib/data";

const COLS = [
  { title: "Layanan", links: ["Paket Personal", "Paket Hajatan", "Paket Pernikahan", "Paket Korporat"] },
  { title: "Tentang", links: ["Cerita Bu Yati", "Galeri Acara", "Testimoni Klien", "Blog & Tips"] },
  { title: "Kontak", links: ["WhatsApp: 0812-3456-7890", "Email: halo@lemaknian.id", "Jl. Khadijah No.12, Bengkulu", "Senin-Sabtu, 08.00 - 20.00"] },
];

export default function Footer() {
  const socials = [
    { l: "IG", h: "#" }, { l: "FB", h: "#" }, { l: "TT", h: "#" },
    { l: "WA", h: waLink("Halo Bu Yati") },
  ];

  return (
    <footer className="footer">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Grid — responsive via CSS class */}
        <div className="footer-grid" style={{ marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "var(--accent)", color: "var(--accent-text)",
                display: "grid", placeItems: "center",
                fontFamily: "Fraunces, serif", fontWeight: 700, fontSize: 18,
                flexShrink: 0,
              }}>L</div>
              <span style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: 18 }}>Lemaknian</span>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.7, maxWidth: 280, marginBottom: 20 }}>
              Catering profesional Bengkulu sejak 1998. Dari dapur Bu Yati, langsung ke meja Anda.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {socials.map((s) => (
                <a key={s.l} href={s.h} aria-label={s.l}
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    border: "1px solid var(--border)", display: "grid", placeItems: "center",
                    color: "var(--text-secondary)", fontSize: 11, fontWeight: 600,
                    textDecoration: "none", transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}>
                  {s.l}
                </a>
              ))}
            </div>
          </div>

          {/* Kolom links */}
          {COLS.map((col) => (
            <div key={col.title}>
              <div style={{ color: "var(--text-primary)", fontSize: 13, fontWeight: 600, marginBottom: 18, textTransform: "uppercase", letterSpacing: 1 }}>
                {col.title}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" style={{ color: "var(--text-secondary)", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ color: "var(--text-faint)", fontSize: 12 }}>© 2025 Lemaknian by Bu Yati Catering. Semua hak dilindungi.</div>
          <div style={{ color: "var(--text-faint)", fontSize: 12 }}>Dibuat dengan ❤️ di Bengkulu</div>
        </div>

      </div>
    </footer>
  );
}
