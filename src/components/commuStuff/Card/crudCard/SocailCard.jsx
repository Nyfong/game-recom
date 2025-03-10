"use client";
import React, { useState, useEffect, useCallback } from "react";
import { FaSpinner } from "react-icons/fa";
import CreatePost from "./CreatePostForm";
import Post from "./Post";

const SocialCard = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserAndPosts = useCallback(async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setIsLoading(false);
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser._id;

      const userResponse = await fetch(
        `https://backend-apigame.onrender.com/api/users/${userId}`
      );
      if (!userResponse.ok) throw new Error("Failed to fetch user data");
      const userDataResponse = await userResponse.json();
      setUserData(userDataResponse);

      const postsResponse = await fetch(
        `https://backend-apigame.onrender.com/api/posts`
      );
      if (!postsResponse.ok) throw new Error("Failed to fetch posts");
      const postsData = await postsResponse.json();
      setPosts(postsData.posts || []);
    } catch (err) {
      if (err.message.includes("Failed to fetch")) {
        setError("Network error: Please check your internet connection.");
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserAndPosts();
  }, [fetchUserAndPosts]);

  const handleCreatePost = async (formData) => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) throw new Error("User not authenticated");

      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser._id;
      if (!userId) throw new Error("User ID not found in user data.");

      const postData = {
        content: {
          text: formData.get("text"),
          media: [],
        },
        tags: JSON.parse(formData.get("tags") || "[]"),
        status: "active",
      };

      const mediaFile = formData.get("media");
      if (mediaFile) {
        const base64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(mediaFile);
        });

        postData.content.media.push({
          type: "image",
          url: base64,
          altText: "User uploaded image",
        });
      }

      const response = await fetch(
        `https://backend-apigame.onrender.com/api/users/${userId}/postID`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || `Server error: ${response.status}`
        );
      }

      const newPost = await response.json();
      setPosts((prevPosts) => [newPost, ...prevPosts]);

      // Refresh the posts after successful creation
      await fetchUserAndPosts();

      return newPost;
    } catch (error) {
      if (error.message.includes("Failed to fetch")) {
        setError("Network error: Please check your internet connection.");
      } else {
        setError(error.message);
      }
      console.error("Create post error:", {
        message: error.message,
        stack: error.stack,
        error,
      });
      throw error;
    }
  };

  const handleEditPost = async (postId, updatedContent) => {
    try {
      const trimmedText = updatedContent?.content?.text?.trim();
      if (!trimmedText) {
        throw new Error("Post text is required");
      }

      const storedUser = localStorage.getItem("user");
      if (!storedUser) throw new Error("User not authenticated");

      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser._id;

      const response = await fetch(
        `https://backend-apigame.onrender.com/api/users/${userId}/posts/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: {
              text: trimmedText,
              media: updatedContent.content.media, // Preserve existing media
            },
            status: updatedContent.status,
            tags: updatedContent.tags,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update post");
      }

      const updatedPost = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? updatedPost : post))
      );

      // Refresh the posts after successful edit
      await fetchUserAndPosts();
    } catch (err) {
      if (err.message.includes("Failed to fetch")) {
        setError("Network error: Please check your internet connection.");
      } else {
        setError(err.message);
      }
      throw err;
    }
  };
  const handleDeletePost = async (postId) => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) throw new Error("User not authenticated");

      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser._id;

      const response = await fetch(
        `https://backend-apigame.onrender.com/api/users/${userId}/posts/${postId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete post");
      }

      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (err) {
      if (err.message.includes("Failed to fetch")) {
        setError("Network error: Please check your internet connection.");
      } else {
        setError(err.message);
      }
    }
  };

  if (isLoading) {
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
  const profileImageUrl =
    profile.profileImageUrl || "https://via.placeholder.com/40?text=User";

  return (
    <div className="max-w-2xl mx-auto p-4">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          role="alert"
        >
          {error}
        </div>
      )}

      <CreatePost
        userName={username}
        userAvatar={profileImageUrl}
        onSubmit={handleCreatePost}
      />

      <div className="space-y-4">
        {Array.isArray(posts) &&
          posts.map((post) => (
            <Post
              key={post._id || Math.random().toString(36)}
              post={post}
              onEdit={handleEditPost}
              onDelete={handleDeletePost}
            />
          ))}
      </div>
    </div>
  );
};

export default SocialCard;
