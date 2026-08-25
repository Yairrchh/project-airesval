"use client"

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Navbar from "./navbar/navbar";
import Footer from "./footer/page";
import { PrimeReactProvider } from 'primereact/api';
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css'; // iconos


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <SessionProvider>
      <PrimeReactProvider>
        <html lang="en">
          <body className={`${GeistSans.variable} ${GeistMono.variable} flex flex-col min-h-screen bg-paper text-ink font-sans`}>
            <header className="relative z-10">
              <Navbar/>
            </header>
            {children}
            <Footer/>
            </body>
        </html>
    </PrimeReactProvider>
    </SessionProvider>
  );
}
