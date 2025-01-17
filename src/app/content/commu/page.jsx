"use client";
import { useState } from "react";
import SocialCard from "@/components/commuStuff/Card/crudCard/SocailCard";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Link from "next/link";
import { MdOnlinePrediction } from "react-icons/md";

export default function CommunityPage() {
  const [showThirdColumn, setShowThirdColumn] = useState(false);

  // Example community groups data
  const communityGroups = [
    { id: 1, name: "Mobile Legend team", members: "free to join" },
    { id: 2, name: "Valorants Esport ", members: "free to join" },
    { id: 3, name: "Dota 2 Lengendary", members: "free to join" },
    { id: 4, name: "Ak2 Club", members: "free to join" },
    { id: 5, name: "Genshin Impact gay", members: "free to join" },
  ];

  return (
    <ErrorBoundary>
      <section className="grid grid-cols-1 md:grid-cols-8 h-screen">
        {/* Third Column - Sticky on larger screens, dropdown toggle on mobile */}
        <div
          className={`bg-gray-100 sticky top-0 h-screen overflow-y-auto ${
            showThirdColumn ? "block" : "hidden"
          } md:block md:col-span-2 `}
        >
          <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Community Groups
            </h2>
            <ul className="space-y-4">
              {communityGroups.map((group) => (
                <Link
                  href={`/live-chat/${group.id}?name=${encodeURIComponent(
                    group.name
                  )}`}
                >
                  <li
                    key={group.id}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <h3 className="text-lg font-semibold text-gray-700">
                      {/* Update the Link to include the community ID */}

                      {group.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      <MdOnlinePrediction className="text-green-500 font-bold" />
                      {group.members.toLocaleString()}
                    </p>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>

        {/* Second Column - Scrollable, full width on mobile */}
        <div className="overflow-y-auto col-span-1 md:col-span-6  px-4 md:px-20">
          <SocialCard />
        </div>

        {/* Dropdown Button for Mobile */}
        <button
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-lg md:hidden"
          onClick={() => setShowThirdColumn(!showThirdColumn)}
        >
          {showThirdColumn ? "Hide" : "Show"} Column 3
        </button>
      </section>
    </ErrorBoundary>
  );
}
