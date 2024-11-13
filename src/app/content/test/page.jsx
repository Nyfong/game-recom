import { get } from "@/lib/gameData";
export default async function Testpage() {
  const apiData = await get();
  console.log(apiData);

  return (
    <>
      <main>
        <p>hello fecth api</p>
        {/* {apiData.map((p) => (
          <span key={p.id}>{p.title}</span>
        ))} */}
        {apiData.map((p) => (
          <span key={p.id}>{p.description}</span>
        ))}
      </main>
    </>
  );
}
