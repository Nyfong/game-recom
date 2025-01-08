"use client"; // Ensure this is at the top for Next.js

import React, { useState } from "react"; // Import useState
import { FaEdit, FaTrash, FaHeart, FaShareAlt } from "react-icons/fa"; // Import icons

const Post = ({ post, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content?.text || "");

  // Get the logged-in user's ID
  const storedUser = localStorage.getItem("user");
  const loggedInUserId = storedUser ? JSON.parse(storedUser)._id : null;

  // Check if the logged-in user is the author of the post
  const isAuthor = post.user?._id === loggedInUserId;

  const handleSave = () => {
    onEdit(post._id, { text: editedContent, media: post.content?.media || [] });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={post.user?.profile?.profileImageUrl || "https://via.placeholder.com/150"}
              alt={post.user?.username || "User"}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold">{post.user?.username || "Unknown User"}</h3>
            <p className="text-sm text-gray-500">
              {post.createdAt ? new Date(post.createdAt).toLocaleString() : "Unknown Date"}
            </p>
          </div>
        </div>

        {/* Show edit/delete buttons only if the user is the author */}
        {isAuthor && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-gray-600 hover:text-blue-500"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => onDelete(post._id)}
              className="text-gray-600 hover:text-red-500"
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>

      {/* Rest of the component */}
      {isEditing ? (
        <div>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 resize-none"
            rows="3"
          />
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <p className="text-gray-700 mb-4">{post.content?.text || "No content available"}</p>
          {post.content?.media && post.content.media.length > 0 && (
            <div className="mb-4">
              {post.content.media.map((mediaItem) =>
                mediaItem.type === "image" ? (
                  <img
                    key={mediaItem._id}
                    src={mediaItem.url}
                    alt={mediaItem.altText || "Media"}
                    className="w-full max-h-96 object-cover rounded-lg"
                  />
                ) : (
                  <video
                    key={mediaItem._id}
                    src={mediaItem.url}
                    controls
                    className="w-full max-h-96 rounded-lg"
                  />
                )
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 text-gray-600 hover:text-red-500">
          <FaHeart /> <span>{post.status?.likes || 0} Likes</span>
        </button>
        <button className="text-gray-600 hover:text-blue-500">
          <FaShareAlt />
        </button>
      </div>
    </div>
  );
};

export default Post;