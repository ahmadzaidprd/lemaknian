import { getArtikelBySlug, getSemuaSlug, urlFor } from "@/lib/sanity";
import PortableTextRenderer from "@/components/blog/PortableTextRenderer";
import {
  ReadingProgress,
  TableOfContents,
  SocialShare,
  StickyCTA,
  SidebarAd,
} from "@/components/blog/ArticleClient";
import { extractToc } from "@/lib/utils"; // <-- Diambil dari file utilitas sekarang
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const slugs = await getSemuaSlug();
    return slugs?.map((s: any) => ({ slug: s.slug })) ?? [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const artikel = await getArtikelBySlug(params.slug);
  if (!artikel) return { title: "Artikel tidak ditemukan" };

  const title = artikel.seo?.metaJudul || artikel.judul;
  const description = artikel.seo?.metaDeskripsi || artikel.excerpt;
  const imageUrl = artikel.gambarUtama?.asset
    ? urlFor(artikel.gambarUtama).width(1200).height(630).url()
    : null;

  return {
    title: `${title} | Lemaknian`,
    description,
    keywords: artikel.tags?.join(", "),
    openGraph: {
      title, description, type: "article",
      publishedTime: artikel.tanggal,
      modifiedTime: artikel.tanggalUpdate,
      siteName: "Lemaknian", locale: "id_ID",
      ...(imageUrl && { images: [{ url: imageUrl, width: 1200, height: 630, alt: title }] }),
    },
    twitter: {
      card: "summary_large_image", title, description,
      ...(imageUrl && { images: [imageUrl] }),
    },
    alternates: {
      canonical: artikel.seo?.canonicalUrl || `https://lemaknian.com/${params.slug}`,
    },
    robots: artikel.seo?.noIndex ? "noindex,nofollow" : "index,follow",
  };
}

function formatTanggal(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  });
}

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

export default async function ArtikelPage({ params }: { params: { slug: string } }) {
  const artikel = await getArtikelBySlug(params.slug);
  if (!artikel) notFound();

  const tocItems = extractToc(artikel.isi || []);
  const coverUrl = artikel.gambarUtama?.asset
    ? urlFor(artikel.gambarUtama).width(1400).height(787).quality(88).url()
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": artikel.structuredData?.tipe || "Article",
    headline: artikel.judul,
    description: artikel.excerpt,
    author: { "@type": "Person", name: artikel.structuredData?.penulis || "Tim Lemaknian" },
    publisher: {
      "@type": "Organization",
      name: "Lemaknian — Bu Yati Catering",
      url: "https://lemaknian.com",
    },
    datePublished: artikel.tanggal,
    dateModified: artikel.tanggalUpdate || artikel.tanggal,
    url: `https://lemaknian.com/${params.slug}`,
    ...(coverUrl && { image: { "@type": "ImageObject", url: coverUrl, width: 1200, height: 630 } }),
  };

  const faqJsonLd = artikel.structuredData?.faqSchema?.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: artikel.structuredData.faqSchema.map((f: any) => ({
      "@type": "Question",
      name: f.pertanyaan,
      acceptedAnswer: { "@type": "Answer", text: f.jawaban },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      {/* Progress bar */}
      <ReadingProgress />

      {/* Sticky CTA */}
      <StickyCTA />

      <article style={{ minHeight: "100vh", background: "var(--bg)" }}>

        {/* ── COVER IMAGE ──────────────────────────────────── */}
        <div style={{ position: "relative", paddingTop: 72 }}>
          {coverUrl && (
            <div style={{ position: "relative", width: "100%", height: "clamp(300px, 50vw, 580px)", overflow: "hidden" }}>
              <Image
                src={coverUrl}
                alt={artikel.gambarUtama?.alt || artikel.judul}
                fill style={{ objectFit: "cover", objectPosition: "center" }}
                priority
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, rgba(13,10,6,0.2) 0%, transparent 30%, rgba(13,10,6,0.8) 75%, var(--bg) 100%)",
              }} />
            </div>
          )}

          {/* Header konten overlap gambar */}
          <div style={{
            maxWidth: 800, margin: "0 auto",
            padding: coverUrl ? "0 24px" : "90px 24px 0",
            marginTop: coverUrl ? -160 : 0,
            position: "relative", zIndex: 2,
          }}>
            {/* Breadcrumb */}
            <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(245,239,230,0.5)", marginBottom: 18, flexWrap: "wrap" }}>
              <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
              <span>/</span>
              <Link href="/blog" style={{ color: "inherit", textDecoration: "none" }}>Blog</Link>
              <span>/</span>
              <span style={{ color: "rgba(245,239,230,0.8)" }}>{artikel.judul}</span>
            </nav>

            {/* Kategori */}
            {artikel.kategori && (
              <div style={{ marginBottom: 14 }}>
                <span style={{
                  display: "inline-block",
                  background: "rgba(232,200,122,0.15)", color: "var(--accent)",
                  fontSize: 12, fontWeight: 600, padding: "4px 14px",
                  borderRadius: 999, border: "1px solid rgba(232,200,122,0.25)",
                }}>
                  {kategoriLabel[artikel.kategori] || artikel.kategori}
                </span>
              </div>
            )}

            {/* Judul */}
            <h1 style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: "clamp(24px, 4.5vw, 44px)",
              fontWeight: 500, lineHeight: 1.18,
              letterSpacing: "-0.03em", marginBottom: 18,
              color: coverUrl ? "#f5efe6" : "var(--text-primary)",
            }}>
              {artikel.judul}
            </h1>

            {/* Excerpt */}
            <p style={{
              color: coverUrl ? "rgba(245,239,230,0.72)" : "var(--text-secondary)",
              fontSize: "clamp(14px, 2vw, 17px)",
              lineHeight: 1.65, marginBottom: 22,
            }}>
              {artikel.excerpt}
            </p>

            {/* Meta */}
            <div style={{
              display: "flex", flexWrap: "wrap", alignItems: "center",
              gap: "8px 18px", paddingBottom: 22,
              borderBottom: "1px solid rgba(245,239,230,0.1)",
              marginBottom: 0,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: "var(--accent-faint)", border: "1px solid rgba(232,200,122,0.3)",
                  display: "grid", placeItems: "center",
                  color: "var(--accent)", fontSize: 13, fontWeight: 700,
                }}>
                  {(artikel.structuredData?.penulis || "T")[0]}
                </div>
                <div>
                  <div style={{ color: coverUrl ? "rgba(245,239,230,0.9)" : "var(--text-primary)", fontSize: 13, fontWeight: 500 }}>
                    {artikel.structuredData?.penulis || "Tim Lemaknian"}
                  </div>
                  <div style={{ color: "rgba(245,239,230,0.4)", fontSize: 11 }}>Lemaknian · Bengkulu</div>
                </div>
              </div>
              <span style={{ color: "rgba(245,239,230,0.4)", fontSize: 13 }}>
                {formatTanggal(artikel.tanggal)}
              </span>
              <span style={{
                background: "rgba(232,200,122,0.12)",
                color: "var(--accent)", fontSize: 11,
                padding: "2px 10px", borderRadius: 999,
                border: "1px solid rgba(232,200,122,0.2)",
              }}>
                ⏱ {artikel.readTime} menit baca
              </span>
              {artikel.tanggalUpdate && artikel.tanggalUpdate !== artikel.tanggal && (
                <span style={{ color: "rgba(245,239,230,0.4)", fontSize: 11, fontStyle: "italic" }}>
                  Diperbarui {formatTanggal(artikel.tanggalUpdate)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT + SIDEBAR ────────────────────────── */}
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          padding: "40px 24px 80px",
          display: "grid",
          gridTemplateColumns: "1fr 280px",
          gap: 40,
          alignItems: "start",
        }}
          className="artikel-grid">

          {/* ── Konten ── */}
          <div>
            {/* TOC mobile — tampil di atas konten di mobile */}
            <div className="toc-mobile" style={{ marginBottom: 24 }}>
              <TableOfContents items={tocItems} />
            </div>

            {/* Isi artikel */}
            <div style={{ fontSize: "clamp(15px, 1.8vw, 17px)", lineHeight: 1.85 }}>
              <PortableTextRenderer value={artikel.isi} />
            </div>

            {/* Divider */}
            <div style={{ margin: "48px 0", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1, height: 1, background: "var(--border-light)" }} />
              <span style={{ color: "var(--accent)", fontSize: 18 }}>✦</span>
              <div style={{ flex: 1, height: 1, background: "var(--border-light)" }} />
            </div>

            {/* Tags */}
            {artikel.tags?.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <div style={{ color: "var(--text-faint)", fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>Tags</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {artikel.tags.map((tag: string) => (
                    <span key={tag} style={{
                      background: "var(--bg-card)", border: "1px solid var(--border)",
                      color: "var(--text-secondary)", fontSize: 13,
                      padding: "5px 14px", borderRadius: 999,
                    }}>#{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Author box */}
            <div style={{
              background: "var(--bg-card)", border: "1px solid var(--border)",
              borderRadius: 16, padding: "24px", marginBottom: 48,
              display: "flex", gap: 18, alignItems: "flex-start",
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: "50%",
                background: "var(--accent-faint)", border: "2px solid rgba(232,200,122,0.3)",
                display: "grid", placeItems: "center",
                color: "var(--accent)", fontSize: 20, fontWeight: 700,
                fontFamily: "Fraunces, serif", flexShrink: 0,
              }}>
                {(artikel.structuredData?.penulis || "T")[0]}
              </div>
              <div>
                <div style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
                  {artikel.structuredData?.penulis || "Tim Lemaknian"}
                </div>
                <div style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 8 }}>
                  Penulis di Lemaknian · Bengkulu
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                  Tim konten Lemaknian menulis tentang tips pernikahan, kuliner Bengkulu, dan panduan catering untuk membantu kamu merencanakan acara spesial.
                </p>
              </div>
            </div>

            {/* Share mobile */}
            <div className="share-mobile" style={{ marginBottom: 48 }}>
              <SocialShare judul={artikel.judul} slug={params.slug} />
            </div>

            {/* CTA konsultasi */}
            <div style={{
              background: "linear-gradient(135deg, #1a1508, #221c08)",
              border: "1px solid rgba(232,200,122,0.25)",
              borderRadius: 20, padding: "32px 28px",
              marginBottom: 56, textAlign: "center",
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>🍛</div>
              <h3 style={{
                fontFamily: "Fraunces, Georgia, serif",
                color: "var(--text-primary)", fontSize: 22,
                fontWeight: 500, marginBottom: 10, letterSpacing: "-0.02em",
              }}>
                Butuh catering untuk acaramu?
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 20, maxWidth: 420, margin: "0 auto 20px" }}>
                Bu Yati siap bantu dari perencanaan menu sampai hari H. Konsultasi gratis, respon dalam 1 jam.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a
                  href="https://wa.me/6281274203815?text=Halo Bu Yati, saya baca artikel di Lemaknian dan ingin konsultasi catering."
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "var(--accent)", color: "var(--accent-text)",
                    padding: "12px 22px", borderRadius: 999,
                    fontSize: 14, fontWeight: 600, textDecoration: "none",
                  }}>
                  💬 Konsultasi Gratis
                </a>
                <Link href="/#kalkulator" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  border: "1px solid rgba(232,200,122,0.3)", color: "var(--accent)",
                  padding: "12px 22px", borderRadius: 999,
                  fontSize: 14, textDecoration: "none",
                }}>
                  Hitung Estimasi →
                </Link>
              </div>
            </div>

            {/* Artikel terkait */}
            {artikel.artikelTerkait?.length > 0 && (
              <div style={{ marginBottom: 56 }}>
                <h3 style={{
                  fontFamily: "Fraunces, Georgia, serif",
                  color: "var(--text-primary)", fontSize: 22,
                  fontWeight: 500, marginBottom: 6, letterSpacing: "-0.02em",
                }}>
                  Artikel terkait
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 24 }}>
                  Mungkin kamu juga tertarik membaca ini
                </p>
                <div style={{ display: "grid", gap: 16 }}>
                  {artikel.artikelTerkait.map((a: any) => (
                    <Link key={a._id} href={`/${a.slug}`} style={{ textDecoration: "none" }}
                      className="terkait-card">
                      <div style={{
                        display: "grid", gridTemplateColumns: "100px 1fr", gap: 16,
                        background: "var(--bg-card)", border: "1px solid var(--border)",
                        borderRadius: 14, overflow: "hidden",
                      }}>
                        <div style={{ position: "relative", background: "var(--bg-hover)", minHeight: 80 }}>
                          {a.gambarUtama?.asset ? (
                            <Image
                              src={urlFor(a.gambarUtama).width(200).height(200).quality(75).url()}
                              alt={a.gambarUtama.alt || a.judul}
                              fill style={{ objectFit: "cover" }}
                            />
                          ) : (
                            <div style={{ height: "100%", minHeight: 80, display: "grid", placeItems: "center", fontSize: 28 }}>🍛</div>
                          )}
                        </div>
                        <div style={{ padding: "14px 16px 14px 0" }}>
                          <div style={{
                            color: "var(--text-primary)", fontSize: 14, fontWeight: 600,
                            lineHeight: 1.4, marginBottom: 6,
                            display: "-webkit-box", WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical", overflow: "hidden",
                          }}>{a.judul}</div>
                          <div style={{ color: "var(--text-faint)", fontSize: 12, marginBottom: 6 }}>{formatTanggal(a.tanggal)}</div>
                          <div style={{ color: "var(--accent)", fontSize: 12, fontWeight: 500 }}>Baca artikel →</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Navigasi */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              paddingTop: 28, borderTop: "1px solid var(--border-light)",
              flexWrap: "wrap", gap: 12,
            }}>
              <Link href="/blog" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                color: "var(--text-secondary)", fontSize: 13, textDecoration: "none",
                border: "1px solid var(--border)", padding: "9px 18px", borderRadius: 999,
              }}>
                ← Semua Artikel
              </Link>
              <div style={{ color: "var(--text-faint)", fontSize: 12 }}>
                lemaknian.com/{params.slug}
              </div>
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <aside style={{ position: "sticky", top: 90 }} className="artikel-sidebar">

            {/* TOC */}
            <TableOfContents items={tocItems} />

            {/* Share */}
            <SocialShare judul={artikel.judul} slug={params.slug} />

            {/* Ad placeholder */}
            <SidebarAd />

            {/* Mini CTA */}
            <div style={{
              background: "linear-gradient(135deg, #1a1508, #1e1808)",
              border: "1px solid rgba(232,200,122,0.2)",
              borderRadius: 14, padding: "20px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🍛</div>
              <div style={{ color: "var(--text-primary)", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                Butuh catering?
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: 12, lineHeight: 1.5, marginBottom: 14 }}>
                Konsultasi gratis dengan Bu Yati sekarang.
              </p>
              <a
                href="https://wa.me/6281274203815?text=Halo Bu Yati, saya mau konsultasi catering."
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "block", background: "var(--accent)", color: "var(--accent-text)",
                  padding: "10px 14px", borderRadius: 999,
                  fontSize: 12, fontWeight: 600, textDecoration: "none",
                }}>
                💬 Konsultasi WA
              </a>
            </div>

          </aside>
        </div>
      </article>
    </>
  );
}