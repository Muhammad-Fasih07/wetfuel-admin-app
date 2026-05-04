export interface ReportingStats {
  totalGallonsDelivered: number;
  totalRevenue: number;
  totalJobs: number;
  activeDrivers: number;
  avgGallonsPerJob: number;
  topCustomers: TopEntity[];
  topDrivers: TopEntity[];
}

export interface TopEntity {
  id: string;
  name: string;
  value: number;
  change: number;
}

export interface ChartDataPoint {
  date: string;
  gallons: number;
  revenue: number;
  jobs: number;
}

export interface DriverReport {
  driverId: string;
  driverName: string;
  totalJobs: number;
  totalGallons: number;
  totalHours: number;
  avgJobsPerDay: number;
  period: string;
}

export interface CustomerReport {
  customerId: string;
  customerName: string;
  totalGallons: number;
  totalSpend: number;
  jobCount: number;
  avgOrderSize: number;
  period: string;
}

export interface InventoryMovementReport {
  date: string;
  received: number;
  dispensed: number;
  netChange: number;
  closingBalance: number;
}
