import { useCallback, useEffect, useState } from 'react';

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(fetcher: () => Promise<T>): UseFetchState<T> & { refetch: () => void } {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const load = useCallback(() => {
    fetcher()
      .then((data) => setState({ data, loading: false, error: null }))
      .catch(() =>
        setState({
          data: null,
          loading: false,
          error: 'Something went wrong while loading this section. Is the API running?',
        })
      );
  }, [fetcher]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, refetch: load };
}
