"use client";
import React, { useContext, useEffect } from "react";
import Spinner from "@/components/Spinner";
import ImageSlider from "@/components/ImageSlider";
import { CartContext } from "@/lib/cartContext";
import "react-toastify/dist/ReactToastify.css";

import Cart from "@/app/cart/page";
import { notify } from "@/utils/helperFunctions";
import { CartItem } from "@/utils/types";
import { ToastContainer } from "react-toastify";
import { ProductContext } from "@/lib/productContext";

interface ProductDetailsProps {
  params: {
    productId: string;
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ params }) => {
  const { productId } = params;
  const { addToCart, showModal } = useContext(CartContext);
  const { product, loading, error, fetchProductsById } =
    useContext(ProductContext);

  useEffect(() => {
    fetchProductsById(productId);
  }, [productId, fetchProductsById]);

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
            className="w-36 font-semibold px-4 py-1.5 bg-gray-200  rounded uppercase hover:bg-gray-300 focus:outline-none"
            onClick={() => handleFunction()}
          >
            Add to cart
          </button>
        </div>
      </div>
      {showModal && <Cart />}
      <ToastContainer />
    </div>
  );
};

export default ProductDetails;
