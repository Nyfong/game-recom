"use client";

import React, { useState } from "react";
import { Download, Trophy, Star, GamepadIcon } from "lucide-react";
import Image from "next/image";
const popularGames = [
  {
    name: "FIFA 23",
    downloads: 1500,
    image:
      "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-mobile/season-5/global_assets/images/2023/03/fifa-mobile-grid-tile-season-5-16x9-1.jpg.adapt.crop16x9.1023w.jpg",

    developer: "EA Sports",
    rating: 4.5,
  },
  {
    name: "League of Legends",
    downloads: 1200,
    image:
      "https://cdn.prod.website-files.com/5f6e2764d26f3c5244a5b664/64b53061f419e782ea982384_LOL.jpg",

    developer: "Riot Games",
    rating: 4.7,
  },
  {
    name: "Valorant",
    downloads: 2000,
    image:
      "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/d0db663bf28844dcbd744935cdd8c71083e0031c-5600x3150.jpg",

    developer: "Riot Games",
    rating: 4.8,
  },
  {
    name: "Minecraft",
    downloads: 2500,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-kVChoz3ZT5ukQfDO5qWE-c4xPeqedBGJOg&s",

    developer: "Mojang",
    rating: 4.9,
  },
];

const GameCard = ({ game }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
      <div className="relative">
        <Image
          src={game.image}
          width={1000}
          height={1000}
          alt={game.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full flex items-center">
          <Download className="mr-1 h-4 w-4" />
          {game.downloads}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">{game.name}</h3>
          <div className="flex items-center text-yellow-500">
            <Star className="h-5 w-5 mr-1" />
            {game.rating}
          </div>
        </div>
        <p className="text-gray-500 mt-1">{game.developer}</p>
        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
          <Download className="mr-2 h-5 w-5" /> Download
        </button>
      </div>
    </div>
  );
};

const DownloadPage = () => {
  const [downloadCount, setDownloadCount] = useState(0);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Dashboard Cards */}
          <div className="bg-white p-6 rounded-xl shadow-lg flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Download className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-500">Total Downloads</h3>
              <p className="text-2xl font-bold text-gray-900">7,200</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <Trophy className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-gray-500">Top Game</h3>
              <p className="text-2xl font-bold text-gray-900">Minecraft</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg flex items-center">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <GamepadIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h3 className="text-gray-500">Active Games</h3>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Trophy className="mr-3 h-6 w-6 text-yellow-500" />
            Popular Downloads
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {popularGames.map((game, index) => (
              <GameCard key={index} game={game} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
