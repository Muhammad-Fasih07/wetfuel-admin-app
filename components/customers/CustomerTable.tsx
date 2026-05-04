"use client";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Typography, IconButton, Tooltip } from "@mui/material";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import type { Customer } from "@/types/customer";
import StatusChip from "@/components/ui/StatusChip";
import { formatPhone } from "@/lib/utils/formatters";

export default function CustomerTable({ customers }: { customers: Customer[] }) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 750 }}>
        <TableHead>
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Margin</TableCell>
            <TableCell>Equipment</TableCell>
            <TableCell>Location</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((c) => (
            <TableRow key={c.id} hover>
              <TableCell>
                <Typography sx={{ fontWeight: 600, fontSize: "0.875rem" }}>{c.name}</Typography>
                <Typography sx={{ fontSize: "0.75rem", color: "#887b6a" }}>{c.email}</Typography>
              </TableCell>
              <TableCell>{formatPhone(c.phone)}</TableCell>
              <TableCell><StatusChip status={c.status} /></TableCell>
              <TableCell>
                <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#22c55e" }}>
                  {(c.margins * 100).toFixed(0)}%
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontSize: "0.875rem" }}>{c.equipment.length} items</Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <LocationOnIcon sx={{ fontSize: 14, color: "#9ca3af" }} />
                  <Typography sx={{ fontSize: "0.75rem", color: "#887b6a", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {c.location}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Box sx={{ display: "flex", gap: 0.5, justifyContent: "flex-end" }}>
                  <Tooltip title="View">
                    <IconButton size="small" component={Link} href={`/customers/${c.id}`}>
                      <VisibilityIcon fontSize="small" sx={{ color: "#6b7280" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton size="small" component={Link} href={`/customers/${c.id}/edit`}>
                      <EditIcon fontSize="small" sx={{ color: "#6b7280" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
