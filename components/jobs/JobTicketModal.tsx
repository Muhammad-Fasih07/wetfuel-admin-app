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
import { formatDate, formatCurrency } from "@/lib/utils/formatters";
import { mockDrivers } from "@/app/(dashboard)/drivers/_data";

export interface JobTicketUpdateData {
  status: JobStatus;
  assignedDriverId?: string;
  assignedTruckId?: string;
  deliveredGallons?: number;
  deliveryFee?: number;
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

const STATUS_OPTIONS: Record<JobStatus, { value: JobStatus; label: string }[]> = {
  New: [
    { value: "New", label: "New — keep in queue" },
    { value: "Ready", label: "Ready — mark ready for dispatch" },
  ],
  Ready: [
    { value: "Ready", label: "Ready — keep waiting for assignment" },
    { value: "Assigned", label: "Assigned — assign driver" },
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

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.7rem" }}>{label}</Typography>
      <Typography sx={{ color: "#f1f5f9", fontWeight: 500, fontSize: "0.875rem" }}>{value}</Typography>
    </Box>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="subtitle2"
      sx={{ mb: 2, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.7rem" }}
    >
      {children}
    </Typography>
  );
}

export default function JobTicketModal({ open, ticket, onClose, onSubmit }: JobTicketModalProps) {
  const [status, setStatus] = useState<JobStatus>("New");
  const [driverId, setDriverId] = useState("");
  const [deliveredGallons, setDeliveredGallons] = useState<number | "">("");
  const [deliveryFee, setDeliveryFee] = useState<number | "">("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (ticket) {
      setStatus(ticket.status);
      setDriverId(ticket.assignedDriverId ?? "");
      setDeliveredGallons(ticket.deliveredGallons ?? "");
      setDeliveryFee(ticket.deliveryFee ?? "");
      setNotes(ticket.notes ?? "");
    }
  }, [ticket]);

  if (!ticket) return null;

  const currentStatus = ticket.status;
  const availableStatuses = STATUS_OPTIONS[currentStatus];
  const isFinalized = currentStatus === "Finalized";

  const handleStatusChange = (next: JobStatus) => {
    setStatus(next);
    if (next === "Ready") setDriverId("");
  };

  const handleSubmit = () => {
    const data: JobTicketUpdateData = { status, notes: notes || undefined };

    if (currentStatus === "Ready" && status === "Assigned") {
      data.assignedDriverId = driverId || undefined;
    }

    if (currentStatus === "Assigned" && status === "Completed") {
      data.deliveredGallons = Number(deliveredGallons) || undefined;
    }

    if (currentStatus === "Completed" && status === "Finalized") {
      data.deliveryFee = Number(deliveryFee) || undefined;
    }

    onSubmit(ticket.id, data);
  };

  const submitLabel =
    status !== currentStatus
      ? `Move to ${status}`
      : isFinalized
        ? "Close"
        : "Save";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Ticket ${ticket.ticketNumber}`}
      maxWidth="md"
      actions={
        <>
          <Button variant="outlined" onClick={onClose}>Cancel</Button>
          {!isFinalized && (
            <Button variant="contained" onClick={handleSubmit}>{submitLabel}</Button>
          )}
        </>
      }
    >
      <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
        <Chip
          label={`${ticket.fuelType} — ${ticket.requestedGallons} gal`}
          size="small"
          sx={{ backgroundColor: `${FUEL_COLORS[ticket.fuelType]}15`, color: FUEL_COLORS[ticket.fuelType], fontWeight: 600 }}
        />
        <Chip label={currentStatus} size="small" sx={{ fontWeight: 600 }} />
        {ticket.isRecurring && (
          <Chip label="Recurring" size="small" sx={{ backgroundColor: "rgba(139,92,246,0.2)", color: "#a78bfa" }} />
        )}
      </Box>

      {/* ── New / Ready: basic ticket info ── */}
      {(currentStatus === "New" || currentStatus === "Ready") && (
        <>
          <SectionTitle>Ticket Details</SectionTitle>
          <Grid container spacing={2.5} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}><Detail label="Customer" value={ticket.customerName} /></Grid>
            <Grid item xs={12} sm={6}><Detail label="Equipment" value={ticket.equipmentName} /></Grid>
            <Grid item xs={12} sm={6}>
              <Detail
                label="Scheduled"
                value={`${formatDate(ticket.scheduledDate)}${ticket.scheduledTime ? ` at ${ticket.scheduledTime}` : ""}`}
              />
            </Grid>
            {ticket.dailyFuelPrice && (
              <Grid item xs={12} sm={6}>
                <Detail label="Fuel Price" value={`$${ticket.dailyFuelPrice.toFixed(3)}/gal`} />
              </Grid>
            )}
          </Grid>
        </>
      )}

      {/* ── Assigned: dispatch report (read-only) ── */}
      {currentStatus === "Assigned" && (
        <>
          <SectionTitle>Dispatch Report</SectionTitle>
          <Grid container spacing={2.5} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}><Detail label="Customer" value={ticket.customerName} /></Grid>
            <Grid item xs={12} sm={6}><Detail label="Equipment" value={ticket.equipmentName} /></Grid>
            <Grid item xs={12} sm={6}><Detail label="Driver" value={ticket.assignedDriverName ?? "—"} /></Grid>
            <Grid item xs={12} sm={6}>
              <Detail label="Truck" value={ticket.assignedTruckPlate ?? "Pending truck assignment"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Detail
                label="Scheduled"
                value={`${formatDate(ticket.scheduledDate)}${ticket.scheduledTime ? ` at ${ticket.scheduledTime}` : ""}`}
              />
            </Grid>
            {ticket.dailyFuelPrice && (
              <Grid item xs={12} sm={6}>
                <Detail label="Fuel Price" value={`$${ticket.dailyFuelPrice.toFixed(3)}/gal`} />
              </Grid>
            )}
          </Grid>
        </>
      )}

      {/* ── Completed / Finalized: delivery report ── */}
      {(currentStatus === "Completed" || currentStatus === "Finalized") && (
        <>
          <SectionTitle>Delivery Report</SectionTitle>
          <Grid container spacing={2.5} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}><Detail label="Customer" value={ticket.customerName} /></Grid>
            <Grid item xs={12} sm={6}><Detail label="Driver" value={ticket.assignedDriverName ?? "—"} /></Grid>
            <Grid item xs={12} sm={6}>
              <Detail label="Delivered" value={`${ticket.deliveredGallons ?? "—"} gal`} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Detail label="Requested" value={`${ticket.requestedGallons} gal`} />
            </Grid>
            {ticket.dailyFuelPrice && (
              <Grid item xs={12} sm={6}>
                <Detail label="Fuel Price" value={`$${ticket.dailyFuelPrice.toFixed(3)}/gal`} />
              </Grid>
            )}
            {ticket.deliveryFee !== undefined && (
              <Grid item xs={12} sm={6}>
                <Detail label="Delivery Fee" value={formatCurrency(ticket.deliveryFee)} />
              </Grid>
            )}
            {ticket.totalAmount !== undefined && (
              <Grid item xs={12} sm={6}>
                <Detail label="Total Amount" value={formatCurrency(ticket.totalAmount)} />
              </Grid>
            )}
            {ticket.meterTicketStart !== undefined && (
              <Grid item xs={12} sm={6}>
                <Detail label="Meter Ticket" value={`${ticket.meterTicketStart} → ${ticket.meterTicketEnd}`} />
              </Grid>
            )}
          </Grid>
        </>
      )}

      {!isFinalized && (
        <>
          <Divider sx={{ mb: 3 }} />
          <SectionTitle>Update Status</SectionTitle>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Move To"
                select
                fullWidth
                value={status}
                onChange={(e) => handleStatusChange(e.target.value as JobStatus)}
                helperText={`Available actions from ${currentStatus}`}
              >
                {availableStatuses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Ready → Assigned: driver only */}
            {currentStatus === "Ready" && status === "Assigned" && (
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
            )}

            {/* Assigned → Completed: delivered gallons */}
            {currentStatus === "Assigned" && status === "Completed" && (
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

            {/* Completed → Finalized: delivery fee */}
            {currentStatus === "Completed" && status === "Finalized" && (
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Delivery Fee ($)"
                  type="number"
                  fullWidth
                  inputProps={{ min: 0, step: 0.01 }}
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(e.target.value ? Number(e.target.value) : "")}
                  helperText="Fee applied before closing ticket"
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
        </>
      )}
    </Modal>
  );
}
