import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

export interface SearchFilters {
  filters: Record<string, unknown>;
  limit: number;
  page: number;
}

interface ParamConfig {
  key: string;
  map?: Record<string, unknown>;
}

interface UseSearchFiltersOptions {
  params?: ParamConfig[];
  pageSize?: number;
}

export function useSearchFilters({
  params = [],
  pageSize = 10,
}: UseSearchFiltersOptions = {}): SearchFilters {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const filters: Record<string, unknown> = {};
    const query = searchParams.get("query") || "";
    const pageParam = Number(searchParams.get("page")) || 1;

    if (query.trim()) {
      filters.search = query.trim();
    }

    for (const { key, map } of params) {
      const raw = searchParams.get(key);
      if (!raw) continue;

      const mapped = map ? map[raw.toLowerCase()] : raw;
      if (mapped) {
        filters[key] = mapped;
      }
    }

    return {
      filters,
      limit: pageSize,
      page: Math.max(1, pageParam),
    };
  }, [searchParams, params, pageSize]);
}
