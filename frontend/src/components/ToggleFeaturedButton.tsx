import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '../context/AdminContext';
import { updateSkill } from '../services/api';
import type { Skill } from '../types';

export default function ToggleFeaturedButton({
  skill,
  onUpdated,
}: {
  skill: Skill;
  onUpdated: () => void;
}) {
  const { token } = useAdmin();
  const [submitting, setSubmitting] = useState(false);

  if (!token) return null;

  async function handleToggle() {
    setSubmitting(true);
    try {
      await updateSkill(
        skill.id,
        {
          name: skill.name,
          category: skill.category,
          level: skill.level,
          icon: skill.icon,
          featured: !skill.featured,
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
      title={skill.featured ? 'Remove from homepage' : 'Feature on homepage'}
      onClick={handleToggle}
      disabled={submitting}
    >
      <Star className={skill.featured ? 'fill-accent text-accent' : ''} />
      <span className="sr-only">
        {skill.featured ? 'Remove from homepage' : 'Feature on homepage'}
      </span>
    </Button>
  );
}
