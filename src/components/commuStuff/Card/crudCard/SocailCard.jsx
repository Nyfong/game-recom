"use client";
import React, { useState, useEffect } from "react";
import CreatePostForm from "./CreatePostForm";
import Post from "./Post";
import { FaSpinner } from "react-icons/fa";

const SocialCard = () => {
  const [showPostForm, setShowPostForm] = useState(false);
  const [posts, setPosts] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial posts from the API
  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://backend-api-dygr.onrender.com/api/getPosts");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const result = await response.json(); // Parse the response

      // Check if the response has a `data` field and it's an array
      if (!result.data || !Array.isArray(result.data)) {
        throw new Error("Expected an array of posts in the 'data' field");
      }

      setPosts(result.data); // Set the `data` field to the posts state
    } catch (error) {
      setError(error.message);
      setPosts([]); // Set posts to an empty array in case of error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Create a new post
  const handleCreatePost = async (postData) => {
    setError(null);
    try {
      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("description", postData.description);
      formData.append("mediaType", postData.mediaType);
      formData.append("mediaFile", postData.mediaFile);

      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData, // Use FormData for file uploads
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const newPost = await response.json();
      setPosts([newPost, ...posts]);
      setShowPostForm(false);
    } catch (error) {
      setError(error.message);
    }
  };

  // Edit a post
  const handleEditPost = async (id, updatedData) => {
    setError(null);
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      const updatedPost = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === id ? { ...post, ...updatedPost } : post
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete a post
  const handleDeletePost = async (id) => {
    setError(null);
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <button
        onClick={() => setShowPostForm(true)}
        className="w-full mb-6 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-lg"
        aria-label="Create a new post"
      >
        Share something with the community
      </button>
      {showPostForm && (
        <CreatePostForm
          onSubmit={handleCreatePost}
          onClose={() => setShowPostForm(false)}
        />
      )}
      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center text-gray-500">No posts to display.</div>
        ) : (
          posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              onEdit={handleEditPost}
              onDelete={handleDeletePost}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SocialCard;