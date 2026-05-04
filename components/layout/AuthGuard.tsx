"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";
import { useAuthStore } from "@/store/authStore";

// Track hydration globally so we only wait once per page load, not on every navigation
let hasHydrated = false;

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hydratedRef = useRef(hasHydrated);

  useEffect(() => {
    // Mark hydrated globally after first mount
    hasHydrated = true;
    hydratedRef.current = true;

    if (!isAuthenticated) {
      router.replace("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Handle logout from any page
    if (hydratedRef.current && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  // Only block render on very first load (before hydration from localStorage)
  if (!hasHydrated && !isAuthenticated) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CircularProgress sx={{ color: "#ce1c1a" }} />
      </Box>
    );
  }

  return <>{children}</>;
}
