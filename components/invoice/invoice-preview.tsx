"use client";

import { Invoice } from "@/src/application/domain/invoice.domain";
import { Button } from "@/components/ui/button";
import { Download, Printer, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface InvoicePreviewProps {
  invoice: Invoice;
  onClose: () => void;
  onDownload: () => void;
}

export function InvoicePreview({ invoice, onClose, onDownload }: InvoicePreviewProps) {
  const handlePrint = () => {
    window.print();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500";
      case "sent":
        return "bg-blue-500";
      case "overdue":
        return "bg-red-500";
      case "cancelled":
        return "bg-gray-500";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white max-w-4xl w-full rounded-lg shadow-2xl my-8">
        {/* Header actions */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 print:hidden">
          <h2 className="text-lg font-semibold text-gray-900">Invoice Preview</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={onDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Invoice content */}
        <div className="p-8 md:p-12 bg-white text-gray-900" id="invoice-content">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#D43F52] to-[#E55A6F] bg-clip-text text-transparent mb-2">
                {invoice.company.name}
              </h1>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{invoice.company.address}</p>
                <p>{invoice.company.city}, {invoice.company.postalCode}</p>
                <p>{invoice.company.country}</p>
                <p className="mt-2">{invoice.company.email}</p>
                <p>{invoice.company.phone}</p>
                {invoice.company.website && <p>{invoice.company.website}</p>}
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-2 mb-4">
                <h2 className="text-3xl font-bold text-gray-900">INVOICE</h2>
                <Badge className={getStatusColor(invoice.status)}>
                  {invoice.status.toUpperCase()}
                </Badge>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-semibold">Invoice #:</span> {invoice.invoiceNumber}</p>
                <p><span className="font-semibold">Date:</span> {new Date(invoice.date).toLocaleDateString()}</p>
                <p><span className="font-semibold">Due Date:</span> {new Date(invoice.dueDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Bill To</h3>
            <div className="text-gray-900">
              <p className="font-semibold text-lg">{invoice.client.name}</p>
              {invoice.client.company && <p className="text-gray-600">{invoice.client.company}</p>}
              <p className="text-sm text-gray-600 mt-2">{invoice.client.address}</p>
              <p className="text-sm text-gray-600">{invoice.client.city}, {invoice.client.postalCode}</p>
              <p className="text-sm text-gray-600">{invoice.client.country}</p>
              <p className="text-sm text-gray-600 mt-2">{invoice.client.email}</p>
            </div>
          </div>

          {/* Line Items */}
          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-900">
                  <th className="text-left py-3 font-semibold text-gray-900">Description</th>
                  <th className="text-right py-3 font-semibold text-gray-900 w-20">Qty</th>
                  <th className="text-right py-3 font-semibold text-gray-900 w-32">Rate</th>
                  <th className="text-right py-3 font-semibold text-gray-900 w-32">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="py-4 text-gray-900">{item.description}</td>
                    <td className="py-4 text-right text-gray-600">{item.quantity}</td>
                    <td className="py-4 text-right text-gray-600">R {item.rate.toLocaleString()}</td>
                    <td className="py-4 text-right font-medium text-gray-900">R {item.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-full md:w-1/2 space-y-2">
              <div className="flex justify-between py-2 text-gray-600">
                <span>Subtotal:</span>
                <span className="font-medium text-gray-900">R {invoice.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 text-gray-600">
                <span>Tax ({invoice.taxRate}%):</span>
                <span className="font-medium text-gray-900">R {invoice.taxAmount.toLocaleString()}</span>
              </div>
              {invoice.discount > 0 && (
                <div className="flex justify-between py-2 text-gray-600">
                  <span>Discount:</span>
                  <span className="font-medium text-gray-900">- R {invoice.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between py-3 border-t-2 border-gray-900 text-lg font-bold">
                <span className="text-gray-900">Total:</span>
                <span className="text-[#D43F52]">R {invoice.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Payment Terms */}
          {invoice.paymentTerms && (
            <div className="mb-6 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-2">Payment Terms</h3>
              <p className="text-sm text-gray-600 whitespace-pre-line">{invoice.paymentTerms}</p>
            </div>
          )}

          {/* Notes */}
          {invoice.notes && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-2">Notes</h3>
              <p className="text-sm text-gray-600 whitespace-pre-line">{invoice.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Thank you for your business!
            </p>
            {invoice.company.registrationNumber && (
              <p className="text-xs text-gray-400 mt-2">
                Registration No: {invoice.company.registrationNumber} • VAT No: {invoice.company.vatNumber}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
