import { useSearch } from "../contexts/sharedSearch";
import { useTheme } from "../contexts/sharedTheme";
import { useProducts } from "../hooks/useProduct";

export default function SearchPage() {
  const { theme } = useTheme();
  const { searchQuery } = useSearch();
  const { products } = useProducts();

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen px-4 py-8 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-[#0d0d1a] text-gray-100"
          : "bg-[#fffaf6] text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Search Results</h2>
      <p className="text-center opacity-70 mb-6">
        Showing results for: <strong>{searchQuery || "..."}</strong>
      </p>

      {filtered.length === 0 ? (
        <p className="text-center opacity-60">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <div
              key={p.id}
              className={`group p-4 rounded-xl border shadow-md transform transition-all duration-300 hover:scale-[1.02] ${
                theme === "dark"
                  ? "bg-[#1a1a2e] border-[#2a2a44] hover:bg-[#22223c]"
                  : "bg-white border-[#e4c6a0] hover:bg-[#fff0e0]"
              }`}
            >
              <div className="w-full h-48 flex items-center justify-center mb-3">
                <img
                  src={p.image}
                  alt={p.title}
                  className="max-h-40 object-contain"
                />
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:underline">
                {p.title}
              </h3>
              <p className="text-sm opacity-80 line-clamp-2 mb-3">
                {p.description}
              </p>
              <div className="font-medium">
                USD ${p.price.toFixed(2)}
              </div>
              <div className="text-xs opacity-70">
                ≈ Rp {Math.round(p.price * 16000).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
