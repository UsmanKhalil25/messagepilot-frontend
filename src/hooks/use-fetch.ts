import { useCallback } from "react";

import { API_ENDPOINTS, HTTP_METHOD } from "@/config/api";

export function useFetch() {
  return useCallback(
    async (
      body: {
        query: string;
        variables?: Record<string, any>;
      },
      options: RequestInit = {},
    ): Promise<Response> => {
      return fetch(API_ENDPOINTS.GRAPHQL, {
        method: HTTP_METHOD.POST,
        credentials: "include",
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
        body: JSON.stringify(body),
      });
    },
    [],
  );
}
