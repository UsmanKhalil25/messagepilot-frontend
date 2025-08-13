"use client";

import { motion } from "framer-motion";
import {
  Filter,
  Check,
  ChevronDown,
  Calendar,
  Tag,
  ArrowUpDown,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface StatusFilterProps {
  statusFilter: string;
  updateQueryParam: (key: string, value: string) => void;
}

function StatusFilter({ statusFilter, updateQueryParam }: StatusFilterProps) {
  const configs: Record<string, { label: string; bgColor: string }> = {
    all: { label: "All Status", bgColor: "bg-muted" },
    active: { label: "Active", bgColor: "bg-green-500" },
    queued: { label: "Queued", bgColor: "bg-blue-500" },
    completed: { label: "Completed", bgColor: "bg-emerald-500" },
    draft: { label: "Draft", bgColor: "bg-gray-400" },
    failed: { label: "Failed", bgColor: "bg-red-500" },
  };

  const current = configs[statusFilter] || configs.all;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-10 px-4 justify-between min-w-[140px] bg-background hover:bg-muted/50 border-border/60"
        >
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${current.bgColor}`} />
            <span className="text-sm font-medium w-[80px] truncate">
              {current.label}
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
          {Object.entries(configs).map(([value, { label, bgColor }]) => (
            <Button
              key={value}
              variant="ghost"
              className={`w-full justify-start h-9 px-2 ${statusFilter === value ? "bg-accent text-accent-foreground" : ""}`}
              onClick={() => updateQueryParam("status", value)}
            >
              <div className={`w-2 h-2 rounded-full ${bgColor} mr-3`} />
              <span className="text-sm">{label}</span>
              {statusFilter === value && <Check className="ml-auto h-3 w-3" />}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface SortByFilterProps {
  sortBy: string;
  updateQueryParam: (key: string, value: string) => void;
}
function SortByFilter({ sortBy, updateQueryParam }: SortByFilterProps) {
  const options = [
    { value: "created_at", label: "Created Date", icon: Calendar },
    { value: "updated_at", label: "Updated Date", icon: Calendar },
    { value: "name", label: "Name", icon: Tag },
    { value: "status", label: "Status", icon: Filter },
  ];

  const current = options.find((o) => o.value === sortBy) || options[0];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="h-10 px-4 rounded-none border-0 bg-transparent hover:bg-background/80"
        >
          <div className="flex items-center gap-2">
            <current.icon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium w-[100px] truncate">
              {current.label}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="start">
        <div className="space-y-1">
          <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
            Sort by
          </div>
          <Separator />
          {options.map(({ value, label, icon: Icon }) => (
            <Button
              key={value}
              variant="ghost"
              className={`w-full justify-start h-9 px-2 ${sortBy === value ? "bg-accent text-accent-foreground" : ""}`}
              onClick={() => updateQueryParam("sortBy", value)}
            >
              <Icon className="h-4 w-4 mr-3 text-muted-foreground" />
              <span className="text-sm">{label}</span>
              {sortBy === value && <Check className="ml-auto h-3 w-3" />}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface SortOrderButtonProps {
  sortOrder: string;
  updateQueryParam: (key: string, value: string) => void;
}

function SortOrderButton({
  sortOrder,
  updateQueryParam,
}: SortOrderButtonProps) {
  return (
    <Button
      variant="ghost"
      className="h-10 px-4 rounded-none border-0 bg-transparent hover:bg-background/80"
      onClick={() =>
        updateQueryParam("sortOrder", sortOrder === "desc" ? "asc" : "desc")
      }
    >
      <div className="flex items-center gap-2">
        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium w-[60px] truncate">
          {sortOrder === "desc" ? "Newest" : "Oldest"}
        </span>
      </div>
    </Button>
  );
}

function CampaignsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const statusFilter = searchParams.get("status") || "all";
  const sortBy = searchParams.get("sortBy") || "created_at";
  const sortOrder = searchParams.get("sortOrder") || "desc";

  const updateQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all" && key === "status") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <motion.div
      className="flex items-center gap-3 flex-wrap"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <StatusFilter
        statusFilter={statusFilter}
        updateQueryParam={updateQueryParam}
      />

      <div className="flex items-center bg-muted/40 rounded-lg border border-border/60 overflow-hidden">
        <SortByFilter sortBy={sortBy} updateQueryParam={updateQueryParam} />
        <Separator orientation="vertical" className="h-6" />
        <SortOrderButton
          sortOrder={sortOrder}
          updateQueryParam={updateQueryParam}
        />
      </div>
    </motion.div>
  );
}

export { CampaignsFilters };
