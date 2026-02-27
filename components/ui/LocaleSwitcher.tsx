'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useState, useTransition, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface LocaleSwitcherProps {
    className?: string;
    inverted?: boolean;
}

export function LocaleSwitcher({ className, inverted = false }: LocaleSwitcherProps) {
    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function onLocaleChange(nextLocale: 'pt' | 'en') {
        setIsOpen(false);
        startTransition(() => {
            // @ts-ignore
            router.replace(pathname, { locale: nextLocale });
        });
    }

    // Adjusted positions to prevent mobile cropping
    return (
        <div className="relative z-50 flex items-center" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center justify-center p-2 rounded-md transition-colors gap-2 text-sm font-bold",
                    inverted
                        ? "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                        : "text-white/90 hover:bg-white/10 hover:text-white",
                    isPending && "opacity-50 cursor-not-allowed",
                    className
                )}
                disabled={isPending}
                aria-label="Change language"
            >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{locale}</span>
                <ChevronDown className={cn("w-3 h-3 transition-transform", isOpen ? "rotate-180" : "")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 bottom-full mb-2 md:bottom-auto md:top-full md:mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl overflow-hidden py-1 z-50 origin-bottom-right md:origin-top-right"
                    >
                        <button
                            onClick={() => onLocaleChange('pt')}
                            className={cn(
                                "w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between",
                                locale === 'pt' ? "bg-slate-100 dark:bg-slate-800 text-primary font-bold" : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                            )}
                        >
                            Português (BR)
                            {locale === 'pt' && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                        </button>
                        <button
                            onClick={() => onLocaleChange('en')}
                            className={cn(
                                "w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between",
                                locale === 'en' ? "bg-slate-100 dark:bg-slate-800 text-primary font-bold" : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                            )}
                        >
                            English (EN)
                            {locale === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
