import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext"; // tambahkan ini
import { SearchProvider } from "./contexts/SearchContext";

import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import SearchPage from "./pages/SearchPage";
import { ProfilePage } from "./pages/ProfilePage";
import { CartPage } from "./pages/CartPage"; // tambahkan juga ini

import { Navbar } from "./components/Navbar";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ProductProvider>
            <SearchProvider>
            <CartProvider>
              <InnerApp />
            </CartProvider>
            </SearchProvider>
          </ProductProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

const InnerApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<CartPage />} /> {/* tambahkan ini */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};
