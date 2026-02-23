import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/sidereal-hawking',
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
