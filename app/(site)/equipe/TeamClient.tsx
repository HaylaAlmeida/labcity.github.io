'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { User, ArrowLeft, Mail, Linkedin, Search, X } from 'lucide-react';
import { LattesIcon } from '@/components/icons/LattesIcon';
import Link from 'next/link';
import type { TeamData, TeamMember } from '@/lib/data/team';
import { getAssetPath } from '@/lib/utils';
import { cn } from '@/lib/utils';

// Labels for level display
const levelLabels: Record<string, string> = {
  coordinator: 'Coordenação',
  researcher: 'Pesquisador',
  phd: 'Doutorado',
  masters: 'Mestrado',
  graduates: 'Graduado',
  ic: 'Iniciação Científica',
  dev_fellow: 'Bolsista de Desenvolvimento',
};

// Priority order for sorting
const levelPriority: Record<string, number> = {
  coordinator: 0,
  researcher: 1,
  phd: 2,
  masters: 3,
  graduates: 4,
  ic: 5,
  dev_fellow: 6,
};

// All level filter options
const levelFilters = [
  { id: 'all', label: 'Todos' },
  { id: 'coordinator', label: 'Coordenação' },
  { id: 'researcher', label: 'Pesquisador' },
  { id: 'phd', label: 'Doutorado' },
  { id: 'masters', label: 'Mestrado' },
  { id: 'ic', label: 'Iniciação Científica' },
  { id: 'dev_fellow', label: 'Bolsista de Desenvolvimento' },
];

export default function TeamClient({ team }: { team: TeamData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLevel, setActiveLevel] = useState('all');

  const { coordinators, members } = team;

  // Combine all team members for unified filtering
  const allMembers = useMemo(() => {
    const coordsWithLevel = coordinators.map(c => ({ ...c, level: 'coordinator' as string }));
    return [...coordsWithLevel, ...members];
  }, [coordinators, members]);

  // Filter and sort members
  const filteredMembers = useMemo(() => {
    let result = allMembers;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(m =>
        m.name.toLowerCase().includes(query) ||
        (m.focus && m.focus.toLowerCase().includes(query)) ||
        (m.bio && m.bio.toLowerCase().includes(query))
      );
    }

    // Filter by level
    if (activeLevel !== 'all') {
      result = result.filter(m => m.level === activeLevel);
    }

    // Sort by level priority then alphabetically
    result.sort((a, b) => {
      const priorityA = levelPriority[a.level || ''] ?? 99;
      const priorityB = levelPriority[b.level || ''] ?? 99;
      if (priorityA !== priorityB) return priorityA - priorityB;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [allMembers, searchQuery, activeLevel]);

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

        {/* Search and Filters */}
        <div className="space-y-4 mb-12">
          {/* Search Input */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Level Filters */}
          <div className="flex flex-wrap gap-2">
            {levelFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveLevel(filter.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeLevel === filter.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-white dark:bg-slate-900 text-muted-foreground border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:text-foreground"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          {filteredMembers.length} {filteredMembers.length === 1 ? 'membro encontrado' : 'membros encontrados'}
        </p>

        {/* Team Sections */}
        <div className="space-y-16">
          {/* Coordinators Section */}
          {filteredMembers.filter(m => m.level === 'coordinator').length > 0 && (
            <section>
              <h3 className="font-mono text-sm font-bold text-muted-foreground uppercase tracking-widest mb-8 border-b border-slate-200 dark:border-slate-800 pb-2">
                &gt; Coordenadores
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredMembers.filter(m => m.level === 'coordinator').map((member, i) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.02 }}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-start gap-4 group hover:border-primary/50 hover:shadow-sm transition-all duration-300"
                  >
                    {/* Photo - Left */}
                    <div className="w-24 h-24 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden ring-2 ring-slate-100 dark:ring-slate-800 group-hover:ring-primary/30 transition-all">
                      {member.image && member.image !== '/images/team/avatar-placeholder.jpg' ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={getAssetPath(member.image)} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-600">
                          <User className="w-10 h-10" />
                        </div>
                      )}
                    </div>

                    {/* Info - Right */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-lg text-foreground truncate" title={member.name}>
                        {member.name}
                      </h4>
                      <p className="text-sm text-primary font-medium mb-2">
                        {member.role || 'Coordenador(a)'}
                      </p>
                      <div className="w-full h-px bg-slate-200 dark:bg-slate-700 mb-2" />
                      {(member.bio || member.focus) && (
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4 mb-3">
                          {member.bio || member.focus}
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        {member.lattes && member.lattes !== '#' && (
                          <Link href={member.lattes} target="_blank" title="Currículo Lattes" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white text-xs font-medium transition-colors">
                            <LattesIcon className="w-3.5 h-3.5" /> Lattes
                          </Link>
                        )}
                        {member.email && member.email !== '#' && (
                          <Link href={`mailto:${member.email}`} title="Email" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-red-500 hover:text-white transition-colors">
                            <Mail className="w-4 h-4" />
                          </Link>
                        )}
                        {member.linkedin && member.linkedin !== '#' && (
                          <Link href={member.linkedin} target="_blank" title="LinkedIn" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-[#0077b5] hover:text-white transition-colors">
                            <Linkedin className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Members Section */}
          {filteredMembers.filter(m => m.level !== 'coordinator').length > 0 && (
            <section>
              <h3 className="font-mono text-sm font-bold text-muted-foreground uppercase tracking-widest mb-8 border-b border-slate-200 dark:border-slate-800 pb-2">
                &gt; Membros
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredMembers.filter(m => m.level !== 'coordinator').map((member, i) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.02 }}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-start gap-4 group hover:border-primary/50 hover:shadow-sm transition-all duration-300"
                  >
                    {/* Photo - Left */}
                    <div className="w-20 h-20 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden ring-2 ring-slate-100 dark:ring-slate-800 group-hover:ring-primary/30 transition-all">
                      {member.image && member.image !== '/images/team/avatar-placeholder.jpg' ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={getAssetPath(member.image)} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-600">
                          <User className="w-8 h-8" />
                        </div>
                      )}
                    </div>

                    {/* Info - Right */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-base text-foreground truncate" title={member.name}>
                        {member.name}
                      </h4>
                      <p className="text-sm text-primary font-medium mb-2">
                        {levelLabels[member.level || ''] || 'Membro'}
                      </p>
                      <div className="w-full h-px bg-slate-200 dark:bg-slate-700 mb-2" />
                      {member.bio && (
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4 mb-3">
                          {member.bio}
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        {member.lattes && member.lattes !== '#' && (
                          <Link href={member.lattes} target="_blank" title="Currículo Lattes" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white text-xs font-medium transition-colors">
                            <LattesIcon className="w-3.5 h-3.5" /> Lattes
                          </Link>
                        )}
                        {member.email && member.email !== '#' && (
                          <Link href={`mailto:${member.email}`} title="Email" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-red-500 hover:text-white transition-colors">
                            <Mail className="w-4 h-4" />
                          </Link>
                        )}
                        {member.linkedin && member.linkedin !== '#' && (
                          <Link href={member.linkedin} target="_blank" title="LinkedIn" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-[#0077b5] hover:text-white transition-colors">
                            <Linkedin className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Empty state */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-16">
            <User className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
            <p className="text-muted-foreground">Nenhum membro encontrado com os filtros selecionados.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveLevel('all'); }}
              className="mt-4 text-primary hover:underline text-sm"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
