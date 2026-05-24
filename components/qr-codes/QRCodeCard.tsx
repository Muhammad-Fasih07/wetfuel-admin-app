"use client";

import { Box, Typography, Paper, Checkbox } from "@mui/material";
import QRCode from "react-qr-code";
import { BRAND_RED, cardHoverBorderSx } from "@/lib/theme/cardStyles";

interface QRCodeCardProps {
  code: string;
  label?: string;
  unassigned?: boolean;
  selected?: boolean;
  onSelect?: (code: string) => void;
  selectable?: boolean;
}

export default function QRCodeCard({ code, label, unassigned, selected, onSelect, selectable }: QRCodeCardProps) {
  const qrValue = `https://wetfuel.com/equipment/${code}`;

  return (
    <Paper
      elevation={0}
      onClick={() => selectable && onSelect?.(code)}
      sx={{
        p: 2,
        borderRadius: "12px",
        border: selected ? `2px solid ${BRAND_RED}` : unassigned ? "1px dashed rgba(245,158,11,0.4)" : "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        cursor: selectable ? "pointer" : "default",
        transition: "all 150ms",
        backgroundColor: selected ? "rgba(206,28,26,0.08)" : "#252528",
        "&:hover": selectable
          ? {
              ...cardHoverBorderSx["&:hover"],
              boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
              ...(selected ? {} : { border: `1px solid ${BRAND_RED}` }),
            }
          : {},
        position: "relative",
      }}
    >
      {selectable && (
        <Checkbox
          checked={!!selected}
          size="small"
          sx={{ position: "absolute", top: 4, right: 4, p: 0.5 }}
          onClick={(e) => e.stopPropagation()}
          onChange={() => onSelect?.(code)}
        />
      )}
      <Box
        sx={{
          p: 1.5,
          borderRadius: "10px",
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <QRCode value={qrValue} size={72} level="M" />
      </Box>
      <Typography
        sx={{ fontSize: "0.7rem", fontFamily: "monospace", fontWeight: 700, color: "#f1f5f9", textAlign: "center" }}
      >
        {code}
      </Typography>
      <Typography
        sx={{
          fontSize: "0.65rem",
          color: unassigned ? "#fbbf24" : "#64748b",
          textAlign: "center",
          lineHeight: 1.3,
          fontWeight: unassigned ? 600 : 400,
        }}
      >
        {label ?? (unassigned ? "Unassigned — ready to print" : "")}
      </Typography>
    </Paper>
  );
}
