export type FuelType = "Regular" | "Premium" | "Diesel" | "DEF";
export type TransferType =
  | "truck-to-truck"
  | "truck-to-main"
  | "third-party-purchase"
  | "dispensed"
  | "adjustment"
  | "spill";

export interface MainTank {
  id: string;
  fuelType: FuelType;
  capacity: number;
  currentLevel: number;
  lastUpdated: string;
}

export interface TruckFuelLevel {
  truckId: string;
  truckPlate: string;
  driverName: string;
  fuelType: FuelType;
  capacity: number;
  currentLevel: number;
  lastUpdated: string;
}

export interface PackagedGood {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  minStockAlert: number;
  lastUpdated: string;
}

export interface TransferLog {
  id: string;
  type: TransferType;
  fromId?: string;
  fromName?: string;
  toId?: string;
  toName?: string;
  fuelType: FuelType;
  gallons: number;
  performedBy: string;
  notes?: string;
  createdAt: string;
}

export interface InventoryAdjustment {
  tankId: string;
  gallons: number;
  reason: string;
  notes?: string;
}
