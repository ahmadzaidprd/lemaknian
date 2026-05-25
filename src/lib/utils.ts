import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Re-export from data.ts for backwards compatibility with existing pages
export { formatRupiah, waLink, paketData, menuData, testimoniData, galeriData, blogData } from "./data";

// ─── EXTRACT TOC DARI PORTABLE TEXT ───────────────────────
interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function extractToc(isi: any[]): TocItem[] {
  if (!isi) return [];
  return isi
    .filter((b) => b._type === "block" && ["h2", "h3"].includes(b.style))
    .map((b) => {
      const text = b.children?.map((c: any) => c.text).join("") || "";
      const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      return { id, text, level: b.style === "h2" ? 2 : 3 };
    });
}