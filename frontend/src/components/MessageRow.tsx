import { useState } from 'react';
import { Mail, Trash2 } from 'lucide-react';
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
import { markMessageRead, deleteMessage } from '../services/api';
import type { Message } from '../types';

function formatDate(value: string): string {
  return new Date(value).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
}

export default function MessageRow({
  message,
  onChanged,
}: {
  message: Message;
  onChanged: () => void;
}) {
  const { token } = useAdmin();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!token) return null;

  async function handleMarkRead() {
    setSubmitting(true);
    try {
      await markMessageRead(message.id, token!);
      onChanged();
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    setSubmitting(true);
    try {
      await deleteMessage(message.id, token!);
      setOpen(false);
      onChanged();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className={`rounded-lg border p-4 ${
        message.read_at ? 'border-border bg-surface/50' : 'border-accent/40 bg-surface'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-medium text-heading">
            {message.name}
            {!message.read_at && (
              <span className="ml-2 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-mono text-accent">
                new
              </span>
            )}
          </p>
          <a href={`mailto:${message.email}`} className="text-sm text-accent hover:underline">
            {message.email}
          </a>
        </div>
        <div className="flex items-center gap-2">
          {message.created_at && (
            <span className="font-mono text-xs text-text-muted">
              {formatDate(message.created_at)}
            </span>
          )}
          {!message.read_at && (
            <Button
              variant="ghost"
              size="icon-sm"
              title="Mark as read"
              onClick={handleMarkRead}
              disabled={submitting}
            >
              <Mail />
              <span className="sr-only">Mark as read</span>
            </Button>
          )}
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon-sm" title="Delete message">
                <Trash2 />
                <span className="sr-only">Delete message</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this message?</AlertDialogTitle>
                <AlertDialogDescription>This can't be undone.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={submitting}>
                  {submitting ? 'Deleting…' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <p className="mt-3 text-sm text-text-muted">{message.message}</p>
    </div>
  );
}
