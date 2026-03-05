import PublicacoesClient from '@/app/[locale]/(site)/publicacoes/PublicacoesClient';
import { getPublications } from '@/lib/data/publications';
import { getTranslations , setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
    setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'MetadataPublications' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function PublicacoesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
    setRequestLocale(locale);
  const publications = await getPublications(locale);
  return <PublicacoesClient publications={publications} />;
}
