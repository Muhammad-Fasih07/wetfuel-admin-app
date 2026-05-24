"use client";

import { useState } from "react";
import { Grid, TextField, MenuItem, Button, Typography } from "@mui/material";
import Modal from "@/components/ui/Modal";
import { FUEL_TYPES } from "@/lib/utils/constants";
import type { FuelType } from "@/types/inventory";

export interface AddTankData {
  name: string;
  fuelType: FuelType;
  capacity: number;
  currentLevel: number;
  location: string;
  notes: string;
}

interface AddTankModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AddTankData) => void;
}

const emptyForm: AddTankData = {
  name: "",
  fuelType: "Regular",
  capacity: 0,
  currentLevel: 0,
  location: "Main Depot",
  notes: "",
};

export default function AddTankModal({ open, onClose, onSubmit }: AddTankModalProps) {
  const [form, setForm] = useState<AddTankData>(emptyForm);

  const handleClose = () => {
    setForm(emptyForm);
    onClose();
  };

  const handleSubmit = () => {
    if (!form.name.trim() || form.capacity <= 0) return;
    onSubmit(form);
    setForm(emptyForm);
  };

  const set = <K extends keyof AddTankData>(key: K, value: AddTankData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Add Tank"
      maxWidth="sm"
      actions={
        <>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Add Tank
          </Button>
        </>
      }
    >
      <Typography
        variant="subtitle2"
        sx={{ mb: 2, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.7rem" }}
      >
        Tank Details
      </Typography>
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <TextField
            label="Tank Name"
            fullWidth
            placeholder="e.g. Regular Tank B"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
          <TextField
            label="Location"
            fullWidth
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Capacity (gallons)"
            type="number"
            fullWidth
            inputProps={{ min: 1, step: 100 }}
            value={form.capacity || ""}
            onChange={(e) => set("capacity", Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Initial Fill Level (gallons)"
            type="number"
            fullWidth
            inputProps={{ min: 0, step: 1 }}
            value={form.currentLevel || ""}
            onChange={(e) => set("currentLevel", Number(e.target.value))}
            helperText="Optional starting level"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Notes"
            fullWidth
            multiline
            rows={2}
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
          />
        </Grid>
      </Grid>
    </Modal>
  );
}
