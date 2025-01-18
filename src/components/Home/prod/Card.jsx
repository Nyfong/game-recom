"use client";

import { useState, useEffect } from "react";
import { get } from "@/lib/gameData";
import Link from "next/link";
import PropTypes from "prop-types";

const ProdCard = ({ data: selectedGenre = "", sliceNumber }) => {
  const [api, setApi] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await get();
        setApi(apiData);
        
        // Extract unique genres from the data
        const uniqueGenres = [...new Set(apiData.map(item => 
          item.genre?.toString() || "").filter(Boolean))].sort();
        setGenres(uniqueGenres);
        
        applyFilters(apiData, selectedGenre, searchQuery);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setFilteredData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedGenre]);

  useEffect(() => {
    applyFilters(api, selectedFilter, searchQuery);
  }, [searchQuery, selectedFilter]);

  const applyFilters = (data, genre, query) => {
    const filtered = data.filter((item) => {
      const itemGenre = item.genre?.toString().toLowerCase() || "";
      const searchGenre = genre?.toString().toLowerCase() || "";
      
      const matchesGenre = !genre || itemGenre === searchGenre;
      const matchesSearch = !query || 
        item.title?.toString().toLowerCase().includes(query.toLowerCase());

      return matchesGenre && matchesSearch;
    });
    setFilteredData(filtered);
  };

  // Authentication check
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      return (
        <section className="gap-2 flex justify-center items-center p-4">
          <div className="block rounded-md border border-indigo-900 bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white">
            Please login to view game details 🚀
          </div>
        </section>
      );
    }
  }

  return (
    <section className="my-10">
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search by game title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
        />
        
        {/* Genre filter dropdown */}
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {isLoading ? (
          <div className="col-span-full flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-900"></div>
          </div>
        ) : (
          filteredData.slice(0, sliceNumber).map((c) => {
            const key = c.id || c._id;

            return (
              <div
                key={key}
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
                    <Link href={`/content/detailgame/${c._id}`}>
                      <span className="mt-4 block rounded-md border border-indigo-900 bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-900">
                        About Game 🔥
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

ProdCard.propTypes = {
  data: PropTypes.string,
  sliceNumber: PropTypes.number.isRequired,
};

ProdCard.defaultProps = {
  data: "",
};

export default ProdCard;