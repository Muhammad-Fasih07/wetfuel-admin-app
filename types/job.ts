export type JobStatus =
  | "New"
  | "Ready"
  | "Assigned"
  | "Completed"
  | "Finalized";

export type FuelType = "Regular" | "Premium" | "Diesel" | "DEF";

export interface JobTicket {
  id: string;
  ticketNumber: string;
  customerId: string;
  customerName: string;
  equipmentId: string;
  equipmentName: string;
  fuelType: FuelType;
  requestedGallons: number;
  deliveredGallons?: number;
  scheduledDate: string;
  scheduledTime?: string;
  status: JobStatus;
  assignedDriverId?: string;
  assignedDriverName?: string;
  assignedTruckId?: string;
  assignedTruckPlate?: string;
  dailyFuelPrice?: number;
  totalAmount?: number;
  deliveryFee?: number;
  meterTicketStart?: number;
  meterTicketEnd?: number;
  notes?: string;
  isRecurring: boolean;
  recurringSchedule?: RecurringSchedule;
  invoiceId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RecurringSchedule {
  frequency: "Daily" | "Weekly" | "Biweekly" | "Monthly";
  dayOfWeek?: number;
  dayOfMonth?: number;
  endDate?: string;
}

export interface CreateJobInput {
  customerId: string;
  equipmentId: string;
  fuelType: FuelType;
  requestedGallons: number;
  scheduledDate: string;
  scheduledTime?: string;
  notes?: string;
  isRecurring: boolean;
  recurringSchedule?: RecurringSchedule;
}
