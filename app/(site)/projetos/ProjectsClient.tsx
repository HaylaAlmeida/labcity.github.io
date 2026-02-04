"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Layers, Search } from 'lucide-react';
import Link from 'next/link';
import type { Project } from '@/lib/data/projects';
import { getAssetPath } from '@/lib/utils';

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Extract unique values
  const categories = Array.from(new Set(projects.map(p => p.category).filter(Boolean)));
  const statuses = Array.from(new Set(projects.map(p => p.status).filter(Boolean)));

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? project.category === selectedCategory : true;
    const matchesStatus = selectedStatus ? project.status === selectedStatus : true;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16">
          <Link
            href="/#projetos"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para Home
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">Nossos Projetos</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Conheça em detalhes as iniciativas que estão transformando a Amazônia e o Brasil através da tecnologia.
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="w-full flex flex-col md:flex-row gap-4 mt-8 items-center">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar projetos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all w-full md:w-96"
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <select
                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-primary/20 flex-1 md:flex-none cursor-pointer"
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
              >
                <option value="">Todas as Categorias</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-primary/20 flex-1 md:flex-none cursor-pointer"
                value={selectedStatus || ""}
                onChange={(e) => setSelectedStatus(e.target.value || null)}
              >
                <option value="">Todos os Status</option>
                {statuses.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all group flex flex-col"
              >
                <div className="h-48 bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                  {project.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={getAssetPath(project.image)}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <Layers className="w-12 h-12 opacity-50" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    {project.status}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-bold text-primary mb-2 uppercase tracking-wide">{project.category}</span>
                  <h3 className="text-xl font-bold text-foreground mb-3">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6 flex-1 line-clamp-3">{project.description}</p>

                  <Link
                    href={`/projetos/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors mt-auto"
                  >
                    Ver Detalhes do Projeto <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-24 text-slate-500">
              Nenhum projeto encontrado para os filtros selecionados.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
