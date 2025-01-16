"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "@/assets/icon/fav.png";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { LiaGamepadSolid } from "react-icons/lia";
import { AiFillGift } from "react-icons/ai";
import { IoGlasses } from "react-icons/io5";
import { BiAtom } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userImage, setUserImage] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch user data from localStorage and API
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const adminStatus = localStorage.getItem("admin") === "true";
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAdmin(adminStatus);

      // Fetch user profile image from the backend
      fetch(`https://backend-apigame.onrender.com/api/users/${parsedUser._id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.profile && data.profile.profileImageUrl) {
            setUserImage(data.profile.profileImageUrl);
          }
        })
        .catch((error) => {
          console.error("Error fetching user image:", error);
        });
    }
    setIsLoading(false);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    setUser(null);
    setUserImage(null);
    setIsAdmin(false);
    router.push("/");
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  if (isLoading) {
    return null;
  }

  // Navigation items with conditional dashboard
  const navigationItems = [
    { href: "/content/game", icon: <LiaGamepadSolid />, text: "Games" },
    { href: "/content/commu", icon: <AiFillGift />, text: "Community" },
    { href: "/content/aboutus", icon: <IoGlasses />, text: "About Us" },
    { href: "/content/blog", icon: <BiAtom />, text: "Blog" },
  ];

  // Add dashboard for admin users
  if (isAdmin) {
    navigationItems.push({ href: "/dashboard", icon: <MdDashboard />, text: "Dashboard" });
  }

  return (
    <>
      <header className="bg-blue-800 sticky top-0 z-10 md:z-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between overflow-hidden">
            <div className="md:flex md:items-center md:gap-5">
              <Link className="block text-teal-600" href="/">
                <span className="sr-only">Home</span>
                <Image src={logo} alt="" className="w-36 h-36" />
              </Link>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  {navigationItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        className="text-white flex items-center gap-2 transition hover:text-white/75 py-5"
                        href={item.href}
                      >
                        {item.icon}
                        <span>{item.text}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex sm:gap-4">
                {user ? (
                  <div className="flex items-center gap-4">
                    <div className="relative group">
                      <Link href="/account">
                        <div className="flex flex-col items-center overflow-hidden">
                          <img
                            src={
                              userImage ||
                              "https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                            }
                            alt="User Profile"
                            className="rounded-full w-8 h-8 object-cover cursor-pointer"
                          />
                          <div className="absolute top-full mt-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {user.username}
                          </div>
                        </div>
                      </Link>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="font-sans flex justify-center gap-2 items-center mx-auto shadow-xl text-lg text-gray-50 bg-[#0A0D2D] backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFFFFF] hover:text-black before:-z-10 before:aspect-square before:hover:scale-200 before:hover:duration-500 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
                    >
                      Sign Out
                    </button>
                  </div>
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

        {/* Drawer Overlay */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={toggleDrawer}
          ></div>
        )}

        {/* Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-blue-800 text-white z-40 transform transition-transform duration-300 ease-in-out ${
            isDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6">
            <button
              onClick={toggleDrawer}
              className="text-white absolute top-4 right-4"
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
            <nav className="mt-10">
              {navigationItems.map((item, index) => (
                <Link
                  key={index}
                  className="block py-3 hover:text-white/75"
                  href={item.href}
                >
                  <span className="inline-block mr-2">{item.icon}</span>
                  {item.text}
                </Link>
              ))}
              
              {user ? (
                <>
                  <hr className="my-4 border-gray-600" />
                  <Link
                    href="/account"
                    className="block py-3 hover:text-white/75"
                  >
                    <img
                      src={
                        userImage ||
                        "https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                      }
                      alt="User Profile"
                      className="rounded-full inline-block mr-2 w-8 h-8 object-cover cursor-pointer"
                    />
                    My Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full py-3 text-left hover:text-white/75"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link href="/signin" className="block py-3 hover:text-white/75">
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;