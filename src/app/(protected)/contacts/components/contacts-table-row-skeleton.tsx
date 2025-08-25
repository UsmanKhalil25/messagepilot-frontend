import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

function ContactsTableRowSkeleton() {
  return (
    <TableRow className="hover:bg-muted/20 transition-colors border-b border-border/30">
      <TableCell className="py-4 px-6">
        <Skeleton className="h-4 w-32" />
      </TableCell>

      <TableCell className="py-4 px-6">
        <div className="flex gap-1">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </TableCell>

      <TableCell className="py-4 px-6">
        <Skeleton className="h-4 w-24" />
      </TableCell>

      <TableCell className="py-4 px-6">
        <Skeleton className="h-8 w-8 rounded" />
      </TableCell>
    </TableRow>
  );
}

export { ContactsTableRowSkeleton };
