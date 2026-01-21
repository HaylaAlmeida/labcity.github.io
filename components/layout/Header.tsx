'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Instagram, Linkedin, Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LabcityLogo } from '@/components/ui/labcity-logo';

const navItems = [
    { name: 'Sobre', href: '#sobre' },
    { name: 'Pesquisa', href: '#pesquisa' },
    { name: 'Projetos', href: '#projetos' },
    { name: 'Equipe', href: '#equipe' },
];

export function Header() {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Force "scrolled" look (solid bg) if not on home, or if actually scrolled
    const shouldShowSolidBackground = !isHome || isScrolled;

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
                shouldShowSolidBackground
                    ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm py-3 border-slate-200 dark:border-slate-800'
                    : 'bg-transparent py-5 border-transparent'
            )}
        >
            <div className="w-full px-4 md:px-8 lg:px-12 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="group">
                    <LabcityLogo
                        className={cn(
                            "transition-colors group-hover:opacity-80",
                            isScrolled || !isHome ? "text-slate-900 dark:text-white" : "text-white"
                        )}
                    />
                </Link>

                {/* Spacer to push navigation to the right */}
                <div className="flex-grow" />

                {/* Desktop Navigation - Tech Style (now on the right) */}
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={isHome ? item.href : `/${item.href}`} // Fix anchors on other pages
                            className={cn(
                                "text-xs font-mono font-bold uppercase tracking-widest px-4 py-2 rounded transition-all hover:bg-primary/10 hover:text-primary relative group",
                                shouldShowSolidBackground ? "text-slate-700 dark:text-slate-200" : "text-white/90 hover:text-white"
                            )}
                        >
                            <span className="relative z-10"> // {item.name}</span>
                        </Link>
                    ))}
                </nav>

                {/* Divider between nav and theme toggle */}
                <div className={cn(
                    "hidden md:block h-6 w-px mx-3",
                    shouldShowSolidBackground ? "bg-slate-300 dark:bg-slate-600" : "bg-white/30"
                )} />

                <div className="flex items-center gap-1">
                    {/* Social Media Icons */}
                    <a
                        href="https://instagram.com/labcity.ufpa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "hidden md:flex w-9 h-9 items-center justify-center rounded-md transition-colors",
                            shouldShowSolidBackground
                                ? "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-pink-500"
                                : "text-white/80 hover:bg-white/10 hover:text-pink-400"
                        )}
                        aria-label="Instagram"
                    >
                        <Instagram className="w-4 h-4" />
                    </a>
                    <a
                        href="https://linkedin.com/company/labcity-ufpa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "hidden md:flex w-9 h-9 items-center justify-center rounded-md transition-colors",
                            shouldShowSolidBackground
                                ? "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600"
                                : "text-white/80 hover:bg-white/10 hover:text-blue-400"
                        )}
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                        href="https://github.com/labcity-ufpa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "hidden md:flex w-9 h-9 items-center justify-center rounded-md transition-colors",
                            shouldShowSolidBackground
                                ? "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                                : "text-white/80 hover:bg-white/10 hover:text-white"
                        )}
                        aria-label="GitHub"
                    >
                        <Github className="w-4 h-4" />
                    </a>

                    {/* Theme Toggle */}
                    <ThemeToggle className={shouldShowSolidBackground ? "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800" : "text-white hover:bg-white/10"} />

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-foreground"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className={shouldShowSolidBackground ? "text-slate-900 dark:text-white" : "text-white"} />
                        ) : (
                            <Menu className={shouldShowSolidBackground ? "text-slate-900 dark:text-white" : "text-white"} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-4 shadow-xl md:hidden"
                    >
                        <nav className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={isHome ? item.href : `/${item.href}`}
                                    className="font-mono text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-900 py-3 px-4 rounded block uppercase tracking-wider"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    // {item.name}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
