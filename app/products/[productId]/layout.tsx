import React from "react";
import { productsUrl } from "@/utils/constants";

type Props = {
  params: { productId: string };
};

export async function generateMetadata(
  { params }: Props,
 
) {
  const { productId } = params;
  const product = await fetch(`${productsUrl}${productId}`).then((res) =>
    res.json()
  );
  return {
    title: `${product?.title}` || "Shopping Store",
    description: `${product?.description}`,
    icons: {
      icon: `${product?.thumbnail}`,
    },
  };
}

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div>{children}</div>;
};

export default Layout;
