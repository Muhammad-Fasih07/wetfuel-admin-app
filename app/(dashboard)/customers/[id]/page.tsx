"use client";

import { Box, Grid, Typography, Button, Tab, Tabs, Table, TableBody, TableCell, TableHead, TableRow, Chip } from "@mui/material";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import QrCodeIcon from "@mui/icons-material/QrCode";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import StatusChip from "@/components/ui/StatusChip";
import { mockCustomers, mockFuelRequests } from "../_data";
import { mockInvoices, INVOICE_STATUS_COLORS } from "../../invoices/_data";
import { formatPhone, formatDate, formatCurrency } from "@/lib/utils/formatters";

export default function CustomerDetailPage() {
  const { id } = useParams();
  const [tab, setTab] = useState(0);
  const customer = mockCustomers.find((c) => c.id === id);
  const requests = mockFuelRequests.filter((r) => r.customerId === id);
  const invoices = mockInvoices.filter((inv) => inv.customerId === id);

  if (!customer) return <Box sx={{ p: 4 }}>Customer not found</Box>;

  return (
    <Box>
      <PageHeader
        title={customer.name}
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Customers", href: "/customers" },
          { label: customer.name },
        ]}
        action={
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button variant="outlined" startIcon={<QrCodeIcon />} component={Link} href="/qr-codes">
              QR Codes
            </Button>
            <Button variant="contained" startIcon={<EditIcon />} component={Link} href={`/customers/${id}/edit`}>
              Edit
            </Button>
          </Box>
        }
      />

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={4}>
          <SectionCard title="Customer Info">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { label: "Email", value: customer.email },
                { label: "Phone", value: formatPhone(customer.phone) },
                { label: "Status", chip: customer.status },
                { label: "Margin", value: `${(customer.margins * 100).toFixed(0)}%` },
                { label: "Min Gallon Limit", value: `${customer.minGallonLimit} gal` },
                { label: "Location", value: customer.location },
                { label: "Geofence Radius", value: `${customer.geofencedRadius} mi` },
              ].map((f) => (
                <Box key={f.label} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 0.9, borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                  <Typography sx={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 500 }}>{f.label}</Typography>
                  {f.chip ? <StatusChip status={f.chip as any} /> : <Typography sx={{ fontSize: "0.8rem", maxWidth: "55%", textAlign: "right" }}>{f.value}</Typography>}
                </Box>
              ))}
            </Box>
          </SectionCard>

          <Box sx={{ mt: 2.5 }}>
            <SectionCard title="Tax Exemptions">
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {[
                  { key: "fedLustTax", label: "Fed LUST Tax" },
                  { key: "salesTax", label: "Sales Tax" },
                  { key: "fuelTax", label: "Fuel Tax" },
                  { key: "st101", label: "ST-101" },
                ].map((tax) => {
                  const exempt = customer.taxExemptions[tax.key as keyof typeof customer.taxExemptions];
                  return (
                    <Chip key={tax.key} label={tax.label} size="small"
                      sx={{ backgroundColor: exempt ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.08)", color: exempt ? "#4ade80" : "#64748b", fontWeight: 500 }}
                    />
                  );
                })}
              </Box>
            </SectionCard>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <SectionCard>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: "1px solid rgba(0,0,0,0.06)", mb: 2 }}>
              <Tab label={`Equipment (${customer.equipment.length})`} />
              <Tab label="Fuel Requests" />
              <Tab label={`Invoices (${invoices.length})`} />
            </Tabs>

            {tab === 0 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {customer.equipment.length === 0 ? (
                  <Typography sx={{ textAlign: "center", py: 4, color: "#9ca3af", fontSize: "0.875rem" }}>No equipment registered</Typography>
                ) : customer.equipment.map((eq) => (
                  <Box key={eq.id} sx={{ p: 2, borderRadius: "10px", border: "1px solid rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: "0.875rem" }}>{eq.name}</Typography>
                      <Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>
                        {eq.fuelType} — {eq.maxCapacity} gal max
                        {eq.registeredQrCode && ` — QR: ${eq.registeredQrCode}`}
                      </Typography>
                    </Box>
                    <QrCodeIcon sx={{ color: "#9ca3af" }} />
                  </Box>
                ))}
              </Box>
            )}

            {tab === 1 && (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Equipment</TableCell>
                    <TableCell>Fuel Type</TableCell>
                    <TableCell>Gallons</TableCell>
                    <TableCell>Scheduled</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requests.length === 0 ? (
                    <TableRow><TableCell colSpan={5} sx={{ textAlign: "center", py: 3, color: "#9ca3af" }}>No fuel requests</TableCell></TableRow>
                  ) : requests.map((r) => (
                    <TableRow key={r.id} hover>
                      <TableCell>{r.equipmentName}</TableCell>
                      <TableCell>{r.fuelType}</TableCell>
                      <TableCell>{r.requestedGallons}</TableCell>
                      <TableCell>{formatDate(r.scheduledDate)}</TableCell>
                      <TableCell><StatusChip status={r.status as any} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {tab === 2 && (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Invoice #</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Due Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoices.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} sx={{ textAlign: "center", py: 3, color: "#9ca3af" }}>
                        No invoices
                      </TableCell>
                    </TableRow>
                  ) : invoices.map((inv) => {
                    const sc = INVOICE_STATUS_COLORS[inv.status] || { bg: "rgba(255,255,255,0.08)", color: "#94a3b8" };
                    return (
                      <TableRow key={inv.id} hover>
                        <TableCell>
                          <Typography sx={{ fontFamily: "monospace", fontWeight: 700, fontSize: "0.8rem" }}>
                            {inv.invoiceNumber}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{
                              fontSize: "0.875rem",
                              fontWeight: 700,
                              color: inv.status === "Overdue" ? "#ef4444" : "#f1f5f9",
                            }}
                          >
                            {formatCurrency(inv.amount)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={inv.status} size="small" sx={{ backgroundColor: sc.bg, color: sc.color, fontWeight: 600 }} />
                        </TableCell>
                        <TableCell>{formatDate(inv.date)}</TableCell>
                        <TableCell>
                          <Typography
                            sx={{
                              fontSize: "0.8rem",
                              color: inv.status === "Overdue" ? "#ef4444" : "#f1f5f9",
                              fontWeight: inv.status === "Overdue" ? 600 : 400,
                            }}
                          >
                            {formatDate(inv.dueDate)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}
