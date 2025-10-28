import { useContext } from "react";
import { ProductContext } from "../contexts/sharedProduct";

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used within ProductProvider");
  return ctx;
};
