import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../contexts/sharedTheme";
import { useCart } from "../contexts/sharedCart";
import { useSearch } from "../contexts/sharedSearch";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useSearch();
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { items } = useCart();

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [shopName, setShopName] = useState("My Shop");

  // Sinkronisasi profil user
  useEffect(() => {
    const storedProfile = localStorage.getItem("user_profile_data");
    if (storedProfile) {
      const parsed = JSON.parse(storedProfile);
      if (parsed.photo) setProfilePic(parsed.photo);
      if (parsed.name) setShopName(parsed.name + "'s Shop");
    }
  }, []);

  // handle perubahan search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    navigate("/search");
  };

  const navStyle =
    theme === "dark"
      ? "bg-gradient-to-r from-gray-900 via-gray-800 to-black text-gray-100 shadow-md border-b border-gray-700"
      : "bg-gradient-to-r from-orange-100 to-yellow-50 text-gray-800 shadow-sm border-b border-orange-200";

  const buttonStyle =
    theme === "dark"
      ? "bg-blue-600 hover:bg-blue-700 text-white"
      : "bg-orange-400 hover:bg-orange-500 text-white";

  const inputStyle =
    theme === "dark"
      ? "bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
      : "bg-white border border-orange-300 text-gray-800 placeholder-gray-500 focus:ring-orange-400 focus:border-orange-400";

  return (
    <nav
      className={`px-6 py-3 flex items-center justify-between transition-colors duration-300 ${navStyle}`}
    >
      {/* LEFT: LOGO + NAME */}
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://fake-store-api-docs.vercel.app/_astro/logo.2e155839_Z1z7vW1.webp"
            alt="logo"
            className="w-10 h-10 object-contain"
          />
          <div>
            <div className="font-bold text-lg">{shopName}</div>
            <div className="text-xs opacity-70">E-Commerce Lite</div>
          </div>
        </Link>
      </div>

      {/* MIDDLE: SEARCH BAR */}
      <div className="flex-1 max-w-lg mx-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className={`w-full p-2 rounded-lg transition-all duration-200 ${inputStyle}`}
          />
          <button
            type="button"
            onClick={() => navigate("/search")}
            className={`px-4 py-2 rounded-lg font-medium ${buttonStyle}`}
          >
            Search
          </button>
        </div>
      </div>

      {/* RIGHT: THEME + PROFILE + CART + LOGIN */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className={`px-2 py-1 border rounded-lg text-xl ${
            theme === "dark"
              ? "border-gray-600 hover:bg-gray-700"
              : "border-orange-300 hover:bg-orange-200"
          }`}
          title="Toggle Theme"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>

        {/* CART BUTTON */}
        {isAuthenticated && (
          <Link
            to="/cart"
            className={`relative px-3 py-1 rounded-lg flex items-center justify-center font-medium ${
              theme === "dark"
                ? "bg-gray-800 hover:bg-gray-700 border border-gray-600"
                : "bg-orange-100 hover:bg-orange-200 border border-orange-300"
            }`}
            title="Cart"
          >
            🛒
            {items.length > 0 && (
              <span
                className={`absolute -top-1 -right-1 text-xs px-1.5 py-0.5 rounded-full ${
                  theme === "dark"
                    ? "bg-blue-500 text-white"
                    : "bg-orange-500 text-white"
                }`}
              >
                {items.length}
              </span>
            )}
          </Link>
        )}

        {isAuthenticated ? (
          <>
            <Link
              to="/dashboard/profile"
              className={`text-sm font-medium ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              } hover:underline`}
            >
              Dashboard
            </Link>
            <button
              onClick={logout}
              className={`px-3 py-1 text-sm rounded-lg font-medium ${
                theme === "dark"
                  ? "border border-gray-600 hover:bg-gray-700"
                  : "border border-orange-300 hover:bg-orange-200"
              }`}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className={`px-3 py-1 text-sm rounded-lg font-medium ${
              theme === "dark"
                ? "border border-gray-600 hover:bg-gray-700"
                : "border border-orange-300 hover:bg-orange-200"
            }`}
          >
            Login
          </Link>
        )}

        {/* Profile Picture */}
        <Link
          to="/dashboard/profile"
          className={`w-10 h-10 rounded-full overflow-hidden border ${
            theme === "dark" ? "border-blue-500" : "border-orange-400"
          }`}
          title="Your Profile"
        >
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className={`w-full h-full flex items-center justify-center text-xs ${
                theme === "dark"
                  ? "bg-gray-700 text-gray-400"
                  : "bg-orange-100 text-orange-600"
              }`}
            >
              YOU
            </div>
          )}
        </Link>
      </div>
    </nav>
  );
};
