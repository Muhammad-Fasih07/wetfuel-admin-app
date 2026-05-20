"use client";

import { Box, Typography } from "@mui/material";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

interface BrandMarkProps {
  size?: "sm" | "md" | "lg";
  dark?: boolean;
}

export default function BrandMark({ size = "md", dark = false }: BrandMarkProps) {
  const sizes = { sm: 28, md: 40, lg: 56 };
  const iconSizes = { sm: 16, md: 22, lg: 32 };
  const fontSizes = { sm: "0.9rem", md: "1.15rem", lg: "1.5rem" };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Box
        sx={{
          width: sizes[size],
          height: sizes[size],
          borderRadius: "10px",
          background: "linear-gradient(135deg, #cd171a, #ce1c1a, #bf2524)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 16px rgba(206,28,26,0.3)",
          flexShrink: 0,
        }}
      >
        <LocalGasStationIcon sx={{ fontSize: iconSizes[size], color: "white" }} />
      </Box>
      <Box>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: fontSizes[size],
            color: dark ? "#f1f5f9" : "white",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          WetFuel
        </Typography>
        <Typography
          sx={{
            fontSize: "0.6rem",
            color: dark ? "#64748b" : "rgba(255,255,255,0.55)",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            lineHeight: 1,
            mt: 0.25,
          }}
        >
          Admin Panel
        </Typography>
      </Box>
    </Box>
  );
}
