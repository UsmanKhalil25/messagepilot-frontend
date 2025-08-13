import { Ellipsis } from "lucide-react";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { GetCampaignsQuery } from "@/__generated__/graphql";

type Campaign = GetCampaignsQuery["campaigns"]["campaigns"][number];

interface CampaignsTableRowProps {
  campaign: Campaign;
}

export function CampaignsTableRow({ campaign }: CampaignsTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{campaign.title}</TableCell>
      <TableCell>{campaign.channelType}</TableCell>
      <TableCell>
        <Badge variant={campaign.status === "ACTIVE" ? "default" : "secondary"}>
          {campaign.status}
        </Badge>
      </TableCell>
      <TableCell>{new Date(campaign.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>{new Date(campaign.updatedAt).toLocaleDateString()}</TableCell>
      <TableCell>
        <Button variant="ghost" size="sm">
          <Ellipsis className="h- w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
