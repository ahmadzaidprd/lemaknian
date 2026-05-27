import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FloatingWA } from "@/components/ui/FloatingWA";
import LiveTicker from "@/components/ui/LiveTicker";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Lemaknian — Catering Pernikahan & Hajatan Bengkulu",
  description:
    "Catering profesional Bengkulu sejak 1998. Pesan online tanpa ribet — hitung estimasi, konfirmasi WA, hari H tinggal tunggu. Melayani pernikahan, hajatan & korporat se-Bengkulu.",
  keywords:
    "catering bengkulu, catering pernikahan bengkulu, catering hajatan bengkulu, bu yati catering, lemaknian, catering murah bengkulu, catering profesional bengkulu",
  openGraph: {
    title: "Lemaknian — Catering Bengkulu by Bu Yati",
    description:
      "1.200+ acara sukses. Pesan catering pernikahan & hajatan Bengkulu secara online. Harga transparan, respon 1 jam.",
    url: "https://lemaknian.com",
    siteName: "Lemaknian",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lemaknian — Catering Bengkulu",
    description:
      "Pesan catering pernikahan & hajatan Bengkulu online. Harga transparan, respon cepat.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://lemaknian.com",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  
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
        <SpeedInsights />
      </body>
    </html>
  );
}
