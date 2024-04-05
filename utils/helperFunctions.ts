import type { Product } from "./types";
import {toast} from 'react-toastify'

export const groupByCategory = (products: Product[]): { [key: string]: Product[] } => {
  return products.reduce((acc: { [key: string]: Product[] }, product: Product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});
};

export const getUnique = (arr: Product[]): Product[] => {
  const newArray = arr;
  let mapObj = new Map<string, Product>();
  newArray?.forEach((v) => {
    let prevValue = mapObj.get(v.category);
    if (!prevValue) {
      mapObj.set(v.category, v);
    }
  });
  return Array.from(mapObj.values());
};


export const notify = (product: Product) =>
  toast(`${product.title} is added to the cart`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: !true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    type: "success",
    style: {
      backgroundColor: "#fff",
      color: "#000",
    },
  });