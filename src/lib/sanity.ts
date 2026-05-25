import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "gfnqtqsf",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
export function urlFor(source: any) {
  return builder.image(source);
}

export async function getSemuaArtikel() {
  return client.fetch(
    `*[_type == "artikel" && !(_id in path("drafts.**"))]
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
    `*[_type == "artikel" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
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
  return client.fetch(
    `*[_type == "artikel" && !(_id in path("drafts.**"))] { "slug": slug.current }`
  );
}

export async function getArtikelFeatured() {
  return client.fetch(
    `*[_type == "artikel" && !(_id in path("drafts.**")) && featured == true]
    | order(seo.tanggalPublish desc)[0..2] {
      _id, judul, "slug": slug.current, excerpt,
      gambarUtama { asset, alt }, kategori,
      "tanggal": seo.tanggalPublish,
    }`
  );
}

export async function getSitemapArtikel() {
  return client.fetch(
    `*[_type == "artikel" && !(_id in path("drafts.**")) && seo.noIndex != true] {
      "slug": slug.current,
      "lastmod": coalesce(seo.tanggalUpdate, seo.tanggalPublish),
    }`
  );
}