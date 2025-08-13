export enum CampaignStatus {
  DRAFT = "draft",
  QUEUED = "queued",
  ACTIVE = "active",
  COMPLETED = "completed",
  FAILED = "failed",
}

export const campaignStatusValues = Object.values(CampaignStatus);
