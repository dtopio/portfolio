import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useAdmin } from '../context/AdminContext';
import { deleteSkill } from '../services/api';
import type { Skill } from '../types';

export default function DeleteSkillDialog({
  skill,
  onDeleted,
}: {
  skill: Skill;
  onDeleted: () => void;
}) {
  const { token } = useAdmin();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!token) return null;

  async function handleConfirm() {
    setSubmitting(true);
    try {
      await deleteSkill(skill.id, token!);
      setOpen(false);
      onDeleted();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon-sm" title="Delete skill">
          <Trash2 />
          <span className="sr-only">Delete skill</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete "{skill.name}"?</AlertDialogTitle>
          <AlertDialogDescription>
            This permanently removes the skill from your portfolio. This can't be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={submitting}>
            {submitting ? 'Deleting…' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
