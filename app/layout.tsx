"use client";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProductProvider from "@/lib/productContext";
import CartProvider from "@/lib/cartContext";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Shopping Store",
//   description: "Shopping for your all needs",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProductProvider>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
