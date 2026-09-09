import { createClient } from "@sanity/client";
import fs from "node:fs";

const token = fs.readFileSync(".env.local", "utf8").match(/^SANITY_AUTH_TOKEN=(.+)$/m)?.[1]?.trim()
  || fs.readFileSync("sanitytoken.txt", "utf8").trim();
const client = createClient({
  projectId: "gfnqtqsf",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  perspective: "raw",
  token,
});
const slugs = [
  "cara-memilih-catering-pernikahan-bengkulu",
  "catering-hajatan-bengkulu-tips-menu",
];
const docs = await client.fetch(`*[_type == "artikel" && slug.current in $slugs] {
  _id,
  _createdAt,
  _updatedAt,
  judul,
  "slug": slug.current,
  status,
  featured,
  sumberKonten,
  makeRunId,
  aiModel,
  sudahDicekManusia,
  "tanggal": seo.tanggalPublish,
  "faqCount": count(structuredData.faqSchema),
  "faqMissingKeyCount": count(structuredData.faqSchema[!defined(_key)]),
  "faq": structuredData.faqSchema[]{_key, pertanyaan}
} | order(slug asc, _id asc)`, { slugs });
console.log(JSON.stringify(docs, null, 2));
