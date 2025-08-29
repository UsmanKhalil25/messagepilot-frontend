import { QuerySearch } from "@/components/ui/query-search";
import { PageHeader } from "@/components/ui/page-header";
import { Animated } from "@/components/ui/animated";

import { CreateCampaignDialog } from "./components/create-campaign-dialog";
import { CampaignStats } from "./components/campaign-stats";
import { CampaignsFilters } from "./components/campaigns-filters";
import { CampaignsTable } from "./components/campaigns-table";

export default function CampaignsPage() {
  return (
    <main className="flex-1 space-y-6 p-6">
      <Animated
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <PageHeader
          title="Campaigns"
          description="Manage and monitor all your marketing campaigns"
          action={<CreateCampaignDialog />}
        />
      </Animated>

      <Animated
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        <CampaignStats />
      </Animated>

      <Animated
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.2 }}
        className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <QuerySearch
          placeholder="Search campaigns by name..."
          paramName="query"
        />
        <div className="flex-shrink-0">
          <CampaignsFilters />
        </div>
      </Animated>

      <Animated
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.3 }}
      >
        <CampaignsTable />
      </Animated>
    </main>
  );
}
