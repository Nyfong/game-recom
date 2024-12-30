"use client";

import React, { useState, useEffect } from "react";
import { Trash2, Edit, PlusCircle } from "lucide-react";
import Image from "next/image";

const PLACEHOLDER_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";

const GameCRUDDashboard = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Fetch games from the API
  const fetchGames = async () => {
    try {
      const response = await fetch("/api/games");
      if (!response.ok) throw new Error("Failed to fetch games");
      const data = await response.json();
      setGames(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/games/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) throw new Error("Failed to delete game");
      
      await fetchGames(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (game) => {
    setSelectedGame({ ...game });
    setIsAddMode(false);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedGame({
      name: "",
      category: "",
      developer: "",
      rating: "",
      size: "",
      releaseDate: "",
      lastUpdate: "",
      image: PLACEHOLDER_IMAGE,
    });
    setImageFile(null);
    setIsAddMode(true);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      
      // Append all game data
      Object.keys(selectedGame).forEach(key => {
        if (key !== 'image' || !imageFile) { // Don't append image if we have a file
          formData.append(key, selectedGame[key]);
        }
      });
      
      // Append image file if exists
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const url = isAddMode ? '/api/games' : `/api/games/${selectedGame._id}`;
      const method = isAddMode ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (!response.ok) throw new Error(`Failed to ${isAddMode ? 'add' : 'update'} game`);

      await fetchGames(); // Refresh the list
      setIsModalOpen(false);
      setImageFile(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setSelectedGame(prev => ({ ...prev, image: previewUrl }));
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
                    src={selectedGame.image || PLACEHOLDER_IMAGE}
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
              placeholder="Game Name"
              value={selectedGame.name}
              onChange={(e) => setSelectedGame({ ...selectedGame, name: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Category"
              value={selectedGame.category}
              onChange={(e) => setSelectedGame({ ...selectedGame, category: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Developer"
              value={selectedGame.developer}
              onChange={(e) => setSelectedGame({ ...selectedGame, developer: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Rating"
              value={selectedGame.rating}
              onChange={(e) => setSelectedGame({ ...selectedGame, rating: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Size"
              value={selectedGame.size}
              onChange={(e) => setSelectedGame({ ...selectedGame, size: e.target.value })}
              className="w-full p-2 border rounded"
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

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">Game Management</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          <PlusCircle className="mr-2" size={20} /> Add Game
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">Game</th>
              <th className="p-3">Category</th>
              <th className="p-3">Developer</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Size</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game._id} className="border-b hover:bg-gray-50">
                <td className="p-3 flex items-center">
                  <Image
                    src={game.image || PLACEHOLDER_IMAGE}
                    alt={game.name}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover w-[100px] h-[100px] mr-10"
                  />
                  {game.name}
                </td>
                <td className="p-3">{game.category}</td>
                <td className="p-3">{game.developer}</td>
                <td className="p-3">{game.rating}</td>
                <td className="p-3">{game.size}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(game)}
                    className="text-blue-500 hover:bg-blue-100 p-2 rounded"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(game._id)}
                    className="text-red-500 hover:bg-red-100 p-2 rounded"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {renderGameModal()}
    </div>
  );
};

export default GameCRUDDashboard;