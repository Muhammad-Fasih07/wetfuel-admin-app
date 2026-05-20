"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  dangerous?: boolean;
  loading?: boolean;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  dangerous,
  loading,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        {dangerous && (
          <WarningAmberIcon sx={{ color: "#f59e0b", fontSize: 22 }} />
        )}
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ color: "#64748b" }}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button variant="outlined" onClick={onCancel} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={loading}
          sx={
            dangerous
              ? {
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  "&:hover": { background: "linear-gradient(135deg, #dc2626, #b91c1c)" },
                }
              : {}
          }
        >
          {loading ? "Loading..." : confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
