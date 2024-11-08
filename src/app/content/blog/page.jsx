import CarouselComponent from "@/components/Home/banner/Swiper";
import BlogCard from "@/components/blogStuff/HomeBlog/BlogCard";
import TrendingCard from "@/components/blogStuff/HomeBlog/TrendingCard";
import Pagenation from "@/components/common/Pagenation";

let BlogPage = () => {
  return (
    <>
      <main className="p-5 md:p-3 lg:p-0  gap-5 md:gap-3 max-w-screen-xl min-w-screen-80 mx-auto my-10">
        <TrendingCard />
        <BlogCard />
        <Pagenation />
      </main>
    </>
  );
};

export default BlogPage;
