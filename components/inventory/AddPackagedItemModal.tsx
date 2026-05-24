"use client";

import { useState } from "react";
import { Grid, TextField, MenuItem, Button, Typography } from "@mui/material";
import Modal from "@/components/ui/Modal";

export interface AddPackagedItemData {
  name: string;
  unit: string;
  quantity: number;
  minStockAlert: number;
  notes: string;
}

interface AddPackagedItemModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AddPackagedItemData) => void;
}

const UNITS = ["jugs", "bottles", "bags", "pcs", "boxes", "cases", "gallons", "units"];

const emptyForm: AddPackagedItemData = {
  name: "",
  unit: "pcs",
  quantity: 0,
  minStockAlert: 0,
  notes: "",
};

export default function AddPackagedItemModal({ open, onClose, onSubmit }: AddPackagedItemModalProps) {
  const [form, setForm] = useState<AddPackagedItemData>(emptyForm);

  const handleClose = () => {
    setForm(emptyForm);
    onClose();
  };

  const handleSubmit = () => {
    if (!form.name.trim() || form.quantity < 0) return;
    onSubmit(form);
    setForm(emptyForm);
  };

  const set = <K extends keyof AddPackagedItemData>(key: K, value: AddPackagedItemData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Add Item"
      maxWidth="sm"
      actions={
        <>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Add Item
          </Button>
        </>
      }
    >
      <Typography
        variant="subtitle2"
        sx={{ mb: 2, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.7rem" }}
      >
        Item Details
      </Typography>
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <TextField
            label="Item Name"
            fullWidth
            placeholder="e.g. DEF Jugs (2.5 gal)"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Unit"
            select
            fullWidth
            value={form.unit}
            onChange={(e) => set("unit", e.target.value)}
          >
            {UNITS.map((u) => (
              <MenuItem key={u} value={u}>{u}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Quantity"
            type="number"
            fullWidth
            inputProps={{ min: 0, step: 1 }}
            value={form.quantity || ""}
            onChange={(e) => set("quantity", Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Min Stock Alert"
            type="number"
            fullWidth
            inputProps={{ min: 0, step: 1 }}
            value={form.minStockAlert || ""}
            onChange={(e) => set("minStockAlert", Number(e.target.value))}
            helperText="Alert when quantity falls below this"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Notes"
            fullWidth
            multiline
            rows={2}
            placeholder="Supplier, storage location, etc."
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
          />
        </Grid>
      </Grid>
    </Modal>
  );
}
