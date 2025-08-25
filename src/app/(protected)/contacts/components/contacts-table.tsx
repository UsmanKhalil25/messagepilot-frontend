import { useQuery } from "@apollo/client";

import { AlertTriangle, Users } from "lucide-react";

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
import { CONTACTS } from "@/graphql/queries/contacts";
import { CONTACT_SEARCH_PARAMS, DEFAULT_CONTACT_PAGE_SIZE } from "../constants";
import type { GetContactsQuery } from "@/__generated__/graphql";
import { ContactsTableRow } from "./conatcts-table-row";
import { ContactsTableRowSkeleton } from "./contacts-table-row-skeleton";

type Contact = GetContactsQuery["contacts"]["contacts"][number];

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

function LoadingState() {
  return Array.from({ length: DEFAULT_CONTACT_PAGE_SIZE }, (_, index) => (
    <ContactsTableRowSkeleton key={`skeleton-${index}`} />
  ));
}
interface ContactsTableContentProps {
  contacts: Contact[];
  loading: boolean;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

function ContactsTableContent({
  contacts,
  loading,
  totalPages,
  currentPage,
  hasNextPage,
  hasPreviousPage,
}: ContactsTableContentProps) {
  return (
    <>
      <Table>
        <TableHeader className="border-b border-border/50">
          <TableRow>
            <TableHead className="font-semibold text-foreground/80 py-4 px-6">
              Name
            </TableHead>
            <TableHead className="font-semibold text-foreground/80 py-4 px-6">
              Channels
            </TableHead>
            <TableHead className="font-semibold text-foreground/80 py-4 px-6">
              Last Updated
            </TableHead>
            <TableHead className="w-[70px] py-4 px-6"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && contacts.length === 0 ? (
            <LoadingState />
          ) : (
            contacts.map((contact, index) => (
              <ContactsTableRow
                key={contact.id}
                contact={contact}
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

export function ContactsTable() {
  const variables = useSearchFilters({
    pageSize: DEFAULT_CONTACT_PAGE_SIZE,
    params: CONTACT_SEARCH_PARAMS,
  });

  const { data, loading, error } = useQuery(CONTACTS, {
    variables,
  });

  const contacts = data?.contacts?.contacts || [];
  const totalCount = data?.contacts?.pagination.total ?? 0;
  const currentPage = data?.contacts?.pagination.page ?? 1;
  const totalPages = data?.contacts?.pagination.totalPages ?? 1;
  const hasNextPage = data?.contacts?.pagination.hasNextPage ?? false;
  const hasPreviousPage = data?.contacts?.pagination.hasPreviousPage ?? false;

  const showError = !loading && error && contacts.length === 0;
  const showEmpty = !loading && !error && contacts.length === 0;

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

  return (
    <DataTableContainer
      title={
        <>
          All Contacts{" "}
          {!loading && contacts.length > 0 && (
            <span className="text-sm font-normal text-muted-foreground ml-2">
              ({totalCount} total)
            </span>
          )}
        </>
      }
      description="Browse and manage your contacts"
    >
      <ContactsTableContent
        contacts={contacts}
        loading={loading}
        totalPages={totalPages}
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
      />
    </DataTableContainer>
  );
}
