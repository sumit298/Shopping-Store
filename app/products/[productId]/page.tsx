"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductContext } from "@/lib/productContext";
import axios from "axios";
import Spinner from "@/components/Spinner";

interface params {
  productId: number;
}

const ProductDetails: React.FC = ({ params }: any) => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const { productId } = params;

  useEffect(() => {
    const fetchProductById = async (id: number) => {
      try {
        setLoading(true);
        const result = await axios.get(
          `https://dummyjson.com/products/${productId}`
        );
        setProduct(result.data);
        setLoading(false);
      } catch (err: any) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProductById(productId);
    // fetchProduct();
  }, [productId]);

  const calculateDiscountPrice = (
    totalPrice: number,
    discountPercentage: number
  ) => {
    const discountAmount = (discountPercentage * totalPrice) / 100;
    const discountedPrice = totalPrice - discountAmount;
    return Math.round(discountedPrice);
  };

  return (
    !!loading ? <Spinner/> : 
    <div className="flex justify-between dark:bg-gray-800">
      
      {error ? (
        <>Error {error}</>
      ) : (
        <>
          <div className="p-10 flex flex-col justify-start w-1/2 items-start bg-gray-100 dark:bg-gray-700 gap-y-4">
            <img className="" src={product?.thumbnail} alt={product?.title} />
            <div>
              {product?.images?.map((image: string, index: number) => (
                <img
                  className="h-64 my-4"
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  key={index}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col p-20">
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
