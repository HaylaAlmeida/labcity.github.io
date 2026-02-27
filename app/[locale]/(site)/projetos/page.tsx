import ProjectsClient from '@/app/[locale]/(site)/projetos/ProjectsClient';
import { getProjects } from '@/lib/data/projects';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MetadataProjects' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const projects = await getProjects(locale);
  return <ProjectsClient projects={projects} />;
}
