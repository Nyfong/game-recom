import logo from "@/assets/icon/favBlue.png";
import Image from "next/image";
const DefualtPage = () => {
  return (
    <>
      <main className="p-5 md:p-3 lg:p-0 gap-5 md:gap-3 flex flex-col gap-1 items-center justify-center h-[500px] max-w-screen-xl min-w-screen-80 mx-auto my-10">
        <p>What are you doing?</p>
        <Image src={logo} className="w-40 h-40 object-contain" alt="" />
      </main>
    </>
  );
};

export default DefualtPage;
