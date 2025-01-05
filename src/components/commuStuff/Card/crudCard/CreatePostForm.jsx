"use client";

import React, { useState } from "react";
import { FaImage, FaVideo, FaTimes } from "react-icons/fa";

const CreatePostForm = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type.split("/")[0];

      // Validate file type
      if (fileType !== "image" && fileType !== "video") {
        setError("Invalid file type. Please upload an image or video.");
        return;
      }

      // Validate file size
      const maxSize = fileType === "image" ? 5 * 1024 * 1024 : 50 * 1024 * 1024; // 5MB for images, 50MB for videos
      if (file.size > maxSize) {
        setError(
          `File size too large. Maximum size allowed: ${
            fileType === "image" ? "5MB" : "50MB"
          }.`
        );
        return;
      }

      setError(""); // Clear any previous errors
      setMediaType(fileType);
      setMediaFile(file);
      const previewUrl = URL.createObjectURL(file);
      setMediaPreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const postData = {
      title,
      description,
      mediaType,
      mediaFile,
      timestamp: new Date().toISOString(),
    };

    try {
      await onSubmit(postData);
      resetForm();
    } catch (error) {
      setError("Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setMediaPreview(null);
    setMediaType(null);
    setMediaFile(null);
    setError("");
  };

  const removeMedia = () => {
    setMediaPreview(null);
    setMediaType(null);
    setMediaFile(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl shadow-2xl animate-fade-in">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Create Post</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full h-32 p-3 border border-gray-300 rounded-lg mb-4 resize-none focus:outline-none focus:border-blue-500"
            required
          />
          {mediaPreview && (
            <div className="relative mb-4">
              <button
                type="button"
                onClick={removeMedia}
                className="absolute top-2 right-2 bg-gray-800 text-white p-1 rounded-full hover:bg-gray-700"
                aria-label="Remove media"
              >
                <FaTimes />
              </button>
              {mediaType === "image" ? (
                <img
                  src={mediaPreview}
                  alt="Preview"
                  className="max-h-64 w-full object-cover rounded-lg"
                />
              ) : (
                <video
                  src={mediaPreview}
                  controls
                  className="max-h-64 w-full rounded-lg"
                />
              )}
            </div>
          )}
          {error && (
            <div className="text-red-500 text-sm mb-4">{error}</div>
          )}
          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
              <FaImage className="text-gray-600" />
              <span>Add Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleMediaChange}
                className="hidden"
              />
            </label>
            <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
              <FaVideo className="text-gray-600" />
              <span>Add Video</span>
              <input
                type="file"
                accept="video/*"
                onChange={handleMediaChange}
                className="hidden"
              />
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm;