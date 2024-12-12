import CarouselComponent from "@/components/Home/banner/Swiper";
import ProdCard from "@/components/Home/prod/Card";
import ProdPage from "@/components/Home/prod/FetchCard";
import Pagenation from "@/components/common/Pagenation";
import FilterBtn from "@/components/common/Filter";
import SearchBar from "@/components/common/SearchBar";

let GamePgae = () => {
  const data = "";
  return (
    <>
      <main className="p-5 md:p-3 lg:p-0  gap-5 md:gap-3 max-w-screen-xl min-w-screen-80 mx-auto my-10">
        <CarouselComponent />
        <section className="grid grid-cols-1 md:grid-cols-2  my-10 gap-4 ">
          <div className="flex items-center">
            <FilterBtn />
          </div>
          <SearchBar />
        </section>
        <ProdCard data={data} />
        <Pagenation />
      </main>
    </>
  );
};
export default GamePgae;
