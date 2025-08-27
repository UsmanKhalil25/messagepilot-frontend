import { motion } from "motion/react";
import { Ellipsis } from "lucide-react";

import { TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

import { COMMUNICATION_CHANNEL_ICONS } from "@/common/constants/communication-channel-icons.constant";

import {
  type GetContactsQuery,
  CommunicationChannel,
} from "@/__generated__/graphql";

type contact = GetContactsQuery["contacts"]["contacts"][number];

interface ContactsTableRowProps {
  index: number;
  contact: contact;
}

function DateCell({ date }: { date: string }) {
  return (
    <span className="text-sm text-muted-foreground">
      {formatDistanceToNow(new Date(date), { addSuffix: true })}
    </span>
  );
}

function ContactActionsCell() {
  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label="contact actions"
      className="h-8 w-8 p-0 hover:bg-muted/50 transition-colors"
    >
      <Ellipsis className="h-4 w-4" />
    </Button>
  );
}

function ChannelsCell({ contact }: { contact: contact }) {
  return (
    <div className="flex gap-1">
      {contact.contactChannels.map((channel) => {
        const IconComponent =
          COMMUNICATION_CHANNEL_ICONS[channel.type as CommunicationChannel];
        return (
          <Badge
            key={channel.id}
            variant="secondary"
            className="flex items-center gap-1 text-xs"
          >
            <IconComponent className="h-3 w-3" />
            {channel.value}
          </Badge>
        );
      })}
    </div>
  );
}

export function ContactsTableRow({ contact, index }: ContactsTableRowProps) {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group"
    >
      <TableCell className="font-semibold text-foreground py-4 px-6">
        {contact.name}
      </TableCell>
      <TableCell className="py-4 px-6">
        <ChannelsCell contact={contact} />
      </TableCell>
      <TableCell className="py-4 px-6">
        <DateCell date={contact.updatedAt} />
      </TableCell>
      <TableCell className="py-4 px-6">
        <ContactActionsCell />
      </TableCell>
    </motion.tr>
  );
}
