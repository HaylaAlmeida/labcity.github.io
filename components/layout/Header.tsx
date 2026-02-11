'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Instagram, Linkedin, Github, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LabcityLogo } from '@/components/ui/labcity-logo';
import { socialLinks } from '@/lib/content';

type NavItem = {
    name: string;
    href?: string;
    items?: { name: string; href: string }[];
};

const navItems: NavItem[] = [
    {
        name: 'Institucional',
        href: '/institucional#sobre',
        items: [
            { name: 'O que é o LABCITY?', href: '/institucional#sobre' },
            { name: 'Linhas de Pesquisa', href: '/institucional#pesquisa' },
            { name: 'Colaborações e Parcerias', href: '/institucional#parcerias' },
            { name: 'História', href: '/institucional#historia' },
            { name: 'Contato / Mapa', href: '/institucional#contato' },
        ]
    },
    {
        name: 'Equipe',
        href: '/equipe'
    },
    {
        name: 'Pesquisa',
        items: [
            { name: 'Linhas de Pesquisa', href: '/pesquisa/linhas-de-pesquisa' },
            { name: 'Projetos de Pesquisa', href: '/projetos' },
            { name: 'Produção Científica & Inovação', href: '/publicacoes' },
        ]
    },
    {
        name: 'Notícias',
        href: '/noticias'
    }
];

export function Header() {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredNav, setHoveredNav] = useState<string | null>(null);

    // Mobile accordion state
    const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const shouldShowSolidBackground = !isHome || isScrolled;

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
                shouldShowSolidBackground
                    ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm py-3 border-slate-200 dark:border-slate-800'
                    : 'bg-transparent py-5 border-transparent'
            )}
            onMouseLeave={() => setHoveredNav(null)}
        >
            <div className="w-full px-4 md:px-8 lg:px-12 flex items-center justify-between relative">
                {/* Logo */}
                <Link href="/" className="group relative z-50">
                    <LabcityLogo
                        inverted={!shouldShowSolidBackground}
                        className="transition-opacity group-hover:opacity-80"
                    />
                </Link>

                {/* Desktop Navigation - Centered */}
                <nav className="hidden md:flex items-center gap-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    {navItems.map((item) => (
                        <div
                            key={item.name}
                            className="relative group"
                            onMouseEnter={() => setHoveredNav(item.name)}
                        // onMouseLeave handled by header container to prevent flicker gaps
                        >
                            {item.items ? (
                                <div className="flex items-center">
                                    {item.href ? (
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-1 text-base font-bold py-2 transition-colors mr-1",
                                                shouldShowSolidBackground ? "text-slate-700 dark:text-slate-200 hover:text-primary" : "text-white/90 hover:text-white"
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    ) : (
                                        <span
                                            className={cn(
                                                "flex items-center gap-1 text-base font-bold py-2 transition-colors cursor-default",
                                                shouldShowSolidBackground ? "text-slate-700 dark:text-slate-200" : "text-white/90"
                                            )}
                                        >
                                            {item.name}
                                        </span>
                                    )}
                                    <button
                                        className={cn(
                                            "p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors",
                                            shouldShowSolidBackground ? "text-slate-700 dark:text-slate-200" : "text-white/90"
                                        )}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // Toggle logic if needed for mobile, but on desktop hover handles it
                                        }}
                                    >
                                        <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", hoveredNav === item.name ? "rotate-180" : "")} />
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href={isHome || !item.href?.startsWith('#') ? (item.href || '#') : `/${item.href}`}
                                    className={cn(
                                        "flex items-center text-base font-bold py-2 transition-colors hover:text-primary",
                                        shouldShowSolidBackground ? "text-slate-700 dark:text-slate-200" : "text-white/90 hover:text-white"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            )}


                            {/* Dropdown Content */}
                            <AnimatePresence>
                                {item.items && hoveredNav === item.name && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.15, ease: "easeOut" }}
                                        className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl overflow-hidden py-2"
                                    >
                                        {item.items.map((subItem) => (
                                            <Link
                                                key={subItem.name}
                                                href={isHome || !subItem.href.startsWith('#') ? subItem.href : `/${subItem.href}`}
                                                className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-colors"
                                                onClick={() => setHoveredNav(null)}
                                            >
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </nav>



                <div className="flex items-center gap-1">
                    {/* Socials */}
                    {[
                        { link: socialLinks.instagram, Icon: Instagram, label: "Instagram", colorClass: "hover:text-pink-500" },
                        { link: socialLinks.linkedin, Icon: Linkedin, label: "LinkedIn", colorClass: "hover:text-blue-600" },
                        { link: socialLinks.github, Icon: Github, label: "GitHub", colorClass: "hover:text-slate-900 dark:hover:text-white" }
                    ].map(({ link, Icon, label, colorClass }) => (
                        <a
                            key={label}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "hidden md:flex w-9 h-9 items-center justify-center rounded-md transition-colors",
                                shouldShowSolidBackground
                                    ? `text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 ${colorClass}`
                                    : "text-white/80 hover:bg-white/10 hover:text-white"
                            )}
                            aria-label={label}
                        >
                            <Icon className="w-4 h-4" />
                        </a>
                    ))}

                    <ThemeToggle className={shouldShowSolidBackground ? "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800" : "text-white hover:bg-white/10"} />

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-foreground relative z-50"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className={shouldShowSolidBackground || isMobileMenuOpen ? "text-slate-900 dark:text-white" : "text-white"} />
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
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-full left-0 right-0 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-xl md:hidden overflow-hidden"
                    >
                        <nav className="flex flex-col p-4 max-h-[80vh] overflow-y-auto">
                            {navItems.map((item) => (
                                <div key={item.name} className="border-b border-slate-100 dark:border-slate-900 last:border-0">
                                    {item.items ? (
                                        <>
                                            <button
                                                onClick={() => setMobileExpanded(mobileExpanded === item.name ? null : item.name)}
                                                className="w-full flex items-center justify-between text-base font-medium text-slate-800 dark:text-slate-200 hover:text-primary py-4"
                                            >
                                                <span>{item.name}</span>
                                                <ChevronDown className={cn("w-4 h-4 transition-transform", mobileExpanded === item.name ? "rotate-180" : "")} />
                                            </button>
                                            <AnimatePresence>
                                                {mobileExpanded === item.name && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden bg-slate-50 dark:bg-slate-900/50 rounded-lg mb-2"
                                                    >
                                                        {item.items.map(subItem => (
                                                            <Link
                                                                key={subItem.name}
                                                                href={isHome || !subItem.href.startsWith('#') ? subItem.href : `/${subItem.href}`}
                                                                className="block py-3 px-6 text-sm text-slate-600 dark:text-slate-400 hover:text-primary border-t border-slate-100 dark:border-slate-800 first:border-0"
                                                                onClick={() => setIsMobileMenuOpen(false)}
                                                            >
                                                                {subItem.name}
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </>
                                    ) : (
                                        <Link
                                            href={isHome || !item.href?.startsWith('#') ? (item.href || '#') : `/${item.href}`}
                                            className="block text-base font-medium text-slate-800 dark:text-slate-200 hover:text-primary py-4"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
