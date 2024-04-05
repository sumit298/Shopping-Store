"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import ProductProvider from "@/lib/productContext";
import CartProvider from "@/lib/cartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from 'next/head'; // Import the Head component

const inter = Inter({ subsets: ["latin"] });

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
            <Head>
              <title>Shopping Store</title>
              <meta name="description" content="Shopping for your all needs" />
             
            </Head>
            {children}
            <Footer/>
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
 );
}
