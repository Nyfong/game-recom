"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      // Send a POST request to your API to check if the user exists
      const response = await fetch("/api/checkuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setError(""); // Clear any previous errors

        // Store user data (email and username) in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({ email, username: result.username })
        );

        router.push("/"); // Redirect to the home page or dashboard
      } else {
        setError(result.error || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Error during signin:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-[300px] sm:w-[390px] md:w-[500px] h-[400px] p-6 border border-gray-300 block rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Signin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Signin
            </button>
          </div>
          <div className="w-full flex justify-center mt-2">
            <p className="text-gray-500">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-500 hover:underline">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
