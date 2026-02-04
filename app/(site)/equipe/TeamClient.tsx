'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, FileText, ArrowLeft, Mail, Linkedin } from 'lucide-react';
import Link from 'next/link';
import type { TeamData } from '@/lib/data/team';
import { getAssetPath } from '@/lib/utils';
import { cn } from '@/lib/utils'; // Assuming cn exists, if not I'll standard class string

type TeamMember = {
  id: string;
  name: string;
  focus: string;
  lattes: string;
  email?: string;
  linkedin?: string;
  image: string;
  role?: string;
};

export default function TeamClient({ team }: { team: TeamData }) {
  const [activeTab, setActiveTab] = useState('all');

  const { coordinators, doctors, masters, bachelors, undergraduates } = team;

  // Enhance sorting helper
  const sortByName = (a: TeamMember, b: TeamMember) => a.name.localeCompare(b.name);

  // Sort all lists
  coordinators.sort(sortByName);
  doctors.sort(sortByName);
  masters.sort(sortByName);
  bachelors.sort(sortByName);
  undergraduates.sort(sortByName);

  const tabs = [
    { id: 'all', label: 'Todos' },
    { id: 'coordinators', label: 'Coordenação' },
    { id: 'doctors', label: 'Doutores' },
    { id: 'masters', label: 'Mestres' },
    { id: 'bachelors', label: 'Bacharéis' },
    { id: 'undergraduates', label: 'Iniciação Científica' },
  ];

  const shouldShow = (id: string) => activeTab === 'all' || activeTab === id;

  const otherSections = [
    { id: 'doctors', title: 'Pesquisadores Doutores (D.Sc.)', data: doctors },
    { id: 'masters', title: 'Pesquisadores Mestres (M.Sc.)', data: masters },
    { id: 'bachelors', title: 'Pesquisadores Bacharéis (B.Sc.)', data: bachelors },
    { id: 'undergraduates', title: 'Iniciação Científica (Graduação)', data: undergraduates },
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center md:text-left">
          <Link
            href="/#equipe"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">Nossa Equipe</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto md:mx-0">
            Conheça os pesquisadores e bolsistas que impulsionam a inovação no Labcity UFPA.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-16 justify-center md:justify-start">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-white dark:bg-slate-900 text-muted-foreground border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-20">
          {/* Coordinators Section */}
          {shouldShow('coordinators') && (
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
                      <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-400">
                        {coord.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={getAssetPath(coord.image)} alt={coord.name} className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-16 h-16" />
                        )}
                      </div>
                    </div>
                    <div className="text-center sm:text-left flex-1">
                      <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                        <span className="font-mono text-xs text-muted-foreground uppercase tracking-wide">{coord.role}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">{coord.name}</h2>
                      <p className="text-primary font-medium mb-4">{coord.focus}</p>

                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <Link
                          href={coord.lattes}
                          target="_blank"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-lg font-bold text-sm transition-colors"
                        >
                          <FileText className="w-4 h-4" /> Lattes
                        </Link>
                        {coord.linkedin && coord.linkedin !== '#' && (
                          <Link
                            href={coord.linkedin}
                            target="_blank"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-[#0077b5] hover:text-white rounded-lg font-bold text-sm transition-colors"
                          >
                            <Linkedin className="w-4 h-4" />
                          </Link>
                        )}
                        {coord.email && coord.email !== '#' && (
                          <Link
                            href={`mailto:${coord.email}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-red-500 hover:text-white rounded-lg font-bold text-sm transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Other Sections */}
          {otherSections.map((section) => (
            shouldShow(section.id) && (
              <section key={section.title}>
                <h3 className="font-mono text-sm font-bold text-muted-foreground uppercase tracking-widest mb-8 border-b border-slate-200 dark:border-slate-800 pb-2">
                  &gt; {section.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {section.data.map((member, i) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all hover:-translate-y-1 duration-300 p-6 flex flex-col items-center text-center rounded-lg group h-full"
                    >
                      <div className="w-24 h-24 mb-6 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-950 overflow-hidden shrink-0 relative shadow-sm group-hover:shadow-md transition-shadow">
                        {member.image && member.image !== '/images/team/avatar-placeholder.jpg' ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={getAssetPath(member.image)} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <User className="w-10 h-10" />
                          </div>
                        )}
                      </div>

                      <div className="w-full flex-1 flex flex-col">
                        <h4
                          className="font-bold text-sm text-foreground line-clamp-2 mb-1 min-h-[2.5em] flex items-center justify-center"
                          title={member.name}
                        >
                          {member.name}
                        </h4>
                        <p className="font-mono text-[10px] text-primary/80 uppercase tracking-wide mb-4">{member.focus}</p>

                        {/* Action Links */}
                        <div className="mt-auto flex items-center justify-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 w-full">
                          {member.lattes && member.lattes !== '#' && (
                            <Link
                              href={member.lattes}
                              target="_blank"
                              title="Currículo Lattes"
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                              <FileText className="w-4 h-4" />
                            </Link>
                          )}
                          {member.linkedin && member.linkedin !== '#' && (
                            <Link
                              href={member.linkedin}
                              target="_blank"
                              title="LinkedIn"
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-[#0077b5] hover:text-white transition-colors"
                            >
                              <Linkedin className="w-4 h-4" />
                            </Link>
                          )}
                          {member.email && member.email !== '#' && (
                            <Link
                              href={`mailto:${member.email}`}
                              title="Email"
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-red-500 hover:text-white transition-colors"
                            >
                              <Mail className="w-4 h-4" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )
          ))}
        </div>
      </div>
    </main>
  );
}
