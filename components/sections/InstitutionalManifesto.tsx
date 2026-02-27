'use client';

import { motion } from 'framer-motion';
import { Target, Cpu, Users, Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function InstitutionalManifesto() {
    const t = useTranslations('Institutional');
    return (
        <div className="flex flex-col gap-12">
            {/* Header Block */}
            <div className="w-full">
                <span className="font-mono text-xs font-bold text-primary mb-4 block uppercase tracking-widest">
                    {t('manifestoTag')}
                </span>
                <h2 className="text-3xl font-bold mb-6 text-foreground tracking-tight leading-tight">
                    {t('manifestoTitleLine1')} <br />
                    <span className="text-primary">{t('manifestoTitleLine2')}</span>
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8 border-l-2 border-primary/20 pl-4">
                    {t('manifestoDesc')}
                </p>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="block text-2xl font-bold text-primary mb-1">2024</span>
                        <span className="text-[10px] font-mono text-muted-foreground uppercase">{t('foundation')}</span>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="block text-2xl font-bold text-primary mb-1">Guamá</span>
                        <span className="text-[10px] font-mono text-muted-foreground uppercase">{t('campus')}</span>
                    </div>
                </div>
            </div>

            {/* Mission Grid Block */}
            <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                    {[
                        {
                            icon: Target,
                            title: t('goalTitle'),
                            desc: t('goalDesc')
                        },
                        {
                            icon: Cpu,
                            title: t('stackTitle'),
                            desc: t('stackDesc')
                        },
                        {
                            icon: Users,
                            title: t('capitalTitle'),
                            desc: t('capitalDesc')
                        },
                        {
                            icon: Globe,
                            title: t('contextTitle'),
                            desc: t('contextDesc')
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white dark:bg-slate-950 p-8 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <item.icon className="w-5 h-5 text-primary" />
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">{item.title}</span>
                            </div>
                            <p className="text-foreground text-sm font-medium leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

