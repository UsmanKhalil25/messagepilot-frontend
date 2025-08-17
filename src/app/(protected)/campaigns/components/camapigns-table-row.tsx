import { Ellipsis } from "lucide-react";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { CAMPAIGN_STATUS_BADGE } from "@/common/constants/campain-status-badge";
import { COMMUNICATION_CHANNEL_ICONS } from "@/common/constants/communication-channel-icons";

import { GetCampaignsQuery } from "@/__generated__/graphql";
import { capitalize } from "@/common/utils/string.utils";

type Campaign = GetCampaignsQuery["campaigns"]["campaigns"][number];

interface CampaignsTableRowProps {
  campaign: Campaign;
}

export function CampaignsTableRow({ campaign }: CampaignsTableRowProps) {
  const Icon = COMMUNICATION_CHANNEL_ICONS[campaign.channelType];

  return (
    <TableRow>
      <TableCell className="font-medium">{campaign.title}</TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4" />}
          {capitalize(campaign.channelType)}
        </div>
      </TableCell>

      <TableCell>
        <Badge variant={CAMPAIGN_STATUS_BADGE[campaign.status]}>
          {campaign.status}
        </Badge>
      </TableCell>

      <TableCell>{new Date(campaign.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>{new Date(campaign.updatedAt).toLocaleDateString()}</TableCell>

      <TableCell>
        <Button variant="ghost" size="sm">
          <Ellipsis className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
