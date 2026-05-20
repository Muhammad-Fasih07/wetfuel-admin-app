"use client";

import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import ProfilePanel from "./_panels/ProfilePanel";
import SecurityPanel from "./_panels/SecurityPanel";
import NotificationsPanel from "./_panels/NotificationsPanel";
import IntegrationsPanel from "./_panels/IntegrationsPanel";
import DangerPanel from "./_panels/DangerPanel";

const TABS = [
  { label: "Profile", icon: <PersonIcon fontSize="small" />, component: ProfilePanel },
  { label: "Security", icon: <LockIcon fontSize="small" />, component: SecurityPanel },
  { label: "Notifications", icon: <NotificationsIcon fontSize="small" />, component: NotificationsPanel },
  { label: "Integrations", icon: <IntegrationInstructionsIcon fontSize="small" />, component: IntegrationsPanel },
  { label: "Danger Zone", icon: <WarningAmberIcon fontSize="small" />, component: DangerPanel },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const ActivePanel = TABS[activeTab].component;

  return (
    <Box>
      <PageHeader
        title="Settings"
        subtitle="Manage your account and application preferences"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Settings" }]}
      />

      <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start", "@media (max-width: 768px)": { flexDirection: "column" } }}>
        {/* Sidebar tabs */}
        <Box
          sx={{
            width: 220,
            flexShrink: 0,
            background: "#1c1c1e",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.07)",
            p: 1,
            "@media (max-width: 768px)": { width: "100%" },
          }}
        >
          {TABS.map((tab, i) => (
            <Box
              key={tab.label}
              onClick={() => setActiveTab(i)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 2,
                py: 1.5,
                borderRadius: "10px",
                cursor: "pointer",
                transition: "all 150ms",
                color: activeTab === i ? "#ffffff" : "#94a3b8",
                backgroundColor: activeTab === i ? "#ce1c1a" : "transparent",
                mb: 0.25,
                "&:hover": {
                  backgroundColor: activeTab === i ? "#bf2524" : "rgba(255,255,255,0.06)",
                  color: activeTab === i ? "#ffffff" : "#f1f5f9",
                },
              }}
            >
              {tab.icon}
              <Typography sx={{ fontSize: "0.875rem", fontWeight: activeTab === i ? 600 : 500 }}>
                {tab.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Panel content */}
        <Box sx={{ flex: 1 }}>
          <SectionCard title={TABS[activeTab].label}>
            <ActivePanel />
          </SectionCard>
        </Box>
      </Box>
    </Box>
  );
}
