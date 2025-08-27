"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTableContainer } from "@/components/ui/data-table-container";
import { DataTablePagination } from "@/components/ui/data-table-pagination";

interface DataTableProps<T> {
  title: string | React.ReactNode;
  description: string;
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  loading: boolean;
  error?: Error;
  columns: { key: string; header: string; className?: string }[];
  renderRow: (item: T, index: number) => React.ReactNode;
  EmptyState: React.FC;
  ErrorState: React.FC;
  SkeletonRows: React.FC;
}

export function DataTable<T>({
  title,
  description,
  data,
  totalCount,
  totalPages,
  currentPage,
  hasNextPage,
  hasPreviousPage,
  loading,
  error,
  columns,
  renderRow,
  EmptyState,
  ErrorState,
  SkeletonRows,
}: DataTableProps<T>) {
  const showError = !loading && error && data.length === 0;
  const showEmpty = !loading && !error && data.length === 0;

  if (showError) {
    return (
      <DataTableContainer title={title} description={description}>
        <ErrorState />
      </DataTableContainer>
    );
  }

  if (showEmpty) {
    return (
      <DataTableContainer title={title} description={description}>
        <EmptyState />
      </DataTableContainer>
    );
  }

  return (
    <DataTableContainer
      title={
        <>
          {title}
          {!loading && data.length > 0 && (
            <span className="text-sm font-normal text-muted-foreground ml-2">
              ({totalCount} total)
            </span>
          )}
        </>
      }
      description={description}
    >
      <Table>
        <TableHeader className="border-b border-border/50">
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className={`font-semibold text-foreground/80 py-4 px-6 ${col.className ?? ""}`}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && data.length === 0 ? (
            <SkeletonRows />
          ) : (
            data.map((item, idx) => renderRow(item, idx))
          )}
        </TableBody>
      </Table>

      {!loading && totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <DataTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
          />
        </div>
      )}
    </DataTableContainer>
  );
}
