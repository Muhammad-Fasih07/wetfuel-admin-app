"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import type { Driver } from "@/types/driver";
import StatusChip from "@/components/ui/StatusChip";
import { formatDate, formatPhone, getInitials, isExpiringSoon, isExpired } from "@/lib/utils/formatters";

interface DriverTableProps {
  drivers: Driver[];
}

export default function DriverTable({ drivers }: DriverTableProps) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell>Driver</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Licence #</TableCell>
            <TableCell>Licence Expiry</TableCell>
            <TableCell>Certifications</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drivers.map((driver) => {
            const expired = isExpired(driver.licenceExpiry);
            const expiringSoon = isExpiringSoon(driver.licenceExpiry);
            return (
              <TableRow key={driver.id} hover>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        background: "linear-gradient(135deg, #cd171a, #bf2524)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      {getInitials(driver.name)}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#2b2b2b" }}>
                        {driver.name}
                      </Typography>
                      <Typography sx={{ fontSize: "0.75rem", color: "#887b6a" }}>
                        {driver.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: "0.875rem" }}>
                    {formatPhone(driver.phone)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <StatusChip status={driver.status} />
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: "0.875rem", fontFamily: "monospace" }}>
                    {driver.licenceNumber}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      color: expired ? "#ef4444" : expiringSoon ? "#f59e0b" : "#2b2b2b",
                      fontWeight: expired || expiringSoon ? 600 : 400,
                    }}
                  >
                    {formatDate(driver.licenceExpiry)}
                    {expired && " (Expired)"}
                    {!expired && expiringSoon && " (Soon)"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: "0.8rem", color: "#887b6a" }}>
                    {driver.certifications.length > 0
                      ? driver.certifications.map((c) => c.name).join(", ")
                      : "—"}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: "flex", gap: 0.5, justifyContent: "flex-end" }}>
                    <Tooltip title="View">
                      <IconButton
                        size="small"
                        component={Link}
                        href={`/drivers/${driver.id}`}
                      >
                        <VisibilityIcon fontSize="small" sx={{ color: "#6b7280" }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        component={Link}
                        href={`/drivers/${driver.id}/edit`}
                      >
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
