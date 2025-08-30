import { CampaignSortBy, CampaignStatus } from "@/__generated__/types";

import { SORT_ORDER_MAP } from "@/common/constants/sort-order.constant";

export const CAMPAIGN_STATUS_MAP: Record<string, CampaignStatus> = {
  active: CampaignStatus.Active,
  queued: CampaignStatus.Queued,
  completed: CampaignStatus.Completed,
  draft: CampaignStatus.Draft,
  failed: CampaignStatus.Failed,
} as const;

export const CAMPAIGN_SORT_BY_MAP: Record<string, CampaignSortBy> = {
  created_at: CampaignSortBy.CreatedAt,
  updated_at: CampaignSortBy.UpdatedAt,
  name: CampaignSortBy.Name,
  status: CampaignSortBy.Status,
} as const;

export const CAMPAIGN_SEARCH_PARAMS = [
  { key: "status", map: CAMPAIGN_STATUS_MAP, skipValue: "all" },
  { key: "sortBy", map: CAMPAIGN_SORT_BY_MAP },
  { key: "sortOrder", map: SORT_ORDER_MAP },
] as const;

export const CAMPAIGN_COLUMN_WIDTHS = {
  title: "w-[300px]",
  channelType: "w-[150px]",
  status: "w-[120px]",
  updatedAt: "w-[150px]",
  actions: "w-[70px]",
} as const;

export const VALID_CAMPAIGN_STATUSES = Object.keys(CAMPAIGN_STATUS_MAP);
export const VALID_CAMPAIGN_SORT_BY = Object.keys(CAMPAIGN_SORT_BY_MAP);

export const DEFAULT_CAMPAIGN_STATUS = "all";
export const DEFAULT_CAMPAIGN_SORT_BY = "created_at";
export const DEFAULT_CAMPAIGN_PAGE_SIZE = 10;
