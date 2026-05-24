"use client";

import { Box, Grid, Typography, LinearProgress, Button, Table, TableBody, TableCell, TableHead, TableRow, Chip } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import TuneIcon from "@mui/icons-material/Tune";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import RecordPurchaseModal, { type RecordPurchaseData } from "@/components/inventory/RecordPurchaseModal";
import AddTankModal, { type AddTankData } from "@/components/inventory/AddTankModal";
import AddPackagedItemModal, { type AddPackagedItemData } from "@/components/inventory/AddPackagedItemModal";
import AdjustInventoryModal, { type ManualAdjustmentData, type SpillAdjustmentData } from "@/components/inventory/AdjustInventoryModal";
import { mockMainTanks, mockTruckFuelLevels, mockPackagedGoods, mockTransferLogs } from "./_data";
import { formatDateTime } from "@/lib/utils/formatters";
import { useUIStore } from "@/store/uiStore";
import type { MainTank, TransferLog } from "@/types/inventory";

const FUEL_COLORS: Record<string, { bar: string; text: string; bg: string }> = {
  Regular: { bar: "#3b82f6", text: "#60a5fa", bg: "rgba(59,130,246,0.2)" },
  Premium: { bar: "#8b5cf6", text: "#a78bfa", bg: "rgba(139,92,246,0.2)" },
  Diesel: { bar: "#f59e0b", text: "#fbbf24", bg: "rgba(245,158,11,0.2)" },
  DEF: { bar: "#22c55e", text: "#4ade80", bg: "rgba(34,197,94,0.2)" },
};

function TankCard({ tank }: { tank: MainTank }) {
  const pct = Math.round((tank.currentLevel / tank.capacity) * 100);
  const c = FUEL_COLORS[tank.fuelType] || { bar: "#6b7280", text: "#94a3b8", bg: "rgba(255,255,255,0.08)" };
  const isLow = pct < 30;

  return (
    <Box sx={{ p: 2.5, borderRadius: "12px", border: "1px solid rgba(255,255,255,0.07)", background: "#252528" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
        <Box>
          <Chip label={tank.fuelType} size="small" sx={{ backgroundColor: c.bg, color: c.text, fontWeight: 700, mb: 0.75 }} />
          <Typography sx={{ fontSize: "0.7rem", color: "#9ca3af" }}>
            Last updated {formatDateTime(tank.lastUpdated)}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: 800, color: isLow ? "#ef4444" : c.text }}>
          {pct}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={pct}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: "rgba(255,255,255,0.08)",
          mb: 1,
          "& .MuiLinearProgress-bar": { backgroundColor: isLow ? "#ef4444" : c.bar, borderRadius: 5 },
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>
          {tank.currentLevel.toLocaleString()} gal
        </Typography>
        <Typography sx={{ fontSize: "0.8rem", color: "#9ca3af" }}>
          / {tank.capacity.toLocaleString()} gal
        </Typography>
      </Box>
      {isLow && (
        <Box sx={{ mt: 1.5, p: 1, borderRadius: "8px", backgroundColor: "rgba(239,68,68,0.15)", display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ fontSize: "0.7rem", color: "#ef4444", fontWeight: 600 }}>⚠ Low inventory — consider restocking</Typography>
        </Box>
      )}
    </Box>
  );
}

export default function InventoryPage() {
  const { addToast } = useUIStore();
  const [tanks, setTanks] = useState<MainTank[]>(mockMainTanks);
  const [transferLogs, setTransferLogs] = useState<TransferLog[]>(mockTransferLogs);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [addTankOpen, setAddTankOpen] = useState(false);
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [adjustOpen, setAdjustOpen] = useState(false);

  const truckPlates = Array.from(new Set(mockTruckFuelLevels.map((t) => t.truckPlate)));

  const handleRecordPurchase = (data: RecordPurchaseData) => {
    const tank = tanks.find((t) => t.id === data.tankId);
    if (!tank) return;

    setTanks((prev) =>
      prev.map((t) =>
        t.id === data.tankId
          ? {
              ...t,
              currentLevel: Math.min(t.capacity, t.currentLevel + data.gallons),
              lastUpdated: new Date().toISOString(),
            }
          : t
      )
    );

    setTransferLogs((prev) => [
      {
        id: `tl-${Date.now()}`,
        type: "third-party-purchase",
        toId: data.tankId,
        toName: `${tank.fuelType} Main Tank`,
        fuelType: data.fuelType,
        gallons: data.gallons,
        performedBy: "Admin",
        notes: `${data.supplier}${data.invoiceNumber ? ` — Inv #${data.invoiceNumber}` : ""}${data.notes ? `. ${data.notes}` : ""}`,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);

    setPurchaseOpen(false);
    addToast({ type: "success", message: `Purchase of ${data.gallons.toLocaleString()} gal ${data.fuelType} recorded.` });
  };

  const handleAddTank = (data: AddTankData) => {
    setAddTankOpen(false);
    addToast({ type: "success", message: `${data.name} added successfully!` });
  };

  const handleAddItem = (data: AddPackagedItemData) => {
    setAddItemOpen(false);
    addToast({ type: "success", message: `${data.name} added successfully!` });
  };

  const handleManualAdjust = (data: ManualAdjustmentData) => {
    setTanks((prev) =>
      prev.map((t) => {
        if (t.id !== data.tankId) return t;
        let newLevel = t.currentLevel;
        if (data.adjustmentType === "add") newLevel = t.currentLevel + data.gallons;
        else if (data.adjustmentType === "remove") newLevel = Math.max(0, t.currentLevel - data.gallons);
        else newLevel = data.gallons;
        return { ...t, currentLevel: Math.min(t.capacity, Math.max(0, newLevel)), lastUpdated: new Date().toISOString() };
      })
    );

    const tank = tanks.find((t) => t.id === data.tankId);
    setTransferLogs((prev) => [
      {
        id: `tl-${Date.now()}`,
        type: "adjustment",
        toId: data.tankId,
        toName: tank ? `${tank.fuelType} Main Tank` : undefined,
        fuelType: tank?.fuelType ?? "Regular",
        gallons: data.gallons,
        performedBy: "Admin",
        notes: `${data.reason}${data.notes ? `. ${data.notes}` : ""}`,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);

    setAdjustOpen(false);
    addToast({ type: "success", message: "Inventory adjustment applied successfully." });
  };

  const handleSpillAdjust = (data: SpillAdjustmentData) => {
    if (data.sourceType === "main-tank") {
      setTanks((prev) =>
        prev.map((t) =>
          t.id === data.sourceId
            ? {
                ...t,
                currentLevel: Math.max(0, t.currentLevel - data.gallons),
                lastUpdated: new Date().toISOString(),
              }
            : t
        )
      );
    }

    const sourceName =
      data.sourceType === "main-tank"
        ? tanks.find((t) => t.id === data.sourceId)?.fuelType + " Main Tank"
        : data.sourceId;

    setTransferLogs((prev) => [
      {
        id: `tl-${Date.now()}`,
        type: "spill",
        fromId: data.sourceId,
        fromName: sourceName,
        fuelType: data.fuelType,
        gallons: data.gallons,
        performedBy: data.reportedBy,
        notes: `${data.cause} at ${data.location || "depot"}. Cleanup: ${data.cleanupStatus}${data.notes ? `. ${data.notes}` : ""}`,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);

    setAdjustOpen(false);
    addToast({ type: "success", message: `Spill of ${data.gallons} gal recorded and inventory updated.` });
  };

  return (
    <Box>
      <PageHeader
        title="Inventory"
        subtitle="Fuel levels, transfers, and packaged goods"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Inventory" }]}
        action={
          <Button variant="contained" startIcon={<TuneIcon />} onClick={() => setAdjustOpen(true)}>
            Adjust Inventory
          </Button>
        }
      />

      {/* Main Tanks */}
      <Box sx={{ mb: 2.5 }}>
        <SectionCard
          title="Main Storage Tanks"
          subtitle="Live tank levels at depot"
          action={
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<AddIcon />}
                sx={{ fontSize: "0.75rem" }}
                onClick={() => setPurchaseOpen(true)}
              >
                Record Purchase
              </Button>
              <Button
                size="small"
                variant="outlined"
                startIcon={<AddIcon />}
                sx={{ fontSize: "0.75rem" }}
                onClick={() => setAddTankOpen(true)}
              >
                Add Tank
              </Button>
            </Box>
          }
        >
          <Grid container spacing={2}>
            {tanks.map((tank) => (
              <Grid item xs={12} sm={6} lg={3} key={tank.id}>
                <TankCard tank={tank} />
              </Grid>
            ))}
          </Grid>
        </SectionCard>
      </Box>

      {/* Truck Fuel Levels */}
      <Box sx={{ mb: 2.5 }}>
        <SectionCard title="Truck Fuel Levels" subtitle="Live readings from driver app" noPadding>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Truck</TableCell>
                <TableCell>Driver</TableCell>
                <TableCell>Fuel Type</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Last Updated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockTruckFuelLevels.map((t, i) => {
                const pct = Math.round((t.currentLevel / t.capacity) * 100);
                return (
                  <TableRow key={i} hover>
                    <TableCell><Typography sx={{ fontWeight: 600, fontSize: "0.875rem" }}>{t.truckPlate}</Typography></TableCell>
                    <TableCell>{t.driverName}</TableCell>
                    <TableCell>
                      <Chip label={t.fuelType} size="small" sx={{ backgroundColor: FUEL_COLORS[t.fuelType]?.bg, color: FUEL_COLORS[t.fuelType]?.text, fontWeight: 600 }} />
                    </TableCell>
                    <TableCell sx={{ minWidth: 180 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <LinearProgress variant="determinate" value={pct} sx={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.08)", "& .MuiLinearProgress-bar": { backgroundColor: pct < 20 ? "#ef4444" : pct < 40 ? "#f59e0b" : "#22c55e", borderRadius: 3 } }} />
                        <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, minWidth: 35 }}>{pct}%</Typography>
                      </Box>
                      <Typography sx={{ fontSize: "0.7rem", color: "#9ca3af" }}>{t.currentLevel.toLocaleString()} / {t.capacity.toLocaleString()} gal</Typography>
                    </TableCell>
                    <TableCell><Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>{formatDateTime(t.lastUpdated)}</Typography></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </SectionCard>
      </Box>

      <Grid container spacing={2.5}>
        {/* Packaged Goods */}
        <Grid item xs={12} md={5}>
          <SectionCard title="Packaged Goods" action={
            <Button size="small" startIcon={<AddIcon />} sx={{ fontSize: "0.75rem" }} onClick={() => setAddItemOpen(true)}>
              Add Item
            </Button>
          } noPadding>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Qty</TableCell>
                  <TableCell>Min Alert</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockPackagedGoods.map((g) => (
                  <TableRow key={g.id} hover>
                    <TableCell>
                      <Typography sx={{ fontSize: "0.8rem", fontWeight: 500 }}>{g.name}</Typography>
                    </TableCell>
                    <TableCell><Typography sx={{ fontSize: "0.8rem", fontWeight: 700 }}>{g.quantity} {g.unit}</Typography></TableCell>
                    <TableCell><Typography sx={{ fontSize: "0.75rem", color: "#9ca3af" }}>{g.minStockAlert}</Typography></TableCell>
                    <TableCell>
                      <Chip size="small" label={g.quantity <= g.minStockAlert ? "Low" : "OK"} sx={{ fontSize: "0.65rem", backgroundColor: g.quantity <= g.minStockAlert ? "rgba(239,68,68,0.15)" : "rgba(34,197,94,0.15)", color: g.quantity <= g.minStockAlert ? "#f87171" : "#4ade80" }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SectionCard>
        </Grid>

        {/* Transfer Log */}
        <Grid item xs={12} md={7}>
          <SectionCard title="Transfer Log" subtitle="Recent fuel movements" noPadding>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Fuel</TableCell>
                  <TableCell>Gallons</TableCell>
                  <TableCell>By</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transferLogs.map((log) => (
                  <TableRow key={log.id} hover>
                    <TableCell>
                      <Chip label={log.type.replace(/-/g, " ")} size="small" sx={{ fontSize: "0.65rem", textTransform: "capitalize" }} />
                    </TableCell>
                    <TableCell>
                      <Chip label={log.fuelType} size="small" sx={{ fontSize: "0.65rem", backgroundColor: FUEL_COLORS[log.fuelType]?.bg, color: FUEL_COLORS[log.fuelType]?.text }} />
                    </TableCell>
                    <TableCell><Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>{log.gallons.toLocaleString()}</Typography></TableCell>
                    <TableCell><Typography sx={{ fontSize: "0.75rem" }}>{log.performedBy}</Typography></TableCell>
                    <TableCell><Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>{formatDateTime(log.createdAt)}</Typography></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SectionCard>
        </Grid>
      </Grid>

      <RecordPurchaseModal
        open={purchaseOpen}
        onClose={() => setPurchaseOpen(false)}
        tanks={tanks}
        onSubmit={handleRecordPurchase}
      />
      <AddTankModal
        open={addTankOpen}
        onClose={() => setAddTankOpen(false)}
        onSubmit={handleAddTank}
      />
      <AddPackagedItemModal
        open={addItemOpen}
        onClose={() => setAddItemOpen(false)}
        onSubmit={handleAddItem}
      />
      <AdjustInventoryModal
        open={adjustOpen}
        onClose={() => setAdjustOpen(false)}
        tanks={tanks}
        truckPlates={truckPlates}
        onManualAdjust={handleManualAdjust}
        onSpillAdjust={handleSpillAdjust}
      />
    </Box>
  );
}
