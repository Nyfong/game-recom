"use client";
import { useState } from "react";
import Link from "next/link";
import logo from "@/assets/icon/fav.png";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { LiaGamepadSolid } from "react-icons/lia";
import { AiFillGift } from "react-icons/ai";
import { IoGlasses } from "react-icons/io5";
import { BiAtom } from "react-icons/bi";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

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
                      className="text-white flex items-center gap-2 transition hover:text-white/75  py-5"
                      href="/content/game"
                    >
                      <LiaGamepadSolid />
                      <span>Games</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white flex items-center gap-2 transition hover:text-white/75  py-5"
                      href="/content/commu"
                    >
                      <AiFillGift />
                      <span> Community</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white flex items-center gap-2 transition hover:text-white/75  py-5"
                      href="/content/aboutus"
                    >
                      <IoGlasses />
                      <span> About Us</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-white flex items-center gap-2 transition hover:text-white/75  py-5"
                      href="/content/blog"
                    >
                      <BiAtom />
                      <span> Blog</span>
                    </Link>
                  </li>
                  <li className="hidden">
                    <Link
                      className="text-white flex items-center gap-2 transition hover:text-white/75  py-5"
                      href="/account"
                    >
                      <FaUserCircle />
                      <span>Profile Test</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex sm:gap-4">
                <div
                  className="font-sans flex justify-center gap-2 items-center mx-auto shadow-xl text-lg text-gray-50 bg-[#0A0D2D] backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFFFFF] hover:text-black before:-z-10 before:aspect-square before:hover:scale-200 before:hover:duration-500 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
                  // href="/auth/login"
                >
                  <ClerkProvider>
                    <SignedOut>
                      <SignInButton />
                    </SignedOut>
                    <SignedIn>
                      <UserButton />
                    </SignedIn>
                  </ClerkProvider>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 19"
                    className="w-8 h-8 justify-end bg-gray-50 group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-gray-700 p-2 rotate-45"
                  >
                    <path
                      className="fill-gray-800 group-hover:fill-gray-800"
                      d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                    ></path>
                  </svg>
                </div>
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
              className="text-white flex items-center gap-2 transition hover:text-white/75  py-5"
              href="/content/game"
            >
              <LiaGamepadSolid />
              <span>Games</span>
            </Link>
            <Link
              className="text-white flex items-center gap-2 transition hover:text-white/75  py-5"
              href="/content/commu"
            >
              <AiFillGift />
              <span> Community</span>
            </Link>
            <Link
              className="text-white flex items-center gap-2 transition hover:text-white/75  py-5"
              href="/content/aboutus"
            >
              <IoGlasses />
              <span> About Us</span>
            </Link>
            <Link
              className="text-white flex items-center gap-2 transition hover:text-white/75  py-5"
              href="/content/blog"
            >
              <BiAtom />
              <span> Blog</span>
            </Link>
            <Link
              className="text-white flex items-center gap-2 transition hover:text-white/75  py-5 hidden"
              href="/account"
            >
              <FaUserCircle />
              <span>Profile Test</span>
            </Link>
            <Link
              className="font-sans flex justify-center gap-2 items-center mx-auto shadow-xl text-lg text-gray-50 bg-[#0A0D2D] backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFFFFF] hover:text-black before:-z-10 before:aspect-square before:hover:scale-200 before:hover:duration-500 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
              href="/auth/login"
            >
              Login
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 19"
                className="w-8 h-8 justify-end bg-gray-50 group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-gray-700 p-2 rotate-45"
              >
                <path
                  className="fill-gray-800 group-hover:fill-gray-700"
                  d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                ></path>
              </svg>
            </Link>
            {/* <Link
              className="rounded-md bg-gray-100 px-5 py-2 text-sm font-medium text-teal-500"
              href="/auth/signup"
            >
              Register
            </Link> */}
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
