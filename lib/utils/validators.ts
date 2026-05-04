import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const driverSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone required"),
  emergencyContact: z.string().min(2, "Emergency contact is required"),
  emergencyPhone: z.string().min(10, "Valid emergency phone required"),
  status: z.enum(["Active", "Deactivated", "On Leave"]),
  birthday: z.string().min(1, "Birthday is required"),
  anniversary: z.string().optional().default(""),
  address: z.string().min(5, "Address is required"),
  licenceNumber: z.string().min(1, "Licence number is required"),
  licenceExpiry: z.string().min(1, "Licence expiry is required"),
  licenceState: z.string().min(2, "Licence state is required"),
  licencePicture: z.string().optional(),
});

export const truckSchema = z.object({
  plateNumber: z.string().min(1, "Plate number is required"),
  vin: z.string().min(17, "VIN must be 17 characters").max(17),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().min(1990).max(new Date().getFullYear() + 1),
  status: z.enum(["Active", "Maintenance", "Decommissioned"]),
  lastOilChange: z.string().min(1, "Last oil change date required"),
  lastFuelFilterChange: z.string().min(1, "Last fuel filter change required"),
  lastAirFilterChange: z.string().min(1, "Last air filter change required"),
  lastTransmissionService: z.string().min(1, "Last transmission service required"),
  lastWeightsMeasuresInspection: z.string().min(1, "Last W&M inspection required"),
  dotNumber: z.string().optional(),
  insuranceExpiry: z.string().min(1, "Insurance expiry required"),
});

export const customerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone required"),
  status: z.enum(["Active", "Pending", "Deactivated"]),
  margins: z.number().min(0).max(100),
  minGallonLimit: z.number().min(0),
  location: z.string().min(5, "Location is required"),
  geofencedRadius: z.number().min(0.1, "Geofenced radius required"),
});

export const jobSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),
  equipmentId: z.string().min(1, "Equipment is required"),
  fuelType: z.enum(["Regular", "Premium", "Diesel", "DEF"]),
  requestedGallons: z.number().min(1, "Gallons must be at least 1"),
  scheduledDate: z.string().min(1, "Scheduled date is required"),
  scheduledTime: z.string().optional(),
  notes: z.string().optional(),
  isRecurring: z.boolean(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type DriverInput = z.infer<typeof driverSchema>;
export type TruckInput = z.infer<typeof truckSchema>;
export type CustomerInput = z.infer<typeof customerSchema>;
export type JobInput = z.infer<typeof jobSchema>;
