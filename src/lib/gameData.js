export const get = async () => {
  // Define the URL for local JSON based on the environment
  const url =
    process.env.NODE_ENV === "production"
      ? "/api/data/data.json" // Access via static path in production
      : "http://localhost:3000/api/data/data.json"; // Development mode

  try {
    let data;

    if (process.env.NODE_ENV === "production") {
      // In production, the file should be available via HTTP
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data. HTTP Status: ${response.status}`
        );
      }

      data = await response.json();
    } else {
      // In development, we fetch from localhost
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data. HTTP Status: ${response.status}`
        );
      }

      data = await response.json();
    }

    // Ensure the data is an array and contains a 'game' property in the first object
    if (Array.isArray(data) && data[0].game) {
      // Return the 'game' array from the first object
      return data[0].game.slice(0, 50);
    } else {
      throw new Error("'game' is not an array or missing in the data");
    }
  } catch (error) {
    console.error("Data fetching error:", error);
    return []; // Return an empty array in case of an error
  }
};
