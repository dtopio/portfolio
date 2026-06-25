import { motion } from 'framer-motion';
import type { Skill } from '../types';
import EditSkillDialog from './EditSkillDialog';
import DeleteSkillDialog from './DeleteSkillDialog';
import ToggleFeaturedButton from './ToggleFeaturedButton';
import { useAdmin } from '../context/AdminContext';
import { fadeUpItem } from '../lib/motion';

const LEVEL_DOTS: Record<string, number> = {
  Advanced: 3,
  Intermediate: 2,
  Beginner: 1,
};

export default function SkillCard({
  skill,
  onUpdated,
  categories = [],
}: {
  skill: Skill;
  onUpdated: () => void;
  categories?: string[];
}) {
  const { token } = useAdmin();
  const filled = LEVEL_DOTS[skill.level] ?? 2;

  return (
    <motion.div
      variants={fadeUpItem}
      className="group relative flex w-32 flex-col items-center gap-2 rounded-xl border border-border bg-surface/80 px-3 py-5 text-center transition hover:border-accent/40 hover:bg-surface sm:w-36"
    >
      {token && (
        <div className="absolute top-1 right-1 flex items-center opacity-0 transition group-hover:opacity-100">
          <ToggleFeaturedButton skill={skill} onUpdated={onUpdated} />
          <EditSkillDialog skill={skill} onUpdated={onUpdated} categories={categories} />
          <DeleteSkillDialog skill={skill} onDeleted={onUpdated} />
        </div>
      )}

      {skill.icon ? (
        <img
          src={`https://cdn.simpleicons.org/${skill.icon}/2dd4bf`}
          alt=""
          width={32}
          height={32}
          loading="lazy"
          className="h-8 w-8 opacity-90"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <div className="h-8 w-8" />
      )}

      <span className="text-sm font-medium text-heading">{skill.name}</span>

      <span className="flex items-center gap-1.5 font-mono text-xs text-text-muted">
        <span className="flex gap-1">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className={`h-1.5 w-1.5 rounded-full ${dot < filled ? 'bg-accent' : 'bg-border'}`}
            />
          ))}
        </span>
        {skill.level}
      </span>
    </motion.div>
  );
}
