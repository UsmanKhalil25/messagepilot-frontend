import { CampaignStatus } from "../enums/campaign-status.enum";

export const CAMPAIGN_STATUS_COLORS: Record<CampaignStatus, string> = {
  [CampaignStatus.DRAFT]: "bg-gray-400",
  [CampaignStatus.QUEUED]: "bg-blue-500",
  [CampaignStatus.ACTIVE]: "bg-yellow-500",
  [CampaignStatus.COMPLETED]: "bg-green-500",
  [CampaignStatus.FAILED]: "bg-red-500",
};
