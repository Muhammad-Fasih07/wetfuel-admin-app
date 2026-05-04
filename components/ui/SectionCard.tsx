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
        background: "white",
        borderRadius: "14px",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
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
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <Box>
            {title && (
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: "#2b2b2b" }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="caption" sx={{ color: "#887b6a" }}>
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
