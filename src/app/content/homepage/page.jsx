import Banner from "@/components/Home/banner/Banner";
import CarouselComponent from "@/components/Home/banner/Swiper";
import ProdCard from "@/components/Home/prod/Card";
import CategoryGrid from "@/components/Home/prod/CategoryGrid";
import HomeSection from "@/components/Home/section/Section";

let Homepage = () => {
  return (
    <>
      {/* slider */}
      <Banner />
      {/* main content */}
      <main className="p-5 md:p-3 lg:p-0  gap-5 md:gap-3 max-w-screen-xl min-w-screen-80 mx-auto">
        <CategoryGrid />
        <HomeSection />
        <CarouselComponent />
        {/* grid display product */}
        <ProdCard />

        <HomeSection />
      </main>
    </>
  );
};

export default Homepage;
