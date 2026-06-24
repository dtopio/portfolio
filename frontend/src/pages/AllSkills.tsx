import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getSkills } from '../services/api';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import SkillBadge from '../components/SkillBadge';
import AddSkillDialog from '../components/AddSkillDialog';

const CATEGORY_ORDER = ['Frontend', 'Backend', 'Database', 'APIs & Auth', 'Tools & Testing'];

export default function AllSkills() {
  const { data: skills, loading, error, refetch } = useFetch(getSkills);

  const groups = (skills ?? []).reduce<Record<string, typeof skills>>((acc, skill) => {
    (acc[skill.category] ??= []).push(skill);
    return acc;
  }, {});

  const categories = Object.keys(groups).sort(
    (a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b)
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Link to="/#skills" className="text-sm text-accent hover:underline">
        ← Back to portfolio
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-heading sm:text-3xl">All Skills</h1>
        <AddSkillDialog onCreated={refetch} />
      </div>

      {loading && <LoadingState label="Loading skills…" />}
      {error && <ErrorState message={error} />}

      {!loading && !error && (
        <div className="mt-10 columns-1 gap-8 sm:columns-2">
          {categories.map((category) => (
            <div key={category} className="mb-8 break-inside-avoid-column">
              <h2 className="mb-3 font-mono text-sm uppercase tracking-wide text-text-muted">
                {category}
              </h2>
              <div className="grid gap-2">
                {groups[category]!.map((skill) => (
                  <SkillBadge key={skill.id} skill={skill} onUpdated={refetch} />
                ))}
              </div>
            </div>
          ))}
          {categories.length === 0 && (
            <p className="text-text-muted">No skills yet — add your first one above.</p>
          )}
        </div>
      )}
    </div>
  );
}
