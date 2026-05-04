"use client";

import { useState } from "react";
import { mockTrucks } from "@/app/(dashboard)/trucks/_data";
import type { Truck } from "@/types/truck";

export function useTrucks() {
  return { data: mockTrucks, isLoading: false, error: null };
}

export function useTruck(id: string) {
  const truck = mockTrucks.find((t) => t.id === id) ?? null;
  return { data: truck, isLoading: false, error: null };
}

export function useCreateTruck() {
  const [isPending, setIsPending] = useState(false);
  const mutate = async (_: Partial<Truck>, options?: { onSuccess?: () => void }) => {
    setIsPending(true);
    await new Promise((r) => setTimeout(r, 500));
    setIsPending(false);
    options?.onSuccess?.();
  };
  return { mutate, isPending };
}

export function useUpdateTruck() {
  const [isPending, setIsPending] = useState(false);
  const mutate = async (_: any, options?: { onSuccess?: () => void }) => {
    setIsPending(true);
    await new Promise((r) => setTimeout(r, 500));
    setIsPending(false);
    options?.onSuccess?.();
  };
  return { mutate, isPending };
}

export function useDeleteTruck() {
  const [isPending, setIsPending] = useState(false);
  const mutate = async (_: string, options?: { onSuccess?: () => void }) => {
    setIsPending(true);
    await new Promise((r) => setTimeout(r, 500));
    setIsPending(false);
    options?.onSuccess?.();
  };
  return { mutate, isPending };
}
