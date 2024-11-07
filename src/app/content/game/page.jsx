import CarouselComponent from "@/components/Home/banner/Swiper";
import ProdCard from "@/components/Home/prod/Card";
import HomeSection from "@/components/Home/section/Section";
import Pagenation from "@/components/common/Pagenation";
import SearchBar from "@/components/common/SearchBar";
let GamePgae = () => {
  return (
    <>
      <main className="p-5 md:p-3 lg:p-0  gap-5 md:gap-3 max-w-screen-xl min-w-screen-80 mx-auto my-10">
        <CarouselComponent />
        <SearchBar />
        <ProdCard />
        <ProdCard />

        <Pagenation />
        <HomeSection />
      </main>
    </>
  );
};

export default GamePgae;
