"use client";

import { Box, Typography, FormControlLabel, Switch, Divider, Button } from "@mui/material";
import { useState } from "react";

const NOTIFICATION_GROUPS = [
  {
    group: "Operations",
    items: [
      { id: "missed_deliveries", label: "Missed Deliveries", description: "Get notified when a scheduled delivery is missed" },
      { id: "completed_jobs", label: "Completed Jobs", description: "Notification when driver marks a job complete" },
    ],
  },
  {
    group: "Alerts",
    items: [
      { id: "flags", label: "Flagged Activities", description: "System-detected anomalies and GPS mismatches" },
      { id: "anomalies", label: "Delivery Anomalies", description: "Volume discrepancies and irregular patterns" },
      { id: "low_inventory", label: "Low Inventory", description: "Main tank drops below 25% capacity" },
    ],
  },
  {
    group: "Integrations",
    items: [
      { id: "quickbooks_sync", label: "QuickBooks Sync Failures", description: "Failed invoice exports or sync errors" },
      { id: "opis_sync", label: "OPIS Rate Updates", description: "Daily fuel price updates from OPIS" },
    ],
  },
];

export default function NotificationsPanel() {
  const [settings, setSettings] = useState<Record<string, boolean>>(
    Object.fromEntries(
      NOTIFICATION_GROUPS.flatMap((g) => g.items.map((i) => [i.id, true]))
    )
  );

  return (
    <Box>
      {NOTIFICATION_GROUPS.map((group, gi) => (
        <Box key={group.group}>
          {gi > 0 && <Divider sx={{ my: 3 }} />}
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: "#2b2b2b" }}>{group.group}</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {group.items.map((item) => (
              <Box key={item.id} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography sx={{ fontSize: "0.875rem", fontWeight: 500 }}>{item.label}</Typography>
                  <Typography sx={{ fontSize: "0.75rem", color: "#887b6a" }}>{item.description}</Typography>
                </Box>
                <Switch
                  checked={settings[item.id]}
                  onChange={(e) => setSettings((s) => ({ ...s, [item.id]: e.target.checked }))}
                  sx={{ "& .MuiSwitch-thumb": { color: settings[item.id] ? "#ce1c1a" : undefined }, "& .MuiSwitch-track": { backgroundColor: settings[item.id] ? "#ce1c1a !important" : undefined } }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      ))}
      <Divider sx={{ my: 3 }} />
      <Button variant="contained">Save Preferences</Button>
    </Box>
  );
}
