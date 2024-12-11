"use client";
import HeroBannerCommu from "@/components/commuStuff/Banner/HeroBanner";

import SocailCardCommu from "@/components/commuStuff/Card/crudCard/SocailCard.commi";

// import Logo2 from "@/assets/fong.png";
let CommunityPage = () => {
  return (
    <>
      {/* <HeroBannerCommu /> */}
      <main className="p-5 md:p-3 lg:p-0  gap-5 md:gap-3 max-w-screen-xl min-w-screen-80 mx-auto my-10">
        <div className="flex flex-col md:flex-row gap-4 h-full ">
          {/* Main Scrollable Content */}
          <div className="md:w-2/3">
            <div className="my-4">
              <SocailCardCommu />
            </div>
          </div>
          {/* Sticky Card */}
          <div className="md:w-1/3 flex items-center flex-col gap-2 md:sticky md:top-[170px] h-max 	">
            {/* children */}
            {/* google ads block */}
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyBrD5uqC2lt-OJQOPSjBOYna4g2-QGJTgfg&s"
                alt=""
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CommunityPage;
