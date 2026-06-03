import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

// Self-hosted via next/font — tidak ada request render-blocking ke fonts.googleapis.com,
// dan otomatis preload + font-display: swap untuk menghindari FOIT.
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-fraunces",
});
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FloatingWA } from "@/components/ui/FloatingWA";
import LiveTicker from "@/components/ui/LiveTicker";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Lemaknian — Catering Pernikahan & Hajatan Bengkulu",
  description:
    "Catering Bengkulu terpercaya sejak 1998. Pesan pernikahan, hajatan & korporat online — hitung estimasi langsung, konfirmasi WA, respon 1 jam.",
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
    images: [
      {
        url: "https://lemaknian.com/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Lemaknian — Catering Bengkulu by Bu Yati",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lemaknian — Catering Bengkulu",
    description:
      "Pesan catering pernikahan & hajatan Bengkulu online. Harga transparan, respon cepat.",
    images: ["https://lemaknian.com/images/og-image.webp"],
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: "Lemaknian — Catering Bu Yati",
  description: "Catering profesional Bengkulu sejak 1998. Melayani pernikahan, hajatan, dan korporat se-Bengkulu.",
  url: "https://lemaknian.com",
  telephone: "+6281274203815",
  email: "halo@lemaknian.com",
  image: "https://lemaknian.com/images/og-image.webp",
  address: {
    "@type": "PostalAddress",
    streetAddress: "JL. Bhakti Husada 10",
    addressLocality: "Bengkulu",
    addressRegion: "Bengkulu",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -3.7928,
    longitude: 102.2608,
  },
  servesCuisine: ["Indonesian", "Minang", "Bengkulu"],
  priceRange: "Rp15.000 - Rp50.000",
  currenciesAccepted: "IDR",
  paymentAccepted: "Cash, Bank Transfer",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      opens: "08:00",
      closes: "20:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "1200",
    bestRating: "5",
  },
  hasMap: "https://maps.app.goo.gl/v1timWLYGJs5L1te6",
  sameAs: [
    "https://wa.me/6281274203815",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
