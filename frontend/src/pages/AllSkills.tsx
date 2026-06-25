import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFetch } from '../hooks/useFetch';
import { getSkills } from '../services/api';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import SkillCard from '../components/SkillCard';
import AddSkillDialog from '../components/AddSkillDialog';
import RenameCategoryDialog from '../components/RenameCategoryDialog';
import FilterCombobox from '../components/FilterCombobox';
import { staggerContainer } from '../lib/motion';

const CATEGORY_ORDER = ['Frontend', 'Backend', 'Database', 'APIs & Auth', 'Tools & Testing'];

export default function AllSkills() {
  const { data: skills, loading, error, refetch } = useFetch(['skills'], getSkills);
  const [filter, setFilter] = useState<string | null>(null);

  const groups = (skills ?? []).reduce<Record<string, typeof skills>>((acc, skill) => {
    (acc[skill.category] ??= []).push(skill);
    return acc;
  }, {});

  const allCategories = useMemo(
    () =>
      Object.keys(groups).sort(
        (a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b)
      ),
    [groups]
  );

  const visibleCategories = filter ? allCategories.filter((c) => c === filter) : allCategories;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Link to="/#skills" className="text-sm text-accent hover:underline">
        ← Back to portfolio
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-heading sm:text-3xl">All Skills</h1>
        <AddSkillDialog onCreated={refetch} categories={allCategories} />
      </div>

      {loading && <LoadingState label="Loading skills…" />}
      {error && <ErrorState message={error} />}

      {!loading && !error && (
        <>
          {allCategories.length > 0 && (
            <div className="mt-8">
              <FilterCombobox
                value={filter}
                onValueChange={setFilter}
                options={allCategories}
                placeholder="Filter by category"
                className="w-full sm:w-64"
              />
            </div>
          )}

          <div className="mt-8 space-y-10">
            {visibleCategories.map((category) => (
              <div key={category}>
                <div className="mb-4 flex items-center gap-1.5">
                  <h2 className="font-mono text-sm uppercase tracking-wide text-text-muted">
                    {category}
                  </h2>
                  <RenameCategoryDialog
                    category={category}
                    count={groups[category]!.length}
                    onRenamed={refetch}
                  />
                </div>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  className="flex flex-wrap gap-3"
                >
                  {groups[category]!.map((skill) => (
                    <SkillCard
                      key={skill.id}
                      skill={skill}
                      onUpdated={refetch}
                      categories={allCategories}
                    />
                  ))}
                </motion.div>
              </div>
            ))}
            {allCategories.length === 0 && (
              <p className="text-text-muted">No skills yet — add your first one above.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
