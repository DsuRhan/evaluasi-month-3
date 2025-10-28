import  {  useState, useEffect,type ReactNode, useCallback } from "react";
import type { Product } from "../types";
import { ProductContext } from "./sharedProduct";


export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const raw = localStorage.getItem("products_cache");
    return raw ? JSON.parse(raw) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      if (!res.ok) throw new Error("Gagal fetch data");
      const data: Product[] = await res.json();
      setProducts(data);
      localStorage.setItem("products_cache", JSON.stringify(data));
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // fetch only if cache empty
    if (products.length === 0) fetchProducts();
  }, [fetchProducts, products.length]);

  useEffect(() => {
    localStorage.setItem("products_cache", JSON.stringify(products));
  }, [products]);

  const addProduct = (p: Omit<Product, "id">) => {
    setProducts(prev => {
      const nextId = prev.length ? Math.max(...prev.map(x => x.id)) + 1 : 1;
      const newP: Product = { ...p, id: nextId };
      return [newP, ...prev];
    });
  };

  const updateProduct = (id: number, data: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...data } : p)));
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        refresh: fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
