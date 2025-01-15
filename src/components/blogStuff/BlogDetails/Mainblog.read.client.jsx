"use client";
import { PiCoffeeBold } from "react-icons/pi";
import Link from "next/link";

const MainBlog = ({ blog }) => {
  if (!blog) {
    return (
      <div className="container mx-auto mt-8 text-center">
        <h2 className="text-2xl font-bold text-red-500">Blog not found</h2>
        <Link href="/">
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Back to Home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <section>
        <div className="container mx-auto mt-8">
          <div className="flex flex-wrap justify-between">
            {/* Main Blog Content */}
            <div className="w-full md:w-8/12 px-4 mb-8">
              <div className="relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 object-cover rounded"
                />
                <div className="absolute bottom-[15px] left-2">
                  <Link href="/content/paycoffee">
                    <div className="mt-3 inline-block bg-blue-800 rounded-lg px-5 py-3 text-xs font-medium uppercase tracking-wide text-white flex gap-2 hover:bg-blue-400">
                      <p>Support us now</p>
                      <PiCoffeeBold />
                    </div>
                  </Link>
                </div>
              </div>
              <h2 className="text-4xl font-bold mt-4 mb-2">{blog.title}</h2>
              <p className="text-gray-700 mb-4">{blog.paragraph}</p>
            </div>

            {/* Sidebar */}
            <div className="w-full md:w-4/12 px-4 mb-8">
              <div className="bg-gray-100 px-4 py-6 rounded">
                <h3 className="text-lg font-bold mb-2">Categories</h3>
                <ul className="list-disc list-inside">
                  <li>
                    <Link
                      href="#"
                      className="text-gray-700 hover:text-gray-900"
                    >
                      Technology
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-700 hover:text-gray-900"
                    >
                      Travel
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-700 hover:text-gray-900"
                    >
                      Food
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="my-10 rounded-lg p-2">
                <img
                  src="https://static.semrush.com/blog/uploads/media/8b/06/8b063f735e2192a61c6861f4755ffc5d/what-is-digital-advertising.svg"
                  alt="Sidebar Ad"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainBlog;
