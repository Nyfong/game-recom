"use client";
import { useState } from "react";
import SocialCard from "@/components/commuStuff/Card/crudCard/SocailCard";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Link from "next/link";
// ./src/app/content/commu/page.jsx
export default function CommunityPage() {
  const [showThirdColumn, setShowThirdColumn] = useState(false);

  // Example community groups data
  const communityGroups = [
    { id: 1, name: "Tech Enthusiasts", members: 1200 },
    { id: 2, name: "Art Lovers", members: 800 },
    { id: 3, name: "Fitness Freaks", members: 1500 },
    { id: 4, name: "Book Club", members: 600 },
    { id: 5, name: "Travel Buddies", members: 2000 },
  ];

  return (
    <ErrorBoundary>
      <section className="grid grid-cols-1 md:grid-cols-8 h-screen">
        {/* Third Column - Sticky on larger screens, dropdown toggle on mobile */}
        <div
          className={`bg-gray-100 sticky top-0 h-screen overflow-y-auto ${
            showThirdColumn ? "block" : "hidden"
          } md:block md:col-span-2 lg:col-span-1`}
        >
          <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Community Groups
            </h2>
            <ul className="space-y-4">
              {communityGroups.map((group) => (
                <li
                  key={group.id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <h3 className="text-lg font-semibold text-gray-700">
                    <Link href="/live-chat">{group.name}</Link>
                  </h3>
                  <p className="text-sm text-gray-500">
                    {group.members.toLocaleString()} members
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Second Column - Scrollable, full width on mobile */}
        <div className="overflow-y-auto col-span-1 md:col-span-6  lg:col-span-7 px-4 md:px-20">
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
