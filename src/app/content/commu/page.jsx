"use client";
import { useState } from "react";
import Image from "next/image";
import Logo2 from "@/assets/icon/fav.png";
import HeroBannerCommu from "@/components/commuStuff/Banner/HeroBanner";
import BlogCard from "@/components/blogStuff/HomeBlog/BlogCard";
import CardCategories from "@/components/commuStuff/Card/frontCard/CardCategories";
import SocailCardCommu from "@/components/commuStuff/Card/crudCard/SocailCard.commi";
// import Logo2 from "@/assets/fong.png";
let CommunityPage = () => {
  return (
    <>
      <HeroBannerCommu />
      <main className="p-5 md:p-3 lg:p-0  gap-5 md:gap-3 max-w-screen-xl min-w-screen-80 mx-auto my-10">
        <div className="flex flex-col-reverse md:flex-row gap-4 h-full ">
          {/* Sticky Card */}

          <div className="md:w-1/3 flex flex-col gap-2 md:sticky md:top-[170px] h-max 	">
            {/* children */}

            <div>
              <img
                src="https://www.ecommjuice.com/wp-content/uploads/2021/07/GIF-ADS.gif"
                alt=""
              />
            </div>
          </div>

          {/* Main Scrollable Content */}
          <div className="md:w-2/3">
            <div className="my-4">
              <SocailCardCommu />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CommunityPage;
