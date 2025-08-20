// src/context/UserContext.tsx
"use client";

import { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";

import { CURRENT_USER } from "@/graphql/queries/current-user";
type User = {
  id: string;
  email: string;
  name: string;
} | null;

type UserContextType = {
  user: User;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data, loading, error } = useQuery(CURRENT_USER);
  if (
    error?.graphQLErrors.some((e) => e.extensions?.code === "UNAUTHENTICATED")
  ) {
    router.push("/login");
  }

  return (
    <UserContext.Provider value={{ user: data?.currentUser ?? null, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
