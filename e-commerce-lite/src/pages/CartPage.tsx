import React from "react";
import { useCart } from "../contexts/sharedCart";
import { useTheme } from "../contexts/sharedTheme";

export const CartPage: React.FC = () => {
const { items, totalUSD, totalIDR, removeFromCart, clearCart } = useCart();
const { theme } = useTheme();

if (items.length === 0) {
return (
<div
className={`p-6 text-center min-h-screen flex flex-col items-center justify-center ${ theme === "dark" ? "bg-linear-to-b from-gray-900 to-black text-gray-300" : "bg-linear-to-b from-orange-50 to-yellow-50 text-gray-700" }`}
>
<h2 className="text-xl font-semibold mb-2">Keranjang kosong</h2>
<p className="text-sm opacity-75">Tambahkan beberapa produk terlebih dahulu.</p>
</div>
);
}

return (
<div
className={`min-h-screen p-8 transition-colors duration-300 ${ theme === "dark" ? "bg-linear-to-b from-gray-900 to-black text-gray-100" : "bg-linear-to-b from-orange-50 to-yellow-50 text-gray-800" }`}
>
<div
className={`max-w-2xl mx-auto rounded-xl p-6 shadow-lg ${ theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-orange-200" }`}
>
<h3 className="text-2xl font-semibold mb-6">Keranjang Anda</h3>

    <div className="space-y-4">
      {items.map((i) => (
        <div
          key={i.product.id}
          className={`flex items-center gap-4 p-4 rounded-lg transition-colors duration-200 ${
            theme === "dark"
              ? "bg-gray-900 border border-gray-700 hover:bg-gray-800"
              : "bg-orange-50 border border-orange-200 hover:bg-orange-100"
          }`}
        >
          <img
            src={i.product.image}
            alt={i.product.title}
            className="w-16 h-16 object-contain rounded-md bg-white"
          />
          <div className="flex-1">
            <div className="font-medium">{i.product.title}</div>
            <div className="text-sm opacity-75">Qty: {i.quantity}</div>
            <div className="text-sm mt-1">
              USD ${ (i.product.price * i.quantity).toFixed(2) }
            </div>
            <div
              className={`text-xs ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              ≈ Rp {Math.round(i.product.price * i.quantity * 16000).toLocaleString()}
            </div>
          </div>
          <button
            onClick={() => removeFromCart(i.product.id)}
            className={`px-3 py-1 text-sm rounded-lg font-medium ${
              theme === "dark"
                ? "border border-red-600 text-red-400 hover:bg-red-800 hover:text-white"
                : "border border-red-300 text-red-600 hover:bg-red-100"
            }`}
          >
            Hapus
          </button>
        </div>
      ))}
    </div>

    <div
      className={`mt-8 p-6 rounded-lg font-medium ${
        theme === "dark"
          ? "bg-linear-to-r from-gray-800 to-gray-900 border border-gray-700"
          : "bg-linear-to-r from-orange-100 to-yellow-100 border border-orange-200"
      }`}
    >
      <div className="text-lg">
        Total: <span className="font-semibold">USD ${totalUSD.toFixed(2)}</span>
      </div>
      <div className="text-sm opacity-80">
        ≈ Rp {totalIDR.toLocaleString()}
      </div>
      <button
        onClick={clearCart}
        className={`mt-4 px-4 py-2 rounded-lg font-medium ${
          theme === "dark"
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-orange-400 hover:bg-orange-500 text-white"
        }`}
      >
        Clear Cart
      </button>
    </div>
  </div>
</div>


);
};