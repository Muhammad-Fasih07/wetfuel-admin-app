"use client";

import { Box, Paper } from "@mui/material";
import BrandMark from "./BrandMark";

interface AuthCardProps {
  children: React.ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <Box
      className="auth-bg"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 420,
          animation: "slideUp 0.4s ease-out",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <BrandMark size="lg" />
        </Box>
        <Paper
          elevation={0}
          sx={{
            borderRadius: "20px",
            p: 4,
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.4), 0 0 40px rgba(206,28,26,0.08)",
          }}
        >
          {children}
        </Paper>
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Box
            component="span"
            sx={{
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.25)",
              fontWeight: 400,
            }}
          >
            © 2024 WetFuel Inc. — Internal Use Only
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
