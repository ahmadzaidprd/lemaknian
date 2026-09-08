import { createClient } from "@sanity/client";
import fs from "node:fs";

const config = {
  projectId: "gfnqtqsf",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  perspective: "raw",
};
const tokenFile = fs.existsSync("sanitytoken.txt") ? "sanitytoken.txt" : "sanitytoken";
const token = fs.existsSync(tokenFile) ? fs.readFileSync(tokenFile, "utf8").trim() : undefined;
const publicClient = createClient(config);
const authClient = createClient({ ...config, token });
const target = "catering-bengkulu-pernikahan-hajatan-acara-kantor-daerah";
const targetId = `artikel.${target}`;
const query = `*[_type == "artikel" && (slug.current == $target || _id == $targetId)] {
  _id,
  "slug": slug.current,
  "tanggal": seo.tanggalPublish
}`;

const [publicResult, authenticatedResult] = await Promise.all([
  publicClient.fetch(query, { target, targetId }),
  authClient.fetch(query, { target, targetId }),
]);

console.log(`TARGET_ID=${targetId}`);
console.log(`PUBLIC_UNAUTHENTICATED count=${publicResult.length}`);
console.log(JSON.stringify(publicResult, null, 2));
console.log(`AUTHENTICATED count=${authenticatedResult.length}`);
console.log(JSON.stringify(authenticatedResult, null, 2));
