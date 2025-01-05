"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import FElogo from "@/assets/logoITE.png";
import SideBarProfile from "@/components/profileStuff/sideBar";
import Link from "next/link";

const AccountPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser._id;

      fetch(`https://backend-apigame.onrender.com/api/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    } else {
      setIsLoggedIn(false);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen text-center">
        <p className="font-bold">Loading...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Login Required
          </h2>
          <p className="text-gray-600 mb-6">
            Please login first to view your account details.
          </p>
          <Link
            href="/signin"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (!userData) {
    return <div>No user data found.</div>;
  }

  const { profile, username, email } = userData;
  const profileImageUrl =
    profile.profileImageUrl || "https://via.placeholder.com/150";
  const bio = profile.bio || "No bio available.";
  const location = profile.location || "Location not specified.";
  const joinedAt = new Date(profile.joinedAt).toLocaleDateString();

  return (
    <div className="flex flex-col md:flex-row gap-2 h-full">
      <SideBarProfile />

      <div className="w-full md:w-4/6 lg:w-5/6 bg-stone-50 md:h-[4000px] p-5 md:p-3 lg:p-0">
        <div className="flex flex-col mt-10 p-4 gap-10">
          <div className="w-full flex flex-col gap-5 items-center pt-10">
            <div className="relative mt-1 w-full">
              <div className="rounded overflow-hidden shadow-md bg-white">
                <div className="absolute -mt-20 w-full flex justify-center">
                  <div className="h-32 w-32">
                    <Image
                      src={profileImageUrl}
                      alt="profile picture"
                      className="rounded-full object-cover h-full w-full shadow-md"
                      width={128}
                      height={128}
                    />
                  </div>
                </div>
                <div className="px-6 mt-16">
                  <div className="flex flex-col my-4 md:flex-row gap-4 items-center justify-center">
                    <p className="font-bold text-3xl text-center mb-1">
                      {username}
                    </p>
                    <Image
                      src={FElogo}
                      className="h-6 w-6 object-contain"
                      alt="logoFE"
                    />
                  </div>
                  <p className="text-gray-800 text-sm text-center">{email}</p>
                  <p className="text-gray-800 text-sm text-center">
                    Joined on: {joinedAt}
                  </p>
                  <hr />
                  <p className="text-gray-800 text-sm text-center">
                    {location}
                  </p>
                  <p className="text-gray-800 text-sm pl-4 md:text-center md:pl-0 font-bold mt-5 underline">
                    About Me
                  </p>
                  <p className="text-center text-gray-600 text-base pt-3 font-normal">
                    {bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
