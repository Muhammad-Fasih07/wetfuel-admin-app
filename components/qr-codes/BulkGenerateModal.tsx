"use client";

import { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import Modal from "@/components/ui/Modal";
import type { RegisteredQrCode } from "@/app/(dashboard)/qr-codes/_data";

export interface BulkGenerateData {
  quantity: number;
}

interface BulkGenerateModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: BulkGenerateData) => void;
}

export default function BulkGenerateModal({ open, onClose, onSubmit }: BulkGenerateModalProps) {
  const [quantity, setQuantity] = useState(10);

  const handleClose = () => {
    setQuantity(10);
    onClose();
  };

  const handleSubmit = () => {
    if (quantity < 1 || quantity > 500) return;
    onSubmit({ quantity });
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Bulk Generate QR Codes"
      maxWidth="sm"
      actions={
        <>
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Generate Codes</Button>
        </>
      }
    >
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <TextField
            label="Number of QR Codes"
            type="number"
            fullWidth
            inputProps={{ min: 1, max: 500, step: 1 }}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            helperText="Unassigned codes ready to print and install (1–500)"
          />
        </Grid>
      </Grid>
    </Modal>
  );
}

export function generateUnassignedQrCodes(quantity: number, existing: RegisteredQrCode[]): RegisteredQrCode[] {
  const maxNum = existing.reduce((max, c) => {
    const n = parseInt(c.code.replace("QR-", ""), 10);
    return Number.isFinite(n) && n > max ? n : max;
  }, 0);

  const now = new Date().toISOString();

  return Array.from({ length: quantity }, (_, i) => ({
    code: `QR-${String(maxNum + 1 + i).padStart(4, "0")}`,
    assignmentStatus: "unassigned" as const,
    generatedAt: now,
  }));
}
