export type DriverStatus = "Active" | "Deactivated" | "On Leave";

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
  status: DriverStatus;
  birthday: string;
  anniversary: string;
  address: string;
  licenceNumber: string;
  licenceExpiry: string;
  licenceState: string;
  licencePicture?: string;
  certifications: Certification[];
  createdAt: string;
  updatedAt: string;
}

export interface Certification {
  id: string;
  name: string;
  expiryDate: string;
}

export interface TimesheetEntry {
  id: string;
  driverId: string;
  date: string;
  clockIn: string;
  clockOut: string;
  hoursWorked: number;
  jobsCompleted: number;
  gallonsDelivered: number;
}

export interface RegisterDriverInput {
  name: string;
  email: string;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
  status: DriverStatus;
  birthday: string;
  anniversary: string;
  address: string;
  licenceNumber: string;
  licenceExpiry: string;
  licenceState: string;
  licencePicture?: string;
  certifications: Omit<Certification, "id">[];
}
