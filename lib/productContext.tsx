import type { Product } from "@/utils/types";
import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";



interface ProductContextType {
    products: Product[];
    loading: boolean;
    error: Error | null;
}

export const ProductContext = createContext<ProductContextType>({
    products: [],
    loading: true,
    error: null,
    
});

const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const productsUrl = "https://dummyjson.com/products";
    
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await axios.get<{ products: Product[] }>(productsUrl); // Adjusted here
                setProducts(result.data.products || []);
            } catch (error: any) {
                console.error("Error fetching products:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

   

    return (
        <ProductContext.Provider value={{ products, loading, error }}>
            {children}
        </ProductContext.Provider>
    );
};


export default ProductProvider;
