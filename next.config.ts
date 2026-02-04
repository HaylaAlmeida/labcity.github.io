import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  /* 
   * Vercel Deployment Config
   * - No 'output: export' needed (Vercel supports SSR/ISR)
   * - No 'basePath' needed (Run at root)
   * - standard 'next/image' optimization enabled
   */
};

export default nextConfig;
