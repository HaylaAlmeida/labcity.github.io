'use client';

import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, Phone } from 'lucide-react';
import { contactInfo } from '@/lib/content';

export default function ContatoPage() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-16">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header Section - Standardized */}
                <div className="mb-16">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Voltar para Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">
                        Contato e Localização
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Estamos prontos para atender você. Entre em contato conosco.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div>
                        <h2 className="text-xl font-bold mb-6">Informações de Contato</h2>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-foreground">Endereço</h3>
                                    <p className="text-muted-foreground mt-1">
                                        {contactInfo.address.street}<br />
                                        {contactInfo.address.city} - {contactInfo.address.state}<br />
                                        CEP: {contactInfo.address.zipCode}
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <Mail className="w-6 h-6 text-primary shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-foreground">Email</h3>
                                    <p className="text-muted-foreground mt-1">{contactInfo.email}</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <Phone className="w-6 h-6 text-primary shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-foreground">Telefone</h3>
                                    <p className="text-muted-foreground mt-1">{contactInfo.phone}</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-slate-100 dark:bg-slate-950 rounded-lg h-[300px] overflow-hidden border border-slate-200 dark:border-slate-800">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.508922205545!2d-48.4479327!3d-1.4679417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92a48d3382a17043%3A0x6eb110a8d6748104!2sCCAD-IA%20-%20Centro%20de%20Computa%C3%A7%C3%A3o%20de%20Alto%20Desempenho%20e%20Intelig%C3%AAncia%20Artificial!5e0!3m2!1spt-BR!2sbr!4v1770159546291!5m2!1spt-BR!2sbr"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Localização do LabCity - CCAD-IA"
                        ></iframe>
                    </div>
                </div>
            </div>
        </main>
    );
}
