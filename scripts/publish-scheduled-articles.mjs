import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const projectId = "gfnqtqsf";
const dataset = "production";
const apiVersion = "2025-01-01";

function loadEnvFiles() {
  for (const fileName of [".env.local", ".env", ".env.production.local", "sanitytoken", "sanitytoken.txt"]) {
    const filePath = path.resolve(process.cwd(), fileName);
    if (!fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, "utf8").trim();

    if ((fileName === "sanitytoken" || fileName === "sanitytoken.txt") && content && !content.startsWith("SANITY_AUTH_TOKEN=")) {
      process.env.SANITY_AUTH_TOKEN = content;
      continue;
    }

    const lines = content.split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;

      const name = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!process.env[name]) process.env[name] = value;
    }
  }
}

loadEnvFiles();

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const updateExisting = args.has("--update-existing");
const inputArg = process.argv.find((arg) => arg.startsWith("--input="));
const inputPath = path.resolve(process.cwd(), inputArg?.split("=")[1] || "drafts/scheduled-articles.json");
const token = process.env.SANITY_AUTH_TOKEN;

if (!fs.existsSync(inputPath)) {
  console.error(`Input file tidak ditemukan: ${inputPath}`);
  process.exit(1);
}

if (!dryRun && !token) {
  console.error("SANITY_AUTH_TOKEN belum ada. Isi dulu token Sanity dengan permission write/editor.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

const articles = JSON.parse(fs.readFileSync(inputPath, "utf8"));

function key(prefix = "k") {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function span(text, marks = []) {
  return { _type: "span", _key: key("s"), text, marks };
}

function block(style, text) {
  return {
    _type: "block",
    _key: key("b"),
    style,
    markDefs: [],
    children: [span(text)],
  };
}

function listBlock(text) {
  return {
    _type: "block",
    _key: key("li"),
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [span(text)],
  };
}

function markdownToPortableText(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let paragraph = [];

  const flushParagraph = () => {
    const text = paragraph.join(" ").trim();
    if (text) blocks.push(block("normal", text));
    paragraph = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      blocks.push(block("h3", line.slice(4).trim()));
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      blocks.push(block("h2", line.slice(3).trim()));
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      blocks.push(listBlock(line.slice(2).trim()));
      continue;
    }

    const numbered = line.match(/^\d+\.\s+(.+)$/);
    if (numbered) {
      flushParagraph();
      blocks.push({
        ...listBlock(numbered[1].trim()),
        listItem: "number",
      });
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  return blocks;
}

function publicDocumentId(article) {
  const requestedId = article.id || `artikel-${article.slug}`;
  if (requestedId.includes(".")) {
    throw new Error(`Document ID tidak boleh mengandung titik karena tidak terlihat oleh query publik: ${requestedId}`);
  }
  return requestedId;
}

function toDoc(article) {
  return {
    _id: publicDocumentId(article),
    _type: "artikel",
    judul: article.judul,
    slug: { _type: "slug", current: article.slug },
    excerpt: article.excerpt,
    kategori: article.kategori || "panduan-catering",
    tags: article.tags || [],
    featured: Boolean(article.featured),
    status: "published",
    isi: markdownToPortableText(article.bodyMarkdown || ""),
    seo: {
      metaJudul: article.metaJudul || article.judul,
      metaDeskripsi: article.metaDeskripsi || article.excerpt,
      focusKeyword: article.focusKeyword || article.tags?.[0] || "catering Bengkulu",
      tanggalPublish: article.tanggalPublish,
      tanggalUpdate: article.tanggalUpdate || article.tanggalPublish,
      readTime: article.readTime || 7,
      noIndex: false,
      canonicalUrl: article.canonicalUrl || `https://lemaknian.com/${article.slug}`,
    },
    structuredData: {
      tipe: "Article",
      penulis: article.penulis || "Tim Lemaknian",
      faqSchema: (article.faq || []).map((faq, index) => ({
        ...faq,
        _key: faq._key || `faq-${index + 1}`,
      })),
    },
  };
}

function validateArticle(article, index) {
  const required = ["judul", "slug", "excerpt", "tanggalPublish", "bodyMarkdown"];
  const missing = required.filter((field) => !article[field]);
  if (missing.length) {
    throw new Error(`Artikel index ${index} kurang field: ${missing.join(", ")}`);
  }

  const parsedDate = Date.parse(article.tanggalPublish);
  if (Number.isNaN(parsedDate) || !/^\d{4}-\d{2}-\d{2}T/.test(article.tanggalPublish)) {
    throw new Error(`Artikel index ${index} memiliki tanggalPublish invalid: ${JSON.stringify(article.tanggalPublish)}`);
  }
}

console.log(`${dryRun ? "DRY RUN" : "PUBLISH"} ${articles.length} artikel dari ${path.relative(process.cwd(), inputPath)}`);

for (const [index, article] of articles.entries()) {
  validateArticle(article, index);
  const doc = toDoc(article);

  console.log(`\n${index + 1}. ${doc.judul}`);
  console.log(`   slug: ${doc.slug.current}`);
  console.log(`   publish: ${doc.seo.tanggalPublish}`);
  console.log(`   blocks: ${doc.isi.length}`);

  if (dryRun) continue;

  const existingIds = await client.fetch(`*[_type == "artikel" && slug.current == $slug]._id`, { slug: doc.slug.current });
  if (existingIds.length > 0) {
    if (existingIds.some((id) => id.includes("."))) {
      console.warn("   warning: dokumen lama memakai ID bertitik dan perlu dimigrasikan agar terlihat oleh visitor publik.");
    }
    if (!updateExisting) {
      console.log(`   skip: slug sudah ada (${existingIds.join(", ")})`);
      continue;
    }
    if (existingIds.length !== 1 || existingIds[0] !== doc._id) {
      throw new Error(`Tidak aman memperbarui slug ${doc.slug.current}; existing IDs: ${existingIds.join(", ")}`);
    }
    await client.createOrReplace(doc);
    console.log(`   updated: ${doc._id}`);
    continue;
  }

  await client.create(doc);
  console.log(`   created: ${doc._id}`);
}

console.log("\nSelesai.");
