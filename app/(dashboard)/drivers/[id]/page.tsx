"use client";

import { Box, Grid, Typography, Button, Chip, Avatar, Divider, Tab, Tabs, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import StatusChip from "@/components/ui/StatusChip";
import { mockDrivers, mockTimesheets } from "../_data";
import { formatDate, formatPhone, getInitials, isExpiringSoon, isExpired } from "@/lib/utils/formatters";

export default function DriverDetailPage() {
  const { id } = useParams();
  const [tab, setTab] = useState(0);
  const driver = mockDrivers.find((d) => d.id === id);
  const timesheets = mockTimesheets.filter((t) => t.driverId === id);

  if (!driver) {
    return <Box sx={{ p: 4, textAlign: "center" }}>Driver not found</Box>;
  }

  const fields = [
    { label: "Email", value: driver.email },
    { label: "Phone", value: formatPhone(driver.phone) },
    { label: "Birthday", value: formatDate(driver.birthday) },
    { label: "Hire Date", value: formatDate(driver.anniversary) },
    { label: "Address", value: driver.address },
    { label: "Emergency Contact", value: `${driver.emergencyContact} — ${formatPhone(driver.emergencyPhone)}` },
    { label: "Licence Number", value: driver.licenceNumber },
    { label: "Licence State", value: driver.licenceState },
    { label: "Licence Expiry", value: formatDate(driver.licenceExpiry), warn: isExpiringSoon(driver.licenceExpiry) || isExpired(driver.licenceExpiry) },
  ];

  return (
    <Box>
      <PageHeader
        title={driver.name}
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Drivers", href: "/drivers" },
          { label: driver.name },
        ]}
        action={
          <Button variant="contained" startIcon={<EditIcon />} component={Link} href={`/drivers/${id}/edit`}>
            Edit Driver
          </Button>
        }
      />

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={4}>
          <SectionCard>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 2 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  background: "linear-gradient(135deg, #cd171a, #bf2524)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                {getInitials(driver.name)}
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{driver.name}</Typography>
              <Typography variant="body2" sx={{ color: "#887b6a", mb: 1.5 }}>{driver.email}</Typography>
              <StatusChip status={driver.status} size="medium" />
            </Box>
            <Divider />
            <Box sx={{ pt: 2 }}>
              {fields.map((f) => (
                <Box key={f.label} sx={{ display: "flex", justifyContent: "space-between", py: 0.75 }}>
                  <Typography sx={{ fontSize: "0.8rem", color: "#887b6a", fontWeight: 500 }}>{f.label}</Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: f.warn ? "#f59e0b" : "#2b2b2b", fontWeight: f.warn ? 600 : 400, maxWidth: "55%", textAlign: "right" }}>
                    {f.value || "—"}
                  </Typography>
                </Box>
              ))}
            </Box>
          </SectionCard>
        </Grid>

        <Grid item xs={12} md={8}>
          <SectionCard>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: "1px solid rgba(0,0,0,0.06)", mb: 2 }}>
              <Tab label="Certifications" />
              <Tab label="Timesheet" />
            </Tabs>

            {tab === 0 && (
              <Box>
                {driver.certifications.length === 0 ? (
                  <Typography sx={{ color: "#9ca3af", textAlign: "center", py: 4, fontSize: "0.875rem" }}>No certifications on file</Typography>
                ) : (
                  driver.certifications.map((cert) => (
                    <Box key={cert.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1.5, borderRadius: "10px", border: "1px solid rgba(0,0,0,0.06)", mb: 1.5 }}>
                      <Typography sx={{ fontWeight: 600, fontSize: "0.875rem" }}>{cert.name}</Typography>
                      <Typography sx={{ fontSize: "0.8rem", color: isExpired(cert.expiryDate) ? "#ef4444" : isExpiringSoon(cert.expiryDate) ? "#f59e0b" : "#887b6a" }}>
                        Expires {formatDate(cert.expiryDate)}
                        {isExpired(cert.expiryDate) && " — EXPIRED"}
                      </Typography>
                    </Box>
                  ))
                )}
              </Box>
            )}

            {tab === 1 && (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Clock In</TableCell>
                    <TableCell>Clock Out</TableCell>
                    <TableCell>Hours</TableCell>
                    <TableCell>Jobs</TableCell>
                    <TableCell>Gallons</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {timesheets.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ textAlign: "center", color: "#9ca3af", py: 3 }}>No timesheet data</TableCell>
                    </TableRow>
                  ) : (
                    timesheets.map((t) => (
                      <TableRow key={t.id} hover>
                        <TableCell>{formatDate(t.date)}</TableCell>
                        <TableCell>{t.clockIn}</TableCell>
                        <TableCell>{t.clockOut}</TableCell>
                        <TableCell>{t.hoursWorked}h</TableCell>
                        <TableCell>{t.jobsCompleted}</TableCell>
                        <TableCell>{t.gallonsDelivered.toLocaleString()}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}
