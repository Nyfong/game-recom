"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://backend-apigame.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        const userData = {
          email: result.user.email,
          username: result.user.username,
          role: result.user.role,
          token: result.token
        };

        if (result.user.role === 'admin') {
          if (!isAdmin) {
            setError("Please use admin login for admin accounts");
            return;
          }
          localStorage.setItem('admin', JSON.stringify(userData));
          router.push("../../dashboard/layout.jsx");
        } else {
          if (isAdmin) {
            router.push("/dashboard");
            return;
          }
          localStorage.setItem('user', JSON.stringify(userData));
          router.push("/");
        }
      } else {
        setError(result.error || "Invalid credentials");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-[300px] sm:w-[390px] md:w-[500px] h-[450px] p-6 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isAdmin ? "Admin Login" : "Sign In"}
        </h2>

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Login as Admin</span>
          </label>
        </div>

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
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {isAdmin ? "Admin Login" : "Sign In"}
          </button>

          {!isAdmin && (
            <>
              <div className="text-center">
                <Link href="/signup" className="text-blue-500 hover:underline">
                  Don't have an account? Sign Up
                </Link>
              </div>

              <button
                type="button"
                onClick={() => window.location.href = "https://backend-apigame.onrender.com/auth/google"}
                className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                <span className="flex items-center justify-center gap-4">
                  Sign In with Google
                  <FcGoogle />
                </span>
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signin;