"use client";

import { useState } from "react";
import { mockJobs } from "@/app/(dashboard)/jobs/_data";
import type { JobTicket } from "@/types/job";

export function useJobs() {
  return { data: mockJobs, isLoading: false, error: null };
}

export function useJob(id: string) {
  const job = mockJobs.find((j) => j.id === id) ?? null;
  return { data: job, isLoading: false, error: null };
}

export function useCreateJob() {
  const [isPending, setIsPending] = useState(false);
  const mutate = async (_: Partial<JobTicket>, options?: { onSuccess?: () => void }) => {
    setIsPending(true);
    await new Promise((r) => setTimeout(r, 500));
    setIsPending(false);
    options?.onSuccess?.();
  };
  return { mutate, isPending };
}

export function useUpdateJob() {
  const [isPending, setIsPending] = useState(false);
  const mutate = async (_: any, options?: { onSuccess?: () => void }) => {
    setIsPending(true);
    await new Promise((r) => setTimeout(r, 500));
    setIsPending(false);
    options?.onSuccess?.();
  };
  return { mutate, isPending };
}
