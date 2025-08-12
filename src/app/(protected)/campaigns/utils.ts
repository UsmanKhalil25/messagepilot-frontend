import { STATUS_MAP, SORT_BY_MAP, SORT_ORDER_MAP } from "./constants";

export function isValidStatus(status: string): boolean {
  return status === "all" || status.toLowerCase() in STATUS_MAP;
}

export function isValidSortBy(sortBy: string): boolean {
  return sortBy.toLowerCase() in SORT_BY_MAP;
}

export function isValidSortOrder(sortOrder: string): boolean {
  return sortOrder.toLowerCase() in SORT_ORDER_MAP;
}
