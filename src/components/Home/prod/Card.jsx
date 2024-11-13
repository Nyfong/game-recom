import Link from "next/link";
import { get } from "@/lib/gameData";
let ProdCard = async ({ slice }) => {
  const api = await get();
  console.log(api);
  const arrTest1 = [1, 1, 1, 1]; // Simply loop over this array to create 10 cards

  return (
    <>
      {/* grid display product */}
      <section className="my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {api.slice(0, 32).map((c, index) => (
            <div
              key={index}
              className="relative flex flex-col justify-between block rounded-tr-3xl border border-gray-100"
            >
              <span className="absolute -right-px -top-px rounded-bl-3xl rounded-tr-3xl bg-rose-600 px-6 py-4 font-medium uppercase tracking-widest text-white">
                Free Game
              </span>

              <div>
                <img
                  src={c.thumbnail}
                  alt=""
                  className="h-80 w-full rounded-tr-3xl object-cover"
                />
              </div>
              <div className="p-4 text-center  ">
                <div>
                  <strong className="text-xl font-medium text-gray-900">
                    {" "}
                    {c.title}{" "}
                  </strong>
                </div>

                <div>
                  <p className="mt-2 text-pretty text-gray-700">
                    {c.short_description}
                  </p>
                </div>
                <div>
                  <Link href={`/content/detailgame`}>
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
