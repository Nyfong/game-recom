import { FaDownload } from "react-icons/fa";
import { PiCoffeeBold } from "react-icons/pi";
import Link from "next/link";
let MainBlogRead = () => {
  return (
    <>
      <section>
        <div className="container mx-auto mt-8">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-8/12 px-4 mb-8 ">
              <div className="relative">
                <img
                  src="https://www.gamerefinery.com/wp-content/uploads/2024/08/analyst-bulletin-july-2024.png"
                  alt="Featured Image"
                  className="w-full h-64 object-cover rounded"
                />
                <div className="absolute bottom-[15px] left-2">
                  <Link href="/content/paycoffee">
                    <div className="mt-3 inline-block bg-blue-800 rounded-lg px-5 py-3 text-xs font-medium uppercase tracking-wide text-white flex gap-2 hover:bg-blue-400">
                      <p>support us now</p>
                      <PiCoffeeBold />
                    </div>
                  </Link>
                </div>
              </div>
              <h2 className="text-4xl font-bold mt-4 mb-2">
                Analyst Bulletin: Mobile Game Market Review July 2024
              </h2>
              {/* description */}
              <div>
                <p className="text-gray-700 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-gray-700 mb-4">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
                <p className="text-gray-700 mb-4">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo.
                </p>
              </div>
              {/* description */}
              <div>
                <p className="text-gray-700 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-gray-700 mb-4">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
                <p className="text-gray-700 mb-4">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo.
                </p>
              </div>
              {/* description */}
              <div>
                <p className="text-gray-700 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-gray-700 mb-4">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
                <p className="text-gray-700 mb-4">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo.
                </p>
              </div>
            </div>
            <div className="w-full md:w-4/12 px-4 mb-8">
              <div className="bg-gray-100 px-4 py-6 rounded">
                <h3 className="text-lg font-bold mb-2">Categories</h3>
                <ul className="list-disc list-inside">
                  <li>
                    <Link
                      href="#"
                      className="text-gray-700 hover:text-gray-900"
                    >
                      Technology
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-700 hover:text-gray-900"
                    >
                      Travel
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-700 hover:text-gray-900"
                    >
                      Food
                    </Link>
                  </li>
                </ul>
              </div>
              <div className=" my-10  rounded-lg p-2">
                <img
                  src="https://static.semrush.com/blog/uploads/media/8b/06/8b063f735e2192a61c6861f4755ffc5d/what-is-digital-advertising.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainBlogRead;
