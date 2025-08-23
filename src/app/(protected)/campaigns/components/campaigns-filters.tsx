"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Calendar, Tag, Filter, Check, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import { SortByFilter } from "@/components/ui/sort-by-filter";
import { SortOrderButton, SortOrder } from "@/components/ui/sort-order-button";

interface StatusFilterConfig {
  label: string;
  bgColor: string;
}

const statusConfigs: Record<string, StatusFilterConfig> = {
  all: { label: "All Status", bgColor: "bg-muted" },
  active: { label: "Active", bgColor: "bg-green-500" },
  queued: { label: "Queued", bgColor: "bg-blue-500" },
  completed: { label: "Completed", bgColor: "bg-emerald-500" },
  draft: { label: "Draft", bgColor: "bg-gray-400" },
  failed: { label: "Failed", bgColor: "bg-red-500" },
};

const sortOptions = [
  { value: "created_at", label: "Created Date", icon: Calendar },
  { value: "updated_at", label: "Updated Date", icon: Calendar },
  { value: "name", label: "Name", icon: Tag },
  { value: "status", label: "Status", icon: Filter },
];

interface StatusFilterProps {
  selected: string;
  onChange: (key: string, value: string) => void;
}

function StatusFilter({ selected, onChange }: StatusFilterProps) {
  const currentConfig = statusConfigs[selected] || statusConfigs.all;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-10 px-4 justify-between min-w-[140px] bg-background hover:bg-muted/50 border-border/60"
        >
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${currentConfig.bgColor}`} />
            <span className="text-sm font-medium w-[80px] truncate">
              {currentConfig.label}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="start">
        <div className="space-y-1">
          <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
            Filter by Status
          </div>
          <Separator />
          {Object.entries(statusConfigs).map(([value, config]) => (
            <Button
              key={value}
              variant="ghost"
              className={`w-full justify-start h-9 px-2 ${
                selected === value ? "bg-accent text-accent-foreground" : ""
              }`}
              onClick={() => onChange("status", value)}
            >
              <div className={`w-2 h-2 rounded-full ${config.bgColor} mr-3`} />
              <span className="text-sm">{config.label}</span>
              {selected === value && <Check className="ml-auto h-3 w-3" />}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function CampaignsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get("status") || "all";
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
    <div className="flex items-center gap-3 flex-wrap">
      <StatusFilter selected={status} onChange={updateQueryParam} />

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
    </div>
  );
}

export { CampaignsFilters };
