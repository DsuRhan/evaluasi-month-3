import  { createContext} from "react";
import type { Product } from "../types";

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error?: string;
  refresh: () => Promise<void>;
  addProduct: (p: Omit<Product, "id">) => void;
  updateProduct: (id: number, data: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);
