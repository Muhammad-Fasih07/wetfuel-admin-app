export interface FlaggedActivity {
  id: string;
  type: string;
  customer: string;
  driver: string;
  truckPlate: string;
  details: string;
  severity: "high" | "medium" | "low";
  time: string;
  ticketNumber: string;
  fuelType: string;
  requestedGallons: number;
  deliveredGallons?: number;
  location: string;
  geofenceRadius?: string;
  stopDuration?: string;
  notes?: string;
}

export interface RegistrationRequest {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  businessType: string;
  submittedAt: string;
  notes?: string;
}

export interface ChangeRequest {
  id: string;
  type: "Location Change" | "Location Photo Update";
  customer: string;
  current: string;
  requested: string;
  currentLocation?: string;
  requestedLocation?: string;
  currentPhotos?: string[];
  requestedPhotos?: string[];
  submittedAt: string;
}

export const mockFlaggedActivities: FlaggedActivity[] = [
  {
    id: "f1",
    type: "Unusual Volume",
    customer: "Capitol Fleet Services",
    driver: "Marcus Rivera",
    truckPlate: "WF-1001",
    details: "Delivered 312 gal vs requested 200 gal — 56% overage",
    severity: "high",
    time: "2024-11-07T14:30:00Z",
    ticketNumber: "WF-2024-0835",
    fuelType: "Diesel",
    requestedGallons: 200,
    deliveredGallons: 312,
    location: "4200 N Lamar Blvd, Austin, TX",
    notes: "Driver reported customer requested top-off of secondary tank.",
  },
  {
    id: "f2",
    type: "GPS Mismatch",
    customer: "Lone Star Agriculture",
    driver: "Jordan Kelley",
    truckPlate: "WF-1002",
    details: "Delivery location 2.8 miles outside geofenced zone",
    severity: "medium",
    time: "2024-11-07T11:15:00Z",
    ticketNumber: "WF-2024-0840",
    fuelType: "Diesel",
    requestedGallons: 350,
    deliveredGallons: 348,
    location: "8800 FM 969, Austin, TX",
    geofenceRadius: "0.5 miles",
    notes: "GPS coordinates did not match registered customer geofence.",
  },
  {
    id: "f3",
    type: "Extended Stop",
    customer: "Austin Construction LLC",
    driver: "Diana Cortez",
    truckPlate: "WF-1004",
    details: "Truck stopped for 47 minutes during delivery window",
    severity: "low",
    time: "2024-11-06T09:00:00Z",
    ticketNumber: "WF-2024-0830",
    fuelType: "Diesel",
    requestedGallons: 70,
    deliveredGallons: 70,
    location: "1800 E Cesar Chavez St, Austin, TX",
    stopDuration: "47 minutes",
    notes: "Possible traffic delay reported by driver.",
  },
];

export const mockRegistrationRequests: RegistrationRequest[] = [
  {
    id: "r1",
    type: "New Customer",
    name: "Bluestone Drilling Inc.",
    email: "ops@bluestone.com",
    phone: "5125551201",
    address: "2200 Industrial Blvd, Austin, TX 78744",
    businessType: "Oil & Gas Services",
    submittedAt: "2024-11-08T08:30:00Z",
    notes: "Fleet of 12 diesel trucks, weekly delivery schedule requested.",
  },
  {
    id: "r2",
    type: "New Customer",
    name: "HVAC Pro Services LLC",
    email: "dispatch@hvacpro.com",
    phone: "5125551301",
    address: "9100 Research Blvd, Austin, TX 78759",
    businessType: "Commercial HVAC",
    submittedAt: "2024-11-07T16:00:00Z",
    notes: "8 service vans, Regular fuel only.",
  },
];

export const mockChangeRequests: ChangeRequest[] = [
  {
    id: "c1",
    type: "Location Change",
    customer: "Capitol Fleet Services",
    current: "4200 N Lamar Blvd",
    requested: "4800 N Lamar Blvd",
    currentLocation: "4200 N Lamar Blvd, Austin, TX 78756",
    requestedLocation: "4800 N Lamar Blvd, Austin, TX 78756",
    submittedAt: "2024-11-08T10:00:00Z",
  },
  {
    id: "c2",
    type: "Location Photo Update",
    customer: "Austin Construction LLC",
    current: "2 photos",
    requested: "New photos attached",
    currentPhotos: ["Site entrance — gate A", "Loading bay — south side"],
    requestedPhotos: ["Updated gate entrance", "New loading bay signage", "Fuel access point"],
    submittedAt: "2024-11-07T15:00:00Z",
  },
];
