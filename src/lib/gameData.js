// "use server"; // This is only necessary for server-side in some Next.js functions, can be omitted if not needed.
export const get = async () => {
  const apiKey = "YOUR_API_KEY"; // Replace with your API key
  const url =
    "https://api.allorigins.win/raw?url=https://backend-apigame.onrender.com/api/games";

  try {
    const response = await fetch(url);

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`Failed to fetch data. HTTP Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Return the posts if everything is okay
    return data;
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching data:", error.message);

    // Return an error message or handle it as needed
    return {
      error: "There was a problem fetching the data. Please try again later.",
    };
  }
};
