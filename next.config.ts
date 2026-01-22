import type { NextConfig } from "next";

// Definir basePath aqui para que seja usado em tempo de build
const basePath = process.env.GITHUB_ACTIONS ? '/labcity.github.io' : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  // Expõe o basePath para componentes client-side em tempo de build
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
