"use client";

import React, { useState } from "react";
import { FaImage, FaTimes, FaSmile, FaPlus } from "react-icons/fa";

const CreatePost = ({ userName, userAvatar, onSubmit }) => {
  const [isFormVisible, setIsFormVisible] = useState(false); // State to manage form visibility
  const [postContent, setPostContent] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [visibility, setVisibility] = useState("public");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      setError("Only images and videos are allowed.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB.");
      return;
    }

    setMediaFile(file);
    setMediaPreview(URL.createObjectURL(file));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate post content
    if (!postContent.trim() && !mediaFile) {
      setError("Please enter some content or upload a file.");
      return;
    }

    // Prepare the post data
    const postData = {
      content: {
        text: postContent,
        media: mediaFile ? [mediaFile] : [],
      },
      status: {
        visibility: visibility,
        likes: 0,
        comments: 0,
        shares: 0,
      },
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    // Call the onSubmit prop with the post data
    onSubmit(postData);

    // Reset the form and hide it
    setPostContent("");
    setMediaFile(null);
    setMediaPreview(null);
    setVisibility("public");
    setTags("");
    setError("");
    setIsFormVisible(false); // Hide the form after submission
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* Always show the user profile section */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={userAvatar}
            alt={userName}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{userName}</h3>
          <p className="text-sm text-gray-500">What's on your mind?</p>
        </div>
      </div>

      {/* Button to toggle form visibility */}
      {!isFormVisible && (
        <button
          onClick={() => setIsFormVisible(true)}
          className="w-full flex items-center justify-center gap-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <FaPlus />
          <span>Create a Post</span>
        </button>
      )}

      {/* Form (visible only if isFormVisible is true) */}
      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          {/* Close Icon */}
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={() => setIsFormVisible(false)}
              className="text-gray-600 hover:text-red-500"
            >
              <FaTimes className="text-2xl" />
            </button>
          </div>

          {/* Text Content */}
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 resize-none"
            rows="3"
          />

          {/* Media Preview */}
          {mediaPreview && (
            <div className="relative mb-4">
              <button
                type="button"
                onClick={() => {
                  setMediaFile(null);
                  setMediaPreview(null);
                }}
                className="absolute top-2 right-2 bg-gray-800 text-white p-1 rounded-full hover:bg-gray-700"
              >
                <FaTimes />
              </button>
              {mediaFile.type.startsWith("image") ? (
                <img
                  src={mediaPreview}
                  alt="Preview"
                  className="w-full max-h-96 object-cover rounded-lg"
                />
              ) : (
                <video
                  src={mediaPreview}
                  controls
                  className="w-full max-h-96 rounded-lg"
                />
              )}
            </div>
          )}

          {/* Visibility Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Visibility
            </label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="friends">Friends Only</option>
            </select>
          </div>

          {/* Tags Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., sunset, nature"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-gray-600 hover:text-blue-500 cursor-pointer">
                <FaImage />
                <span>Photo/Video</span>
                <input
                  type="file"
                  accept="image/*, video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <button
                type="button"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-500"
              >
                <FaSmile />
                <span>Feeling/Activity</span>
              </button>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Post
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreatePost;