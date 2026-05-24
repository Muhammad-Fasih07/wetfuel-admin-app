"use client";

import { useState } from "react";
import { Box, Grid, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import DownloadIcon from "@mui/icons-material/Download";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import StatCard from "@/components/ui/StatCard";
import UnderDevelopmentModal from "@/components/ui/UnderDevelopmentModal";
import { mockChartData, mockDriverReports, mockCustomerReports } from "./_data";
import { formatCurrency, formatNumber } from "@/lib/utils/formatters";

const STATS = [
  { title: "Total Gallons Delivered", value: "59,100 gal", icon: <LocalGasStationIcon sx={{ fontSize: 22 }} />, iconBg: "rgba(59,130,246,0.2)", iconColor: "#60a5fa", trend: 14, trendLabel: "vs last month" },
  { title: "Total Revenue", value: formatCurrency(281172), icon: <AttachMoneyIcon sx={{ fontSize: 22 }} />, iconBg: "rgba(34,197,94,0.2)", iconColor: "#4ade80", trend: 18, trendLabel: "vs last month" },
  { title: "Total Jobs", value: "160", icon: <AssignmentIcon sx={{ fontSize: 22 }} />, iconBg: "rgba(245,158,11,0.2)", iconColor: "#fbbf24", trend: 9, trendLabel: "vs last month" },
  { title: "Active Drivers", value: "3", icon: <PeopleIcon sx={{ fontSize: 22 }} />, iconBg: "rgba(139,92,246,0.2)", iconColor: "#a78bfa" },
];

export default function ReportingPage() {
  const [exportDevOpen, setExportDevOpen] = useState(false);

  return (
    <Box>
      <PageHeader
        title="Reporting"
        subtitle="Performance metrics and analytics"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Reporting" }]}
        action={
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={() => setExportDevOpen(true)}>
            Export Report
          </Button>
        }
      />

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {STATS.map((stat) => (
          <Grid item xs={12} sm={6} lg={3} key={stat.title}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {/* Gallons Chart */}
        <Grid item xs={12} md={7}>
          <SectionCard title="Gallons Delivered" subtitle="Last 6 weeks">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={mockChartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                <Tooltip
                  contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 12 }}
                  formatter={(v: any) => [`${Number(v).toLocaleString()} gal`, "Gallons"]}
                />
                <Line type="monotone" dataKey="gallons" stroke="#ce1c1a" strokeWidth={2.5} dot={{ fill: "#ce1c1a", r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </SectionCard>
        </Grid>

        {/* Revenue Chart */}
        <Grid item xs={12} md={5}>
          <SectionCard title="Revenue" subtitle="Last 6 weeks">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={mockChartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 12 }}
                  formatter={(v: any) => [formatCurrency(v), "Revenue"]}
                />
                <Bar dataKey="revenue" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>
        </Grid>
      </Grid>

      <Grid container spacing={2.5}>
        {/* Driver Reports */}
        <Grid item xs={12} md={6}>
          <SectionCard title="Driver Performance" subtitle="October 2024" action={<Button size="small" startIcon={<DownloadIcon />} sx={{ fontSize: "0.75rem" }} onClick={() => setExportDevOpen(true)}>Export</Button>} noPadding>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Driver</TableCell>
                  <TableCell>Jobs</TableCell>
                  <TableCell>Gallons</TableCell>
                  <TableCell>Hours</TableCell>
                  <TableCell>Avg/Day</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockDriverReports.map((r) => (
                  <TableRow key={r.driverId} hover>
                    <TableCell><Typography sx={{ fontWeight: 600, fontSize: "0.875rem" }}>{r.driverName}</Typography></TableCell>
                    <TableCell>{r.totalJobs}</TableCell>
                    <TableCell>{r.totalGallons.toLocaleString()}</TableCell>
                    <TableCell>{r.totalHours}h</TableCell>
                    <TableCell><Typography sx={{ fontWeight: 600, color: "#22c55e", fontSize: "0.875rem" }}>{r.avgJobsPerDay}</Typography></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SectionCard>
        </Grid>

        {/* Customer Reports */}
        <Grid item xs={12} md={6}>
          <SectionCard title="Customer Fueling" subtitle="October 2024" action={<Button size="small" startIcon={<DownloadIcon />} sx={{ fontSize: "0.75rem" }} onClick={() => setExportDevOpen(true)}>Export</Button>} noPadding>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Customer</TableCell>
                  <TableCell>Gallons</TableCell>
                  <TableCell>Revenue</TableCell>
                  <TableCell>Jobs</TableCell>
                  <TableCell>Avg Order</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockCustomerReports.map((r) => (
                  <TableRow key={r.customerId} hover>
                    <TableCell><Typography sx={{ fontWeight: 500, fontSize: "0.8rem" }}>{r.customerName}</Typography></TableCell>
                    <TableCell>{r.totalGallons.toLocaleString()}</TableCell>
                    <TableCell><Typography sx={{ fontWeight: 600, fontSize: "0.875rem" }}>{formatCurrency(r.totalSpend)}</Typography></TableCell>
                    <TableCell>{r.jobCount}</TableCell>
                    <TableCell>{r.avgOrderSize} gal</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SectionCard>
        </Grid>
      </Grid>

      <UnderDevelopmentModal
        open={exportDevOpen}
        onClose={() => setExportDevOpen(false)}
        featureKey="report-export"
      />
    </Box>
  );
}
