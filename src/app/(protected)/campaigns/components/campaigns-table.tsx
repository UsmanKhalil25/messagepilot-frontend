"use client";

import { Megaphone } from "lucide-react";
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

import { CampaignsTableRow } from "./campaigns-table-row";
import { CampaignsTableRowSkeleton } from "./campaigns-table-skeleton";
import { CampaignsPagination } from "./campaigns-pagination";
import { CAMPAIGNS } from "@/graphql/queries/campaigns";
import { useSearchFilters } from "../hooks/use-search-filter";

const SKELETON_ROWS = 5;

interface EmptyStateProps {
  title?: string;
  description?: string;
}

function EmptyState({ 
  title = "No campaigns yet", 
  description = "Get started by creating your first campaign to reach your audience and track performance."
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 mb-6 rounded-full bg-muted flex items-center justify-center">
        <Megaphone className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-center mb-6 max-w-sm">
        {description}
      </p>
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  description?: string;
}

function ErrorState({ 
  title = "Failed to load campaigns", 
  description = "We're having trouble connecting to our servers. Please check your connection and try again."
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-destructive"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-center mb-6 max-w-sm">
        {description}
      </p>
    </div>
  );
}

interface CampaignsTableContentProps {
  campaigns: any[];
  loading: boolean;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

function CampaignsTableContent({ 
  campaigns, 
  loading, 
  totalPages, 
  currentPage, 
  hasNextPage, 
  hasPreviousPage 
}: CampaignsTableContentProps) {
  return (
    <>
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
          {loading && campaigns.length === 0
            ? Array.from({ length: SKELETON_ROWS }, (_, index) => (
                <CampaignsTableRowSkeleton key={`skeleton-${index}`} />
              ))
            : campaigns.map((campaign, index) => (
                <CampaignsTableRow
                  key={`campaign-${index}`}
                  campaign={campaign}
                />
              ))}
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
    </>
  );
}

function CampaignsTable() {
  const variables = useSearchFilters();

  const { data, loading, error } = useQuery(CAMPAIGNS, {
    variables,
  });

  const campaigns = data?.campaigns?.campaigns || [];
  const totalCount = data?.campaigns?.pagination.total ?? 0;
  const currentPage = data?.campaigns?.pagination.page ?? 1;
  const totalPages = data?.campaigns?.pagination.totalPages ?? 1;
  const hasNextPage = data?.campaigns?.pagination.hasNextPage ?? false;
  const hasPreviousPage = data?.campaigns?.pagination.hasPreviousPage ?? false;

  const showError = error && !loading && campaigns.length === 0;
  const showEmpty = !loading && campaigns.length === 0 && !error;

  if (showError) {
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
            <ErrorState />
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
          {showEmpty ? (
            <EmptyState />
          ) : (
            <CampaignsTableContent
              campaigns={campaigns}
              loading={loading}
              totalPages={totalPages}
              currentPage={currentPage}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
            />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export { CampaignsTable };
