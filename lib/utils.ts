import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Retorna o caminho para assets estáticos.
 * O basePath é injetado automaticamente pelo GitHub Actions durante o build.
 */
export function getAssetPath(path: string): string {
  // Apenas garante que o path começa com /
  return path.startsWith('/') ? path : `/${path}`;
}
