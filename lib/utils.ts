import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Retorna o caminho correto para assets estáticos no GitHub Pages.
 * Em produção, adiciona o basePath /labcity.github.io
 */
export function getAssetPath(path: string): string {
  // Detecta produção verificando se não estamos em localhost
  const isProduction = typeof window !== 'undefined' &&
    !window.location.hostname.includes('localhost') &&
    !window.location.hostname.includes('127.0.0.1');

  const basePath = isProduction ? '/labcity.github.io' : '';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
