'use client';

import { motion } from 'framer-motion';
import { User, Award, GraduationCap, FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { coordinators, doctors, masters, undergraduates } from '@/lib/content';
import { getAssetPath } from '@/lib/utils';

export default function TeamPage() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-16">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="mb-16">
                    <Link href="/#equipe" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Voltar para Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">
                        Nossa Equipe
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Conheça os pesquisadores, doutores e alunos que fazem a ciência acontecer no Labcity UFPA.
                    </p>
                </div>

                <div className="space-y-20">

                    {/* Level 1: Coordinators */}
                    <section>
                        <h3 className="font-mono text-sm font-bold text-muted-foreground uppercase tracking-widest mb-8 border-b border-slate-200 dark:border-slate-800 pb-2">
                            &gt; Coordenação Geral
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {coordinators.map((coord) => (
                                <motion.div
                                    key={coord.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 flex flex-col sm:flex-row items-center sm:items-start gap-8 rounded-xl shadow-sm"
                                >
                                    <div className="w-32 h-32 sm:w-40 sm:h-40 bg-slate-100 dark:bg-slate-800 overflow-hidden rounded-full border-4 border-slate-50 dark:border-slate-950 shrink-0 relative">
                                        {/* Image or Fallback */}
                                        <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-400">
                                            {coord.image ? (
                                                <img src={getAssetPath(coord.image)} alt={coord.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <User className="w-16 h-16" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-center sm:text-left flex-1">
                                        <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                                            <span className="font-mono text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">{coord.id}</span>
                                            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wide">{coord.role}</span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-foreground mb-2">{coord.name}</h2>
                                        <p className="text-primary font-medium mb-4">{coord.focus}</p>

                                        {/* <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-6">
                                            {coord.specs?.map(spec => (
                                                <span key={spec} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                                                    <Award className="w-3.5 h-3.5" /> {spec}
                                                </span>
                                            ))}
                                        </div> */}

                                        <Link href={coord.lattes} target="_blank" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors">
                                            <FileText className="w-4 h-4" /> Acessar Currículo Lattes
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Other Levels */}
                    {[
                        { title: "Pesquisadores Doutores (D.Sc.)", data: doctors },
                        { title: "Pesquisadores Mestres (M.Sc.)", data: masters },
                        { title: "Iniciação Científica (Graduação)", data: undergraduates }
                    ].map((section, sectionIdx) => (
                        <section key={section.title}>
                            <h3 className="font-mono text-sm font-bold text-muted-foreground uppercase tracking-widest mb-8 border-b border-slate-200 dark:border-slate-800 pb-2">
                                &gt; {section.title}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {section.data.map((member: any, i: number) => (
                                    <motion.div
                                        key={member.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all hover:-translate-y-1 duration-300 p-6 flex flex-col items-center text-center rounded-lg group h-full"
                                    >
                                        <div className="w-24 h-24 mb-6 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-950 overflow-hidden shrink-0 relative shadow-sm group-hover:shadow-md transition-shadow">
                                            {member.image && member.image !== "/images/team/avatar-placeholder.jpg" ? (
                                                <img src={getAssetPath(member.image)} alt={member.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                    <User className="w-10 h-10" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="w-full flex-1 flex flex-col">
                                            <h4 className="font-bold text-sm text-foreground line-clamp-2 mb-1 min-h-[2.5em] flex items-center justify-center" title={member.name}>{member.name}</h4>
                                            <p className="font-mono text-[10px] text-primary/80 uppercase tracking-wide mb-4">{member.focus}</p>

                                            <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 w-full">
                                                <Link href={member.lattes} target="_blank" className="inline-flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-primary uppercase tracking-wider transition-colors w-full">
                                                    Lattes <FileText className="w-3 h-3" />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}
