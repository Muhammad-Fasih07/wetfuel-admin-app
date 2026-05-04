"use client";

import { CircularProgress, Box } from "@mui/material";

interface SpinnerProps {
  size?: number;
  fullPage?: boolean;
}

export default function Spinner({ size = 40, fullPage }: SpinnerProps) {
  if (fullPage) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress size={size} sx={{ color: "#ce1c1a" }} />
      </Box>
    );
  }
  return <CircularProgress size={size} sx={{ color: "#ce1c1a" }} />;
}
