/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",  <--- PASTIKAN ADA TANDA // DI DEPANNYA
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};
export default nextConfig;