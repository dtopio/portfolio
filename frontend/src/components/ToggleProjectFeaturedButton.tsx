import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '../context/AdminContext';
import { updateProject } from '../services/api';
import type { Project } from '../types';

export default function ToggleProjectFeaturedButton({
  project,
  onUpdated,
}: {
  project: Project;
  onUpdated: () => void;
}) {
  const { token } = useAdmin();
  const [submitting, setSubmitting] = useState(false);

  if (!token) return null;

  async function handleToggle() {
    setSubmitting(true);
    try {
      await updateProject(
        project.id,
        {
          title: project.title,
          description: project.description,
          tech_stack: project.tech_stack,
          tags: project.tags,
          github_url: project.github_url,
          demo_url: project.demo_url,
          featured: !project.featured,
        },
        token!
      );
      onUpdated();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      title={project.featured ? 'Remove from featured' : 'Mark as featured'}
      onClick={handleToggle}
      disabled={submitting}
    >
      <Star className={project.featured ? 'fill-accent text-accent' : ''} />
      <span className="sr-only">
        {project.featured ? 'Remove from featured' : 'Mark as featured'}
      </span>
    </Button>
  );
}
