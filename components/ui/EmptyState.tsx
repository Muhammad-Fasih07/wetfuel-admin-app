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
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
          color: "#d1d5db",
        }}
      >
        {icon || <InboxIcon sx={{ fontSize: 36 }} />}
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 600, color: "#2b2b2b", mb: 0.5 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" sx={{ color: "#887b6a", maxWidth: 360 }}>
          {description}
        </Typography>
      )}
      {action && (
        <Button
          variant="contained"
          onClick={action.onClick}
          sx={{ mt: 3 }}
        >
          {action.label}
        </Button>
      )}
    </Box>
  );
}
