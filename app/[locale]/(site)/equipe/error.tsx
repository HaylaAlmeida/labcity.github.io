'use client';

import { useEffect } from 'react';
import NotFound from '@/app/[locale]/(site)/not-found';

export default function Error({ error }: { error: Error }) {
    useEffect(() => {
        console.error("Erro capturado pela boundary de equipe:", error);
    }, [error]);

    // Redireciona visualmente para a página 404 em caso de erro na renderização
    return <NotFound />;
}
