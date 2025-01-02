"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Bell, Lock, CreditCard, User } from "lucide-react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("Public Profile");

  const tabs = [
    { name: "Public Profile", icon: User },
    { name: "Account Settings", icon: Lock },
    { name: "Notifications", icon: Bell },
    { name: "PRO Account", icon: CreditCard },
  ];

  const PublicProfilePage = () => {
    const [profileImage, setProfileImage] = useState(
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    );
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      profession: "",
      bio: "",
    });

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleImageDelete = () => {
      setProfileImage(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
    };

    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form submitted", { ...formData, profileImage });
      alert("Profile updated successfully!");
    };

    return (
      <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
        <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>

        <form onSubmit={handleSubmit} className="grid max-w-2xl mx-auto mt-8">
          <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
            <Image
              className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300"
              src={profileImage}
              alt="Profile avatar"
              width={160}
              height={160}
              loading="lazy"
            />

            <div className="flex flex-col space-y-5 sm:ml-8">
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <label
                htmlFor="imageUpload"
                className="py-3.5 px-7 text-base font-medium text-indigo-100 bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 cursor-pointer"
              >
                Change picture
              </label>
              <button
                type="button"
                onClick={handleImageDelete}
                className="py-3.5 px-7 text-base font-medium text-indigo-900 bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100"
              >
                Delete picture
              </button>
            </div>
          </div>

          <div className="items-center mt-8 sm:mt-14 text-[#202142]">
            <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
              <div className="w-full">
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium"
                >
                  Your first name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="bg-indigo-50 border border-indigo-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                  placeholder="Your first name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium"
                >
                  Your last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="bg-indigo-50 border border-indigo-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                  placeholder="Your last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="mb-2 sm:mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="bg-indigo-50 border border-indigo-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                placeholder="your.email@mail.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-2 sm:mb-6">
              <label
                htmlFor="profession"
                className="block mb-2 text-sm font-medium"
              >
                Profession
              </label>
              <input
                type="text"
                id="profession"
                className="bg-indigo-50 border border-indigo-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                placeholder="Your profession"
                value={formData.profession}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="bio" className="block mb-2 text-sm font-medium">
                Bio
              </label>
              <textarea
                id="bio"
                rows="4"
                className="block p-2.5 w-full text-sm bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Write your bio here..."
                value={formData.bio}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  const AccountSettingsPage = () => {
    const [securitySettings, setSecuritySettings] = useState({
      twoFactorAuth: false,
      emailNotifications: true,
      privacyMode: false,
    });

    const handleToggleSwitch = (setting) => {
      setSecuritySettings((prev) => ({
        ...prev,
        [setting]: !prev[setting],
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Account Settings Updated:", securitySettings);
      alert("Account settings updated successfully!");
    };

    return (
      <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
        <h2 className="pl-6 text-2xl font-bold sm:text-xl">Account Settings</h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {Object.keys(securitySettings).map((key) => (
            <div key={key} className="bg-indigo-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="text-indigo-900 font-medium">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={securitySettings[key]}
                    onChange={() => handleToggleSwitch(key)}
                  />
                  <span
                    className={`w-12 h-6 flex items-center flex-shrink-0 p-1 bg-${
                      securitySettings[key] ? "indigo-600" : "gray-300"
                    } rounded-full duration-300 ease-in-out`}
                  >
                    <span
                      className={`w-4 h-4 bg-white rounded-full shadow-md transform duration-300 ease-in-out ${
                        securitySettings[key]
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    ></span>
                  </span>
                </label>
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Public Profile":
        return <PublicProfilePage />;
      case "Account Settings":
        return <AccountSettingsPage />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex space-x-4 border-b border-indigo-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center space-x-2 py-2 px-4 border-b-2 ${
              activeTab === tab.name
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500"
            } font-medium`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {renderTabContent()}
    </div>
  );
};

export default SettingsPage;
