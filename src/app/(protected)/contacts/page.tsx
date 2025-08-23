"use client";
import { motion } from "motion/react";

import { QuerySearch } from "@/components/ui/query-search";

import { CreateContactDialog } from "./components/create-contact-dialog";
import { ContactsFilters } from "./components/contacts-filters";

export default function ContactsPage() {
  return (
    <main className="flex-1 space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contacts</h2>
          <p className="text-muted-foreground">
            View, organize, and manage all your contacts in one place
          </p>
        </div>
        <CreateContactDialog />
      </motion.div>

      <motion.div
        className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <QuerySearch
          placeholder="Search contacts by name, email, or sms number..."
          paramName="query"
        />

        <div className="flex-shrink-0">
          <ContactsFilters />
        </div>
      </motion.div>
    </main>
  );
}
