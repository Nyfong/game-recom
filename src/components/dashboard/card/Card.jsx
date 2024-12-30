import React from "react";
import { FcSurvey, FcPaid, FcKindle } from "react-icons/fc";
import { Gauge } from "@mui/x-charts/Gauge";
import { LineChart } from "@mui/x-charts/LineChart";
import Tableuser from "../tableuser/TableUser";

// Reusable StatCard Component
const StatCard = ({ icon: Icon, title, stat, description, bgColor }) => {
  return (
    <div
      className={`${bgColor} p-6 rounded-xl shadow-2xl text-black flex flex-col overflow-hidden transform transition-all hover:scale-105 justify-between`}
    >
      <div className="flex my-3">
        <Icon className="mr-2 text-xl" />
        <h1 className="text-sm font-semibold">{title}</h1>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-xl font-bold">{stat}</h1>
        <div className="text-md">{description}</div>
      </div>
    </div>
  );
};

const Card = () => {
  // LineChart data series with corrected format
  const series = [
    {
      data: [2, 5.5, 2, 8.5, 1.5, 5],
      label: "Series 1",
      color: "#1976d2",
    },
    {
      data: [null, null, null, null, 5.5, 2, 8.5, 1.5, 5],
      label: "Series 2",
      color: "#ff4081",
    },
    {
      data: [7, 8, 5, 4, null, null, 2, 5.5, 1],
      label: "Series 3",
      color: "#4caf50",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Upper Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          icon={FcSurvey}
          title="Total Enroll"
          stat="10,093"
          description={<Gauge width={50} height={50} value={85} />}
          bgColor="white"
        />
        <StatCard
          icon={FcKindle}
          title="Total Login"
          stat="8,543"
          description={<Gauge width={50} height={50} value={85} />}
          bgColor="white"
        />
        <StatCard
          icon={FcPaid}
          title="Total Download"
          stat="12,304"
          description={<Gauge width={50} height={50} value={85} />}
          bgColor="white"
        />
      </div>

      {/* Lower Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        <div className="p-4 rounded-lg h-[390px]">
          <Tableuser />
        </div>
        <div className="bg-gray-100 p-4 rounded-lg h-[390px]">
          <LineChart
            xAxis={[
              {
                data: [1, 2, 3, 5, 8, 10, 12, 15, 16],
                label: "Time",
              },
            ]}
            series={series}
            height={300}
            margin={{ top: 10, bottom: 20, left: 40, right: 40 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
