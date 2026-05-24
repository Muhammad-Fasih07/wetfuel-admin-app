"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import Modal from "@/components/ui/Modal";
import type { JobTicket, JobStatus } from "@/types/job";
import { formatDate } from "@/lib/utils/formatters";
import { mockDrivers } from "@/app/(dashboard)/drivers/_data";
import { mockTrucks } from "@/app/(dashboard)/trucks/_data";

export interface JobTicketUpdateData {
  status: JobStatus;
  assignedDriverId?: string;
  assignedTruckId?: string;
  deliveredGallons?: number;
  notes?: string;
}

interface JobTicketModalProps {
  open: boolean;
  ticket: JobTicket | null;
  onClose: () => void;
  onSubmit: (ticketId: string, data: JobTicketUpdateData) => void;
}

const FUEL_COLORS: Record<string, string> = {
  Regular: "#3b82f6",
  Premium: "#8b5cf6",
  Diesel: "#f59e0b",
  DEF: "#22c55e",
};

/** Only the current step and valid next moves — not the full pipeline. */
const STATUS_OPTIONS: Record<JobStatus, { value: JobStatus; label: string }[]> = {
  New: [
    { value: "New", label: "New — keep in queue" },
    { value: "Ready", label: "Ready — mark ready for dispatch" },
  ],
  Ready: [
    { value: "Ready", label: "Ready — keep waiting for assignment" },
    { value: "Assigned", label: "Assigned — assign driver & truck" },
  ],
  Assigned: [
    { value: "Assigned", label: "Assigned — keep current assignment" },
    { value: "Ready", label: "Unassigned — return to Ready" },
    { value: "Completed", label: "Completed — job finished" },
  ],
  Completed: [
    { value: "Completed", label: "Completed — keep in review" },
    { value: "Finalized", label: "Finalized — close ticket" },
  ],
  Finalized: [{ value: "Finalized", label: "Finalized — ticket closed" }],
};

export default function JobTicketModal({ open, ticket, onClose, onSubmit }: JobTicketModalProps) {
  const [status, setStatus] = useState<JobStatus>("New");
  const [driverId, setDriverId] = useState("");
  const [truckId, setTruckId] = useState("");
  const [deliveredGallons, setDeliveredGallons] = useState<number | "">("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (ticket) {
      setStatus(ticket.status);
      setDriverId(ticket.assignedDriverId ?? "");
      setTruckId(ticket.assignedTruckId ?? "");
      setDeliveredGallons(ticket.deliveredGallons ?? "");
      setNotes(ticket.notes ?? "");
    }
  }, [ticket]);

  const handleClose = () => onClose();

  const handleSubmit = () => {
    if (!ticket) return;
    onSubmit(ticket.id, {
      status,
      assignedDriverId: status === "Assigned" || status === "Completed" || status === "Finalized" ? driverId || undefined : undefined,
      assignedTruckId: status === "Assigned" || status === "Completed" || status === "Finalized" ? truckId || undefined : undefined,
      deliveredGallons: status === "Completed" || status === "Finalized" ? Number(deliveredGallons) || undefined : undefined,
      notes: notes || undefined,
    });
  };

  if (!ticket) return null;

  const availableStatuses = STATUS_OPTIONS[ticket.status];

  const handleStatusChange = (next: JobStatus) => {
    setStatus(next);
    if (next === "Ready") {
      setDriverId("");
      setTruckId("");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={`Ticket ${ticket.ticketNumber}`}
      maxWidth="md"
      actions={
        <>
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Update Status</Button>
        </>
      }
    >
      <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
        <Chip
          label={`${ticket.fuelType} — ${ticket.requestedGallons} gal`}
          size="small"
          sx={{
            backgroundColor: `${FUEL_COLORS[ticket.fuelType]}15`,
            color: FUEL_COLORS[ticket.fuelType],
            fontWeight: 600,
          }}
        />
        {ticket.isRecurring && (
          <Chip label="Recurring" size="small" sx={{ backgroundColor: "rgba(139,92,246,0.2)", color: "#a78bfa" }} />
        )}
      </Box>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.7rem" }}>Customer</Typography>
          <Typography sx={{ fontWeight: 600, color: "#f1f5f9" }}>{ticket.customerName}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.7rem" }}>Equipment</Typography>
          <Typography sx={{ fontWeight: 600, color: "#f1f5f9" }}>{ticket.equipmentName}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.7rem" }}>Scheduled</Typography>
          <Typography sx={{ color: "#f1f5f9" }}>
            {formatDate(ticket.scheduledDate)}
            {ticket.scheduledTime && ` at ${ticket.scheduledTime}`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.7rem" }}>Current Status</Typography>
          <Typography sx={{ color: "#f1f5f9", fontWeight: 600 }}>{ticket.status}</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ mb: 3 }} />

      <Typography
        variant="subtitle2"
        sx={{ mb: 2, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.7rem" }}
      >
        Update Status
      </Typography>
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Move To"
            select
            fullWidth
            value={status}
            onChange={(e) => handleStatusChange(e.target.value as JobStatus)}
            helperText={`Available actions from ${ticket.status}`}
          >
            {availableStatuses.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {(status === "Assigned" || status === "Completed" || status === "Finalized") && (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Assign Driver"
                select
                fullWidth
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
              >
                {mockDrivers.filter((d) => d.status === "Active").map((d) => (
                  <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Assign Truck"
                select
                fullWidth
                value={truckId}
                onChange={(e) => setTruckId(e.target.value)}
              >
                {mockTrucks.filter((t) => t.status === "Active").map((t) => (
                  <MenuItem key={t.id} value={t.id}>{t.plateNumber}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </>
        )}

        {(status === "Completed" || status === "Finalized") && (
          <Grid item xs={12} sm={6}>
            <TextField
              label="Delivered Gallons"
              type="number"
              fullWidth
              inputProps={{ min: 0, step: 1 }}
              value={deliveredGallons}
              onChange={(e) => setDeliveredGallons(e.target.value ? Number(e.target.value) : "")}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <TextField
            label="Notes"
            fullWidth
            multiline
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Grid>
      </Grid>
    </Modal>
  );
}
