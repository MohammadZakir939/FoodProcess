"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [foods, setFoods] = useState([]);

  // FORM STATE
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("username");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      setUsername(user || "User");

      await fetchFoods();

      setLoading(false);
    };

    loadDashboard();
  }, []);

  // FETCH FOODS
  const fetchFoods = async () => {
    try {
      const response = await fetch("https://foodprocess.onrender.com/api/foods");
      const data = await response.json();
      setFoods(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // ADD FOOD (POST)
  const addFood = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("https://foodprocess.onrender.com/api/foods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          category,
          quantity: Number(quantity),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      // refresh list
      await fetchFoods();

      // reset form
      setName("");
      setCategory("");
      setQuantity("");
      setShowForm(false);

      alert("Item added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error adding item");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">

        <section className="max-w-7xl mx-auto px-8 py-16">

          {/* HEADER */}
          <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Operations Workspace
          </span>

          <h1 className="mt-6 text-5xl font-black text-gray-900">
            FoodProcess Dashboard
          </h1>

          <p className="mt-4 text-xl font-medium text-green-700">
            Welcome back, {username} 👋
          </p>

          {/* INVENTORY */}
          <div className="bg-white rounded-3xl border shadow-sm p-8 mt-14">

            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Inventory</h2>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                {foods.length} items
              </span>
            </div>

            {/* LIST */}
            {foods.length === 0 ? (
              <p className="mt-6 text-gray-600">
                No inventory records found.
              </p>
            ) : (
              <div className="mt-6 space-y-4">
                {foods.map((food) => (
                  <div key={food.id} className="rounded-xl border p-4 bg-gray-50">
                    <h3 className="font-semibold text-lg">{food.name}</h3>
                    <p className="text-gray-600">Category: {food.category}</p>
                    <p className="text-gray-600">Quantity: {food.quantity}</p>
                  </div>
                ))}
              </div>
            )}

            {/* BUTTON */}
            <button
              onClick={() => setShowForm(true)}
              className="mt-6 rounded-xl bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700"
            >
              Add Inventory
            </button>

            {/* FORM */}
            {showForm && (
              <div className="mt-6 border rounded-xl p-4 bg-white shadow">

                <h3 className="text-lg font-semibold mb-3">
                  Add New Item
                </h3>

                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border p-2 w-full mb-2 rounded"
                />

                <input
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border p-2 w-full mb-2 rounded"
                />

                <input
                  type="number"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="border p-2 w-full mb-2 rounded"
                />

                <div className="flex gap-2">
                  <button
                    onClick={addFood}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setShowForm(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>

              </div>
            )}
          </div>

        </section>
      </main>

      <Footer />
    </>
  );
}