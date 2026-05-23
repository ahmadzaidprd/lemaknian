import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Re-export from data.ts for backwards compatibility with existing pages
export { formatRupiah, waLink, paketData, menuData, testimoniData, galeriData, blogData } from "./data";
