import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // basePath required for GitHub Pages subdirectory deployment
  // Remove this line if you add a custom domain
  basePath: process.env.NODE_ENV === 'production' ? '/labcity-website' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
