"use client";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import RegisterCustomerForm from "@/components/customers/RegisterCustomerForm";
import { useUIStore } from "@/store/uiStore";

export default function NewCustomerPage() {
  const router = useRouter();
  const { addToast } = useUIStore();

  const handleSubmit = async (data: any) => {
    try {
      await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      addToast({ type: "success", message: "Customer registered!" });
      router.push("/customers");
    } catch {
      addToast({ type: "error", message: "Failed to register customer" });
    }
  };

  return (
    <Box>
      <PageHeader
        title="Register New Customer"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Customers", href: "/customers" }, { label: "New Customer" }]}
      />
      <SectionCard title="Customer Details">
        <RegisterCustomerForm onSubmit={handleSubmit} />
      </SectionCard>
    </Box>
  );
}
