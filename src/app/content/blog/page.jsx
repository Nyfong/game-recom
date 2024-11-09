import CarouselComponent from "@/components/Home/banner/Swiper";
import BlogCard from "@/components/blogStuff/HomeBlog/BlogCard";
import TrendingCard from "@/components/blogStuff/HomeBlog/TrendingCard";
import Pagenation from "@/components/common/Pagenation";
import SearchBar from "@/components/common/SearchBar";

let BlogPage = () => {
  return (
    <>
      <main className="p-5 md:p-3 lg:p-0  gap-5 md:gap-3 max-w-screen-xl min-w-screen-80 mx-auto my-10">
        <TrendingCard />
        <SearchBar />
        <section>
          <div>
            <p className="font-bold text-2xl underline">Trending Topics</p>
          </div>
        </section>
        <BlogCard />
        <Pagenation />
      </main>
    </>
  );
};

export default BlogPage;
