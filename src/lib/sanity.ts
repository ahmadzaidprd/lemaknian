import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: "gfnqtqsf",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
});

const builder = createImageUrlBuilder(client);
export function urlFor(source: any) {
  return builder.image(source);
}

export async function getSemuaArtikel() {
  return client.fetch(
    `*[_type == "artikel" && !(_id in path("drafts.**")) && dateTime(seo.tanggalPublish) <= dateTime(now())]
    | order(seo.tanggalPublish desc) {
      _id, judul, "slug": slug.current, excerpt,
      gambarUtama { asset, alt }, kategori, tags, featured,
      "tanggal": seo.tanggalPublish,
      "readTime": coalesce(seo.readTime, 3),
    }`
  );
}

export async function getArtikelBySlug(slug: string) {
  return client.fetch(
    `*[_type == "artikel" && slug.current == $slug && !(_id in path("drafts.**")) && dateTime(seo.tanggalPublish) <= dateTime(now())][0] {
      _id, judul, "slug": slug.current, excerpt,
      gambarUtama { asset, alt, caption }, isi, kategori, tags,
      "tanggal": seo.tanggalPublish, "tanggalUpdate": seo.tanggalUpdate,
      "readTime": coalesce(seo.readTime, 3),
      seo { metaJudul, metaDeskripsi, focusKeyword, noIndex, canonicalUrl },
      structuredData { tipe, penulis, faqSchema },
      artikelTerkait[]-> {
        _id, judul, "slug": slug.current,
        excerpt, gambarUtama { asset, alt },
        kategori, "tanggal": seo.tanggalPublish,
      },
    }`,
    { slug }
  );
}

export async function getSemuaSlug() {
  const slugs = await client.fetch(
    `*[_type == "artikel" && !(_id in path("drafts.**")) && dateTime(seo.tanggalPublish) <= dateTime(now())] { "slug": slug.current }`
  );
  console.log(`[sanity] getSemuaSlug: ${slugs.length} eligible published slug(s)`, slugs.map((item: { slug?: string }) => item.slug));
  return slugs;
}

export async function getArtikelFeatured() {
  return client.fetch(
    `*[_type == "artikel" && !(_id in path("drafts.**")) && featured == true && dateTime(seo.tanggalPublish) <= dateTime(now())]
    | order(seo.tanggalPublish desc)[0..2] {
      _id, judul, "slug": slug.current, excerpt,
      gambarUtama { asset, alt }, kategori,
      "tanggal": seo.tanggalPublish,
    }`
  );
}

export async function getSitemapArtikel() {
  return client.fetch(
    `*[_type == "artikel" && !(_id in path("drafts.**")) && seo.noIndex != true && dateTime(seo.tanggalPublish) <= dateTime(now())] {
      "slug": slug.current,
      "lastmod": coalesce(seo.tanggalUpdate, seo.tanggalPublish),
    }`
  );
}
