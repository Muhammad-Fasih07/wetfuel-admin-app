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
            separator={<NavigateNextIcon sx={{ fontSize: 14 }} />}
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
                    color: "#887b6a",
                    fontWeight: 500,
                  }}
                >
                  {crumb.label}
                </MuiLink>
              ) : (
                <Typography
                  key={i}
                  sx={{ fontSize: "0.75rem", color: "#2b2b2b", fontWeight: 500 }}
                >
                  {crumb.label}
                </Typography>
              )
            )}
          </Breadcrumbs>
        )}
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "#2b2b2b", lineHeight: 1.3 }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="body2"
            sx={{ color: "#887b6a", mt: 0.25, fontWeight: 400 }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
    </Box>
  );
}
