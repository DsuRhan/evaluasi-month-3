import type { Product } from "../types";
import { Link } from "react-router-dom";

const USD_TO_IDR = 16000; // sesuai kurs

export const ProductCard = ({ product }: { product: Product }) => {
  const idrPrice = Math.round(product.price * USD_TO_IDR);
  return (
    <div className="border rounded p-4 shadow-sm hover:shadow-md transition">
      <div className="h-40 flex items-center justify-center mb-3">
        <img src={product.image} alt={product.title} className="max-h-full" />
      </div>
      <h4 className="font-medium text-sm truncate">{product.title}</h4>
      <p className="text-xs text-gray-500">{product.category}</p>
      <div className="mt-2">
        <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>{" "}
        <span className="text-sm text-gray-500">(≈ Rp {idrPrice.toLocaleString()})</span>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <Link to={`/products/${product.id}`} className="text-xs text-blue-600 hover:underline">Detail</Link>
      </div>
    </div>
  );
};
