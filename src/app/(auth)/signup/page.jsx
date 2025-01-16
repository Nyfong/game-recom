"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isHydrated, setIsHydrated] = useState(false); // Ensure hydration
  const router = useRouter();

  useEffect(() => {
    setIsHydrated(true); // Marks the component as hydrated
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !name) {
      setError("All fields are required.");
      return;
    }

    const userData = {
      username,
      email,
      password,
      name,
      role: "user", // Ensure role is set to user
      profile: {
        name,
      },
    };

    try {
      const response = await fetch(
        "https://backend-apigame.onrender.com/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: result.username,
            email: result.email,
            role: "user",
          })
        );
        router.push("/signin");
      } else {
        setError(result.error || "Failed to register user.");
      }
    } catch (err) {
      console.error("Error during API request:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  if (!isHydrated) {
    // Prevent mismatched SSR content
    return null;
  }

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-[300px] sm:w-[390px] md:w-[500px] h-[450px] p-6 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
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
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              Sign Up
            </button>
          </div>
          <div className="text-center mt-4">
            <Link href="/signin" className="text-blue-500 hover:underline">
              Already have an account? Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
