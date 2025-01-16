"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Noavatar from "../../../../public/noavatar.png";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdWork,
  MdOutlineSettings,
  MdLogout,
  MdPeople,
} from "react-icons/md";
import { PiGameControllerFill } from "react-icons/pi";

const menuItems = [
  {
    title: "Pages",
    list: [
      { title: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
      {
        title: "Users Management",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Games",
        path: "/dashboard/games",
        icon: <PiGameControllerFill />,
      },
      {
        title: "Community",
        path: "/dashboard/community",
        icon: <PiGameControllerFill />,
      },
      {
        title: "Dialy Blog",
        path: "/dashboard/dialyblog",
        icon: <PiGameControllerFill />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      { title: "List Game", path: "/dashboard/listgame", icon: <MdWork /> },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      { title: "Logout", path: "/", icon: <MdLogout /> },
      { title: "Team", path: "/dashboard/team", icon: <MdPeople /> },
    ],
  },
];

const SideBar = () => {
  const [adminData, setAdminData] = useState({
    name: "",
    profileImageUrl: null
  });
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch("https://backend-apigame.onrender.com/api/users");
        const result = await response.json();
        
        // Handle different possible response structures
        const users = Array.isArray(result) ? result : 
                     result.data ? result.data : 
                     result.users ? result.users : [];
        
        const admin = users.find(user => 
          user && typeof user === 'object' && user.role === "admin"
        );

        if (admin && admin.profile) {
          setAdminData({
            name: admin.profile.name || "Administrator",
            profileImageUrl: admin.profile.profileImageUrl || null
          });
        } else {
          // Set default values if no admin is found
          setAdminData({
            name: "Administrator",
            profileImageUrl: null
          });
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setImageError(true);
        // Set default values on error
        setAdminData({
          name: "Administrator",
          profileImageUrl: null
        });
      }
    };

    fetchAdminData();
  }, []);

  return (
    <section className="p-10">
      <nav className="text-black border-b border-slate-500 w-full max-h-screen sticky top-[0px]">
        <div className="flex items-center gap-[25px] mb-[20px]">
          <div className="relative w-[50px] h-[50px]">
            <Image
              className="rounded-full object-cover"
              src={imageError || !adminData.profileImageUrl ? Noavatar : adminData.profileImageUrl}
              alt="User Avatar"
              fill
              sizes="50px"
              onError={() => setImageError(true)}
              priority
            />
          </div>

          <div className="flex flex-col ml-2">
            <span className="font-bold">{adminData.name}</span>
            <span className="text-sm text-gray-400">Administrator</span>
          </div>
        </div>

        <ul>
          {menuItems.map((category) => (
            <div key={category.title}>
              <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              <ul className="space-y-2">
                {category.list.map((item) => (
                  <li
                    key={item.path}
                    className="flex items-center space-x-3 py-2 mt-4 cursor-pointer hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-gray-200"
                  >
                    <Link
                      href={item.path}
                      className="flex items-center space-x-3"
                    >
                      <div className="text-xl">{item.icon}</div>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ul>
      </nav>
    </section>
  );
};

export default SideBar;