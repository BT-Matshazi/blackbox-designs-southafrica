import { Inter } from "next/font/google";
import "./globals.css";
import ToasterContext from "@/lib/context/ToasterContext";
import { constructMetadata } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children} <ToasterContext />
        <Analytics />
      </body>
    </html>
  );
}
