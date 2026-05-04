"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { driverSchema, type DriverInput } from "@/lib/utils/validators";
import { DRIVER_STATUSES, US_STATES, CERTIFICATION_TYPES } from "@/lib/utils/constants";

interface CertEntry { name: string; expiryDate: string }

interface RegisterDriverFormProps {
  defaultValues?: Partial<DriverInput>;
  onSubmit: (data: DriverInput & { certifications: CertEntry[] }) => void;
  loading?: boolean;
  submitLabel?: string;
}

export default function RegisterDriverForm({
  defaultValues,
  onSubmit,
  loading,
  submitLabel = "Register Driver",
}: RegisterDriverFormProps) {
  const [certs, setCerts] = useState<CertEntry[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DriverInput>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      status: "Active",
      anniversary: "",
      ...defaultValues,
    },
  });

  const addCert = () => setCerts((c) => [...c, { name: "", expiryDate: "" }]);
  const removeCert = (i: number) => setCerts((c) => c.filter((_, idx) => idx !== i));
  const updateCert = (i: number, key: keyof CertEntry, val: string) =>
    setCerts((c) => c.map((cert, idx) => (idx === i ? { ...cert, [key]: val } : cert)));

  const handleFormSubmit = (data: DriverInput) => {
    onSubmit({ ...data, certifications: certs });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Typography variant="subtitle2" sx={{ mb: 2, color: "#887b6a", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.7rem" }}>
        Personal Information
      </Typography>
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField label="Full Name" fullWidth {...register("name")} error={!!errors.name} helperText={errors.name?.message} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Email" type="email" fullWidth {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Phone" fullWidth {...register("phone")} error={!!errors.phone} helperText={errors.phone?.message} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Status" select fullWidth {...register("status")} error={!!errors.status} defaultValue="Active">
            {DRIVER_STATUSES.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Birthday" type="date" fullWidth InputLabelProps={{ shrink: true }} {...register("birthday")} error={!!errors.birthday} helperText={errors.birthday?.message} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Anniversary (hire date)" type="date" fullWidth InputLabelProps={{ shrink: true }} {...register("anniversary")} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Address" fullWidth {...register("address")} error={!!errors.address} helperText={errors.address?.message} />
        </Grid>
      </Grid>

      <Divider sx={{ mb: 3 }} />
      <Typography variant="subtitle2" sx={{ mb: 2, color: "#887b6a", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.7rem" }}>
        Emergency Contact
      </Typography>
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField label="Emergency Contact Name" fullWidth {...register("emergencyContact")} error={!!errors.emergencyContact} helperText={errors.emergencyContact?.message} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Emergency Phone" fullWidth {...register("emergencyPhone")} error={!!errors.emergencyPhone} helperText={errors.emergencyPhone?.message} />
        </Grid>
      </Grid>

      <Divider sx={{ mb: 3 }} />
      <Typography variant="subtitle2" sx={{ mb: 2, color: "#887b6a", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.7rem" }}>
        Licence Details
      </Typography>
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField label="Licence Number" fullWidth {...register("licenceNumber")} error={!!errors.licenceNumber} helperText={errors.licenceNumber?.message} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField label="Licence State" select fullWidth {...register("licenceState")} error={!!errors.licenceState} defaultValue="">
            {US_STATES.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField label="Licence Expiry" type="date" fullWidth InputLabelProps={{ shrink: true }} {...register("licenceExpiry")} error={!!errors.licenceExpiry} helperText={errors.licenceExpiry?.message} />
        </Grid>
      </Grid>

      <Divider sx={{ mb: 3 }} />
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="subtitle2" sx={{ color: "#887b6a", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.7rem" }}>
          Certifications
        </Typography>
        <Button size="small" startIcon={<AddIcon />} onClick={addCert} sx={{ fontSize: "0.75rem" }}>
          Add Certification
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
        {certs.map((cert, i) => (
          <Box key={i} sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
            <TextField
              label="Certification Type"
              select
              value={cert.name}
              onChange={(e) => updateCert(i, "name", e.target.value)}
              sx={{ flex: 2 }}
            >
              {CERTIFICATION_TYPES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>
            <TextField
              label="Expiry Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={cert.expiryDate}
              onChange={(e) => updateCert(i, "expiryDate", e.target.value)}
              sx={{ flex: 1 }}
            />
            <IconButton onClick={() => removeCert(i)} size="small" sx={{ mt: 1 }}>
              <DeleteIcon fontSize="small" sx={{ color: "#ef4444" }} />
            </IconButton>
          </Box>
        ))}
        {certs.length === 0 && (
          <Typography sx={{ fontSize: "0.8rem", color: "#9ca3af", textAlign: "center", py: 2 }}>
            No certifications added yet
          </Typography>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, pt: 2, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <Button variant="outlined" type="button" disabled={loading}>Cancel</Button>
        <Button variant="contained" type="submit" disabled={loading}>{loading ? "Saving…" : submitLabel}</Button>
      </Box>
    </Box>
  );
}
