import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // No basePath needed for labcity.github.io (root domain deployment)
  // trailingSlash required for proper subpage routing on GitHub Pages
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
