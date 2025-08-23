"use client";

import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SortOption {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SortByFilterProps {
  options: SortOption[];
  selected: string;
  paramKey: string;
  onChange: (key: string, value: string) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

function SortByFilter({
  options,
  selected,
  paramKey,
  onChange,
  label = "Sort by",
  disabled = false,
  className,
}: SortByFilterProps) {
  const currentOption =
    options.find((option) => option.value === selected) || options[0];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          disabled={disabled}
          className={cn(
            "h-10 px-4 rounded-none border-0 bg-transparent hover:bg-background/80",
            className
          )}
          aria-label={`Sort by ${currentOption.label}`}
        >
          <div className="flex items-center gap-2">
            <currentOption.icon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium w-[100px] truncate">
              {currentOption.label}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="start">
        <div className="space-y-1">
          {label && (
            <>
              <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
                {label}
              </div>
              <Separator />
            </>
          )}
          {options.map(({ value, label, icon: Icon }) => {
            const isSelected = selected === value;
            return (
              <Button
                key={value}
                variant="ghost"
                className={cn(
                  "w-full justify-start h-9 px-2",
                  isSelected && "bg-accent text-accent-foreground"
                )}
                onClick={() => onChange(paramKey, value)}
                aria-selected={isSelected}
              >
                <Icon className="h-4 w-4 mr-3 text-muted-foreground" />
                <span className="text-sm">{label}</span>
                {isSelected && <Check className="ml-auto h-3 w-3" />}
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { SortByFilter };
