"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // List of admin emails
  const adminEmails = ["admin2@example.com", "admin@example.com"]; // Add all admin emails here

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://backend-apigame.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Check if the email is in the admin list
        const isAdmin = adminEmails.includes(email.toLowerCase());

        const userData = {
          profile: {
            name: result.user.name || "",
            profileImageUrl: result.user.profileImageUrl || "",
            bio: result.user.bio || "",
            location: result.user.location || "",
            joinedAt: result.user.joinedAt || new Date().toISOString(),
          },
          actions: {
            posts: result.user.posts || [],
            comments: result.user.comments || [],
            ratings: result.user.ratings || [],
            likes: result.user.likes || [],
          },
          settings: {
            notifications: {
              email: true,
              push: true,
            },
            theme: result.user.settings?.theme || "light",
            language: result.user.settings?.language || "en",
          },
          _id: result.user._id,
          username: result.user.username,
          email: result.user.email,
          role: isAdmin ? "admin" : "user", // Set role based on email check
          createdAt: result.user.createdAt,
          updatedAt: result.user.updatedAt,
          token: result.token,
          __v: result.user.__v,
        };

        // Store user data
        localStorage.setItem("user", JSON.stringify(userData));

        // Handle admin redirect
        if (isAdmin) {
          localStorage.setItem("admin", "true");
          console.log("Admin login detected, redirecting to dashboard...");
          setTimeout(() => {
            router.push("/dashboard");
          }, 100);
        } else {
          localStorage.removeItem("admin");
          console.log("Regular user login, redirecting to home...");
          router.push("/");
        }
      } else {
        setError(result.error || "Invalid credentials");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-[300px] sm:w-[390px] md:w-[500px] h-[450px] p-6 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

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
            Sign In
          </button>

          <div className="text-center">
            <Link href="/signup" className="text-blue-500 hover:underline">
              Don't have an account? Sign Up
            </Link>
          </div>

          <button
            type="button"
            onClick={() =>
              (window.location.href =
                "https://backend-apigame.onrender.com/auth/google")
            }
            className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            <span className="flex items-center justify-center gap-4">
              Sign In with Google
              <FcGoogle />
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;