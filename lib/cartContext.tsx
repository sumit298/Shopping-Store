"use client"
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface CartItem {
  thumbnail: string | undefined;
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
});

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []); 

  const addToCart = (item: CartItem) => {
    // checking if the cart item is already in the cart.
        // We are using the find method to check if the item is already in the cart. The find method returns the value of the first element in the array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.
        // If the item is already in the cart, we are using the map method to increase the quantity of the item in the cart. The map method creates a new array populated with the results of calling a provided function on every element in the calling array.
        // If the item is not in the cart, we are using the spread operator to add the item to the cart.
    
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item: CartItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      if (existingItem.quantity === 1) {
         // if the quantity of the item is 1, remove the item from the cart
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
      } else {
         // if the quantity of item is greater than 1, decrease the quantity of the item
        setCartItems(
          cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          )
        );
      }
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
