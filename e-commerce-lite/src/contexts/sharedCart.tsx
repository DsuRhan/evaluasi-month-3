import { createContext, useContext, } from "react";
import type { Product } from "../types";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  totalUSD: number;
  totalIDR: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
