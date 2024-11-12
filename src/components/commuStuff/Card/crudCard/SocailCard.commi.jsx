import { GrLike } from "react-icons/gr";
import { GrDislike } from "react-icons/gr";
import { CiShare1 } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";

import Link from "next/link";
let SocailCardCommu = () => {
  const dataLike = 10;
  const dataComment = 0;
  const arrTest = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // Simply loop over this array to create 10 cards
  return (
    <>
      <section className="flex flex-col  gap-4 ">
        {arrTest.map((b, i) => {
          return (
            <Link href={`/auth/login`} key={i}>
              <div className="overflow-hidden rounded-lg shadow transition hover:shadow-lg grid  grid-cols-1  gap-2 p-2">
                <div>
                  <img
                    alt=""
                    src="https://www.gamerefinery.com/wp-content/uploads/2024/08/analyst-bulletin-july-2024.png"
                    className="h-56 w-full object-cover rounded-lg  opacity-70 duration-100	 hover:opacity-100"
                  />

                  <div className="bg-white p-4 sm:p-6">
                    <time
                      dateTime="2022-10-10"
                      className="block text-xs text-gray-500"
                    >
                      {" "}
                      10th Oct 2022{" "}
                    </time>

                    <h3 className="mt-0.5 text-lg text-gray-900 font-bold">
                      Analyst Bulletin: Mobile Game Market Review July 2024
                    </h3>
                  </div>
                </div>
                {/* DESCRIPTION */}
                <div>
                  <p className="line-clamp-2 md:line-clamp-5 lg:line-clamp-none text-sm/relaxed text-gray-500">
                    Seasonal Collectible Albums have seemingly got everyone on
                    mobile in a twist, or should we say a tangle? Last month,
                    Rollic’s Twisted Tangle became the first hybrid casual title
                    to ever implement the feature, showing this trending feature
                    knows no bounds.
                  </p>
                  {/* socail button */}
                  <div className="flex  flex-wrap gap-2 items-center p-2 ">
                    <div className="flex gap-2 items-center p-2 ">
                      <span>{dataLike} Likes</span>
                      <GrLike />
                    </div>
                    {/* <div className="flex gap-2 items-center p-2 ">
                      <GrDislike />
                    </div> */}

                    <div className="flex gap-2 items-center p-2 ">
                      <span>{dataComment} comments</span>
                      <FaRegComment />
                    </div>
                    <div className="flex gap-2 items-center p-2 ">
                      <CiShare1 />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </>
  );
};
export default SocailCardCommu;
