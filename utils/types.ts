export interface Product {
    name: string;
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    thumbnail: string;
    discountPercentage?: number;
    images?: Array<string>;
    rating?: number;
    stock?: number;
    brand?: string;
}


export interface CartItem {
    thumbnail: string;
    id: number;
    name: string;
    price: number;
    quantity: number;
    toggle?: () => void;
    showModal?: boolean;
  }
