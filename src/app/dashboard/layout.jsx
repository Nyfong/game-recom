"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/sidebar/SideBar";
import Navbar from "@/components/dashboard/navbar/NavBar";

const Layout = ({ children }) => {
  // const router = useRouter();

  // useEffect(() => {
  //   const admin = JSON.parse(localStorage.getItem("admin"));
  //   if (!admin) {
  //     router.push("/signin"); // Redirect to signin if not admin
  //   }
  // }, [router]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-white border-r w-[200px]">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
