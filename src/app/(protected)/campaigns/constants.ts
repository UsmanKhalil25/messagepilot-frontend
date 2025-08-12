import {
  CampaignSortBy,
  CampaignStatus,
  SortOrder,
} from "@/__generated__/types";

export const STATUS_MAP: Record<string, CampaignStatus> = {
  active: CampaignStatus.Active,
  queued: CampaignStatus.Queued,
  completed: CampaignStatus.Completed,
  draft: CampaignStatus.Draft,
  failed: CampaignStatus.Failed,
} as const;

export const SORT_BY_MAP: Record<string, CampaignSortBy> = {
  created_at: CampaignSortBy.CreatedAt,
  updated_at: CampaignSortBy.UpdatedAt,
  name: CampaignSortBy.Name,
  status: CampaignSortBy.Status,
} as const;

export const SORT_ORDER_MAP: Record<string, SortOrder> = {
  asc: SortOrder.Asc,
  desc: SortOrder.Desc,
} as const;

export const VALID_STATUSES = Object.keys(STATUS_MAP);
export const VALID_SORT_BY = Object.keys(SORT_BY_MAP);
export const VALID_SORT_ORDER = Object.keys(SORT_ORDER_MAP);
