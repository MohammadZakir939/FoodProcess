"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Register() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://foodprocess.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Registration failed.");
        setLoading(false);
        return;
      }

      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (err) {
      setError("Unable to connect to the server.");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 flex items-center justify-center py-12">

        <div className="w-full max-w-lg rounded-3xl bg-white shadow-xl border p-10">

          <h1 className="text-4xl font-black text-center">
            Create Account
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Register for FoodProcess
          </p>

          {/* Username */}

          <label className="block mt-8 font-medium">
            Username
          </label>

          <div className="mt-2 flex items-center rounded-xl border bg-gray-50 px-4 py-3">

            <User size={20} className="text-gray-400" />

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="ml-3 w-full bg-transparent outline-none"
            />

          </div>

          {/* Email */}

          <label className="block mt-6 font-medium">
            Email
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

          <label className="block mt-6 font-medium">
            Password
          </label>

          <div className="mt-2 flex items-center rounded-xl border bg-gray-50 px-4 py-3">

            <Lock size={20} className="text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ml-3 w-full bg-transparent outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

          </div>

          {/* Confirm Password */}

          <label className="block mt-6 font-medium">
            Confirm Password
          </label>

          <div className="mt-2 flex items-center rounded-xl border bg-gray-50 px-4 py-3">

            <Lock size={20} className="text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="ml-3 w-full bg-transparent outline-none"
            />

          </div>

          {error && (
            <p className="mt-6 text-red-600">
              {error}
            </p>
          )}

          {success && (
            <p className="mt-6 text-green-600">
              {success}
            </p>
          )}

          <button
            onClick={handleRegister}
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-green-600 py-3 text-white font-semibold hover:bg-green-700 transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="mt-8 text-center text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>

        </div>

      </main>

      <Footer />
    </>
  );
}