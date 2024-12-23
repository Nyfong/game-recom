export const get = async () => {
  // Define the URL for local JSON based on the environment
  const url =
    process.env.NODE_ENV === "production"
      ? "file://./public/api/data/data.json"
      : "http://localhost:3000/api/data/data.json";

  try {
    let data;

    // Only use fs on the server side (Next.js will execute this on the server during production build)
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
