import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white mt-20">

      <div className="max-w-7xl mx-auto px-8 py-14">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-3">

              <div className="h-11 w-11 rounded-xl bg-green-600 text-white flex items-center justify-center font-bold text-lg">
                FP
              </div>

              <div>

                <h2 className="font-bold text-xl">
                  FoodProcess
                </h2>

                <p className="text-sm text-gray-500">
                  Food Processing Platform
                </p>

              </div>

            </div>

            <p className="mt-5 text-gray-600 leading-7">
              FoodProcess is a modern web application designed to simplify
              inventory management, production tracking, supplier management,
              and operational monitoring for food processing businesses.
            </p>

          </div>

          {/* Navigation */}

          <div>

            <h3 className="font-semibold text-lg">
              Navigation
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-gray-600">

              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/login">Login</Link>

            </div>

          </div>

          {/* Modules */}

          <div>

            <h3 className="font-semibold text-lg">
              Platform Modules
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-gray-600">

              <p>Inventory Management</p>
              <p>Production Tracking</p>
              <p>Supplier Records</p>
              <p>Quality Control</p>
              <p>AI Insights</p>

            </div>

          </div>

          {/* Status */}

          <div>

            <h3 className="font-semibold text-lg">
              Project Status
            </h3>

            <div className="mt-5 space-y-4">

              <div className="flex items-center gap-3">

                <div className="h-3 w-3 rounded-full bg-green-500"></div>

                <span className="text-gray-600">
                  Frontend Completed
                </span>

              </div>

              <div className="flex items-center gap-3">

                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>

                <span className="text-gray-600">
                  Backend Integration Completed
                </span>

              </div>

              <div className="flex items-center gap-3">

                <div className="h-3 w-3 rounded-full bg-blue-500"></div>

                <span className="text-gray-600">
                  FastAPI Ready
                </span>

              </div>

            </div>

          </div>

        </div>

        <div className="mt-12 border-t pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-500 text-sm">
            © 2026 FoodProcess. Academic project for Food Processing Operations Management.
          </p>

          <p className="text-sm text-gray-500 mt-3 md:mt-0">
            Built with Next.js • Tailwind CSS • FastAPI
          </p>

        </div>

      </div>

    </footer>
  );
}