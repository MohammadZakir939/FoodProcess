"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSearchParams } from "next/navigation";

const API = "https://foodprocess.onrender.com"; // change if deployed

export default function Dashboard() {
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState(
  searchParams.get("tab") || "inventory"
);
  const [foods, setFoods] = useState([]);
  const [production, setProduction] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

const [supplierName, setSupplierName] = useState("");
const [supplierPhone, setSupplierPhone] = useState("");
const [supplierEmail, setSupplierEmail] = useState("");
const [supplierProduct, setSupplierProduct] = useState("");
const [qualityChecks, setQualityChecks] = useState([]);

const [qcProduct, setQcProduct] = useState("");
const [qcInspector, setQcInspector] = useState("");
const [qcStatus, setQcStatus] = useState("Passed");

const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("");
const [insights, setInsights] = useState([]);

const [batchName, setBatchName] = useState("");
const [batchQuantity, setBatchQuantity] = useState("");
const [batchStatus, setBatchStatus] = useState("Pending");
  const [loading, setLoading] = useState(true);

  // Inventory form
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: ""
  });

  // ---------------- FETCH INVENTORY ----------------
  const fetchFoods = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/foods`);
      const data = await res.json();
      setFoods(data);
    } catch (err) {
      console.error("Error fetching foods:", err);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
    fetchFoods();
    fetch(`${API}/ai-insights`)
      .then((res) => res.json())
      .then((data) => {
        setInsights(data.insights);
      })
      .catch((err) => console.log(err));

}, []);

  // ---------------- ADD INVENTORY ----------------
  const addFood = async () => {
    if (!form.name || !form.category || !form.quantity) return;

    try {
     const res = await fetch(`${API}/api/foods`,   {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
  name: form.name,
  category: form.category,
  quantity: Number(form.quantity),
})
      });

      if (res.ok) {
  const newItem = await res.json();

  setFoods((prev) => [...prev, newItem]);

  setForm({
    name: "",
    category: "",
    quantity: "",
  });
}
    } catch (err) {
      console.error("Error adding food:", err);
    }
  };

  // ---------------- DELETE INVENTORY ----------------
  const deleteFood = async (id) => {
    try {
      await fetch(`${API}/api/foods/${id}`,  {
        method: "DELETE"
      });
      fetchFoods();
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- UI ----------------
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 p-6">

        {/* TOP NAV TABS */}
        <div className="flex gap-4 mb-6">
          <button onClick={() => setActiveTab("inventory")}>Inventory</button>
          <button onClick={() => setActiveTab("production")}>Production Tracking</button>
          <button onClick={() => setActiveTab("suppliers")}>Supplier Records</button>
          <button onClick={() => setActiveTab("qc")}>Quality Control</button>
          <button onClick={() => setActiveTab("ai")}>AI Insights</button>
          <button onClick={() => setActiveTab("reports")}>
  Business Reports
</button>
        </div>

        {/* ---------------- INVENTORY ---------------- */}
        {activeTab === "inventory" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Inventory Management</h2>

            {/* FORM */}
            <div className="flex gap-2 mb-4">
              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
              <input
                placeholder="Quantity"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              />

              <button onClick={addFood}>Add</button>
            </div>

            {/* LIST */}
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ul>
                {foods.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>
                      {item.name} - {item.category} - {item.quantity}
                    </span>
                    <button onClick={() => deleteFood(item.id)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* ---------------- PRODUCTION ---------------- */}
        {activeTab === "production" && (
  <div>

    <h2 className="text-2xl font-bold mb-4">
      Production Tracking
    </h2>

    <div className="flex gap-3 mb-6">

      <input
        placeholder="Batch Name"
        value={batchName}
        onChange={(e) => setBatchName(e.target.value)}
        className="border p-2 rounded"
      />

      <input
        type="number"
        placeholder="Quantity"
        value={batchQuantity}
        onChange={(e) => setBatchQuantity(e.target.value)}
        className="border p-2 rounded"
      />

      <select
        value={batchStatus}
        onChange={(e) => setBatchStatus(e.target.value)}
        className="border p-2 rounded"
      >
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      <button
        className="bg-green-600 text-white px-4 rounded"
        onClick={() => {

          if (!batchName || !batchQuantity) return;

          setProduction([
            ...production,
            {
              id: Date.now(),
              name: batchName,
              quantity: batchQuantity,
              status: batchStatus,
            },
          ]);

          setBatchName("");
          setBatchQuantity("");
          setBatchStatus("Pending");
        }}
      >
        Add Batch
      </button>

    </div>

    <div className="space-y-3">

      {production.map((item) => (

        <div
          key={item.id}
          className="border rounded p-3 flex justify-between"
        >
          <span>
            {item.name}
          </span>

          <span>
            Qty: {item.quantity}
          </span>

          <span>
            {item.status}
          </span>

        </div>

      ))}

    </div>

  </div>
)}

        {/* ---------------- SUPPLIERS ---------------- */}
        {activeTab === "suppliers" && (
  <div>

    <h2 className="text-2xl font-bold mb-4">
      Supplier Records
    </h2>

    <div className="flex gap-3 mb-6 flex-wrap">

      <input
        type="text"
        placeholder="Supplier Name"
        value={supplierName}
        onChange={(e) => setSupplierName(e.target.value)}
        className="border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Phone"
        value={supplierPhone}
        onChange={(e) => setSupplierPhone(e.target.value)}
        className="border p-2 rounded"
      />

      <input
        type="email"
        placeholder="Email"
        value={supplierEmail}
        onChange={(e) => setSupplierEmail(e.target.value)}
        className="border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Supplied Product"
        value={supplierProduct}
        onChange={(e) => setSupplierProduct(e.target.value)}
        className="border p-2 rounded"
      />

      <button
        className="bg-green-600 text-white px-4 rounded"
        onClick={() => {

          if (
            !supplierName ||
            !supplierPhone ||
            !supplierEmail ||
            !supplierProduct
          ) return;

          setSuppliers([
            ...suppliers,
            {
              id: Date.now(),
              name: supplierName,
              phone: supplierPhone,
              email: supplierEmail,
              product: supplierProduct,
            },
          ]);

          setSupplierName("");
          setSupplierPhone("");
          setSupplierEmail("");
          setSupplierProduct("");
        }}
      >
        Add Supplier
      </button>

    </div>

    <div className="space-y-3">

      {suppliers.map((supplier) => (

        <div
          key={supplier.id}
          className="border rounded p-3 flex justify-between"
        >
          <span>{supplier.name}</span>

          <span>{supplier.phone}</span>

          <span>{supplier.email}</span>

          <span>{supplier.product}</span>
        </div>

      ))}

    </div>

  </div>
)}

        {/* ---------------- QUALITY CONTROL ---------------- */}
        {activeTab === "qc" && (
  <div>

    <h2 className="text-2xl font-bold mb-4">
      Quality Control
    </h2>

    <div className="flex gap-3 mb-6 flex-wrap">

      <input
        type="text"
        placeholder="Product"
        value={qcProduct}
        onChange={(e) => setQcProduct(e.target.value)}
        className="border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Inspector"
        value={qcInspector}
        onChange={(e) => setQcInspector(e.target.value)}
        className="border p-2 rounded"
      />

      <select
        value={qcStatus}
        onChange={(e) => setQcStatus(e.target.value)}
        className="border p-2 rounded"
      >
        <option>Passed</option>
        <option>Failed</option>
      </select>

      <button
        className="bg-green-600 text-white px-4 rounded"
        onClick={() => {

          if (!qcProduct || !qcInspector) return;

          setQualityChecks([
            ...qualityChecks,
            {
              id: Date.now(),
              product: qcProduct,
              inspector: qcInspector,
              status: qcStatus,
            },
          ]);

          setQcProduct("");
          setQcInspector("");
          setQcStatus("Passed");
        }}
      >
        Add Check
      </button>

    </div>

    <div className="space-y-3">

      {qualityChecks.map((check) => (

        <div
          key={check.id}
          className="border rounded p-3 flex justify-between"
        >
          <span>{check.product}</span>

          <span>{check.inspector}</span>

          <span>{check.status}</span>
        </div>

      ))}

    </div>

  </div>
)}

        {/* ---------------- AI INSIGHTS ---------------- */}
        {activeTab === "ai" && (
  <div>

    <div className="bg-white rounded-lg shadow p-6">
  <h2 className="text-xl font-bold mb-4">AI Insights</h2>

  {insights.length === 0 ? (
    <p>Loading...</p>
  ) : (
    <ul>
      {insights.map((item, index) => (
        <li key={index}>• {item}</li>
      ))}
    </ul>
  )}
</div>

    <p className="mb-4 text-gray-600">
      Ask AI for suggestions about your inventory or production.
    </p>

    <textarea
      className="w-full border rounded-lg p-3 mb-4"
      rows={4}
      placeholder="Example: How can I reduce food waste?"
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
    />

    <button
      className="bg-green-600 text-white px-6 py-2 rounded"
      onClick={() => {

        if (!question) return;

        setAnswer(
          "AI Recommendation:\n\n" +
          "• Monitor low-stock items regularly.\n" +
          "• Reduce overproduction.\n" +
          "• Track supplier performance.\n" +
          "• Improve quality checks.\n" +
          "• Analyze inventory trends every week."
        );

      }}
    >
      Ask AI
    </button>

    {answer && (
      <div className="mt-6 border rounded-lg p-4 bg-green-50">
        <h3 className="font-bold mb-2">
          AI Response
        </h3>

        <pre className="whitespace-pre-wrap">
          {answer}
        </pre>
      </div>
    )}

  </div>
)}
{/* ---------------- BUSINESS REPORTS ---------------- */}
{activeTab === "reports" && (
  <div>
    <h2 className="text-2xl font-bold mb-6">Business Reports</h2>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="font-semibold">Inventory Items</h3>
        <p className="text-3xl font-bold text-green-600">
          {foods.length}
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="font-semibold">Production Batches</h3>
        <p className="text-3xl font-bold text-blue-600">{production.length}</p>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="font-semibold">Suppliers</h3>
        <p className="text-3xl font-bold text-orange-600"> {suppliers.length}</p>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="font-semibold">Quality Checks</h3>
        <p className="text-3xl font-bold text-purple-600">{qualityChecks.length}</p>
      </div>
    </div>
  </div>
)}
      </main>

      <Footer />
    </>
  );
}