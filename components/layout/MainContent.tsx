"use client";

import { Box } from "@mui/material";
import { useUIStore } from "@/store/uiStore";

export default function MainContent({ children }: { children: React.ReactNode }) {
  const sidebarCollapsed = useUIStore((s) => s.sidebarCollapsed);
  const sidebarWidth = sidebarCollapsed ? 68 : 220;

  return (
    <Box
      sx={{
        marginLeft: `${sidebarWidth}px`,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        height: "100vh",
        overflow: "hidden",
        transition: "margin-left 250ms cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {children}
    </Box>
  );
}
