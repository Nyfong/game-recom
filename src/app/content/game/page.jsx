import CarouselComponent from "@/components/Home/banner/Swiper";
import ProdCard from "@/components/Home/prod/Card";
import ProdPage from "@/components/Home/prod/FetchCard";
import Pagenation from "@/components/common/Pagenation";
import FilterBtn from "@/components/common/Filter";
import SearchBar from "@/components/common/SearchBar";
import FilterSection from "@/components/common/FilterBtn";
let GamePgae = () => {
  return (
    <>
      <main className="p-5 md:p-3 lg:p-0  gap-5 md:gap-3 max-w-screen-xl min-w-screen-80 mx-auto my-10">
        <CarouselComponent />
        <FilterSection />
        <Pagenation />
      </main>
    </>
  );
};
export default GamePgae;
