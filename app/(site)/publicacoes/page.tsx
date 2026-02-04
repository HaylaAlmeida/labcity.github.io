import PublicacoesClient from '@/app/(site)/publicacoes/PublicacoesClient';
import { getPublications } from '@/lib/data/publications';

export default async function PublicacoesPage() {
  const publications = await getPublications();
  return <PublicacoesClient publications={publications} />;
}
