"use client";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import RegisterDriverForm from "@/components/drivers/RegisterDriverForm";
import { useUIStore } from "@/store/uiStore";
import type { DriverInput } from "@/lib/utils/validators";

export default function NewDriverPage() {
  const router = useRouter();
  const { addToast } = useUIStore();

  const handleSubmit = async (data: DriverInput) => {
    try {
      await fetch("/api/drivers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, certifications: [] }),
      });
      addToast({ type: "success", message: "Driver registered successfully!" });
      router.push("/drivers");
    } catch {
      addToast({ type: "error", message: "Failed to register driver" });
    }
  };

  return (
    <Box>
      <PageHeader
        title="Register New Driver"
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Drivers", href: "/drivers" },
          { label: "New Driver" },
        ]}
      />
      <SectionCard title="Driver Details">
        <RegisterDriverForm onSubmit={handleSubmit} submitLabel="Register Driver" />
      </SectionCard>
    </Box>
  );
}
