import ProjectsClient from '@/app/(site)/projetos/ProjectsClient';
import { getProjects } from '@/lib/data/projects';

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsClient projects={projects} />;
}
