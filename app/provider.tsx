"use client";

import ProductProvider from "@/lib/productContext";
import CartProvider from "@/lib/cartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ProductProvider>
      <CartProvider>
        <Navbar />
        {children}
        <Footer />
      </CartProvider>
    </ProductProvider>
  );
}
