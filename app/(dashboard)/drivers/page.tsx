"use client";

import { Box, Button, TextField, InputAdornment, MenuItem } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import DriverTable from "@/components/drivers/DriverTable";
import { mockDrivers } from "./_data";

const STATUS_OPTIONS = ["All", "Active", "Deactivated", "On Leave"];

export default function DriversPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = mockDrivers.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <Box>
      <PageHeader
        title="Drivers"
        subtitle={`${mockDrivers.length} registered drivers`}
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Drivers" }]}
        action={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            component={Link}
            href="/drivers/new"
          >
            Register Driver
          </Button>
        }
      />

      <SectionCard
        title="All Drivers"
        subtitle={`Showing ${filtered.length} of ${mockDrivers.length}`}
        action={
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <TextField
              size="small"
              placeholder="Search drivers…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 16, color: "#9ca3af" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 220 }}
            />
            <TextField
              size="small"
              select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ width: 130 }}
            >
              {STATUS_OPTIONS.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </TextField>
          </Box>
        }
        noPadding
      >
        <DriverTable drivers={filtered} />
      </SectionCard>
    </Box>
  );
}
