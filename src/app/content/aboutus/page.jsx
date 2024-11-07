import AboutUsCard from "@/components/Cards/AboutusCard";
import CodingCard from "@/components/Cards/CodingCard";
import GridCards from "@/components/Cards/GridCards";
import HomeSection from "@/components/Home/section/Section";
import AboutusSwiper from "@/components/Swiper/AboutusSwiper";

let Aboutus = () => {
  return (
    <>
      <main className="p-5 md:p-3 lg:p-0  gap-5 md:gap-3 max-w-screen-xl min-w-screen-80 mx-auto my-10">
        <GridCards />
        <AboutUsCard />
        <CodingCard />
        <HomeSection />
        <AboutusSwiper />
      </main>
    </>
  );
};
export default Aboutus;
