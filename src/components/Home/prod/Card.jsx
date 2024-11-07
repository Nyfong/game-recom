let ProdCard = () => {
  const arrTest = [1, 1, 1, 1]; // Simply loop over this array to create 10 cards

  return (
    <>
      {/* grid display product */}
      <section className="my-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {arrTest.map((el, index) => (
            <div
              key={index} // Use index as key since this is a simple array
              className="relative block rounded-tr-3xl border border-gray-100"
            >
              <span className="absolute -right-px -top-px rounded-bl-3xl rounded-tr-3xl bg-rose-600 px-6 py-4 font-medium uppercase tracking-widest text-white">
                Free Game
              </span>

              <img
                src="https://i.ebayimg.com/thumbs/images/g/ycoAAOSwY4RgvSSe/s-l1200.jpg"
                alt=""
                className="h-80 w-full rounded-tr-3xl object-cover"
              />

              <div className="p-4 text-center">
                <strong className="text-xl font-medium text-gray-900">
                  {" "}
                  Minecraft{" "}
                </strong>

                <p className="mt-2 text-pretty text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                  officia rem vel voluptatum in eum vitae aliquid at sed
                  dignissimos.
                </p>

                <span className="mt-4 block rounded-md border border-indigo-900 bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-900">
                  About Game
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ProdCard;
