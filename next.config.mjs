/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true, // Biarkan ini tetap true agar aman untuk aset Sanity Anda
  },
};

export default nextConfig;
