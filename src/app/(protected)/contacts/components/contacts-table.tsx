import { useQuery } from "@apollo/client";

import { AlertTriangle, Users } from "lucide-react";

import { DataTableContainer } from "@/components/ui/data-table-container";

import { useSearchFilters } from "@/hooks/use-search-filters";
import { CONTACTS } from "@/graphql/queries/contacts";
import { CONTACT_SEARCH_PARAMS, DEFAULT_CONTACT_PAGE_SIZE } from "../constants";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

function EmptyState({
  title = "No contacts yet",
  description = "Get started by adding your first contact to build your audience and manage communications.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 mb-6 rounded-full bg-muted flex items-center justify-center">
        <Users className="w-8 h-8 text-muted-foreground" />
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
  title = "Failed to load contacts",
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
export function ContactsTable() {
  const variables = useSearchFilters({
    pageSize: DEFAULT_CONTACT_PAGE_SIZE,
    params: CONTACT_SEARCH_PARAMS,
  });

  const { data, loading, error } = useQuery(CONTACTS, {
    variables,
  });

  const campaigns = data?.contacts?.contacts || [];
  const totalCount = data?.contacts?.pagination.total ?? 0;
  const currentPage = data?.contacts?.pagination.page ?? 1;
  const totalPages = data?.contacts?.pagination.totalPages ?? 1;
  const hasNextPage = data?.contacts?.pagination.hasNextPage ?? false;
  const hasPreviousPage = data?.contacts?.pagination.hasPreviousPage ?? false;

  const showError = !loading && error && campaigns.length === 0;
  const showEmpty = !loading && !error && campaigns.length === 0;

  if (showError) {
    return (
      <DataTableContainer
        title="All Contacts"
        description="Browse and manage your contacts"
      >
        <ErrorState />
      </DataTableContainer>
    );
  }

  if (showEmpty) {
    return (
      <DataTableContainer
        title="All Contacts"
        description="Browse and manage your contacts"
      >
        <EmptyState />
      </DataTableContainer>
    );
  }
  return <div>this is contacts table</div>;
}
