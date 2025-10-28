import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProduct";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../contexts/sharedCart";  // impor

const USD_TO_IDR = 16000;

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const product = products.find(p => p.id === Number(id));
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  if (!product) return <div className="p-6">Produk tidak ditemukan.</div>;

  const idrPrice = Math.round(product.price * USD_TO_IDR);

  const handleAddCart = () => {
    addToCart(product, 1);
    navigate("/dashboard/cart"); // atau ke halaman cart
  };

  return (
    <div className="p-6 max-w-3xl">
      <div className="flex gap-6">
        <div className="w-1/3">
          <img src={product.image} alt={product.title} className="max-h-80 mx-auto" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold">{product.title}</h2>
          <p className="text-gray-600 mt-2">{product.category}</p>
          <p className="mt-4">{product.description}</p>
          <div className="mt-4">
            <span className="text-xl font-bold">${product.price.toFixed(2)}</span>{" "}
            <span className="text-sm text-gray-500">(≈ Rp {idrPrice.toLocaleString()})</span>
          </div>
          <div className="mt-6 flex gap-2">
            <button onClick={handleAddCart} className="px-4 py-2 bg-green-600 text-white rounded">Add to Cart</button>
            {isAuthenticated && (
              <button onClick={() => navigate("/dashboard")} className="px-4 py-2 border rounded">Edit (Dashboard)</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
