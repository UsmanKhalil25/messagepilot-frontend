"use client";

import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

type SortOrder = "asc" | "desc";

interface SortOrderButtonProps {
  paramKey: string;
  selected: SortOrder;
  onChange: (key: string, value: string) => void;
  labels?: {
    asc: string;
    desc: string;
  };
  disabled?: boolean;
  className?: string;
}

function SortOrderButton({
  paramKey,
  selected,
  onChange,
  labels = { asc: "Ascending", desc: "Descending" },
  disabled = false,
  className,
}: SortOrderButtonProps) {
  const handleToggle = () => {
    onChange(paramKey, selected === "desc" ? "asc" : "desc");
  };

  const currentLabel = selected === "desc" ? labels.desc : labels.asc;

  return (
    <Button
      variant="ghost"
      disabled={disabled}
      className={cn(
        "h-10 px-4 rounded-none border-0 bg-transparent hover:bg-background/80",
        className,
      )}
      onClick={handleToggle}
      aria-label={`Sort order: ${currentLabel}`}
    >
      <div className="flex items-center gap-2">
        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium w-[80px] truncate">
          {currentLabel}
        </span>
      </div>
    </Button>
  );
}

export { SortOrderButton };
export type { SortOrder };
