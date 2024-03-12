import "./globals.css";
import { Inter } from "next/font/google";
import { constructMetadata } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import ToasterContext from "@/lib/context/ToasterContext";
import Script from "next/script";

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
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-HKT0W676JL"
        ></Script>
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-HKT0W676JL');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
        <ToasterContext />
      </body>
    </html>
  );
}
