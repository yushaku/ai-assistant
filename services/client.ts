import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import type { PromptList } from "types";

export const httpClient = () => {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    withCredentials: true,
    headers: {
      Accept: "*",
      "Content-Type": "application/json",
    },
  });

  return client;
};

export const PROMPT_PATH = "/category";
export const useGetPrompts = () => {
  return useQuery(
    [PROMPT_PATH],
    async () => {
      const res = await httpClient().get(PROMPT_PATH);
      const botList = res.data ?? [];
      return botList as PromptList[]
    },
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};

