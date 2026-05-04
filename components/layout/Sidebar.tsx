"use client";

import { Box, Tooltip, IconButton, Typography, Avatar } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/store/uiStore";
import { useAuth } from "@/lib/hooks/useAuth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BusinessIcon from "@mui/icons-material/Business";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssignmentIcon from "@mui/icons-material/Assignment";
import QrCodeIcon from "@mui/icons-material/QrCode";
import ReceiptIcon from "@mui/icons-material/Receipt";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface NavLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

const NAV_LINKS: NavLink[] = [
  { label: "Dashboard", href: "/", icon: <DashboardIcon sx={{ fontSize: 18 }} /> },
  { label: "Drivers", href: "/drivers", icon: <PersonIcon sx={{ fontSize: 18 }} /> },
  { label: "Trucks", href: "/trucks", icon: <LocalShippingIcon sx={{ fontSize: 18 }} /> },
  { label: "Customers", href: "/customers", icon: <BusinessIcon sx={{ fontSize: 18 }} /> },
  { label: "Inventory", href: "/inventory", icon: <InventoryIcon sx={{ fontSize: 18 }} /> },
  { label: "Jobs", href: "/jobs", icon: <AssignmentIcon sx={{ fontSize: 18 }} /> },
  { label: "QR Codes", href: "/qr-codes", icon: <QrCodeIcon sx={{ fontSize: 18 }} /> },
  { label: "Invoices", href: "/invoices", icon: <ReceiptIcon sx={{ fontSize: 18 }} /> },
  { label: "Activity", href: "/activity", icon: <NotificationsIcon sx={{ fontSize: 18 }} /> },
  { label: "Reporting", href: "/reporting", icon: <BarChartIcon sx={{ fontSize: 18 }} />, badge: 7 },
  { label: "Settings", href: "/settings", icon: <SettingsIcon sx={{ fontSize: 18 }} /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const { logout, user } = useAuth();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "SA";

  return (
    <Box
      component="aside"
      style={{ backgroundColor: "#141414" }}
      sx={{
        width: sidebarCollapsed ? 68 : 220,
        minHeight: "100vh",
        backgroundColor: "#141414 !important",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        transition: "width 250ms cubic-bezier(0.4,0,0.2,1)",
        overflow: "hidden",
        position: "sticky",
        top: 0,
        zIndex: 100,
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* ── Header ── */}
      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: sidebarCollapsed ? "center" : "space-between",
          px: sidebarCollapsed ? 1 : 2,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
          gap: 1,
        }}
      >
        {!sidebarCollapsed && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, minWidth: 0 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                backgroundColor: "#1e1e1e",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              <Image
                src="/wetfeullogo.png"
                alt="WetFuel"
                width={26}
                height={26}
                style={{ objectFit: "contain" }}
              />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: "0.9rem", fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>
                WetFuel
              </Typography>
              <Typography sx={{ fontSize: "0.58rem", fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}>
                FRANCHISE ADMIN
              </Typography>
            </Box>
          </Box>
        )}

        {sidebarCollapsed && (
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              backgroundColor: "#1e1e1e",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Image
              src="/wetfeullogo.png"
              alt="WetFuel"
              width={26}
              height={26}
              style={{ objectFit: "contain" }}
            />
          </Box>
        )}

        <Tooltip title={sidebarCollapsed ? "Expand" : "Collapse"} placement="right">
          <IconButton
            onClick={toggleSidebar}
            size="small"
            sx={{
              color: "rgba(255,255,255,0.3)",
              flexShrink: 0,
              "&:hover": { color: "rgba(255,255,255,0.8)", backgroundColor: "rgba(255,255,255,0.06)" },
            }}
          >
            {sidebarCollapsed ? (
              <MenuIcon sx={{ fontSize: 17 }} />
            ) : (
              <MenuOpenIcon sx={{ fontSize: 17 }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      {/* ── Section label ── */}
      {!sidebarCollapsed && (
        <Box sx={{ px: 2.5, pt: 2.5, pb: 0.75 }}>
          <Typography
            sx={{
              fontSize: "0.6rem",
              fontWeight: 600,
              color: "rgba(255,255,255,0.28)",
              letterSpacing: "0.1em",
              display: "flex",
              alignItems: "center",
              gap: 0.75,
            }}
          >
            — MAIN MENU
          </Typography>
        </Box>
      )}

      {/* ── Navigation ── */}
      <Box
        component="nav"
        sx={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          py: 0.5,
          px: 1,
          display: "flex",
          flexDirection: "column",
          gap: 0.25,
          "&::-webkit-scrollbar": { width: 0 },
        }}
      >
        {NAV_LINKS.map((link) => {
          const active = isActive(link.href);
          const item = (
            <Box
              key={link.href}
              component={Link}
              href={link.href}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                px: sidebarCollapsed ? 0 : 1.5,
                py: 1,
                borderRadius: "10px",
                color: active ? "#ffffff" : "rgba(255,255,255,0.5)",
                textDecoration: "none",
                transition: "all 150ms",
                position: "relative",
                /* active: dark-red semi-transparent fill + left red border */
                backgroundColor: active
                  ? "rgba(180, 20, 20, 0.38)"
                  : "transparent",
                borderLeft: !sidebarCollapsed
                  ? active ? "2.5px solid #ce1c1a" : "2.5px solid transparent"
                  : "none",
                justifyContent: sidebarCollapsed ? "center" : "flex-start",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: active
                    ? "rgba(180, 20, 20, 0.48)"
                    : "rgba(255,255,255,0.06)",
                },
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  display: "flex",
                  color: active ? "#f87171" : "rgba(255,255,255,0.4)",
                  flexShrink: 0,
                }}
              >
                {link.icon}
              </Box>

              {!sidebarCollapsed && (
                <>
                  <Typography
                    sx={{
                      fontSize: "0.845rem",
                      fontWeight: active ? 600 : 400,
                      lineHeight: 1,
                      whiteSpace: "nowrap",
                      flex: 1,
                      color: "inherit",
                    }}
                  >
                    {link.label}
                  </Typography>

                  {/* Badge */}
                  {link.badge && (
                    <Box
                      sx={{
                        minWidth: 18,
                        height: 18,
                        borderRadius: "9px",
                        backgroundColor: "#ce1c1a",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        px: 0.5,
                      }}
                    >
                      <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, color: "white" }}>
                        {link.badge}
                      </Typography>
                    </Box>
                  )}

                  {/* Active chevron */}
                  {active && (
                    <ChevronRightIcon sx={{ fontSize: 15, color: "rgba(255,255,255,0.5)" }} />
                  )}
                </>
              )}
            </Box>
          );

          return sidebarCollapsed ? (
            <Tooltip key={link.href} title={link.label} placement="right">
              {item}
            </Tooltip>
          ) : (
            item
          );
        })}
      </Box>

      {/* ── Need Help Card ── */}
      {!sidebarCollapsed && (
        <Box sx={{ px: 1.25, pb: 1 }}>
          <Box
            sx={{
              borderRadius: "12px",
              background: "linear-gradient(135deg, #1c0505 0%, #3b0a0a 60%, #2a0808 100%)",
              border: "1px solid rgba(206,28,26,0.2)",
              p: 1.75,
              color: "white",
              position: "relative",
              overflow: "hidden",
              /* red glow in top-right corner */
              "&::after": {
                content: '""',
                position: "absolute",
                top: -20,
                right: -20,
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(206,28,26,0.45) 0%, transparent 70%)",
                pointerEvents: "none",
              },
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "8px",
                backgroundColor: "#ce1c1a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <HelpOutlineIcon sx={{ fontSize: 17, color: "white" }} />
            </Box>

            <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, mb: 0.4 }}>
              Need help?
            </Typography>
            <Typography sx={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.55)", mb: 1.25, lineHeight: 1.45 }}>
              Reach our team for onboarding &amp; data migration.
            </Typography>
            <Typography
              sx={{
                fontSize: "0.7rem",
                fontWeight: 600,
                color: "#f87171",
                cursor: "pointer",
                "&:hover": { color: "#fca5a5" },
              }}
            >
              Contact support →
            </Typography>
          </Box>
        </Box>
      )}

      {/* ── User profile + Logout ── */}
      <Box
        sx={{
          px: 1.25,
          py: 1.25,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}
      >
        {sidebarCollapsed ? (
          <Tooltip title="Sign Out" placement="right">
            <Box
              onClick={logout}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 1,
                borderRadius: "8px",
                cursor: "pointer",
                color: "rgba(255,255,255,0.35)",
                transition: "all 150ms",
                "&:hover": { color: "#f87171", backgroundColor: "rgba(206,28,26,0.12)" },
              }}
            >
              <LogoutIcon sx={{ fontSize: 18 }} />
            </Box>
          </Tooltip>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              p: 0.75,
              borderRadius: "8px",
              cursor: "default",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.04)" },
            }}
          >
            {/* Avatar with online dot */}
            <Box sx={{ position: "relative", flexShrink: 0 }}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: "#ce1c1a",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                }}
              >
                {initials}
              </Avatar>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  border: "2px solid #141414",
                }}
              />
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: "0.775rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  lineHeight: 1.2,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user?.name || "Super Admin"}
              </Typography>
              <Typography sx={{ fontSize: "0.62rem", color: "#22c55e", fontWeight: 500 }}>
                • Online
              </Typography>
            </Box>

            <Tooltip title="Sign Out" placement="top">
              <Box
                onClick={(e) => { e.stopPropagation(); logout(); }}
                sx={{
                  display: "flex",
                  color: "rgba(255,255,255,0.3)",
                  p: 0.5,
                  borderRadius: "6px",
                  cursor: "pointer",
                  "&:hover": { color: "#f87171", backgroundColor: "rgba(206,28,26,0.12)" },
                  transition: "all 150ms",
                }}
              >
                <LogoutIcon sx={{ fontSize: 16 }} />
              </Box>
            </Tooltip>
          </Box>
        )}
      </Box>
    </Box>
  );
}
