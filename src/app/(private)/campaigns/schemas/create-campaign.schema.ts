import { z } from "zod";

export const createCampaignSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  channelType: z.enum(["EMAIL", "SMS", "WHATSAPP"]), // match backend enum
  status: z.enum(["ACTIVE", "DRAFT", "PAUSED"]).optional(), // match backend enum
  contactIds: z.array(z.string()).optional(),
});

