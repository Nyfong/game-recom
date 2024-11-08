import { IoGameControllerOutline } from "react-icons/io5";

let UnstickyNav = () => {
  return (
    <>
      <section className="flex items-center justify-center  p-3">
        <div className="flex items-center justify-center gap-3">
          <IoGameControllerOutline />{" "}
          <p className="text-sm text-gray-500 line-clamp-1 md:text-md sm:line-clamp-none ">
            Best Gaming Blogs and Websites Choose from one of the most popular
            gaming blogs. Subscribe to your favorite gaming blogs for free.
          </p>
        </div>
      </section>
    </>
  );
};
export default UnstickyNav;
