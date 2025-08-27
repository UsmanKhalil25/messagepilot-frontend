"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Calendar, Tag } from "lucide-react";

import { Separator } from "@/components/ui/separator";

import { SortByFilter } from "@/components/ui/sort-by-filter";
import { SortOrderButton, SortOrder } from "@/components/ui/sort-order-button";

const sortOptions = [
  { value: "created_at", label: "Created Date", icon: Calendar },
  { value: "updated_at", label: "Updated Date", icon: Calendar },
  { value: "name", label: "Name", icon: Tag },
];

function ContactsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "created_at";
  const sortOrder = (searchParams.get("sortOrder") as SortOrder) || "desc";

  const updateQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (key === "status" && value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center bg-muted/40 rounded-lg border border-border/60 overflow-hidden">
      <SortByFilter
        paramKey="sortBy"
        selected={sortBy}
        onChange={updateQueryParam}
        options={sortOptions}
      />
      <Separator orientation="vertical" className="h-6" />
      <SortOrderButton
        paramKey="sortOrder"
        selected={sortOrder}
        onChange={updateQueryParam}
        labels={{ asc: "Oldest", desc: "Newest" }}
      />
    </div>
  );
}

export { ContactsFilters };
