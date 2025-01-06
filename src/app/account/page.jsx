"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const AccountPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // New state for drawer
  const [editForm, setEditForm] = useState({
    name: "",
    bio: "",
    location: "",
    profileImageUrl: "",
  });

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
          setEditForm({
            name: data.username || "",
            bio: data.profile?.bio || "",
            location: data.profile?.location || "",
            profileImageUrl:
              data.profile?.profileImageUrl ||
              "https://via.placeholder.com/150",
          });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const parsedUser = JSON.parse(storedUser);
    const userId = parsedUser._id;

    try {
      const response = await fetch(
        `https://backend-apigame.onrender.com/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editForm.name,
            bio: editForm.bio,
            location: editForm.location,
            profileImageUrl: editForm.profileImageUrl,
          }),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile.");
    }
  };

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

  return (
    <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
      {/* Toggle Button for Drawer */}
      <button
        className="md:hidden p-2 bg-indigo-600 text-white rounded  mt-5"
        onClick={() => setIsDrawerOpen(true)}
      >
        Open Settings
      </button>

      {/* Sidebar as Drawer */}
      <aside
        className={`fixed top-0 z-10 left-0 w-3/4 max-w-sm h-full bg-white shadow-md transform transition-transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-1/3 lg:w-1/4`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4">Settings</h2>
          <nav className="flex flex-col gap-2">
            <a
              href="#"
              className="px-3 py-2 font-bold bg-indigo-100 rounded-lg"
            >
              Public Profile
            </a>
            <a
              href="#"
              className="px-3 py-2 font-medium hover:bg-indigo-100 rounded-lg"
            >
              Account Settings
            </a>
            <a
              href="#"
              className="px-3 py-2 font-medium hover:bg-indigo-100 rounded-lg"
            >
              Notifications
            </a>
            <a
              href="#"
              className="px-3 py-2 font-medium hover:bg-indigo-100 rounded-lg"
            >
              PRO Account
            </a>
          </nav>
        </div>
        {/* Close Drawer Button */}
        <button
          className="absolute top-4 right-4 text-xl font-bold text-red-600 md:hidden"
          onClick={() => setIsDrawerOpen(false)}
        >
          &times;
        </button>
      </aside>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsDrawerOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        {/* Your main content */}
        {/* Main Content */}
        <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
          <div className="p-2 md:p-4">
            <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
              <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                Public Profile
              </h2>

              <div className="grid max-w-2xl mx-auto mt-8">
                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                  <img
                    className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300"
                    src={editForm.profileImageUrl}
                    alt="Profile"
                  />

                  <div className="flex flex-col space-y-5 sm:ml-8">
                    <button
                      type="button"
                      className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                    >
                      Change picture
                    </button>
                    <button
                      type="button"
                      className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200"
                    >
                      Delete picture
                    </button>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="items-center mt-8 sm:mt-14 text-[#202142]"
                >
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-indigo-900"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      value={editForm.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="location"
                      className="block mb-2 text-sm font-medium text-indigo-900"
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      value={editForm.location}
                      onChange={handleInputChange}
                      placeholder="Your location"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="bio"
                      className="block mb-2 text-sm font-medium text-indigo-900"
                    >
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                      value={editForm.bio}
                      onChange={handleInputChange}
                      placeholder="Write your bio here..."
                    />
                  </div>

                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="profileImageUrl"
                      className="block mb-2 text-sm font-medium text-indigo-900"
                    >
                      Profile Image URL
                    </label>
                    <input
                      type="text"
                      id="profileImageUrl"
                      name="profileImageUrl"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      value={editForm.profileImageUrl}
                      onChange={handleInputChange}
                      placeholder="URL to your profile image"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </main>
    </div>
  );
};

export default AccountPage;
