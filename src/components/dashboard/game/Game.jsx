"use client";

import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import GameTable from "./GameTable";
import GameModal from "./GameModal";

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

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

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
        {games.length ? (
          <GameTable games={games} handleEdit={handleEdit} handleDelete={handleDelete} />
        ) : (
          <p className="p-4">No games available.</p>
        )}
      </div>
      {isModalOpen && (
        <GameModal
          isAddMode={isAddMode}
          selectedGame={selectedGame}
          setSelectedGame={setSelectedGame}
          handleSave={handleSave}
          setIsModalOpen={setIsModalOpen}
          handleImageChange={handleImageChange}
        />
      )}
    </div>
  );
};

export default GameCRUDDashboard;