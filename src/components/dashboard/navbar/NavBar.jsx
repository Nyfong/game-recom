"use client";

import React, { useState, useEffect, useRef } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { IoMdNotificationsOutline, IoMdNotifications } from "react-icons/io";
import { BiSolidMessageDetail, BiMessageDetail } from "react-icons/bi";
import { TfiSearch } from "react-icons/tfi";

// NavBar component
const NavBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const notificationsRef = useRef(null);
  const messagesRef = useRef(null);

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  // Toggle notifications dropdown
  const toggleNotifications = () => {
    setHasUnreadNotifications(false);
    setNotifications([
      { id: 1, text: "New game update available" },
      { id: 2, text: "Friend request from Player123" },
    ]);
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  // Toggle messages dropdown
  const toggleMessages = () => {
    setHasUnreadMessages(false);
    setMessages([
      { id: 1, sender: "Player456", text: "Want to play together?" },
      { id: 2, sender: "Player789", text: "GG on last match!" },
    ]);
    setIsMessagesOpen(!isMessagesOpen);
  };

  // Close dropdowns when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target)
      ) {
        setIsNotificationsOpen(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(e.target)) {
        setIsMessagesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center">
        <div className="flex flex-col text-center">
          <h1 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            SABAY
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Game</p>
        </div>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="text-gray-800 dark:text-white dark:bg-gray-700 p-2 pl-10 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              aria-label="Search"
            />
            <TfiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500 dark:text-gray-300" />
          </div>
          <div className="flex space-x-4 relative">
            {/* Notifications Icon */}
            <div className="relative" ref={notificationsRef}>
              {hasUnreadNotifications ? (
                <IoMdNotifications
                  onClick={toggleNotifications}
                  className="text-xl cursor-pointer text-blue-500 hover:text-blue-600 transition-all duration-300"
                  aria-label="Notifications"
                />
              ) : (
                <IoMdNotificationsOutline
                  onClick={toggleNotifications}
                  className="text-xl cursor-pointer hover:text-blue-500 transition-all duration-300 dark:text-white dark:hover:text-blue-400"
                  aria-label="Notifications"
                />
              )}
              {hasUnreadNotifications && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {notifications.length}
                </span>
              )}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border rounded-md shadow-lg p-2 transition-all duration-300 z-10">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="text-sm text-gray-800 dark:text-gray-300"
                    >
                      {notification.text}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Messages Icon */}
            <div className="relative" ref={messagesRef}>
              {hasUnreadMessages ? (
                <BiSolidMessageDetail
                  onClick={toggleMessages}
                  className="text-xl cursor-pointer text-blue-500 hover:text-blue-600 transition-all duration-300"
                  aria-label="Messages"
                />
              ) : (
                <BiMessageDetail
                  onClick={toggleMessages}
                  className="text-xl cursor-pointer hover:text-blue-500 transition-all duration-300 dark:text-white dark:hover:text-blue-400"
                  aria-label="Messages"
                />
              )}
              {hasUnreadMessages && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {messages.length}
                </span>
              )}
              {isMessagesOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border rounded-md shadow-lg p-2 transition-all duration-300 z-10">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className="text-sm text-gray-800 dark:text-gray-300"
                    >
                      <strong>{message.sender}:</strong> {message.text}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            {isDarkMode ? (
              <MdLightMode
                onClick={() => setIsDarkMode(false)}
                className="text-xl cursor-pointer hover:text-blue-500 transition-all duration-300 text-yellow-400"
                aria-label="Switch to Light Mode"
              />
            ) : (
              <MdDarkMode
                onClick={() => setIsDarkMode(true)}
                className="text-xl cursor-pointer hover:text-blue-500 transition-all duration-300 dark:text-white"
                aria-label="Switch to Dark Mode"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
