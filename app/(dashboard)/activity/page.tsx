"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import FlaggedActivityModal from "@/components/activity/FlaggedActivityModal";
import CustomerRegistrationModal from "@/components/activity/CustomerRegistrationModal";
import ChangeRequestModal from "@/components/activity/ChangeRequestModal";
import {
  mockFlaggedActivities,
  mockRegistrationRequests,
  mockChangeRequests,
  type FlaggedActivity,
  type RegistrationRequest,
  type ChangeRequest,
} from "./_data";
import { formatDateTime } from "@/lib/utils/formatters";
import { useUIStore } from "@/store/uiStore";
import { cardHoverBorderSx } from "@/lib/theme/cardStyles";

const SEVERITY_COLORS: Record<string, { bg: string; color: string }> = {
  high: { bg: "rgba(239,68,68,0.15)", color: "#f87171" },
  medium: { bg: "rgba(245,158,11,0.15)", color: "#fbbf24" },
  low: { bg: "rgba(59,130,246,0.15)", color: "#60a5fa" },
};

export default function ActivityPage() {
  const { addToast } = useUIStore();
  const [flaggedActivities, setFlaggedActivities] = useState<FlaggedActivity[]>(mockFlaggedActivities);
  const [registrationRequests, setRegistrationRequests] = useState<RegistrationRequest[]>(mockRegistrationRequests);
  const [changeRequests, setChangeRequests] = useState<ChangeRequest[]>(mockChangeRequests);
  const [selectedFlag, setSelectedFlag] = useState<FlaggedActivity | null>(null);
  const [selectedRegistration, setSelectedRegistration] = useState<RegistrationRequest | null>(null);
  const [selectedChange, setSelectedChange] = useState<ChangeRequest | null>(null);

  const handleApproveRegistration = (id: string) => {
    const req = registrationRequests.find((r) => r.id === id);
    setRegistrationRequests((prev) => prev.filter((r) => r.id !== id));
    setSelectedRegistration(null);
    addToast({ type: "success", message: `${req?.name ?? "Customer"} approved.` });
  };

  const handleRejectRegistration = (id: string) => {
    const req = registrationRequests.find((r) => r.id === id);
    setRegistrationRequests((prev) => prev.filter((r) => r.id !== id));
    setSelectedRegistration(null);
    addToast({ type: "warning", message: `${req?.name ?? "Customer"} registration rejected.` });
  };

  const handleApproveChange = (id: string) => {
    const req = changeRequests.find((r) => r.id === id);
    setChangeRequests((prev) => prev.filter((r) => r.id !== id));
    setSelectedChange(null);
    addToast({ type: "success", message: `Change request for ${req?.customer ?? "customer"} approved.` });
  };

  const handleRejectChange = (id: string) => {
    const req = changeRequests.find((r) => r.id === id);
    setChangeRequests((prev) => prev.filter((r) => r.id !== id));
    setSelectedChange(null);
    addToast({ type: "warning", message: `Change request for ${req?.customer ?? "customer"} rejected.` });
  };

  return (
    <Box>
      <PageHeader
        title="Activity"
        subtitle="Flagged activities and pending requests"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Activity" }]}
      />

      <Box sx={{ mb: 3 }}>
        <SectionCard
          title="Flagged Fueling Activities"
          subtitle="Anomalies detected by the system"
          action={
            <Chip label={`${flaggedActivities.length} flags`} size="small" sx={{ backgroundColor: "rgba(239,68,68,0.15)", color: "#f87171", fontWeight: 600 }} />
          }
          noPadding
        >
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
                    <TableCell>
                      <Chip label={flag.severity} size="small" sx={{ backgroundColor: sc.bg, color: sc.color, fontWeight: 600, textTransform: "capitalize" }} />
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>{formatDateTime(flag.time)}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<VisibilityIcon sx={{ fontSize: "14px !important" }} />}
                        sx={{ fontSize: "0.7rem" }}
                        onClick={() => setSelectedFlag(flag)}
                      >
                        Preview
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </SectionCard>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2.5, "@media (max-width: 900px)": { gridTemplateColumns: "1fr" } }}>
        <SectionCard
          title="New Customer Registration Requests"
          subtitle={`${registrationRequests.length} pending`}
          action={<PersonAddIcon sx={{ color: "#9ca3af" }} />}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {registrationRequests.length === 0 ? (
              <Typography sx={{ fontSize: "0.8rem", color: "#64748b", textAlign: "center", py: 2 }}>No pending requests</Typography>
            ) : (
              registrationRequests.map((req) => (
                <Box
                  key={req.id}
                  sx={{
                    p: 2,
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.07)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    ...cardHoverBorderSx,
                  }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: "0.875rem" }}>{req.name}</Typography>
                    <Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>{req.email}</Typography>
                    <Typography sx={{ fontSize: "0.7rem", color: "#9ca3af", mt: 0.5 }}>{formatDateTime(req.submittedAt)}</Typography>
                  </Box>
                  <Tooltip title="View details">
                    <IconButton size="small" onClick={() => setSelectedRegistration(req)} sx={{ color: "#60a5fa" }}>
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              ))
            )}
          </Box>
        </SectionCard>

        <SectionCard
          title="Location & Photo Change Requests"
          subtitle={`${changeRequests.length} pending`}
          action={<EditLocationIcon sx={{ color: "#9ca3af" }} />}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {changeRequests.length === 0 ? (
              <Typography sx={{ fontSize: "0.8rem", color: "#64748b", textAlign: "center", py: 2 }}>No pending requests</Typography>
            ) : (
              changeRequests.map((req) => (
                <Box
                  key={req.id}
                  sx={{
                    p: 2,
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.07)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    ...cardHoverBorderSx,
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5, gap: 1 }}>
                      <Typography sx={{ fontWeight: 600, fontSize: "0.875rem" }}>{req.customer}</Typography>
                      <Chip label={req.type} size="small" sx={{ fontSize: "0.65rem", backgroundColor: "rgba(59,130,246,0.15)", color: "#60a5fa", flexShrink: 0 }} />
                    </Box>
                    <Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>Current: {req.current}</Typography>
                    <Typography sx={{ fontSize: "0.75rem", color: "#f1f5f9" }}>Requested: {req.requested}</Typography>
                  </Box>
                  <Tooltip title="Preview details">
                    <IconButton size="small" onClick={() => setSelectedChange(req)} sx={{ color: "#60a5fa", ml: 1 }}>
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              ))
            )}
          </Box>
        </SectionCard>
      </Box>

      <FlaggedActivityModal
        open={!!selectedFlag}
        activity={selectedFlag}
        onClose={() => setSelectedFlag(null)}
      />
      <CustomerRegistrationModal
        open={!!selectedRegistration}
        request={selectedRegistration}
        onClose={() => setSelectedRegistration(null)}
        onApprove={handleApproveRegistration}
        onReject={handleRejectRegistration}
      />
      <ChangeRequestModal
        open={!!selectedChange}
        request={selectedChange}
        onClose={() => setSelectedChange(null)}
        onApprove={handleApproveChange}
        onReject={handleRejectChange}
      />
    </Box>
  );
}
