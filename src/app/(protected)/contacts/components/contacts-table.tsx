import { useQuery } from "@apollo/client";

import { AlertTriangle, Users } from "lucide-react";

import { DataTable } from "@/components/ui/data-table";

import { ContactsTableRow } from "./conatcts-table-row";
import { ContactsTableRowSkeleton } from "./contacts-table-row-skeleton";

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
  const { data, loading, error } = useQuery(CONTACTS, {
    variables: useSearchFilters({
      pageSize: DEFAULT_CONTACT_PAGE_SIZE,
      params: CONTACT_SEARCH_PARAMS,
    }),
  });

  const contacts = data?.contacts?.contacts || [];
  const pagination = data?.contacts?.pagination;

  return (
    <DataTable
      title="All Contacts"
      description="Browse and manage your contacts"
      data={contacts}
      totalCount={pagination?.total ?? 0}
      totalPages={pagination?.totalPages ?? 1}
      currentPage={pagination?.page ?? 1}
      hasNextPage={pagination?.hasNextPage ?? false}
      hasPreviousPage={pagination?.hasPreviousPage ?? false}
      loading={loading}
      error={error}
      columns={[
        { key: "name", header: "Name" },
        { key: "channels", header: "Channels" },
        { key: "updatedAt", header: "Last Updated" },
        { key: "actions", header: "", className: "w-[70px]" },
      ]}
      renderRow={(contact, index) => (
        <ContactsTableRow key={contact.id} contact={contact} index={index} />
      )}
      EmptyState={EmptyState}
      ErrorState={ErrorState}
      SkeletonRows={() => (
        <>
          {Array.from({ length: DEFAULT_CONTACT_PAGE_SIZE }).map((_, idx) => (
            <ContactsTableRowSkeleton key={idx} />
          ))}
        </>
      )}
    />
  );
}
