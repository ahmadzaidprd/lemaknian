"use client";

import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";

const ptComponents = {
  block: {
    // H2 dengan ID untuk TOC anchor
    h2: ({ children, value }: any) => {
      const text = value?.children?.map((c: any) => c.text).join("") || "";
      const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      return (
        <h2 id={id} style={{
          fontFamily: "Fraunces, Georgia, serif",
          fontSize: "clamp(20px, 3vw, 28px)",
          fontWeight: 500,
          color: "var(--text-primary)",
          margin: "52px 0 16px",
          letterSpacing: "-0.025em",
          lineHeight: 1.25,
          scrollMarginTop: 90,
        }}>
          {children}
        </h2>
      );
    },

    // H3 dengan ID untuk TOC anchor
    h3: ({ children, value }: any) => {
      const text = value?.children?.map((c: any) => c.text).join("") || "";
      const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      return (
        <h3 id={id} style={{
          fontFamily: "Fraunces, Georgia, serif",
          fontSize: "clamp(17px, 2.5vw, 22px)",
          fontWeight: 500,
          color: "var(--text-primary)",
          margin: "40px 0 12px",
          letterSpacing: "-0.02em",
          lineHeight: 1.3,
          scrollMarginTop: 90,
        }}>
          {children}
        </h3>
      );
    },

    h4: ({ children }: any) => (
      <h4 style={{
        fontSize: 17, fontWeight: 600,
        color: "var(--text-primary)",
        margin: "32px 0 10px",
      }}>
        {children}
      </h4>
    ),

    // Paragraf ideal: 50-75 kata, line-height 1.85
    normal: ({ children }: any) => (
      <p style={{
        color: "var(--text-primary)",
        fontSize: "clamp(15px, 1.8vw, 17px)",
        lineHeight: 1.85,
        margin: "0 0 26px",
        letterSpacing: "0.01em",
      }}>
        {children}
      </p>
    ),

    blockquote: ({ children }: any) => (
      <blockquote style={{
        margin: "36px 0",
        paddingLeft: 24,
        borderLeft: "3px solid var(--accent)",
        fontFamily: "Fraunces, Georgia, serif",
        fontStyle: "italic",
        fontSize: "clamp(16px, 2vw, 20px)",
        color: "var(--text-primary)",
        lineHeight: 1.6,
        opacity: 0.85,
      }}>
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }: any) => (
      <ul style={{
        padding: "0 0 0 4px", margin: "4px 0 28px",
        listStyle: "none", display: "flex", flexDirection: "column", gap: 10,
      }}>
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol style={{
        paddingLeft: 24, margin: "4px 0 28px",
        display: "flex", flexDirection: "column", gap: 10,
      }}>
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }: any) => (
      <li style={{ display: "flex", gap: 12, alignItems: "flex-start", color: "var(--text-secondary)", fontSize: "clamp(14px, 1.7vw, 16px)", lineHeight: 1.7 }}>
        <span style={{ color: "var(--accent)", marginTop: 8, width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", display: "inline-block", flexShrink: 0 }} />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }: any) => (
      <li style={{ color: "var(--text-secondary)", fontSize: "clamp(14px, 1.7vw, 16px)", lineHeight: 1.7 }}>
        {children}
      </li>
    ),
  },

  marks: {
    strong: ({ children }: any) => (
      <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>{children}</strong>
    ),
    em: ({ children }: any) => (
      <em style={{ color: "var(--accent)", fontStyle: "italic" }}>{children}</em>
    ),
    underline: ({ children }: any) => (
      <span style={{ textDecoration: "underline", textDecorationColor: "var(--accent)" }}>{children}</span>
    ),
    highlight: ({ children }: any) => (
      <mark style={{ background: "rgba(232,200,122,0.15)", color: "var(--accent)", padding: "1px 4px", borderRadius: 4 }}>{children}</mark>
    ),
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : "_self"}
        rel={value?.nofollow ? "nofollow noopener" : "noopener noreferrer"}
        style={{ color: "var(--accent)", textDecoration: "underline", textDecorationColor: "rgba(232,200,122,0.35)", textUnderlineOffset: 3 }}
      >
        {children}
      </a>
    ),
  },

  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      return (
        <figure style={{ margin: "36px -8px" }}>
          <div style={{ borderRadius: 14, overflow: "hidden", background: "var(--bg-card)" }}>
            <Image
              src={urlFor(value).width(900).quality(85).url()}
              alt={value.alt || ""}
              width={900} height={506}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
          {value.caption && (
            <figcaption style={{
              color: "var(--text-faint)", fontSize: 12,
              textAlign: "center", marginTop: 10,
              fontStyle: "italic", lineHeight: 1.5,
            }}>
              {value.caption}
              {value.credit && <span style={{ opacity: 0.6 }}> · {value.credit}</span>}
            </figcaption>
          )}
        </figure>
      );
    },

    callout: ({ value }: any) => {
      const map: Record<string, { bg: string; border: string; icon: string }> = {
        tips:    { bg: "rgba(232,200,122,0.06)", border: "rgba(232,200,122,0.3)", icon: "💡" },
        warning: { bg: "rgba(232,122,74,0.06)",  border: "rgba(232,122,74,0.3)",  icon: "⚠️" },
        info:    { bg: "rgba(74,138,232,0.06)",  border: "rgba(74,138,232,0.3)",  icon: "ℹ️" },
        success: { bg: "rgba(74,232,122,0.06)",  border: "rgba(74,232,122,0.3)",  icon: "✅" },
      };
      const s = map[value?.tipe] || map.info;
      return (
        <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 12, padding: "18px 20px", margin: "28px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-primary)", fontWeight: 600, fontSize: 13, marginBottom: value.isi ? 8 : 0, textTransform: "uppercase", letterSpacing: 0.5 }}>
            <span>{s.icon}</span>
            <span>{value.judul || ""}</span>
          </div>
          {value.isi && <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{value.isi}</p>}
        </div>
      );
    },

    tabelHarga: ({ value }: any) => (
      <div style={{ margin: "28px 0", overflowX: "auto" }}>
        {value.judul && <div style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: 14, marginBottom: 12 }}>{value.judul}</div>}
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "clamp(13px, 1.6vw, 15px)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
          <tbody>
            {value.baris?.map((b: any, i: number) => (
              <tr key={i} style={{ background: b.highlight ? "rgba(232,200,122,0.08)" : i % 2 === 0 ? "var(--bg-card)" : "var(--bg)", borderBottom: "1px solid var(--border-light)" }}>
                <td style={{ padding: "13px 18px", color: b.highlight ? "var(--accent)" : "var(--text-secondary)", fontWeight: b.highlight ? 600 : 400 }}>{b.label}</td>
                <td style={{ padding: "13px 18px", color: b.highlight ? "var(--accent)" : "var(--text-primary)", fontWeight: b.highlight ? 700 : 500, textAlign: "right" }}>{b.nilai}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),

    langkah: ({ value }: any) => (
      <div style={{ margin: "28px 0" }}>
        {value.judul && <div style={{ fontFamily: "Fraunces, serif", color: "var(--text-primary)", fontWeight: 500, fontSize: 18, marginBottom: 18 }}>{value.judul}</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {value.steps?.map((s: any, i: number) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: 16, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--accent-faint)", border: "2px solid rgba(232,200,122,0.3)", display: "grid", placeItems: "center", color: "var(--accent)", fontSize: 16, fontWeight: 700, fontFamily: "Fraunces, serif" }}>{i + 1}</div>
              <div style={{ paddingTop: 2 }}>
                <div style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: 15, marginBottom: 5 }}>{s.judul}</div>
                <div style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.65 }}>{s.deskripsi}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),

    ctaBox: ({ value }: any) => (
      // Background selalu gelap di kedua mode → paksa teks terang agar terbaca
      <div style={{ background: "linear-gradient(135deg, #1a1508, #221c08)", border: "1px solid rgba(232,200,122,0.25)", borderRadius: 16, padding: "28px 24px", margin: "36px 0", textAlign: "center" }}>
        {value.judul && <div style={{ fontFamily: "Fraunces, serif", color: "#f5efe6", fontWeight: 500, fontSize: 20, marginBottom: 10, letterSpacing: "-0.02em" }}>{value.judul}</div>}
        {value.deskripsi && <p style={{ color: "rgba(245,239,230,0.75)", fontSize: 14, lineHeight: 1.65, marginBottom: 18, maxWidth: 400, margin: "0 auto 18px" }}>{value.deskripsi}</p>}
        {value.linkBtn && (
          <a href={value.linkBtn} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "var(--accent)", color: "var(--accent-text)", padding: "12px 24px", borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            {value.labelBtn || "Konsultasi Sekarang"}
          </a>
        )}
      </div>
    ),

    faqMini: ({ value }: any) => (
      <div style={{ margin: "28px 0" }}>
        <div style={{ color: "var(--text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 14 }}>Pertanyaan Umum</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {value.items?.map((item: any, i: number) => (
            <details key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10 }}>
              <summary style={{ padding: "14px 18px", color: "var(--text-primary)", fontWeight: 500, fontSize: 14, cursor: "pointer", listStyle: "none", userSelect: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span>{item.pertanyaan}</span>
                <span style={{ color: "var(--accent)", fontSize: 18, flexShrink: 0 }}>+</span>
              </summary>
              <div style={{ padding: "0 18px 16px", color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.7 }}>{item.jawaban}</div>
            </details>
          ))}
        </div>
      </div>
    ),
  },
};

export default function PortableTextRenderer({ value }: { value: any[] }) {
  if (!value) return null;
  return <PortableText value={value} components={ptComponents} />;
}
