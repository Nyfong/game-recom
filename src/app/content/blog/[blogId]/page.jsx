"use client";
import { useParams } from "next/navigation";
import CarouselComponent from "@/components/Home/banner/Swiper";
import HomeSection from "@/components/Home/section/Section";
import MainBlogRead from "@/components/blogStuff/BlogDetails/MainBlog.read";
import { getBlog } from "@/lib/blogData";
let DetailsBlog = ({ params }) => {
  const { id } = params; // Directly extracting `id` from `params`

  // Ensure idgame is converted to an integer
  console.log("paramss: ", id);

  return (
    <>
      <main className="p-5 md:p-3 lg:p-0 gap-5 md:gap-3 max-w-screen-xl min-w-screen-80 mx-auto my-10">
        <MainBlogRead id={id} /> {/* Pass 'item' as the blog ID */}
        <HomeSection />
      </main>
    </>
  );
};

export default DetailsBlog;
