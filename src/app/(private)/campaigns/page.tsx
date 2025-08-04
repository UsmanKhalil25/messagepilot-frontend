"use client";

import { motion } from "motion/react";
import { useState } from "react";
import {
  Mail,
  MessageSquare,
  MoreHorizontal,
  Search,
  Filter,
  Target,
  Send,
  Edit,
  Trash2,
  Eye,
  Copy,
  Play,
  Pause,
  Calendar,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CreateCampaignDialog } from "./components/create-campaign-dialog";
// Sample campaigns data
const initialCampaigns = [
  {
    id: 1,
    name: "Summer Sale 2024",
    type: "Email",
    status: "Active",
    sent: 1250,
    total: 1500,
    lastUpdated: "2 hours ago",
    createdAt: "2024-01-15",
    subject: "🌞 Summer Sale - Up to 50% Off!",
    description: "Promotional campaign for summer products",
  },
  {
    id: 2,
    name: "Product Launch SMS",
    type: "SMS",
    status: "Completed",
    sent: 890,
    total: 890,
    lastUpdated: "1 day ago",
    createdAt: "2024-01-14",
    subject: "New Product Alert!",
    description: "SMS campaign for new product launch",
  },
  {
    id: 3,
    name: "Newsletter Weekly",
    type: "Email",
    status: "Scheduled",
    sent: 0,
    total: 2300,
    lastUpdated: "3 hours ago",
    createdAt: "2024-01-13",
    subject: "Weekly Newsletter - Tech Updates",
    description: "Weekly newsletter with latest updates",
  },
  {
    id: 4,
    name: "Flash Sale Alert",
    type: "SMS",
    status: "Active",
    sent: 456,
    total: 600,
    lastUpdated: "30 minutes ago",
    createdAt: "2024-01-12",
    subject: "⚡ Flash Sale - 24 Hours Only!",
    description: "Limited time flash sale notification",
  },
  {
    id: 5,
    name: "Customer Survey",
    type: "Email",
    status: "Draft",
    sent: 0,
    total: 1800,
    lastUpdated: "5 hours ago",
    createdAt: "2024-01-11",
    subject: "Help Us Improve - Quick Survey",
    description: "Customer feedback survey campaign",
  },
  {
    id: 6,
    name: "Welcome Series",
    type: "Email",
    status: "Active",
    sent: 234,
    total: 500,
    lastUpdated: "1 hour ago",
    createdAt: "2024-01-10",
    subject: "Welcome to Our Community!",
    description: "Onboarding email series for new users",
  },
];

function getStatusBadgeVariant(status: string) {
  switch (status.toLowerCase()) {
    case "active":
      return "default";
    case "completed":
      return "secondary";
    case "scheduled":
      return "outline";
    case "draft":
      return "secondary";
    default:
      return "secondary";
  }
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    type: "Email",
    subject: "",
    description: "",
    total: "",
  });

  // Filter campaigns based on search and filters
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || campaign.status.toLowerCase() === statusFilter;
    const matchesType =
      typeFilter === "all" || campaign.type.toLowerCase() === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.subject || !newCampaign.total) return;

    const campaign = {
      id: campaigns.length + 1,
      name: newCampaign.name,
      type: newCampaign.type,
      status: "Draft",
      sent: 0,
      total: Number.parseInt(newCampaign.total),
      lastUpdated: "Just now",
      createdAt: new Date().toISOString().split("T")[0],
      subject: newCampaign.subject,
      description: newCampaign.description,
    };

    setCampaigns([campaign, ...campaigns]);
    setNewCampaign({
      name: "",
      type: "Email",
      subject: "",
      description: "",
      total: "",
    });
    setIsCreateDialogOpen(false);
  };

  const handleDeleteCampaign = (id: number) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
  };

  const handleDuplicateCampaign = (campaign: any) => {
    const duplicated = {
      ...campaign,
      id: campaigns.length + 1,
      name: `${campaign.name} (Copy)`,
      status: "Draft",
      sent: 0,
      lastUpdated: "Just now",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setCampaigns([duplicated, ...campaigns]);
  };

  const stats = {
    total: campaigns.length,
    active: campaigns.filter((c) => c.status === "Active").length,
    scheduled: campaigns.filter((c) => c.status === "Scheduled").length,
    draft: campaigns.filter((c) => c.status === "Draft").length,
  };

  return (
    <main className="flex-1 space-y-6 p-6">
      {/* Header */}
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

      {/* Stats Cards */}
      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Campaigns
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Play className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.active}
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.scheduled}
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Edit className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {stats.draft}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col gap-4 md:flex-row md:items-center"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Campaigns Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>All Campaigns</CardTitle>
            <CardDescription>
              {filteredCampaigns.length} of {campaigns.length} campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign, index) => (
                  <motion.tr
                    key={campaign.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group"
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium">{campaign.name}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {campaign.subject}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {campaign.type === "Email" ? (
                          <Mail className="h-4 w-4" />
                        ) : (
                          <MessageSquare className="h-4 w-4" />
                        )}
                        {campaign.type}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">
                          {campaign.sent.toLocaleString()} /{" "}
                          {campaign.total.toLocaleString()}
                        </span>
                        <div className="h-2 w-20 rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary transition-all"
                            style={{
                              width: `${(campaign.sent / campaign.total) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {Math.round((campaign.sent / campaign.total) * 100)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {campaign.createdAt}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {campaign.lastUpdated}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100"
                          >
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit campaign
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDuplicateCampaign(campaign)}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          {campaign.status === "Active" ? (
                            <DropdownMenuItem>
                              <Pause className="mr-2 h-4 w-4" />
                              Pause campaign
                            </DropdownMenuItem>
                          ) : campaign.status === "Draft" ? (
                            <DropdownMenuItem>
                              <Send className="mr-2 h-4 w-4" />
                              Launch campaign
                            </DropdownMenuItem>
                          ) : null}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteCampaign(campaign.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete campaign
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
            {filteredCampaigns.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No campaigns found matching your criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
