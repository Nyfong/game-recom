const { default: CardPayCoffee } = require("./Card.pay");
import ABA from "@/assets/payway/aba.png";
import Image from "next/image";
let PayCard = () => {
  return (
    <>
      <section className="p-10 w-full ">
        <div>
          <div
            href="#"
            className="relative block rounded-tr-3xl border border-gray-100"
          >
            <span className="absolute -right-px -top-px rounded-bl-3xl rounded-tr-3xl bg-rose-600 px-6 py-4 font-medium uppercase tracking-widest text-white">
              Pay me a cup of Coffee
            </span>

            <Image
              src={ABA}
              alt=""
              className="-ml-6 -mt-6 h-80 w-full rounded-bl-3xl rounded-tr-3xl border border-gray-300 object-contain"
            />

            <div className="p-4 text-center">
              <strong className="text-xl font-medium text-gray-900">
                {" "}
                THANK YOU SO MUCH{" "}
              </strong>

              <p className="mt-2 text-pretty text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                officia rem vel voluptatum in eum vitae aliquid at sed
                dignissimos.
              </p>

              <span className="mt-4 block rounded-md border border-indigo-900 bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-900">
                Download ABA BARKONG
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default PayCard;
