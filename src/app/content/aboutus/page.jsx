"use client"; // Add this at the top to enable client-side functionality

import { useState, useEffect } from "react";
import AboutUsCard from "@/components/Cards/AboutusCard";
import AboutUsPayCard from "@/components/Cards/AboutusPayCoffeeCard";
import CodingCard from "@/components/Cards/CodingCard";
import GridCards from "@/components/Cards/GridCards";
import HomeSection from "@/components/Home/section/Section";
import AboutusSwiper from "@/components/Swiper/AboutusSwiper";

const Aboutus = () => {
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Simulate loading with useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after a delay
    }, 2000); // 2-second delay to simulate loading

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <>
      {isLoading ? ( // Show loader while loading
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        // Show content after loading
        <main className="p-5 md:p-3 lg:p-0 gap-5 md:gap-3 max-w-screen-xl min-w-screen-80 mx-auto my-10">
          <AboutUsCard />
          <CodingCard />
          <AboutUsPayCard />
          <HomeSection />
          <AboutusSwiper />
          <GridCards />
        </main>
      )}
    </>
  );
};

export default Aboutus;
