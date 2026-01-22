import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Retorna o caminho para assets.
 * Na Vercel, o site roda na raiz, então não precisamos de prefixo.
 */
export function getAssetPath(path: string): string {
  return path;
}
