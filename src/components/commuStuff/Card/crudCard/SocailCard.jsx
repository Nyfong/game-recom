"use client";

import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import CreatePost from "./CreatePostForm";
import Post from "./Post";

const SocialCard = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeComponent = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          setIsInitialized(true);
          return;
        }

        const parsedUser = JSON.parse(storedUser);
        const userId = parsedUser._id;

        // Fetch user data
        const userResponse = await fetch(`https://backend-apigame.onrender.com/api/users/${userId}`);
        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        const userData = await userResponse.json();
        setUserData(userData);

        // Fetch posts
        const postsResponse = await fetch("https://backend-apigame.onrender.com/api/posts");
        if (!postsResponse.ok) throw new Error("Failed to fetch posts");
        const postsData = await postsResponse.json();
        setPosts(postsData.posts || []);
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initializeComponent();
  }, []);

  const handleCreatePost = async (postData) => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) throw new Error("User not authenticated");
  
      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser._id;
  
      // Prepare FormData for media upload
      const formData = new FormData();
      formData.append("content[text]", postData.content.text);
      formData.append("status[visibility]", postData.status.visibility);
      formData.append("tags", postData.tags.join(","));
  
      if (postData.content.media.length > 0) {
        formData.append("media", postData.content.media[0]);
      }
  
      const response = await fetch(`https://backend-apigame.onrender.com/api/users/${userId}/posts`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create post");
      }
  
      const newPost = await response.json();
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    } catch (error) {
      console.error("Error creating post:", error.message);
      alert(`Error creating post: ${error.message}`);
    }
  };

  const handleEditPost = async (id, updatedContent) => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) throw new Error("User not authenticated");

      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser._id;

      const response = await fetch(`https://backend-apigame.onrender.com/api/users/${userId}/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: updatedContent }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update post");
      }

      const updatedPost = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === id ? { ...post, content: updatedContent } : post
        )
      );
    } catch (error) {
      console.error("Error updating post:", error.message);
      alert(`Error updating post: ${error.message}`);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) throw new Error("User not authenticated");

      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser._id;

      const response = await fetch(`https://backend-apigame.onrender.com/api/users/${userId}/posts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete post");
      }

      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error.message);
      alert(`Error deleting post: ${error.message}`);
    }
  };

  if (!isInitialized) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-2xl" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="font-bold">Please log in to continue</p>
      </div>
    );
  }

  const { profile = {}, username } = userData;
  const profileImageUrl = profile.profileImageUrl || "https://via.placeholder.com/150";

  return (
    <div className="max-w-2xl mx-auto p-4">
      <CreatePost
        userName={username}
        userAvatar={profileImageUrl}
        onSubmit={handleCreatePost}
      />

      {isLoading ? (
        <div className="flex justify-center items-center">
          <FaSpinner className="animate-spin text-2xl" />
        </div>
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
  );
};

export default SocialCard;