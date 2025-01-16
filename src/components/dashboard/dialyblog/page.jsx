"use client";

import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import BlogTable from "./BlogTable";
import BlogModal from "./BlogModal";

const API_BASE_URL = "https://backend-apigame.onrender.com/api";

const DailyBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/blog`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to fetch blogs");
      }
      const data = await response.json();
      setBlogs(data);
      setIsLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleEdit = (blog) => {
    setSelectedBlog({ ...blog });
    setIsAddMode(false);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedBlog({
      title: "",
      paragraph: "",
      image: "",
    });
    setImageFile(null);
    setIsAddMode(true);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      // Basic validation
      if (!selectedBlog.title || !selectedBlog.paragraph) {
        throw new Error("All fields are required");
      }

      const blogData = {
        title: selectedBlog.title,
        paragraph: selectedBlog.paragraph,
        image: selectedBlog.image || "",
      };

      const response = await fetch(
        isAddMode
          ? `${API_BASE_URL}/blog`
          : `${API_BASE_URL}/blog/${selectedBlog._id}`,
        {
          method: isAddMode ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blogData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to ${isAddMode ? "add" : "update"} blog`);
      }

      await fetchBlogs();
      setIsModalOpen(false);
      setImageFile(null);
    } catch (err) {
      setError(err.message);
      console.error("Save error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/blog/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to delete blog");
      }
      await fetchBlogs();
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setSelectedBlog((prev) => ({ ...prev, image: previewUrl }));
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daily Blog</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          <PlusCircle className="mr-2" /> Add New Blog
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        {blogs.length ? (
          <BlogTable blogs={blogs} handleEdit={handleEdit} handleDelete={handleDelete} />
        ) : (
          <p className="p-4">No blogs available.</p>
        )}
      </div>
      {isModalOpen && (
        <BlogModal
          isAddMode={isAddMode}
          selectedBlog={selectedBlog}
          setSelectedBlog={setSelectedBlog}
          handleSave={handleSave}
          setIsModalOpen={setIsModalOpen}
          handleImageChange={handleImageChange}
        />
      )}
    </div>
  );
};

export default DailyBlog;
