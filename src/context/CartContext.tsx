"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { createCheckout } from "@/lib/shopify";

interface Product {
  id: string;
  title: string;
  description: string;
  handle: string;
  price: string;
  currencyCode: string;
  image: string;
  variantId: string;
}

interface CartContextType {
  items: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  checkout: () => Promise<string | null>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const checkout = async () => {
    if (items.length === 0) return null;

    const variantIds = items.map((item) => item.variantId);
    const checkoutData = await createCheckout(variantIds);

    if (checkoutData) {
      setItems([]); // Clear cart after successful checkout
      return checkoutData.webUrl;
    }

    return null;
  };

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
