"use client";

import { motion } from "motion/react";
import { useQuery } from "@apollo/client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { CampaignsTableRow } from "./camapigns-table-row";
import { CampaignsTableRowSkeleton } from "./campaigns-table-skeleton";
import { CampaignsPagination } from "./campaigns-pagination";
import { CAMPAIGNS } from "@/graphql/queries/campaigns";
import { useSearchFilters } from "../hooks/use-search-filter";

const SKELETON_ROWS = 5;

function CampaignsTable() {
  const variables = useSearchFilters();

  const { data, loading, error } = useQuery(CAMPAIGNS, {
    variables,
  });

  const campaigns = data?.campaigns?.campaigns ?? [];
  const totalCount = data?.campaigns?.pagination.total ?? 0;
  const currentPage = data?.campaigns?.pagination.page ?? 1;
  const totalPages = data?.campaigns?.pagination.totalPages ?? 1;
  const hasNextPage = data?.campaigns?.pagination.hasNextPage ?? false;
  const hasPreviousPage = data?.campaigns?.pagination.hasPreviousPage ?? false;

  if (error && !loading && campaigns.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>All Campaigns</CardTitle>
            <CardDescription>Browse and manage your campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertDescription>
                Failed to load campaigns. Please try again later.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>
            All Campaigns
            {!loading && totalCount > 0 && (
              <span className="text-sm font-normal text-muted-foreground ml-2">
                ({totalCount} total)
              </span>
            )}
          </CardTitle>
          <CardDescription>Browse and manage your campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          {error && campaigns.length > 0 && (
            <Alert variant="default" className="mb-4">
              <AlertDescription>
                Some data may be outdated due to a connection issue.
              </AlertDescription>
            </Alert>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && campaigns.length === 0 ? (
                Array.from({ length: SKELETON_ROWS }, (_, index) => (
                  <CampaignsTableRowSkeleton key={`skeleton-${index}`} />
                ))
              ) : campaigns.length === 0 ? (
                <TableRow>
                  <td
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No campaigns found
                  </td>
                </TableRow>
              ) : (
                campaigns.map((campaign, index) => (
                  <CampaignsTableRow
                    key={`campaign-${index}`}
                    campaign={campaign}
                  />
                ))
              )}
            </TableBody>
          </Table>

          {!loading && totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <CampaignsPagination
                currentPage={currentPage}
                totalPages={totalPages}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export { CampaignsTable };

