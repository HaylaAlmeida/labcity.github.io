'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';
import { LabcityLogo } from '@/components/ui/labcity-logo';
import { useTranslations } from 'next-intl';

export function InstitutionalHistory() {
    const t = useTranslations('HistorySection');

    const timelineItems = [
        {
            id: 'lprad',
            year: '2010',
            title: 'LPRAD',
            subtitle: t('lpradSubtitle'),
            description: t('lpradDesc'),
            logo: '/images/3_lprad.jpg',
            isCurrent: false
        },
        {
            id: 'lts',
            year: '2015',
            title: 'LTS',
            subtitle: t('ltsSubtitle'),
            description: t('ltsDesc'),
            logo: '/images/6_lts.jpg',
            isCurrent: false
        },
        {
            id: 'labcity',
            year: '2024',
            title: 'LABCITY',
            subtitle: t('labcitySubtitle'),
            description: t('labcityDesc'),
            logo: 'labcity-component', // Special flag to use component
            isCurrent: true
        }
    ];

    return (
        <section id="historia" className="py-24 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">{t('title')}</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t('description')}
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[140px] left-[16.66%] right-[16.66%] h-0.5 bg-slate-200 dark:bg-slate-800 -z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                        {timelineItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative flex flex-col items-center text-center group"
                            >
                                {/* Year Bubble */}
                                <div className="mb-6 px-4 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold font-mono text-slate-500 z-10">
                                    {item.year}
                                </div>

                                {/* Logo Circle */}
                                <div className={`relative w-48 h-48 mb-8 rounded-full bg-white border-4 shadow-xl flex items-center justify-center p-6 z-10 transition-transform duration-500 group-hover:scale-105 ${item.isCurrent ? 'border-primary shadow-primary/20' : 'border-white dark:border-slate-700'}`}>
                                    {item.logo === 'labcity-component' ? (
                                        <LabcityLogo className="w-full transform scale-125 [&_img]:!filter-none" iconOnly={false} />
                                    ) : (
                                        <div className="relative w-full h-full transform scale-110">
                                            <Image
                                                src={getAssetPath(item.logo)}
                                                alt={`Logo ${item.title}`}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="space-y-3 px-4">
                                    <h3 className={`text-2xl font-bold ${item.isCurrent ? 'text-primary' : 'text-foreground'}`}>
                                        {item.title}
                                    </h3>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground min-h-[40px] flex items-center justify-center">
                                        {item.subtitle}
                                    </h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed mt-4 text-justify">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
