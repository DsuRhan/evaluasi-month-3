import {  useState,type ReactNode, useCallback, useMemo } from "react";
import type { Product } from "../types";
import { CartContext,type CartItem } from "./sharedCart";

const USD_TO_IDR = 16000; // contoh kurs: 1 USD = Rp 16.000

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { product, quantity: qty }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalUSD = useMemo(() => {
    return items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }, [items]);

  const totalIDR = useMemo(() => {
    return Math.round(totalUSD * USD_TO_IDR);
  }, [totalUSD]);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, totalUSD, totalIDR }}>
      {children}
    </CartContext.Provider>
  );
};
