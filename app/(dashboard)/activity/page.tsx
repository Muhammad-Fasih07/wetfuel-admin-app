"use client";

import { Box, Typography, Chip, Button, Table, TableBody, TableCell, TableHead, TableRow, Avatar, Divider } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import FlagIcon from "@mui/icons-material/Flag";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import QrCodeIcon from "@mui/icons-material/QrCode";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import { formatDateTime } from "@/lib/utils/formatters";

const flaggedActivities = [
  { id: "f1", type: "Unusual Volume", customer: "Capitol Fleet Services", driver: "Marcus Rivera", details: "Delivered 312 gal vs requested 200 gal — 56% overage", severity: "high", time: "2024-11-07T14:30:00Z" },
  { id: "f2", type: "GPS Mismatch", customer: "Lone Star Agriculture", driver: "Jordan Kelley", details: "Delivery location 2.8 miles outside geofenced zone", severity: "medium", time: "2024-11-07T11:15:00Z" },
  { id: "f3", type: "Extended Stop", customer: "Austin Construction LLC", driver: "Diana Cortez", details: "Truck stopped for 47 minutes during delivery window", severity: "low", time: "2024-11-06T09:00:00Z" },
];

const registrationRequests = [
  { id: "r1", type: "New Customer", name: "Bluestone Drilling Inc.", email: "ops@bluestone.com", phone: "5125551201", submittedAt: "2024-11-08T08:30:00Z" },
  { id: "r2", type: "New Customer", name: "HVAC Pro Services LLC", email: "dispatch@hvacpro.com", phone: "5125551301", submittedAt: "2024-11-07T16:00:00Z" },
];

const changeRequests = [
  { id: "c1", type: "Location Change", customer: "Capitol Fleet Services", current: "4200 N Lamar Blvd", requested: "4800 N Lamar Blvd", submittedAt: "2024-11-08T10:00:00Z" },
  { id: "c2", type: "Location Photo Update", customer: "Austin Construction LLC", current: "2 photos", requested: "New photos attached", submittedAt: "2024-11-07T15:00:00Z" },
];

const SEVERITY_COLORS: Record<string, { bg: string; color: string }> = {
  high: { bg: "rgba(239,68,68,0.15)", color: "#f87171" },
  medium: { bg: "rgba(245,158,11,0.15)", color: "#fbbf24" },
  low: { bg: "rgba(59,130,246,0.15)", color: "#60a5fa" },
};

export default function ActivityPage() {
  return (
    <Box>
      <PageHeader
        title="Activity"
        subtitle="Flagged activities and pending requests"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Activity" }]}
      />

      {/* Flagged Activities */}
      <Box sx={{ mb: 3 }}>
        <SectionCard title="Flagged Fueling Activities" subtitle="Anomalies detected by the system" action={
          <Chip label={`${flaggedActivities.length} flags`} size="small" sx={{ backgroundColor: "rgba(239,68,68,0.15)", color: "#f87171", fontWeight: 600 }} />
        } noPadding>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Driver</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>Time</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {flaggedActivities.map((flag) => {
                const sc = SEVERITY_COLORS[flag.severity];
                return (
                  <TableRow key={flag.id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <FlagIcon sx={{ fontSize: 16, color: sc.color }} />
                        <Typography sx={{ fontSize: "0.8rem", fontWeight: 600 }}>{flag.type}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{flag.customer}</TableCell>
                    <TableCell>{flag.driver}</TableCell>
                    <TableCell sx={{ maxWidth: 240 }}>
                      <Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>{flag.details}</Typography>
                    </TableCell>
                    <TableCell><Chip label={flag.severity} size="small" sx={{ backgroundColor: sc.bg, color: sc.color, fontWeight: 600, textTransform: "capitalize" }} /></TableCell>
                    <TableCell><Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>{formatDateTime(flag.time)}</Typography></TableCell>
                    <TableCell align="right">
                      <Button size="small" variant="outlined" sx={{ fontSize: "0.7rem" }}>Review</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </SectionCard>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2.5, "@media (max-width: 900px)": { gridTemplateColumns: "1fr" } }}>
        {/* New Customer Requests */}
        <SectionCard
          title="New Customer Registration Requests"
          subtitle={`${registrationRequests.length} pending`}
          action={<PersonAddIcon sx={{ color: "#9ca3af" }} />}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {registrationRequests.map((req) => (
              <Box key={req.id} sx={{ p: 2, borderRadius: "10px", border: "1px solid rgba(255,255,255,0.07)" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: "0.875rem" }}>{req.name}</Typography>
                    <Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>{req.email}</Typography>
                  </Box>
                  <Typography sx={{ fontSize: "0.7rem", color: "#9ca3af" }}>{formatDateTime(req.submittedAt)}</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button size="small" variant="outlined" startIcon={<CheckIcon />} sx={{ fontSize: "0.7rem", borderColor: "#22c55e", color: "#22c55e" }}>Approve</Button>
                  <Button size="small" variant="outlined" startIcon={<CloseIcon />} sx={{ fontSize: "0.7rem", borderColor: "#ef4444", color: "#ef4444" }}>Reject</Button>
                </Box>
              </Box>
            ))}
          </Box>
        </SectionCard>

        {/* Change Requests */}
        <SectionCard
          title="Location & Photo Change Requests"
          subtitle={`${changeRequests.length} pending`}
          action={<EditLocationIcon sx={{ color: "#9ca3af" }} />}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {changeRequests.map((req) => (
              <Box key={req.id} sx={{ p: 2, borderRadius: "10px", border: "1px solid rgba(255,255,255,0.07)" }}>
                <Box sx={{ mb: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: "0.875rem" }}>{req.customer}</Typography>
                    <Chip label={req.type} size="small" sx={{ fontSize: "0.65rem", backgroundColor: "rgba(59,130,246,0.15)", color: "#60a5fa" }} />
                  </Box>
                  <Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>Current: {req.current}</Typography>
                  <Typography sx={{ fontSize: "0.75rem", color: "#f1f5f9" }}>Requested: {req.requested}</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button size="small" variant="outlined" startIcon={<CheckIcon />} sx={{ fontSize: "0.7rem", borderColor: "#22c55e", color: "#22c55e" }}>Approve</Button>
                  <Button size="small" variant="outlined" startIcon={<CloseIcon />} sx={{ fontSize: "0.7rem", borderColor: "#ef4444", color: "#ef4444" }}>Reject</Button>
                </Box>
              </Box>
            ))}
          </Box>
        </SectionCard>
      </Box>
    </Box>
  );
}
