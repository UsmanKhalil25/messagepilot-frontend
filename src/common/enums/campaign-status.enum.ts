export enum CampaignStatus {
  DRAFT = "DRAFT",
  QUEUED = "QUEUED",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export const campaignStatusValues = Object.values(CampaignStatus);
