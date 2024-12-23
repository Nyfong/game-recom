export const get = async () => {
  // Define the URL for local JSON based on the environment
  const url =
    process.env.NODE_ENV === "production"
      ? "file://./public/api/data/data.json"
      : "http://localhost:3000/api/data/data.json";

  try {
    let data;

    if (process.env.NODE_ENV === "production") {
      // For production, read the file directly
      const fs = require("fs").promises;
      const path = require("path");
      const filePath = path.join(
        process.cwd(),
        "public",
        "api",
        "data",
        "data.json"
      );
      const fileContents = await fs.readFile(filePath, "utf8");
      data = JSON.parse(fileContents);
    } else {
      // For development, use fetch
      const response = await fetch(url, { cache: "default" });

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

    // Return an empty array in case of an error to maintain consistency
    return [];
  }
};
