"use client";

import { useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useUIStore } from "@/store/uiStore";

export default function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  return (
    <>
      {toasts.map((toast, i) => (
        <Snackbar
          key={toast.id}
          open
          autoHideDuration={4000}
          onClose={() => removeToast(toast.id)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ mt: i * 7 }}
        >
          <Alert
            onClose={() => removeToast(toast.id)}
            severity={toast.type}
            variant="filled"
            sx={{ borderRadius: "10px", minWidth: 280 }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
}
