"use client";

import { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  Tabs,
  Tab,
  Alert,
} from "@mui/material";
import Modal from "@/components/ui/Modal";
import { FUEL_TYPES } from "@/lib/utils/constants";
import type { FuelType, MainTank } from "@/types/inventory";

export interface ManualAdjustmentData {
  tankId: string;
  adjustmentType: "add" | "remove" | "set";
  gallons: number;
  reason: string;
  notes: string;
}

export interface SpillAdjustmentData {
  sourceType: "main-tank" | "truck";
  sourceId: string;
  fuelType: FuelType;
  gallons: number;
  spillDate: string;
  location: string;
  cause: string;
  reportedBy: string;
  cleanupStatus: string;
  notes: string;
}

interface AdjustInventoryModalProps {
  open: boolean;
  onClose: () => void;
  tanks: MainTank[];
  truckPlates: string[];
  onManualAdjust: (data: ManualAdjustmentData) => void;
  onSpillAdjust: (data: SpillAdjustmentData) => void;
}

const ADJUSTMENT_REASONS = [
  "Physical count correction",
  "Meter calibration",
  "Temperature variance",
  "Evaporation loss",
  "Other",
];

const SPILL_CAUSES = [
  "Overfill during delivery",
  "Hose disconnect",
  "Tank leak",
  "Transfer error",
  "Equipment failure",
  "Other",
];

const CLEANUP_STATUSES = ["Pending", "In Progress", "Completed", "Not Required"];

export default function AdjustInventoryModal({
  open,
  onClose,
  tanks,
  truckPlates,
  onManualAdjust,
  onSpillAdjust,
}: AdjustInventoryModalProps) {
  const [tab, setTab] = useState(0);

  const [manual, setManual] = useState<ManualAdjustmentData>({
    tankId: tanks[0]?.id ?? "",
    adjustmentType: "add",
    gallons: 0,
    reason: ADJUSTMENT_REASONS[0],
    notes: "",
  });

  const [spill, setSpill] = useState<SpillAdjustmentData>({
    sourceType: "main-tank",
    sourceId: tanks[0]?.id ?? "",
    fuelType: tanks[0]?.fuelType ?? "Regular",
    gallons: 0,
    spillDate: new Date().toISOString().slice(0, 10),
    location: "",
    cause: SPILL_CAUSES[0],
    reportedBy: "",
    cleanupStatus: "Pending",
    notes: "",
  });

  const selectedTank = tanks.find((t) => t.id === manual.tankId);

  const handleClose = () => {
    setTab(0);
    onClose();
  };

  const handleManualSubmit = () => {
    if (!manual.tankId || manual.gallons <= 0) return;
    onManualAdjust(manual);
  };

  const handleSpillSubmit = () => {
    if (!spill.sourceId || spill.gallons <= 0 || !spill.reportedBy.trim()) return;
    onSpillAdjust(spill);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Adjust Inventory"
      maxWidth="md"
      actions={
        tab === 0 ? (
          <>
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleManualSubmit}>Apply Adjustment</Button>
          </>
        ) : (
          <>
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSpillSubmit}
              sx={{
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                "&:hover": { background: "linear-gradient(135deg, #dc2626, #b91c1c)" },
              }}
            >
              Record Spill
            </Button>
          </>
        )
      }
    >
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{ mb: 3, borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <Tab label="Manual Adjustment" sx={{ textTransform: "none", fontWeight: 600 }} />
        <Tab label="Spill Adjustment" sx={{ textTransform: "none", fontWeight: 600 }} />
      </Tabs>

      {tab === 0 && (
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ mb: 2, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.7rem" }}
          >
            Tank Level Correction
          </Typography>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Select Tank"
                select
                fullWidth
                value={manual.tankId}
                onChange={(e) => setManual((p) => ({ ...p, tankId: e.target.value }))}
              >
                {tanks.map((t) => (
                  <MenuItem key={t.id} value={t.id}>
                    {t.fuelType} — {t.currentLevel.toLocaleString()} / {t.capacity.toLocaleString()} gal
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Adjustment Type"
                select
                fullWidth
                value={manual.adjustmentType}
                onChange={(e) =>
                  setManual((p) => ({ ...p, adjustmentType: e.target.value as ManualAdjustmentData["adjustmentType"] }))
                }
              >
                <MenuItem value="add">Add gallons</MenuItem>
                <MenuItem value="remove">Remove gallons</MenuItem>
                <MenuItem value="set">Set to exact level</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={manual.adjustmentType === "set" ? "New Level (gallons)" : "Gallons"}
                type="number"
                fullWidth
                inputProps={{ min: 0, step: 1 }}
                value={manual.gallons || ""}
                onChange={(e) => setManual((p) => ({ ...p, gallons: Number(e.target.value) }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Reason"
                select
                fullWidth
                value={manual.reason}
                onChange={(e) => setManual((p) => ({ ...p, reason: e.target.value }))}
              >
                {ADJUSTMENT_REASONS.map((r) => (
                  <MenuItem key={r} value={r}>{r}</MenuItem>
                ))}
              </TextField>
            </Grid>
            {selectedTank && (
              <Grid item xs={12}>
                <Alert severity="info" sx={{ borderRadius: "10px" }}>
                  Current level: <strong>{selectedTank.currentLevel.toLocaleString()} gal</strong>
                  {manual.adjustmentType === "add" && manual.gallons > 0 && (
                    <> → New level: <strong>{(selectedTank.currentLevel + manual.gallons).toLocaleString()} gal</strong></>
                  )}
                  {manual.adjustmentType === "remove" && manual.gallons > 0 && (
                    <> → New level: <strong>{Math.max(0, selectedTank.currentLevel - manual.gallons).toLocaleString()} gal</strong></>
                  )}
                  {manual.adjustmentType === "set" && manual.gallons >= 0 && (
                    <> → New level: <strong>{manual.gallons.toLocaleString()} gal</strong></>
                  )}
                </Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                label="Notes"
                fullWidth
                multiline
                rows={2}
                value={manual.notes}
                onChange={(e) => setManual((p) => ({ ...p, notes: e.target.value }))}
              />
            </Grid>
          </Grid>
        </Box>
      )}

      {tab === 1 && (
        <Box>
          <Alert severity="warning" sx={{ mb: 2.5, borderRadius: "10px" }}>
            Spill adjustments deduct fuel from inventory and create an audit log entry.
          </Alert>
          <Typography
            variant="subtitle2"
            sx={{ mb: 2, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.7rem" }}
          >
            Spill Details
          </Typography>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Source Type"
                select
                fullWidth
                value={spill.sourceType}
                onChange={(e) => {
                  const sourceType = e.target.value as SpillAdjustmentData["sourceType"];
                  setSpill((p) => ({
                    ...p,
                    sourceType,
                    sourceId: sourceType === "main-tank" ? (tanks[0]?.id ?? "") : (truckPlates[0] ?? ""),
                  }));
                }}
              >
                <MenuItem value="main-tank">Main Storage Tank</MenuItem>
                <MenuItem value="truck">Truck Tank</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={spill.sourceType === "main-tank" ? "Tank" : "Truck"}
                select
                fullWidth
                value={spill.sourceId}
                onChange={(e) => {
                  const sourceId = e.target.value;
                  const tank = tanks.find((t) => t.id === sourceId);
                  setSpill((p) => ({
                    ...p,
                    sourceId,
                    fuelType: tank?.fuelType ?? p.fuelType,
                  }));
                }}
              >
                {spill.sourceType === "main-tank"
                  ? tanks.map((t) => (
                      <MenuItem key={t.id} value={t.id}>{t.fuelType} Tank</MenuItem>
                    ))
                  : truckPlates.map((plate) => (
                      <MenuItem key={plate} value={plate}>{plate}</MenuItem>
                    ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Fuel Type"
                select
                fullWidth
                value={spill.fuelType}
                onChange={(e) => setSpill((p) => ({ ...p, fuelType: e.target.value as FuelType }))}
              >
                {FUEL_TYPES.map((t) => (
                  <MenuItem key={t} value={t}>{t}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Spill Amount (gallons)"
                type="number"
                fullWidth
                inputProps={{ min: 0, step: 0.1 }}
                value={spill.gallons || ""}
                onChange={(e) => setSpill((p) => ({ ...p, gallons: Number(e.target.value) }))}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Spill Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={spill.spillDate}
                onChange={(e) => setSpill((p) => ({ ...p, spillDate: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Location"
                fullWidth
                placeholder="Depot bay, loading area, etc."
                value={spill.location}
                onChange={(e) => setSpill((p) => ({ ...p, location: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Cause"
                select
                fullWidth
                value={spill.cause}
                onChange={(e) => setSpill((p) => ({ ...p, cause: e.target.value }))}
              >
                {SPILL_CAUSES.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Reported By"
                fullWidth
                value={spill.reportedBy}
                onChange={(e) => setSpill((p) => ({ ...p, reportedBy: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Cleanup Status"
                select
                fullWidth
                value={spill.cleanupStatus}
                onChange={(e) => setSpill((p) => ({ ...p, cleanupStatus: e.target.value }))}
              >
                {CLEANUP_STATUSES.map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                fullWidth
                multiline
                rows={2}
                placeholder="Cleanup actions taken, environmental report filed, etc."
                value={spill.notes}
                onChange={(e) => setSpill((p) => ({ ...p, notes: e.target.value }))}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </Modal>
  );
}
