"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { InvoiceForm } from "@/components/invoice/invoice-form";
import { InvoicePreview } from "@/components/invoice/invoice-preview";
import { Invoice } from "@/src/application/domain/invoice.domain";
import { invoiceStorage } from "@/lib/utils/invoice-storage";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewInvoicePage() {
  const router = useRouter();
  const [showPreview, setShowPreview] = useState(false);
  const [previewInvoice, setPreviewInvoice] = useState<Invoice | null>(null);

  const handleSave = (invoice: Invoice) => {
    try {
      invoiceStorage.save(invoice);
      toast.success("Invoice saved successfully!");
      router.push("/dashboard/invoices");
    } catch (error) {
      toast.error("Failed to save invoice");
      console.error(error);
    }
  };

  const handlePreview = (invoice: Invoice) => {
    setPreviewInvoice(invoice);
    setShowPreview(true);
  };

  const handleDownload = () => {
    // For now, this will trigger print dialog
    // In production, use a library like jsPDF or react-pdf
    window.print();
    toast.info("Use Print to PDF option in your browser");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/invoices">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Create New Invoice</h1>
            <p className="text-muted-foreground mt-1">
              Fill in the details below to generate an invoice
            </p>
          </div>
        </div>

        <InvoiceForm onSave={handleSave} onPreview={handlePreview} />
      </div>

      {showPreview && previewInvoice && (
        <InvoicePreview
          invoice={previewInvoice}
          onClose={() => setShowPreview(false)}
          onDownload={handleDownload}
        />
      )}
    </DashboardLayout>
  );
}
