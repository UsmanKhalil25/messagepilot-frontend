import { ContactSortBy } from "@/__generated__/types";

import { SORT_ORDER_MAP } from "@/common/constants/sort-order.constant";

export const CONTACT_SORT_BY: Record<string, ContactSortBy> = {
  created_at: ContactSortBy.CreatedAt,
  updated_at: ContactSortBy.UpdatedAt,
  name: ContactSortBy.Name,
} as const;

export const CONTACT_SEARCH_PARAMS = [
  { key: "sortBy", map: CONTACT_SORT_BY },
  { key: "sortOrder", map: SORT_ORDER_MAP },
];

export const VALID_CONTACT_SORT_BY = Object.keys(CONTACT_SORT_BY);

export const DEFAULT_CONTACT_STATUS = "all";
export const DEFAULT_CONTACT_SORT_BY = "created_at";
export const DEFAULT_CONTACT_PAGE_SIZE = 10;
