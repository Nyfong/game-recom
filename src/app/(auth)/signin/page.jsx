"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // List of admin emails
  const adminEmails = ["admin2@example.com", "admin@example.com"];

  useEffect(() => {
    // Load Google's OAuth script
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.google) {
          initializeGoogleSignIn();
        }
      };
    };

    loadGoogleScript();
  }, []);

  const initializeGoogleSignIn = () => {
    window.google.accounts.id.initialize({
      client_id:
        "85531888519-3ns12d70tv91s7lklcj4mk6nrjrqoamv.apps.googleusercontent.com",
      callback: handleGoogleSignIn,
      allowed_parent_origin: [
        "https://backend-apigame.onrender.com",
        "http://localhost:3000",
      ],
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      { theme: "outline", size: "large", width: 300 } // Fixed width
    );
  };

  const handleGoogleSignIn = async (response) => {
    try {
      const res = await fetch(
        "https://backend-apigame.onrender.com/auth/google/callback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            credential: response.credential,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        const userData = {
          profile: {
            name: data.user.name || "",
            profileImageUrl: data.user.profileImageUrl || "",
            bio: data.user.bio || "",
            location: data.user.location || "",
            joinedAt: data.user.joinedAt || new Date().toISOString(),
          },
          actions: {
            posts: data.user.posts || [],
            comments: data.user.comments || [],
            ratings: data.user.ratings || [],
            likes: data.user.likes || [],
          },
          settings: {
            notifications: {
              email: true,
              push: true,
            },
            theme: data.user.settings?.theme || "light",
            language: data.user.settings?.language || "en",
          },
          _id: data.user._id,
          username: data.user.username,
          email: data.user.email,
          role: adminEmails.includes(data.user.email.toLowerCase())
            ? "admin"
            : "user",
          createdAt: data.user.createdAt,
          updatedAt: data.user.updatedAt,
          token: data.token,
          __v: data.user.__v,
        };

        localStorage.setItem("user", JSON.stringify(userData));

        if (userData.role === "admin") {
          localStorage.setItem("admin", "true");
          router.push("/dashboard");
        } else {
          localStorage.removeItem("admin");
          router.push("/");
        }
      } else {
        setError(data.error || "Google sign-in failed");
      }
    } catch (err) {
      console.error("Error during Google sign-in:", err);
      setError("An unexpected error occurred during Google sign-in");
    }
  };

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
          role: isAdmin ? "admin" : "user",
          createdAt: result.user.createdAt,
          updatedAt: result.user.updatedAt,
          token: result.token,
          __v: result.user.__v,
        };

        localStorage.setItem("user", JSON.stringify(userData));

        if (isAdmin) {
          localStorage.setItem("admin", "true");
          router.push("/dashboard");
        } else {
          localStorage.removeItem("admin");
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
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="w-[300px] p-3 bg-gray-200 rounded-lg flex flex-col items-center justify-center mb-5">
        <p>sample credential ✨</p>
        <p> email : seng@example.com</p>
        <p>password: password123</p>
        <p>អ្នកអាច signup បានដូចគ្នា</p>
      </div>
      <div className="w-[300px] sm:w-[390px] md:w-[500px] h-auto p-6 border border-gray-300 rounded-lg shadow-lg">
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

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div id="googleSignInDiv" className="w-full"></div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
