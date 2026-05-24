"use client";

import { Box, Grid, Typography, Button, Chip, Divider } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@/components/ui/Modal";
import type { RegistrationRequest } from "@/app/(dashboard)/activity/_data";
import { formatDateTime } from "@/lib/utils/formatters";

interface CustomerRegistrationModalProps {
  open: boolean;
  request: RegistrationRequest | null;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.7rem" }}>{label}</Typography>
      <Typography sx={{ color: "#f1f5f9", fontWeight: 500, fontSize: "0.875rem" }}>{value}</Typography>
    </Box>
  );
}

export default function CustomerRegistrationModal({
  open,
  request,
  onClose,
  onApprove,
  onReject,
}: CustomerRegistrationModalProps) {
  if (!request) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Customer Registration"
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
      <Chip label="Pending Review" size="small" sx={{ mb: 2, backgroundColor: "rgba(245,158,11,0.15)", color: "#fbbf24", fontWeight: 600 }} />

      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6}><Detail label="Business Name" value={request.name} /></Grid>
        <Grid item xs={12} sm={6}><Detail label="Business Type" value={request.businessType} /></Grid>
        <Grid item xs={12} sm={6}><Detail label="Email" value={request.email} /></Grid>
        <Grid item xs={12} sm={6}><Detail label="Phone" value={request.phone} /></Grid>
        <Grid item xs={12}><Detail label="Address" value={request.address} /></Grid>
        <Grid item xs={12} sm={6}><Detail label="Submitted" value={formatDateTime(request.submittedAt)} /></Grid>
        {request.notes && (
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <Detail label="Notes" value={request.notes} />
          </Grid>
        )}
      </Grid>
    </Modal>
  );
}
