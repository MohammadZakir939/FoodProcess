export default function Features() {
  const features = [
    {
      title: "Inventory Management",
      description:
        "Track raw materials and finished products with a centralized inventory system designed for food processing operations.",
    },
    {
      title: "Production Tracking",
      description:
        "Monitor production batches, processing stages, and operational workflows from a single dashboard.",
    },
    {
      title: "Supplier Management",
      description:
        "Maintain supplier information, procurement records, and vendor relationships in one place.",
    },
    {
      title: "Quality Control",
      description:
        "Record inspections and quality assurance activities to support consistent manufacturing standards.",
    },
    {
      title: "AI Insights",
      description:
        "Generate operational recommendations based on production and inventory data after backend integration.",
    },
    {
      title: "Business Reports",
      description:
        "Access reports that summarize operational activities and support data-driven decision making.",
    },
  ];

  return (
    <section className="bg-white py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Platform Features
          </span>

          <h2 className="mt-6 text-4xl font-black text-gray-900">
            Everything Needed for Food Processing Operations
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-lg text-gray-600 leading-8">
            FoodProcess combines inventory management, production tracking,
            supplier management, quality monitoring, and AI-powered insights
            into a single platform.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border bg-white p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="h-14 w-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl">
                🌿
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}