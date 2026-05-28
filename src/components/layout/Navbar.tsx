"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MagnetButton, useTheme } from "@/components/animations";
import { waLink } from "@/lib/data";

const NAV_LINKS = [
  { label: "Cara Pesan", href: "#cara-pesan" },
  { label: "Paket",      href: "#paket" },
  { label: "Menu",       href: "#menu" },
  { label: "Galeri",     href: "#galeri" },
  { label: "Testimoni",  href: "#testimoni" },
  { label: "Blog",       href: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle }       = useTheme();
  const pathname                = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Saat tiba di homepage, cek apakah ada target scroll dari halaman lain
  useEffect(() => {
    if (pathname === "/") {
      const target = sessionStorage.getItem("scrollTo");
      if (target) {
        sessionStorage.removeItem("scrollTo");
        setTimeout(() => {
          document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
        }, 400); // tunggu halaman selesai render
      }
    }
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();

    if (pathname !== "/") {
      // Simpan target, navigasi ke home — URL tetap bersih tanpa #
      sessionStorage.setItem("scrollTo", href.replace("#", ""));
      window.location.href = "/";
      closeMenu();
      return;
    }

    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
    closeMenu();
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} style={{ padding: "14px 20px" }}>

        {/* Logo → home */}
        <a href="/"
          style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", zIndex: 60 }}>
         <div style={{
  width: 36, height: 36, flexShrink: 0,
  display: "grid", placeItems: "center",
}}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 96" width="36" height="36" fill="none">
    <path d="M26 20 C25 15 27 11 25 6" stroke="var(--accent)" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/>
    <path d="M40 17 C39 11 41 7 40 2" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.75"/>
    <path d="M54 20 C53 15 55 11 53 6" stroke="var(--accent)" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/>
    <rect x="36.5" y="18" width="7" height="4.5" rx="1.2" fill="var(--accent)"/>
    <path d="M12 33 Q12 22 40 21 Q68 22 68 33 Z" fill="var(--accent)"/>
    <rect x="8" y="33" width="64" height="4" fill="var(--accent)"/>
    <line x1="8" y1="37" x2="8" y2="72" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="72" y1="37" x2="72" y2="72" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M8 72 Q8 82 40 82 Q72 82 72 72" stroke="var(--accent)" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
    <path d="M8 50 Q40 48 72 50" stroke="var(--accent)" strokeWidth="0.7" opacity="0.25" strokeLinecap="round"/>
    <path d="M8 63 Q40 61 72 63" stroke="var(--accent)" strokeWidth="0.7" opacity="0.25" strokeLinecap="round"/>
    <path d="M8 50 Q1 50 1 58 Q1 66 8 66" stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M72 50 Q79 50 79 58 Q79 66 72 66" stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M8 72 Q7 80 16 82" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M72 72 Q73 80 64 82" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="16" y1="82" x2="64" y2="82" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
</div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: 15 }}>Lemaknian</span>
            
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden-mobile" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href}
              onClick={(e) => scrollTo(e, l.href)}
              style={{ color: "var(--text-secondary)", fontSize: 13, textDecoration: "none", transition: "color 0.2s", whiteSpace: "nowrap" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >{l.label}</a>
          ))}
        </div>

        {/* Kanan */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, zIndex: 60 }}>
          <button onClick={toggle} aria-label="Toggle theme"
            style={{
              width: 36, height: 36, borderRadius: "50%",
              border: "1px solid var(--border)", background: "transparent",
              color: "var(--text-secondary)", cursor: "pointer",
              display: "grid", placeItems: "center",
              transition: "border-color 0.2s, color 0.2s", flexShrink: 0,
            }}>
            {theme === "dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <div className="hidden-mobile">
            <MagnetButton as="a"
              href={waLink("Halo Bu Yati, saya ingin konsultasi catering.")}
              target="_blank" rel="noopener noreferrer"
              className="btn-primary"
              style={{ textDecoration: "none", fontSize: 13, padding: "9px 16px", whiteSpace: "nowrap" }}>
              Konsultasi WA
            </MagnetButton>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            className="show-mobile"
            style={{
              width: 36, height: 36, borderRadius: 8,
              border: "1px solid var(--border)", background: "transparent",
              color: "var(--text-primary)", cursor: "pointer",
              display: "grid", placeItems: "center",
              transition: "border-color 0.2s",
            }}>
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        aria-hidden={!menuOpen}
        style={{
          position: "fixed", inset: 0, zIndex: 55,
          background: "var(--bg)",
          display: "flex", flexDirection: "column",
          paddingTop: 80, paddingBottom: 32,
          paddingLeft: 24, paddingRight: 24,
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          overflowY: "auto",
        }}>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV_LINKS.map((l, i) => (
            <a key={l.label} href={l.href}
              onClick={(e) => scrollTo(e, l.href)}
              style={{
                color: "var(--text-secondary)",
                fontSize: 22, fontWeight: 500,
                textDecoration: "none",
                padding: "14px 0",
                borderBottom: "1px solid var(--border-light)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                fontFamily: "Fraunces, serif", letterSpacing: "-0.02em",
                transform: menuOpen ? "translateX(0)" : "translateX(20px)",
                opacity: menuOpen ? 1 : 0,
                transition: `transform 0.35s ease ${i * 50 + 100}ms, opacity 0.35s ease ${i * 50 + 100}ms`,
              }}>
              {l.label}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>

        <div style={{
          marginTop: 32,
          transform: menuOpen ? "translateY(0)" : "translateY(20px)",
          opacity: menuOpen ? 1 : 0,
          transition: "transform 0.35s ease 400ms, opacity 0.35s ease 400ms",
        }}>
          <a href={waLink("Halo Bu Yati, saya ingin konsultasi catering.")}
            target="_blank" rel="noopener noreferrer"
            onClick={closeMenu}
            style={{
              display: "block", background: "var(--accent)", color: "var(--accent-text)",
              textAlign: "center", padding: "16px", borderRadius: 50,
              fontSize: 15, fontWeight: 600, textDecoration: "none", marginBottom: 12,
            }}>
            💬 Konsultasi via WhatsApp
          </a>
          <a href="#kalkulator"
            onClick={(e) => scrollTo(e, "#kalkulator")}
            style={{
              display: "block", border: "1px solid var(--border)",
              color: "var(--text-secondary)", textAlign: "center",
              padding: "14px", borderRadius: 50, fontSize: 14, textDecoration: "none",
            }}>
            Hitung Estimasi Harga
          </a>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div onClick={closeMenu} style={{
          position: "fixed", inset: 0, zIndex: 54,
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
        }} />
      )}
    </>
  );
}
