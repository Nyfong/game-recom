export const get = async () => {
  // Use a path relative to your project for local JSON
  const url =
    process.env.NODE_ENV === "production"
      ? "file://./public/api/data/data.json"
      : "http://localhost:3000/api/data/data.json";

  try {
    let data;

    if (process.env.NODE_ENV === "production") {
      // For production, read file directly
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

    // Validate data
    if (!Array.isArray(data)) {
      throw new Error("Data is not an array");
    }

    // Return limited data
    return data.slice(0, 40);
  } catch (error) {
    console.error("Data fetching error:", error);

    // Always return an array in error case to maintain consistent return type
    return [];
  }
};
