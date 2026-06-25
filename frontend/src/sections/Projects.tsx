import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFetch } from '../hooks/useFetch';
import { getProjects } from '../services/api';
import Section from '../components/Section';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import ProjectCard from '../components/ProjectCard';
import { Button } from '@/components/ui/button';
import { staggerContainer } from '../lib/motion';

const FALLBACK_LIMIT = 4;

export default function Projects() {
  const { data: projects, loading, error } = useFetch(['projects'], getProjects);

  const featured = (projects ?? []).filter((project) => project.featured);
  const fallback = (projects ?? []).slice(0, FALLBACK_LIMIT);
  const teaser = featured.length > 0 ? featured : fallback;

  return (
    <Section
      id="projects"
      index={3}
      title="Projects"
      subtitle="A few things I've built recently."
      action={
        <Button asChild variant="outline" size="sm">
          <Link to="/projects">View All Projects</Link>
        </Button>
      }
    >
      {loading && <LoadingState label="Loading projects…" />}
      {error && <ErrorState message={error} />}

      {!loading && !error && teaser.length === 0 && (
        <p className="text-text-muted">No projects added yet.</p>
      )}

      {!loading && !error && teaser.length > 0 && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {teaser.map((project) => (
            <ProjectCard key={project.id} project={project} editable={false} />
          ))}
        </motion.div>
      )}
    </Section>
  );
}
