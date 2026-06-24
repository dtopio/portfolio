import { useState } from 'react';
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
import { createExperience, isAxiosValidationError } from '../services/api';
import type { NewExperiencePayload } from '../types';

const EMPTY = {
  title: '',
  organization: '',
  location: '',
  type: 'work' as NewExperiencePayload['type'],
  startDate: '',
  endDate: '',
  description: '',
};

export default function AddExperienceDialog({ onCreated }: { onCreated: () => void }) {
  const { token } = useAdmin();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!token) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await createExperience(
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
      setForm(EMPTY);
      setOpen(false);
      onCreated();
    } catch (err) {
      setError(
        isAxiosValidationError(err)
          ? err.response.data.message
          : 'Something went wrong creating the experience entry.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          + Add Experience
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Experience</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="exp-title">Title</Label>
            <Input
              id="exp-title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="exp-org">Organization</Label>
            <Input
              id="exp-org"
              value={form.organization}
              onChange={(e) => setForm({ ...form, organization: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="exp-location">Location</Label>
            <Input
              id="exp-location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="exp-type">Type</Label>
            <Select
              value={form.type}
              onValueChange={(value) =>
                setForm({ ...form, type: value as NewExperiencePayload['type'] })
              }
            >
              <SelectTrigger id="exp-type" className="w-full">
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
              <Label htmlFor="exp-start">Start date</Label>
              <Input
                id="exp-start"
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="exp-end">End date</Label>
              <Input
                id="exp-end"
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="exp-description">Description</Label>
            <Textarea
              id="exp-description"
              rows={8}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          {error && <p className="text-sm text-red-300">{error}</p>}

          <DialogFooter>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Saving…' : 'Save Experience'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
