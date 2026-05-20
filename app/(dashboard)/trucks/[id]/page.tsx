"use client";

import { Box, Grid, Typography, Button, Tab, Tabs, Table, TableBody, TableCell, TableHead, TableRow, LinearProgress, Chip } from "@mui/material";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import StatusChip from "@/components/ui/StatusChip";
import { mockTrucks, mockPreInspections } from "../_data";
import { formatDate, isExpiringSoon, isExpired } from "@/lib/utils/formatters";

export default function TruckDetailPage() {
  const { id } = useParams();
  const [tab, setTab] = useState(0);
  const truck = mockTrucks.find((t) => t.id === id);
  const inspections = mockPreInspections.filter((p) => p.truckId === id);

  if (!truck) return <Box sx={{ p: 4 }}>Truck not found</Box>;

  const serviceFields = [
    { label: "Last Oil Change", value: formatDate(truck.lastOilChange) },
    { label: "Last Fuel Filter", value: formatDate(truck.lastFuelFilterChange) },
    { label: "Last Air Filter", value: formatDate(truck.lastAirFilterChange) },
    { label: "Last Transmission Service", value: formatDate(truck.lastTransmissionService) },
    { label: "Last W&M Inspection", value: formatDate(truck.lastWeightsMeasuresInspection) },
    { label: "Insurance Expiry", value: formatDate(truck.insuranceExpiry), warn: isExpiringSoon(truck.insuranceExpiry) || isExpired(truck.insuranceExpiry) },
    { label: "DOT Number", value: truck.dotNumber || "—" },
  ];

  return (
    <Box>
      <PageHeader
        title={`${truck.plateNumber} — ${truck.make} ${truck.model}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Trucks", href: "/trucks" },
          { label: truck.plateNumber },
        ]}
        action={
          <Button variant="contained" startIcon={<EditIcon />} component={Link} href={`/trucks/${id}/edit`}>
            Edit Truck
          </Button>
        }
      />

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={4}>
          <SectionCard title="Vehicle Info">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              {[
                { label: "Plate", value: truck.plateNumber },
                { label: "VIN", value: truck.vin },
                { label: "Make / Model", value: `${truck.make} ${truck.model}` },
                { label: "Year", value: truck.year.toString() },
                { label: "Status", value: null, chip: truck.status },
              ].map((f) => (
                <Box key={f.label} sx={{ display: "flex", justifyContent: "space-between", py: 0.75, borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                  <Typography sx={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 500 }}>{f.label}</Typography>
                  {f.chip ? <StatusChip status={f.chip as any} /> : <Typography sx={{ fontSize: "0.8rem", color: "#f1f5f9" }}>{f.value}</Typography>}
                </Box>
              ))}
            </Box>
          </SectionCard>

          <Box sx={{ mt: 2.5 }}>
            <SectionCard title="Fuel Reservoirs">
              {truck.fuelReservoirs.map((res, i) => {
                const pct = Math.round(((res.currentLevel || 0) / res.capacity) * 100);
                return (
                  <Box key={i} sx={{ mb: i < truck.fuelReservoirs.length - 1 ? 2 : 0 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                      <Typography sx={{ fontSize: "0.8rem", fontWeight: 600 }}>{res.fuelType}</Typography>
                      <Typography sx={{ fontSize: "0.8rem", color: "#64748b" }}>{res.currentLevel?.toLocaleString() || 0} / {res.capacity.toLocaleString()} gal</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={pct}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "rgba(255,255,255,0.08)",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: pct < 20 ? "#ef4444" : pct < 40 ? "#f59e0b" : "#22c55e",
                          borderRadius: 4,
                        },
                      }}
                    />
                    <Typography sx={{ fontSize: "0.7rem", color: "#9ca3af", mt: 0.25, textAlign: "right" }}>{pct}% full</Typography>
                  </Box>
                );
              })}
            </SectionCard>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <SectionCard>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: "1px solid rgba(0,0,0,0.06)", mb: 2 }}>
              <Tab label="Service Records" />
              <Tab label="Pre-Inspections" />
            </Tabs>

            {tab === 0 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {serviceFields.map((f) => (
                  <Box key={f.label} sx={{ display: "flex", justifyContent: "space-between", py: 1, borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                    <Typography sx={{ fontSize: "0.875rem", color: "#64748b" }}>{f.label}</Typography>
                    <Typography sx={{ fontSize: "0.875rem", color: f.warn ? "#f59e0b" : "#f1f5f9", fontWeight: f.warn ? 600 : 400 }}>{f.value}</Typography>
                  </Box>
                ))}
              </Box>
            )}

            {tab === 1 && (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Driver</TableCell>
                    <TableCell>Tires</TableCell>
                    <TableCell>Lights</TableCell>
                    <TableCell>Brakes</TableCell>
                    <TableCell>Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inspections.length === 0 ? (
                    <TableRow><TableCell colSpan={6} sx={{ textAlign: "center", py: 3, color: "#9ca3af" }}>No inspection records</TableCell></TableRow>
                  ) : inspections.map((ins) => (
                    <TableRow key={ins.id} hover>
                      <TableCell>{formatDate(ins.date)}</TableCell>
                      <TableCell>{ins.driverName}</TableCell>
                      <TableCell><Chip size="small" label={ins.tiresOk ? "OK" : "Issue"} sx={{ backgroundColor: ins.tiresOk ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)", color: ins.tiresOk ? "#4ade80" : "#f87171", fontSize: "0.65rem" }} /></TableCell>
                      <TableCell><Chip size="small" label={ins.lightsOk ? "OK" : "Issue"} sx={{ backgroundColor: ins.lightsOk ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)", color: ins.lightsOk ? "#4ade80" : "#f87171", fontSize: "0.65rem" }} /></TableCell>
                      <TableCell><Chip size="small" label={ins.brakesOk ? "OK" : "Issue"} sx={{ backgroundColor: ins.brakesOk ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)", color: ins.brakesOk ? "#4ade80" : "#f87171", fontSize: "0.65rem" }} /></TableCell>
                      <TableCell sx={{ maxWidth: 200 }}><Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>{ins.notes || "—"}</Typography></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}
