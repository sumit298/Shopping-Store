import type { Product } from "@/utils/types";
import axios, { AxiosError } from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { fetchProductById, fetchProducts } from "./api"; // Assuming this is the correct import

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: AxiosError | null;
  fetchProductsById: (productId: string) => Promise<void>;
  product?: Product;
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: true,
  error: null,
  fetchProductsById: async () => {},
});

const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const [product, setProduct] = useState<Product | undefined>();
  const productsUrl = `${process.env.NEXT_PUBLIC_PRODUCTS_URL}`;

  const fetchProductsById = async (productId: string) => {
    try {
      setLoading(true);
      const product = await fetchProductById(productsUrl, productId);
      setProduct(product);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err);
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await fetchProducts(productsUrl);
        setProducts(fetchedProducts);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err);
        } else {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productsUrl]);

  return (
    <ProductContext.Provider
      value={{ products, loading, error, fetchProductsById, product }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
