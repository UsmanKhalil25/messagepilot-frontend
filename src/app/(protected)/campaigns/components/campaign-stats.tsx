"use client";
import { motion } from "motion/react";
import { useQuery } from "@apollo/client";

import { Target, Play, Calendar, Edit } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CAMPAIGN_STATS } from "@/graphql/queries/campaign-stats";

export function CampaignStats() {
  const { data: campaigns, loading } = useQuery(CAMPAIGN_STATS);

  const stats = {
    total: campaigns?.campaignStats.totalCampaigns,
    active: campaigns?.campaignStats.campaignsByStatus.active,
    scheduled: campaigns?.campaignStats.campaignsByStatus.queued,
    draft: campaigns?.campaignStats.campaignsByStatus.draft,
  };

  const StatValue = ({ value, color }: { value?: number; color?: string }) =>
    loading ? (
      <Skeleton className="h-6 w-12 rounded" />
    ) : (
      <div className={`text-2xl font-bold ${color ?? ""}`}>{value}</div>
    );

  return (
    <motion.div
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <StatValue value={stats.total} />
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active</CardTitle>
          <Play className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <StatValue value={stats.active} color="text-green-600" />
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
          <Calendar className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <StatValue value={stats.scheduled} color="text-blue-600" />
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Drafts</CardTitle>
          <Edit className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <StatValue value={stats.draft} color="text-orange-600" />
        </CardContent>
      </Card>
    </motion.div>
  );
}
