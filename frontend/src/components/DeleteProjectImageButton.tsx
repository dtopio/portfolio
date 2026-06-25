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
import { deleteProjectImage } from '../services/api';

export default function DeleteProjectImageButton({
  imageId,
  onDeleted,
}: {
  imageId: number;
  onDeleted: () => void;
}) {
  const { token } = useAdmin();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!token) return null;

  async function handleConfirm() {
    setSubmitting(true);
    try {
      await deleteProjectImage(imageId, token!);
      setOpen(false);
      onDeleted();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          title="Delete screenshot"
          className="absolute top-2 right-2 bg-bg/70 opacity-0 transition group-hover:opacity-100"
        >
          <Trash2 />
          <span className="sr-only">Delete screenshot</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this screenshot?</AlertDialogTitle>
          <AlertDialogDescription>This can't be undone.</AlertDialogDescription>
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
