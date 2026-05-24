"use client";

import { Box, Grid, Typography, Button, Avatar, Divider } from "@mui/material";
import Link from "next/link";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AddTaskIcon from "@mui/icons-material/AddTask";
import PeopleIcon from "@mui/icons-material/People";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ReceiptIcon from "@mui/icons-material/Receipt";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StatCard from "@/components/ui/StatCard";
import SectionCard from "@/components/ui/SectionCard";
import PageHeader from "@/components/ui/PageHeader";
import { formatDateTime } from "@/lib/utils/formatters";
import { cardHoverBorderSx } from "@/lib/theme/cardStyles";

const STATS = [
  { title: "Total Drivers", value: 5, subtitle: "3 active", href: "/drivers", icon: <PeopleIcon sx={{ fontSize: 22 }} />, iconBg: "rgba(59,130,246,0.2)", iconColor: "#60a5fa", trend: 5, trendLabel: "vs last month" },
  { title: "Total Trucks", value: 4, subtitle: "3 operational", href: "/trucks", icon: <DirectionsBusIcon sx={{ fontSize: 22 }} />, iconBg: "rgba(139,92,246,0.2)", iconColor: "#a78bfa", trend: 0 },
  { title: "Customers", value: 5, subtitle: "4 active", href: "/customers", icon: <BusinessIcon sx={{ fontSize: 22 }} />, iconBg: "rgba(34,197,94,0.2)", iconColor: "#4ade80", trend: 12, trendLabel: "vs last month" },
  { title: "Open Jobs", value: 4, subtitle: "2 scheduled today", href: "/jobs", icon: <AssignmentIcon sx={{ fontSize: 22 }} />, iconBg: "rgba(245,158,11,0.2)", iconColor: "#fbbf24", trend: -8, trendLabel: "vs yesterday" },
  { title: "Pending Invoices", value: 2, subtitle: "$18,040.25 total", href: "/invoices", icon: <ReceiptIcon sx={{ fontSize: 22 }} />, iconBg: "rgba(239,68,68,0.2)", iconColor: "#f87171" },
  { title: "Low Inventory", value: 1, subtitle: "Premium < 35%", href: "/inventory", icon: <WarningAmberIcon sx={{ fontSize: 22 }} />, iconBg: "rgba(245,158,11,0.2)", iconColor: "#fbbf24" },
];

const ACTIVITY = [
  { id: 1, type: "job_completed", message: "Job WF-2024-0835 completed by Marcus Rivera", time: "2024-11-07T16:30:00Z", color: "#22c55e" },
  { id: 2, type: "new_request", message: "New fuel request from Austin Construction LLC", time: "2024-11-08T09:00:00Z", color: "#3b82f6" },
  { id: 3, type: "invoice", message: "Invoice INV-2024-0040 is overdue — Lone Star Agriculture", time: "2024-11-08T08:00:00Z", color: "#ef4444" },
  { id: 4, type: "qr_request", message: "QR registration request from Zenith Logistics Corp", time: "2024-11-08T09:15:00Z", color: "#8b5cf6" },
  { id: 5, type: "driver", message: "Driver license expiring soon — Trevor Williams (Mar 2024)", time: "2024-11-07T12:00:00Z", color: "#f59e0b" },
];

const QUICK_ACTIONS = [
  { label: "New Driver", href: "/drivers/new", icon: <PersonAddIcon />, bg: "rgba(59,130,246,0.2)", color: "#60a5fa" },
  { label: "New Truck", href: "/trucks/new", icon: <LocalShippingIcon />, bg: "rgba(139,92,246,0.2)", color: "#a78bfa" },
  { label: "New Customer", href: "/customers/new", icon: <AddBusinessIcon />, bg: "rgba(34,197,94,0.2)", color: "#4ade80" },
  { label: "New Job", href: "/jobs", icon: <AddTaskIcon />, bg: "rgba(245,158,11,0.2)", color: "#fbbf24" },
];

export default function DashboardPage() {
  return (
    <Box>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back — here's what's happening today"
      />

      {/* Stat Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {STATS.map((stat) => (
          <Grid item xs={12} sm={6} lg={4} key={stat.title}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2.5}>
        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <SectionCard title="Quick Actions">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {QUICK_ACTIONS.map((action) => (
                <Box
                  key={action.label}
                  component={Link}
                  href={action.href}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 1.5,
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.07)",
                    textDecoration: "none",
                    ...cardHoverBorderSx,
                    "&:hover": {
                      ...cardHoverBorderSx["&:hover"],
                      backgroundColor: "rgba(255,255,255,0.06)",
                      transform: "translateX(2px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: "9px",
                      backgroundColor: action.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: action.color,
                      flexShrink: 0,
                    }}
                  >
                    {action.icon}
                  </Box>
                  <Typography sx={{ fontWeight: 600, fontSize: "0.875rem", color: "#f1f5f9" }}>
                    {action.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </SectionCard>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={8}>
          <SectionCard
            title="Recent Activity"
            subtitle="Latest events across the platform"
            action={
              <Link href="/activity" style={{ textDecoration: "none" }}>
                <Typography sx={{ fontSize: "0.75rem", color: "#ce1c1a", fontWeight: 600 }}>
                  View all
                </Typography>
              </Link>
            }
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {ACTIVITY.map((item, i) => (
                <Box key={item.id}>
                  <Box sx={{ display: "flex", gap: 2, py: 1.5, alignItems: "flex-start" }}>
                    <Box sx={{ mt: 0.4 }}>
                      <FiberManualRecordIcon sx={{ fontSize: 10, color: item.color }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: "0.8rem", color: "#f1f5f9", fontWeight: 500 }}>
                        {item.message}
                      </Typography>
                      <Typography sx={{ fontSize: "0.7rem", color: "#9ca3af", mt: 0.25 }}>
                        {formatDateTime(item.time)}
                      </Typography>
                    </Box>
                  </Box>
                  {i < ACTIVITY.length - 1 && <Divider />}
                </Box>
              ))}
            </Box>
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}
