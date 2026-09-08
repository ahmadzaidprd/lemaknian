import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";

const projectId = "gfnqtqsf";
const dataset = "production";
const target = "catering-bengkulu-pernikahan-hajatan-acara-kantor-daerah";

function loadToken() {
  for (const fileName of [".env.local", ".env", ".env.production.local", "sanitytoken", "sanitytoken.txt"]) {
    const filePath = path.resolve(process.cwd(), fileName);
    if (!fs.existsSync(filePath)) continue;
    const content = fs.readFileSync(filePath, "utf8").trim();
    if (!content) continue;
    if (content.startsWith("SANITY_AUTH_TOKEN=")) return content.slice(content.indexOf("=") + 1).trim();
    if (fileName === "sanitytoken" || fileName === "sanitytoken.txt") return content;
  }
  return undefined;
}

const token = loadToken();
const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: false,
  perspective: "raw",
  token,
});

const allQuery = `*[_type == "artikel"] {
  _id,
  _createdAt,
  _updatedAt,
  "slug": slug.current,
  "tanggal": seo.tanggalPublish
} | order(_id asc)`;

const eligibleQuery = `*[
  _type == "artikel" &&
  !(_id in path("drafts.**")) &&
  dateTime(seo.tanggalPublish) <= dateTime(now())
] {
  _id,
  "slug": slug.current,
  "tanggal": seo.tanggalPublish
} | order(_id asc)`;

const targetQuery = `*[_type == "artikel" && slug.current == $target] {
  _id,
  _rev,
  _createdAt,
  _updatedAt,
  "slug": slug.current,
  "slugLength": length(slug.current),
  "tanggal": seo.tanggalPublish,
  "parsed": dateTime(seo.tanggalPublish),
  "eligible": dateTime(seo.tanggalPublish) <= dateTime(now()),
  "isDraft": _id in path("drafts.**")
} | order(_id asc)`;

const slugDuplicatesQuery = `*[_type == "artikel" && defined(slug.current)] {
  "slug": slug.current,
  "ids": *[_type == "artikel" && slug.current == ^.slug]._id
}[count(ids) > 1]`;

const [now, all, eligible, targetMatches, duplicateRows] = await Promise.all([
  client.fetch(`now()`),
  client.fetch(allQuery),
  client.fetch(eligibleQuery),
  client.fetch(targetQuery, { target }),
  client.fetch(slugDuplicatesQuery),
]);

const duplicates = Array.from(
  new Map(duplicateRows.map((row) => [row.slug, row])).values(),
);
const inspectedTargets = targetMatches.map((doc) => ({
  ...doc,
  tanggalJsType: typeof doc.tanggal,
  tanggalValidIso: typeof doc.tanggal === "string" && !Number.isNaN(Date.parse(doc.tanggal)),
  tanggalLength: typeof doc.tanggal === "string" ? doc.tanggal.length : null,
  tanggalJson: JSON.stringify(doc.tanggal),
}));

console.log(`PROJECT=${projectId} DATASET=${dataset} PERSPECTIVE=raw ORIGIN=true AUTH=${token ? "yes" : "no"}`);
console.log(`SANITY_NOW=${now}`);
console.log(`\nQUERY_1_ALL_ARTIKEL count=${all.length}`);
console.log(JSON.stringify(all, null, 2));
console.log(`\nQUERY_2_ELIGIBLE_PUBLISHED count=${eligible.length}`);
console.log(JSON.stringify(eligible, null, 2));
console.log(`\nTARGET=${target} matches=${targetMatches.length}`);
console.log(JSON.stringify(inspectedTargets, null, 2));
console.log(`\nDUPLICATE_SLUGS count=${duplicates.length}`);
console.log(JSON.stringify(duplicates, null, 2));
