"use client";

import { motion } from "motion/react";

import {
  Mail,
  MessageSquare,
  MoreHorizontal,
  Edit,
  Send,
  Trash2,
  Eye,
  Copy,
  Pause,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell } from "@/components/ui/table";
import type { GetCampaignsQuery } from "@/__generated__/graphql";

function getStatusBadgeVariant(status: string) {
  switch (status.toLowerCase()) {
    case "active":
      return "default";
    case "completed":
      return "secondary";
    case "queued":
      return "outline";
    case "draft":
      return "secondary";
    case "failed":
      return "destructive";
    default:
      return "secondary";
  }
}

type CampaignRow = GetCampaignsQuery["campaigns"]["campaigns"][number];

interface CampaignsTableRowProps {
  campaign: CampaignRow;
}

function CampaignsTableRow({ campaign }: CampaignsTableRowProps) {
  return (
    <motion.tr
      className="group"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <TableCell>
        <div>
          <div className="font-medium">{campaign.title}</div>
          <div className="text-sm text-muted-foreground truncate max-w-[280px]">
            {campaign.description}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {campaign.channelType === "EMAIL" ? (
            <Mail className="h-4 w-4" />
          ) : (
            <MessageSquare className="h-4 w-4" />
          )}
          {campaign.channelType}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={getStatusBadgeVariant(campaign.status)}>
          {campaign.status}
        </Badge>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {new Date(campaign.createdAt).toLocaleString()}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {new Date(campaign.updatedAt).toLocaleString()}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit campaign
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("TODO")}>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
            {campaign.status === "ACTIVE" ? (
              <DropdownMenuItem>
                <Pause className="mr-2 h-4 w-4" />
                Pause campaign
              </DropdownMenuItem>
            ) : campaign.status === "DRAFT" ? (
              <DropdownMenuItem>
                <Send className="mr-2 h-4 w-4" />
                Launch campaign
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => console.log("deleting stuff")}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete campaign
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </motion.tr>
  );
}

export { CampaignsTableRow };
