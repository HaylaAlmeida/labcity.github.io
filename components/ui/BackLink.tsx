import { Link } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BackLinkProps {
    href: string;
    label: string;
    className?: string;
}

export function BackLink({ href, label, className }: BackLinkProps) {
    return (
        <Link
            href={href as any}
            className={cn(
                "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors",
                className
            )}
        >
            <ArrowLeft className="w-4 h-4" /> {label}
        </Link>
    );
}
