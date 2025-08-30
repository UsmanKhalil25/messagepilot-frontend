import { QuerySearch } from "@/components/ui/query-search";
import { PageHeader } from "@/components/ui/page-header";

import { CreateCampaignDialog } from "./components/create-campaign-dialog";
import { CampaignStats } from "./components/campaign-stats";
import { CampaignsFilters } from "./components/campaigns-filters";
import { CampaignsTable } from "./components/campaigns-table";

interface SearchParams {
  query?: string;
  page?: string;
  sortBy?: string;
  sortOrder?: string;
}

const DEFAULT_SEARCH_PARAMS: SearchParams = {
  page: "1",
  query: "",
  sortBy: "",
  sortOrder: "",
};

export default async function CampaignsPage(props: {
  searchParams?: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;
  const resolvedParams = { ...DEFAULT_SEARCH_PARAMS, ...searchParams };

  return (
    <main className="flex-1 space-y-6 p-6">
      <PageHeader
        title="Campaigns"
        description="Manage and monitor all your marketing campaigns"
        action={<CreateCampaignDialog />}
      />

      <CampaignStats />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <QuerySearch
          placeholder="Search campaigns by name..."
          paramName="query"
        />
        <div className="flex-shrink-0">
          <CampaignsFilters />
        </div>
      </div>
      <CampaignsTable searchParams={resolvedParams} />
    </main>
  );
}
