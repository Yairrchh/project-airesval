"use client"

import { Inter } from "next/font/google";
import Navbar from "./navbar/navbar";
import Footer from "./footer/page";
import { PrimeReactProvider } from 'primereact/api'; 
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css'; // iconos

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <SessionProvider>
      <PrimeReactProvider>
        <html lang="en">
          <body className="flex flex-col min-h-screen">
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
