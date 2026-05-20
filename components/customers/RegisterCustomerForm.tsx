"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid, TextField, MenuItem, Button, Typography, Divider, FormControlLabel, Checkbox } from "@mui/material";
import { customerSchema, type CustomerInput } from "@/lib/utils/validators";
import { CUSTOMER_STATUSES } from "@/lib/utils/constants";

interface RegisterCustomerFormProps {
  defaultValues?: Partial<CustomerInput> & { taxExemptions?: Record<string, boolean> };
  onSubmit: (data: any) => void;
  loading?: boolean;
  submitLabel?: string;
}

export default function RegisterCustomerForm({
  defaultValues,
  onSubmit,
  loading,
  submitLabel = "Register Customer",
}: RegisterCustomerFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CustomerInput>({
    resolver: zodResolver(customerSchema),
    defaultValues: { status: "Active", margins: 0.15, minGallonLimit: 200, geofencedRadius: 0.5, ...defaultValues },
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="subtitle2" sx={{ mb: 2, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.7rem" }}>
        Business Information
      </Typography>
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField label="Business Name" fullWidth {...register("name")} error={!!errors.name} helperText={errors.name?.message} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Email" type="email" fullWidth {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Phone" fullWidth {...register("phone")} error={!!errors.phone} helperText={errors.phone?.message} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField label="Status" select fullWidth {...register("status")} defaultValue="Active">
            {CUSTOMER_STATUSES.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Margin (%)"
            type="number"
            fullWidth
            inputProps={{ step: "0.01", min: 0, max: 100 }}
            {...register("margins", { valueAsNumber: true })}
            error={!!errors.margins}
            helperText={errors.margins?.message}
          />
        </Grid>
      </Grid>

      <Divider sx={{ mb: 3 }} />
      <Typography variant="subtitle2" sx={{ mb: 2, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.7rem" }}>
        Delivery Configuration
      </Typography>
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Minimum Gallon Limit (for delivery fee)"
            type="number"
            fullWidth
            {...register("minGallonLimit", { valueAsNumber: true })}
            error={!!errors.minGallonLimit}
            helperText={errors.minGallonLimit?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Geofenced Radius (miles)"
            type="number"
            fullWidth
            inputProps={{ step: "0.1" }}
            {...register("geofencedRadius", { valueAsNumber: true })}
            error={!!errors.geofencedRadius}
            helperText={errors.geofencedRadius?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Service Location / Address" fullWidth {...register("location")} error={!!errors.location} helperText={errors.location?.message} />
        </Grid>
      </Grid>

      <Divider sx={{ mb: 3 }} />
      <Typography variant="subtitle2" sx={{ mb: 2, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.7rem" }}>
        Tax Exemptions
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        {[
          { key: "fedLustTax", label: "Federal LUST Tax" },
          { key: "salesTax", label: "Sales Tax" },
          { key: "fuelTax", label: "Fuel Tax" },
          { key: "st101", label: "ST-101" },
        ].map((tax) => (
          <FormControlLabel
            key={tax.key}
            control={<Checkbox defaultChecked={defaultValues?.taxExemptions?.[tax.key] ?? false} sx={{ "&.Mui-checked": { color: "#ce1c1a" } }} />}
            label={<Typography sx={{ fontSize: "0.875rem" }}>{tax.label}</Typography>}
          />
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, pt: 2, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <Button variant="outlined" type="button" disabled={loading}>Cancel</Button>
        <Button variant="contained" type="submit" disabled={loading}>{loading ? "Saving…" : submitLabel}</Button>
      </Box>
    </Box>
  );
}
