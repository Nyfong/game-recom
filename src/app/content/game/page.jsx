"use client";
import React, { useState, useEffect } from "react";
import CarouselComponent from "@/components/Home/banner/Swiper";
import ProdCard from "@/components/Home/prod/Card";
import ProdPage from "@/components/Home/prod/FetchCard";
import Pagenation from "@/components/common/Pagenation";
import FilterBtn from "@/components/common/Filter";
import SearchBar from "@/components/common/SearchBar";
import FilterSection from "@/components/common/FilterBtn";

const GamePgae = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <main className="p-5 md:p-3 lg:p-0 gap-5 md:gap-3 max-w-screen-xl min-w-screen-80 mx-auto my-10">
        <CarouselComponent />
        <FilterSection />
        <Pagenation />
      </main>

      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 w-14 h-14 flex justify-center items-center p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default GamePgae;
