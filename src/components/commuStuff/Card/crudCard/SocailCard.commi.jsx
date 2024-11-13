import { GrLike } from "react-icons/gr";
import { GrDislike } from "react-icons/gr";
import { CiShare1 } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";

import Link from "next/link";
let SocailCardCommu = () => {
  const dataLike = 90;
  const dataComment = 22;
  const arrTest = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // Simply loop over this array to create 10 cards
  return (
    <>
      <section className="flex flex-col  gap-4 ">
        {arrTest.map((b, i) => {
          return (
            <Link href={`/auth/login`} key={i}>
              <div className="overflow-hidden rounded-lg shadow transition hover:shadow-lg grid  grid-cols-1  gap-2 p-2">
                <div className=" flex gap-2 items-center p-2 ">
                  <img
                    src="https://media.licdn.com/dms/image/v2/C5603AQHDZgdQ5sRTaQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1566531738983?e=2147483647&v=beta&t=dSsMLxrTZTBhHTPwynhcvyU7fmnV-snEchMbnRT56Oc"
                    className="w-16 h-16 rounded-full"
                    alt=""
                  />
                  <div className="flex flex-col">
                    <span>M.megamind</span>
                    <time className="text-sm text-gray-300">02 Nov 2024</time>
                  </div>
                </div>
                <div>
                  <img
                    alt=""
                    src="https://i.ytimg.com/vi/QQNgmQKK7XE/maxresdefault.jpg"
                    className="h-52 lg:h-96 w-full object-cover rounded-lg  opacity-70 duration-100	 hover:opacity-100"
                  />

                  <div className="bg-white p-4 sm:p-6">
                    <h3 className="mt-0.5 text-lg text-gray-900 font-bold">
                      Cambodian Gambling Gods
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
                  <div className="flex  flex-wrap gap-2 items-center p-2 text-sm md:text-md ">
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
                      <span>shares</span>
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
