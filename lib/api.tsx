// api/products.js
import { Product } from "@/utils/types";
import axios from "axios";

export const fetchProducts = async (url: string): Promise<Product[]> => {
  try {
    const response = await axios.get<{ products: Product[] }>(url);
    return response.data.products || []; // Ensure an empty array is returned if no products are fetched
  } catch (error) {
    console.error(error);
    return []; // Return an empty array in case of an error
  }
};

export const fetchProductById = async (url: string, productId: string) => {
  try {
    const result = await axios.get<Product>(`${url}${productId}`);
    return result.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err;
    } else {
      console.error(err);
    }
  }
};