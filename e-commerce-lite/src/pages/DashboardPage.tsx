import React, { useState, useCallback, useMemo } from "react";
import { useProducts } from "../hooks/useProduct";
import { ProductForm } from "../components/ProductForm";
import type { Product } from "../types";
import { useTheme } from "../contexts/sharedTheme";

export const DashboardPage: React.FC = () => {
  const { theme } = useTheme();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = useCallback(
    (p: Omit<Product, "id">) => {
      addProduct(p);
    },
    [addProduct]
  );

  const handleUpdate = useCallback(
    (id: number, data: Partial<Product>) => {
      updateProduct(id, data);
    },
    [updateProduct]
  );

  const handleDelete = useCallback(
    (id: number) => {
      if (!confirm("Hapus produk ini?")) return;
      deleteProduct(id);
    },
    [deleteProduct]
  );

  const stats = useMemo(
    () => ({
      total: products.length,
      avgPrice: products.length
        ? Math.round(products.reduce((a, b) => a + b.price, 0) / products.length)
        : 0,
    }),
    [products]
  );

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-linear-to-br from-[#0d0d1a] to-[#1a1a2e] text-gray-100"
          : "bg-linear-to-br from-[#fff8f0] to-[#ffe4c4] text-gray-900"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold">Dashboard</h3>
        <div className="flex items-center gap-4">
          <span
            className={`font-medium ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Total: {stats.total} | Rata-rata: ${stats.avgPrice}
          </span>
          <button
            onClick={() => {
              setShowForm(true);
              setEditing(null);
            }}
            className={`px-4 py-2 rounded font-semibold transition-colors ${
              theme === "dark"
                ? "bg-[#3a3af5] hover:bg-[#2e2ee0] text-white"
                : "bg-[#f5b342] hover:bg-[#e09a27] text-gray-900"
            }`}
          >
            Tambah Produk
          </button>
        </div>
      </div>

      {showForm && (
        <div
          className={`mb-6 p-4 rounded-2xl border shadow-md transition-colors ${
            theme === "dark"
              ? "bg-[#141429]/70 border-[#2a2a44]"
              : "bg-white/70 border-[#f1d4b3]"
          }`}
        >
          <h4 className="font-semibold mb-3">
            {editing ? "Edit Produk" : "Tambah Produk"}
          </h4>
          <ProductForm
            initial={editing || {}}
            onSubmit={(data) => {
              if (editing) handleUpdate(editing.id, data as Partial<Product>);
              else handleAdd(data as Omit<Product, "id">);
              setShowForm(false);
            }}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className={`p-4 rounded-xl flex gap-3 items-center border shadow-sm transition-all hover:scale-[1.01] ${
              theme === "dark"
                ? "bg-[#1a1a2e]/80 border-[#2a2a44] hover:border-[#3a3af5]"
                : "bg-white/80 border-[#f1d4b3] hover:border-[#f5b342]"
            }`}
          >
            <img
              src={p.image}
              alt={p.title}
              className="w-20 h-20 object-contain rounded-md"
            />
            <div className="flex-1">
              <div className="font-medium text-lg">{p.title}</div>
              <div
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                $ {Math.round(p.price).toLocaleString()}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setEditing(p);
                  setShowForm(true);
                }}
                className={`px-3 py-1 rounded border text-sm font-medium ${
                  theme === "dark"
                    ? "border-[#3a3af5] text-[#3a3af5] hover:bg-[#2e2ee0]/20"
                    : "border-[#f5b342] text-[#c27b10] hover:bg-[#f5b342]/20"
                }`}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className={`px-3 py-1 rounded border text-sm font-medium ${
                  theme === "dark"
                    ? "border-red-500 text-red-400 hover:bg-red-500/20"
                    : "border-red-400 text-red-600 hover:bg-red-400/20"
                }`}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
