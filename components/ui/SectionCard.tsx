"use client";

import { Box, Typography } from "@mui/material";

interface SectionCardProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  noPadding?: boolean;
}

export default function SectionCard({
  title,
  subtitle,
  action,
  children,
  noPadding,
}: SectionCardProps) {
  return (
    <Box
      sx={{
        background: "#1c1c1e",
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        overflow: "hidden",
      }}
    >
      {(title || action) && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            py: 2,
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <Box>
            {title && (
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#f1f5f9" }}>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="caption" sx={{ color: "#64748b" }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          {action && <Box>{action}</Box>}
        </Box>
      )}
      <Box sx={noPadding ? {} : { p: 3 }}>{children}</Box>
    </Box>
  );
}
