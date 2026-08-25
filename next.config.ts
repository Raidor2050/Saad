import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Saad",
  assetPrefix: "/Saad/",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  turbopack: {},
};

export default nextConfig;
