import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // basePath required because repo name (labcity.github.io) != username (HaylaAlmeida)
  // This is treated as a Project Page, served at /labcity.github.io/
  basePath: process.env.NODE_ENV === 'production' ? '/labcity.github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/labcity.github.io/' : '',
  // trailingSlash required for proper subpage routing on GitHub Pages
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
