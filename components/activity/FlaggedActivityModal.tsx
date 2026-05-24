"use client";

import { Box, Grid, Typography, Button, Chip, Divider } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import Modal from "@/components/ui/Modal";
import type { FlaggedActivity } from "@/app/(dashboard)/activity/_data";
import { formatDateTime } from "@/lib/utils/formatters";

const SEVERITY_COLORS: Record<string, { bg: string; color: string }> = {
  high: { bg: "rgba(239,68,68,0.15)", color: "#f87171" },
  medium: { bg: "rgba(245,158,11,0.15)", color: "#fbbf24" },
  low: { bg: "rgba(59,130,246,0.15)", color: "#60a5fa" },
};

interface FlaggedActivityModalProps {
  open: boolean;
  activity: FlaggedActivity | null;
  onClose: () => void;
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.7rem" }}>{label}</Typography>
      <Typography sx={{ color: "#f1f5f9", fontWeight: 500, fontSize: "0.875rem" }}>{value}</Typography>
    </Box>
  );
}

export default function FlaggedActivityModal({ open, activity, onClose }: FlaggedActivityModalProps) {
  if (!activity) return null;

  const sc = SEVERITY_COLORS[activity.severity];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Flagged Activity Preview"
      maxWidth="md"
      actions={<Button variant="contained" onClick={onClose}>Close</Button>}
    >
      <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
        <Chip
          icon={<FlagIcon sx={{ fontSize: "14px !important" }} />}
          label={activity.type}
          size="small"
          sx={{ fontWeight: 600 }}
        />
        <Chip
          label={activity.severity}
          size="small"
          sx={{ backgroundColor: sc.bg, color: sc.color, fontWeight: 600, textTransform: "capitalize" }}
        />
      </Box>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}><Detail label="Customer" value={activity.customer} /></Grid>
        <Grid item xs={12} sm={6}><Detail label="Driver" value={activity.driver} /></Grid>
        <Grid item xs={12} sm={6}><Detail label="Truck" value={activity.truckPlate} /></Grid>
        <Grid item xs={12} sm={6}><Detail label="Ticket #" value={activity.ticketNumber} /></Grid>
        <Grid item xs={12} sm={4}><Detail label="Fuel Type" value={activity.fuelType} /></Grid>
        <Grid item xs={12} sm={4}><Detail label="Requested" value={`${activity.requestedGallons} gal`} /></Grid>
        <Grid item xs={12} sm={4}>
          <Detail label="Delivered" value={activity.deliveredGallons ? `${activity.deliveredGallons} gal` : "—"} />
        </Grid>
        <Grid item xs={12}><Detail label="Location" value={activity.location} /></Grid>
        <Grid item xs={12} sm={6}><Detail label="Flagged At" value={formatDateTime(activity.time)} /></Grid>
        {activity.geofenceRadius && (
          <Grid item xs={12} sm={6}><Detail label="Geofence Radius" value={activity.geofenceRadius} /></Grid>
        )}
        {activity.stopDuration && (
          <Grid item xs={12} sm={6}><Detail label="Stop Duration" value={activity.stopDuration} /></Grid>
        )}
      </Grid>

      <Divider sx={{ mb: 2 }} />
      <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.7rem" }}>Anomaly Details</Typography>
      <Typography sx={{ color: "#f1f5f9", mt: 0.5, mb: activity.notes ? 2 : 0 }}>{activity.details}</Typography>
      {activity.notes && (
        <>
          <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.7rem" }}>Notes</Typography>
          <Typography sx={{ color: "#94a3b8", mt: 0.5, fontSize: "0.875rem" }}>{activity.notes}</Typography>
        </>
      )}
    </Modal>
  );
}
