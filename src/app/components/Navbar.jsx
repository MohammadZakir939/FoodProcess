"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("username");

    if (token) {
      setLoggedIn(true);
      setUsername(user || "");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-lg">
            FP
          </div>

          <div>
            <h1 className="font-bold text-xl text-gray-900">
              FoodProcess
            </h1>

            <p className="text-xs text-gray-500">
              Food Management Platform
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-gray-600 hover:text-green-600 transition font-medium"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="text-gray-600 hover:text-green-600 transition font-medium"
          >
            About
          </Link>

          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-green-600 transition font-medium"
          >
            Dashboard
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {loggedIn ? (
            <>
              <span className="font-medium text-green-700">
                Hello, {username}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-xl bg-red-500 px-5 py-2 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Sign In
              </Link>

              <Link
  href={loggedIn ? "/dashboard" : "/register"}
  className="rounded-xl bg-green-600 px-5 py-3 text-white font-semibold shadow-lg hover:bg-green-700 transition"
>
  Get Started
</Link>
          )}
        </div>

      </nav>
    </header>
  );
}