"use client"; // This makes the component a client component

import { useState, useEffect } from "react";
import { get } from "@/lib/gameData"; // Ensure gameData doesn't depend on fs during SSR
import Link from "next/link";

let ProdCard = ({ data: selectedGenre }) => {
  const [api, setApi] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [user, setUser] = useState(null);

  // Fetch game data and filter by genre if provided
  useEffect(() => {
    const fetchData = async () => {
      const apiData = await get();
      setApi(apiData);

      // Filter by genre if selectedGenre is present
      if (selectedGenre) {
        const filtered = apiData.filter(
          (item) => item.genre?.toLowerCase() === selectedGenre.toLowerCase()
        );
        setFilteredData(filtered);
      } else {
        setFilteredData([]); // Reset filtered data when no genre is selected
      }
    };

    fetchData();

    const timeoutId = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);

    return () => clearTimeout(timeoutId); // Clean up timeout when component unmounts
  }, [selectedGenre]); // Re-fetch data when selectedGenre changes

  // Read user data from localStorage once
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []); // Empty dependency array ensures this only runs once on mount

  // Early return if user is not available
  if (!user) {
    return (
      <section className="gap-2 flex justify-center items-center p-4">
        <div className="block rounded-md border border-indigo-900 bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white">
          Please login to view game details 🚀
        </div>
      </section>
    );
  }

  // Show welcome message when user is logged in and during the timeout
  if (showWelcome) {
    return (
      <section className="gap-2 flex justify-center items-center p-4">
        <div className="block rounded-md border border-indigo-700 bg-green-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white">
          Welcome, {user.username}!
        </div>
      </section>
    );
  }

  // Render the product cards when the user is logged in and after 2 seconds
  return (
    <section className="my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {(filteredData.length > 0 ? filteredData : api).map((c) => {
          // Check if the game's ID exists in the list
          const gameIndex = (
            filteredData.length > 0 ? filteredData : api
          ).findIndex((item) => item.id === c.id);

          // If the game exists, generate the correct URL for the link
          const linkUrl =
            gameIndex !== -1 ? `/content/detailgame/${c.id}` : null;

          return (
            <div
              key={c.id}
              className="relative flex flex-col justify-between block rounded-tr-3xl border border-gray-100"
            >
              <span className="absolute -right-px -top-px rounded-bl-3xl text-xs md:text-md rounded-tr-3xl bg-rose-600 px-6 py-4 font-medium uppercase tracking-widest text-white">
                Free Game {c.id}
              </span>
              <div>
                <img
                  src={c.thumbnail}
                  alt={c.title}
                  className="h-32 md:h-80 w-full rounded-tr-3xl object-cover"
                />
              </div>
              <div className="flex flex-col justify-between h-[260px] p-4 text-center">
                <div>
                  <strong className="text-sm md:text-xl font-bold font-medium text-gray-900">
                    {c.title}
                  </strong>
                </div>
                <div>
                  <p className="mt-2 line-clamp-3 text-pretty text-gray-700">
                    {c.short_description}
                  </p>
                </div>
                <div>
                  {linkUrl ? (
                    <Link href={linkUrl}>
                      <span className="mt-4 block rounded-md border border-indigo-900 bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-900">
                        About Game 🔥
                      </span>
                    </Link>
                  ) : (
                    <div className="mt-4 block rounded-md border border-gray-400 bg-gray-200 px-5 py-3 text-sm font-medium uppercase tracking-widest text-gray-500">
                      Game not available
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProdCard;
