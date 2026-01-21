import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // basePath required for GitHub Pages subdirectory deployment
  // Remove this line if you add a custom domain
  basePath: process.env.NODE_ENV === 'production' ? '/labcity-website' : '',
  // assetPrefix ensuring static assets are loaded correctly
  assetPrefix: process.env.NODE_ENV === 'production' ? '/labcity-website/' : '',
  // trailingSlash required for proper subpage routing on GitHub Pages
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
