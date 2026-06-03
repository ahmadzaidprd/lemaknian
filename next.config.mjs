/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  compress: true,

  images: {
    // Static export tidak mendukung Next.js image optimization API.
    // Gambar hero sudah WebP; Cloudflare Polish otomatis serve WebP ke browser modern.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
