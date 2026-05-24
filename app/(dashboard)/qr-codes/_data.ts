import type { FuelType } from "@/types/job";

export interface PendingQrRequest {
  id: string;
  customerId: string;
  customerName: string;
  equipmentName: string;
  fuelType: FuelType;
  maxCapacity: number;
  location: string;
  notes?: string;
  status: "Pending" | "Approved" | "Rejected";
  submittedAt: string;
}

export interface RegisteredQrCode {
  code: string;
  assignmentStatus: "assigned" | "unassigned";
  customer?: string;
  equipment?: string;
  fuelType?: FuelType;
  generatedAt?: string;
}

export const mockPendingRequests: PendingQrRequest[] = [
  {
    id: "qr1",
    customerId: "cu1",
    customerName: "Austin Construction LLC",
    equipmentName: "Compactor #3",
    fuelType: "Diesel",
    maxCapacity: 90,
    location: "1800 E Cesar Chavez St, Austin, TX 78702",
    notes: "New compactor on site B — needs QR for field fueling",
    status: "Pending",
    submittedAt: "2024-11-08T10:00:00Z",
  },
  {
    id: "qr2",
    customerId: "cu4",
    customerName: "Zenith Logistics Corp",
    equipmentName: "Fleet Truck #201",
    fuelType: "Diesel",
    maxCapacity: 120,
    location: "5500 Airport Blvd, Austin, TX 78751",
    notes: "Replacement vehicle for retired unit",
    status: "Pending",
    submittedAt: "2024-11-08T09:00:00Z",
  },
];

export const mockRegisteredCodes: RegisteredQrCode[] = [
  { code: "QR-0001", assignmentStatus: "assigned", customer: "Austin Construction LLC", equipment: "Excavator CAT 320", fuelType: "Diesel" },
  { code: "QR-0002", assignmentStatus: "assigned", customer: "Austin Construction LLC", equipment: "Bulldozer D6", fuelType: "Diesel" },
  { code: "QR-0010", assignmentStatus: "assigned", customer: "Capitol Fleet Services", equipment: "Fleet Van #001", fuelType: "Regular" },
  { code: "QR-0011", assignmentStatus: "assigned", customer: "Capitol Fleet Services", equipment: "Fleet Van #002", fuelType: "Regular" },
  { code: "QR-0012", assignmentStatus: "assigned", customer: "Capitol Fleet Services", equipment: "Fleet Truck #101", fuelType: "Diesel" },
  { code: "QR-0020", assignmentStatus: "assigned", customer: "Lone Star Agriculture", equipment: "John Deere 8R 410", fuelType: "Diesel" },
  { code: "QR-0021", assignmentStatus: "assigned", customer: "Lone Star Agriculture", equipment: "Case IH Harvester", fuelType: "Diesel" },
  { code: "QR-0030", assignmentStatus: "assigned", customer: "TXPower Generation", equipment: "Generator G500", fuelType: "Diesel" },
];
