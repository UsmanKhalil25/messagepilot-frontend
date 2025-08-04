import { z } from "zod";
import { createCampaignSchema } from "./create-campaign.schema";

export type CreateCampaignForm = z.infer<typeof createCampaignSchema>;
