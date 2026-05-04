"use client";

import { Box, TextField, Button, Alert } from "@mui/material";
import { useState } from "react";

export default function SecurityPanel() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 440, display: "flex", flexDirection: "column", gap: 2.5 }}>
      {success && <Alert severity="success" sx={{ borderRadius: "10px" }}>Password changed successfully!</Alert>}
      <TextField label="Current Password" type="password" fullWidth required />
      <TextField label="New Password" type="password" fullWidth required inputProps={{ minLength: 8 }} />
      <TextField label="Confirm New Password" type="password" fullWidth required />
      <Box><Button variant="contained" type="submit">Change Password</Button></Box>
    </Box>
  );
}
