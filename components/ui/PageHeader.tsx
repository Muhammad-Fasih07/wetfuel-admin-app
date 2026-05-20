"use client";

import { Box, Typography, Breadcrumbs, Link as MuiLink } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  action?: React.ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  action,
}: PageHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        mb: 3,
        gap: 2,
      }}
    >
      <Box>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs
            separator={<NavigateNextIcon sx={{ fontSize: 14, color: "#475569" }} />}
            sx={{ mb: 0.5 }}
          >
            {breadcrumbs.map((crumb, i) =>
              crumb.href ? (
                <MuiLink
                  key={i}
                  component={Link}
                  href={crumb.href}
                  underline="hover"
                  sx={{
                    fontSize: "0.75rem",
                    color: "#64748b",
                    fontWeight: 500,
                  }}
                >
                  {crumb.label}
                </MuiLink>
              ) : (
                <Typography
                  key={i}
                  sx={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 500 }}
                >
                  {crumb.label}
                </Typography>
              )
            )}
          </Breadcrumbs>
        )}
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#f1f5f9", lineHeight: 1.3 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" sx={{ color: "#64748b", mt: 0.25, fontWeight: 400 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
    </Box>
  );
}
