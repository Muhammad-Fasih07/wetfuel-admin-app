import type { MainTank, TruckFuelLevel, PackagedGood, TransferLog } from "@/types/inventory";

export const mockMainTanks: MainTank[] = [
  { id: "mt1", fuelType: "Regular", capacity: 20000, currentLevel: 14500, lastUpdated: "2024-11-08T06:00:00Z" },
  { id: "mt2", fuelType: "Premium", capacity: 10000, currentLevel: 3200, lastUpdated: "2024-11-08T06:00:00Z" },
  { id: "mt3", fuelType: "Diesel", capacity: 15000, currentLevel: 11800, lastUpdated: "2024-11-08T06:00:00Z" },
  { id: "mt4", fuelType: "DEF", capacity: 5000, currentLevel: 4200, lastUpdated: "2024-11-08T06:00:00Z" },
];

export const mockTruckFuelLevels: TruckFuelLevel[] = [
  { truckId: "tr1", truckPlate: "WF-1001", driverName: "Marcus Rivera", fuelType: "Regular", capacity: 3000, currentLevel: 2200, lastUpdated: "2024-11-08T07:30:00Z" },
  { truckId: "tr1", truckPlate: "WF-1001", driverName: "Marcus Rivera", fuelType: "Diesel", capacity: 1500, currentLevel: 900, lastUpdated: "2024-11-08T07:30:00Z" },
  { truckId: "tr2", truckPlate: "WF-1002", driverName: "Jordan Kelley", fuelType: "Regular", capacity: 2500, currentLevel: 1800, lastUpdated: "2024-11-08T07:45:00Z" },
  { truckId: "tr4", truckPlate: "WF-1004", driverName: "Diana Cortez", fuelType: "Regular", capacity: 3500, currentLevel: 3100, lastUpdated: "2024-11-08T07:50:00Z" },
];

export const mockPackagedGoods: PackagedGood[] = [
  { id: "pg1", name: "DEF Jugs (2.5 gal)", unit: "jugs", quantity: 144, minStockAlert: 24, lastUpdated: "2024-11-07T16:00:00Z" },
  { id: "pg2", name: "Fuel Additive (1 qt)", unit: "bottles", quantity: 48, minStockAlert: 12, lastUpdated: "2024-11-06T14:00:00Z" },
  { id: "pg3", name: "Oil Dry Absorbent (50 lb)", unit: "bags", quantity: 8, minStockAlert: 5, lastUpdated: "2024-11-05T11:00:00Z" },
  { id: "pg4", name: "Nozzle Dust Caps", unit: "pcs", quantity: 60, minStockAlert: 20, lastUpdated: "2024-11-04T10:00:00Z" },
];

export const mockTransferLogs: TransferLog[] = [
  { id: "tl1", type: "third-party-purchase", toId: "mt1", toName: "Regular Main Tank", fuelType: "Regular", gallons: 8000, performedBy: "Admin", notes: "Valero delivery", createdAt: "2024-11-06T14:00:00Z" },
  { id: "tl2", type: "dispensed", fromId: "mt3", fromName: "Diesel Main Tank", fuelType: "Diesel", gallons: 200, performedBy: "Jordan Kelley", notes: "Load for WF-1002", createdAt: "2024-11-07T06:00:00Z" },
  { id: "tl3", type: "truck-to-main", fromId: "tr3", fromName: "WF-1003", toId: "mt3", toName: "Diesel Main Tank", fuelType: "Diesel", gallons: 450, performedBy: "Admin", notes: "WF-1003 decommission transfer", createdAt: "2024-11-07T15:00:00Z" },
  { id: "tl4", type: "dispensed", fromId: "mt1", fromName: "Regular Main Tank", fuelType: "Regular", gallons: 3000, performedBy: "Marcus Rivera", notes: "Load for WF-1001", createdAt: "2024-11-08T05:45:00Z" },
];
