import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

interface ProductContextType {
    products: Product[];
    loading: boolean;
    error: Error | null;
    getProductById: (id: number) => Promise<Product | null>;
}

export const ProductContext = createContext<ProductContextType>({
    products: [],
    loading: true,
    error: null,
    getProductById: async () => null,
    
});

const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const productsUrl = "https://dummyjson.com/products";
    const productUrl = "https://dummyjson.com/products";
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await axios.get<Product[]>(productsUrl);
                console.log(result.data);
                setProducts(result.data.products || []); // Adjusted here
            } catch (error) {
                console.error("Error fetching products:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const getProductById = async (id: number): Promise<Product | null> => {
        try {
            const result = await axios.get<Product>(`${productUrl}/${id}`); // Adjusted here
            console.log(result.data);
            return result.data;
        } catch (error) {
            console.error(`Error fetching product with ID ${id}:`, error);
            return null;
        }
    };

    return (
        <ProductContext.Provider value={{ products, loading, error, getProductById }}>
            {children}
        </ProductContext.Provider>
    );
};


export default ProductProvider;
