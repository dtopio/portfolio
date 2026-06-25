import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFetch } from '../hooks/useFetch';
import { getProjects } from '../services/api';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import ProjectCard from '../components/ProjectCard';
import AddProjectDialog from '../components/AddProjectDialog';
import FilterCombobox from '../components/FilterCombobox';
import { staggerContainer } from '../lib/motion';

export default function AllProjects() {
  const { data: projects, loading, error, refetch } = useFetch(['projects'], getProjects);
  const [filter, setFilter] = useState<string | null>(null);

  const filters = useMemo(() => {
    const tags = new Set<string>();
    for (const project of projects ?? []) {
      project.tech_stack.forEach((tech) => tags.add(tech));
      project.tags.forEach((tag) => tags.add(tag));
    }
    return Array.from(tags).sort();
  }, [projects]);

  const visible = (projects ?? []).filter(
    (project) =>
      !filter || project.tech_stack.includes(filter) || project.tags.includes(filter)
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Link to="/#projects" className="text-sm text-accent hover:underline">
        ← Back to portfolio
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-heading sm:text-3xl">All Projects</h1>
        <AddProjectDialog onCreated={refetch} />
      </div>

      {loading && <LoadingState label="Loading projects…" />}
      {error && <ErrorState message={error} />}

      {!loading && !error && (
        <>
          {filters.length > 0 && (
            <div className="mt-8">
              <FilterCombobox
                value={filter}
                onValueChange={setFilter}
                options={filters}
                placeholder="Filter by tag"
                className="w-full sm:w-64"
              />
            </div>
          )}

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-8 grid gap-6 sm:grid-cols-2"
          >
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} onUpdated={refetch} />
            ))}
          </motion.div>

          {visible.length === 0 && (
            <p className="mt-8 text-text-muted">No projects yet — add your first one above.</p>
          )}
        </>
      )}
    </div>
  );
}
