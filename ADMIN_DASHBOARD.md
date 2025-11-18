# Admin Dashboard Documentation

## Overview

The Blackbox Designs admin dashboard provides a comprehensive invoice management system with the following features:

- **Dashboard Overview**: Real-time statistics on invoices, revenue, and clients
- **Invoice Generator**: Full-featured invoice creation with line items, tax calculations, and discounts
- **Invoice Management**: View, edit, preview, and delete invoices
- **Professional Invoice Templates**: Beautifully designed invoices ready for client delivery
- **PDF Export**: Print-to-PDF functionality via browser

## Accessing the Dashboard

Navigate to `/dashboard` to access the admin dashboard.

**Note**: Authentication is not yet implemented. See [Security](#security) section below.

## Features

### 1. Dashboard (`/dashboard`)

The main dashboard displays:
- Total invoices created
- Total revenue (from paid invoices)
- Number of active clients
- Pending payments amount

**Quick Actions:**
- Create New Invoice
- View All Invoices

### 2. Invoice Generator (`/dashboard/invoices/new`)

Create professional invoices with:

**Invoice Details:**
- Auto-generated invoice number
- Invoice date and due date
- Status (Draft, Sent, Paid, Overdue, Cancelled)

**Client Information:**
- Name, email, company
- Full address details
- Country

**Line Items:**
- Add unlimited line items
- Description, quantity, and rate
- Automatic amount calculation
- Easy add/remove items

**Calculations:**
- Subtotal
- Tax/VAT (configurable rate, default 15%)
- Discount
- Grand total (auto-calculated)

**Additional Information:**
- Payment terms with bank details
- Optional notes

**Actions:**
- Save invoice
- Preview invoice
- Download PDF

### 3. Invoice List (`/dashboard/invoices`)

Manage all invoices:
- View all invoices in a table
- See invoice number, client, dates, amount, and status
- Quick actions: View, Download, Delete
- Status badges with color coding
- Search and filter (coming soon)

### 4. Invoice Preview

Professional invoice template featuring:
- Company branding (Blackbox Designs)
- Company details (address, contact, registration)
- Client information
- Detailed line items table
- Tax and discount breakdown
- Payment terms
- Optional notes
- Status badge

## Data Storage

**Current Implementation:** LocalStorage
- All invoices are stored in the browser's localStorage
- Data persists between sessions
- Limited to single-device access

**Production Recommendation:**
Replace localStorage with a proper database:
- MongoDB (via Payload CMS)
- PostgreSQL
- Firebase
- Supabase

To migrate, update:
- `lib/utils/invoice-storage.ts` - Replace with API calls
- Create backend API routes for CRUD operations

## PDF Generation

### Current Implementation

The dashboard uses the browser's built-in **Print to PDF** functionality:

1. Click "Download PDF" button
2. Browser opens print dialog
3. Select "Save as PDF" as printer
4. PDF is saved to your downloads

### Production-Ready PDF Solutions

For automated PDF generation without print dialog, consider:

#### Option 1: jsPDF + html2canvas
```bash
npm install jspdf html2canvas
```

```typescript
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const generatePDF = async () => {
  const element = document.getElementById('invoice-content');
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF();
  pdf.addImage(imgData, 'PNG', 0, 0);
  pdf.save('invoice.pdf');
};
```

#### Option 2: react-pdf
```bash
npm install @react-pdf/renderer
```

```typescript
import { Document, Page, Text, View, PDFDownloadLink } from '@react-pdf/renderer';

const InvoicePDF = ({ invoice }) => (
  <Document>
    <Page>
      <View>
        <Text>Invoice #{invoice.invoiceNumber}</Text>
        {/* ...invoice content */}
      </View>
    </Page>
  </Document>
);

// Usage
<PDFDownloadLink document={<InvoicePDF invoice={invoice} />} fileName="invoice.pdf">
  {({ loading }) => loading ? 'Loading...' : 'Download PDF'}
</PDFDownloadLink>
```

#### Option 3: Puppeteer (Server-side)
For server-side PDF generation:

```bash
npm install puppeteer
```

```typescript
// app/api/generate-pdf/route.ts
import puppeteer from 'puppeteer';

export async function POST(request: Request) {
  const invoice = await request.json();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(invoiceHTML);
  const pdf = await page.pdf({ format: 'A4' });
  await browser.close();

  return new Response(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=invoice.pdf'
    }
  });
}
```

## Company Information

Default company information is configured in:
`src/application/domain/invoice.domain.ts`

```typescript
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
```

Update these values to match your actual company details.

## Security

### Current State
⚠️ **No authentication is currently implemented**

The dashboard is publicly accessible. Anyone who knows the URL can:
- View all invoices
- Create new invoices
- Delete invoices

### Recommended Implementation

#### Option 1: Basic Password Protection
Simple password middleware:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const authCookie = request.cookies.get('dashboard-auth');

    if (!authCookie || authCookie.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}
```

#### Option 2: NextAuth.js
Full authentication with multiple providers:

```bash
npm install next-auth
```

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Verify credentials against database
        return user;
      }
    })
  ],
  pages: {
    signIn: '/login',
  }
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

#### Option 3: Clerk
Managed authentication service:

```bash
npm install @clerk/nextjs
```

Provides:
- User management UI
- OAuth providers
- Role-based access control
- Session management

## Future Enhancements

### High Priority
- [ ] User authentication and authorization
- [ ] Database integration (replace localStorage)
- [ ] Automated PDF generation
- [ ] Email invoice to clients
- [ ] Invoice templates (multiple designs)
- [ ] Invoice history and versioning

### Medium Priority
- [ ] Recurring invoices
- [ ] Payment tracking and reminders
- [ ] Multi-currency support
- [ ] Invoice numbering customization
- [ ] Client management system
- [ ] Expense tracking

### Nice to Have
- [ ] Dashboard analytics and charts
- [ ] Export to CSV/Excel
- [ ] Invoice templates customization
- [ ] WhatsApp/SMS notifications
- [ ] Payment gateway integration
- [ ] Tax compliance reports

## API Integration Example

For future database integration, here's the recommended structure:

```typescript
// app/api/invoices/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const invoices = await db.invoice.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' }
  });

  return NextResponse.json(invoices);
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await request.json();
  const invoice = await db.invoice.create({
    data: { ...data, userId: session.user.id }
  });

  return NextResponse.json(invoice);
}
```

## Troubleshooting

### Invoices not persisting
- Check browser console for localStorage errors
- Ensure you're using the same browser and not in incognito mode
- Check browser storage limits (usually 5-10MB)

### PDF download not working
- Ensure popup blocker is disabled
- Try different browser
- Check print permissions

### Styling issues
- Clear browser cache
- Check if Tailwind is properly configured
- Verify all dependencies are installed

## Support

For issues or questions about the admin dashboard:
- Email: info@blackboxdesigns.co.za
- Phone: +27 61 531 4470

## License

Copyright © 2025 Blackbox Designs. All rights reserved.
