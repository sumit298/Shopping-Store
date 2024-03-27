"use client";
import React, { useContext } from "react";
import Cart from "../cart/page";
import { ToastContainer, toast } from "react-toastify";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";

import { getUnique, groupByCategory } from "../../utils/helperFunctions";
import { ProductContext } from "@/lib/productContext";
import SkeletonCard from "@/components/Skeleton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartContext } from "@/lib/cartContext";
import type { Product } from "@/utils/types";
const Product = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
 
  const router = useRouter();
  const toggle = () => {
    setShowModal(!showModal);
  };

  const { products, loading, error } = useContext(ProductContext);
  const { addToCart, cartItems } = useContext(CartContext);

  

  const uniqueCategory = getUnique(products);

  const notifyError = () =>
    toast(`${error}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      type: "error",
      style: {
        backgroundColor: "#fff",
        color: "#000",
      },
    });

  

  const productNames = () => {
    return products?.map((product: Product) => {
      const {
        id,
        title,
        category,
        price,
        discountPercentage,
        description,
        images,
        rating,
        stock,
        thumbnail,
      } = product;

      return {
        id,
        name: title,
        category,
        price,
        discountPercentage,
        description,
        thumbnail,
        images,
        rating,
        stock,
      };
    });
  };

  const productArray = productNames();

  const [selectedCategory, setSelectedCategory] = React.useState("");

  const filteredProducts = React.useMemo(() => {
    if (!selectedCategory) {
      return products;
    }
    const groupedProducts = groupByCategory(products);
    return groupedProducts[selectedCategory] || [];
  }, [products, selectedCategory]);

  const handleCategoryClick = (category: React.SetStateAction<string>) => {
    setSelectedCategory(category);
  };
  let dataToShow: React.ReactNode;
  if (error) {
    dataToShow = <div>Error Occured: {error.message} </div>;
  } else if (loading) {
    dataToShow = <SkeletonCard />;
  } else {
    dataToShow = (
      <>
        <div className="flex flex-col justify-center h-auto bg-gray-50 dark:bg-gray-800">
          <div className="lg:flex justify-between items-center md:block md:w-full px-20 py-5">
            <div className="flex items-center justify-between gap-x-8">
              <Link
                href="/"
                className="text-2xl uppercase font-bold mt-10 text-center mb-10 dark:text-white"
              >
                Shopping Store
              </Link>
            </div>

            <div className="flex gap-x-4 items-center">

              {!showModal && (
                <button
                  className="px-4 py-3 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-200 focus:outline-none focus:bg-gray-700 dark:bg-gray-100 dark:text-black"
                  onClick={toggle}
                >
                  Cart ({cartItems?.length})
                </button>
              )}
            </div>
          </div>
          <div className="flex gap-2 p-10 flex-wrap ">
            {uniqueCategory?.map((product) => {
              return (
                <div className="flex flex-col" key={product.id}>
                  <button
                    className="bg-gray-200 p-2 w-fit capitalize text-gray-700 mt-4 rounded pointer-cursor hover:bg-gray-100 focus:bg-black focus:text-white text-sm"
                    onClick={() => handleCategoryClick(product.category)}
                  >
                    {product.category}
                  </button>
                </div>
              );
            })}
          </div>
          <div
            className="grid gap-4 px-10 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 "
            // key={product.id}
          >
            {filteredProducts?.map((product) => {
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
                // dispatch(productAddToCart(userId, productAddedToCartObject));
              };

              return (
                <div
                  key={product.id}
                  className="bg-white shadow-md rounded-lg p-10 dark:bg-black"
                >
                  <button
                    onClick={() => router.push(`/products/${product.id}`)}
                  >
                    <img
                      src={product.thumbnail}
                      alt=""
                      className="rounded-md h-48"
                    />
                  </button>
                  <div className="mt-4">
                    <h1 className="text-lg uppercase font-semibold  dark:text-white">
                      {product.title}
                    </h1>
                    <p className="mt-2 text-gray-500 text-sm dark:text-white">
                      {product.description.slice(0, 40)}...
                    </p>
                    <p className="mt-2 text-gray-500 dark:text-white">
                      ${product.price}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-col justify-between items-center">
                    <button
                      className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                      onClick={() => handleFunction()}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {showModal && <Cart showModal={showModal} toggle={toggle} />}
        </div>
        <ToastContainer/>
      </>
    );
  }

  return <>{dataToShow}</>;
};

export default Product;
