import Kaiseng from "@/assets/kaiseng.png";
import Nyfong from "@/assets/fong.png";
import Vy from "@/assets/vy.png";
import Image from "next/image";

let AboutUsCard = () => {
  const pic = [Kaiseng, Nyfong, Vy, Vy];
  return (
    <>
      <div className="py-3">
        <span className="font-bold underline text-2xl">Developer</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {pic.map((el) => (
          <div className="relative group cursor-pointer overflow-hidden duration-500  h-80 bg-zinc-800 text-gray-50 p-5 rounded-lg">
            <div className="">
              <div className="group-hover:scale-110 w-full rounded-lg h-60  duration-500">
                <Image
                  src={el}
                  className="h-full w-full rounded-lg object-cover"
                  alt=""
                />
              </div>
              <div className="absolute w-full left-0 p-5 -bottom-16 duration-500 group-hover:-translate-y-12">
                <div className="absolute -z-10 left-0 w-full h-28 opacity-0 duration-500 group-hover:opacity-50 group-hover:bg-blue-900"></div>
                <span className="text-xl font-bold">Hover me!</span>
                <p className="group-hover:opacity-100 w-56 duration-500 opacity-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AboutUsCard;
