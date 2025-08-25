import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

function CampaignsTableRowSkeleton() {
  return (
    <TableRow className="hover:bg-muted/20 transition-colors border-b border-border/30">
      <TableCell >
        <Skeleton className="h-4 w-48" />
      </TableCell>
      <TableCell >
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-16" />
        </div>
      </TableCell>
      <TableCell >
        <Skeleton className="h-6 w-20 rounded-full" />
      </TableCell>
      <TableCell >
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell >
        <Skeleton className="h-8 w-8 rounded" />
      </TableCell>
    </TableRow>
  );
}

export { CampaignsTableRowSkeleton };
