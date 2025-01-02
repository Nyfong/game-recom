import React from "react";
import Card from "@/components/dashboard/card/Card";
import Rightbar from "@/components/dashboard/rightbar/RightBar";

const Dashboard = () => {
  return (
    <div className="w-full p-4">
      {/* Grid Layout */}
      <div className="flex">
        {/* Left Section */}
        <div className="max-w-[880px] flex-1">
          <Card />
        </div>
        {/* Right Section */}
        <div className="">
          <Rightbar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
