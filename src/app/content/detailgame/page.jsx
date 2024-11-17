import MainProdDetail from "@/components/detailsStuff/MainProd.detail";
import SuggestDetailScroll from "@/components/detailsStuff/Suggest.detail";
import Link from "next/link";
import { DiGit } from "react-icons/di";
import { VscVscode } from "react-icons/vsc";
import Image from "next/image";
let DetailGame = () => {
  return (
    <>
      <main className="p-5 md:p-3 lg:p-0  gap-5 md:gap-3 max-w-screen-xl min-w-screen-80 mx-auto my-10">
        {/* <MainProdDetail />
        <SuggestDetailScroll /> */}
        <div className=" h-auto md:h-[400px] justify-center flex flex-col md:flex-row gap-5 items-center justify-center p-5">
          <div className=" flex  flex-col md:flex-row gap-4 items-center">
            <p className="text-3xl">hello we are on developing mode</p>
            <DiGit className="text-3xl" />
            <VscVscode className="text-3xl" />
          </div>
          <div className="p-5 overflow-hidden rounded-xl">
            <img
              src="https://media.tenor.com/r0R0N3dI3kIAAAAM/dancing-cat-dance.gif"
              alt=""
              className="border-lg w-[200px] h-[300px] object-cover rounded-lg"
            />
          </div>
        </div>
      </main>
    </>
  );
};
export default DetailGame;
