"use client";
import { motion } from "motion/react";

import { QuerySearch } from "@/components/ui/query-search";

import { CreateCampaignDialog } from "./components/create-campaign-dialog";
import { CampaignStats } from "./components/campaign-stats";
import { CampaignsFilters } from "./components/campaigns-filters";
import { CampaignsTable } from "./components/campaigns-table";

export default function CampaignsPage() {
  return (
    <main className="flex-1 space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Campaigns</h2>
          <p className="text-muted-foreground">
            Manage and monitor all your marketing campaigns
          </p>
        </div>
        <CreateCampaignDialog />
      </motion.div>

      <CampaignStats />

      <motion.div
        className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <QuerySearch
          placeholder="Search campaigns by name..."
          paramName="query"
        />
        <div className="flex-shrink-0">
          <CampaignsFilters />
        </div>
      </motion.div>
      <CampaignsTable />
    </main>
  );
}
