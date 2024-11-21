// "use server"; // This is only necessary for server-side in some Next.js functions, can be omitted if not needed.
export const get = async () => {
  // const apiKey = "YOUR_API_KEY"; // Replace with your API key
  // const url = "https://www.freetogame.com/api/games?platform=pc";
  // const url = "https://api.vercel.app/blog";
  // const url = "https://zelda.fanapis.com/api/games?limit=20";
  const url = "https://www.mmobomb.com/api1/games";

  try {
    const response = await fetch(url, { cache: "default" });

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`Failed to fetch data. HTTP Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Return the posts if everything is okay
    return data;
  } catch (error) {
    // Return an error message or handle it as needed
    return {
      error: "There was a problem fetching the data. Please try again later.",
    };
  }
};
