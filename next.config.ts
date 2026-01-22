import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/labcity.github.io' : '';

const nextConfig: NextConfig = {
  output: 'export',
  // basePath e assetPrefix são necessários para GitHub Pages
  basePath: basePath,
  assetPrefix: isProd ? '/labcity.github.io/' : '',
  // Expõe o basePath para componentes client-side
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // trailingSlash ajuda com roteamento em servidores estáticos
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
