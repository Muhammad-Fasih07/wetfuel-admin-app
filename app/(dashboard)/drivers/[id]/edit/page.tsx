"use client";

import { Box } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import RegisterDriverForm from "@/components/drivers/RegisterDriverForm";
import { useUIStore } from "@/store/uiStore";
import { mockDrivers } from "../../_data";
import type { DriverInput } from "@/lib/utils/validators";

export default function EditDriverPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToast } = useUIStore();
  const driver = mockDrivers.find((d) => d.id === id);

  if (!driver) return <Box sx={{ p: 4 }}>Driver not found</Box>;

  const handleSubmit = async (data: DriverInput) => {
    try {
      await fetch(`/api/drivers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      addToast({ type: "success", message: "Driver updated successfully!" });
      router.push(`/drivers/${id}`);
    } catch {
      addToast({ type: "error", message: "Failed to update driver" });
    }
  };

  return (
    <Box>
      <PageHeader
        title={`Edit — ${driver.name}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Drivers", href: "/drivers" },
          { label: driver.name, href: `/drivers/${id}` },
          { label: "Edit" },
        ]}
      />
      <SectionCard title="Edit Driver Details">
        <RegisterDriverForm
          defaultValues={{
            name: driver.name,
            email: driver.email,
            phone: driver.phone,
            emergencyContact: driver.emergencyContact,
            emergencyPhone: driver.emergencyPhone,
            status: driver.status,
            birthday: driver.birthday,
            anniversary: driver.anniversary,
            address: driver.address,
            licenceNumber: driver.licenceNumber,
            licenceExpiry: driver.licenceExpiry,
            licenceState: driver.licenceState,
          }}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
        />
      </SectionCard>
    </Box>
  );
}
