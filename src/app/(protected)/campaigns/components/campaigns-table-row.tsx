import { Ellipsis } from "lucide-react";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { CAMPAIGN_STATUS_BADGE } from "@/common/constants/campain-status-badge";
import { COMMUNICATION_CHANNEL_ICONS } from "@/common/constants/communication-channel-icons";

import { GetCampaignsQuery, CommunicationChannel, CampaignStatus } from "@/__generated__/graphql";
import { capitalize } from "@/common/utils/string.utils";

type Campaign = GetCampaignsQuery["campaigns"]["campaigns"][number];

interface CampaignsTableRowProps {
  campaign: Campaign;
}

function CampaignChannelRow({ channelType }: { channelType: CommunicationChannel }) {
  const Icon = COMMUNICATION_CHANNEL_ICONS[channelType];

  return (
    <div className="flex items-center gap-2">
      {Icon && <Icon className="h-4 w-4" />}
      {capitalize(channelType)}
    </div>
  );
}

function CampaignStatusCell({ status }: { status: CampaignStatus }) {
  return (
    <Badge variant={CAMPAIGN_STATUS_BADGE[status]}>
      {status}
    </Badge>
  );
}

function CampaignDateCell({ date }: { date: string }) {
  return new Date(date).toLocaleDateString();
}

function CampaignActionsCell() {
  return (
    <Button variant="ghost" size="sm" aria-label="Campaign actions">
      <Ellipsis className="h-4 w-4" />
    </Button>
  );
}

function CampaignsTableRow({ campaign }: CampaignsTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{campaign.title}</TableCell>
      <TableCell>
        <CampaignChannelRow channelType={campaign.channelType} />
      </TableCell>
      <TableCell>
        <CampaignStatusCell status={campaign.status} />
      </TableCell>
      <TableCell>
        <CampaignDateCell date={campaign.createdAt} />
      </TableCell>
      <TableCell>
        <CampaignDateCell date={campaign.updatedAt} />
      </TableCell>
      <TableCell>
        <CampaignActionsCell />
      </TableCell>
    </TableRow>
  );
}

export { CampaignsTableRow };
