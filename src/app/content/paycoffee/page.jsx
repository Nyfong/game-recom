import CardPayCoffee from "@/components/paycoffeeStuff/Card.pay";
import HeroPayCoffee from "@/components/paycoffeeStuff/HeroBanner.pay";

import Kaiseng from "@/assets/kaiseng.png";
import Nyfong from "@/assets/fong.png";
import Vy from "@/assets/yu.png";
import Kot from "@/assets/kot.png";
import PayCard from "@/components/paycoffeeStuff/PayCard.pay";
let PayMeCoffee = () => {
  const pic = [Kaiseng, Nyfong, Vy, Kot];
  return (
    <>
      <main className="p-5 md:p-3 lg:p-0  gap-5 md:gap-3 max-w-screen-xl min-w-screen-80 mx-auto my-10">
        <HeroPayCoffee />
        <section className="my-5">
          <div>
            <p className="font-bold underline">Support Us By</p>
          </div>
        </section>
        <PayCard />
        <section className="my-10 ">
          <CardPayCoffee p={null} />
        </section>
        <section className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {pic.map((p) => (
            <>
              <div key={p}>
                <CardPayCoffee p={p} />
              </div>
            </>
          ))}
        </section>
      </main>
    </>
  );
};

export default PayMeCoffee;
