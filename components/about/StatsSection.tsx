import { getProjects } from "@/lib/data/projects";
import { getPublications } from "@/lib/data/publications";
import { getTeam } from "@/lib/data/team";
import { getPartners } from "@/lib/data/partners";
import { StatsClient } from "@/components/about/StatsClient";

export async function StatsSection() {
    const [projects, publications, team, partners] = await Promise.all([
        getProjects(),
        getPublications(),
        getTeam(),
        getPartners(),
    ]);

    const projectsCount = projects.length;
    const publicationsCount = publications.length;

    // Calculate total researchers
    const researchersCount =
        (team.coordinators?.length || 0) +
        (team.doctors?.length || 0) +
        (team.masters?.length || 0) +
        (team.bachelors?.length || 0) +
        (team.undergraduates?.length || 0);

    const partnersCount = partners.length;

    return (
        <StatsClient
            projectsCount={projectsCount}
            researchersCount={researchersCount}
            patentsCount={publicationsCount}
            partnersCount={partnersCount}
        />
    );
}
