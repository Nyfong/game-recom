import Link from "next/link";
let HeroPayCoffee = () => {
  return (
    <>
      <section>
        <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2">
          <div className="p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Support Our Studies with a cup of Coffee! ☕
              </h2>

              <p className="hidden text-gray-500 md:mt-4 md:block">
                Your encouragement means the world to us! We're dedicated to
                expanding our knowledge, working on exciting projects, and
                sharing what we learn with our community. If you’d like to
                support our journey, consider buying us a coffee! Every
                contribution helps cover study resources, tools, and little
                pick-me-ups to keep us going. Thank you for fueling our
                growth—one coffee at a time!
              </p>

              <div className="mt-4 md:mt-8">
                <Link
                  href="#"
                  className="inline-block rounded bg-blue-800 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
                >
                  CONTACT
                </Link>
              </div>
            </div>
          </div>

          <img
            alt=""
            src="https://images.unsplash.com/photo-1464582883107-8adf2dca8a9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            className="h-56 w-full object-cover sm:h-full rounded-md"
          />
        </section>
      </section>
    </>
  );
};

export default HeroPayCoffee;
