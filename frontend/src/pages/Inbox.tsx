import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { useFetch } from '../hooks/useFetch';
import { getMessages } from '../services/api';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import MessageRow from '../components/MessageRow';

export default function Inbox() {
  const { token } = useAdmin();

  const fetchMessages = useCallback(() => {
    if (!token) return Promise.resolve([]);
    return getMessages(token);
  }, [token]);

  const { data: messages, loading, error, refetch } = useFetch(fetchMessages);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Link to="/" className="text-sm text-accent hover:underline">
        ← Back to portfolio
      </Link>

      <h1 className="mt-4 text-2xl font-semibold text-heading sm:text-3xl">Inbox</h1>

      {!token && (
        <p className="mt-10 text-text-muted">
          Unlock admin mode (the lock icon in the footer) to view contact form messages.
        </p>
      )}

      {token && loading && <LoadingState label="Loading messages…" />}
      {token && error && <ErrorState message={error} />}

      {token && !loading && !error && (
        <div className="mt-10 space-y-4">
          {(messages ?? []).length === 0 && <p className="text-text-muted">No messages yet.</p>}
          {(messages ?? []).map((message) => (
            <MessageRow key={message.id} message={message} onChanged={refetch} />
          ))}
        </div>
      )}
    </div>
  );
}
