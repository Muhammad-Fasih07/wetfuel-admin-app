/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      "@mui/icons-material",
      "@mui/material",
      "@mui/system",
      "recharts",
    ],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.placeholder.com" },
      { protocol: "https", hostname: "api.dicebear.com" },
    ],
  },
};

export default nextConfig;
