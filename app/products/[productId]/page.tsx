"use client";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProductContext } from "@/lib/productContext";
import Spinner from "@/components/Spinner";
import ImageSlider from "@/components/ImageSlider";
import { CartContext } from "@/lib/cartContext";
import {toast} from 'react-toastify'
import Cart from "@/app/cart/page";

interface params {
  productId: number;
}

type ProductImages = {
  productImages: string[];
};

const ProductDetails: React.FC = ({ params }: any) => {
  const router = useRouter();
  const { fetchProductById, product, loading, error } =
    useContext(ProductContext);
  console.log(params);

  const { productId } = params;
  const { addToCart, showModal } = useContext(CartContext);

  useEffect(() => {
    fetchProductById(productId);
  }, [productId]);

  console.log(product);

  const calculateDiscountPrice = (
    totalPrice: number,
    discountPercentage: number
  ) => {
    const discountAmount = (discountPercentage * totalPrice) / 100;
    const discountedPrice = totalPrice - discountAmount;
    return Math.round(discountedPrice);
  };

  const notify = () =>
    toast(`${product.title} is added to the cart`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      type: "success",
      style: {
        backgroundColor: "#fff",
        color: "#000",
      },
    });

  const handleFunction = () => {
    notify();

    // Correctly create a CartItem object
    const cartItem: any = {
      id: product.id,
      name: product.title, // Assuming 'title' is the correct property for the product name
      price: product.price,
      quantity: 1, // Assuming you want to add 1 quantity of the product,
      thumbnail: product.thumbnail,
    };

    addToCart(cartItem);
  };

  return !!loading ? (
    <Spinner />
  ) : (
    <div className="flex align-center dark:bg-gray-800 h-[80vh] overflow-y-hidden">
      {error ? (
        <>Error {error}</>
      ) : (
        <>
          <div className="mx-[6%] w-[35%] ">
            <ImageSlider productImages={product?.images} />
          </div>
          <div className="flex flex-col">
            <p className="bg-gray-200 mb-2 p-1.5 w-fit capitalize text-gray-700 rounded pointer-cursor hover:bg-gray-100">
              {product?.category}
            </p>
            <p className="text-lg text-gray-600 dark:text-white">
              {product?.brand}
            </p>
            <p className="text-3xl font-semibold dark:text-white">
              {product?.title}
            </p>
            <p className="text-xl text-pink-500">${product?.price} USD</p>
            <p className="dark:text-white">{product?.stock} items left</p>
            <p className="text-gray-500 text-sm dark:text-gray-300">
              {product?.description}
            </p>
            <p className="text-red-500"> -{product?.discountPercentage}%</p>
            <p className="text-gray-500 px-1 ">
              <span className="dark:text-white">Discounted Price: </span>
              <span className="text-xl text-blue-700 dark:text-blue-400">
                $
                {calculateDiscountPrice(
                  product?.price,
                  product?.discountPercentage
                )}{" "}
                USD
              </span>
            </p>
            <div className="mt-6 flex flex-col">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => handleFunction()}
              >
                Add to cart
              </button>
            </div>
          </div>
        </>
      )}
       {showModal && <Cart />}
    </div>
  );
};

export default ProductDetails;
