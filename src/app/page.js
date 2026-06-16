import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Card from "./components/Card";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <div className="grid md:grid-cols-3 gap-4 p-6">
        <Card
          title="Inventory Management"
          description="Track products and stock levels."
        />

        <Card
          title="Order Management"
          description="Manage supplier and customer orders."
        />

        <Card
          title="AI Assistant"
          description="Ask questions in natural language."
        />
      </div>

      <Footer />
    </>
  );
}