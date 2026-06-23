import { useMemo, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { getProjects } from '../services/api';
import Section from '../components/Section';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import ProjectCard from '../components/ProjectCard';
import AddProjectDialog from '../components/AddProjectDialog';

export default function Projects() {
  const { data: projects, loading, error, refetch } = useFetch(getProjects);
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
    <Section
      id="projects"
      index={3}
      title="Projects"
      subtitle="A few things I've built recently."
      action={<AddProjectDialog onCreated={refetch} />}
    >
      {loading && <LoadingState label="Loading projects…" />}
      {error && <ErrorState message={error} />}

      {!loading && !error && (
        <>
          {filters.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFilter(null)}
                className={`rounded-full px-3 py-1 text-xs font-mono transition ${
                  filter === null
                    ? 'bg-accent text-bg'
                    : 'bg-surface text-text-muted ring-1 ring-border hover:text-accent'
                }`}
              >
                All
              </button>
              {filters.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setFilter(tag)}
                  className={`rounded-full px-3 py-1 text-xs font-mono transition ${
                    filter === tag
                      ? 'bg-accent text-bg'
                      : 'bg-surface text-text-muted ring-1 ring-border hover:text-accent'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} onUpdated={refetch} />
            ))}
          </div>
        </>
      )}
    </Section>
  );
}
