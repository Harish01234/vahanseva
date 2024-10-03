// Home.jsx
'use client';
import { useUserStore } from "@/store/userstore";

export default function Home() {

  const {user}=useUserStore()
  console.log("user",user);
  
  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
          Welcome to VahanSeva
        </h1>
        <p className="text-gray-400 mt-4 text-lg">
          Your go-to ride booking service, fast and reliable.
        </p>
      </header>

      {/* CTA Section */}
      <div className="text-center space-y-5">
        <a
          href="/book-ride"
          className="px-8 py-4 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold hover:from-blue-500 hover:to-green-400 transition duration-300"
        >
          Book a Ride
        </a>

        <a
          href="/about"
          className="px-8 py-4 rounded-lg border-2 border-purple-500 text-purple-500 font-semibold hover:bg-purple-500 hover:text-black transition duration-300"
        >
          Learn More
        </a>
      </div>

      {/* Footer Section */}
      <footer className="absolute bottom-5 text-gray-500 text-sm">
        <p>© 2024 VahanSeva. All rights reserved.</p>
      </footer>
    </div>
  );
}
