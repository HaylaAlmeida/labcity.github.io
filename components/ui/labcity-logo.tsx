'use client';

import { cn } from '@/lib/utils';

interface LabcityLogoProps {
    className?: string;
    iconOnly?: boolean;
    showSubtitle?: boolean;
}

/**
 * Logo vetorial do Labcity - lâmpada com skyline de cidade
 * Adaptável para modo claro/escuro usando currentColor
 */
export function LabcityLogo({ className, iconOnly = false, showSubtitle = true }: LabcityLogoProps) {
    return (
        <div className={cn("flex items-center gap-3", className)}>
            {/* SVG Icon - Lâmpada com skyline */}
            <svg
                viewBox="0 0 100 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-12 shrink-0"
            >
                {/* Círculo da lâmpada */}
                <circle
                    cx="50"
                    cy="45"
                    r="38"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                />

                {/* Skyline dentro do círculo */}
                <g stroke="currentColor" strokeWidth="3" fill="none">
                    {/* Prédio esquerdo pequeno */}
                    <path d="M22 70 L22 52 L30 52 L30 70" />

                    {/* Prédio esquerdo médio */}
                    <path d="M32 70 L32 45 L42 45 L42 70" />

                    {/* Prédio central alto (torre) */}
                    <path d="M44 70 L44 28 L48 24 L52 28 L52 70" />
                    <path d="M48 24 L48 18" strokeWidth="2" />

                    {/* Prédio direito médio */}
                    <path d="M54 70 L54 40 L64 40 L64 70" />

                    {/* Prédio direito pequeno */}
                    <path d="M66 70 L66 55 L76 55 L76 70" />
                </g>

                {/* Base da lâmpada */}
                <path
                    d="M35 83 L32 95 L68 95 L65 83"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeLinejoin="round"
                />

                {/* Linhas da base */}
                <path
                    d="M36 100 L64 100"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
                <path
                    d="M40 106 L60 106"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </svg>

            {/* Texto do logo (opcional) */}
            {!iconOnly && (
                <div className="flex flex-col">
                    <span className="text-xl font-bold tracking-[0.15em] leading-none text-current">
                        LABCITY
                    </span>
                    {showSubtitle && (
                        <span className="text-[8px] font-mono font-bold tracking-[0.2em] uppercase text-current opacity-60 mt-0.5">
                            UFPA • INCT
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
