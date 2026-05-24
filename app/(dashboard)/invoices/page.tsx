"use client";

import { useState } from "react";
import { Box, Button, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography, TextField, InputAdornment, MenuItem } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import UnderDevelopmentModal, { type DevFeatureKey } from "@/components/ui/UnderDevelopmentModal";
import { formatDate, formatCurrency } from "@/lib/utils/formatters";
import { mockInvoices, INVOICE_STATUS_COLORS } from "./_data";

const STATUSES = ["All", "Draft", "Outstanding", "Paid", "Overdue"];

export default function InvoicesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [devModal, setDevModal] = useState<DevFeatureKey | null>(null);

  const filtered = mockInvoices.filter((inv) => {
    const matchSearch = inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalOutstanding = mockInvoices
    .filter((i) => i.status === "Outstanding" || i.status === "Overdue")
    .reduce((s, i) => s + i.amount, 0);

  return (
    <Box>
      <PageHeader
        title="Invoices"
        subtitle={`${formatCurrency(totalOutstanding)} outstanding`}
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Invoices" }]}
        action={
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={() => setDevModal("quickbooks")}>
            Export to QuickBooks
          </Button>
        }
      />

      <SectionCard
        title="All Invoices"
        subtitle={`Showing ${filtered.length} invoices`}
        action={
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <TextField size="small" placeholder="Search…" value={search} onChange={(e) => setSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 16, color: "#9ca3af" }} /></InputAdornment> }}
              sx={{ width: 200 }}
            />
            <TextField size="small" select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} sx={{ width: 130 }}>
              {STATUSES.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
          </Box>
        }
        noPadding
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice #</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((inv) => {
              const sc = INVOICE_STATUS_COLORS[inv.status] || { bg: "rgba(255,255,255,0.08)", color: "#94a3b8" };
              return (
                <TableRow key={inv.id} hover>
                  <TableCell>
                    <Typography sx={{ fontFamily: "monospace", fontWeight: 700, fontSize: "0.8rem" }}>{inv.invoiceNumber}</Typography>
                  </TableCell>
                  <TableCell><Typography sx={{ fontSize: "0.875rem", fontWeight: 500 }}>{inv.customerName}</Typography></TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: "0.875rem", fontWeight: 700, color: inv.status === "Overdue" ? "#ef4444" : "#f1f5f9" }}>
                      {formatCurrency(inv.amount)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={inv.status} size="small" sx={{ backgroundColor: sc.bg, color: sc.color, fontWeight: 600 }} />
                  </TableCell>
                  <TableCell><Typography sx={{ fontSize: "0.8rem" }}>{formatDate(inv.date)}</Typography></TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: "0.8rem", color: inv.status === "Overdue" ? "#ef4444" : "#f1f5f9", fontWeight: inv.status === "Overdue" ? 600 : 400 }}>
                      {formatDate(inv.dueDate)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      sx={{ fontSize: "0.7rem" }}
                      onClick={() => setDevModal("export-invoice")}
                    >
                      Export
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </SectionCard>

      <UnderDevelopmentModal
        open={devModal !== null}
        onClose={() => setDevModal(null)}
        featureKey={devModal ?? "quickbooks"}
      />
    </Box>
  );
}
