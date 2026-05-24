"use client";

import { Box, Grid, Typography, Button, Chip, Divider } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import Modal from "@/components/ui/Modal";
import type { ChangeRequest } from "@/app/(dashboard)/activity/_data";
import { formatDateTime } from "@/lib/utils/formatters";

interface ChangeRequestModalProps {
  open: boolean;
  request: ChangeRequest | null;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <Box
      sx={{
        height: 100,
        borderRadius: "10px",
        border: "1px dashed rgba(255,255,255,0.15)",
        backgroundColor: "#252528",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.5,
      }}
    >
      <ImageIcon sx={{ color: "#64748b", fontSize: 28 }} />
      <Typography sx={{ fontSize: "0.65rem", color: "#64748b", textAlign: "center", px: 1 }}>{label}</Typography>
    </Box>
  );
}

export default function ChangeRequestModal({
  open,
  request,
  onClose,
  onApprove,
  onReject,
}: ChangeRequestModalProps) {
  if (!request) return null;

  const isPhotoUpdate = request.type === "Location Photo Update";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Change Request Preview"
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
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <Chip label={request.type} size="small" sx={{ backgroundColor: "rgba(59,130,246,0.15)", color: "#60a5fa", fontWeight: 600 }} />
        <Chip label="Pending" size="small" sx={{ backgroundColor: "rgba(245,158,11,0.15)", color: "#fbbf24", fontWeight: 600 }} />
      </Box>

      <Typography sx={{ fontWeight: 600, color: "#f1f5f9", mb: 2 }}>{request.customer}</Typography>
      <Typography sx={{ fontSize: "0.75rem", color: "#64748b", mb: 3 }}>
        Submitted {formatDateTime(request.submittedAt)}
      </Typography>

      {isPhotoUpdate ? (
        <>
          <Typography variant="subtitle2" sx={{ mb: 1.5, color: "#64748b", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Photo Comparison
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8", mb: 1, fontWeight: 600 }}>Current Photos</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {request.currentPhotos?.map((photo, i) => (
                  <PhotoPlaceholder key={i} label={photo} />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontSize: "0.75rem", color: "#fbbf24", mb: 1, fontWeight: 600 }}>New Photos</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {request.requestedPhotos?.map((photo, i) => (
                  <PhotoPlaceholder key={i} label={photo} />
                ))}
              </Box>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Typography variant="subtitle2" sx={{ mb: 1.5, color: "#64748b", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Location Comparison
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 2, borderRadius: "10px", border: "1px solid rgba(255,255,255,0.07)", backgroundColor: "#252528" }}>
                <Typography sx={{ fontSize: "0.7rem", color: "#64748b", mb: 0.5 }}>Current Location</Typography>
                <Typography sx={{ fontSize: "0.875rem", color: "#94a3b8" }}>{request.currentLocation ?? request.current}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 2, borderRadius: "10px", border: "1px solid rgba(245,158,11,0.3)", backgroundColor: "rgba(245,158,11,0.08)" }}>
                <Typography sx={{ fontSize: "0.7rem", color: "#fbbf24", mb: 0.5 }}>Requested Location</Typography>
                <Typography sx={{ fontSize: "0.875rem", color: "#f1f5f9", fontWeight: 500 }}>{request.requestedLocation ?? request.requested}</Typography>
              </Box>
            </Grid>
          </Grid>
        </>
      )}

      <Divider />
    </Modal>
  );
}
