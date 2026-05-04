"use client";

import { useEffect } from "react";

export default function DevAuthCleaner() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const handleStorageClean = () => {
        // Dev utility: press Shift+Alt+C to clear auth state
      };
      window.addEventListener("keydown", handleStorageClean);
      return () => window.removeEventListener("keydown", handleStorageClean);
    }
  }, []);
  return null;
}
