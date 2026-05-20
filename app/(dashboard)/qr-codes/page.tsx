"use client";

import { Box, Grid, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Chip, Paper } from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";
import PrintIcon from "@mui/icons-material/Print";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import { formatDateTime } from "@/lib/utils/formatters";

const pendingRequests = [
  { id: "qr1", customerId: "cu1", customerName: "Austin Construction LLC", equipmentName: "Compactor #3", status: "Pending", submittedAt: "2024-11-08T10:00:00Z" },
  { id: "qr2", customerId: "cu4", customerName: "Zenith Logistics Corp", equipmentName: "Fleet Truck #201", status: "Pending", submittedAt: "2024-11-08T09:00:00Z" },
];

const registeredCodes = [
  { code: "QR-0001", customer: "Austin Construction LLC", equipment: "Excavator CAT 320", fuelType: "Diesel" },
  { code: "QR-0002", customer: "Austin Construction LLC", equipment: "Bulldozer D6", fuelType: "Diesel" },
  { code: "QR-0010", customer: "Capitol Fleet Services", equipment: "Fleet Van #001", fuelType: "Regular" },
  { code: "QR-0011", customer: "Capitol Fleet Services", equipment: "Fleet Van #002", fuelType: "Regular" },
  { code: "QR-0012", customer: "Capitol Fleet Services", equipment: "Fleet Truck #101", fuelType: "Diesel" },
  { code: "QR-0020", customer: "Lone Star Agriculture", equipment: "John Deere 8R 410", fuelType: "Diesel" },
  { code: "QR-0021", customer: "Lone Star Agriculture", equipment: "Case IH Harvester", fuelType: "Diesel" },
  { code: "QR-0030", customer: "TXPower Generation", equipment: "Generator G500", fuelType: "Diesel" },
];

function QRCodeBadge({ code }: { code: string }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        cursor: "pointer",
        transition: "all 150ms",
        "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "8px",
          backgroundColor: "#252528",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid #e5e7eb",
        }}
      >
        <QrCodeIcon sx={{ fontSize: 48, color: "#f1f5f9" }} />
      </Box>
      <Typography sx={{ fontSize: "0.7rem", fontFamily: "monospace", fontWeight: 700, color: "#f1f5f9" }}>
        {code}
      </Typography>
    </Paper>
  );
}

export default function QRCodesPage() {
  return (
    <Box>
      <PageHeader
        title="QR Codes"
        subtitle="Manage equipment QR codes and registration requests"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "QR Codes" }]}
        action={
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button variant="outlined" startIcon={<PrintIcon />}>Print Selected</Button>
            <Button variant="contained" startIcon={<AddIcon />}>Register Equipment</Button>
          </Box>
        }
      />

      {/* Pending Registration Requests */}
      {pendingRequests.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <SectionCard
            title={`Pending QR Registration Requests (${pendingRequests.length})`}
            subtitle="Customer-submitted registration requests awaiting approval"
            noPadding
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer</TableCell>
                  <TableCell>Equipment</TableCell>
                  <TableCell>Submitted</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingRequests.map((req) => (
                  <TableRow key={req.id} hover>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, fontSize: "0.875rem" }}>{req.customerName}</Typography>
                    </TableCell>
                    <TableCell>{req.equipmentName}</TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: "0.8rem", color: "#64748b" }}>{formatDateTime(req.submittedAt)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label="Pending" size="small" sx={{ backgroundColor: "rgba(245,158,11,0.15)", color: "#fbbf24", fontWeight: 600 }} />
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                        <Button size="small" variant="outlined" startIcon={<CheckIcon />} sx={{ borderColor: "#22c55e", color: "#22c55e", fontSize: "0.75rem" }}>
                          Approve
                        </Button>
                        <Button size="small" variant="outlined" startIcon={<CloseIcon />} sx={{ borderColor: "#ef4444", color: "#ef4444", fontSize: "0.75rem" }}>
                          Reject
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SectionCard>
        </Box>
      )}

      {/* Registered QR Codes */}
      <SectionCard
        title="Registered QR Codes"
        subtitle={`${registeredCodes.length} codes registered`}
        action={<Button size="small" startIcon={<PrintIcon />} variant="outlined" sx={{ fontSize: "0.75rem" }}>Print All</Button>}
      >
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {registeredCodes.map((item) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={item.code}>
              <QRCodeBadge code={item.code} />
            </Grid>
          ))}
        </Grid>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Equipment</TableCell>
              <TableCell>Fuel Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registeredCodes.map((item) => (
              <TableRow key={item.code} hover>
                <TableCell><Typography sx={{ fontFamily: "monospace", fontWeight: 700, fontSize: "0.8rem" }}>{item.code}</Typography></TableCell>
                <TableCell>{item.customer}</TableCell>
                <TableCell>{item.equipment}</TableCell>
                <TableCell>
                  <Chip label={item.fuelType} size="small" sx={{ fontSize: "0.7rem" }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </Box>
  );
}
