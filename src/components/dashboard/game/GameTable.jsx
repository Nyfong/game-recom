import React from "react";
import { Trash2, Edit } from "lucide-react";
import Image from "next/image";

const PLACEHOLDER_IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";

const GameTable = ({ games, handleEdit, handleDelete }) => (
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

export default GameTable;
