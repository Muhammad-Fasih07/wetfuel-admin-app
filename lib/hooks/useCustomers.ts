"use client";

import { useState } from "react";
import { mockCustomers } from "@/app/(dashboard)/customers/_data";
import type { Customer } from "@/types/customer";

export function useCustomers() {
  return { data: mockCustomers, isLoading: false, error: null };
}

export function useCustomer(id: string) {
  const customer = mockCustomers.find((c) => c.id === id) ?? null;
  return { data: customer, isLoading: false, error: null };
}

export function useCreateCustomer() {
  const [isPending, setIsPending] = useState(false);
  const mutate = async (_: Partial<Customer>, options?: { onSuccess?: () => void }) => {
    setIsPending(true);
    await new Promise((r) => setTimeout(r, 500));
    setIsPending(false);
    options?.onSuccess?.();
  };
  return { mutate, isPending };
}

export function useUpdateCustomer() {
  const [isPending, setIsPending] = useState(false);
  const mutate = async (_: any, options?: { onSuccess?: () => void }) => {
    setIsPending(true);
    await new Promise((r) => setTimeout(r, 500));
    setIsPending(false);
    options?.onSuccess?.();
  };
  return { mutate, isPending };
}

export function useDeleteCustomer() {
  const [isPending, setIsPending] = useState(false);
  const mutate = async (_: string, options?: { onSuccess?: () => void }) => {
    setIsPending(true);
    await new Promise((r) => setTimeout(r, 500));
    setIsPending(false);
    options?.onSuccess?.();
  };
  return { mutate, isPending };
}
