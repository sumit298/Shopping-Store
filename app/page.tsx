"use client";

import Meta from "./meta.server";
import ProductList from "./products/page";
export default function Home() {
  return (
    <>
      <Meta title="Shopping Store" description="Welcome to our shopping app"/>
      <ProductList />
    </>
  );
}
