"use client";

import React, { useState, useEffect } from "react";
import { PlusCircle, Loader2 } from "lucide-react";
import PostTable from "./PostTable";
import PostModal from "./PostModal";
import { fetchPosts, handleSave, handleEdit, handleDelete, handleApprove, handleDisapprove } from "./postHandlers";

const handleAddNew = (setSelectedPost, setImageFile, setIsAddMode, setIsModalOpen) => {
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

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchPosts(setPosts, setIsLoading, setError);
  }, []);

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
          onClick={() => handleAddNew(setSelectedPost, setImageFile, setIsAddMode, setIsModalOpen)}
          className="flex items-center bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          <PlusCircle className="mr-2" /> Add New Post
        </button>
      </div>
      <div className="bg-white rounded-lg shadow">
        {posts.length ? (
          <PostTable
            posts={posts}
            handleEdit={(post) => handleEdit(post, setSelectedPost, setIsAddMode, setIsModalOpen)}
            handleDelete={(postId) => handleDelete(postId, setPosts, setError)}
            handleApprove={(postId) => handleApprove(postId, setPosts, setError)}
            handleDisapprove={(postId) => handleDisapprove(postId, setPosts, setError)}
            refreshPosts={() => fetchPosts(setPosts, setIsLoading, setError)}
          />
        ) : (
          <p className="p-4">No posts available.</p>
        )}
      </div>
      {isModalOpen && (
        <PostModal
          isAddMode={isAddMode}
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
          setImageFile={setImageFile}
          setIsModalOpen={setIsModalOpen}
          handleSave={(tags) => {
            handleSave(selectedPost, imageFile, tags, setPosts, setIsModalOpen, setImageFile, setError, setIsLoading);
          }}
        />
      )}
    </div>
  );
};

export default Community;