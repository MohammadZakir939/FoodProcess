export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-100">

     
     {/* Premium Background */}

<div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:50px_50px] opacity-60"></div>

<div className="absolute -top-52 -left-44 h-[500px] w-[500px] rounded-full bg-green-400/20 blur-[140px]"></div>

<div className="absolute top-32 right-0 h-[450px] w-[450px] rounded-full bg-emerald-300/20 blur-[140px]"></div>

<div className="absolute bottom-0 left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-green-500/10 blur-[120px]"></div>
    <div className="max-w-7xl mx-auto px-8 py-20">
    <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>

            <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              🌿 Smart Food Operations Platform
            </span>

           <h1 className="mt-8 text-5xl md:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight text-gray-900">

  Intelligent{" "}

  <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-lime-500 bg-clip-text text-transparent">
    Food
  </span>

  <br />

  Processing

  <br />

  <span className="text-gray-700">
    Management Platform
  </span>

</h1>

            <p className="mt-8 max-w-2xl text-lg md:text-xl leading-9 text-gray-600">

                Streamline inventory management, monitor production workflows,
                manage suppliers, track orders, and gain operational insights
                through a centralized platform designed specifically for modern
                food processing businesses.

            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <button className="rounded-xl bg-green-600 px-8 py-4 text-white font-semibold shadow-lg hover:bg-green-700 transition">
                Get Started
              </button>

              <button className="rounded-xl border border-gray-300 bg-white px-8 py-4 font-semibold hover:border-green-600 hover:text-green-600 transition">
                Learn More
              </button>

            </div>

            {/* Stats */}

            <div className="mt-16 grid grid-cols-3 gap-8">

             
            

              <div>
                <h2 className="text-3xl font-bold text-green-600">
                  24/7
                </h2>
                <p className="text-gray-500 mt-2">
                  Monitoring
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="relative flex justify-center">

            {/* Floating Card */}

            <div className="absolute -top-8 -left-14 bg-white rounded-2xl shadow-xl p-5 w-52 border">

              <p className="text-gray-500 text-sm">
                Inventory Status
              </p>


            </div>

        <div className="rounded-[32px] border border-white/70 bg-white/80 backdrop-blur-2xl shadow-[0_40px_80px_rgba(0,0,0,0.12)] overflow-hidden">

  {/* Header */}

  <div className="flex items-center justify-between px-6 py-4 border-b bg-white">

    <div>

      <h3 className="font-bold text-lg">
        FoodProcess Dashboard
      </h3>

      <p className="text-sm text-gray-500">
        Production Overview
      </p>

    </div>

    <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>

  </div>

  <div className="grid grid-cols-4">

    {/* Sidebar */}

    <div className="col-span-1 bg-gray-50 border-r p-4 space-y-4">

      <div className="h-10 rounded-xl bg-green-600"></div>

      <div className="h-3 rounded bg-gray-300"></div>

      <div className="h-3 rounded bg-gray-300"></div>

      <div className="h-3 rounded bg-gray-300"></div>

      <div className="h-3 rounded bg-gray-300"></div>

    </div>

    {/* Main */}

    <div className="col-span-3 p-6">

      {/* Cards */}

      <div className="grid grid-cols-3 gap-4">

        <div className="rounded-xl bg-green-50 p-4">

          <p className="text-sm text-gray-500">
            Inventory
          </p>

          <h3 className="text-2xl font-bold mt-2">
            1,245
          </h3>

        </div>

        <div className="rounded-xl bg-blue-50 p-4">

          <p className="text-sm text-gray-500">
            Orders
          </p>

         

        </div>

        <div className="rounded-xl bg-orange-50 p-4">

          <p className="text-sm text-gray-500">
            Production
          </p>

          

        </div>

      </div>

      {/* Chart */}

      <div className="mt-8">

        <div className="flex items-end gap-3 h-44">

          <div className="w-8 h-20 rounded bg-green-300"></div>

          <div className="w-8 h-28 rounded bg-green-400"></div>

          <div className="w-8 h-32 rounded bg-green-500"></div>

          <div className="w-8 h-24 rounded bg-green-400"></div>

          <div className="w-8 h-36 rounded bg-green-600"></div>

          <div className="w-8 h-28 rounded bg-green-500"></div>

          <div className="w-8 h-40 rounded bg-green-700"></div>

        </div>

      </div>

    </div>

  </div>

</div>

            {/* Bottom Floating Card */}

            <div className="absolute -bottom-8 right-0 bg-white rounded-2xl shadow-xl p-5 border w-60">

              <p className="text-gray-500 text-sm">
                AI Insight
              </p>

              <p className="font-semibold mt-2">
                Inventory levels are healthy.
                No products are at immediate risk of shortage.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}