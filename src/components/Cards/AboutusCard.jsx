import Kaiseng from "@/assets/kaiseng.png";
import Nyfong from "@/assets/fong.png";
import Vy from "@/assets/yu.png";
import Kot from "@/assets/kot.png";
import Image from "next/image";
import logo from "@/assets/icon/favBlue.png";
import Link from "next/link";
let AboutUsCard = () => {
  const pic = [Kaiseng, Nyfong, Vy, Kot];
  return (
    <>
      <div className="py-3">
        <span className="font-bold  text-2xl">Developers</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 p-4">
        {pic.map((e, i) => (
          <>
            <div key={e.id}>
              <Link href={`/content/aboutus/${i + 1}`}>
                <div className="relative group cursor-pointer overflow-hidden duration-500  h-80 bg-zinc-800 text-gray-50 p-5 rounded-lg">
                  <div>
                    <div className="group-hover:scale-110 w-full rounded-lg h-60  duration-500">
                      <Image
                        src={e}
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
              </Link>
            </div>
          </>
        ))}
      </div>
      <div className="flex justify-center items-center p-5 md:p-2 lg:p-0">
        <Image
          src={logo}
          className="h-full w-full md:h-72 md:object-contain  object-cover"
          alt="logo"
        />
      </div>
    </>
  );
};

export default AboutUsCard;
