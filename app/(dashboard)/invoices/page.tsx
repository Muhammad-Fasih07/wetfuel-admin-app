"use client";

import { useState } from "react";
import { Box, Button, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography, TextField, InputAdornment, MenuItem } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import { formatDate, formatCurrency } from "@/lib/utils/formatters";

const mockInvoices = [
  { id: "inv1", invoiceNumber: "INV-2024-0041", customerName: "Capitol Fleet Services", amount: 8420.50, status: "Paid", date: "2024-11-01", dueDate: "2024-11-15" },
  { id: "inv2", invoiceNumber: "INV-2024-0042", customerName: "Lone Star Agriculture", amount: 14830.00, status: "Outstanding", date: "2024-11-03", dueDate: "2024-11-17" },
  { id: "inv3", invoiceNumber: "INV-2024-0043", customerName: "Austin Construction LLC", amount: 3210.25, status: "Outstanding", date: "2024-11-05", dueDate: "2024-11-19" },
  { id: "inv4", invoiceNumber: "INV-2024-0044", customerName: "Capitol Fleet Services", amount: 6950.75, status: "Draft", date: "2024-11-07", dueDate: "2024-11-21" },
  { id: "inv5", invoiceNumber: "INV-2024-0045", customerName: "Austin Construction LLC", amount: 293.23, status: "Paid", date: "2024-11-06", dueDate: "2024-11-20" },
  { id: "inv6", invoiceNumber: "INV-2024-0040", customerName: "Lone Star Agriculture", amount: 22180.00, status: "Overdue", date: "2024-10-15", dueDate: "2024-10-29" },
];

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  Paid: { bg: "rgba(34,197,94,0.15)", color: "#4ade80" },
  Outstanding: { bg: "rgba(59,130,246,0.15)", color: "#60a5fa" },
  Draft: { bg: "rgba(255,255,255,0.08)", color: "#94a3b8" },
  Overdue: { bg: "rgba(239,68,68,0.15)", color: "#f87171" },
};

const STATUSES = ["All", "Draft", "Outstanding", "Paid", "Overdue"];

export default function InvoicesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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
        action={<Button variant="contained" startIcon={<DownloadIcon />}>Export to QuickBooks</Button>}
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
              const sc = STATUS_COLORS[inv.status] || { bg: "rgba(255,255,255,0.08)", color: "#94a3b8" };
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
                    <Button size="small" variant="outlined" startIcon={<DownloadIcon />} sx={{ fontSize: "0.7rem" }}>Export</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </SectionCard>
    </Box>
  );
}
