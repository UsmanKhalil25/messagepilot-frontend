"use client";

import { useQuery } from "@apollo/client";
import { Target, Play, Calendar, Edit } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CAMPAIGN_STATS } from "@/graphql/queries/campaign-stats";

interface StatCardProps {
  title: string;
  value?: number;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
  loading?: boolean;
}

function StatCard({ title, value, icon: Icon, color, loading }: StatCardProps) {
  const StatValue = () => {
    if (loading) {
      return <Skeleton className="h-6 w-12 rounded" />;
    }
    return <div className={`text-2xl font-bold ${color ?? ""}`}>{value}</div>;
  };

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color || "text-muted-foreground"}`} />
      </CardHeader>
      <CardContent>
        <StatValue />
      </CardContent>
    </Card>
  );
}

interface CampaignStatsData {
  total?: number;
  active?: number;
  scheduled?: number;
  draft?: number;
}

function CampaignStats() {
  const { data: campaigns, loading, error } = useQuery(CAMPAIGN_STATS);

  const stats: CampaignStatsData = {
    total: campaigns?.campaignStats.totalCampaigns,
    active: campaigns?.campaignStats.campaignsByStatus.active,
    scheduled: campaigns?.campaignStats.campaignsByStatus.queued,
    draft: campaigns?.campaignStats.campaignsByStatus.draft,
  };

  if (!loading && error) {
    return null;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Campaigns"
        value={stats.total}
        icon={Target}
        loading={loading}
      />

      <StatCard
        title="Active"
        value={stats.active}
        icon={Play}
        color="text-green-600"
        loading={loading}
      />

      <StatCard
        title="Scheduled"
        value={stats.scheduled}
        icon={Calendar}
        color="text-blue-600"
        loading={loading}
      />

      <StatCard
        title="Drafts"
        value={stats.draft}
        icon={Edit}
        color="text-orange-600"
        loading={loading}
      />
    </div>
  );
}

export { CampaignStats };
