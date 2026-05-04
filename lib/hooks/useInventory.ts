"use client";

import { useState } from "react";
import {
  mockMainTanks,
  mockTruckFuelLevels,
  mockPackagedGoods,
  mockTransferLogs,
} from "@/app/(dashboard)/inventory/_data";

export function useInventory() {
  return {
    data: {
      mainTanks: mockMainTanks,
      truckFuelLevels: mockTruckFuelLevels,
      packagedGoods: mockPackagedGoods,
      transferLogs: mockTransferLogs,
    },
    isLoading: false,
    error: null,
  };
}

export function useAdjustInventory() {
  const [isPending, setIsPending] = useState(false);
  const mutate = async (_: any, options?: { onSuccess?: () => void }) => {
    setIsPending(true);
    await new Promise((r) => setTimeout(r, 500));
    setIsPending(false);
    options?.onSuccess?.();
  };
  return { mutate, isPending };
}
