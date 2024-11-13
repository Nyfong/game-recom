// "use server";
export const get = async () => {
  const apiKey = "YOUR_API_KEY"; // Replace with your API key
  // const url = `https://api.rawg.io/api/games?key=${apiKey}&tags=free-to-play`;
  const url = "https://www.gamerpower.com/api/giveaways";
  let data = await fetch(url);
  let posts = await data.json();
  return posts;
};
