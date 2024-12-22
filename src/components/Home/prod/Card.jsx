"use client"; // This makes the component a client component

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { get } from "@/lib/gameData"; // Make sure gameData doesn't depend on fs during SSR
import Link from "next/link";
let ProdCard = ({ data: selectedGenre }) => {
  const { user } = useUser();
  const [api, setApi] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const apiData = await get();
      setApi(apiData);

      // Only filter if a genre is selected
      if (selectedGenre) {
        const filtered = apiData.filter(
          (item) => item.genre?.toLowerCase() === selectedGenre.toLowerCase()
        );
        setFilteredData(filtered);
        console.log("Filtered data:", filtered);
      } else {
        setFilteredData([]); // Reset filtered data when no genre is selected
      }
    };

    fetchData();

    const timeoutId = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [selectedGenre]); // Only depend on selectedGenre

  if (!user) {
    return (
      <section className="gap-2 flex justify-center items-center p-4">
        <div className="block rounded-md border border-indigo-900 bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white">
          Please log in to view game details 🚀
        </div>
      </section>
    );
  }

  if (showWelcome) {
    return (
      <section className="gap-2 flex justify-center items-center p-4">
        <div className="block rounded-md border border-indigo-700 bg-green-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white">
          Welcome!
        </div>
      </section>
    );
  }

  // Render the product cards when the user is logged in and after 2 seconds
  return (
    <section className="my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {(filteredData.length > 0 ? filteredData : api).map((c, index) => (
          <div
            key={index}
            className="relative flex flex-col justify-between block rounded-tr-3xl border border-gray-100"
          >
            <span className="absolute -right-px -top-px rounded-bl-3xl text-xs md:text-md rounded-tr-3xl bg-rose-600 px-6 py-4 font-medium uppercase tracking-widest text-white">
              Free Game {c.id}
            </span>
            <div>
              <img
                src={c.thumbnail}
                alt=""
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
                <Link href={`/content/detailgame/${c.id}`}>
                  <span className="mt-4 block rounded-md border border-indigo-900 bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-900">
                    About Game 🔥
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProdCard;
