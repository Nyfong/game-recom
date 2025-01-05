"use client";

import React, { useState, useEffect } from "react";
import { Trash2, Edit, PlusCircle } from "lucide-react";
import Image from "next/image";

const PLACEHOLDER_IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";
const API_BASE_URL = "https://backend-apigame.onrender.com/api";

const GameCRUDDashboard = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const fetchGames = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/games`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to fetch games");
      }
      const data = await response.json();
      setGames(data);
      setIsLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // const handleDelete = async (id) => {
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/deletegame/${id}`, {
  //       method: "DELETE",
  //     });

  //     if (!response.ok) throw new Error("Failed to delete game");
  //     await fetchGames();
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  const handleEdit = (game) => {
    setSelectedGame({ ...game });
    setIsAddMode(false);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedGame({
      title: "",
      genre: "",
      developer: "",
      publisher: "",
      platform: "",
      release_date: "",
      game_url: "",
      profile_url: "",
      short_description: "",
      thumbnail: PLACEHOLDER_IMAGE,
    });
    setImageFile(null);
    setIsAddMode(true);
    setIsModalOpen(true);
  };
  const handleSave = async () => {
    try {
      // Basic validation
      if (!selectedGame.title || !selectedGame.genre || !selectedGame.developer || 
          !selectedGame.publisher || !selectedGame.platform || !selectedGame.release_date || 
          !selectedGame.game_url || !selectedGame.profile_url || !selectedGame.short_description) {
        throw new Error("All fields are required");
      }
  
      // Create the game data object
      const gameData = {
        title: selectedGame.title,
        genre: selectedGame.genre,
        developer: selectedGame.developer,
        publisher: selectedGame.publisher,
        platform: selectedGame.platform,
        release_date: selectedGame.release_date,
        game_url: selectedGame.game_url,
        // profile_url: selectedGame.profile_url,
        short_description: selectedGame.short_description,
        thumbnail: selectedGame.thumbnail || PLACEHOLDER_IMAGE
      };
  
      const response = await fetch(
        isAddMode 
          ? "https://backend-apigame.onrender.com/api/addgame"
          : `https://backend-apigame.onrender.com/api/updategame/${selectedGame._id}`,
        {
          method: isAddMode ? "POST" : "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(gameData)
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to ${isAddMode ? "add" : "update"} game`);
      }

      await fetchGames();
      setIsModalOpen(false);
      setImageFile(null);
    } catch (err) {
      setError(err.message);
      console.error("Save error:", err);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/deletegame/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to delete game");
      }
      await fetchGames();
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setSelectedGame((prev) => ({ ...prev, image: previewUrl }));
    }
  };

  const renderGameModal = () => {
    if (!isModalOpen || !selectedGame) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl font-bold mb-4">
            {isAddMode ? "Add New Game" : "Edit Game"}
          </h2>
          <div className="space-y-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Game Image
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 relative">
                  <Image
                    src={selectedGame.thumbnail || PLACEHOLDER_IMAGE}
                    alt="Game Preview"
                    className="rounded-lg object-cover"
                    fill
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700"
                />
              </div>
            </div>
            <input
              type="text"
              placeholder="Game Title *"
              value={selectedGame.title}
              onChange={(e) =>
                setSelectedGame({ ...selectedGame, title: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Genre *"
              value={selectedGame.genre}
              onChange={(e) =>
                setSelectedGame({ ...selectedGame, genre: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Developer *"
              value={selectedGame.developer}
              onChange={(e) =>
                setSelectedGame({ ...selectedGame, developer: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Publisher *"
              value={selectedGame.publisher}
              onChange={(e) =>
                setSelectedGame({ ...selectedGame, publisher: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Platform *"
              value={selectedGame.platform}
              onChange={(e) =>
                setSelectedGame({ ...selectedGame, platform: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="date"
              placeholder="Release Date *"
              value={selectedGame.release_date}
              onChange={(e) =>
                setSelectedGame({
                  ...selectedGame,
                  release_date: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Game URL *"
              value={selectedGame.game_url}
              onChange={(e) =>
                setSelectedGame({ ...selectedGame, game_url: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Profile URL *"
              value={selectedGame.profile_url}
              onChange={(e) =>
                setSelectedGame({
                  ...selectedGame,
                  profile_url: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Short Description *"
              value={selectedGame.short_description}
              onChange={(e) =>
                setSelectedGame({
                  ...selectedGame,
                  short_description: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              rows={3}
            />
            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-gray-200 text-black p-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  const renderGameTable = () => (
    <table className="w-full text-sm text-left">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="p-3">Game</th>
          <th className="p-3">Genre</th>
          <th className="p-3">Developer</th>
          <th className="p-3">Publisher</th>
          <th className="p-3">Platform</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {games.map((game) => (
          <tr key={game._id} className="border-b hover:bg-gray-50">
            <td className="p-3 flex items-center">
              <Image
                src={game.thumbnail || PLACEHOLDER_IMAGE}
                alt={game.title}
                width={100}
                height={100}
                property="lazyloading"
                className="rounded-lg object-cover w-[100px] h-[100px] mr-10"
              />
               <div className="ml-4">
                <p className="font-bold">{game.title}</p>
                {/* <p className="text-gray-500 text-sm">{game.short_description}</p> */}
              </div>
            </td>
            <td className="p-3">{game.genre}</td>
            <td className="p-3">{game.developer}</td>
            <td className="p-3">{game.publisher}</td>
            <td className="p-3">{game.platform}</td>
            <td className="p-3 flex space-x-2">
              <button
                onClick={() => handleEdit(game)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Edit />
              </button>
              <button
                onClick={() => handleDelete(game._id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Game Management Dashboard</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          <PlusCircle className="mr-2" /> Add New Game
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        {games.length ? renderGameTable() : <p className="p-4">No games available.</p>}
      </div>
      {renderGameModal()}
    </div>
  );
};

export default GameCRUDDashboard;