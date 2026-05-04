"use client";

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Box, Typography, IconButton, Tooltip, LinearProgress,
} from "@mui/material";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import type { Truck } from "@/types/truck";
import StatusChip from "@/components/ui/StatusChip";
import { formatDate, isExpiringSoon, isExpired } from "@/lib/utils/formatters";

export default function TruckTable({ trucks }: { trucks: Truck[] }) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 800 }}>
        <TableHead>
          <TableRow>
            <TableCell>Truck</TableCell>
            <TableCell>VIN</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Fuel Load</TableCell>
            <TableCell>Insurance Expiry</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trucks.map((truck) => {
            const totalCap = truck.fuelReservoirs.reduce((s, r) => s + r.capacity, 0);
            const totalLevel = truck.fuelReservoirs.reduce((s, r) => s + (r.currentLevel || 0), 0);
            const pct = totalCap > 0 ? Math.round((totalLevel / totalCap) * 100) : 0;
            const insExpired = isExpired(truck.insuranceExpiry);
            const insSoon = isExpiringSoon(truck.insuranceExpiry);
            return (
              <TableRow key={truck.id} hover>
                <TableCell>
                  <Typography sx={{ fontWeight: 600, fontSize: "0.875rem" }}>{truck.plateNumber}</Typography>
                  <Typography sx={{ fontSize: "0.75rem", color: "#887b6a" }}>{truck.make} {truck.model}</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: "0.8rem", fontFamily: "monospace", color: "#887b6a" }}>{truck.vin}</Typography>
                </TableCell>
                <TableCell>{truck.year}</TableCell>
                <TableCell><StatusChip status={truck.status} /></TableCell>
                <TableCell sx={{ minWidth: 140 }}>
                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                      <Typography sx={{ fontSize: "0.7rem", color: "#887b6a" }}>{totalLevel.toLocaleString()} / {totalCap.toLocaleString()} gal</Typography>
                      <Typography sx={{ fontSize: "0.7rem", fontWeight: 600, color: pct < 20 ? "#ef4444" : pct < 40 ? "#f59e0b" : "#22c55e" }}>{pct}%</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={pct}
                      sx={{
                        height: 5,
                        borderRadius: 3,
                        backgroundColor: "#f0f0f0",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: pct < 20 ? "#ef4444" : pct < 40 ? "#f59e0b" : "#22c55e",
                          borderRadius: 3,
                        },
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: "0.875rem", color: insExpired ? "#ef4444" : insSoon ? "#f59e0b" : "#2b2b2b", fontWeight: insExpired || insSoon ? 600 : 400 }}>
                    {formatDate(truck.insuranceExpiry)}
                    {insExpired && " (Expired)"}
                    {!insExpired && insSoon && " (Soon)"}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: "flex", gap: 0.5, justifyContent: "flex-end" }}>
                    <Tooltip title="View">
                      <IconButton size="small" component={Link} href={`/trucks/${truck.id}`}>
                        <VisibilityIcon fontSize="small" sx={{ color: "#6b7280" }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton size="small" component={Link} href={`/trucks/${truck.id}/edit`}>
                        <EditIcon fontSize="small" sx={{ color: "#6b7280" }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
