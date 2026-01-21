import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // basePath e assetPrefix são necessários para GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/labcity.github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/labcity.github.io/' : '',

  // trailingSlash ajuda com roteamento em servidores estáticos
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
