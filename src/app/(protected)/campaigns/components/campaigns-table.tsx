"use client";

import { AlertTriangle, Megaphone } from "lucide-react";
import { useQuery } from "@apollo/client";

import { DataTable } from "@/components/ui/data-table";

import { useMapFilters } from "@/hooks/use-map-filters";

import { CampaignsTableRow } from "./campaigns-table-row";
import { CampaignsTableRowSkeleton } from "./campaigns-table-row-skeleton";

import {
  CAMPAIGN_SEARCH_PARAMS,
  DEFAULT_CAMPAIGN_PAGE_SIZE,
  CAMPAIGN_COLUMN_WIDTHS,
} from "../constants";
import { CAMPAIGNS } from "@/graphql/queries/campaigns";

interface CampaignsTableProps {
  searchParams: Record<string, string>;
}

interface EmptyStateProps {
  title?: string;
  description?: string;
}

interface ErrorStateProps {
  title?: string;
  description?: string;
}

const TABLE_COLUMNS = [
  {
    key: "title",
    header: "Campaign Name",
    className: CAMPAIGN_COLUMN_WIDTHS.title,
  },
  {
    key: "channelType",
    header: "Type",
    className: CAMPAIGN_COLUMN_WIDTHS.channelType,
  },
  { key: "status", header: "Status", className: CAMPAIGN_COLUMN_WIDTHS.status },
  {
    key: "updatedAt",
    header: "Last Updated",
    className: CAMPAIGN_COLUMN_WIDTHS.updatedAt,
  },
  { key: "actions", header: "", className: CAMPAIGN_COLUMN_WIDTHS.actions },
];

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

export function CampaignsTable({ searchParams }: CampaignsTableProps) {
  const { data, loading, error } = useQuery(CAMPAIGNS, {
    variables: useMapFilters({
      pageSize: DEFAULT_CAMPAIGN_PAGE_SIZE,
      params: CAMPAIGN_SEARCH_PARAMS,
      searchParams,
    }),
  });

  const campaigns = data?.campaigns?.campaigns || [];
  const pagination = data?.campaigns?.pagination;

  return (
    <DataTable
      title="All Campaigns"
      description="Browse and manage your campaigns"
      data={campaigns}
      totalPages={pagination?.totalPages ?? 1}
      currentPage={pagination?.page ?? 1}
      hasNextPage={pagination?.hasNextPage ?? false}
      hasPreviousPage={pagination?.hasPreviousPage ?? false}
      loading={loading}
      error={error}
      columns={TABLE_COLUMNS}
      renderRow={(campaign) => (
        <CampaignsTableRow key={campaign.id} campaign={campaign} />
      )}
      EmptyState={EmptyState}
      ErrorState={ErrorState}
      SkeletonRows={() => (
        <>
          {Array.from({ length: DEFAULT_CAMPAIGN_PAGE_SIZE }).map((_, idx) => (
            <CampaignsTableRowSkeleton key={idx} />
          ))}
        </>
      )}
    />
  );
}
