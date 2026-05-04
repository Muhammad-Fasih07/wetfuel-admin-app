export type CustomerStatus = "Active" | "Pending" | "Deactivated";
export type FuelType = "Regular" | "Premium" | "Diesel" | "DEF";

export interface TaxExemptions {
  fedLustTax: boolean;
  salesTax: boolean;
  fuelTax: boolean;
  st101: boolean;
}

export interface Equipment {
  id: string;
  name: string;
  registeredQrCode?: string;
  maxCapacity: number;
  fuelType: FuelType;
  picture?: string;
  gpsLocation?: { lat: number; lng: number };
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  margins: number;
  minGallonLimit: number;
  taxExemptions: TaxExemptions;
  location: string;
  coordinates?: { lat: number; lng: number };
  geofencedRadius: number;
  locationPhotos: string[];
  equipment: Equipment[];
  createdAt: string;
  updatedAt: string;
}

export interface FuelRequest {
  id: string;
  customerId: string;
  equipmentId: string;
  equipmentName: string;
  fuelType: FuelType;
  requestedGallons: number;
  scheduledDate: string;
  status: "Pending" | "Approved" | "Rejected" | "Completed";
  createdAt: string;
}

export interface FuelingRecord {
  id: string;
  customerId: string;
  jobId: string;
  driverName: string;
  equipmentName: string;
  fuelType: FuelType;
  gallonsDelivered: number;
  pricePerGallon: number;
  totalAmount: number;
  date: string;
}
