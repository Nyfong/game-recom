"use client";

import { useState, useEffect } from "react";
import { get } from "@/lib/gameData"; // API fetching logic
import Link from "next/link";

const ProdCard = ({ data: selectedGenre }) => {
  const [api, setApi] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [user, setUser] = useState(null);

  // Fetch game data and filter by genre
  useEffect(() => {
    const fetchData = async () => {
      const apiData = await get();
      setApi(apiData);

      if (selectedGenre) {
        const filtered = apiData.filter(
          (item) => item.genre?.toLowerCase() === selectedGenre.toLowerCase()
        );
        setFilteredData(filtered);
      }
    };

    fetchData();

    const timeoutId = setTimeout(() => setShowWelcome(false), 2000);
    return () => clearTimeout(timeoutId);
  }, [selectedGenre]);

  // Validate token and retrieve user data from backend
  useEffect(() => {
    const validateToken = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const parsedUser = JSON.parse(storedUser);
      const token = parsedUser.token;

      try {
        const response = await fetch(
          "https://your-backend-api.com/api/validate-token", // Replace with your actual API endpoint
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const userData = await response.json(); // Assuming user data is returned in the response
          setUser(userData); // Set user data from backend response
        } else {
          localStorage.removeItem("user"); // Token invalid/expired
          setUser(null);
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        setUser(null);
      }
    };

    validateToken();
  }, []);

  if (!user) {
    return (
      <section className="flex justify-center items-center p-4">
        <div className="rounded-md bg-indigo-900 px-5 py-3 text-sm font-medium text-white">
          Please login to view game details 🚀
        </div>
      </section>
    );
  }

  if (showWelcome) {
    return (
      <section className="flex justify-center items-center p-4">
        <div className="rounded-md bg-green-900 px-5 py-3 text-sm font-medium text-white">
          Welcome, {user.username}!
        </div>
      </section>
    );
  }

  return (
    <section className="my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {(filteredData.length > 0 ? filteredData : api).map((c) => (
          <div
            key={c.id}
            className="relative flex flex-col justify-between rounded-tr-3xl border"
          >
            <span className="absolute -right-px -top-px rounded-bl-3xl bg-rose-600 px-6 py-4 text-white">
              Free Game {c.id}
            </span>
            <img
              src={c.thumbnail}
              alt={c.title}
              className="h-32 md:h-80 w-full rounded-tr-3xl object-cover"
            />
            <div className="flex flex-col justify-between h-[260px] p-4 text-center">
              <strong className="text-sm md:text-xl font-bold text-gray-900">
                {c.title}
              </strong>
              <p className="mt-2 text-gray-700">{c.short_description}</p>
              <Link href={`/content/detailgame/${c._id}`}>
                <span className="mt-4 block rounded-md bg-indigo-900 px-5 py-3 text-sm text-white hover:bg-white hover:text-indigo-900">
                  About Game 🔥
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProdCard;
