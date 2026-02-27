'use client';

import { useState, useCallback } from 'react';
import { Mail, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function CopyEmailCTA({ email, label }: { email: string; label?: string }) {
    const t = useTranslations();
    const [copied, setCopied] = useState(false);
    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(email);
        } catch {
            // Fallback for Safari / non-secure contexts
            const ta = document.createElement('textarea');
            ta.value = email;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    }, [email]);

    return (
        <button
            onClick={handleCopy}
            className="w-full py-3 bg-white text-primary rounded-lg font-bold text-sm hover:bg-slate-100 active:bg-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
            {copied ? (
                <><Check className="w-4 h-4" /> {t('Contact.copied')}</>
            ) : (
                <><Mail className="w-4 h-4" /> {label || t('Contact.title')}</>
            )}
        </button>
    );
}
