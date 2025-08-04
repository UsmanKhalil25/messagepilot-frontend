import { z } from "zod";

import {
  CampaignChannel,
  campaignChannelValues,
} from "@/common/enums/campaign-channel.enum";
import {
  CampaignStatus,
  campaignStatusValues,
} from "@/common/enums/campaign-status.enum";

export const createCampaignSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  channelType: z.enum(
    campaignChannelValues as [CampaignChannel, ...CampaignChannel[]],
  ),
  status: z.enum(
    campaignStatusValues as [CampaignStatus, ...CampaignStatus[]],
    {
      error: (iss) =>
        iss.input === undefined ? "Status is required" : "Invalid input",
    },
  ),
});
