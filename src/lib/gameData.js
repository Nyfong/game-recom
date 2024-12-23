export const get = async () => {
  // Define the URL for local JSON based on the environment
  const url =
    process.env.NODE_ENV === "production"
      ? "/api/data/data.json" // Use the static path when in production
      : "http://localhost:3000/api/data/data.json"; // Development mode

  try {
    let data;

    // If it's server-side in production, use fs to read the local file
    if (
      typeof window === "undefined" &&
      process.env.NODE_ENV === "production"
    ) {
      const fs = require("fs").promises;
      const path = require("path");
      const filePath = path.join(
        process.cwd(),
        "public",
        "api",
        "data",
        "data.json"
      );

      // Check if the file exists and read it
      const fileContents = await fs.readFile(filePath, "utf8");
      data = JSON.parse(fileContents);
    } else {
      // For client-side (or development), use fetch
      const response = await fetch(url, { cache: "default" });
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data. HTTP Status: ${response.status}`
        );
      }
      data = await response.json();
    }

    if (Array.isArray(data) && data[0].game) {
      return data[0].game.slice(0, 50);
    } else {
      throw new Error("'game' is not an array or missing in the data");
    }
  } catch (error) {
    console.error("Data fetching error:", error);
    return []; // Return an empty array in case of an error
  }
};
