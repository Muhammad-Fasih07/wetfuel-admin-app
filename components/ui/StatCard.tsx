"use client";

import { Box, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  trend?: number;
  trendLabel?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconBg,
  iconColor,
  trend,
  trendLabel,
}: StatCardProps) {
  const isPositive = (trend ?? 0) >= 0;

  return (
    <Box
      sx={{
        background: "white",
        borderRadius: "14px",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        p: 3,
        display: "flex",
        gap: 2,
        alignItems: "flex-start",
        transition: "box-shadow 250ms",
        "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: "12px",
          backgroundColor: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          color: iconColor,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="caption"
          sx={{
            color: "#887b6a",
            fontWeight: 500,
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "#2b2b2b", mt: 0.25, lineHeight: 1.2 }}
        >
          {value}
        </Typography>
        {(trend !== undefined || subtitle) && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.75 }}>
            {trend !== undefined && (
              <>
                {isPositive ? (
                  <TrendingUpIcon sx={{ fontSize: 14, color: "#22c55e" }} />
                ) : (
                  <TrendingDownIcon sx={{ fontSize: 14, color: "#ef4444" }} />
                )}
                <Typography
                  variant="caption"
                  sx={{
                    color: isPositive ? "#22c55e" : "#ef4444",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                  }}
                >
                  {isPositive ? "+" : ""}
                  {trend}%
                </Typography>
              </>
            )}
            {trendLabel && (
              <Typography
                variant="caption"
                sx={{ color: "#9ca3af", fontSize: "0.7rem" }}
              >
                {trendLabel}
              </Typography>
            )}
            {subtitle && !trend && (
              <Typography
                variant="caption"
                sx={{ color: "#9ca3af", fontSize: "0.7rem" }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
