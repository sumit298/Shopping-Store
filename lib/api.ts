// api/products.js
import { Product } from "@/utils/types";
import axios from "axios";

const productsUrl = "https://dummyjson.com/products/";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<{ products: Product[] }>(productsUrl);
    return response.data.products || []; // Ensure an empty array is returned if no products are fetched
  } catch (error) {
    console.error(error);
    return []; // Return an empty array in case of an error
  }
};

export const fetchProductById = async (productId: string) => {
  try {
    const result = await axios.get<Product>(`${productsUrl}${productId}`);
    return result.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err;
    } else {
      console.error(err);
    }
  }
};
