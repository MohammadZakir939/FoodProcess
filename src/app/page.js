"use client";

import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";

export default function Home() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch("https://foodprocess.onrender.com/api/foods")
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Navbar />

      <Hero />

      {/* Features Section */}
      <Features />

      {/* Inventory Section */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          Food Inventory (From FastAPI)
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {foods.map((food) => (
            <div key={food.id} className="border rounded-lg p-4 shadow">
              <h3 className="text-xl font-bold">{food.name}</h3>

              <p>Category: {food.category}</p>

              <p>Quantity: {food.quantity}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}