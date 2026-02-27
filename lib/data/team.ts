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
  level?: string;
  specialties?: string[];
  bio?: string;
}

export interface Coordinator extends TeamMember {
  role: string;
}

export type TeamData = {
  coordinators: Coordinator[];
  members: TeamMember[];
};

const TAG = 'sanity:team';

// Priority order for sorting members by level
const levelPriority: Record<string, number> = {
  phd: 1,
  masters: 2,
  graduates: 3,
  ic: 4,
  dev_fellow: 5,
  researcher: 6,
};

export async function getTeam(lang: string = 'pt'): Promise<TeamData> {
  console.log('[Sanity] Check Enabled:', isSanityEnabled());
  if (!isSanityEnabled()) {
    // Fallback to local content - combine all non-coordinators into members
    const allMembers = [
      ...localDoctors.map(m => ({ ...m, level: 'phd' })),
      ...localMasters.map(m => ({ ...m, level: 'masters' })),
      ...localBachelors.map(m => ({ ...m, level: 'graduates' })),
      ...localUndergraduates.map(m => ({ ...m, level: 'ic' })),
    ];

    allMembers.sort((a, b) => {
      const priorityA = levelPriority[a.level] || 99;
      const priorityB = levelPriority[b.level] || 99;
      if (priorityA !== priorityB) return priorityA - priorityB;
      return a.name.localeCompare(b.name);
    });

    return {
      coordinators: localCoordinators as Coordinator[],
      members: allMembers,
    };
  }

  const query = `*[_type == "person"] | order(order asc, name asc) {
    "id": coalesce(id, _id),
    name,
    role,
    "focus": coalesce(focus[$lang], focus.pt, ""),
    lattes,
    email,
    linkedin,
    "image": coalesce(image.asset->url, imageUrl),
    level,
    specialties,
    "bio": coalesce(bio[$lang], bio.pt, "")
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
    level?: string;
    specialties?: string[];
    bio?: string;
  };

  let people: SanityPerson[];
  try {
    people = await sanityQuery<SanityPerson[]>(query, { lang }, { tags: [TAG], revalidate: 30 });
    console.log('[Sanity] Fetched People:', people.length);
  } catch (err) {
    console.error('[Sanity] getTeam failed, falling back to local content', err);
    const allMembers = [
      ...localDoctors.map(m => ({ ...m, level: 'phd' })),
      ...localMasters.map(m => ({ ...m, level: 'masters' })),
      ...localBachelors.map(m => ({ ...m, level: 'graduates' })),
      ...localUndergraduates.map(m => ({ ...m, level: 'ic' })),
    ];
    allMembers.sort((a, b) => {
      const priorityA = levelPriority[a.level] || 99;
      const priorityB = levelPriority[b.level] || 99;
      if (priorityA !== priorityB) return priorityA - priorityB;
      return a.name.localeCompare(b.name);
    });
    return {
      coordinators: localCoordinators as Coordinator[],
      members: allMembers,
    };
  }

  if (!people.length) {
    const allMembers = [
      ...localDoctors.map(m => ({ ...m, level: 'phd' })),
      ...localMasters.map(m => ({ ...m, level: 'masters' })),
      ...localBachelors.map(m => ({ ...m, level: 'graduates' })),
      ...localUndergraduates.map(m => ({ ...m, level: 'ic' })),
    ];
    allMembers.sort((a, b) => {
      const priorityA = levelPriority[a.level] || 99;
      const priorityB = levelPriority[b.level] || 99;
      if (priorityA !== priorityB) return priorityA - priorityB;
      return a.name.localeCompare(b.name);
    });
    return {
      coordinators: localCoordinators as Coordinator[],
      members: allMembers,
    };
  }

  const coordinators: Coordinator[] = people
    .filter((p) => p.level === 'coordinator')
    .map((p) => ({
      id: p.id,
      name: p.name,
      role: p.role || '',
      focus: p.focus || '',
      lattes: p.lattes || '#',
      email: p.email || '',
      linkedin: p.linkedin || '',
      image: p.image || '/images/team/avatar-placeholder.jpg',
      specialties: p.specialties || [],
      bio: p.bio || '',
    }));

  const members: TeamMember[] = people
    .filter((p) => p.level !== 'coordinator')
    .map((p) => ({
      id: p.id,
      name: p.name,
      level: p.level,
      focus: p.focus || '',
      lattes: p.lattes || '#',
      email: p.email || '',
      linkedin: p.linkedin || '',
      image: p.image || '/images/team/avatar-placeholder.jpg',
      specialties: p.specialties || [],
      bio: p.bio || '',
    }));

  // Sort members by level priority then alphabetically
  members.sort((a, b) => {
    const priorityA = levelPriority[a.level || ''] || 99;
    const priorityB = levelPriority[b.level || ''] || 99;
    if (priorityA !== priorityB) return priorityA - priorityB;
    return a.name.localeCompare(b.name);
  });

  return {
    coordinators,
    members,
  };
}
