"use client";

import { useState } from "react";
import { mockDrivers } from "@/app/(dashboard)/drivers/_data";
import type { Driver } from "@/types/driver";

export function useDrivers() {
  return { data: mockDrivers, isLoading: false, error: null };
}

export function useDriver(id: string) {
  const driver = mockDrivers.find((d) => d.id === id) ?? null;
  return { data: driver, isLoading: false, error: null };
}

export function useCreateDriver() {
  const [isPending, setIsPending] = useState(false);
  const mutate = async (data: Partial<Driver>, options?: { onSuccess?: () => void }) => {
    setIsPending(true);
    await new Promise((r) => setTimeout(r, 500));
    setIsPending(false);
    options?.onSuccess?.();
  };
  return { mutate, isPending };
}

export function useUpdateDriver() {
  const [isPending, setIsPending] = useState(false);
  const mutate = async (_: any, options?: { onSuccess?: () => void }) => {
    setIsPending(true);
    await new Promise((r) => setTimeout(r, 500));
    setIsPending(false);
    options?.onSuccess?.();
  };
  return { mutate, isPending };
}

export function useDeleteDriver() {
  const [isPending, setIsPending] = useState(false);
  const mutate = async (_: string, options?: { onSuccess?: () => void }) => {
    setIsPending(true);
    await new Promise((r) => setTimeout(r, 500));
    setIsPending(false);
    options?.onSuccess?.();
  };
  return { mutate, isPending };
}
