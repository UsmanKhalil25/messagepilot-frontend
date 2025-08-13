import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { STATUS_MAP, SORT_BY_MAP, SORT_ORDER_MAP } from "../constants";

const PAGE_SIZE = 5;

export interface SearchFilters {
  filters: Record<string, unknown>;
  limit: number;
  page: number;
}

export function useSearchFilters(): SearchFilters {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const query = searchParams.get("query") || "";
    const statusParam = searchParams.get("status");
    const pageParam = Number(searchParams.get("page")) || 1;
    const sortByParam = searchParams.get("sortBy");
    const sortOrderParam = searchParams.get("sortOrder");

    const filters: Record<string, unknown> = {};

    if (query.trim()) {
      filters.search = query.trim();
    }

    if (statusParam && statusParam !== "all") {
      const mappedStatus = STATUS_MAP[statusParam.toLowerCase()];
      if (mappedStatus) {
        filters.status = mappedStatus;
      }
    }

    if (sortByParam) {
      const mappedSortBy = SORT_BY_MAP[sortByParam.toLowerCase()];
      if (mappedSortBy) {
        filters.sortBy = mappedSortBy;
      }
    }

    if (sortOrderParam) {
      const mappedSortOrder = SORT_ORDER_MAP[sortOrderParam.toLowerCase()];
      if (mappedSortOrder) {
        filters.sortOrder = mappedSortOrder;
      }
    }

    return {
      filters,
      limit: PAGE_SIZE,
      page: Math.max(1, pageParam),
    };
  }, [searchParams]);
}
