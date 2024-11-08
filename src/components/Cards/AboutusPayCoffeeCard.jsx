import { LiaCoffeeSolid } from "react-icons/lia";
import Link from "next/link";
let AboutUsPayCard = () => {
  return (
    <>
      <section>
        <Link href="/content/paycoffee">
          <div className="flex flex-col justify-center bg-white">
            <div data-theme="teal" className="mx-auto max-w-6xl">
              <h2 className="sr-only">Featured case study</h2>
              <section className="font-sans text-black">
                <div className="[ lg:flex lg:items-center ] [ fancy-corners fancy-corners--large fancy-corners--top-left fancy-corners--bottom-right ]">
                  <div className="flex-shrink-0 self-stretch sm:flex-basis-40 md:flex-basis-50 xl:flex-basis-60">
                    <div className="h-full">
                      <article className="h-full">
                        <div className="h-full relative">
                          <img
                            className="h-full object-cover rounded-md"
                            src="https://fortune.com/img-assets/wp-content/uploads/2024/05/GettyImages-1129377183-e1715022310875.jpg?w=1440&q=75"
                            width="733"
                            height="412"
                            alt='""'
                            typeof="foaf:Image"
                          />
                          <div className="absolute bottom-5 right-0 flex gap-3 items-center bg-blue-800 rounded-lg p-5  ">
                            <span className="text-white "> Click here</span>
                            <LiaCoffeeSolid className="text-2xl text-white" />
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                  <div className="p-6 bg-grey">
                    <div className="leading-relaxed">
                      <div className=" flex gap-3 items-center">
                        <p className="leading-tight text-4xl font-bold">
                          {" "}
                          Pay us a cup of coffee
                          <span>
                            {" "}
                            <LiaCoffeeSolid className="text-2xl" />
                          </span>
                        </p>
                      </div>

                      <p className="mt-4">
                        Our second CXcon in October was dedicated to experience
                        transformation. The free one-day virtual
                        event&nbsp;brought together 230+ heads of digital,
                        thought leaders, and UX practitioners to discuss all
                        aspects of experience design..
                      </p>
                      <p className="mt-4">
                        In a jam-packed day filled with keynote sessions,
                        panels, and virtual networking we explored topics
                        including design leadership, UX ethics, designing for
                        emotion and innovation at scale.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </Link>
      </section>
    </>
  );
};
export default AboutUsPayCard;
