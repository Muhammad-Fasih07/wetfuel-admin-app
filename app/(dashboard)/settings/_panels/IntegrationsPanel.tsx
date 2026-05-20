"use client";

import { Box, Typography, Button, TextField, Chip, Divider, Alert } from "@mui/material";
import { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LinkOffIcon from "@mui/icons-material/LinkOff";

export default function IntegrationsPanel() {
  const [qbConnected, setQbConnected] = useState(false);
  const [opisRate, setOpisRate] = useState({ regular: "3.459", premium: "3.829", diesel: "4.189" });
  const [override, setOverride] = useState({ regular: "", premium: "", diesel: "" });

  return (
    <Box>
      {/* QuickBooks */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>QuickBooks Integration</Typography>
        <Typography variant="body2" sx={{ color: "#64748b", mb: 2 }}>Connect WetFuel to QuickBooks Online to automatically sync invoices.</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2.5, borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "#252528" }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 600, fontSize: "0.875rem" }}>QuickBooks Online</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
              {qbConnected ? (
                <Chip icon={<CheckCircleIcon sx={{ fontSize: "14px !important" }} />} label="Connected" size="small" sx={{ backgroundColor: "rgba(34,197,94,0.15)", color: "#4ade80", fontWeight: 600 }} />
              ) : (
                <Chip label="Not Connected" size="small" sx={{ backgroundColor: "rgba(239,68,68,0.15)", color: "#f87171" }} />
              )}
            </Box>
          </Box>
          <Button
            variant={qbConnected ? "outlined" : "contained"}
            startIcon={qbConnected ? <LinkOffIcon /> : undefined}
            onClick={() => setQbConnected(!qbConnected)}
            sx={qbConnected ? { borderColor: "#ef4444", color: "#ef4444" } : {}}
          >
            {qbConnected ? "Disconnect" : "Connect QuickBooks"}
          </Button>
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* OPIS Daily Rate */}
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>OPIS Fuel Pricing</Typography>
        <Typography variant="body2" sx={{ color: "#64748b", mb: 2 }}>OPIS daily rack rates — approve or override for today's deliveries.</Typography>

        <Alert severity="info" sx={{ mb: 2.5, borderRadius: "10px", fontSize: "0.8rem" }}>
          Last synced: Nov 8, 2024 at 6:00 AM CST
        </Alert>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[
            { key: "regular", label: "Regular Unleaded (OPIS)", color: "#3b82f6" },
            { key: "premium", label: "Premium (OPIS)", color: "#8b5cf6" },
            { key: "diesel", label: "Diesel (OPIS)", color: "#f59e0b" },
          ].map((fuel) => (
            <Box key={fuel.key} sx={{ p: 2, borderRadius: "10px", border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: fuel.color }}>{fuel.label}</Typography>
                <Typography sx={{ fontSize: "0.8rem", color: "#64748b" }}>
                  OPIS Rate: ${opisRate[fuel.key as keyof typeof opisRate]}/gal
                </Typography>
              </Box>
              <TextField
                label="Manual Override"
                size="small"
                value={override[fuel.key as keyof typeof override]}
                onChange={(e) => setOverride((s) => ({ ...s, [fuel.key]: e.target.value }))}
                placeholder={opisRate[fuel.key as keyof typeof opisRate]}
                InputProps={{ startAdornment: <span style={{ marginRight: 4, color: "#64748b" }}>$</span> }}
                sx={{ width: 160 }}
              />
            </Box>
          ))}
        </Box>
        <Box sx={{ mt: 2.5, display: "flex", gap: 2 }}>
          <Button variant="contained">Apply Prices</Button>
          <Button variant="outlined">Reset to OPIS</Button>
        </Box>
      </Box>
    </Box>
  );
}
