"use client";

import { useState } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import Modal from "@/components/ui/Modal";
import { FUEL_TYPES } from "@/lib/utils/constants";
import type { FuelType, MainTank } from "@/types/inventory";

export interface RecordPurchaseData {
  fuelType: FuelType;
  tankId: string;
  gallons: number;
  supplier: string;
  invoiceNumber: string;
  purchaseDate: string;
  costPerGallon: number;
  deliveryMethod: string;
  notes: string;
}

interface RecordPurchaseModalProps {
  open: boolean;
  onClose: () => void;
  tanks: MainTank[];
  onSubmit: (data: RecordPurchaseData) => void;
}

const DELIVERY_METHODS = ["Tanker Delivery", "Rail", "Pipeline", "Other"];

const emptyForm: RecordPurchaseData = {
  fuelType: "Regular",
  tankId: "",
  gallons: 0,
  supplier: "",
  invoiceNumber: "",
  purchaseDate: new Date().toISOString().slice(0, 10),
  costPerGallon: 0,
  deliveryMethod: "Tanker Delivery",
  notes: "",
};

export default function RecordPurchaseModal({
  open,
  onClose,
  tanks,
  onSubmit,
}: RecordPurchaseModalProps) {
  const [form, setForm] = useState<RecordPurchaseData>(emptyForm);

  const matchingTanks = tanks.filter((t) => t.fuelType === form.fuelType);
  const totalCost = form.gallons * form.costPerGallon;

  const handleClose = () => {
    setForm(emptyForm);
    onClose();
  };

  const handleSubmit = () => {
    if (!form.tankId || form.gallons <= 0 || !form.supplier.trim()) return;
    onSubmit(form);
    setForm(emptyForm);
  };

  const set = <K extends keyof RecordPurchaseData>(key: K, value: RecordPurchaseData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Record Purchase"
      maxWidth="md"
      actions={
        <>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Record Purchase
          </Button>
        </>
      }
    >
      <Typography
        variant="subtitle2"
        sx={{ mb: 2, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.7rem" }}
      >
        Purchase Details
      </Typography>
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Fuel Type"
            select
            fullWidth
            value={form.fuelType}
            onChange={(e) => {
              set("fuelType", e.target.value as FuelType);
              set("tankId", "");
            }}
          >
            {FUEL_TYPES.map((t) => (
              <MenuItem key={t} value={t}>{t}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Destination Tank"
            select
            fullWidth
            value={form.tankId}
            onChange={(e) => set("tankId", e.target.value)}
            helperText={matchingTanks.length === 0 ? "No tanks for this fuel type" : undefined}
          >
            {matchingTanks.map((t) => (
              <MenuItem key={t.id} value={t.id}>
                {t.fuelType} — {t.currentLevel.toLocaleString()} / {t.capacity.toLocaleString()} gal
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Gallons Purchased"
            type="number"
            fullWidth
            inputProps={{ min: 0, step: 1 }}
            value={form.gallons || ""}
            onChange={(e) => set("gallons", Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Purchase Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={form.purchaseDate}
            onChange={(e) => set("purchaseDate", e.target.value)}
          />
        </Grid>
      </Grid>

      <Divider sx={{ mb: 3 }} />
      <Typography
        variant="subtitle2"
        sx={{ mb: 2, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.7rem" }}
      >
        Vendor & Cost
      </Typography>
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Supplier / Vendor"
            fullWidth
            value={form.supplier}
            onChange={(e) => set("supplier", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Invoice / Reference #"
            fullWidth
            value={form.invoiceNumber}
            onChange={(e) => set("invoiceNumber", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Cost per Gallon ($)"
            type="number"
            fullWidth
            inputProps={{ min: 0, step: 0.01 }}
            value={form.costPerGallon || ""}
            onChange={(e) => set("costPerGallon", Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Delivery Method"
            select
            fullWidth
            value={form.deliveryMethod}
            onChange={(e) => set("deliveryMethod", e.target.value)}
          >
            {DELIVERY_METHODS.map((m) => (
              <MenuItem key={m} value={m}>{m}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Total Cost ($)"
            fullWidth
            value={totalCost > 0 ? totalCost.toFixed(2) : ""}
            InputProps={{ readOnly: true }}
            helperText="Auto-calculated"
          />
        </Grid>
      </Grid>

      <TextField
        label="Notes"
        fullWidth
        multiline
        rows={3}
        placeholder="Delivery details, BOL number, etc."
        value={form.notes}
        onChange={(e) => set("notes", e.target.value)}
      />
    </Modal>
  );
}
