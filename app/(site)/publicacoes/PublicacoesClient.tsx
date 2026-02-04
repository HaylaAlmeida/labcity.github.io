'use client';



import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Search } from 'lucide-react';
import Link from 'next/link';
import type { Publication } from '@/lib/data/publications';

const typeLabels: Record<string, string> = {
  article: 'Artigo Científico',
  tcc: 'Trabalho de Conclusão de Curso',
  masters_thesis: 'Dissertação de Mestrado',
  doctoral_thesis: 'Tese de Doutorado',
  software: 'Registro de Software',
  patent: 'Patente',
  journal: 'Artigo Científico', // Fallback
  conference: 'Conferência',
  book: 'Livro',
  thesis: 'Tese',
};

export default function PublicacoesClient({ publications }: { publications: Publication[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  // Extract unique values
  const types = Array.from(new Set(publications.map(p => p.type).filter(Boolean)));
  const years = Array.from(new Set(publications.map(p => p.year))).sort((a, b) => b - a); // Descending

  const filteredPublications = publications
    .filter(pub => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = pub.title.toLowerCase().includes(searchLower) ||
        pub.venue.toLowerCase().includes(searchLower) ||
        pub.authors.some(a => a.toLowerCase().includes(searchLower));
      const matchesType = selectedType ? pub.type === selectedType : true;
      const matchesYear = selectedYear ? pub.year.toString() === selectedYear : true;
      return matchesSearch && matchesType && matchesYear;
    })
    .sort((a, b) => b.year - a.year); // Always sort by year descending

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
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">Nossas Publicações</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Produção científica do nosso grupo de pesquisa em periódicos e conferências de alto impacto internacional.
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="w-full flex flex-col md:flex-row gap-4 mb-12 items-center">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar publicações (título, autor, evento)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all w-full md:w-[28rem]"
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <select
                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-primary/20 flex-1 md:flex-none cursor-pointer"
                value={selectedType || ""}
                onChange={(e) => setSelectedType(e.target.value || null)}
              >
                <option value="">Todos os Tipos</option>
                {types.map(t => (
                  <option key={t} value={t}>{typeLabels[t] || t}</option>
                ))}
              </select>

              <select
                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-primary/20 flex-1 md:flex-none cursor-pointer"
                value={selectedYear || ""}
                onChange={(e) => setSelectedYear(e.target.value || null)}
              >
                <option value="">Todos os Anos</option>
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Total de Publicações', value: publications.length },
            { label: 'Periódicos', value: publications.filter((p) => p.type === 'journal').length },
            { label: 'Conferências', value: publications.filter((p) => p.type === 'conference').length },
            { label: 'Ano mais recente', value: publications.length ? Math.max(...publications.map((p) => p.year)) : '-' },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center"
            >
              <div className="text-2xl md:text-3xl font-black text-primary mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div> */}

        <div className="space-y-4">
          {filteredPublications.length > 0 ? (
            filteredPublications.map((pub, index) => (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/publicacoes/${pub.slug}`}
                  className="block p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-primary/50 hover:shadow-lg transition-all group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 ">
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

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3 mt-3">{pub.abstract}</p>

                      <div className="flex flex-wrap gap-2">
                        {pub.tags.map((tag) => (
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
            <div className="col-span-full text-center py-24 text-slate-500">
              Nenhuma publicação encontrada para os filtros selecionados.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
