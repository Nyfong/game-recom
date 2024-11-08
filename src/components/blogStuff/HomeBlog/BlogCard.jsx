let BlogCard = () => {
  const arrTest = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // Simply loop over this array to create 10 cards
  return (
    <>
      <section className="grid grid-cols-1 gap-2">
        {arrTest.map((el) => {
          return (
            <>
              <article
                key={el}
                className="overflow-hidden rounded-lg shadow transition hover:shadow-lg grid  grid-cols-1 md:grid-cols-2 gap-2 p-2"
              >
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

                    <a href="#">
                      <h3 className="mt-0.5 text-lg text-gray-900 font-bold">
                        Analyst Bulletin: Mobile Game Market Review July 2024
                      </h3>
                    </a>
                  </div>
                </div>
                {/* DESCRIPTION */}
                <div>
                  <p className=" line-clamp-3 md:line-clamp-none text-sm/relaxed text-gray-500">
                    Seasonal Collectible Albums have seemingly got everyone on
                    mobile in a twist, or should we say a tangle? Last month,
                    Rollic’s Twisted Tangle became the first hybrid casual title
                    to ever implement the feature, showing this trending feature
                    knows no bounds. But this isn’t the only reason to take note
                    of Rollic. The studio’s wider portfolio of hybrid casual
                    puzzle games—including Seat Away and Screw Jam—are all
                    lighting up the US grossing charts too, fueled by a mixture
                    of monetization and a busy LiveOps calendar. Seasonal
                    Collectible Albums have seemingly got everyone on mobile in
                    a twist, or should we say a tangle? Last month, Rollic’s
                    Twisted Tangle became the first hybrid casual title to ever
                    implement the feature, showing this trending feature knows
                    no bounds. But this isn’t the only reason to take note of
                    Rollic. The studio’s wider portfolio of hybrid casual puzzle
                    games—including Seat Away and Screw Jam—are all lighting up
                    the US grossing charts too, fueled by a mixture of
                    monetization and a busy LiveOps calendar.
                  </p>
                </div>
              </article>
            </>
          );
        })}
      </section>
    </>
  );
};
export default BlogCard;
