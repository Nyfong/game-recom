import MainProdDetail from "@/components/detailsStuff/MainProd.detail";
import SuggestDetailScroll from "@/components/detailsStuff/Suggest.detail";
import Link from "next/link";
let DetailGameSpacific = ({ params }) => {
  return (
    <>
      <main className="p-5 md:p-3 lg:p-0  gap-5 md:gap-3 max-w-screen-xl min-w-screen-80 mx-auto my-10">
        <MainProdDetail />
        <SuggestDetailScroll />
      </main>
    </>
  );
};
export default DetailGameSpacific;
