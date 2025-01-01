"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, Filter, Star, Play } from "lucide-react";
import { MdStar } from "react-icons/md";

const GameStorePage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [ratingRange, setRatingRange] = useState([0, 5]);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://backend-apigame.onrender.com/api/games"); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch games.");
      }
      const data = await response.json();
      setGames(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const categories = [...new Set(games.map((game) => game.genre))];

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || game.genre === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">Game Store</h1>
          <p className="text-gray-600">
            Discover and download your next favorite game
          </p>
        </div>

        {/* Error or Loading States */}
        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading games...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">
            {error || "Something went wrong."}
          </div>
        ) : (
          <>
            <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-grow relative">
                  <input
                    type="text"
                    placeholder="Search games..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-10 border rounded-md"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="p-3 border rounded-md"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGames.map((game) => (
                  <div
                    key={game._id}
                    className="bg-white rounded-lg overflow-hidden shadow-lg transform transition hover:scale-105"
                  >
                    <Image
                      src={game.thumbnail}
                      alt={game.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-bold">{game.title}</h2>
                      </div>
                      <p className="text-gray-600 mb-4 h-16 overflow-hidden">
                        {game.short_description}
                      </p>
                      <div className="flex justify-between items-center mb-4">
                        <a
                          href={game.game_url}
                          className="text-blue-500 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit Game
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                No games found. Try adjusting your search or filters.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GameStorePage;
