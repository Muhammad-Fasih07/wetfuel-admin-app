"use client";

import { Box, Typography, Button, Alert } from "@mui/material";
import { useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

export default function DangerPanel() {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Alert severity="error" sx={{ mb: 3, borderRadius: "10px" }}>
        Actions in this section are irreversible. Proceed with extreme caution.
      </Alert>

      <Box sx={{ p: 3, borderRadius: "12px", border: "1px solid #fee2e2", backgroundColor: "#fff5f5" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#dc2626", mb: 0.5 }}>
          Deactivate Account
        </Typography>
        <Typography variant="body2" sx={{ color: "#887b6a", mb: 2 }}>
          Permanently deactivate this admin account. You will lose access immediately and all data will be retained for audit purposes.
        </Typography>
        <Button
          variant="outlined"
          sx={{ borderColor: "#ef4444", color: "#ef4444", "&:hover": { backgroundColor: "#fee2e2" } }}
          onClick={() => setOpen(true)}
        >
          Deactivate Account
        </Button>
      </Box>

      <ConfirmDialog
        open={open}
        title="Deactivate Account"
        message="Are you absolutely sure you want to deactivate this admin account? This action cannot be undone."
        confirmLabel="Yes, Deactivate"
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        dangerous
      />
    </Box>
  );
}
