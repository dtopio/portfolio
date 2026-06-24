import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getSkills } from '../services/api';
import Section from '../components/Section';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import SkillBadge from '../components/SkillBadge';
import AddSkillDialog from '../components/AddSkillDialog';
import { Button } from '@/components/ui/button';

const FALLBACK_LIMIT = 6;

export default function Skills() {
  const { data: skills, loading, error, refetch } = useFetch(getSkills);

  const featured = (skills ?? []).filter((skill) => skill.featured);
  const fallback = (skills ?? [])
    .filter((skill) => skill.level === 'Advanced')
    .slice(0, FALLBACK_LIMIT);
  const teaser = featured.length > 0 ? featured : fallback;

  return (
    <Section
      id="skills"
      index={2}
      title="Skills & Tech Stack"
      subtitle="A few of the tools I reach for most."
      action={
        <div className="flex items-center gap-2">
          <AddSkillDialog onCreated={refetch} />
          <Button asChild variant="outline" size="sm">
            <Link to="/skills">View All Skills</Link>
          </Button>
        </div>
      }
    >
      {loading && <LoadingState label="Loading skills…" />}
      {error && <ErrorState message={error} />}

      {!loading && !error && teaser.length === 0 && (
        <p className="text-text-muted">
          No skills added yet — use "+ Add Skill" above to get started.
        </p>
      )}

      {!loading && !error && teaser.length > 0 && (
        <div className="grid gap-2 sm:grid-cols-2">
          {teaser.map((skill) => (
            <SkillBadge key={skill.id} skill={skill} editable={false} />
          ))}
        </div>
      )}
    </Section>
  );
}
