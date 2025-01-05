"use client";

import React, { useState } from "react";
import { FaHeart, FaShareAlt, FaEdit, FaTrash, FaGlobe, FaUserFriends, FaLock } from "react-icons/fa";

const Post = ({ post, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedDescription, setEditedDescription] = useState(post.description);
  const [privacy, setPrivacy] = useState(post.privacy || "public");

  // Provide default values for post.author
  const author = post.author || { name: "Unknown", avatar: "https://via.placeholder.com/150" };

  const handleSave = () => {
    onEdit(post._id, { // Use post._id instead of post.id
      title: editedTitle,
      description: editedDescription,
      privacy,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(post._id); // Use post._id instead of post.id
  };

  const getPrivacyIcon = () => {
    switch (privacy) {
      case "public":
        return <FaGlobe className="text-gray-500" />;
      case "friends":
        return <FaUserFriends className="text-gray-500" />;
      case "private":
        return <FaLock className="text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow hover:shadow-xl">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={author.avatar} // Use the default avatar if post.author is undefined
              alt={author.name} // Use the default name if post.author is undefined
              className="w-10 h-10 rounded-full"
            />
            <div>
              <span className="font-semibold">{author.name}</span>
              <p className="text-sm text-gray-500">{post.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              {getPrivacyIcon()}
              <span>{privacy}</span>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-gray-600 hover:text-blue-500 transition-colors"
              aria-label="Edit post"
            >
              <FaEdit />
            </button>
            <button
              onClick={handleDelete}
              className="text-gray-600 hover:text-red-500 transition-colors"
              aria-label="Delete post"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Title"
              required
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 resize-none"
              placeholder="Description"
              required
            />
            <select
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            >
              <option value="public">Public</option>
              <option value="friends">Friends</option>
              <option value="private">Only Me</option>
            </select>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-700 mb-4">{post.description}</p>
            {post.mediaUrl &&
              (post.mediaType === "image" ? (
                <img
                  src={post.mediaUrl}
                  alt="Post content"
                  className="w-full max-h-96 object-cover rounded-lg mb-4"
                />
              ) : (
                <video
                  src={post.mediaUrl}
                  controls
                  className="w-full max-h-96 rounded-lg mb-4"
                />
              ))}
          </>
        )}
      </div>
      <div className="px-4 py-3 bg-gray-50 flex items-center gap-6">
        <button
          className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
          aria-label="Like post"
        >
          <FaHeart /> <span>{post.likes} Likes</span>
        </button>
        <button
          className="text-gray-600 hover:text-blue-500 transition-colors"
          aria-label="Share post"
        >
          <FaShareAlt />
        </button>
      </div>
    </div>
  );
};

export default Post;