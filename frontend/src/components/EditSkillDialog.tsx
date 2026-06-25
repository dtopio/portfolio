import { useId, useState } from 'react';
import type { FormEvent } from 'react';
import { Pencil } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAdmin } from '../context/AdminContext';
import { updateSkill, isAxiosValidationError } from '../services/api';
import type { Skill } from '../types';

function toForm(skill: Skill) {
  return {
    name: skill.name,
    category: skill.category,
    level: skill.level,
    icon: skill.icon ?? '',
    featured: skill.featured,
  };
}

export default function EditSkillDialog({
  skill,
  onUpdated,
  categories = [],
}: {
  skill: Skill;
  onUpdated: () => void;
  categories?: string[];
}) {
  const { token } = useAdmin();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(() => toForm(skill));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const categoryListId = useId();

  if (!token) return null;

  function handleOpenChange(value: boolean) {
    if (value) setForm(toForm(skill));
    setOpen(value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await updateSkill(
        skill.id,
        {
          name: form.name,
          category: form.category,
          level: form.level,
          icon: form.icon.trim() || null,
          featured: form.featured,
        },
        token!
      );
      setOpen(false);
      onUpdated();
    } catch (err) {
      setError(
        isAxiosValidationError(err)
          ? err.response.data.message
          : 'Something went wrong updating the skill.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm" title="Edit skill">
          <Pencil />
          <span className="sr-only">Edit skill</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Skill</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="edit-skill-name">Name</Label>
            <Input
              id="edit-skill-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-skill-category">Category</Label>
            <Input
              id="edit-skill-category"
              list={categoryListId}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            />
            <datalist id={categoryListId}>
              {categories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-skill-level">Level</Label>
            <Select value={form.level} onValueChange={(value) => setForm({ ...form, level: value })}>
              <SelectTrigger id="edit-skill-level" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-skill-icon">Icon (simple-icons slug)</Label>
            <Input
              id="edit-skill-icon"
              placeholder="vuedotjs"
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
            />
          </div>

          {error && <p className="text-sm text-red-300">{error}</p>}

          <DialogFooter>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Saving…' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
