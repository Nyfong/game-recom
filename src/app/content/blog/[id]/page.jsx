"use client";
import { useParams } from "next/navigation";
import HomeSection from "@/components/Home/section/Section";
import MainBlogRead from "@/components/blogStuff/BlogDetails/MainBlog.read";

const DetailsBlog = () => {
  const { id } = useParams(); // Extract id from the URL parameters

  console.log("paramss: ", id); // Log the id for debugging

  return (
    <main className="p-5 md:p-3 lg:p-0 gap-5 md:gap-3 max-w-screen-xl min-w-screen-80 mx-auto my-10">
      <MainBlogRead id={id} /> {/* Pass id as a prop */}
      <HomeSection />
    </main>
  );
};

export default DetailsBlog;
