import type { Product } from "@/utils/types";
import axios, { AxiosError } from "axios"; 
import { createContext, ReactNode, useEffect, useState } from "react";

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: AxiosError | null; 
  fetchProductById: (productId: string) => Promise<void>;
  product?: Product; 
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: true,
  error: null,
  fetchProductById: async () => {},
});

const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const productsUrl = "https://dummyjson.com/products/";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null); // Use AxiosError for error state
  const [product, setProduct] = useState<Product | undefined>(undefined);

  const fetchProductById = async (productId: string) => {
    try {
      setLoading(true);
      const result = await axios.get<Product>(
        `${productsUrl}${productId}`
      );
      setProduct(result.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err); // Set AxiosError type error
      } else {
        console.error(err)
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get<{ products: Product[] }>(productsUrl);
        setProducts(result.data.products || []);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err); 
        } else {
          console.error(err)
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, loading, error, fetchProductById, product }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
