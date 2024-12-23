"use client"; // Add this at the top of your file

import { useState, useEffect } from "react";
import Link from "next/link";
import logo from "@/assets/icon/fav.png";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { LiaGamepadSolid } from "react-icons/lia";
import { AiFillGift } from "react-icons/ai";
import { IoGlasses } from "react-icons/io5";
import { BiAtom } from "react-icons/bi";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // Set the user state
    }
    setIsLoading(false); // Set loading to false once data is loaded
  }, []);

  const handleSignOut = () => {
    // Remove user data from localStorage and update the state
    localStorage.removeItem("user");
    setUser(null);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Show loading state until data is loaded
  if (isLoading) {
    return null; // Or you can show a loading spinner or something else
  }

  return (
    <>
      <header className="bg-blue-800 sticky top-0 z-10">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between overflow-hidden">
            <div className="md:flex md:items-center  md:gap-5">
              <Link className="block text-teal-600" href="/">
                <span className="sr-only">Home</span>
                <Image src={logo} alt="" className="w-36 h-36" />
              </Link>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link
                      className="text-white flex items-center gap-2 transition hover:text-white/75 py-5"
                      href="/content/game"
                    >
                      <LiaGamepadSolid />
                      <span>Games</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white flex items-center gap-2 transition hover:text-white/75 py-5"
                      href="/content/commu"
                    >
                      <AiFillGift />
                      <span>Community</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white flex items-center gap-2 transition hover:text-white/75 py-5"
                      href="/content/aboutus"
                    >
                      <IoGlasses />
                      <span>About Us</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-white flex items-center gap-2 transition hover:text-white/75 py-5"
                      href="/content/blog"
                    >
                      <BiAtom />
                      <span>Blog</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex sm:gap-4">
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="font-sans flex justify-center gap-2 items-center mx-auto shadow-xl text-lg text-gray-50 bg-[#0A0D2D] backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFFFFF] hover:text-black before:-z-10 before:aspect-square before:hover:scale-200 before:hover:duration-500 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    className="font-sans flex justify-center gap-2 items-center mx-auto shadow-xl text-lg text-gray-50 bg-[#0A0D2D] backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFFFFF] hover:text-black before:-z-10 before:aspect-square before:hover:scale-200 before:hover:duration-500 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
                    href="/signin"
                  >
                    Sign In
                  </Link>
                )}
              </div>

              <div className="block md:hidden">
                <button
                  onClick={toggleDrawer}
                  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer for mobile */}
        {isDrawerOpen && (
          <div className="md:hidden bg-blue-800 text-white p-10 z-20 flex flex-col items-start justify-center pt-16 space-y-6">
            <button
              onClick={toggleDrawer}
              className="text-white absolute top-[15%] right-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Link
              className="text-white flex items-center gap-2 transition hover:text-white/75 py-5"
              href="/content/game"
            >
              <LiaGamepadSolid />
              <span>Games</span>
            </Link>
            <Link
              className="text-white flex items-center gap-2 transition hover:text-white/75 py-5"
              href="/content/commu"
            >
              <AiFillGift />
              <span>Community</span>
            </Link>
            <Link
              className="text-white flex items-center gap-2 transition hover:text-white/75 py-5"
              href="/content/aboutus"
            >
              <IoGlasses />
              <span>About Us</span>
            </Link>
            <Link
              className="text-white flex items-center gap-2 transition hover:text-white/75 py-5"
              href="/content/blog"
            >
              <BiAtom />
              <span>Blog</span>
            </Link>
            {user ? (
              <button
                onClick={handleSignOut}
                className="text-white flex items-center gap-2 transition hover:text-white/75 py-5"
              >
                Sign Out
              </button>
            ) : (
              <Link
                className="text-white flex items-center gap-2 transition hover:text-white/75 py-5"
                href="/signin"
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
