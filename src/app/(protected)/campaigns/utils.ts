import {
  CAMPAIGN_STATUS_MAP,
  CAMPAIGN_SORT_BY_MAP,
  CAMPAIGN_SORT_ORDER_MAP,
} from "./constants";

export function isValidCampaignStatus(status: string): boolean {
  return status === "all" || status.toLowerCase() in CAMPAIGN_STATUS_MAP;
}

export function isValidCampaignSortBy(sortBy: string): boolean {
  return sortBy.toLowerCase() in CAMPAIGN_SORT_BY_MAP;
}

export function isValidCampaignSortOrder(sortOrder: string): boolean {
  return sortOrder.toLowerCase() in CAMPAIGN_SORT_ORDER_MAP;
}

export function getCampaignStatusValue(status: string): string | undefined {
  return CAMPAIGN_STATUS_MAP[status.toLowerCase()];
}

export function getCampaignSortByValue(sortBy: string): string | undefined {
  return CAMPAIGN_SORT_BY_MAP[sortBy.toLowerCase()];
}

export function getCampaignSortOrderValue(
  sortOrder: string,
): string | undefined {
  return CAMPAIGN_SORT_ORDER_MAP[sortOrder.toLowerCase()];
}
