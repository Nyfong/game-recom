import { RiUserFollowLine } from "react-icons/ri";
import { FaRetweet } from "react-icons/fa6";
import { SlUserFollowing } from "react-icons/sl";

let SocailAcccount = () => {
  const testArr = [1, 2, 3, 4, 5, 6];
  return (
    <>
      <main className="p-5 md:p-3 lg:p-4   gap-5 md:gap-3 max-w-screen-xl min-w-screen-80 mx-auto my-10">
        {/* cover section */}
        <section className="">
          {/* cover section */}
          <div className="grid grid-cols-1 md:grid-cols-2 bg-slate-50	rounded-lg  p-10">
            {/* imgage profile */}
            <div className="flex items-center justify-center">
              <img
                src="https://media.licdn.com/dms/image/v2/C5603AQHDZgdQ5sRTaQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1566531738983?e=2147483647&v=beta&t=dSsMLxrTZTBhHTPwynhcvyU7fmnV-snEchMbnRT56Oc"
                className="h-36 w-36 md:w-48 md:h-48 object-cover rounded-full"
                alt=""
              />
            </div>
            {/* description  */}
            <div className="flex flex-col items-center justify-center gap-2">
              {/* name following  */}
              <div className="grid grid-cols-1 mt-4  md:mt-0 sm:grid-cols-3  w-full gap-4 font-bold">
                <p>m.megamind</p>
                <p>Follwings</p>
                <p className=" ">Massage</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3  w-full gap-4 text-xs md:text-sm">
                <div className="flex items-center gap-1">
                  <p>1,386 posts</p>
                  <FaRetweet />
                </div>

                <div className="flex items-center gap-1">
                  <p className="">878K followers</p>
                  <RiUserFollowLine />
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-green-500"> 52 following</p>
                  <SlUserFollowing />
                </div>
              </div>
              {/* bio */}

              <div className=" w-full ">
                <p className="mt-5 ">
                  {" "}
                  VДΓДИД Video creator Game/Movie Lover Introvert, Quality.
                </p>
                <p className="mt-5">
                  Telegram: 076 2777770 youtube.com/c/MMegamind
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* card section */}
        <section className="mt-10">
          {/* category */}
          <div className="flex items-center gap-5 py-4 text-xl">
            <p className="underline text-blue-700">post</p>
            <p>video</p>
            <p>saved</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {testArr.map((el) => (
              <>
                <article
                  key={el}
                  className="overflow-hidden rounded-lg shadow transition hover:shadow-lg"
                >
                  <img
                    alt="pu mind"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuvrQ_lKvN7-b5en5OYvf8pqM90vJaxE0HYw&s"
                    className="h-56 w-full object-cover"
                  />

                  <div className="bg-white p-4 sm:p-6">
                    <time
                      dateTime="2022-10-10"
                      className="block text-xs text-gray-500"
                    >
                      {" "}
                      10th Oct 2022{" "}
                    </time>

                    <a href="#">
                      <h3 className="mt-0.5 text-lg text-gray-900">
                        How to position your furniture for positivity
                      </h3>
                    </a>

                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Recusandae dolores, possimus pariatur animi temporibus
                      nesciunt praesentium dolore sed nulla ipsum eveniet
                      corporis quidem, mollitia itaque minus soluta, voluptates
                      neque explicabo tempora nisi culpa eius atque dignissimos.
                      Molestias explicabo corporis voluptatem?
                    </p>
                  </div>
                </article>
              </>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};
export default SocailAcccount;
