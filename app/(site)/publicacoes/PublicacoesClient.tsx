'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import type { Publication } from '@/lib/data/publications';
import { cn } from '@/lib/utils';

const typeLabels: Record<string, string> = {
  article: 'Artigo Científico',
  tcc: 'Trabalho de Conclusão de Curso',
  masters_thesis: 'Dissertação de Mestrado',
  doctoral_thesis: 'Tese de Doutorado',
  software: 'Registro de Software',
  patent: 'Patente',
  journal: 'Artigo Científico',
  conference: 'Conferência',
  book: 'Livro',
  thesis: 'Tese',
};

// Expandable abstract inside Link cards
function ExpandableAbstract({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 150;

  return (
    <div className="mt-3 mb-3">
      <p className={cn(
        'text-sm text-muted-foreground leading-relaxed transition-all',
        !expanded && isLong && 'line-clamp-2'
      )}>
        {text}
      </p>
      {isLong && (
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setExpanded(!expanded); }}
          className="text-xs text-primary hover:text-primary/80 font-medium mt-1 flex items-center gap-0.5 transition-colors"
        >
          {expanded ? 'Ver menos' : 'Ver mais'}
          <ChevronDown className={cn('w-3 h-3 transition-transform', expanded && 'rotate-180')} />
        </button>
      )}
    </div>
  );
}

const tabs = [
  {
    id: 'academico',
    label: 'Produção Acadêmica',
    types: ['article', 'journal', 'conference', 'book', 'tcc', 'masters_thesis', 'doctoral_thesis', 'thesis'],
  },
  {
    id: 'software',
    label: 'Registro de Software',
    types: ['software'],
  },
  // {
  //   id: 'patent',
  //   label: 'Patentes',
  //   types: ['patent'],
  // },
];

export default function PublicacoesClient({ publications }: { publications: Publication[] }) {
  const [activeTab, setActiveTab] = useState('academico');
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Independent filter state per tab
  const [filterState, setFilterState] = useState<Record<string, { search: string; type: string | null; year: string | null; tag: string | null }>>({
    academico: { search: '', type: null, year: null, tag: null },
    software: { search: '', type: null, year: null, tag: null },
    patent: { search: '', type: null, year: null, tag: null },
  });

  const currentTab = tabs.find(t => t.id === activeTab)!;
  const currentFilters = filterState[activeTab];

  const updateFilter = (key: 'search' | 'type' | 'year' | 'tag', value: string | null) => {
    setFilterState(prev => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], [key]: value },
    }));
  };

  // Scope publications to current tab
  const scopedPublications = publications.filter(p => currentTab.types.includes(p.type));

  // Available sub-types and years for current tab
  const availableTypes = Array.from(new Set(scopedPublications.map(p => p.type).filter(Boolean)));
  const availableYears = Array.from(new Set(scopedPublications.map(p => p.year))).sort((a, b) => b - a);
  const availableTags = Array.from(new Set(scopedPublications.flatMap(p => p.tags?.filter(Boolean) ?? []))).sort();

  // Apply filters
  const filteredPublications = scopedPublications
    .filter(pub => {
      const searchLower = (currentFilters.search || '').toLowerCase();
      const matchesSearch = !searchLower ||
        pub.title.toLowerCase().includes(searchLower) ||
        pub.venue.toLowerCase().includes(searchLower) ||
        pub.authors.some(a => a.toLowerCase().includes(searchLower));
      const matchesType = currentFilters.type ? pub.type === currentFilters.type : true;
      const matchesYear = currentFilters.year ? pub.year.toString() === currentFilters.year : true;
      const matchesTag = currentFilters.tag ? pub.tags?.some(t => t === currentFilters.tag) : true;
      return matchesSearch && matchesType && matchesYear && matchesTag;
    })
    .sort((a, b) => b.year - a.year);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12">
          <Link
            href="/#publicacoes"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para Home
          </Link>
          <div className="mb-8">
            <span className="font-mono text-xs font-bold text-primary mb-2 block uppercase tracking-wider">
              Produção Científica & Inovação
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground mb-4">
              Nossas Produções
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
              Artigos e registros de software produzidos pelo nosso grupo de pesquisa.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8">
            {tabs.map(tab => {
              const count = publications.filter(p => tab.types.includes(p.type)).length;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-3 text-sm font-bold transition-colors ${activeTab === tab.id
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {tab.label}
                  <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id
                    ? 'bg-blue-100 dark:bg-blue-900/40 text-primary'
                    : 'bg-slate-100 dark:bg-slate-800 text-muted-foreground'
                    }`}>
                    {count}
                  </span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Search and Filters */}
          {(() => {
            const activeFilterCount = [currentFilters.type, currentFilters.year, currentFilters.tag].filter(Boolean).length;

            const filterSelects = (
              <>
                {availableTypes.length > 1 && (
                  <select
                    className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-primary/20 flex-1 md:flex-none cursor-pointer"
                    value={currentFilters.type || ''}
                    onChange={(e) => updateFilter('type', e.target.value || null)}
                  >
                    <option value="">Todos os Tipos</option>
                    {availableTypes.map(t => (
                      <option key={t} value={t}>{typeLabels[t] || t}</option>
                    ))}
                  </select>
                )}

                <select
                  className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-primary/20 flex-1 md:flex-none cursor-pointer"
                  value={currentFilters.year || ''}
                  onChange={(e) => updateFilter('year', e.target.value || null)}
                >
                  <option value="">Todos os Anos</option>
                  {availableYears.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>

                {availableTags.length > 0 && (
                  <select
                    className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-primary/20 flex-1 md:flex-none cursor-pointer"
                    value={currentFilters.tag || ''}
                    onChange={(e) => updateFilter('tag', e.target.value || null)}
                  >
                    <option value="">Todas as Tags</option>
                    {availableTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                )}
              </>
            );

            return (
              <div className="w-full flex flex-col gap-4 mb-12">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="relative w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Buscar (título, autor, evento)..."
                      value={currentFilters.search}
                      onChange={(e) => updateFilter('search', e.target.value)}
                      className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all w-full md:w-[28rem]"
                    />
                  </div>

                  {/* Mobile: Filter toggle button */}
                  <button
                    onClick={() => setFiltersOpen(!filtersOpen)}
                    className="flex md:hidden items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-medium w-full justify-center transition-colors hover:border-primary/50"
                  >
                    {filtersOpen ? <X className="w-4 h-4" /> : <SlidersHorizontal className="w-4 h-4" />}
                    Filtros
                    {activeFilterCount > 0 && (
                      <span className="ml-1 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>

                  {/* Desktop: inline selects */}
                  <div className="hidden md:flex gap-2">
                    {filterSelects}
                  </div>
                </div>

                {/* Mobile: animated filter panel */}
                <AnimatePresence>
                  {filtersOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden md:hidden"
                    >
                      <div className="flex flex-col gap-3 p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                        {filterSelects}
                        {activeFilterCount > 0 && (
                          <button
                            onClick={() => {
                              updateFilter('type', null);
                              updateFilter('year', null);
                              updateFilter('tag', null);
                            }}
                            className="text-xs text-primary hover:text-primary/80 font-medium self-end transition-colors"
                          >
                            Limpar Filtros
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })()}
        </div>

        {/* Publications List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {filteredPublications.length > 0 ? (
              filteredPublications.map((pub, index) => (
                <motion.div
                  key={pub.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Link
                    href={`/publicacoes/${pub.slug}`}
                    className="block p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-primary/50 hover:shadow-lg transition-all group"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                            {pub.title}
                          </h3>
                          <span className="text-sm text-muted-foreground shrink-0">• {pub.year}</span>
                        </div>

                        <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{pub.authors.join(', ')}</p>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="font-medium text-foreground/80">{pub.venue}</span>
                          <span>•</span>
                          <span className="text-blue-600 dark:text-blue-400 font-bold">{typeLabels[pub.type]}</span>
                        </div>

                        {pub.abstract && <ExpandableAbstract text={pub.abstract} />}

                        <div className="flex flex-wrap gap-2">
                          {pub.tags.filter(Boolean).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-primary group-hover:text-white transition-colors shrink-0 self-center">
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-24 text-slate-500">
                Nenhum item encontrado para os filtros selecionados.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
