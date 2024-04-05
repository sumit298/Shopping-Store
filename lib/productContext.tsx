import type { Product } from "@/utils/types";
import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";



interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: Error | null;
  fetchProductById: (productId: string) => Promise<void>;
  product: Product | null; 
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: true,
  error: null,
  fetchProductById: async () => {},
  product: null,
});

const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const productsUrl = "https://dummyjson.com/products";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [product, setProduct] = useState<Product | null>(null);

  const fetchProductById = async (productId: string) => {
    try {
      setLoading(true);
      const result = await axios.get(
        `https://dummyjson.com/products/${productId}`
      );
      setProduct(result.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get<{ products: Product[] }>(productsUrl);
        setProducts(result.data.products || []);
      } catch (error: any) {
        setError(error);
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
