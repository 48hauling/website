export const metadata = {
  title: "48 Hauling",
  description: "Reliable hauling, built for the grind. Phoenix-based dump trucks and commercial transportation services.",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: '48 Hauling',
  },
  formatDetection: {
    telephone: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#E7B75F',
};

import "./globals.css";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}

