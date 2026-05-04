"use client";

import { Box } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import RegisterTruckForm from "@/components/trucks/RegisterTruckForm";
import { useUIStore } from "@/store/uiStore";
import { mockTrucks } from "../../_data";
import type { TruckInput } from "@/lib/utils/validators";

export default function EditTruckPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToast } = useUIStore();
  const truck = mockTrucks.find((t) => t.id === id);

  if (!truck) return <Box sx={{ p: 4 }}>Truck not found</Box>;

  const handleSubmit = async (data: TruckInput) => {
    try {
      await fetch(`/api/trucks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      addToast({ type: "success", message: "Truck updated successfully!" });
      router.push(`/trucks/${id}`);
    } catch {
      addToast({ type: "error", message: "Failed to update truck" });
    }
  };

  return (
    <Box>
      <PageHeader
        title={`Edit — ${truck.plateNumber}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Trucks", href: "/trucks" },
          { label: truck.plateNumber, href: `/trucks/${id}` },
          { label: "Edit" },
        ]}
      />
      <SectionCard title="Edit Truck Details">
        <RegisterTruckForm
          defaultValues={{
            plateNumber: truck.plateNumber,
            vin: truck.vin,
            make: truck.make,
            model: truck.model,
            year: truck.year,
            status: truck.status,
            dotNumber: truck.dotNumber,
            insuranceExpiry: truck.insuranceExpiry,
            lastOilChange: truck.lastOilChange,
            lastFuelFilterChange: truck.lastFuelFilterChange,
            lastAirFilterChange: truck.lastAirFilterChange,
            lastTransmissionService: truck.lastTransmissionService,
            lastWeightsMeasuresInspection: truck.lastWeightsMeasuresInspection,
          }}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
        />
      </SectionCard>
    </Box>
  );
}
