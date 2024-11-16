// pages/content/prodpage.jsx
import ProdCard from "./Card";
import { get } from "@/lib/gameData";

const ProdPage = async () => {
  // Fetch data here
  const api = await get();
  console.log(api.title);
  return (
    <>
      <section className="my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {api.slice(0.6).map((product, index) => (
            <ProdCard key={index} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ProdPage;
