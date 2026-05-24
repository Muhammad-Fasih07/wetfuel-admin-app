"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { cardHoverBorderSx } from "@/lib/theme/cardStyles";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  trend?: number;
  trendLabel?: string;
  href?: string;
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
  href,
}: StatCardProps) {
  const isPositive = (trend ?? 0) >= 0;

  const cardSx = {
    background: "#1c1c1e",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.07)",
    boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
    p: 3,
    display: "flex",
    gap: 2,
    alignItems: "flex-start",
    transition: "box-shadow 250ms, transform 150ms, border-color 150ms",
    ...cardHoverBorderSx,
    ...(href && {
      textDecoration: "none",
      cursor: "pointer",
      "&:hover": {
        ...cardHoverBorderSx["&:hover"],
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        transform: "translateY(-2px)",
      },
    }),
    ...(!href && {
      "&:hover": {
        ...cardHoverBorderSx["&:hover"],
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      },
    }),
  };

  const content = (
    <>
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
            color: "#64748b",
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
          sx={{ fontWeight: 700, color: "#f1f5f9", mt: 0.25, lineHeight: 1.2 }}
        >
          {value}
        </Typography>
        {(trend !== undefined || subtitle) && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.75 }}>
            {trend !== undefined && (
              <>
                {isPositive ? (
                  <TrendingUpIcon sx={{ fontSize: 14, color: "#4ade80" }} />
                ) : (
                  <TrendingDownIcon sx={{ fontSize: 14, color: "#f87171" }} />
                )}
                <Typography
                  variant="caption"
                  sx={{
                    color: isPositive ? "#4ade80" : "#f87171",
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
              <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.7rem" }}>
                {trendLabel}
              </Typography>
            )}
            {subtitle && !trend && (
              <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.7rem" }}>
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </>
  );

  if (href) {
    return (
      <Box component={Link} href={href} sx={cardSx}>
        {content}
      </Box>
    );
  }

  return <Box sx={cardSx}>{content}</Box>;
}
