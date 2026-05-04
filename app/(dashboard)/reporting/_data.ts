import type { ChartDataPoint, DriverReport, CustomerReport } from "@/types/reporting";

export const mockChartData: ChartDataPoint[] = [
  { date: "Oct 7", gallons: 8200, revenue: 38542, jobs: 22 },
  { date: "Oct 14", gallons: 9500, revenue: 44800, jobs: 26 },
  { date: "Oct 21", gallons: 7800, revenue: 36890, jobs: 19 },
  { date: "Oct 28", gallons: 11200, revenue: 53240, jobs: 31 },
  { date: "Nov 4", gallons: 10400, revenue: 49800, jobs: 28 },
  { date: "Nov 11", gallons: 12100, revenue: 57900, jobs: 34 },
];

export const mockDriverReports: DriverReport[] = [
  { driverId: "d1", driverName: "Marcus Rivera", totalJobs: 48, totalGallons: 22400, totalHours: 192, avgJobsPerDay: 5.1, period: "Oct 2024" },
  { driverId: "d2", driverName: "Jordan Kelley", totalJobs: 41, totalGallons: 18900, totalHours: 176, avgJobsPerDay: 4.4, period: "Oct 2024" },
  { driverId: "d3", driverName: "Diana Cortez", totalJobs: 35, totalGallons: 15200, totalHours: 164, avgJobsPerDay: 3.7, period: "Oct 2024" },
];

export const mockCustomerReports: CustomerReport[] = [
  { customerId: "cu1", customerName: "Austin Construction LLC", totalGallons: 3240, totalSpend: 15821, jobCount: 18, avgOrderSize: 180, period: "Oct 2024" },
  { customerId: "cu2", customerName: "Capitol Fleet Services", totalGallons: 8900, totalSpend: 39450, jobCount: 32, avgOrderSize: 278, period: "Oct 2024" },
  { customerId: "cu3", customerName: "Lone Star Agriculture", totalGallons: 6200, totalSpend: 28900, jobCount: 12, avgOrderSize: 517, period: "Oct 2024" },
];
