import type { Skill } from '../types';
import EditSkillDialog from './EditSkillDialog';

const LEVEL_DOTS: Record<string, number> = {
  Advanced: 3,
  Intermediate: 2,
  Beginner: 1,
};

export default function SkillBadge({
  skill,
  onUpdated,
}: {
  skill: Skill;
  onUpdated: () => void;
}) {
  const filled = LEVEL_DOTS[skill.level] ?? 2;

  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-surface/80 px-4 py-3 transition hover:border-accent/40 hover:bg-surface">
      <span className="flex items-center gap-2.5">
        {skill.icon && (
          <img
            src={`https://cdn.simpleicons.org/${skill.icon}/2dd4bf`}
            alt=""
            width={16}
            height={16}
            loading="lazy"
            className="h-4 w-4 shrink-0 opacity-90"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
        )}
        <span className="text-sm text-heading">{skill.name}</span>
      </span>
      <span className="flex items-center gap-2">
        <span className="font-mono text-xs text-text-muted">{skill.level}</span>
        <span className="flex gap-1">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className={`h-1.5 w-1.5 rounded-full ${
                dot < filled ? 'bg-accent' : 'bg-border'
              }`}
            />
          ))}
        </span>
        <EditSkillDialog skill={skill} onUpdated={onUpdated} />
      </span>
    </div>
  );
}
