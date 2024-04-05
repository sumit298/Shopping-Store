"use client";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProductContext } from "@/lib/productContext";
import Spinner from "@/components/Spinner";
import ImageSlider from "@/components/ImageSlider";

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

  return !!loading ? (
    <Spinner />
  ) : (
    <div className="flex justify-between dark:bg-gray-800">
      {error ? (
        <>Error {error}</>
      ) : (
        <>
          <div className="mx-[10%] w-[35%] ">
            <ImageSlider productImages={product?.images} />
          </div>
          <div className="flex flex-col">
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
            <p className="bg-gray-200 p-2 w-fit capitalize text-gray-700 mt-4 rounded pointer-cursor hover:bg-gray-100">
              {product?.category}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
