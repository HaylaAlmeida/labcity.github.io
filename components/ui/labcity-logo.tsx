'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LabcityLogoProps {
    className?: string;
    iconOnly?: boolean;
    inverted?: boolean;
}

/**
 * Logo do Labcity - usa a imagem SVG oficial
 * @param inverted - Força a inversão de cores (branco) para uso em fundos escuros
 */
export function LabcityLogo({ className, iconOnly = false, inverted = false }: LabcityLogoProps) {
    return (
        <div className={cn("flex items-center", className)}>
            {/* Logo SVG oficial */}
            <Image
                src="/images/LABCITY-Small-LIGHT.svg"
                alt="LABCITY Logo"
                width={iconOnly ? 40 : 150}
                height={iconOnly ? 40 : 60}
                className={cn(
                    "shrink-0",
                    inverted ? "invert" : "dark:invert"
                )}
                priority
            />
        </div>
    );
}
