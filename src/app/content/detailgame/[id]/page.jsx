"use server";
import MainProdDetail from "@/components/detailsStuff/MainProd.detail";
import SuggestDetailScroll from "@/components/detailsStuff/Suggest.detail";

export default async function DetailGameSpacific({ params }) {
  const { id } = await params;

  // Ensure idgame is converted to an integer
  const pageIdInt = parseInt(id);
  console.log("paramss: ", pageIdInt);
  return (
    <main className="p-5 md:p-3 lg:p-0 gap-5 md:gap-3 max-w-screen-xl min-w-screen-80 mx-auto my-10">
      {/* Render the main product details */}
      <MainProdDetail detialsPropId={pageIdInt} />
      {/* Render the suggestion details */}
      <SuggestDetailScroll />
    </main>
  );
}
