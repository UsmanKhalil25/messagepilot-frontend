"use client";

import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DEBOUNCE_TIME = 300;

interface QuerySearchProps {
  placeholder: string;
  paramName?: string;
}

export function QuerySearch({
  placeholder,
  paramName = "query",
}: QuerySearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentQuery = searchParams.get(paramName)?.toString() || "";

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set(paramName, term);
    } else {
      params.delete(paramName);
    }

    replace(`${pathname}?${params.toString()}`);
  }, DEBOUNCE_TIME);

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.delete(paramName);
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <form>
        <Input
          type="text"
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={currentQuery}
          className="pl-10 pr-10 h-10 bg-background border-border focus:ring-2 focus:ring-primary/20"
        />
      </form>
      {currentQuery && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearSearch}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </div>
  );
}
