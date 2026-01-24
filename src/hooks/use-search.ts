import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { search } from '@/services/api/search';
import { User } from '@/services/types/auth';
import { Hotel } from '@/services/types/hotels';
// import { searchHotels } from '@/services/api/api';

interface SearchParams {
  query: string;
  category?: string;
  price?: string;
  rating?: number;
  location?: string;
}

interface SearchResult {
  users:User[],
  hotels:Hotel[]
}

export const useSearch = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: '',
    category: 'all',
  });
  const [results, setResults] = useState<SearchResult>({
    users:[],
    hotels:[]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce the search query
  const debouncedQuery = useDebounce(searchParams.query, 300);

  const performSearch = useCallback(async () => {
    if (!debouncedQuery.trim()) {
      setResults({
        users:[],
        hotels:[]
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await search.get(debouncedQuery) as unknown as SearchResult;
      setResults(data || {
        users:[],
        hotels:[]
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults({
        users:[],
        hotels:[]
      });
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, searchParams]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  const updateSearchParam = (key: keyof SearchParams, value: any) => {
    setSearchParams(prev => ({ ...prev, [key]: value }));
  };

  return {
    searchParams,
    results,
    loading,
    error,
    updateSearchParam,
    debouncedQuery,
  };
};
