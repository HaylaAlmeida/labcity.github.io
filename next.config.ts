import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 
   * Vercel Deployment Config
   * - No 'output: export' needed (Vercel supports SSR/ISR)
   * - No 'basePath' needed (Run at root)
   * - standard 'next/image' optimization enabled
   */
};

export default nextConfig;
