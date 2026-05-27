"use client";

import { usePathname } from "next/navigation";
import { waLink } from "@/lib/data";

const COLS = [
  {
    title: "Layanan",
    links: [
      { label: "Paket Personal", href: "#paket" },
      { label: "Paket Hajatan",  href: "#paket" },
    ],
  },
  {
    title: "Tentang",
    links: [
      { label: "Cerita Bu Yati",  href: "#cerita" },
      { label: "Galeri Acara",    href: "#galeri" },
      { label: "Testimoni Klien", href: "#testimoni" },
      { label: "Blog & Tips",     href: "/blog" },
    ],
  },
  {
    title: "Kontak",
    links: [
      { label: "WhatsApp: 0812-7420-3815",  href: waLink("Assalamualaikum lemaknian") },
      { label: "Email: halo@lemaknian.com",  href: "mailto:halo@lemaknian.id" },
      { label: "JL. Bhakti Husada 10",      href: "https://maps.app.goo.gl/v1timWLYGJs5L1te6" },
      { label: "Senin\u2013Sabtu, 08.00\u201320.00", href: null },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();

  const socials = [
    { l: "IG", h: "#" },
    { l: "FB", h: "#" },
    { l: "TT", h: "#" },
    { l: "WA", h: waLink("Halo Bu Yati") },
  ];

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    if (pathname !== "/") {
      sessionStorage.setItem("scrollTo", href.replace("#", ""));
      window.location.href = "/";
      return;
    }
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

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
                <a key={s.l} href={s.h} aria-label={s.l} target="_blank" rel="noopener noreferrer"
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
                  <li key={l.label}>
                    {l.href ? (
                      <a
                        href={l.href}
                        onClick={(e) => handleLink(e, l.href as string)}
                        target={l.href.startsWith("http") ? "_blank" : undefined}
                        rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        style={{ color: "var(--text-secondary)", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                      >
                        {l.label}
                      </a>
                    ) : (
                      <span style={{ color: "var(--text-muted)", fontSize: 13 }}>{l.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ color: "var(--text-faint)", fontSize: 12 }}>
            © {new Date().getFullYear()} Lemaknian · Supported by RM. Ibu Yati.
          </div>
          <div style={{ color: "var(--text-faint)", fontSize: 12 }}>Dibuat dengan ❤️ di Bengkulu</div>
        </div>

      </div>
    </footer>
  );
}