import { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAdmin } from '../context/AdminContext';
import { updateExperience, isAxiosValidationError } from '../services/api';
import type { Experience, NewExperiencePayload } from '../types';

function toForm(experience: Experience) {
  return {
    title: experience.title,
    organization: experience.organization,
    location: experience.location ?? '',
    type: experience.type as NewExperiencePayload['type'],
    startDate: experience.start_date,
    endDate: experience.end_date ?? '',
    description: experience.description ?? '',
  };
}

export default function EditExperienceDialog({
  experience,
  onUpdated,
}: {
  experience: Experience;
  onUpdated: () => void;
}) {
  const { token } = useAdmin();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(() => toForm(experience));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!token) return null;

  function handleOpenChange(value: boolean) {
    if (value) setForm(toForm(experience));
    setOpen(value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await updateExperience(
        experience.id,
        {
          title: form.title,
          organization: form.organization,
          location: form.location.trim() || null,
          type: form.type,
          start_date: form.startDate,
          end_date: form.endDate || null,
          description: form.description.trim() || null,
        },
        token!
      );
      setOpen(false);
      onUpdated();
    } catch (err) {
      setError(
        isAxiosValidationError(err)
          ? err.response.data.message
          : 'Something went wrong updating the experience entry.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm" title="Edit experience">
          <Pencil />
          <span className="sr-only">Edit experience</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Experience</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="edit-exp-title">Title</Label>
            <Input
              id="edit-exp-title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-exp-org">Organization</Label>
            <Input
              id="edit-exp-org"
              value={form.organization}
              onChange={(e) => setForm({ ...form, organization: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-exp-location">Location</Label>
            <Input
              id="edit-exp-location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-exp-type">Type</Label>
            <Select
              value={form.type}
              onValueChange={(value) =>
                setForm({ ...form, type: value as NewExperiencePayload['type'] })
              }
            >
              <SelectTrigger id="edit-exp-type" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="teaching">Teaching</SelectItem>
                <SelectItem value="education">Education</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="edit-exp-start">Start date</Label>
              <Input
                id="edit-exp-start"
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-exp-end">End date</Label>
              <Input
                id="edit-exp-end"
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-exp-description">Description</Label>
            <Textarea
              id="edit-exp-description"
              rows={10}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
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
