let TrendingCard = () => {
  const arrTest = [1, 1];
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-2 my-10">
        {arrTest.map((el) => {
          return (
            <>
              <article
                key={el}
                className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg"
              >
                <img
                  alt=""
                  src="https://www.gamerefinery.com/wp-content/uploads/2023/08/shooter-market-review-update-june-2024.png"
                  className="absolute inset-0 h-full w-full object-cover  opacity-70 duration-100	 hover:opacity-100"
                />

                <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
                  <div className="p-4 sm:p-6">
                    <time
                      dateTime="2022-10-10"
                      className="block text-xs text-white/90"
                    >
                      {" "}
                      10th Oct 2022{" "}
                    </time>

                    <a href="#">
                      <h3 className="mt-0.5 text-lg text-white">
                        How to position your furniture for positivity
                      </h3>
                    </a>

                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-white/95">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Recusandae dolores, possimus pariatur animi temporibus
                      nesciunt praesentium dolore sed nulla ipsum eveniet
                      corporis quidem, mollitia itaque minus soluta, voluptates
                      neque explicabo tempora nisi culpa eius atque dignissimos.
                      Molestias explicabo corporis voluptatem?
                    </p>
                  </div>
                </div>
              </article>
            </>
          );
        })}
      </section>
    </>
  );
};

export default TrendingCard;
