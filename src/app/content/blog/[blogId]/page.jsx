import CarouselComponent from "@/components/Home/banner/Swiper";
import HomeSection from "@/components/Home/section/Section";
import MainBlogRead from "@/components/blogStuff/BlogDetails/MainBlog.read";
import BlogCard from "@/components/blogStuff/HomeBlog/BlogCard";

let DetailsBlog = ({ params }) => {
  return (
    <>
      <main className="p-5 md:p-3 lg:p-0  gap-5 md:gap-3 max-w-screen-xl min-w-screen-80 mx-auto my-10">
        <section className="flex justify-center items-center mt-5">
          <p>this is DetailsBlog of this page</p>
        </section>

        <MainBlogRead />
        <HomeSection />
      </main>
    </>
  );
};
export default DetailsBlog;
