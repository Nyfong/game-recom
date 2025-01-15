"use client";

import { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import { PiCoffeeBold } from "react-icons/pi";
import { getBlog } from "@/lib/blogData";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MainBlogRead = ({ id }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false); // State to track image loading

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const fetchData = await getBlog();
        const foundBlog = fetchData.find((post) => post._id === id);

        if (!foundBlog) {
          throw new Error("Blog post not found");
        }

        setBlog(foundBlog);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto mt-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-8/12 px-4 mb-8">
            <Skeleton className="w-full h-64 rounded" />
            <Skeleton className="h-10 w-3/4 mt-4" />
            <Skeleton className="h-4 w-full mt-4" />
            <Skeleton className="h-4 w-full mt-2" />
          </div>
          <div className="w-full md:w-4/12 px-4 mb-8">
            <Skeleton className="w-full h-48 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto mt-8 text-center">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
            <Link href="/">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Back to Home
              </button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const categories = [
    { name: "Technology", href: "/category/technology" },
    { name: "Travel", href: "/category/travel" },
    { name: "Food", href: "/category/food" },
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between">
          {/* Main Blog Content */}
          <article className="w-full md:w-8/12 px-4 mb-8">
            <div className="relative">
              {!imageLoaded && (
                <div className="w-full h-64 md:h-96 flex justify-center items-center bg-gray-100 rounded-lg shadow-md">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-900"></div>
                </div>
              )}
              <img
                src={blog.image}
                alt={blog.title}
                className={`w-full h-64 md:h-96 object-cover rounded-lg shadow-md ${
                  imageLoaded ? "block" : "hidden"
                }`}
                loading="lazy"
                onLoad={() => setImageLoaded(true)} // Set imageLoaded to true when the image is fully loaded
              />
              <div className="absolute bottom-4 left-4">
                <Link
                  href="/content/paycoffee"
                  className="inline-flex items-center gap-2 bg-blue-800 rounded-lg px-5 py-3 text-sm font-medium uppercase tracking-wide text-white hover:bg-blue-700 transition-colors"
                >
                  <span>Support us now</span>
                  <PiCoffeeBold className="text-lg" />
                </Link>
              </div>
            </div>

            <h1 className="text-4xl font-bold mt-6 mb-4">{blog.title}</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700">{blog.paragraph}</p>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="w-full md:w-4/12 px-4 mb-8">
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Categories</h2>
                <nav>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category.name}>
                        <Link
                          href={category.href}
                          className="block text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </CardContent>
            </Card>

            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src="https://static.semrush.com/blog/uploads/media/8b/06/8b063f735e2192a61c6861f4755ffc5d/what-is-digital-advertising.svg"
                alt="Advertisement"
                className="w-full"
                loading="lazy"
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default MainBlogRead;
