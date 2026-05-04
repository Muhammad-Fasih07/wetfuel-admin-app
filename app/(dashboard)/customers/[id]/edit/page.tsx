"use client";

import { Box } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import RegisterCustomerForm from "@/components/customers/RegisterCustomerForm";
import { useUIStore } from "@/store/uiStore";
import { mockCustomers } from "../../_data";

export default function EditCustomerPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToast } = useUIStore();
  const customer = mockCustomers.find((c) => c.id === id);

  if (!customer) return <Box sx={{ p: 4 }}>Customer not found</Box>;

  const handleSubmit = async (data: any) => {
    try {
      await fetch(`/api/customers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      addToast({ type: "success", message: "Customer updated!" });
      router.push(`/customers/${id}`);
    } catch {
      addToast({ type: "error", message: "Failed to update customer" });
    }
  };

  return (
    <Box>
      <PageHeader
        title={`Edit — ${customer.name}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Customers", href: "/customers" },
          { label: customer.name, href: `/customers/${id}` },
          { label: "Edit" },
        ]}
      />
      <SectionCard title="Edit Customer Details">
        <RegisterCustomerForm
          defaultValues={{
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            status: customer.status,
            margins: customer.margins,
            minGallonLimit: customer.minGallonLimit,
            location: customer.location,
            geofencedRadius: customer.geofencedRadius,
            taxExemptions: customer.taxExemptions as unknown as Record<string, boolean>,
          }}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
        />
      </SectionCard>
    </Box>
  );
}
