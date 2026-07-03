import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-green-700 mb-6">
          About FoodProcess
        </h1>

        <p className="text-lg text-gray-700 mb-10">
          FoodProcess is an intelligent operations platform built to help food
          processing businesses efficiently manage inventory, production,
          suppliers, and quality control from one centralized dashboard.
        </p>

        {/* Who We Are */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Who We Are</h2>
          <p className="text-gray-700 leading-7">
            FoodProcess is designed for food manufacturers, distributors, and
            processing companies looking to digitize their daily operations.
            Our platform combines modern web technologies with intelligent
            automation to simplify business workflows.
          </p>
        </section>

        {/* Mission */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-700 leading-7">
            To empower food processing businesses with smart technology that
            improves productivity, reduces operational costs, minimizes waste,
            and ensures product quality throughout the production lifecycle.
          </p>
        </section>

        {/* Vision */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
          <p className="text-gray-700 leading-7">
            To become the trusted digital platform for food processing
            industries by delivering innovative, scalable, and AI-powered
            operational solutions.
          </p>
        </section>

        {/* Features */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            What FoodProcess Offers
          </h2>

          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Smart Inventory Management</li>
            <li>Production Monitoring</li>
            <li>Supplier Management</li>
            <li>Order Tracking</li>
            <li>Waste Analytics</li>
            <li>Business Reports & Insights</li>
            <li>Future AI-powered Decision Support</li>
          </ul>
        </section>

        {/* Technology */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Technology Stack
          </h2>

          <div className="flex flex-wrap gap-3">
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
              Next.js
            </span>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
              FastAPI
            </span>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
              Python
            </span>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
              REST API
            </span>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
              Tailwind CSS
            </span>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}