"use client";

import React, { useState, useEffect } from "react";
import { Trash2, Edit, PlusCircle, Loader2, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import CommunityPage from "@/app/content/commu/page";

const PLACEHOLDER_IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";
const API_BASE_URL = "https://backend-apigame.onrender.com/api";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [newComment, setNewComment] = useState("");

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to fetch posts");
      }

      const data = await response.json();
      setPosts(data.posts); // Assuming the response has a `posts` array
      setIsLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle adding a new post
  const handleAddNew = () => {
    setSelectedPost({
      content: {
        text: "",
        media: [],
      },
      status: {
        visibility: "public",
        likes: 0,
        comments: [],
      },
      tags: [],
      userId: "logged-in-user-id", // Replace with the logged-in user's ID
    });
    setImageFile(null);
    setIsAddMode(true);
    setIsModalOpen(true);
  };

  // Handle saving a post (create or update)
  const handleSave = async () => {
    try {
      if (!selectedPost.content.text || !selectedPost.userId) {
        throw new Error("Post content and user ID are required");
      }

      const postData = {
        content: {
          text: selectedPost.content.text,
          media: selectedPost.content.media || [],
        },
        tags: selectedPost.tags || [],
        userId: selectedPost.userId,
      };

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadResponse = await fetch(`${API_BASE_URL}/upload`, {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image");
        }

        const { url } = await uploadResponse.json();
        postData.content.media.push({ type: "image", url });
      }

      const response = await fetch(
        `${API_BASE_URL}/users/${selectedPost.userId}/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create post");
      }

      await fetchPosts();
      setIsModalOpen(false);
      setImageFile(null);
    } catch (err) {
      setError(err.message);
      console.error("Save error:", err);
    }
  };

  // Handle editing a post
  const handleEdit = (post) => {
    setSelectedPost({ ...post });
    setIsAddMode(false);
    setIsModalOpen(true);
  };

  // Handle deleting a post
  const handleDelete = async (postId) => {
    try {
      const userId = "logged-in-user-id"; // Replace with the logged-in user's ID
      const response = await fetch(
        `${API_BASE_URL}/users/${userId}/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to delete post");
      }
      await fetchPosts();
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message);
    }
  };

  // Handle liking a post
  const handleLike = async (postId) => {
    try {
      const userId = "logged-in-user-id"; // Replace with the logged-in user's ID
      const response = await fetch(
        `${API_BASE_URL}/users/${userId}/posts/${postId}/like`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to like post");
      }
      await fetchPosts();
    } catch (err) {
      console.error("Like error:", err);
      setError(err.message);
    }
  };

  // Handle adding a comment
  const handleAddComment = async (postId) => {
    try {
      if (!newComment.trim()) {
        throw new Error("Comment cannot be empty");
      }

      const userId = "logged-in-user-id"; // Replace with the logged-in user's ID
      const response = await fetch(
        `${API_BASE_URL}/users/${userId}/posts/${postId}/comment`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: newComment }),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to add comment");
      }
      setNewComment("");
      await fetchPosts();
    } catch (err) {
      console.error("Comment error:", err);
      setError(err.message);
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = async (postId, commentId) => {
    try {
      const userId = "logged-in-user-id"; // Replace with the logged-in user's ID
      const response = await fetch(
        `${API_BASE_URL}/users/${userId}/posts/${postId}/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to delete comment");
      }
      await fetchPosts();
    } catch (err) {
      console.error("Delete comment error:", err);
      setError(err.message);
    }
  };

  // Render the modal for adding/editing posts
  const renderPostModal = () => {
    if (!isModalOpen || !selectedPost) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-11/12 md:w-96">
          <h2 className="text-xl font-bold mb-4">
            {isAddMode ? "Add New Post" : "Edit Post"}
          </h2>
          <div className="space-y-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Post Image
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 relative">
                  <Image
                    src={
                      selectedPost.content.media &&
                      selectedPost.content.media.length > 0
                        ? selectedPost.content.media[0].url
                        : PLACEHOLDER_IMAGE
                    }
                    alt="Post Preview"
                    className="rounded-lg object-cover"
                    fill
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700"
                />
              </div>
            </div>
            <textarea
              placeholder="Post Content *"
              value={selectedPost.content.text}
              onChange={(e) =>
                setSelectedPost({
                  ...selectedPost,
                  content: { ...selectedPost.content, text: e.target.value },
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

  // Render the posts in a table format
  const renderPostTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3">Profile</th>
            <th className="p-3">Username</th>
            <th className="p-3">Content</th>
            <th className="p-3">Media</th>
            <th className="p-3">Likes</th>
            <th className="p-3">Comments</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id} className="border-b hover:bg-gray-50">
              <td className="p-3">
                <div className="w-10 h-10 relative">
                  <Image
                    src={post.user.profile.profileImageUrl || PLACEHOLDER_IMAGE}
                    alt="Profile"
                    className="rounded-full object-cover"
                    fill
                  />
                </div>
              </td>
              <td className="p-3">{post.user.username}</td>
              <td className="p-3">{post.content.text}</td>
              <td className="p-3">
                {post.content.media && post.content.media.length > 0 && (
                  <Image
                    src={post.content.media[0].url}
                    alt="Post Media"
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                )}
              </td>
              <td className="p-3">{post.status.likes}</td>
              <td className="p-3">{post.status.comments.length}</td>
              <td className="p-3 flex space-x-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit />
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Render loading or error state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        Error: {error}. Please try again.
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Community Management Dashboard</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          <PlusCircle className="mr-2" /> Add New Post
        </button>
      </div>
      <div className="bg-white rounded-lg shadow">
        {posts.length ? renderPostTable() : <p className="p-4">No posts available.</p>}
      </div>
      {renderPostModal()}
    </div>
  );
};

export default Community;