"use client";
import React, { useContext, useEffect } from "react";
import { ProductContext } from "@/lib/productContext";
import Spinner from "@/components/Spinner";
import ImageSlider from "@/components/ImageSlider";
import { CartContext } from "@/lib/cartContext";
import "react-toastify/dist/ReactToastify.css";

import Cart from "@/app/cart/page";
import { notify } from "@/utils/helperFunctions";
import { CartItem, Product } from "@/utils/types";

interface ProductDetailsProps {
  params: {
    productId: string;
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ params }) => {
  const { fetchProductById, product, loading, error } =
    useContext(ProductContext);

  const { productId } = params;
  const { addToCart, showModal } = useContext(CartContext);

  useEffect(() => {
    fetchProductById(productId);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  if (loading) return <Spinner />;

  if (error) return <>Error {error}</>;

  if (!product) return null; // Handle case where product is not defined yet

  const calculateDiscountPrice = (
    totalPrice: number,
    discountPercentage?: number
  ) => {
    if (discountPercentage === undefined) {
      return totalPrice;
    }

    const discountAmount = (discountPercentage * totalPrice) / 100;
    const discountedPrice = totalPrice - discountAmount;
    return Math.round(discountedPrice);
  };

  const handleFunction = () => {
    notify(product);

    const cartItem: CartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      thumbnail: product.thumbnail,
    };

    addToCart(cartItem);
  };

  return (
    <div className="flex  align-center dark:bg-gray-800 h-[70vh] overflow-y-hidden">
      <div className="mx-[6%] w-[35%] ">
        <ImageSlider productImages={product.images || []} />
      </div>
      <div className="flex flex-col">
        <p className="bg-gray-200 mb-2 p-1.5 w-fit capitalize text-gray-700 rounded pointer-cursor hover:bg-gray-100">
          {product.category}
        </p>
        <p className="text-lg text-gray-600 dark:text-white">{product.brand}</p>
        <p className="text-3xl font-semibold dark:text-white">
          {product.title}
        </p>
        <p className="text-xl text-pink-500">${product.price} USD</p>
        <p className="dark:text-white">{product.stock} items left</p>
        <p className="text-gray-500 text-sm dark:text-gray-300 w-[80%]">
          {product.description}
        </p>
        <p className="text-red-500"> -{product.discountPercentage}%</p>
        <p className="text-gray-500 px-1 ">
          <span className="dark:text-white">Discounted Price: </span>
          <span className="text-xl text-blue-700 dark:text-blue-400">
            ${calculateDiscountPrice(product.price, product.discountPercentage)}{" "}
            USD
          </span>
        </p>
        <div className="mt-6 flex flex-col">
          <button
            className="text-white w-[80%] bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => handleFunction()}
          >
            Add to cart
          </button>
        </div>
      </div>
      {showModal && <Cart />}
    </div>
  );
};

export default ProductDetails;
