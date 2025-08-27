"use client";

import { AlertTriangle, Megaphone } from "lucide-react";
import { useQuery } from "@apollo/client";

import { DataTable } from "@/components/ui/data-table";

import { useSearchFilters } from "@/hooks/use-search-filters";

import { CampaignsTableRow } from "./campaigns-table-row";
import { CampaignsTableRowSkeleton } from "./campaigns-table-skeleton";

import {
  CAMPAIGN_SEARCH_PARAMS,
  DEFAULT_CAMPAIGN_PAGE_SIZE,
} from "../constants";
import { CAMPAIGNS } from "@/graphql/queries/campaigns";

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

export function CampaignsTable() {
  const { data, loading, error } = useQuery(CAMPAIGNS, {
    variables: useSearchFilters({
      pageSize: DEFAULT_CAMPAIGN_PAGE_SIZE,
      params: CAMPAIGN_SEARCH_PARAMS,
    }),
  });

  const campaigns = data?.campaigns?.campaigns || [];
  const pagination = data?.campaigns?.pagination;

  return (
    <DataTable
      title="All Campaigns"
      description="Browse and manage your campaigns"
      data={campaigns}
      totalCount={pagination?.total ?? 0}
      totalPages={pagination?.totalPages ?? 1}
      currentPage={pagination?.page ?? 1}
      hasNextPage={pagination?.hasNextPage ?? false}
      hasPreviousPage={pagination?.hasPreviousPage ?? false}
      loading={loading}
      error={error}
      columns={[
        { key: "title", header: "Campaign Name" },
        { key: "channelType", header: "Type" },
        { key: "status", header: "Status" },
        { key: "updatedAt", header: "Last Updated" },
        { key: "actions", header: "", className: "w-[70px]" },
      ]}
      renderRow={(campaign, index) => (
        <CampaignsTableRow
          key={campaign.id}
          campaign={campaign}
          index={index}
        />
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
