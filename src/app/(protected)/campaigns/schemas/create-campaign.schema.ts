import { z } from "zod";
import { CampaignChannel, CampaignStatus } from "@/__generated__/types";

export const createCampaignSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  channelType: z.enum(
    Object.values(CampaignChannel) as [CampaignChannel, ...CampaignChannel[]],
    {
      error: (iss) =>
        iss.input === undefined ? "Channel type is required" : "Invalid input",
    },
  ),
  status: z
    .enum(
      Object.values(CampaignStatus) as [CampaignStatus, ...CampaignStatus[]],
    )
    .nullable()
    .optional(),
});
