import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "gfnqtqsf",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  perspective: "raw",
});

const slug = "cara-memilih-catering-pernikahan-bengkulu";
const afterSchedule = "2026-09-10T01:01:00Z";
const documentQuery = `*[_type == "artikel" && slug.current == $slug][0] {
  _id,
  "slug": slug.current,
  "tanggal": seo.tanggalPublish,
  "eligibleNow": dateTime(seo.tanggalPublish) <= dateTime(now()),
  "eligibleAfterSchedule": dateTime(seo.tanggalPublish) <= dateTime($afterSchedule)
}`;
const eligibleNowQuery = `*[
  _type == "artikel" &&
  !(_id in path("drafts.**")) &&
  dateTime(seo.tanggalPublish) <= dateTime(now()) &&
  slug.current == $slug
][0]._id`;
const eligibleAfterQuery = `*[
  _type == "artikel" &&
  !(_id in path("drafts.**")) &&
  dateTime(seo.tanggalPublish) <= dateTime($afterSchedule) &&
  slug.current == $slug
][0]._id`;

const [document, eligibleNow, eligibleAfter] = await Promise.all([
  client.fetch(documentQuery, { slug, afterSchedule }),
  client.fetch(eligibleNowQuery, { slug }),
  client.fetch(eligibleAfterQuery, { slug, afterSchedule }),
]);

console.log(JSON.stringify({ document, eligibleNow, eligibleAfter, afterSchedule }, null, 2));

if (!document || eligibleNow !== null || eligibleAfter !== document._id) {
  console.error("Scheduled eligibility test FAILED");
  process.exit(1);
}
console.log("Scheduled eligibility test PASSED");
