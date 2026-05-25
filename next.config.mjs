/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // <--- Hapus tanda // agar menjadi web statis
  trailingSlash: true,
  images: {
    unoptimized: true, // Bagus, agar gambar dari Sanity CDN bisa langsung tampil
  },
};
export default nextConfig;