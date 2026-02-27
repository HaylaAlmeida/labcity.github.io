import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

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

export default withNextIntl(nextConfig);
