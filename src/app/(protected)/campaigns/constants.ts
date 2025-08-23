import {
  CampaignSortBy,
  CampaignStatus,
  SortOrder,
} from "@/__generated__/types";

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

export const CAMPAIGN_SORT_ORDER_MAP: Record<string, SortOrder> = {
  asc: SortOrder.Asc,
  desc: SortOrder.Desc,
} as const;

export const VALID_CAMPAIGN_STATUSES = Object.keys(CAMPAIGN_STATUS_MAP);
export const VALID_CAMPAIGN_SORT_BY = Object.keys(CAMPAIGN_SORT_BY_MAP);
export const VALID_CAMPAIGN_SORT_ORDER = Object.keys(CAMPAIGN_SORT_ORDER_MAP);

export const DEFAULT_CAMPAIGN_STATUS = "all";
export const DEFAULT_CAMPAIGN_SORT_BY = "created_at";
export const DEFAULT_CAMPAIGN_SORT_ORDER = "desc";
