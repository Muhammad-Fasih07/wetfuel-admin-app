"use client";

import { Box, Typography, Button } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        px: 4,
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          backgroundColor: "#252528",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
          color: "#475569",
        }}
      >
        {icon || <InboxIcon sx={{ fontSize: 36 }} />}
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 600, color: "#f1f5f9", mb: 0.5 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" sx={{ color: "#64748b", maxWidth: 360 }}>
          {description}
        </Typography>
      )}
      {action && (
        <Button variant="contained" onClick={action.onClick} sx={{ mt: 3 }}>
          {action.label}
        </Button>
      )}
    </Box>
  );
}
