import { Box } from "@mui/material";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import AuthGuard from "@/components/layout/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
        <Sidebar />
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <Topbar />
          <Box component="main" sx={{ flex: 1, p: 3, overflowX: "hidden" }}>
            {children}
          </Box>
        </Box>
      </Box>
    </AuthGuard>
  );
}
