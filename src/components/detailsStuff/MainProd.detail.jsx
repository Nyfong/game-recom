import { FaDownload } from "react-icons/fa";
import { PiCoffeeBold } from "react-icons/pi";
import Link from "next/link";
import { get } from "@/lib/gameData";
import logo from "@/assets/icon/fav.png";

let MainProdDetail = async ({ detialsPropId }) => {
  // Fetch data from your API or source
  let fetchData;
  try {
    fetchData = await get(); // Fetch data from your API or source
    console.log("Fetched data:", fetchData); // Check what data is being returned
  } catch (error) {
    console.error("Error fetching data:", error);
    return <p>Error fetching data</p>; // Error fallback
  }

  // Check if the fetched data is valid
  if (!fetchData || !Array.isArray(fetchData)) {
    return <p>No data found</p>;
  }

  // Find the game by matching the 'id' with 'detialsPropId'
  const detailData = fetchData.find(
    (item) => item.id === parseInt(detialsPropId)
  );

  console.log("Fetched data for ID", detialsPropId, detailData); // Debug log to ensure correct matching

  // If no matching game is found, display a fallback message
  if (!detailData) {
    return <p>Game details not available</p>;
  }

  return (
    <>
      <section>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
          {/* main product image */}
          <div>
            <div className="group relative block">
              <div className="relative h-[350px] sm:h-[450px] rounded-lg overflow-hidden">
                <img
                  src={
                    detailData.thumbnail ||
                    "https://www.minecraft.net/content/dam/games/minecraft/key-art/Vanilla-PMP_Collection-Carousel-0_Update-Aquatic_1280x768.jpg"
                  }
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
                />
                <img
                  src={
                    detailData.thumbnail ||
                    "https://www.minecraft.net/content/dam/games/minecraft/key-art/Vanilla-PMP_Collection-Carousel-0_Update-Aquatic_1280x768.jpg"
                  }
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
                />
              </div>

              <div className="absolute bottom-0 flex flex-col md:flex-row gap-2 items-start justify-end p-6">
                <Link href={detailData.game_url} target="_blank">
                  <div className="mt-3 inline-block bg-blue-800 rounded-lg px-5 py-3 text-xs font-medium uppercase tracking-wide text-white flex gap-2 hover:bg-blue-400">
                    <p>Download Now</p>
                    <FaDownload />
                  </div>
                </Link>
                <Link href="/content/paycoffee">
                  <div className="mt-3 inline-block bg-blue-800 rounded-lg px-5 py-3 text-xs font-medium uppercase tracking-wide text-white flex gap-2 hover:bg-blue-400">
                    <p>Support Us Now</p>
                    <PiCoffeeBold />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* main product description */}
          <div className="grid grid-cols-1">
            <div>
              <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                  <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Category</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {detailData.genre}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Name</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {detailData.title}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Platform</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {detailData.platform}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Price</dt>
                    <dd className="text-gray-700 sm:col-span-2">$0</dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Description</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {detailData.short_description ||
                        "Lorem ipsum dolor sit amet..."}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Feedback section */}
            <div className="flex flex-col gap-2 text-base bg-gray-50 text-gray-400 font-bold font-mono w-full p-4 rounded-lg shadow-sm shadow-gray-400">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <svg
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[20px] fill-gray-400"
                  >
                    <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7..." />
                  </svg>
                  <span>How was your experience today?</span>
                </div>
                <button className="hover:bg-gray-200 rounded-full p-1 duration-300">
                  <svg
                    viewBox="0 0 384 512"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[15px] fill-gray-400"
                  >
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8..." />
                  </svg>
                </button>
              </div>
              <hr className="my-2" />
              <div className="flex-wrap flex sm:flex-nowrap gap-4">
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
