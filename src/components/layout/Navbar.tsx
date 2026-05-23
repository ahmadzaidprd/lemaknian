"use client";

import { useEffect, useState } from "react";
import { MagnetButton, useTheme } from "@/components/animations";
import { waLink } from "@/lib/data";

const NAV_LINKS = ["Cara Pesan", "Paket", "Menu", "Galeri", "Testimoni", "FAQ"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "var(--accent)", color: "var(--accent-text)",
          display: "grid", placeItems: "center",
          fontFamily: "Fraunces, serif", fontWeight: 700, fontSize: 18,
          boxShadow: "0 0 0 4px rgba(var(--accent-rgb),0.15)",
        }}>L</div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: 15 }}>Lemaknian</span>
          <span style={{ color: "var(--text-muted)", fontSize: 10, marginTop: 2 }}>by Bu Yati · Bengkulu</span>
        </div>
      </a>

      <div className="hidden-mobile" style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {NAV_LINKS.map((l) => (
          <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
            style={{ color: "var(--text-secondary)", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >{l}</a>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          onClick={toggle}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={theme === "dark" ? "Mode terang" : "Mode gelap"}
          style={{
            width: 38, height: 38, borderRadius: "50%",
            border: "1px solid var(--border)", background: "transparent",
            color: "var(--text-secondary)", cursor: "pointer",
            display: "grid", placeItems: "center",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
        >
          {theme === "dark" ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
        <MagnetButton as="a" href={waLink("Halo Bu Yati, saya ingin konsultasi catering.")}
          target="_blank" rel="noopener noreferrer"
          className="btn-primary"
          style={{ textDecoration: "none", fontSize: 13, padding: "10px 18px" }}>
          Konsultasi WA
        </MagnetButton>
      </div>
    </nav>
  );
}
