import Link from "next/link";
import { get } from "@/lib/gameData";
let ProdCard = async () => {
  const api = await get();
  console.log(api);

  return (
    <>
      {/* grid display product */}
      <section className="my-10">
        <div className="grid  grid-cols-2  md:grid-cols-3  lg:grid-cols-4 gap-2">
          {api.map((c, index) => (
            <div
              key={index}
              className="relative flex flex-col justify-between block rounded-tr-3xl border border-gray-100"
            >
              <span className="absolute -right-px -top-px rounded-bl-3xl text-xs md:text-md rounded-tr-3xl bg-rose-600 px-6 py-4 font-medium uppercase tracking-widest text-white">
                Free Game {c.id}
              </span>

              <div>
                <img
                  src={c.thumbnail}
                  alt=""
                  className="h-32 md:h-80 w-full rounded-tr-3xl object-cover"
                />
              </div>
              <div className="flex flex-col justify-between h-[260px] p-4 text-center ">
                {/* ttitle */}
                <div>
                  <strong className=" text-sm md:text-xl font-bold font-medium text-gray-900">
                    {" "}
                    {c.title}{" "}
                  </strong>
                </div>
                {/* description */}
                <div>
                  <p className="mt-2 line-clamp-3 text-pretty text-gray-700">
                    {c.short_description}
                  </p>
                </div>
                {/* btn */}
                <div>
                  <Link href={`/content/detailgame/${c.id}`}>
                    {/* href={`/content/detailgame/${index + 1}`} */}
                    <span className="mt-4 block rounded-md border border-indigo-900 bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-900">
                      About Game
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ProdCard;
