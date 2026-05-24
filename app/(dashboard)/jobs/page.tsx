"use client";

import { useState } from "react";
import { Box, Typography, Button, Chip, Avatar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PageHeader from "@/components/ui/PageHeader";
import JobTicketModal, { type JobTicketUpdateData } from "@/components/jobs/JobTicketModal";
import NewTicketModal, { type NewTicketData } from "@/components/jobs/NewTicketModal";
import type { JobTicket, JobStatus } from "@/types/job";
import { mockJobs } from "./_data";
import { mockDrivers } from "../drivers/_data";
import { formatDate } from "@/lib/utils/formatters";
import { useUIStore } from "@/store/uiStore";
import { cardHoverBorderSx } from "@/lib/theme/cardStyles";

const LANES: { status: JobStatus; label: string; color: string; bg: string }[] = [
  { status: "New", label: "New Tickets", color: "#a78bfa", bg: "rgba(139,92,246,0.2)" },
  { status: "Ready", label: "Ready", color: "#60a5fa", bg: "rgba(59,130,246,0.2)" },
  { status: "Assigned", label: "Assigned", color: "#fbbf24", bg: "rgba(245,158,11,0.2)" },
  { status: "Completed", label: "Completed", color: "#4ade80", bg: "rgba(34,197,94,0.2)" },
  { status: "Finalized", label: "Finalized", color: "#94a3b8", bg: "rgba(255,255,255,0.08)" },
];

const FUEL_COLORS: Record<string, string> = {
  Regular: "#3b82f6",
  Premium: "#8b5cf6",
  Diesel: "#f59e0b",
  DEF: "#22c55e",
};

function TicketCard({ ticket, onClick }: { ticket: JobTicket; onClick: () => void }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        background: "#252528",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.07)",
        p: 2,
        boxShadow: "0 1px 4px rgba(255,255,255,0.07)",
        cursor: "pointer",
        transition: "all 150ms",
        ...cardHoverBorderSx,
        "&:hover": {
          ...cardHoverBorderSx["&:hover"],
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transform: "translateY(-1px)",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
        <Typography sx={{ fontSize: "0.7rem", fontFamily: "monospace", color: "#64748b", fontWeight: 600 }}>
          {ticket.ticketNumber}
        </Typography>
        {ticket.isRecurring && (
          <Chip label="Recurring" size="small" sx={{ fontSize: "0.6rem", height: 18, backgroundColor: "rgba(139,92,246,0.2)", color: "#a78bfa" }} />
        )}
      </Box>

      <Typography sx={{ fontWeight: 600, fontSize: "0.875rem", mb: 0.5, color: "#f1f5f9" }}>
        {ticket.customerName}
      </Typography>
      <Typography sx={{ fontSize: "0.75rem", color: "#64748b", mb: 1.5 }}>
        {ticket.equipmentName}
      </Typography>

      <Box sx={{ display: "flex", gap: 1, mb: 1.5, flexWrap: "wrap" }}>
        <Chip
          size="small"
          icon={<LocalGasStationIcon sx={{ fontSize: "12px !important" }} />}
          label={`${ticket.fuelType} — ${ticket.requestedGallons} gal`}
          sx={{ fontSize: "0.7rem", height: 22, backgroundColor: `${FUEL_COLORS[ticket.fuelType]}15`, color: FUEL_COLORS[ticket.fuelType], border: `1px solid ${FUEL_COLORS[ticket.fuelType]}30` }}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <AccessTimeIcon sx={{ fontSize: 12, color: "#9ca3af" }} />
          <Typography sx={{ fontSize: "0.7rem", color: "#9ca3af" }}>
            {formatDate(ticket.scheduledDate)}
            {ticket.scheduledTime && ` at ${ticket.scheduledTime}`}
          </Typography>
        </Box>
      </Box>

      {ticket.assignedDriverName && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 1.5, pt: 1.5, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <Avatar sx={{ width: 22, height: 22, fontSize: "0.6rem", background: "linear-gradient(135deg, #cd171a, #bf2524)" }}>
            {ticket.assignedDriverName.charAt(0)}
          </Avatar>
          <Typography sx={{ fontSize: "0.75rem", color: "#f1f5f9", fontWeight: 500 }}>
            {ticket.assignedDriverName}
          </Typography>
          {ticket.assignedTruckPlate && (
            <Chip label={ticket.assignedTruckPlate} size="small" sx={{ fontSize: "0.65rem", height: 18, ml: "auto" }} />
          )}
        </Box>
      )}

      {ticket.dailyFuelPrice && (
        <Typography sx={{ fontSize: "0.7rem", color: "#64748b", mt: 1 }}>
          @ ${ticket.dailyFuelPrice.toFixed(3)}/gal
        </Typography>
      )}
    </Box>
  );
}

export default function JobsPage() {
  const { addToast } = useUIStore();
  const [jobs, setJobs] = useState<JobTicket[]>(mockJobs);
  const [selectedTicket, setSelectedTicket] = useState<JobTicket | null>(null);
  const [newTicketOpen, setNewTicketOpen] = useState(false);

  const getByStatus = (status: JobStatus) =>
    jobs.filter((j) => j.status === status);

  const handleUpdateTicket = (ticketId: string, data: JobTicketUpdateData) => {
    const driver = data.assignedDriverId ? mockDrivers.find((d) => d.id === data.assignedDriverId) : undefined;
    const prev = jobs.find((j) => j.id === ticketId);
    const unassigning = data.status === "Ready" && prev?.status === "Assigned";

    setJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job.id !== ticketId) return job;

        const next: JobTicket = {
          ...job,
          status: data.status,
          deliveredGallons: data.deliveredGallons ?? job.deliveredGallons,
          deliveryFee: data.deliveryFee ?? job.deliveryFee,
          notes: data.notes ?? job.notes,
          updatedAt: new Date().toISOString(),
        };

        if (unassigning) {
          next.assignedDriverId = undefined;
          next.assignedDriverName = undefined;
          next.assignedTruckId = undefined;
          next.assignedTruckPlate = undefined;
        } else if (driver) {
          next.assignedDriverId = driver.id;
          next.assignedDriverName = driver.name;
        }

        if (data.status === "Ready" && !job.dailyFuelPrice) {
          next.dailyFuelPrice = 3.459;
        }

        if (data.status === "Finalized" && data.deliveryFee && job.dailyFuelPrice && job.deliveredGallons) {
          next.totalAmount = job.deliveredGallons * job.dailyFuelPrice + data.deliveryFee;
        }

        return next;
      })
    );

    setSelectedTicket(null);
    const message =
      unassigning
        ? "Ticket unassigned and moved to Ready."
        : `Ticket moved to ${data.status}.`;
    addToast({ type: "success", message });
  };

  const handleCreateTicket = (data: NewTicketData) => {
    const ticketNumber = `WF-2024-${String(840 + jobs.length + 1).padStart(4, "0")}`;
    const newTicket: JobTicket = {
      id: `j-${Date.now()}`,
      ticketNumber,
      customerId: data.customerId,
      customerName: data.customerName,
      equipmentId: data.equipmentId,
      equipmentName: data.equipmentName,
      fuelType: data.fuelType,
      requestedGallons: data.requestedGallons,
      scheduledDate: data.scheduledDate,
      scheduledTime: data.scheduledTime,
      status: "New",
      isRecurring: data.isRecurring,
      notes: data.notes || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setJobs((prev) => [newTicket, ...prev]);
    setNewTicketOpen(false);
    addToast({ type: "success", message: `Ticket ${ticketNumber} created.` });
  };

  return (
    <Box>
      <PageHeader
        title="Jobs Portal"
        subtitle="Kanban board for fueling tickets"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Jobs" }]}
        action={
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setNewTicketOpen(true)}>
            New Ticket
          </Button>
        }
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 2,
          overflowX: "auto",
          pb: 2,
          "@media (max-width: 1300px)": { gridTemplateColumns: "repeat(3, 1fr)" },
          "@media (max-width: 900px)": { gridTemplateColumns: "repeat(2, 1fr)" },
        }}
      >
        {LANES.map((lane) => {
          const laneJobs = getByStatus(lane.status);
          return (
            <Box
              key={lane.status}
              sx={{
                backgroundColor: "#1a1a1c",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.07)",
                minHeight: 500,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  backgroundColor: "#252528",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: lane.color }} />
                  <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: "#f1f5f9" }}>
                    {lane.label}
                  </Typography>
                </Box>
                <Chip
                  label={laneJobs.length}
                  size="small"
                  sx={{ fontSize: "0.7rem", height: 20, backgroundColor: lane.bg, color: lane.color, fontWeight: 700, minWidth: 24 }}
                />
              </Box>

              <Box sx={{ p: 1.5, flex: 1, display: "flex", flexDirection: "column", gap: 1.5, overflowY: "auto" }}>
                {laneJobs.length === 0 ? (
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, opacity: 0.35 }}>
                    <Typography sx={{ fontSize: "0.8rem", color: "#9ca3af" }}>No tickets</Typography>
                  </Box>
                ) : (
                  laneJobs.map((job) => (
                    <TicketCard
                      key={job.id}
                      ticket={job}
                      onClick={() => setSelectedTicket(job)}
                    />
                  ))
                )}
              </Box>
            </Box>
          );
        })}
      </Box>

      <JobTicketModal
        open={!!selectedTicket}
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
        onSubmit={handleUpdateTicket}
      />
      <NewTicketModal
        open={newTicketOpen}
        onClose={() => setNewTicketOpen(false)}
        onSubmit={handleCreateTicket}
      />
    </Box>
  );
}
