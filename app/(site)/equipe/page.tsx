import TeamClient from './TeamClient';
import { getTeam } from '@/lib/data/team';

export default async function TeamPage() {
  const team = await getTeam();
  return <TeamClient team={team} />;
}
