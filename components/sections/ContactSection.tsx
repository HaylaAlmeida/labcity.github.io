'use client';

import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import { contactInfo } from '@/lib/content';

export function ContactSection() {
    return (
        <section id="contato" className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Contact Info */}
                    <div>
                        <span className="font-mono text-xs font-bold text-primary mb-2 block uppercase tracking-wider">
                            Fale Conosco
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-foreground mb-8 tracking-tight">
                            Entre em Contato
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                            Estamos abertos a novas parcerias e projetos. Visite nosso laboratório ou entre em contato pelos canais oficiais.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
                                    <MapPin className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground mb-1">Endereço</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {contactInfo.address.street}<br />
                                        {contactInfo.address.city} - {contactInfo.address.state}, {contactInfo.address.zipCode}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
                                    <Mail className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground mb-1">Email</h3>
                                    <p className="text-muted-foreground">
                                        {contactInfo.email}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
                                    <Clock className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground mb-1">Horário de Funcionamento</h3>
                                    <p className="text-muted-foreground">
                                        Segunda a Sexta<br />
                                        08:00 - 18:00
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="w-full h-[400px] lg:h-[500px] bg-slate-200 dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.508922208188!2d-48.450507625034206!3d-1.4679416985182525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92a48d3382a17043%3A0x6eb110a8d6748104!2sCCAD-IA%20-%20Centro%20de%20Computa%C3%A7%C3%A3o%20de%20Alto%20Desempenho%20e%20Intelig%C3%AAncia%20Artificial!5e0!3m2!1spt-BR!2sbr!4v1770166113044!5m2!1spt-BR!2sbr"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 transition-all duration-500 dark:invert-[0.9] dark:hue-rotate-180 dark:contrast-[1.1] dark:brightness-[0.8] dark:saturate-[0.3]"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
