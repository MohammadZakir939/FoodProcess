import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">

        <section className="max-w-7xl mx-auto px-8 py-16">

          {/* Header */}

          <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Operations Workspace
          </span>

          <h1 className="mt-6 text-5xl font-black text-gray-900">
            FoodProcess Dashboard
          </h1>

          <p className="mt-5 max-w-3xl text-lg text-gray-600 leading-8">
            Access inventory management, production tracking, supplier
            management, quality control and AI-powered operational insights
            from one centralized workspace.
          </p>

          {/* Main Grid */}

          <div className="grid lg:grid-cols-2 gap-8 mt-14">

            {/* Inventory */}

            <div className="bg-white rounded-3xl border shadow-sm p-8">

              <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold">
                  Inventory
                </h2>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                  Empty
                </span>

              </div>

              <p className="mt-6 text-gray-600">
                No inventory records have been added yet.
                Products will appear here after they are created.
              </p>

              <button className="mt-8 rounded-xl bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 transition">
                Add Inventory
              </button>

            </div>

            {/* Production */}

            <div className="bg-white rounded-3xl border shadow-sm p-8">

              <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold">
                  Production
                </h2>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                  Empty
                </span>

              </div>

              <p className="mt-6 text-gray-600">
                Production batches have not been created.
                Start a batch to monitor manufacturing progress.
              </p>

              <button className="mt-8 rounded-xl bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 transition">
                Create Batch
              </button>

            </div>

            {/* Suppliers */}

            <div className="bg-white rounded-3xl border shadow-sm p-8">

              <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold">
                  Suppliers
                </h2>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                  Empty
                </span>

              </div>

              <p className="mt-6 text-gray-600">
                Supplier information has not been added.
                Register suppliers to manage procurement records.
              </p>

              <button className="mt-8 rounded-xl bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 transition">
                Add Supplier
              </button>

            </div>

            {/* AI Assistant */}

            <div className="bg-white rounded-3xl border shadow-sm p-8">

              <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold">
                  AI Insights
                </h2>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  Ready
                </span>

              </div>

              <p className="mt-6 text-gray-600">
                AI recommendations will appear after inventory,
                production and supplier data become available.
              </p>

              <div className="mt-8 rounded-xl border border-dashed border-green-300 bg-green-50 p-5">

                <p className="font-semibold text-green-700">
                  Example Insight
                </p>

                <p className="mt-2 text-sm text-gray-600">
                  Connect operational data to receive inventory forecasts,
                  supplier recommendations and production optimization
                  suggestions.
                </p>

              </div>

            </div>

          </div>

          {/* System Status */}

          <div className="mt-10 rounded-3xl bg-white border shadow-sm p-8">

            <h2 className="text-2xl font-bold">
              Platform Status
            </h2>

            <p className="text-gray-500 mt-2">
              Current application modules.
            </p>

            <div className="grid md:grid-cols-4 gap-6 mt-8">

              <div className="rounded-xl bg-green-50 p-5">

                <h3 className="font-semibold">
                  Authentication
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  UI Ready
                </p>

              </div>

              <div className="rounded-xl bg-green-50 p-5">

                <h3 className="font-semibold">
                  Inventory Module
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  Ready for Backend Integration
                </p>

              </div>

              <div className="rounded-xl bg-green-50 p-5">

                <h3 className="font-semibold">
                  Production Module
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  Ready for Backend Integration
                </p>

              </div>

              <div className="rounded-xl bg-green-50 p-5">

                <h3 className="font-semibold">
                  AI Assistant
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  Awaiting Operational Data
                </p>

              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}