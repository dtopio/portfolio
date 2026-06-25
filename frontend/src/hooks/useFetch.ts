import { useQuery } from '@tanstack/react-query';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFetch<T>(
  queryKey: unknown[],
  fetcher: () => Promise<T>,
  options?: { enabled?: boolean }
): UseFetchResult<T> {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey,
    queryFn: fetcher,
    enabled: options?.enabled,
  });

  return {
    data: data ?? null,
    loading: isLoading,
    error: isError
      ? 'Something went wrong while loading this section. Is the API running?'
      : null,
    refetch: () => {
      void refetch();
    },
  };
}
