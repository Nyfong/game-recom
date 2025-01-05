import React from "react";
import Card from "@/components/dashboard/card/Card";
import Rightbar from "@/components/dashboard/rightbar/RightBar";

const Dashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Left Section */}
      <div className="flex-1">
        <Card />
      </div>

      {/* Right Section */}
      <div className="lg:w-[300px]">
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;
