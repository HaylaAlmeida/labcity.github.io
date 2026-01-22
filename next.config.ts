import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // basePath será injetado automaticamente pelo GitHub Actions (static_site_generator: next)
  // trailingSlash ajuda com roteamento em servidores estáticos
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
