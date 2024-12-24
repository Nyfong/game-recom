"use client";
import { useState } from "react";
import FilterButton from "@/components/common/Filter";
import SearchBar from "@/components/common/SearchBar";
import ProdCard from "@/components/Home/prod/Card";

let FilterSection = () => {
  // Initialize with null or empty string to show all data initially
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleFilterData = (genre) => {
    setSelectedGenre(genre);
    console.log("Selected genre:", genre);
  };

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 my-10 gap-4 ">
        <div className="flex items-center">
          <FilterButton onFilter={handleFilterData} />
        </div>
      </section>
      <ProdCard data={selectedGenre} />
    </>
  );
};

export default FilterSection;
