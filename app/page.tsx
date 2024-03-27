"use client";
import { Header } from "@/components/Header/headers";

import ProductProvider from "@/lib/productContext";
import ProductList from "./products/page";
import CartProvider from "@/lib/cartContext";
export default function Home() {
  return (
    <ProductProvider>
      <CartProvider>
        {/* <Header /> */}
        <ProductList />
      </CartProvider>
    </ProductProvider>
  );
}
