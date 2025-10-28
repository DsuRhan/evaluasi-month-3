import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/sharedTheme";

export const HomePage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen p-10 transition-all duration-500 ${
        theme === "dark"
          ? "bg-linear-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#0d0d1a] text-gray-100"
          : "bg-linear-to-br from-[#fff8f0] via-[#ffe9cc] to-[#fffaf6] text-gray-900"
      }`}
    >
      {/* Hero Section */}
      <section
        className={`rounded-2xl shadow-lg p-10 mb-10 transition-all ${
          theme === "dark"
            ? "bg-[#141429]/70 border border-[#2a2a44] hover:border-[#3a3af5]"
            : "bg-white/70 border border-[#f1d4b3] hover:border-[#f5b342]"
        }`}
      >
        <h1 className="text-4xl font-bold mb-3 tracking-wide">
          Selamat Datang di{" "}
          <span
            className={`${
              theme === "dark"
                ? "text-[#3a3af5] drop-shadow-[0_0_6px_#3a3af5]"
                : "text-[#f5b342]"
            }`}
          >
            E-Commerce Lite
          </span>
        </h1>
        <p
          className={`text-lg leading-relaxed ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Solusi modern dan efisien untuk menampilkan katalog produk, mengelola
          data dengan cepat, serta menghadirkan pengalaman pengguna yang ringan
          namun elegan.
        </p>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Cepat & Ringan",
            desc: "Dibangun dengan Vite + React + TypeScript untuk performa maksimal.",
          },
          {
            title: "Mudah Dikelola",
            desc: "Dashboard admin sederhana untuk CRUD produk simulasi.",
          },
          {
            title: "Search & Filter",
            desc: "Fitur pencarian, sort, dan filter yang responsif dan real-time.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl shadow-md transition-transform hover:scale-[1.02] ${
              theme === "dark"
                ? "bg-[#1a1a2e]/80 border border-[#2a2a44] hover:border-[#3a3af5]"
                : "bg-white/80 border border-[#f1d4b3] hover:border-[#f5b342]"
            }`}
          >
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      {/* Partner Logos */}
      <section className="mt-10">
        <h4 className="font-semibold text-xl mb-3">Partner & Logo Publik</h4>
        <div
          className={`flex flex-wrap gap-6 items-center justify-start rounded-2xl p-6 shadow-md transition-colors ${
            theme === "dark"
              ? "bg-[#141429]/70 border border-[#2a2a44]"
              : "bg-white/70 border border-[#f1d4b3]"
          }`}
        >
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/a4ef0a52169333.5907a34e170ee.png"
            alt="brand1"
            className="w-24 h-auto opacity-90 hover:opacity-100 transition-opacity"
          />
          <img
            src="https://www.kindpng.com/picc/m/257-2576786_fake-company-logos-png-transparent-png.png"
            alt="brand2"
            className="w-24 h-auto opacity-90 hover:opacity-100 transition-opacity"
          />
          <img
            src="https://www.pngitem.com/pimgs/m/336-3363480_the-logos-for-fake-brands-and-things-universidad.png"
            alt="brand3"
            className="w-24 h-auto opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>
      </section>

      {/* CTA */}
      <div className="mt-10 text-center">
        <Link
          to="/products"
          className={`inline-block px-6 py-3 text-lg rounded-xl font-semibold shadow-md transition-all ${
            theme === "dark"
              ? "bg-[#3a3af5] hover:bg-[#2e2ee0] text-white"
              : "bg-[#f5b342] hover:bg-[#e09a27] text-gray-900"
          }`}
        >
          Lihat Produk
        </Link>
      </div>
    </div>
  );
};
