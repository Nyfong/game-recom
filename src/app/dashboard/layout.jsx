import React from "react";
import Sidebar from "@/components/dashboard/sidebar/SideBar";
import Navbar from "@/components/dashboard/navbar/NavBar";

const Layout = ({ children }) => {
  return (
    <div className="flex max-h-screen ">
      {/* Sidebar  */}
      <div className="flex-none border-2 border-r-slate-500   bg-white w-[150px] md:w-[200px] lg:w-[250px] rounded-md h-screen">
        <div >
          <Sidebar />
        </div>
      </div>

      {/* Content  */}
      <div className="flex-1 p-5 overflow-auto rounded-md ">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
