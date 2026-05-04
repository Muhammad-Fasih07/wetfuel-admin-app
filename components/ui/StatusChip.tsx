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

const STATUS_CONFIG: Record<
  Status,
  { bg: string; color: string; label?: string }
> = {
  Active: { bg: "#dcfce7", color: "#15803d" },
  Deactivated: { bg: "#fee2e2", color: "#dc2626" },
  Pending: { bg: "#fef3c7", color: "#d97706" },
  Completed: { bg: "#dbeafe", color: "#1d4ed8" },
  "On Leave": { bg: "#fef3c7", color: "#d97706" },
  Maintenance: { bg: "#fef3c7", color: "#d97706" },
  Decommissioned: { bg: "#fee2e2", color: "#dc2626" },
  New: { bg: "#ede9fe", color: "#7c3aed" },
  Ready: { bg: "#dbeafe", color: "#1d4ed8" },
  Assigned: { bg: "#fef3c7", color: "#d97706" },
  Finalized: { bg: "#dcfce7", color: "#15803d" },
};

interface StatusChipProps {
  status: Status;
  size?: "small" | "medium";
}

export default function StatusChip({ status, size = "small" }: StatusChipProps) {
  const config = STATUS_CONFIG[status] || { bg: "#f3f4f6", color: "#6b7280" };
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
