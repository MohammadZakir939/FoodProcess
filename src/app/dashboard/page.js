import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="p-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p>
          Dashboard placeholder content.
        </p>
      </main>

      <Footer />
    </>
  );
}