export type TruckStatus = "Active" | "Maintenance" | "Decommissioned";
export type FuelType = "Regular" | "Premium" | "Diesel" | "DEF";

export interface FuelReservoir {
  fuelType: FuelType;
  capacity: number;
  currentLevel?: number;
}

export interface Truck {
  id: string;
  plateNumber: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  status: TruckStatus;
  fuelReservoirs: FuelReservoir[];
  lastOilChange: string;
  lastFuelFilterChange: string;
  lastAirFilterChange: string;
  lastTransmissionService: string;
  lastWeightsMeasuresInspection: string;
  dotNumber?: string;
  insuranceExpiry: string;
  createdAt: string;
  updatedAt: string;
}

export interface PreInspectionForm {
  id: string;
  truckId: string;
  driverId: string;
  driverName: string;
  date: string;
  tiresOk: boolean;
  lightsOk: boolean;
  brakesOk: boolean;
  fluidLevelsOk: boolean;
  emergencyEquipmentOk: boolean;
  notes?: string;
}

export interface RegisterTruckInput {
  plateNumber: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  status: TruckStatus;
  fuelReservoirs: Omit<FuelReservoir, "currentLevel">[];
  lastOilChange: string;
  lastFuelFilterChange: string;
  lastAirFilterChange: string;
  lastTransmissionService: string;
  lastWeightsMeasuresInspection: string;
  dotNumber?: string;
  insuranceExpiry: string;
}
