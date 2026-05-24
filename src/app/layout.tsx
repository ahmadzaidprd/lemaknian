import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FloatingWA } from "@/components/ui/FloatingWA";
import LiveTicker from "@/components/ui/LiveTicker";

export const metadata: Metadata = {
  title: "Lemaknian — Catering Bengkulu by Bu Yati",
  description: "Catering profesional Bengkulu sejak 1998. Pesan online tanpa ribet — hitung estimasi, konfirmasi WA, hari H tinggal tunggu.",
  keywords: "catering bengkulu, catering pernikahan bengkulu, catering hajatan bengkulu, bu yati catering, lemaknian",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const themeInitScript = `
  (function () {
    try {
      var t = localStorage.getItem("lemaknian-theme") || "dark";
      document.documentElement.dataset.theme = t;
    } catch (e) { document.documentElement.dataset.theme = "dark"; }
  })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWA />
        <LiveTicker />
      </body>
    </html>
  );
}
