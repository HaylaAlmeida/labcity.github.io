import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
            <div className="text-center max-w-lg">

                {/* 404 Number */}
                <div className="mb-8">
                    <span className="text-[150px] md:text-[200px] font-black text-primary/10 leading-none select-none">
                        404
                    </span>
                </div>

                {/* Message */}
                <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4 -mt-16">
                    Página não encontrada
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                    A página que você está procurando não existe ou foi movida para outro endereço.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        Voltar ao Início
                    </Link>
                    <Link
                        href="/projetos"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-200 dark:bg-slate-800 text-foreground rounded-lg font-bold text-sm hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                    >
                        <Search className="w-4 h-4" />
                        Ver Projetos
                    </Link>
                </div>

                {/* Quick Links */}
                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-sm text-muted-foreground mb-4">Ou navegue para:</p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <Link href="/#sobre" className="text-primary hover:underline">Sobre</Link>
                        <Link href="/#pesquisa" className="text-primary hover:underline">Pesquisa</Link>
                        <Link href="/publicacoes" className="text-primary hover:underline">Publicações</Link>
                        <Link href="/equipe" className="text-primary hover:underline">Equipe</Link>
                    </div>
                </div>

            </div>
        </main>
    );
}
