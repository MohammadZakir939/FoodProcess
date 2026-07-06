"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
  setError("");

  if (!email || !password) {
    setError("Please enter your email and password.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(
      "https://foodprocess.onrender.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.detail || "Login failed");
      setLoading(false);
      return;
    }

    localStorage.setItem("token", data.access_token);
    localStorage.setItem("username", data.username);

    window.location.href = "/dashboard";
  } catch (err) {
    setError("Unable to connect to the server.");
  }

  setLoading(false);
};

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 min-h-[85vh]">

          {/* Left Side */}

          <div className="hidden lg:flex flex-col justify-center px-12">

            <span className="inline-block w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              Welcome to FoodProcess
            </span>

            <h1 className="mt-6 text-5xl font-black leading-tight text-gray-900">
              Manage Food Processing
              <br />
              Operations
              <br />
              From One Place
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Sign in to access your dashboard, manage inventory,
              monitor production workflows, maintain supplier records,
              and oversee quality control activities.
            </p>

            <div className="mt-12 space-y-5">

              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span>Secure Authentication</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span>Centralized Operations Dashboard</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span>Inventory & Production Monitoring</span>
              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="flex items-center justify-center p-8">

            <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-xl">

              <h2 className="text-3xl font-bold text-gray-900">
                Sign In
              </h2>

              <p className="mt-2 text-gray-500">
                Access your FoodProcess workspace.
              </p>

               {/* Email */}

              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>

              <div className="mt-2 flex items-center rounded-xl border bg-gray-50 px-4 py-3">

                <Mail size={20} className="text-gray-400" />

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ml-3 w-full bg-transparent outline-none"
                />

              </div>

              {/* Password */}

              <label className="mt-6 block text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="mt-2 flex items-center rounded-xl border bg-gray-50 px-4 py-3">

                <Lock size={20} className="text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="ml-3 w-full bg-transparent outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

              <div className="mt-5 flex justify-between text-sm">

                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Remember me
                </label>

                <button className="text-green-600 hover:underline">
                  Forgot Password?
                </button>

              </div>

              {error && (
                <p className="mt-4 text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                onClick={handleLogin}
                disabled={loading}
                className="mt-8 w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 py-3 font-semibold text-white transition hover:scale-[1.02]"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

              <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-4">

                <p className="font-medium text-green-700">
                  🔒 Secure Authentication
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  This interface is ready for FastAPI JWT authentication integration.
                </p>

              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}