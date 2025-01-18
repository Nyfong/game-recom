import React from "react";
import Image from "next/image";

const PLACEHOLDER_IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";

const GameModal = ({
  isAddMode,
  selectedGame,
  setSelectedGame,
  handleSave,
  setIsModalOpen,
  handleImageChange,
}) => (
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

export default GameModal;
