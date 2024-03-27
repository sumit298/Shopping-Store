export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    thumbnail: string;
    discountPercentage?: number;
    images?: Array<String>;
    rating?: number;
    stock?: number;
}
