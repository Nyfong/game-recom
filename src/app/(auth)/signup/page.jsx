"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsHydrated(true);
    
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
      client_id: "85531888519-3ns12d70tv91s7lklcj4mk6nrjrqoamv.apps.googleusercontent.com",
      callback: handleGoogleSignUp,
      // Add authorized origin domains
      allowed_parent_origin: ["https://backend-apigame.onrender.com", "http://localhost:3000"]
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleSignUpDiv"),
      { 
        type: "standard",
        theme: "outline",
        size: "large",
        width: 280, // Fixed width in pixels instead of percentage
        text: "signup_with"
      }
    );
  };

  // Custom Google-style button as fallback
  const handleCustomGoogleClick = () => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    } else {
      setError("Google Sign-In is not available at the moment. Please try again later.");
    }
  };

  const handleGoogleSignUp = async (response) => {
    try {
      const res = await fetch("https://backend-apigame.onrender.com/auth/google/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          credential: response.credential,
          isSignUp: true
        }),
        credentials: 'include' // Include credentials for cross-origin requests
      });

      const data = await res.json();

      if (res.ok) {
        const userData = {
          username: data.username,
          email: data.email,
          role: "user"
        };

        localStorage.setItem("user", JSON.stringify(userData));
        router.push("/signin");
      } else {
        setError(data.error || "Google sign-up failed");
      }
    } catch (err) {
      console.error("Error during Google sign-up:", err);
      setError("An unexpected error occurred during Google sign-up");
    }
  };

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
      role: "user",
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
    return null;
  }

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-[300px] sm:w-[390px] md:w-[500px] h-auto min-h-[450px] p-6 border border-gray-300 rounded-lg shadow-lg">
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

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google Sign-In button container */}
          <div id="googleSignUpDiv" className="flex justify-center">
            {/* Fallback button in case Google button fails to load */}
            <button
              type="button"
              onClick={handleCustomGoogleClick}
              className="hidden w-[280px] p-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <FcGoogle className="w-5 h-5" />
              <span>Sign up with Google</span>
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