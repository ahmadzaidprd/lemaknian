import { getSitemapArtikel } from "@/lib/sanity";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const artikel = await getSitemapArtikel();

  const artikelUrls = artikel.map((a: any) => ({
    url: `https://lemaknian.com/blog/${a.slug}`,
    lastModified: a.lastmod ? new Date(a.lastmod) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://lemaknian.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://lemaknian.com/blog",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...artikelUrls,
  ];
}
