import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { Trash2, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CommunicationChannelSelect } from "@/components/ui/communication-channel-select";

import {
  CreateContactInput,
  CommunicationChannel,
  Contact,
} from "@/__generated__/graphql";
import { createContactSchema } from "../schemas/create-contact.schema";
import { CREATE_CONTACT } from "@/graphql/mutations/create-contact";
type CreateContactSchema = CreateContactInput;

function SingleContactForm() {
  const form = useForm<CreateContactSchema>({
    resolver: zodResolver(createContactSchema),
    defaultValues: {
      name: "",
      contactChannels: [{ type: CommunicationChannel.Email, value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "contactChannels",
  });

  const [createContact, { loading }] = useMutation<
    Contact,
    { input: CreateContactInput }
  >(CREATE_CONTACT);
  const onSubmit = (data: CreateContactSchema) => {
    createContact({
      variables: { input: data },
      onCompleted: () => {
        toast.success("Campaign created successfull");
        form.reset();
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create a campaign");
      },
    });
  };

  const addContactChannel = () => {
    append({ type: CommunicationChannel.Email, value: "" });
  };

  const getPlaceholderText = (type: CommunicationChannel) => {
    switch (type) {
      case CommunicationChannel.Email:
        return "Enter email address";
      case CommunicationChannel.Sms:
        return "Enter SMS number";
      default:
        return "Enter value";
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter contact name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Contact Channels</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addContactChannel}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Channel
            </Button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-start">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name={`contactChannels.${index}.type`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CommunicationChannelSelect
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Select type"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`contactChannels.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={getPlaceholderText(
                            form.watch(`contactChannels.${index}.type`),
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="mt-1"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Creating..." : "Create Contact"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export { SingleContactForm };
