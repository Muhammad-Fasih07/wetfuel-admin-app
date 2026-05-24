"use client";

import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";
import PrintIcon from "@mui/icons-material/Print";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import QRCodeCard from "@/components/qr-codes/QRCodeCard";
import PendingRequestModal from "@/components/qr-codes/PendingRequestModal";
import UnderDevelopmentModal, { type DevFeatureKey } from "@/components/ui/UnderDevelopmentModal";
import BulkGenerateModal, { generateUnassignedQrCodes, type BulkGenerateData } from "@/components/qr-codes/BulkGenerateModal";
import {
  mockPendingRequests,
  mockRegisteredCodes,
  type PendingQrRequest,
  type RegisteredQrCode,
} from "./_data";
import { formatDateTime } from "@/lib/utils/formatters";
import { useUIStore } from "@/store/uiStore";

export default function QRCodesPage() {
  const { addToast } = useUIStore();
  const [pendingRequests, setPendingRequests] = useState<PendingQrRequest[]>(mockPendingRequests);
  const [registeredCodes, setRegisteredCodes] = useState<RegisteredQrCode[]>(mockRegisteredCodes);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<PendingQrRequest | null>(null);
  const [devModal, setDevModal] = useState<DevFeatureKey | null>(null);
  const [bulkOpen, setBulkOpen] = useState(false);

  const toggleSelect = (code: string) => {
    setSelectedCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const handleApprove = (id: string) => {
    const req = pendingRequests.find((r) => r.id === id);
    if (!req) return;

    const newCode: RegisteredQrCode = {
      code: `QR-${String(registeredCodes.length + 1).padStart(4, "0")}`,
      assignmentStatus: "assigned",
      customer: req.customerName,
      equipment: req.equipmentName,
      fuelType: req.fuelType,
    };

    setRegisteredCodes((prev) => [...prev, newCode]);
    setPendingRequests((prev) => prev.filter((r) => r.id !== id));
    setSelectedRequest(null);
    addToast({ type: "success", message: `QR code approved for ${req.equipmentName}.` });
  };

  const handleReject = (id: string) => {
    const req = pendingRequests.find((r) => r.id === id);
    setPendingRequests((prev) => prev.filter((r) => r.id !== id));
    setSelectedRequest(null);
    addToast({ type: "warning", message: `Registration request for ${req?.equipmentName ?? "equipment"} rejected.` });
  };

  const handleBulkGenerate = (data: BulkGenerateData) => {
    const newCodes = generateUnassignedQrCodes(data.quantity, registeredCodes);
    setRegisteredCodes((prev) => [...prev, ...newCodes]);
    addToast({
      type: "success",
      message: `${newCodes.length} unassigned QR code(s) generated — ready to print and install.`,
    });
  };

  const unassignedCount = registeredCodes.filter((c) => c.assignmentStatus === "unassigned").length;

  return (
    <Box>
      <PageHeader
        title="QR Codes"
        subtitle="Manage equipment QR codes and registration requests"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "QR Codes" }]}
        action={
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button variant="outlined" startIcon={<PrintIcon />} onClick={() => setDevModal("print")}>
              Print Selected{selectedCodes.length > 0 ? ` (${selectedCodes.length})` : ""}
            </Button>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setDevModal("register")}>
              Register Equipment
            </Button>
          </Box>
        }
      />

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
                      <Tooltip title="View details">
                        <IconButton size="small" onClick={() => setSelectedRequest(req)} sx={{ color: "#60a5fa" }}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SectionCard>
        </Box>
      )}

      <SectionCard
        title="Registered QR Codes"
        subtitle={`${registeredCodes.length} codes total${unassignedCount > 0 ? ` · ${unassignedCount} unassigned (awaiting customer scan)` : ""}`}
        action={
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button size="small" startIcon={<QrCodeIcon />} variant="outlined" sx={{ fontSize: "0.75rem" }} onClick={() => setBulkOpen(true)}>
              Bulk Generate
            </Button>
            <Button size="small" startIcon={<PrintIcon />} variant="outlined" sx={{ fontSize: "0.75rem" }} onClick={() => setDevModal("print")}>
              Print All
            </Button>
          </Box>
        }
      >
        <Typography sx={{ fontSize: "0.75rem", color: "#64748b", mb: 2 }}>
          Unassigned codes are printed and installed on equipment — customer scan auto-links them here for approval
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {registeredCodes.map((item) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={item.code}>
              <QRCodeCard
                code={item.code}
                label={item.equipment ?? undefined}
                unassigned={item.assignmentStatus === "unassigned"}
                selectable
                selected={selectedCodes.includes(item.code)}
                onSelect={toggleSelect}
              />
            </Grid>
          ))}
        </Grid>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Equipment</TableCell>
              <TableCell>Fuel Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registeredCodes.map((item) => (
              <TableRow key={item.code} hover>
                <TableCell><Typography sx={{ fontFamily: "monospace", fontWeight: 700, fontSize: "0.8rem" }}>{item.code}</Typography></TableCell>
                <TableCell>
                  <Chip
                    label={item.assignmentStatus === "unassigned" ? "Unassigned" : "Assigned"}
                    size="small"
                    sx={{
                      fontSize: "0.65rem",
                      backgroundColor: item.assignmentStatus === "unassigned" ? "rgba(245,158,11,0.15)" : "rgba(34,197,94,0.15)",
                      color: item.assignmentStatus === "unassigned" ? "#fbbf24" : "#4ade80",
                    }}
                  />
                </TableCell>
                <TableCell>{item.customer ?? "—"}</TableCell>
                <TableCell>{item.equipment ?? "—"}</TableCell>
                <TableCell>
                  {item.fuelType ? (
                    <Chip label={item.fuelType} size="small" sx={{ fontSize: "0.7rem" }} />
                  ) : (
                    <Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>—</Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>

      <PendingRequestModal
        open={!!selectedRequest}
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
      <UnderDevelopmentModal
        open={devModal !== null}
        onClose={() => setDevModal(null)}
        featureKey={devModal ?? "print"}
      />
      <BulkGenerateModal
        open={bulkOpen}
        onClose={() => setBulkOpen(false)}
        onSubmit={handleBulkGenerate}
      />
    </Box>
  );
}
