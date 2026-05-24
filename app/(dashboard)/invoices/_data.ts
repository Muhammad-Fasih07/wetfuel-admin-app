export interface MockInvoice {
  id: string;
  customerId: string;
  invoiceNumber: string;
  customerName: string;
  amount: number;
  status: "Paid" | "Outstanding" | "Draft" | "Overdue";
  date: string;
  dueDate: string;
}

export const mockInvoices: MockInvoice[] = [
  { id: "inv1", customerId: "cu2", invoiceNumber: "INV-2024-0041", customerName: "Capitol Fleet Services", amount: 8420.50, status: "Paid", date: "2024-11-01", dueDate: "2024-11-15" },
  { id: "inv2", customerId: "cu3", invoiceNumber: "INV-2024-0042", customerName: "Lone Star Agriculture", amount: 14830.00, status: "Outstanding", date: "2024-11-03", dueDate: "2024-11-17" },
  { id: "inv3", customerId: "cu1", invoiceNumber: "INV-2024-0043", customerName: "Austin Construction LLC", amount: 3210.25, status: "Outstanding", date: "2024-11-05", dueDate: "2024-11-19" },
  { id: "inv4", customerId: "cu2", invoiceNumber: "INV-2024-0044", customerName: "Capitol Fleet Services", amount: 6950.75, status: "Draft", date: "2024-11-07", dueDate: "2024-11-21" },
  { id: "inv5", customerId: "cu1", invoiceNumber: "INV-2024-0045", customerName: "Austin Construction LLC", amount: 293.23, status: "Paid", date: "2024-11-06", dueDate: "2024-11-20" },
  { id: "inv6", customerId: "cu3", invoiceNumber: "INV-2024-0040", customerName: "Lone Star Agriculture", amount: 22180.00, status: "Overdue", date: "2024-10-15", dueDate: "2024-10-29" },
  { id: "inv7", customerId: "cu1", invoiceNumber: "INV-2024-0038", customerName: "Austin Construction LLC", amount: 1840.00, status: "Draft", date: "2024-11-07", dueDate: "2024-11-21" },
  { id: "inv8", customerId: "cu1", invoiceNumber: "INV-2024-0037", customerName: "Austin Construction LLC", amount: 920.50, status: "Overdue", date: "2024-10-20", dueDate: "2024-11-03" },
  { id: "inv9", customerId: "cu2", invoiceNumber: "INV-2024-0036", customerName: "Capitol Fleet Services", amount: 4120.00, status: "Paid", date: "2024-10-28", dueDate: "2024-11-11" },
  { id: "inv10", customerId: "cu3", invoiceNumber: "INV-2024-0035", customerName: "Lone Star Agriculture", amount: 5620.75, status: "Paid", date: "2024-10-10", dueDate: "2024-10-24" },
];

export const INVOICE_STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  Paid: { bg: "rgba(34,197,94,0.15)", color: "#4ade80" },
  Outstanding: { bg: "rgba(59,130,246,0.15)", color: "#60a5fa" },
  Draft: { bg: "rgba(255,255,255,0.08)", color: "#94a3b8" },
  Overdue: { bg: "rgba(239,68,68,0.15)", color: "#f87171" },
};
