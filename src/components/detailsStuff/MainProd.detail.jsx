import { FaDownload } from "react-icons/fa";
import { PiCoffeeBold } from "react-icons/pi";

import Link from "next/link";
let MainProdDetail = () => {
  return (
    <>
      <section>
        <div className="grid grid-cols-1 gap-4  md:grid-cols-2 md:gap-2">
          {/* main product image*/}
          <div>
            <div className="group relative block">
              <div className="relative h-[350px] sm:h-[450px] rounded-lg overflow-hidden">
                <img
                  src="https://www.minecraft.net/content/dam/games/minecraft/key-art/Vanilla-PMP_Collection-Carousel-0_Update-Aquatic_1280x768.jpg"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
                />
                <img
                  src="https://www.minecraft.net/content/dam/games/minecraft/key-art/Vanilla-PMP_Collection-Carousel-0_The-Wild-Update_1280x768.jpg"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
                />
              </div>

              <div className="absolute bottom-0 flex flex-col md:flex-row  gap-2 items-start justify-end p-6">
                <Link href="#">
                  <div className="mt-3 inline-block bg-blue-800 rounded-lg px-5 py-3 text-xs font-medium uppercase tracking-wide text-white flex gap-2 hover:bg-blue-400">
                    <p>Download Now</p>
                    <FaDownload />
                  </div>
                </Link>
                <Link href="/content/paycoffee">
                  <div className="mt-3 inline-block bg-blue-800 rounded-lg px-5 py-3 text-xs font-medium uppercase tracking-wide text-white flex gap-2 hover:bg-blue-400">
                    <p>support us now</p>
                    <PiCoffeeBold />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {/* main product description*/}
          <div className="grid grid-cols-1">
            <div>
              <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                  <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Title</dt>
                    <dd className="text-gray-700 sm:col-span-2">MMO RPG</dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Name</dt>
                    <dd className="text-gray-700 sm:col-span-2">Minecraft</dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Occupation</dt>
                    <dd className="text-gray-700 sm:col-span-2">PC</dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Price</dt>
                    <dd className="text-gray-700 sm:col-span-2">$0</dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Description</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Et facilis debitis explicabo doloremque impedit nesciunt
                      dolorem facere, dolor quasi veritatis quia fugit aperiam
                      aspernatur neque molestiae labore aliquam soluta
                      architecto?
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-base bg-gray-50 text-gray-400 font-bold font-mono w-full p-4 rounded-lg shadow-sm shadow-gray-400">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <svg
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[20px] fill-gray-400"
                  >
                    <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"></path>
                  </svg>
                  <span>How was your experience today?</span>
                </div>
                <button className="hover:bg-gray-200 rounded-full p-1 duration-300">
                  <svg
                    viewBox="0 0 384 512"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[15px] fill-gray-400"
                  >
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
                  </svg>
                </button>
              </div>
              <hr className="my-2" />
              <div className=" flex-wrap  flex  sm:flex-nowrap	 gap-4">
                <button className="w-full bg-gray-100 p-2 rounded-md shadow-sm shadow-gray-400 hover:bg-gray-200 duration-300">
                  Good
                </button>
                <button className="w-full bg-gray-100 p-2 rounded-md shadow-sm shadow-gray-400 hover:bg-gray-200 duration-300">
                  Excellent
                </button>
                <button className="w-full bg-gray-100 p-2 rounded-md shadow-sm shadow-gray-400 hover:bg-gray-200 duration-300">
                  Fair
                </button>
                <button className="w-full bg-gray-100 p-2 rounded-md shadow-sm shadow-gray-400 hover:bg-gray-200 duration-300">
                  Poor
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default MainProdDetail;
