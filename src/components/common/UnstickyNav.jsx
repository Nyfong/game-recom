import { IoGameControllerOutline } from "react-icons/io5";

let UnstickyNav = () => {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-3  p-3">
        <div></div>
        <div className="flex items-center justify-center gap-3">
          <IoGameControllerOutline /> <p>find your exclusive game here</p>
        </div>
        <div></div>
      </section>
    </>
  );
};
export default UnstickyNav;
