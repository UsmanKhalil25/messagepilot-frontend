import { TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { CAMPAIGN_COLUMN_WIDTHS } from "../constants";

export function CampaignsTableRowSkeleton() {
  return (
    <tr className="group">
      <TableCell
        className={`font-semibold text-foreground py-4 px-6 ${CAMPAIGN_COLUMN_WIDTHS.title}`}
      >
        <div className="w-32">
          <Skeleton className="h-5 w-full" />
        </div>
      </TableCell>
      <TableCell className={`p-2 ${CAMPAIGN_COLUMN_WIDTHS.channelType}`}>
        <div className="w-20">
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-4 w-4 flex-shrink-0" />
            <Skeleton className="h-4 w-16 flex-shrink-0" />
          </div>
        </div>
      </TableCell>
      <TableCell className={`p-2 ${CAMPAIGN_COLUMN_WIDTHS.status}`}>
        <div className="w-20">
          <Skeleton className="h-6 w-full rounded-full" />
        </div>
      </TableCell>
      <TableCell className={`p-2 ${CAMPAIGN_COLUMN_WIDTHS.updatedAt}`}>
        <div className="w-20">
          <Skeleton className="h-4 w-full" />
        </div>
      </TableCell>
      <TableCell className={`p-2 ${CAMPAIGN_COLUMN_WIDTHS.actions}`}>
        <div className="opacity-0 group-hover:opacity-100">
          <Skeleton className="h-8 w-8" />
        </div>
      </TableCell>
    </tr>
  );
}
