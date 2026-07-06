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

              {/* Google */}

              <button className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3 font-medium transition hover:bg-gray-50">

                <svg
                  className="h-5 w-5"
                  viewBox="0 0 48 48"
                >
                  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/>
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"/>
                  <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.3l-6.2-5.2c-2.1 1.6-4.7 2.5-7.3 2.5-5.2 0-9.6-3.3-11.2-8l-6.6 5.1C9.6 39.5 16.2 44 24 44z"/>
                  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.4 5.7-6.5 7.3l6.2 5.2C39.2 36.8 44 31 44 24c0-1.3-.1-2.7-.4-3.5z"/>
                </svg>

                Continue with Google

              </button>

              {/* GitHub */}

              <button className="mt-4 w-full flex items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3 font-medium shadow-sm hover:bg-gray-900 hover:text-white transition">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-current"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56v-2.17c-3.2.69-3.88-1.36-3.88-1.36-.52-1.31-1.27-1.66-1.27-1.66-1.04-.71.08-.69.08-.69 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.53-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.26 5.68.41.35.77 1.03.77 2.09v3.1c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>
              </svg>

              Continue with GitHub

            </button>

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