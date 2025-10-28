import React, { useMemo, useState } from "react";
import { useProducts } from "../hooks/useProduct";
import { ProductCard } from "../components/ProductCard";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { useTheme } from "../contexts/sharedTheme";

export const ProductsPage: React.FC = () => {
  const { products, loading, error, refresh } = useProducts();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<string>("none");
    const { theme } = useTheme();

  const containerClass =
    theme === "dark"
      ? "bg-gray-900 text-gray-100"
      : "bg-gray-50 text-gray-900";


  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category));
    return ["all", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    let list = products.slice();
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(s) || p.category.toLowerCase().includes(s));
    }
    if (category !== "all") list = list.filter(p => p.category === category);
    if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
    if (sort === "title_asc") list.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "title_desc") list.sort((a, b) => b.title.localeCompare(a.title));
    return list;
  }, [products, q, category, sort]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (error) return (
    <div className="p-6">
      <div className="text-red-600">Error: {error}</div>
      <button className="mt-2 px-3 py-1 border" onClick={() => refresh()}>Retry</button>
    </div>
  );

  return (
    <ErrorBoundary>
      <div className={`min-h-screen p-6 transition-colors ${containerClass}`}>
        <div className="mb-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="flex gap-2 items-center">
            <select value={category} onChange={e => setCategory(e.target.value)} className={`border p-2 rounded ${theme === "dark" ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={sort} onChange={e => setSort(e.target.value)} className={`border p-2 rounded ${theme === "dark" ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}>
              <option value="none">No sort</option>
              <option value="price_asc">Price ↑</option>
              <option value="price_desc">Price ↓</option>
              <option value="title_asc">Title A-Z</option>
              <option value="title_desc">Title Z-A</option>
            </select>
            <button onClick={() => { setQ(""); setCategory("all"); setSort("none"); }} className="px-3 py-1 border rounded">Reset</button>
          </div>
          <div>Total: <strong>{filtered.length}</strong></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </ErrorBoundary>
  );
};
