"use client";

import { Box, TextField, Button, Avatar, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { getInitials } from "@/lib/utils/formatters";

export default function ProfilePanel() {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4 }}>
        <Box sx={{ position: "relative" }}>
          <Avatar sx={{ width: 80, height: 80, background: "linear-gradient(135deg, #cd171a, #bf2524)", fontSize: "1.5rem", fontWeight: 700 }}>
            {getInitials("Super Admin")}
          </Avatar>
          <Box sx={{ position: "absolute", bottom: 0, right: 0, width: 26, height: 26, borderRadius: "50%", backgroundColor: "#ce1c1a", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "2px solid #141414" }}>
            <EditIcon sx={{ fontSize: 12, color: "white" }} />
          </Box>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Super Admin</Typography>
          <Typography variant="body2" sx={{ color: "#64748b" }}>admin@wetfuel.com</Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, maxWidth: 500 }}>
        <TextField label="Full Name" defaultValue="Super Admin" fullWidth />
        <TextField label="Email Address" defaultValue="admin@wetfuel.com" type="email" fullWidth />
        <TextField label="Role" defaultValue="Super Administrator" fullWidth disabled />
        <Box>
          <Button variant="contained">Save Changes</Button>
        </Box>
      </Box>
    </Box>
  );
}
