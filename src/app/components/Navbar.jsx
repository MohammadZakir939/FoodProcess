import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-green-600 text-white">
      <h1 className="text-xl font-bold">FoodProcess</h1>

      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}