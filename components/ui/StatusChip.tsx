"use client";

import { Chip } from "@mui/material";

type Status =
  | "Active"
  | "Deactivated"
  | "Pending"
  | "Completed"
  | "On Leave"
  | "Maintenance"
  | "Decommissioned"
  | "New"
  | "Ready"
  | "Assigned"
  | "Finalized";

const STATUS_CONFIG: Record<Status, { bg: string; color: string }> = {
  Active: { bg: "rgba(34,197,94,0.15)", color: "#4ade80" },
  Deactivated: { bg: "rgba(239,68,68,0.15)", color: "#f87171" },
  Pending: { bg: "rgba(245,158,11,0.15)", color: "#fbbf24" },
  Completed: { bg: "rgba(59,130,246,0.15)", color: "#60a5fa" },
  "On Leave": { bg: "rgba(245,158,11,0.15)", color: "#fbbf24" },
  Maintenance: { bg: "rgba(245,158,11,0.15)", color: "#fbbf24" },
  Decommissioned: { bg: "rgba(239,68,68,0.15)", color: "#f87171" },
  New: { bg: "rgba(139,92,246,0.15)", color: "#a78bfa" },
  Ready: { bg: "rgba(59,130,246,0.15)", color: "#60a5fa" },
  Assigned: { bg: "rgba(245,158,11,0.15)", color: "#fbbf24" },
  Finalized: { bg: "rgba(34,197,94,0.15)", color: "#4ade80" },
};

interface StatusChipProps {
  status: Status;
  size?: "small" | "medium";
}

export default function StatusChip({ status, size = "small" }: StatusChipProps) {
  const config = STATUS_CONFIG[status] || { bg: "rgba(255,255,255,0.08)", color: "#94a3b8" };
  return (
    <Chip
      label={status}
      size={size}
      sx={{
        backgroundColor: config.bg,
        color: config.color,
        fontWeight: 600,
        fontSize: size === "small" ? "0.7rem" : "0.8rem",
        border: "none",
        "& .MuiChip-label": { px: 1.5 },
      }}
    />
  );
}
