"use client";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProductProvider from "@/lib/productContext";
import CartProvider from "@/lib/cartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";

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
            <Footer/>
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
