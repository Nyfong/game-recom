"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

let BlogCard = () => {
  const [blogs, setBlogs] = useState([]); // State to store fetched blogs
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Fetch data from API
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "https://backend-apigame.onrender.com/api/blog"
        );
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        setBlogs(data); // Update blogs state with fetched data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p>Loading...</p>; // Display loading state
  if (error) return <p>Error: {error}</p>; // Display error state

  return (
    <section className="grid grid-cols-1 gap-4">
      {blogs.map((blog, i) => (
        <div key={i}>
          <Link href={`/content/blog/${blog._id}`}>
            <div className="overflow-hidden rounded-lg shadow transition hover:shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
              <div>
                <img
                  alt={blog.title || "Blog Image"}
                  src={blog.image || "https://via.placeholder.com/400"}
                  className="h-56 w-full object-cover rounded-lg opacity-70 duration-100 hover:opacity-100"
                />
                <div className="bg-white p-4 sm:p-6">
                  <time
                    dateTime={blog.date || "2022-10-10"}
                    className="block text-xs text-gray-500"
                  >
                    {blog.date || "10th Oct 2022"}
                  </time>
                  <h3 className="mt-0.5 text-lg text-gray-900 font-bold">
                    {blog.title || "Untitled Blog"}
                  </h3>
                </div>
              </div>
              <div>
                <p className="line-clamp-2 md:line-clamp-5 lg:line-clamp-none text-sm text-gray-500">
                  {blog.description || "No description available."}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </section>
  );
};

export default BlogCard;
