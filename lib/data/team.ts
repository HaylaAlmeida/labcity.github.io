import { isSanityEnabled, sanityQuery } from '@/lib/cms/sanity';
import {
  coordinators as localCoordinators,
  doctors as localDoctors,
  masters as localMasters,
  bachelors as localBachelors,
  undergraduates as localUndergraduates,
} from '@/lib/content';

export interface TeamMember {
  id: string;
  name: string;
  role?: string;
  focus: string;
  lattes: string;
  email?: string;
  linkedin?: string;
  image?: string;
}

export interface Coordinator extends TeamMember {
  role: string;
}

export type TeamData = {
  coordinators: Coordinator[];
  doctors: TeamMember[];
  masters: TeamMember[];
  bachelors: TeamMember[];
  undergraduates: TeamMember[];
};

const TAG = 'sanity:team';

export async function getTeam(): Promise<TeamData> {
  console.log('[Sanity] Check Enabled:', isSanityEnabled());
  if (!isSanityEnabled()) {
    return {
      coordinators: localCoordinators as Coordinator[],
      doctors: localDoctors,
      masters: localMasters,
      bachelors: localBachelors,
      undergraduates: localUndergraduates,
    };
  }

  const query = `*[_type == "person"] | order(order asc, name asc) {
    "id": coalesce(id, _id),
    name,
    role,
    focus,
    lattes,
    email,
    linkedin,
    "image": coalesce(image.asset->url, imageUrl),
    level
  }`;

  type SanityPerson = {
    id: string;
    name: string;
    role?: string;
    focus?: string;
    lattes?: string;
    email?: string;
    linkedin?: string;
    image?: string;
    level?: 'coordinator' | 'doctor' | 'master' | 'bachelor' | 'undergraduate';
  };

  let people: SanityPerson[];
  try {
    people = await sanityQuery<SanityPerson[]>(query, {}, { tags: [TAG], revalidate: 30 });
    console.log('[Sanity] Fetched People:', people.length, people);
  } catch (err) {
    console.error('[Sanity] getTeam failed, falling back to local content', err);
    return {
      coordinators: localCoordinators,
      doctors: localDoctors,
      masters: localMasters,
      bachelors: localBachelors,
      undergraduates: localUndergraduates,
    };
  }

  if (!people.length) {
    return {
      coordinators: localCoordinators,
      doctors: localDoctors,
      masters: localMasters,
      bachelors: localBachelors,
      undergraduates: localUndergraduates,
    };
  }

  const coordinators: Coordinator[] = people
    .filter((p) => p.level === 'coordinator')
    .map((p) => ({
      id: p.id,
      name: p.name,
      role: p.role || 'Coordenador(a)',
      focus: p.focus || '',
      lattes: p.lattes || '#',
      email: p.email || '',
      linkedin: p.linkedin || '',
      image: p.image || '/images/team/avatar-placeholder.jpg',
    }));

  const doctors: TeamMember[] = people
    .filter((p) => p.level === 'doctor')
    .map((p) => ({
      id: p.id,
      name: p.name,
      focus: p.focus || '',
      lattes: p.lattes || '#',
      email: p.email || '',
      linkedin: p.linkedin || '',
      image: p.image || '/images/team/avatar-placeholder.jpg',
    }));

  const masters: TeamMember[] = people
    .filter((p) => p.level === 'master')
    .map((p) => ({
      id: p.id,
      name: p.name,
      focus: p.focus || '',
      lattes: p.lattes || '#',
      email: p.email || '',
      linkedin: p.linkedin || '',
      image: p.image || '/images/team/avatar-placeholder.jpg',
    }));



  const bachelors: TeamMember[] = people
    .filter((p) => p.level === 'bachelor')
    .map((p) => ({
      id: p.id,
      name: p.name,
      focus: p.focus || '',
      lattes: p.lattes || '#',
      email: p.email || '',
      linkedin: p.linkedin || '',
      image: p.image || '/images/team/avatar-placeholder.jpg',
    }));



  const undergraduates: TeamMember[] = people
    .filter((p) => p.level === 'undergraduate')
    .map((p) => ({
      id: p.id,
      name: p.name,
      focus: p.focus || '',
      lattes: p.lattes || '#',
      email: p.email || '',
      linkedin: p.linkedin || '',
      image: p.image || '/images/team/avatar-placeholder.jpg',
    }));

  return {
    coordinators,
    doctors,
    masters,
    bachelors,
    undergraduates,
  };
}
