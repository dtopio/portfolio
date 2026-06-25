import { useId, useState } from 'react';
import type { FormEvent } from 'react';
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
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAdmin } from '../context/AdminContext';
import { createSkill, isAxiosValidationError } from '../services/api';

const EMPTY = {
  name: '',
  category: '',
  level: 'Intermediate',
  icon: '',
  featured: false,
};

export default function AddSkillDialog({
  onCreated,
  categories = [],
}: {
  onCreated: () => void;
  categories?: string[];
}) {
  const { token } = useAdmin();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const categoryListId = useId();

  if (!token) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await createSkill(
        {
          name: form.name,
          category: form.category,
          level: form.level,
          icon: form.icon.trim() || null,
          featured: form.featured,
        },
        token!
      );
      setForm(EMPTY);
      setOpen(false);
      onCreated();
    } catch (err) {
      setError(
        isAxiosValidationError(err)
          ? err.response.data.message
          : 'Something went wrong creating the skill.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          + Add Skill
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Skill</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="add-skill-name">Name</Label>
            <Input
              id="add-skill-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="add-skill-category">Category</Label>
            <Input
              id="add-skill-category"
              list={categoryListId}
              placeholder="Frontend"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            />
            <datalist id={categoryListId}>
              {categories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
            <p className="text-xs text-text-muted">
              Pick an existing category or type a new one to create it.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="add-skill-level">Level</Label>
            <Select value={form.level} onValueChange={(value) => setForm({ ...form, level: value })}>
              <SelectTrigger id="add-skill-level" className="w-full">
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
            <Label htmlFor="add-skill-icon">Icon (simple-icons slug)</Label>
            <Input
              id="add-skill-icon"
              placeholder="vuedotjs"
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="add-skill-featured"
              checked={form.featured}
              onCheckedChange={(checked) => setForm({ ...form, featured: checked === true })}
            />
            <Label htmlFor="add-skill-featured">Featured on homepage</Label>
          </div>

          {error && <p className="text-sm text-red-300">{error}</p>}

          <DialogFooter>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Saving…' : 'Save Skill'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
