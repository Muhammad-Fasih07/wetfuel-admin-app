"use client";

import { useState } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Modal from "@/components/ui/Modal";
import { FUEL_TYPES } from "@/lib/utils/constants";
import type { FuelType } from "@/types/job";
import { mockCustomers } from "@/app/(dashboard)/customers/_data";

export interface NewTicketData {
  customerId: string;
  customerName: string;
  equipmentId: string;
  equipmentName: string;
  fuelType: FuelType;
  requestedGallons: number;
  scheduledDate: string;
  scheduledTime: string;
  notes: string;
  isRecurring: boolean;
}

interface NewTicketModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: NewTicketData) => void;
}

const emptyForm: NewTicketData = {
  customerId: "",
  customerName: "",
  equipmentId: "",
  equipmentName: "",
  fuelType: "Regular",
  requestedGallons: 0,
  scheduledDate: new Date().toISOString().slice(0, 10),
  scheduledTime: "08:00",
  notes: "",
  isRecurring: false,
};

export default function NewTicketModal({ open, onClose, onSubmit }: NewTicketModalProps) {
  const [form, setForm] = useState<NewTicketData>(emptyForm);

  const selectedCustomer = mockCustomers.find((c) => c.id === form.customerId);
  const equipmentOptions = selectedCustomer?.equipment ?? [];

  const handleClose = () => {
    setForm(emptyForm);
    onClose();
  };

  const handleSubmit = () => {
    if (!form.customerId || !form.equipmentId || form.requestedGallons <= 0) return;
    onSubmit(form);
    setForm(emptyForm);
  };

  const set = <K extends keyof NewTicketData>(key: K, value: NewTicketData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleCustomerChange = (customerId: string) => {
    const customer = mockCustomers.find((c) => c.id === customerId);
    setForm((prev) => ({
      ...prev,
      customerId,
      customerName: customer?.name ?? "",
      equipmentId: "",
      equipmentName: "",
    }));
  };

  const handleEquipmentChange = (equipmentId: string) => {
    const equipment = equipmentOptions.find((e) => e.id === equipmentId);
    setForm((prev) => ({
      ...prev,
      equipmentId,
      equipmentName: equipment?.name ?? "",
      fuelType: (equipment?.fuelType as FuelType) ?? prev.fuelType,
    }));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="New Ticket"
      maxWidth="md"
      actions={
        <>
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Create Ticket</Button>
        </>
      }
    >
      <Typography
        variant="subtitle2"
        sx={{ mb: 2, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.7rem" }}
      >
        Ticket Details
      </Typography>
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Customer"
            select
            fullWidth
            value={form.customerId}
            onChange={(e) => handleCustomerChange(e.target.value)}
          >
            {mockCustomers.filter((c) => c.status === "Active").map((c) => (
              <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Equipment"
            select
            fullWidth
            value={form.equipmentId}
            onChange={(e) => handleEquipmentChange(e.target.value)}
            disabled={!form.customerId}
          >
            {equipmentOptions.map((e) => (
              <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Fuel Type"
            select
            fullWidth
            value={form.fuelType}
            onChange={(e) => set("fuelType", e.target.value as FuelType)}
          >
            {FUEL_TYPES.map((t) => (
              <MenuItem key={t} value={t}>{t}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Requested Gallons"
            type="number"
            fullWidth
            inputProps={{ min: 1, step: 1 }}
            value={form.requestedGallons || ""}
            onChange={(e) => set("requestedGallons", Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={form.isRecurring}
                onChange={(e) => set("isRecurring", e.target.checked)}
              />
            }
            label="Recurring"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Scheduled Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={form.scheduledDate}
            onChange={(e) => set("scheduledDate", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Scheduled Time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={form.scheduledTime}
            onChange={(e) => set("scheduledTime", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Notes"
            fullWidth
            multiline
            rows={2}
            placeholder="Gate code, access instructions, etc."
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
          />
        </Grid>
      </Grid>
    </Modal>
  );
}
