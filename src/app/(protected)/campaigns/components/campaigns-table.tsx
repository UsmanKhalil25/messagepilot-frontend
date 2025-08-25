"use client";

import { AlertTriangle, Megaphone } from "lucide-react";
import { useQuery } from "@apollo/client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableContainer } from "@/components/ui/data-table-container";
import { DataTablePagination } from "@/components/ui/data-table-pagination";

import { useSearchFilters } from "@/hooks/use-search-filters";

import { CampaignsTableRow } from "./campaigns-table-row";
import { CampaignsTableRowSkeleton } from "./campaigns-table-skeleton";

import { GetCampaignsQuery } from "@/__generated__/graphql";

import {
  CAMPAIGN_SEARCH_PARAMS,
  DEFAULT_CAMPAIGN_PAGE_SIZE,
} from "../constants";
import { CAMPAIGNS } from "@/graphql/queries/campaigns";

type Campaign = GetCampaignsQuery["campaigns"]["campaigns"][number];

interface EmptyStateProps {
  title?: string;
  description?: string;
}

function EmptyState({
  title = "No campaigns yet",
  description = "Get started by creating your first campaign to reach your audience and track performance.",
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
  description = "We're having trouble connecting to our servers. Please check your connection and try again.",
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
        <AlertTriangle className="w-8 h-8 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-center mb-6 max-w-sm">
        {description}
      </p>
    </div>
  );
}

function LoadingState() {
  return Array.from({ length: DEFAULT_CAMPAIGN_PAGE_SIZE }, (_, index) => (
    <CampaignsTableRowSkeleton key={`skeleton-${index}`} />
  ));
}

interface CampaignsTableContentProps {
  campaigns: Campaign[];
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
  hasPreviousPage,
}: CampaignsTableContentProps) {
  return (
    <>
      <Table>
        <TableHeader className="border-b border-border/50">
          <TableRow>
            <TableHead className="font-semibold text-foreground/80 py-4 px-6">
              Campaign Name
            </TableHead>
            <TableHead className="font-semibold text-foreground/80 py-4 px-6">
              Type
            </TableHead>
            <TableHead className="font-semibold text-foreground/80 py-4 px-6">
              Status
            </TableHead>
            <TableHead className="font-semibold text-foreground/80 py-4 px-6">
              Last Updated
            </TableHead>
            <TableHead className="w-[70px] py-4 px-6"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && campaigns.length === 0 ? (
            <LoadingState />
          ) : (
            campaigns.map((campaign, index) => (
              <CampaignsTableRow
                key={campaign.id}
                campaign={campaign}
                index={index}
              />
            ))
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
    </>
  );
}

function CampaignsTable() {
  const variables = useSearchFilters({
    pageSize: DEFAULT_CAMPAIGN_PAGE_SIZE,
    params: CAMPAIGN_SEARCH_PARAMS,
  });

  const { data, loading, error } = useQuery(CAMPAIGNS, {
    variables,
  });

  const campaigns = data?.campaigns?.campaigns || [];
  const totalCount = data?.campaigns?.pagination.total ?? 0;
  const currentPage = data?.campaigns?.pagination.page ?? 1;
  const totalPages = data?.campaigns?.pagination.totalPages ?? 1;
  const hasNextPage = data?.campaigns?.pagination.hasNextPage ?? false;
  const hasPreviousPage = data?.campaigns?.pagination.hasPreviousPage ?? false;

  const showError = !loading && error && campaigns.length === 0;
  const showEmpty = !loading && !error && campaigns.length === 0;

  if (showError) {
    return (
      <DataTableContainer
        title="All Campaigns"
        description="Browse and manage your campaigns"
      >
        <ErrorState />
      </DataTableContainer>
    );
  }

  if (showEmpty) {
    return (
      <DataTableContainer
        title="All Campaigns"
        description="Browse and manage your campaigns"
      >
        <EmptyState />
      </DataTableContainer>
    );
  }

  return (
    <DataTableContainer
      title={
        <>
          All Campaigns
          {!loading && campaigns.length > 0 && (
            <span className="text-sm font-normal text-muted-foreground ml-2">
              ({totalCount} total)
            </span>
          )}
        </>
      }
      description="Browse and manage your campaigns"
    >
      <CampaignsTableContent
        campaigns={campaigns}
        loading={loading}
        totalPages={totalPages}
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
      />
    </DataTableContainer>
  );
}

export { CampaignsTable };
