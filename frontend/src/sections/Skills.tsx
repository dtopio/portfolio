import { useFetch } from '../hooks/useFetch';
import { getSkills } from '../services/api';
import Section from '../components/Section';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import SkillBadge from '../components/SkillBadge';

const CATEGORY_ORDER = ['Frontend', 'Backend', 'Database', 'APIs & Auth', 'Tools & Testing'];

export default function Skills() {
  const { data: skills, loading, error } = useFetch(getSkills);

  const groups = (skills ?? []).reduce<Record<string, typeof skills>>((acc, skill) => {
    (acc[skill.category] ??= []).push(skill);
    return acc;
  }, {});

  const categories = Object.keys(groups).sort(
    (a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b)
  );

  return (
    <Section id="skills" index={2} title="Skills & Tech Stack">
      {loading && <LoadingState label="Loading skills…" />}
      {error && <ErrorState message={error} />}

      {!loading && !error && (
        <div className="columns-1 gap-8 sm:columns-2">
          {categories.map((category) => (
            <div key={category} className="mb-8 break-inside-avoid-column">
              <h3 className="mb-3 font-mono text-sm uppercase tracking-wide text-text-muted">
                {category}
              </h3>
              <div className="grid gap-2">
                {groups[category]!.map((skill) => (
                  <SkillBadge key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
