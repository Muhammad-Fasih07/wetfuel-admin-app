"use client";

import {
  Box,
  InputAdornment,
  TextField,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Badge,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";
import { getInitials } from "@/lib/utils/formatters";

export default function Topbar() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    handleCloseMenu();
    logout();
  };

  return (
    <Box
      component="header"
      sx={{
        height: 64,
        backgroundColor: "#1c1c1e",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        alignItems: "center",
        px: 3,
        gap: 2,
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 8px rgba(0,0,0,0.3)",
      }}
    >
      <TextField
        size="small"
        placeholder="Search drivers, trucks, reports..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: 18, color: "#64748b" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          maxWidth: 320,
          flex: 1,
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            backgroundColor: "#252528",
            fontSize: "0.875rem",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.08)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.18)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ce1c1a",
              borderWidth: 1.5,
            },
          },
          "& input": { color: "#f1f5f9" },
          "& input::placeholder": { color: "#64748b", opacity: 1 },
        }}
      />

      <Box sx={{ flex: 1 }} />

      <IconButton size="medium">
        <Badge badgeContent={4} color="error">
          <NotificationsIcon sx={{ fontSize: 22, color: "#64748b" }} />
        </Badge>
      </IconButton>

      <IconButton size="medium" component={Link} href="/settings">
        <SettingsIcon sx={{ fontSize: 22, color: "#64748b" }} />
      </IconButton>

      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1.5, cursor: "pointer" }}
        onClick={handleOpenMenu}
      >
        <Avatar
          sx={{
            width: 36,
            height: 36,
            background: "linear-gradient(135deg, #cd171a, #bf2524)",
            fontSize: "0.8rem",
            fontWeight: 700,
          }}
        >
          {user?.name ? getInitials(user.name) : "SA"}
        </Avatar>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: "#f1f5f9", lineHeight: 1.2 }}>
            {user?.name || "Super Admin"}
          </Typography>
          <Typography sx={{ fontSize: "0.65rem", color: "#64748b", lineHeight: 1.2 }}>
            {user?.email || "admin@wetfuel.com"}
          </Typography>
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            mt: 1,
            minWidth: 200,
            backgroundColor: "#1c1c1e",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography sx={{ fontWeight: 600, fontSize: "0.875rem", color: "#f1f5f9" }}>
            {user?.name || "Super Admin"}
          </Typography>
          <Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>
            {user?.email || "admin@wetfuel.com"}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleCloseMenu} component={Link} href="/settings">
          <PersonIcon sx={{ fontSize: 18, mr: 1.5, color: "#64748b" }} />
          <Typography sx={{ fontSize: "0.875rem", color: "#e2e8f0" }}>Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} component={Link} href="/settings">
          <SettingsIcon sx={{ fontSize: 18, mr: 1.5, color: "#64748b" }} />
          <Typography sx={{ fontSize: "0.875rem", color: "#e2e8f0" }}>Settings</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: "#f87171" }}>
          <LogoutIcon sx={{ fontSize: 18, mr: 1.5 }} />
          <Typography sx={{ fontSize: "0.875rem" }}>Sign Out</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
