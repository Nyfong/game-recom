"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Filter, Star, Play } from "lucide-react";
import { MdStar } from "react-icons/md";

const GameStorePage = () => {
  // Initial game list with more comprehensive details
  const [games, setGames] = useState([
    {
      id: 1,
      image:
        "https://imageio.forbes.com/specials-images/imageserve/653d1491d815981e910e08d8/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
      title: "The Finals",
      description:
        "In The Finals, teams of players must compete against each other as they participate in a fictional VR combat game show.",
      category: "Action",
      price: 29.99,
      rating: 4.5,

      time: "3h 1m 50s",
      platform: ["PC", "Console"],
    },
    {
      id: 2,
      image:
        "https://i0.wp.com/highschool.latimes.com/wp-content/uploads/2021/03/Valorant.png?fit=1200%2C675&ssl=1",
      title: "Valorant",
      description:
        "Valorant is an online multiplayer computer game, produced by Riot Games. A first-person shooter game with tactical team-based gameplay.",
      category: "Shooter",
      price: 0, // Free to play
      rating: 4.7,

      time: "2h 45m 30s",
      platform: ["PC"],
    },
    {
      id: 3,
      image:
        "https://www.minecraft.net/content/dam/games/minecraft/key-art/MC-Vanilla_Media-Block-Image_PC-Bundle-Keyart_800x450.jpg",
      title: "Minecraft",
      description:
        "Minecraft is a game where players place blocks and go on adventures. Build, explore, and survive in a blocky world of endless possibilities.",
      category: "Sandbox",
      price: 19.99,
      rating: 4.9,

      time: "5h 20m 10s",
      platform: ["PC", "Mobile", "Console"],
    },
    {
      id: 4,
      image:
        "https://www.minecraft.net/content/dam/games/minecraft/key-art/MC-Vanilla_Media-Block-Image_PC-Bundle-Keyart_800x450.jpg",
      title: "Minecraft",
      description:
        "Minecraft is a game where players place blocks and go on adventures. Build, explore, and survive in a blocky world of endless possibilities.",
      category: "Sandbox",
      price: 19.99,
      rating: 2,

      time: "5h 20m 10s",
      platform: ["PC", "Mobile", "Console"],
    },
  ]);

  // State for filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [ratingRange, setRatingRange] = useState([0, 5]);

  // Derived categories from games
  const categories = [...new Set(games.map((game) => game.category))];

  // Filtered games logic
  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || game.category === selectedCategory;
    const matchesRating =
      game.rating >= ratingRange[0] && game.rating <= ratingRange[1];

    return matchesSearch && matchesCategory && matchesRating;
  });

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">Game Store</h1>
          <p className="text-gray-600">
            Discover and download your next favorite game
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            {/* Search Input */}
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

            {/* Category Filter */}
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

            {/* Rating Range Filter */}
            <div className="flex items-center space-x-2">
              <span>
                <MdStar />
              </span>
              <input
                type="range"
                min="0"
                max="5"
                step={0.1}
                value={ratingRange[1]}
                onChange={(e) => setRatingRange([0, Number(e.target.value)])}
                className="w-32"
              />
              <span className="flex items-center">
                <MdStar className="mr-1" />
                {ratingRange[1].toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg transform transition hover:scale-105"
              >
                {/* Game Image */}
                <Image
                  src={game.image}
                  alt={game.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />

                {/* Game Details */}
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold">{game.title}</h2>
                    <div className="flex items-center text-yellow-500">
                      <Star className="mr-1" size={20} />
                      {game.rating}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 h-16 overflow-hidden">
                    {game.description}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <div className="text-green-600 font-bold">
                      {game.price === 0 ? "Free" : `$${game.price.toFixed(2)}`}
                    </div>
                  </div>

                  {/* Platforms and Action Buttons */}
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      {game.platform.map((platform) => (
                        <span
                          key={platform}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center">
                      <Play className="mr-2" size={16} /> Play
                    </button>
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

        {/* Load More Button */}
        {filteredGames.length > 0 && (
          <div className="text-center mt-8">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition">
              Load More Games
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameStorePage;
