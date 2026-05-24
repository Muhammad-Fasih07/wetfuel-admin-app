"use client";

import { Box, Grid, Typography, Button, Chip, Divider } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@/components/ui/Modal";
import type { PendingQrRequest } from "@/app/(dashboard)/qr-codes/_data";
import { formatDateTime } from "@/lib/utils/formatters";

interface PendingRequestModalProps {
  open: boolean;
  request: PendingQrRequest | null;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function PendingRequestModal({
  open,
  request,
  onClose,
  onApprove,
  onReject,
}: PendingRequestModalProps) {
  if (!request) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Registration Request"
      maxWidth="md"
      actions={
        <>
          <Button variant="outlined" onClick={onClose}>Close</Button>
          <Button
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={() => onReject(request.id)}
            sx={{ borderColor: "#ef4444", color: "#ef4444", "&:hover": { borderColor: "#dc2626", backgroundColor: "rgba(239,68,68,0.08)" } }}
          >
            Reject
          </Button>
          <Button
            variant="contained"
            startIcon={<CheckIcon />}
            onClick={() => onApprove(request.id)}
            sx={{ background: "linear-gradient(135deg, #22c55e, #16a34a)", "&:hover": { background: "linear-gradient(135deg, #16a34a, #15803d)" } }}
          >
            Approve
          </Button>
        </>
      }
    >
      <Box sx={{ mb: 2 }}>
        <Chip label="Pending Review" size="small" sx={{ backgroundColor: "rgba(245,158,11,0.15)", color: "#fbbf24", fontWeight: 600 }} />
      </Box>

      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6}>
          <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.7rem" }}>Customer</Typography>
          <Typography sx={{ fontWeight: 600, color: "#f1f5f9" }}>{request.customerName}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.7rem" }}>Equipment</Typography>
          <Typography sx={{ fontWeight: 600, color: "#f1f5f9" }}>{request.equipmentName}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.7rem" }}>Fuel Type</Typography>
          <Typography sx={{ color: "#f1f5f9" }}>{request.fuelType}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.7rem" }}>Max Capacity</Typography>
          <Typography sx={{ color: "#f1f5f9" }}>{request.maxCapacity} gal</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.7rem" }}>Location</Typography>
          <Typography sx={{ color: "#f1f5f9" }}>{request.location}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.7rem" }}>Submitted</Typography>
          <Typography sx={{ color: "#f1f5f9" }}>{formatDateTime(request.submittedAt)}</Typography>
        </Grid>
        {request.notes && (
          <Grid item xs={12}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.7rem" }}>Notes</Typography>
            <Typography sx={{ color: "#f1f5f9", mt: 0.5 }}>{request.notes}</Typography>
          </Grid>
        )}
      </Grid>
    </Modal>
  );
}
