"use client";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import RegisterTruckForm from "@/components/trucks/RegisterTruckForm";
import { useUIStore } from "@/store/uiStore";
import type { TruckInput } from "@/lib/utils/validators";

export default function NewTruckPage() {
  const router = useRouter();
  const { addToast } = useUIStore();

  const handleSubmit = async (data: TruckInput) => {
    try {
      await fetch("/api/trucks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, fuelReservoirs: [] }),
      });
      addToast({ type: "success", message: "Truck registered successfully!" });
      router.push("/trucks");
    } catch {
      addToast({ type: "error", message: "Failed to register truck" });
    }
  };

  return (
    <Box>
      <PageHeader
        title="Register New Truck"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Trucks", href: "/trucks" }, { label: "New Truck" }]}
      />
      <SectionCard title="Truck Details">
        <RegisterTruckForm onSubmit={handleSubmit} />
      </SectionCard>
    </Box>
  );
}
