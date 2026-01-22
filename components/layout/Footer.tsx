'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';
import { LabcityLogo } from '@/components/ui/labcity-logo';
import { getAssetPath } from '@/lib/utils';
import { contactInfo } from '@/lib/content';

export function Footer() {
    return (
        <footer className="bg-slate-100 dark:bg-slate-950/50 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">

                {/* Institutional Supporters Bar */}
                <div className="border-b border-slate-200 dark:border-slate-800 pb-12 mb-12">
                    <h5 className="text-center font-mono text-xs font-bold text-muted-foreground/60 uppercase tracking-widest mb-8">
                        Apoio & Fomento
                    </h5>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">

                        {/* CNPq Logo */}
                        <div className="relative w-32 h-16 opacity-30 dark:opacity-50">
                            <Image
                                src={getAssetPath('/images/cnpq-logo.png')}
                                alt="CNPq"
                                fill
                                className="object-contain invert dark:invert-0"
                                sizes="128px"
                            />
                        </div>

                        {/* CAPES Logo - Adjusted gray */}
                        <div className="relative w-28 h-12 opacity-70 grayscale dark:opacity-100">
                            <Image
                                src={getAssetPath('/images/capes-logo.png')}
                                alt="CAPES"
                                fill
                                className="object-contain invert dark:invert-0"
                                sizes="112px"
                            />
                        </div>

                        {/* Governo Federal Logo - Invert in Dark Mode to make text white */}
                        <div className="relative w-40 h-16 opacity-70 grayscale dark:invert dark:opacity-50">
                            <Image
                                src={getAssetPath('/images/governo-logo.png')}
                                alt="Governo Federal"
                                fill
                                className="object-contain"
                                sizes="160px"
                            />
                        </div>

                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    <div className="md:col-span-1">
                        <Link href="/" className="inline-block mb-6 text-foreground hover:opacity-80 transition-opacity">
                            <LabcityLogo showSubtitle={false} />
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Laboratório de pesquisas avançadas em Inteligência Artificial, Cidades Inteligentes e Internet das Coisas da Universidade Federal do Pará.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-foreground mb-4">Navegação</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#sobre" className="hover:text-primary transition-colors">Sobre</Link></li>
                            <li><Link href="#pesquisa" className="hover:text-primary transition-colors">Pesquisa</Link></li>
                            <li><Link href="#projetos" className="hover:text-primary transition-colors">Projetos</Link></li>
                            <li><Link href="#equipe" className="hover:text-primary transition-colors">Equipe</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-foreground mb-4">Links Úteis</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Portal da Transparência</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Acesso à Informação</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Editais Abertos</Link></li>
                            <li><Link href="http://lattes.cnpq.br/" target="_blank" className="hover:text-primary transition-colors">Plataforma Lattes</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-foreground mb-4">Contato</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary shrink-0" />
                                <span className="text-sm">
                                    {contactInfo.address.street}<br />
                                    {contactInfo.address.city} - {contactInfo.address.state}, {contactInfo.address.zipCode}
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <span>{contactInfo.email}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <span>{contactInfo.phone}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center mt-8 text-xs text-muted-foreground font-mono">
                    &copy; {new Date().getFullYear()} Labcity UFPA. Todos os direitos reservados.
                </div>
            </div>
        </footer>
    );
}
