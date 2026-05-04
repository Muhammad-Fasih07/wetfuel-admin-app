"use client";

import { Box, Button, TextField, InputAdornment, MenuItem } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import CustomerTable from "@/components/customers/CustomerTable";
import { mockCustomers } from "./_data";

const STATUS_OPTIONS = ["All", "Active", "Pending", "Deactivated"];

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = mockCustomers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <Box>
      <PageHeader
        title="Customers"
        subtitle={`${mockCustomers.length} registered customers`}
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Customers" }]}
        action={
          <Button variant="contained" startIcon={<AddIcon />} component={Link} href="/customers/new">
            Register Customer
          </Button>
        }
      />
      <SectionCard
        title="All Customers"
        subtitle={`Showing ${filtered.length} of ${mockCustomers.length}`}
        action={
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <TextField size="small" placeholder="Search customers…" value={search} onChange={(e) => setSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 16, color: "#9ca3af" }} /></InputAdornment> }}
              sx={{ width: 220 }}
            />
            <TextField size="small" select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} sx={{ width: 130 }}>
              {STATUS_OPTIONS.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
          </Box>
        }
        noPadding
      >
        <CustomerTable customers={filtered} />
      </SectionCard>
    </Box>
  );
}
