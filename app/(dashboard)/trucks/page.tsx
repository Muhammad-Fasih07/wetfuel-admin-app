"use client";

import { Box, Button, TextField, InputAdornment, MenuItem } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import TruckTable from "@/components/trucks/TruckTable";
import { mockTrucks } from "./_data";

const STATUS_OPTIONS = ["All", "Active", "Maintenance", "Decommissioned"];

export default function TrucksPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = mockTrucks.filter((t) => {
    const matchSearch =
      t.plateNumber.toLowerCase().includes(search.toLowerCase()) ||
      t.vin.toLowerCase().includes(search.toLowerCase()) ||
      `${t.make} ${t.model}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <Box>
      <PageHeader
        title="Trucks"
        subtitle={`${mockTrucks.length} registered vehicles`}
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Trucks" }]}
        action={
          <Button variant="contained" startIcon={<AddIcon />} component={Link} href="/trucks/new">
            Register Truck
          </Button>
        }
      />
      <SectionCard
        title="Fleet"
        subtitle={`Showing ${filtered.length} of ${mockTrucks.length}`}
        action={
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <TextField size="small" placeholder="Search trucks…" value={search} onChange={(e) => setSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 16, color: "#9ca3af" }} /></InputAdornment> }}
              sx={{ width: 200 }}
            />
            <TextField size="small" select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} sx={{ width: 140 }}>
              {STATUS_OPTIONS.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
          </Box>
        }
        noPadding
      >
        <TruckTable trucks={filtered} />
      </SectionCard>
    </Box>
  );
}
