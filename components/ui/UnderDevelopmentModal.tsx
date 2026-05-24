"use client";

import { Box, Typography, Button, Chip } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import PrintIcon from "@mui/icons-material/Print";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LinkIcon from "@mui/icons-material/Link";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Modal from "@/components/ui/Modal";

export type DevFeatureKey =
  | "print"
  | "register"
  | "quickbooks"
  | "export-invoice"
  | "report-export"
  | "connect-quickbooks"
  | "apply-prices"
  | "reset-opis"
  | "notifications";

const FEATURE_CONFIG: Record<
  DevFeatureKey,
  { title: string; description: string; icon: typeof PrintIcon }
> = {
  print: {
    title: "Print QR Codes",
    description:
      "Select QR codes and print them in bulk for installation on customer equipment. This workflow is being finalized.",
    icon: PrintIcon,
  },
  register: {
    title: "Register Equipment",
    description:
      "Manually register equipment and link it to a QR code from the admin panel. This flow will be available soon.",
    icon: AddBusinessIcon,
  },
  quickbooks: {
    title: "Export to QuickBooks",
    description:
      "Sync invoices directly to QuickBooks Online for accounting and reconciliation. This integration is being built.",
    icon: CloudUploadIcon,
  },
  "export-invoice": {
    title: "Export Invoice",
    description:
      "Download or export individual invoices in standard formats. This export workflow will be available soon.",
    icon: DownloadIcon,
  },
  "report-export": {
    title: "Export Report",
    description:
      "Download reporting data as CSV or PDF — including driver performance, customer fueling, charts, and summary metrics. This export is being built.",
    icon: AssessmentIcon,
  },
  "connect-quickbooks": {
    title: "Connect QuickBooks",
    description:
      "OAuth connection to QuickBooks Online for automatic invoice sync and accounting reconciliation. This integration is being built.",
    icon: LinkIcon,
  },
  "apply-prices": {
    title: "Apply Prices",
    description:
      "Apply OPIS rack rates or manual overrides to today's delivery pricing across all fuel types. This workflow is being finalized.",
    icon: LocalGasStationIcon,
  },
  "reset-opis": {
    title: "Reset to OPIS",
    description:
      "Clear manual price overrides and restore all fuel types to the latest OPIS daily rack rates. This action will be available soon.",
    icon: RestartAltIcon,
  },
  notifications: {
    title: "Notifications",
    description:
      "Real-time alerts for flagged jobs, pending approvals, inventory alerts, and system updates. The notification center is being built.",
    icon: NotificationsIcon,
  },
};

interface UnderDevelopmentModalProps {
  open: boolean;
  onClose: () => void;
  featureKey?: DevFeatureKey;
}

export default function UnderDevelopmentModal({ open, onClose, featureKey = "print" }: UnderDevelopmentModalProps) {
  const config = FEATURE_CONFIG[featureKey];
  const FeatureIcon = config.icon;

  return (
    <Modal
      open={open}
      onClose={onClose}
      hideTitle
      maxWidth="xs"
      actions={
        <Button variant="contained" fullWidth onClick={onClose} sx={{ py: 1.25 }}>
          Got it
        </Button>
      }
    >
      <Box sx={{ textAlign: "center", py: 1 }}>
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            mx: "auto",
            mb: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, rgba(245,158,11,0.25), rgba(206,28,26,0.2))",
            border: "1px solid rgba(245,158,11,0.35)",
            boxShadow: "0 8px 32px rgba(245,158,11,0.15)",
            position: "relative",
          }}
        >
          <FeatureIcon sx={{ fontSize: 32, color: "#fbbf24" }} />
          <ConstructionIcon
            sx={{
              fontSize: 18,
              color: "#ce1c1a",
              position: "absolute",
              bottom: -2,
              right: -2,
              backgroundColor: "#1c1c1e",
              borderRadius: "50%",
              p: 0.25,
            }}
          />
        </Box>

        <Chip
          label="Coming Soon"
          size="small"
          sx={{
            mb: 2,
            fontWeight: 700,
            fontSize: "0.65rem",
            letterSpacing: "0.06em",
            backgroundColor: "rgba(245,158,11,0.15)",
            color: "#fbbf24",
            border: "1px solid rgba(245,158,11,0.3)",
          }}
        />

        <Typography variant="h6" sx={{ fontWeight: 700, color: "#f1f5f9", mb: 1 }}>
          {config.title}
        </Typography>

        <Typography sx={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.6, px: 1 }}>
          {config.description}
        </Typography>

        <Box
          sx={{
            mt: 3,
            pt: 2.5,
            borderTop: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: i === 1 ? "#ce1c1a" : "rgba(255,255,255,0.15)",
                animation: i === 1 ? "pulse 1.5s ease-in-out infinite" : "none",
                "@keyframes pulse": {
                  "0%, 100%": { opacity: 1, transform: "scale(1)" },
                  "50%": { opacity: 0.5, transform: "scale(0.85)" },
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Modal>
  );
}
