"use client";

import { Box, Typography, Button } from "@mui/material";
import { useParams } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { mockChartData } from "../_data";

export default function EntityReportPage() {
  const { entityId } = useParams();

  return (
    <Box>
      <PageHeader
        title={`Entity Report — ${entityId}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Reporting", href: "/reporting" },
          { label: `Report: ${entityId}` },
        ]}
        action={
          <Button variant="outlined" startIcon={<ArrowBackIcon />} component={Link} href="/reporting">
            Back to Reporting
          </Button>
        }
      />
      <SectionCard title="Fueling History" subtitle="Last 6 weeks">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
            <Line type="monotone" dataKey="gallons" stroke="#ce1c1a" strokeWidth={2.5} dot={{ fill: "#ce1c1a", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </SectionCard>
    </Box>
  );
}
