export const APP_NAME = "WetFuel Admin Panel";
export const APP_VERSION = "1.0.0";

export const FUEL_TYPES = ["Regular", "Premium", "Diesel", "DEF"] as const;

export const DRIVER_STATUSES = ["Active", "Deactivated", "On Leave"] as const;
export const TRUCK_STATUSES = ["Active", "Maintenance", "Decommissioned"] as const;
export const CUSTOMER_STATUSES = ["Active", "Pending", "Deactivated"] as const;

export const JOB_STATUSES = [
  "New",
  "Ready",
  "Assigned",
  "Completed",
  "Finalized",
] as const;

export const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];

export const CERTIFICATION_TYPES = [
  "CDL Class A",
  "CDL Class B",
  "Hazmat",
  "Tanker",
  "Doubles/Triples",
  "TWIC Card",
  "DOT Medical",
];

export const SIDEBAR_LINKS = [
  { label: "Dashboard", href: "/", icon: "Dashboard" },
  { label: "Drivers", href: "/drivers", icon: "Person" },
  { label: "Trucks", href: "/trucks", icon: "LocalShipping" },
  { label: "Customers", href: "/customers", icon: "Business" },
  { label: "Inventory", href: "/inventory", icon: "Inventory" },
  { label: "Jobs", href: "/jobs", icon: "Assignment" },
  { label: "QR Codes", href: "/qr-codes", icon: "QrCode" },
  { label: "Invoices", href: "/invoices", icon: "Receipt" },
  { label: "Activity", href: "/activity", icon: "Notifications" },
  { label: "Reporting", href: "/reporting", icon: "BarChart" },
  { label: "Settings", href: "/settings", icon: "Settings" },
];

export const ITEMS_PER_PAGE = 20;
export const LOW_INVENTORY_THRESHOLD = 20; // percent
