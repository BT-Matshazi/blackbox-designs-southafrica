import { Invoice } from "@/src/application/domain/invoice.domain";

const STORAGE_KEY = "blackbox_invoices";

export const invoiceStorage = {
  // Get all invoices
  getAll(): Invoice[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  // Get invoice by ID
  getById(id: string): Invoice | null {
    const invoices = this.getAll();
    return invoices.find((inv) => inv.id === id) || null;
  },

  // Save invoice (create or update)
  save(invoice: Invoice): void {
    const invoices = this.getAll();
    const index = invoices.findIndex((inv) => inv.id === invoice.id);

    if (index >= 0) {
      invoices[index] = invoice;
    } else {
      invoices.push(invoice);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
  },

  // Delete invoice
  delete(id: string): void {
    const invoices = this.getAll();
    const filtered = invoices.filter((inv) => inv.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  // Get statistics
  getStats() {
    const invoices = this.getAll();
    const totalRevenue = invoices
      .filter((inv) => inv.status === "paid")
      .reduce((sum, inv) => sum + inv.total, 0);

    const pendingPayments = invoices
      .filter((inv) => inv.status === "sent" || inv.status === "overdue")
      .reduce((sum, inv) => sum + inv.total, 0);

    const clients = new Set(invoices.map((inv) => inv.client.email)).size;

    return {
      totalInvoices: invoices.length,
      totalRevenue,
      pendingPayments,
      activeClients: clients,
    };
  },
};
