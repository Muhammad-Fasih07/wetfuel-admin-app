"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid, TextField, MenuItem, Button, Typography, Divider } from "@mui/material";
import { truckSchema, type TruckInput } from "@/lib/utils/validators";
import { TRUCK_STATUSES, FUEL_TYPES } from "@/lib/utils/constants";

interface RegisterTruckFormProps {
  defaultValues?: Partial<TruckInput>;
  onSubmit: (data: TruckInput) => void;
  loading?: boolean;
  submitLabel?: string;
}

export default function RegisterTruckForm({
  defaultValues,
  onSubmit,
  loading,
  submitLabel = "Register Truck",
}: RegisterTruckFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<TruckInput>({
    resolver: zodResolver(truckSchema),
    defaultValues: { status: "Active", year: new Date().getFullYear(), ...defaultValues },
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="subtitle2" sx={{ mb: 2, color: "#887b6a", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.7rem" }}>
        Vehicle Identification
      </Typography>
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <TextField label="Plate Number" fullWidth {...register("plateNumber")} error={!!errors.plateNumber} helperText={errors.plateNumber?.message} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="VIN (17 chars)" fullWidth inputProps={{ maxLength: 17 }} {...register("vin")} error={!!errors.vin} helperText={errors.vin?.message} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="DOT Number" fullWidth {...register("dotNumber")} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Make" fullWidth {...register("make")} error={!!errors.make} helperText={errors.make?.message} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Model" fullWidth {...register("model")} error={!!errors.model} helperText={errors.model?.message} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField label="Year" type="number" fullWidth {...register("year", { valueAsNumber: true })} error={!!errors.year} helperText={errors.year?.message} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField label="Status" select fullWidth {...register("status")} defaultValue="Active">
            {TRUCK_STATUSES.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </TextField>
        </Grid>
      </Grid>

      <Divider sx={{ mb: 3 }} />
      <Typography variant="subtitle2" sx={{ mb: 2, color: "#887b6a", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.7rem" }}>
        Service & Compliance Dates
      </Typography>
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <TextField label="Last Oil Change" type="date" fullWidth InputLabelProps={{ shrink: true }} {...register("lastOilChange")} error={!!errors.lastOilChange} helperText={errors.lastOilChange?.message} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Last Fuel Filter Change" type="date" fullWidth InputLabelProps={{ shrink: true }} {...register("lastFuelFilterChange")} error={!!errors.lastFuelFilterChange} helperText={errors.lastFuelFilterChange?.message} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Last Air Filter Change" type="date" fullWidth InputLabelProps={{ shrink: true }} {...register("lastAirFilterChange")} error={!!errors.lastAirFilterChange} helperText={errors.lastAirFilterChange?.message} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Last Transmission Service" type="date" fullWidth InputLabelProps={{ shrink: true }} {...register("lastTransmissionService")} error={!!errors.lastTransmissionService} helperText={errors.lastTransmissionService?.message} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Last W&M Inspection" type="date" fullWidth InputLabelProps={{ shrink: true }} {...register("lastWeightsMeasuresInspection")} error={!!errors.lastWeightsMeasuresInspection} helperText={errors.lastWeightsMeasuresInspection?.message} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Insurance Expiry" type="date" fullWidth InputLabelProps={{ shrink: true }} {...register("insuranceExpiry")} error={!!errors.insuranceExpiry} helperText={errors.insuranceExpiry?.message} />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, pt: 2, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <Button variant="outlined" type="button" disabled={loading}>Cancel</Button>
        <Button variant="contained" type="submit" disabled={loading}>{loading ? "Saving…" : submitLabel}</Button>
      </Box>
    </Box>
  );
}
