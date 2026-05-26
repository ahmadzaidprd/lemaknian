/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    // Kita hapus unoptimized: true agar optimasi gambar otomatis Vercel menyala!
    // Tambahkan domain CDN Sanity di bawah ini agar Next.js diizinkan mengoptimasi gambarnya
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
