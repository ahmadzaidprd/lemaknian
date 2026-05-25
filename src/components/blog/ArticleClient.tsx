"use client";

import { useEffect, useState } from "react";

// ─── Reading Progress Bar ──────────────────────────────────
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0,
      height: 3, zIndex: 100,
      background: "rgba(232,200,122,0.1)",
    }}>
      <div style={{
        height: "100%",
        width: `${progress}%`,
        background: "linear-gradient(90deg, var(--accent), var(--accent-light))",
        transition: "width 0.1s linear",
        borderRadius: "0 2px 2px 0",
      }} />
    </div>
  );
}

// ─── TOC ──────────────────────────────────────────────────
interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (items.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <div style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: 14, padding: "18px 20px",
      marginBottom: 20,
    }}>
      <div style={{
        color: "var(--text-muted)", fontSize: 10,
        textTransform: "uppercase", letterSpacing: 1.5,
        marginBottom: 14, fontWeight: 600,
      }}>
        Daftar Isi
      </div>
      <nav>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 2 }}>
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                style={{
                  display: "block",
                  padding: "5px 8px",
                  paddingLeft: item.level === 3 ? 20 : 8,
                  fontSize: item.level === 3 ? 12 : 13,
                  color: active === item.id ? "var(--accent)" : "var(--text-secondary)",
                  textDecoration: "none",
                  borderRadius: 6,
                  background: active === item.id ? "rgba(232,200,122,0.08)" : "transparent",
                  borderLeft: active === item.id ? "2px solid var(--accent)" : "2px solid transparent",
                  transition: "all 0.2s",
                  lineHeight: 1.4,
                }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

// ─── Social Share ──────────────────────────────────────────
export function SocialShare({ judul, slug }: { judul: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://lemaknian.com/${slug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shares = [
    {
      label: "WhatsApp",
      color: "#25d366",
      bg: "rgba(37,211,102,0.1)",
      href: `https://wa.me/?text=${encodeURIComponent(`${judul} - ${url}`)}`,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      color: "#1877f2",
      bg: "rgba(24,119,242,0.1)",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      label: "Twitter/X",
      color: "#000",
      bg: "rgba(255,255,255,0.08)",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(judul)}&url=${encodeURIComponent(url)}`,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <div style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: 14, padding: "18px 20px",
      marginBottom: 20,
    }}>
      <div style={{
        color: "var(--text-muted)", fontSize: 10,
        textTransform: "uppercase", letterSpacing: 1.5,
        marginBottom: 14, fontWeight: 600,
      }}>
        Bagikan
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {shares.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "9px 12px", borderRadius: 8,
              background: s.bg, color: s.color,
              textDecoration: "none", fontSize: 13, fontWeight: 500,
              transition: "opacity 0.2s",
            }}
          >
            {s.icon}
            {s.label}
          </a>
        ))}
        <button
          onClick={copyLink}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "9px 12px", borderRadius: 8,
            background: copied ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.05)",
            color: copied ? "#4ade80" : "var(--text-secondary)",
            border: "none", cursor: "pointer",
            fontSize: 13, fontWeight: 500,
            transition: "all 0.2s",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
          {copied ? "Link tersalin!" : "Salin Link"}
        </button>
      </div>
    </div>
  );
}

// ─── Sticky CTA setelah scroll 50% ────────────────────────
export function StickyCTA() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const check = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      if (total > 0 && scrolled / total > 0.45) setShow(true);
    };
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  if (!show || dismissed) return null;

  return (
    <div style={{
      position: "fixed", bottom: 90, right: 24,
      zIndex: 80, maxWidth: 280,
      background: "linear-gradient(135deg, #1a1508, #221c08)",
      border: "1px solid rgba(232,200,122,0.3)",
      borderRadius: 16, padding: "16px 18px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      animation: "slideInRight 0.4s cubic-bezier(0.22,1,0.36,1)",
    }}>
      <button
        onClick={() => setDismissed(true)}
        style={{
          position: "absolute", top: 8, right: 8,
          background: "none", border: "none",
          color: "var(--text-faint)", cursor: "pointer",
          fontSize: 16, lineHeight: 1, padding: 4,
        }}
      >×</button>
      <div style={{ fontSize: 20, marginBottom: 8 }}>🍛</div>
      <div style={{
        color: "var(--text-primary)", fontSize: 13,
        fontWeight: 600, marginBottom: 6, lineHeight: 1.3,
      }}>
        Butuh catering untuk acaramu?
      </div>
      <p style={{
        color: "var(--text-muted)", fontSize: 11,
        lineHeight: 1.5, marginBottom: 12,
      }}>
        Bu Yati siap bantu. Konsultasi gratis, respon 1 jam.
      </p>
      <a
        href="https://wa.me/6281234567890?text=Halo Bu Yati, saya mau konsultasi catering."
        target="_blank" rel="noopener noreferrer"
        style={{
          display: "block", textAlign: "center",
          background: "var(--accent)", color: "var(--accent-text)",
          padding: "9px 14px", borderRadius: 999,
          fontSize: 12, fontWeight: 600, textDecoration: "none",
        }}
      >
        💬 Konsultasi Gratis
      </a>
    </div>
  );
}

// ─── Sidebar Ad Placeholder ────────────────────────────────
export function SidebarAd() {
  return (
    <div style={{
      background: "var(--bg-card)",
      border: "1px dashed var(--border)",
      borderRadius: 14, padding: "24px 20px",
      textAlign: "center", marginBottom: 20,
    }}>
      <div style={{ color: "var(--text-faint)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
        Iklan
      </div>
      <div style={{
        width: "100%", height: 200,
        background: "var(--bg-hover)",
        borderRadius: 8,
        display: "grid", placeItems: "center",
        color: "var(--text-faint)", fontSize: 12,
      }}>
        300 × 200
      </div>
    </div>
  );
}