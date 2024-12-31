import { RiUserFollowLine } from "react-icons/ri";
import { FaRetweet } from "react-icons/fa6";
import { SlUserFollowing } from "react-icons/sl";
import SocialCover from "@/components/profileStuff/socialCover";

let SocailAcccount = () => {
  const testArr = [1, 2, 3, 4, 5, 6];
  return (
    <>
      <main className="p-5 md:p-3 lg:p-4   gap-5 md:gap-3 max-w-screen-xl min-w-screen-80 mx-auto my-10">
        {/* cover section */}
        <SocialCover />
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
