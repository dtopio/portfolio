import { useEffect, useState } from 'react';

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(fetcher: () => Promise<T>): UseFetchState<T> {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;

    setState({ data: null, loading: true, error: null });

    fetcher()
      .then((data) => {
        if (active) setState({ data, loading: false, error: null });
      })
      .catch(() => {
        if (active)
          setState({
            data: null,
            loading: false,
            error: 'Something went wrong while loading this section. Is the API running?',
          });
      });

    return () => {
      active = false;
    };
  }, [fetcher]);

  return state;
}
