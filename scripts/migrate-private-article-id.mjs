import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const projectId = "gfnqtqsf";
const dataset = "production";
const slug = process.argv.find((arg) => arg.startsWith("--slug="))?.slice(7);
const apply = process.argv.includes("--apply");

function loadToken() {
  for (const fileName of [".env.local", ".env", ".env.production.local", "sanitytoken", "sanitytoken.txt"]) {
    const filePath = path.resolve(process.cwd(), fileName);
    if (!fs.existsSync(filePath)) continue;
    const content = fs.readFileSync(filePath, "utf8").trim();
    if (!content) continue;
    if (content.startsWith("SANITY_AUTH_TOKEN=")) return content.slice(content.indexOf("=") + 1).trim();
    if (fileName === "sanitytoken" || fileName === "sanitytoken.txt") return content;
  }
}

if (!slug) {
  console.error("Gunakan --slug=<slug-artikel>");
  process.exit(1);
}

const token = loadToken();
if (!token) {
  console.error("SANITY_AUTH_TOKEN tidak ditemukan.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2025-01-01", useCdn: false, perspective: "raw", token });
const matches = await client.fetch(`*[_type == "artikel" && slug.current == $slug]`, { slug });

console.log(`Slug: ${slug}`);
console.log(`Dokumen ditemukan: ${matches.length}`);
console.log(`IDs: ${matches.map((doc) => doc._id).join(", ") || "-"}`);

if (matches.length !== 1) {
  console.error("Migrasi dihentikan: slug harus memiliki tepat satu dokumen.");
  process.exit(1);
}

const source = matches[0];
const destinationId = `artikel-${slug}`;
if (!source._id.includes(".")) {
  console.log(`Tidak perlu migrasi; ID sudah publik: ${source._id}`);
  process.exit(0);
}

function rewriteReferences(value, fromId, toId) {
  if (Array.isArray(value)) return value.map((item) => rewriteReferences(item, fromId, toId));
  if (!value || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, child]) => [
      key,
      key === "_ref" && child === fromId ? toId : rewriteReferences(child, fromId, toId),
    ]),
  );
}

const { _id, _rev, _createdAt, _updatedAt, ...content } = source;
const destination = { ...rewriteReferences(content, source._id, destinationId), _id: destinationId };

console.log(`Rencana: ${source._id} -> ${destinationId}`);
if (!apply) {
  console.log("DRY RUN: tidak ada data diubah. Tambahkan --apply untuk menjalankan migrasi atomik.");
  process.exit(0);
}

const destinationExists = await client.getDocument(destinationId);
if (destinationExists) {
  console.error(`Migrasi dihentikan: destination sudah ada (${destinationId}).`);
  process.exit(1);
}

await client.transaction().create(destination).delete(source._id).commit();
console.log(`Migrasi berhasil: ${destinationId}`);
