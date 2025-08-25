import { motion } from "motion/react";
import { Ellipsis } from "lucide-react";

import { TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

import { CAMPAIGN_STATUS_BADGE } from "@/common/constants/campain-status-badge";
import { COMMUNICATION_CHANNEL_ICONS } from "@/common/constants/communication-channel-icons";

import {
  GetCampaignsQuery,
  CommunicationChannel,
  CampaignStatus,
} from "@/__generated__/graphql";
import { capitalize } from "@/common/utils/string.utils";

type Campaign = GetCampaignsQuery["campaigns"]["campaigns"][number];

interface CampaignsTableRowProps {
  index: number;
  campaign: Campaign;
}

function CampaignChannelRow({
  channelType,
}: {
  channelType: CommunicationChannel;
}) {
  const Icon = COMMUNICATION_CHANNEL_ICONS[channelType];

  return (
    <div className="flex items-center gap-2.5">
      {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      <span className="text-sm font-medium">{capitalize(channelType)}</span>
    </div>
  );
}

function CampaignStatusCell({ status }: { status: CampaignStatus }) {
  return (
    <Badge variant={CAMPAIGN_STATUS_BADGE[status]} className="font-medium">
      {status}
    </Badge>
  );
}

function CampaignDateCell({ date }: { date: string }) {
  return (
    <span className="text-sm text-muted-foreground">
      {formatDistanceToNow(new Date(date), { addSuffix: true })}
    </span>
  );
}

function CampaignActionsCell() {
  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label="Campaign actions"
      className="h-8 w-8 p-0 hover:bg-muted/50 transition-colors"
    >
      <Ellipsis className="h-4 w-4" />
    </Button>
  );
}

export function CampaignsTableRow({ campaign, index }: CampaignsTableRowProps) {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group"
    >
      <TableCell className="font-semibold text-foreground py-4 px-6">
        {campaign.title}
      </TableCell>
      <TableCell className="py-4 px-6">
        <CampaignChannelRow channelType={campaign.channelType} />
      </TableCell>
      <TableCell className="py-4 px-6">
        <CampaignStatusCell status={campaign.status} />
      </TableCell>
      <TableCell className="py-4 px-6">
        <CampaignDateCell date={campaign.updatedAt} />
      </TableCell>
      <TableCell className="py-4 px-6">
        <CampaignActionsCell />
      </TableCell>
    </motion.tr>
  );
}
