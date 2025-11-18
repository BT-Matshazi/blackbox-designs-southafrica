/**
 * Invoice Domain Model
 * Represents the structure of invoices in the system
 */

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceClient {
  name: string;
  email: string;
  company?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface InvoiceCompany {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  registrationNumber?: string;
  vatNumber?: string;
  website?: string;
  logo?: string;
}

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "cancelled";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  status: InvoiceStatus;

  // Client information
  client: InvoiceClient;

  // Company information
  company: InvoiceCompany;

  // Line items
  items: InvoiceLineItem[];

  // Calculations
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discount: number;
  total: number;

  // Additional information
  paymentTerms?: string;
  notes?: string;

  // Metadata
  createdAt: string;
  updatedAt: string;
}

export const DEFAULT_COMPANY_INFO: InvoiceCompany = {
  name: "Blackbox Designs",
  email: "info@blackboxdesigns.co.za",
  phone: "+27 61 531 4470",
  address: "142 Elinta Avenue, Northwold",
  city: "Johannesburg",
  postalCode: "2192",
  country: "South Africa",
  registrationNumber: "2024/123456/07",
  vatNumber: "4123456789",
  website: "www.blackboxdesigns.co.za",
};

export const DEFAULT_PAYMENT_TERMS = `Payment is due within 30 days of the invoice date. Please make payment to:

Bank: Standard Bank
Account Name: Blackbox Designs
Account Number: 123456789
Branch Code: 051001

Please use invoice number as payment reference.`;
