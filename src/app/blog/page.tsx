import { getSemuaArtikel, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "Blog & Tips Catering — Lemaknian",
  description: "Tips pernikahan, estimasi budget catering, dan inspirasi menu khas Bengkulu dari dapur Bu Yati.",
};

const kategoriLabel: Record<string, string> = {
  "tips-pernikahan":   "💍 Tips Pernikahan",
  "kuliner-bengkulu":  "🍛 Kuliner Bengkulu",
  "budget-harga":      "💰 Budget & Harga",
  "inspirasi-acara":   "🎊 Inspirasi Acara",
  "catering-korporat": "🏢 Catering Korporat",
  "panduan-catering":  "📋 Panduan Catering",
  "resep-menu":        "🌶️ Resep & Menu",
  "berita-update":     "📰 Berita & Update",
};

function formatTanggal(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default async function BlogPage() {
  const artikel = await getSemuaArtikel();

  return (
    <div style={{ minHeight: "100vh", paddingTop: 100, paddingBottom: 80 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>

        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ color: "var(--text-muted)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
            Blog & Tips
          </div>
          <h1 className="font-display" style={{
            fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 500,
            color: "var(--text-primary)", letterSpacing: "-0.03em", marginBottom: 14,
          }}>
            Tips & inspirasi<br />
            <span className="text-accent-gradient">untuk acara spesial.</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 15, maxWidth: 480, margin: "0 auto" }}>
            Panduan pernikahan, estimasi budget, dan cerita dari dapur Bu Yati Bengkulu.
          </p>
        </div>

        {artikel?.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24,
          }}>
            {artikel.map((a: any) => (
              <Link key={a._id} href={`/${a.slug}`}
                style={{ textDecoration: "none", display: "block" }}
                className="artikel-card-link">
                <article className="artikel-card" style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 18, overflow: "hidden",
                  height: "100%",
                }}>
                  <div style={{ height: 200, background: "var(--bg-hover)", position: "relative", overflow: "hidden" }}>
                    {a.gambarUtama?.asset ? (
                      <Image
                        src={urlFor(a.gambarUtama).width(600).height(400).quality(80).url()}
                        alt={a.gambarUtama.alt || a.judul}
                        fill style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div style={{
                        height: "100%", display: "grid", placeItems: "center",
                        fontSize: 48, background: "var(--accent-faint)",
                      }}>🍛</div>
                    )}
                  </div>
                  <div style={{ padding: "18px 20px 22px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      {a.kategori && (
                        <span style={{
                          background: "var(--bg-hover)", color: "var(--text-muted)",
                          fontSize: 11, padding: "3px 10px", borderRadius: 999,
                          border: "1px solid var(--border-light)",
                        }}>
                          {kategoriLabel[a.kategori] || a.kategori}
                        </span>
                      )}
                      <span style={{ color: "var(--text-faint)", fontSize: 11 }}>
                        {a.readTime} menit baca
                      </span>
                    </div>
                    <h2 style={{
                      color: "var(--text-primary)", fontSize: 16, fontWeight: 600,
                      lineHeight: 1.4, marginBottom: 10,
                      display: "-webkit-box", WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical", overflow: "hidden",
                    }}>{a.judul}</h2>
                    <p style={{
                      color: "var(--text-muted)", fontSize: 13, lineHeight: 1.6,
                      display: "-webkit-box", WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: 14,
                    }}>{a.excerpt}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--text-faint)", fontSize: 12 }}>
                        {formatTanggal(a.tanggal)}
                      </span>
                      <span style={{ color: "var(--accent)", fontSize: 12 }}>Baca →</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✍️</div>
            <div style={{ color: "var(--text-secondary)", fontSize: 16, fontWeight: 500, marginBottom: 8 }}>
              Artikel segera hadir
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
              Tips pernikahan, estimasi budget, dan inspirasi menu Bengkulu.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
