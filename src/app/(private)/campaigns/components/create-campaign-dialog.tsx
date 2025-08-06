import { Plus, Mail, MessageSquare } from "lucide-react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingText } from "@/components/ui/loading-text";

import { capitalize } from "@/common/utils/string.utils";
import { CampaignStatus } from "@/common/enums/campaign-status.enum";
import { CampaignChannel } from "@/common/enums/campaign-channel.enum";
import type { CreateCampaignForm } from "../schemas/create-campaign.type";
import { createCampaignSchema } from "../schemas/create-campaign.schema";
import { useFetch } from "@/hooks/use-fetch";
import { CAMPAIGN_STATUS_COLORS } from "@/common/constants/campaign.constants";

const CREATABLE_CAMPAIGN_STATUSES: CampaignStatus[] = [
  CampaignStatus.DRAFT,
  CampaignStatus.QUEUED,
];

export function CreateCampaignDialog() {
  const fetch = useFetch();
  const [open, setOpen] = useState(false);
  const form = useForm<CreateCampaignForm>({
    resolver: zodResolver(createCampaignSchema),
    defaultValues: {
      title: "",
      description: "",
      channelType: CampaignChannel.EMAIL,
      status: undefined,
    },
  });

  const { mutate: createCampaign, isPending } = useMutation({
    mutationFn: async (data: CreateCampaignForm) => {
      const response = await fetch({
        query: `
            mutation CreateCampaign($input: CreateCampaignInput!) {
              createCampaign(input: $input) {
                id
                title
                description
                status
                channelType
                createdAt
                updatedAt
              }
            }
          `,
        variables: {
          input: {
            title: data.title,
            description: data.description,
            channelType: data.channelType,
            status: data.status || CampaignStatus.DRAFT,
          },
        },
      });

      const result = await response.json();
      if (result.errors && result.errors.length > 0) {
        throw new Error(result.errors[0].message || "GraphQL error");
      }

      return result.data.createCampaign;
    },
    onSuccess: () => {
      toast.success("Campaign created successfully!");
      form.reset();
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create campaign");
    },
  });

  const getChannelIcon = (channel: CampaignChannel) => {
    const iconProps = { className: "h-4 w-4" };
    switch (channel) {
      case CampaignChannel.EMAIL:
        return <Mail {...iconProps} />;
      case CampaignChannel.SMS:
        return <MessageSquare {...iconProps} />;
      default:
        return <Mail {...iconProps} />;
    }
  };

  const onSubmit = (data: CreateCampaignForm) => {
    createCampaign(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Campaign
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Campaign</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new campaign.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter campaign title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter campaign description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="channelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Channel Type</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a channel" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(CampaignChannel).map((channel) => (
                            <SelectItem key={channel} value={channel}>
                              <div className="flex items-center gap-2">
                                {getChannelIcon(channel)}
                                <span>{capitalize(channel.toLowerCase())}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {CREATABLE_CAMPAIGN_STATUSES.map((status) => (
                            <SelectItem key={status} value={status}>
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-2 h-2 rounded-full ${CAMPAIGN_STATUS_COLORS[status]}`}
                                />
                                <span>{capitalize(status)}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? <LoadingText text="Creating..." /> : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
